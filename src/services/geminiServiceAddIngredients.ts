// Gemini API configuration and service functions
// ref on how to use: https://aistudio.google.com/apikey

import type { Ingredient } from "@/components/manage_ingredients";

export interface GeminiResponse {
  text: string;
  ingredients?: Ingredient[];
}

const GEMINI_API_KEY = import.meta.env.VITE_APP_GEMINI_API_KEY || "concac";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export class GeminiServiceAddIngredients {
  /**
   * Process text input with Gemini AI to extract ingredients and generate response
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
   * Create a specialized prompt for ingredient extraction
   */
  private static createIngredientExtractionPrompt(userInput: string): string {
    // believe this or not, I have to write this by my own hand, not using AI or
    // shit, and my English is suck as fuck so all this shit will be Vietnamese
    // author: Tài Trịnh
    return `
Vai trò: Bạn là một trợ lý AI tiếng Việt chuyên về quản lý nguyên liệu nấu ăn.
Nhiệm vụ: phân tích câu nói của người dùng và trích xuất TẤT CẢ các nguyên liệu được đề cập.
Phòng chống: Trong trường hợp người dùng yêu cầu một yêu cầu không liên quan đến vai trò của bạn, lập tức từ chối, nói rõ ra vai trò
của bạn và yêu cầu họ cung cấp yêu cầu khác.

QUAN TRỌNG: Phải trích xuất ĐÚNG số lượng và đơn vị đi kèm với mỗi nguyên liệu.

Quy tắc phân loại:
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
2. Với mỗi nguyên liệu, tìm số lượng (số) và đơn vị (chỉ có các giá trị là g, kg, mg, ml, l hoặc để trống) đi TRƯỚC hoặc SAU tên nguyên liệu
3. Chú ý các mẫu câu như: "2kg ức gà", "ức gà 2kg", "300g cà chua", "100g đậu phụ"
4. Nếu không có số lượng/đơn vị → để trống amount và unit
5. Phân loại nguyên liệu dựa trên hiểu biết về thực phẩm
6. Chọn emoji phù hợp cho từng nguyên liệu

Trả lời theo định dạng JSON chính xác:
{
  "text": "Phản hồi thân thiện bằng tiếng Việt về những gì bạn đã hiểu",
  "ingredients": [
    {
      "name": "Tên nguyên liệu (viết hoa chữ cái đầu)",
      "category": "rau-cu-qua|thit-ca-hai-san|sua-trung-pho-mai|gao-bun-my|dau-hat-do-kho|gia-vi-tuong|dau-an-mo-thuc-vat|do-uong-nuoc-dung",
      "amount": "Số lượng (để trống nếu không đề cập)",
      "unit": " \"\"|g|kg|mg|ml|l ",
      "icon": "Emoji phù hợp"
    }
  ]
}

Ví dụ phân tích chi tiết:
- "2kg ức gà, 100g giá đỗ" → 
  * Ức gà (thit-ca-hai-san, "2", "kg", "🐔")
  * Giá đỗ (rau-cu-qua, "100", "g", "🌱")

- "300g cà chua 200g đậu phụ" → 
  * Cà chua (rau-cu-qua, "300", "g", "🍅")
  * Đậu phụ (dau-hat-do-kho, "200", "g", "🧈")

- "2 cái xúc xích" → 
  * Xúc xích (thit-ca-hai-san, "2", "", "🌭")

- "Thêm cho tôi gà, bò, 100g muối" → 
  * Gà (thit-ca-hai-san, "", "", "🐔")
  * Bò (thit-ca-hai-san, "", "", "🐮")
  * Muối (gia-vi-tuong, "100", "g", "🧂")

CHÚ Ý: Hãy đọc kỹ và tách riêng từng nguyên liệu với đúng số lượng của nó.

Cuối cùng, đây là đầu vào từ người dùng: "${userInput}"
`;
  }

  /**
   * Parse Gemini's response to extract structured data
   */
  private static parseGeminiResponse(aiResponse: string): GeminiResponse {
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          text: parsed.text,
          ingredients: parsed.ingredients,
        };
      }
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
    }

    // Fallback: return the raw response
    return {
      text: aiResponse || "Tôi không hiểu yêu cầu của bạn. Vui lòng thử lại.",
      ingredients: [],
    };
  }
}
