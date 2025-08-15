// Gemini API configuration and service functions
// ref on how to use: https://aistudio.google.com/apikey

import type { IngredientFormData } from "@/components/shared";

export interface GeminiResponse {
  text: string;
  ingredients?: IngredientFormData[];
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
- "rau-cu": rau củ, rau lá, củ quả (ví dụ: cà chua, cà rốt, hành tây, tỏi, giá đỗ, xà lách, khoai tây, v.v.)
- "che-pham-sua": sữa, phô mai, bơ, kem, sữa chua, v.v.
- "ngu-coc": gạo, mì, bánh mì, yến mạch, bột mì, v.v.
- "protein": thịt (gà, bò, heo, cá), trứng, đậu hũ/đậu phụ/tàu hũ, đậu, tôm, v.v.

Danh sách nguyên liệu thường gặp:
- Gà: ức gà, đùi gà, cánh gà, thịt gà
- Đậu hũ: đậu phụ, tàu hũ, đậu hũ tươi, đậu hũ chiên
- Rau: cà chua, hành tây, tỏi, gừng, ớt

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
      "category": "rau-cu|che-pham-sua|ngu-coc|protein",
      "amount": "Số lượng (để trống nếu không đề cập)",
      "unit": " \"\"|g|kg|mg|ml|l ",
      "icon": "Emoji phù hợp"
    }
  ]
}

Ví dụ phân tích chi tiết:
- "2kg ức gà, 100g giá đỗ" → 
  * Ức gà (protein, "2", "kg", "🐔")
  * Giá đỗ (rau-cu, "100", "g", "🌱")

- "300g cà chua 200g đậu phụ" → 
  * Cà chua (rau-cu, "300", "g", "🍅")
  * Đậu phụ (protein, "200", "g", "🧈")

- "2 cái xúc xích" → 
  * Xúc xích (protein, "2", "", "🌭")

- "Thêm cho tôi gà, bò, 100g thịt cừu" → 
  * Gà (protein, "", "", "🐔")
  * Bò (protein, "", "", "🐮")
  * Thịt cừu (protein, "100", "g", "🐑")

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
