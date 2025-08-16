// Gemini API configuration and service functions
// ref on how to use: https://aistudio.google.com/apikey

import type { Ingredient } from "@/components/manage_ingredients";

export interface InvalidIngredient {
  name: string;
}

export interface GeminiResponse {
  text: string;
  ingredients?: Ingredient[];
  declinedReason?: string;
  invalidIngredients?: InvalidIngredient[];
}

export interface StreamingGeminiResponse {
  text: string;
  ingredients?: Ingredient[];
  declinedReason?: string;
  invalidIngredients?: InvalidIngredient[];
  isComplete: boolean;
}

const GEMINI_API_KEY = import.meta.env.VITE_APP_GEMINI_API_KEY || "concac";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_STREAMING_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent";

export class GeminiServiceAddIngredients {
  /**
   * Process text input with Gemini AI to extract ingredients and generate response (non-streaming)
   */
  static async processTextWithGemini(userInput: string): Promise<GeminiResponse> {
    try {
      const prompt = this.createIngredientExtractionPrompt(userInput);

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response body:", errorData);
        throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return this.parseGeminiResponse(aiResponse);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  }

  /**
   * Process text input with Gemini AI using streaming (real-time response)
   */
  static async *processTextWithGeminiStreaming(userInput: string, onChunk?: (chunk: StreamingGeminiResponse) => void): AsyncGenerator<StreamingGeminiResponse, void, unknown> {
    try {
      const prompt = this.createIngredientExtractionPrompt(userInput);

      const response = await fetch(GEMINI_STREAMING_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Streaming API Error:", errorData);
        console.error("Status:", response.status);
        console.error("Status Text:", response.statusText);
        throw new Error(`Gemini Streaming API error: ${response.status} - ${errorData}`);
      }

      if (!response.body) {
        throw new Error("No response body for streaming");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let buffer = "";
      let sentIngredientsCount = 0; // Track how many ingredients we've already sent

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // Process final response and extract ingredients

            // Try to parse the accumulated text as JSON
            try {
              const finalResponse = this.parseGeminiResponse(accumulatedText);
              const streamingResponse: StreamingGeminiResponse = {
                text: finalResponse.text,
                ingredients: finalResponse.ingredients,
                declinedReason: finalResponse.declinedReason,
                invalidIngredients: finalResponse.invalidIngredients,
                isComplete: true,
              };

              onChunk?.(streamingResponse);
              yield streamingResponse;
            } catch (parseError) {
              console.warn("Failed to parse final response:", parseError);

              // Fallback: return raw text
              const streamingResponse: StreamingGeminiResponse = {
                text: accumulatedText || "Tôi không thể xử lý yêu cầu của bạn. Vui lòng thử lại.",
                ingredients: [],
                declinedReason: undefined,
                invalidIngredients: [],
                isComplete: true,
              };

              onChunk?.(streamingResponse);
              yield streamingResponse;
            }
            break;
          }

          // Decode the chunk
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Process all complete JSON objects in the buffer
          // Look for pattern: { ... } (complete JSON objects)
          let processedLength = 0;

          while (true) {
            // Find start of next JSON object
            const startIndex = buffer.indexOf("{", processedLength);
            if (startIndex === -1) break;

            // Find the matching closing brace
            let braceCount = 0;
            let endIndex = -1;
            let inString = false;
            let escapeNext = false;

            for (let i = startIndex; i < buffer.length; i++) {
              const char = buffer[i];

              if (escapeNext) {
                escapeNext = false;
                continue;
              }

              if (char === "\\") {
                escapeNext = true;
                continue;
              }

              if (char === '"' && !escapeNext) {
                inString = !inString;
                continue;
              }

              if (!inString) {
                if (char === "{") {
                  braceCount++;
                } else if (char === "}") {
                  braceCount--;
                  if (braceCount === 0) {
                    endIndex = i;
                    break;
                  }
                }
              }
            }

            if (endIndex !== -1) {
              // Found complete JSON object
              const jsonStr = buffer.substring(startIndex, endIndex + 1);

              try {
                const data = JSON.parse(jsonStr);

                // Gemini streaming format: each object contains candidates array
                const textPart = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

                if (textPart) {
                  accumulatedText += textPart;

                  // Try to extract meaningful content from the accumulated text in real-time
                  const extractedContent = this.extractStreamingContent(accumulatedText);

                  // Only send new ingredients that we haven't sent before
                  const allIngredients = extractedContent.ingredients || [];
                  const newIngredients = allIngredients.slice(sentIngredientsCount);

                  // Update the count of sent ingredients
                  if (newIngredients.length > 0) {
                    sentIngredientsCount = allIngredients.length;
                  }

                  // Show the extracted content as it becomes available
                  const streamingResponse: StreamingGeminiResponse = {
                    text: extractedContent.text || "Đang xử lý yêu cầu của bạn...",
                    ingredients: newIngredients, // Only send new ingredients
                    declinedReason: extractedContent.declinedReason,
                    invalidIngredients: extractedContent.invalidIngredients || [], // Send invalid ingredients as they're found
                    isComplete: false,
                  };

                  onChunk?.(streamingResponse);
                  yield streamingResponse;
                }
              } catch (parseError) {
                console.warn("Failed to parse JSON object:", parseError);
                console.warn("Problematic JSON:", jsonStr);
              }

              processedLength = endIndex + 1;
            } else {
              // No complete JSON object found, break and wait for more data
              break;
            }
          }

          // Keep unprocessed part in buffer
          if (processedLength > 0) {
            buffer = buffer.substring(processedLength);
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error("Error in streaming Gemini API:", error);
      throw error;
    }
  }

  /**
   * Create a specialized prompt for ingredient extraction
   */
  private static createIngredientExtractionPrompt(userInput: string): string {
    // believe this or not, I have to write this by my own hand, not using AI or
    // shit, and my English is suck as fuck so all this shit will be Vietnamese
    // author: Tài Trịnh
    return `
Vai trò: Bạn là một trợ lý AI tiếng Việt chuyên về quản lý nguyên liệu nấu ăn.
Nhiệm vụ: phân tích câu nói của người dùng và trích xuất TẤT CẢ các nguyên liệu 
được đề cập.

PHÒNG CHỐNG & KIỂM TRA:
1. Nếu toàn bộ yêu cầu của người dùng đều không liên quan đến nguyên liệu nấu ăn 
→ từ chối và giải thích
2. Trong trường hợp người dùng yêu cầu hợp lệ liên quan đến thực phẩm, bắt đầu 
xem xét tính hợp lệ của từng nguyên liệu:
   - Loại bỏ các vật phẩm không phải thực phẩm (bút, giấy, xe hơi, ma túy, bột 
   giặt, thuốc phiện,...)

QUAN TRỌNG: Phải trích xuất ĐÚNG số lượng và đơn vị đi kèm với mỗi nguyên liệu.

Quy tắc phân loại nguyên liệu hợp lệ:
- "rau-cu-qua": cà chua, cà rốt, hành tây, tỏi, giá đỗ, xà lách, khoai tây, nấm,...
- "thit-ca-hai-san": thịt tươi, cá, tôm, cua, mực,...
- "sua-trung-pho-mai": sữa, phô mai, bơ, kem, sữa chua, trứng,...
- "gao-bun-my": gạo, bún, mỳ, bánh mì, yến mạch, bột mì,...
- "dau-hat-do-kho": đậu các loại, hạt, thực phẩm khô
- "gia-vi-tuong": muối, đường, tiêu nước mắm, tương ớt, tương cà, tương bần,...
- "dau-an-mo-thuc-vat": dầu ăn, dầu oliu, bơ thực vật, mỡ heo,...
- "do-uong-nuoc-dung": nước lọc, nước dùng gà, coca cola,...

Hướng dẫn trích xuất:
1. ĐỌC KỸ toàn bộ câu và tìm TẤT CẢ nguyên liệu
2. Với mỗi nguyên liệu, tìm số lượng (số) và đơn vị (chỉ có các giá trị là g, kg, 
mg, ml, l hoặc để trống) đi TRƯỚC hoặc SAU tên nguyên liệu
3. Chú ý các mẫu câu như: "2kg ức gà", "ức gà 2kg", "300g cà chua", "100g đậu phụ"
4. Nếu không có số lượng/đơn vị → để trống amount và unit
5. Phân loại nguyên liệu dựa trên hiểu biết về thực phẩm
6. Chọn emoji phù hợp cho từng nguyên liệu, lưu ý emoji TUYỆT ĐỐI không phải là 
văn bản! Ví dụ emoji cho "gừng" là "🫚", không phải là "ginger"
7. Tách riêng nguyên liệu hợp lệ và không hợp lệ

Trả lời theo định dạng JSON chính xác:
{
  "text": "Nói sao cho tự nhiên. Trong trường hợp yêu cầu hợp lệ, phản hồi thân 
  thiện bằng tiếng Việt về những gì bạn đã hiểu. Ngược lại, chỉ rõ yêu cầu là 
  không liên quan, vi phạm pháp luật,... hay gì đó và từ chối, ví dụ \"Tôi là một 
  trợ lý nấu ăn, không thể giúp bạn làm bài tập. Vui lòng cung cấp yêu cầu liên 
  quan đến nguyên liệu nấu ăn.\"",
  "ingredients": [
    {
      "name": "Tên nguyên liệu (viết hoa chữ cái đầu)",
      "category": "rau-cu-qua|thit-ca-hai-san|sua-trung-pho-mai|gao-bun-my|dau-hat-do-kho|
      gia-vi-tuong|dau-an-mo-thuc-vat|do-uong-nuoc-dung",
      "amount": "Số lượng (để trống nếu không đề cập)",
      "unit": " \"\"|g|kg|mg|ml|l ",
      "icon": "Emoji phù hợp"
    }
  ],
  "declined-reason": "Giải thích sao cho tự nhiên, chỉ rõ các nguyên liệu đó vì 
  sao không phải là thực phẩm, ví dụ chúng là đồ vật hay gì đó, hay là một nguyên
   liệu vi phạm pháp luật (ma túy, thuốc phiện,...), ví dụ \"Tuy nhiên có một 
   (vài) nguyên liệu sau không phù hợp vì chúng không phải là thực phẩm như:\"",
  "invalid-ingredients": [
    {
      "name": "Tên vật phẩm không hợp lệ",
    }
  ]
}

Ví dụ một vài use case:
- "2kg ức gà, 100g giá đỗ" → 
{
  "text": "Chào bạn, tôi đã nhận diện được các nguyên liệu sau và thêm chúng:",
  "ingredients": [
    {
      "name": "Ức Gà",
      "category": "thit-ca-hai-san",
      "amount": "2",
      "unit": "kg",
      "icon": "🐔"
    },
    {
      "name": "Giá Đỗ",
      "category": "rau-cu-qua",
      "amount": "100",
      "unit": "g",
      "icon": "🌱"
    }
  ],
  "declined-reason": "",
  "invalid-ingredients": []
}

- "Thêm bút, giấy, 300g cà chua, 100g giá đỗ" → 
{
  "text": "Xin chào, tôi đã nhận diện được các nguyên liệu sau và thêm chúng:",
  "ingredients": [
    {
      "name": "Cà Chua",
      "category": "rau-cu-qua",
      "amount": "300",
      "unit": "g",
      "icon": "🍅"
    },
    {
      "name": "Giá Đỗ",
      "category": "rau-cu-qua",
      "amount": "100",
      "unit": "g",
      "icon": "🌱"
    }
  ],
  "declined-reason": "Bên cạnh đó có một vài nguyên liệu không phù hợp vì chúng 
  không phải là thực phẩm như:",
  "invalid-ingredients": [
    {
      "name": "Bút"
    },
    {
      "name": "Giấy"
    }
  ]
}
- "Làm giúp tôi bài tập" → 
{
  "text": "Tôi là một trợ lý nấu ăn, không thể giúp bạn làm bài tập. Vui lòng 
  cung cấp yêu cầu liên quan đến nguyên liệu nấu ăn.",
  "ingredients": [],
  "declined-reason": "",
  "invalid-ingredients": []
}

CHÚ Ý: 
- Hãy đọc kỹ và tách riêng từng nguyên liệu với đúng số lượng của nó.
- Emoji không phải là văn bản

Cuối cùng, đây là đầu vào từ người dùng: "${userInput}"
`;
  }

  /**
   * Extract meaningful content from streaming JSON as it builds up
   */
  private static extractStreamingContent(partialText: string): { text?: string; ingredients?: Ingredient[]; declinedReason?: string; invalidIngredients?: InvalidIngredient[] } {
    try {
      // Remove markdown code blocks if present
      let cleanedText = partialText;
      cleanedText = cleanedText.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
      cleanedText = cleanedText.replace(/^```\s*/i, "").replace(/\s*```$/, "");

      let extractedText = "";
      let extractedIngredients: Ingredient[] = [];
      let extractedDeclinedReason = "";
      let extractedInvalidIngredients: InvalidIngredient[] = [];

      // Try to extract the "text" field value
      const textMatch = cleanedText.match(/"text"\s*:\s*"([^"]*(?:\\.[^"]*)*)"?/);
      if (textMatch) {
        extractedText = textMatch[1].replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\\\/g, "\\");
      }

      // Try to extract the "declined-reason" field value
      const declinedReasonMatch = cleanedText.match(/"declined-reason"\s*:\s*"([^"]*(?:\\.[^"]*)*)"?/);
      if (declinedReasonMatch) {
        extractedDeclinedReason = declinedReasonMatch[1].replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\\\/g, "\\");
      }

      // Try to extract complete ingredients as they become available
      const ingredientsMatch = cleanedText.match(/"ingredients"\s*:\s*\[(.*?)(\]|$)/s);
      if (ingredientsMatch) {
        const ingredientsContent = ingredientsMatch[1];

        // Find complete ingredient objects
        let braceCount = 0;
        let currentIngredient = "";
        let inString = false;
        let escapeNext = false;

        for (let i = 0; i < ingredientsContent.length; i++) {
          const char = ingredientsContent[i];

          if (escapeNext) {
            escapeNext = false;
            currentIngredient += char;
            continue;
          }

          if (char === "\\") {
            escapeNext = true;
            currentIngredient += char;
            continue;
          }

          if (char === '"' && !escapeNext) {
            inString = !inString;
          }

          if (!inString) {
            if (char === "{") {
              braceCount++;
              if (braceCount === 1) {
                currentIngredient = char; // Start new ingredient
                continue;
              }
            } else if (char === "}") {
              braceCount--;
              currentIngredient += char;

              if (braceCount === 0) {
                // Complete ingredient found
                try {
                  const ingredient = JSON.parse(currentIngredient);
                  if (ingredient.name && ingredient.category) {
                    extractedIngredients.push({
                      name: ingredient.name,
                      category: ingredient.category,
                      amount: ingredient.amount || "",
                      unit: ingredient.unit || "",
                      icon: ingredient.icon || "🥘",
                    });
                  }
                } catch (e) {
                  // Ignore malformed ingredient
                  console.warn("Failed to parse ingredient:", currentIngredient);
                }
                currentIngredient = "";
                continue;
              }
            }
          }

          if (braceCount > 0) {
            currentIngredient += char;
          }
        }
      }

      // Try to extract complete invalid ingredients as they become available
      const invalidIngredientsMatch = cleanedText.match(/"invalid-ingredients"\s*:\s*\[(.*?)(\]|$)/s);
      if (invalidIngredientsMatch) {
        const invalidIngredientsContent = invalidIngredientsMatch[1];

        // Find complete invalid ingredient objects
        let braceCount = 0;
        let currentInvalidIngredient = "";
        let inString = false;
        let escapeNext = false;

        for (let i = 0; i < invalidIngredientsContent.length; i++) {
          const char = invalidIngredientsContent[i];

          if (escapeNext) {
            escapeNext = false;
            currentInvalidIngredient += char;
            continue;
          }

          if (char === "\\") {
            escapeNext = true;
            currentInvalidIngredient += char;
            continue;
          }

          if (char === '"' && !escapeNext) {
            inString = !inString;
          }

          if (!inString) {
            if (char === "{") {
              braceCount++;
              if (braceCount === 1) {
                currentInvalidIngredient = char; // Start new invalid ingredient
                continue;
              }
            } else if (char === "}") {
              braceCount--;
              currentInvalidIngredient += char;

              if (braceCount === 0) {
                // Complete invalid ingredient found
                try {
                  const invalidIngredient = JSON.parse(currentInvalidIngredient);
                  if (invalidIngredient.name) {
                    extractedInvalidIngredients.push({
                      name: invalidIngredient.name,
                    });
                  }
                } catch (e) {
                  // Ignore malformed invalid ingredient
                  console.warn("Failed to parse invalid ingredient:", currentInvalidIngredient);
                }
                currentInvalidIngredient = "";
                continue;
              }
            }
          }

          if (braceCount > 0) {
            currentInvalidIngredient += char;
          }
        }
      }

      return {
        text: extractedText || undefined,
        ingredients: extractedIngredients.length > 0 ? extractedIngredients : undefined,
        declinedReason: extractedDeclinedReason || undefined,
        invalidIngredients: extractedInvalidIngredients.length > 0 ? extractedInvalidIngredients : undefined,
      };
    } catch (error) {
      console.warn("Error extracting streaming content:", error);
      return {};
    }
  }

  /**
   * Parse Gemini's response to extract structured data
   */
  private static parseGeminiResponse(aiResponse: string): GeminiResponse {
    try {
      // Remove markdown code blocks if present
      let cleanedResponse = aiResponse;

      // Remove ```json and ``` markers
      cleanedResponse = cleanedResponse.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
      // Also handle plain ``` markers
      cleanedResponse = cleanedResponse.replace(/^```\s*/i, "").replace(/\s*```$/, "");

      // Try to extract JSON from the response
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          text: parsed.text,
          ingredients: parsed.ingredients,
          declinedReason: parsed["declined-reason"],
          invalidIngredients: parsed["invalid-ingredients"],
        };
      }
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      console.error("Original response:", aiResponse);
    }

    // Fallback: return the raw response
    return {
      text: aiResponse || "Tôi không hiểu yêu cầu của bạn. Vui lòng thử lại.",
      ingredients: [],
      declinedReason: undefined,
      invalidIngredients: [],
    };
  }
}
