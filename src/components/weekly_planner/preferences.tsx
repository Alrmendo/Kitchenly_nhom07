import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus } from "lucide-react"
import { Button, Input, Card, Switch, Slider } from "@/components/ui"

export default function PreferencesPage() {
  const navigate = useNavigate();
  const [selectedDiets, setSelectedDiets] = useState<string[]>([])
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [cookingTime, setCookingTime] = useState([60])
  const [difficulty, setDifficulty] = useState("Easy")
  const [newIngredient, setNewIngredient] = useState("")
  const [dislikedIngredients, setDislikedIngredients] = useState<string[]>([])

  const handleBack = () => {
    navigate("/weekly-planner");
  };

  const dietaryOptions = [
  "Ăn chay",
  "Thuần chay",
  "Ăn cá",
  "Keto",
  "Paleo",
  "Ít tinh bột",
  "Ít chất béo",
  "Ít muối",
  "Không chứa gluten",
  "Không chứa sữa",
  "Không chứa hạt",
  "Giàu protein",
  "Giàu chất xơ",
  "Địa Trung Hải",
  "Thân thiện cho người tiểu đường",
]

const cuisineOptions = [
  "Ý",
  "Mexico",
  "Châu Á",
  "Địa Trung Hải",
  "Mỹ",
  "Ấn Độ",
  "Thái",
  "Nhật Bản",
  "Pháp",
  "Hy Lạp",
  "Trung Đông",
  "Trung Quốc",
  "Hàn Quốc",
  "Tây Ban Nha",
  "Việt Nam",
  "Lebanon",
]

const commonDislikes = [
  "Nấm",
  "Hành tây",
  "Tỏi",
  "Ngò",
  "Ô liu",
  "Cà chua",
  "Ớt chuông",
  "Hải sản",
  "Đồ cay",
  "Dừa",
  "Bơ",
  "Bông cải xanh",
  "Bắp cải tí hon",
  "Phô mai xanh",
  "Cá cơm",
]


  const toggleSelection = (item: string, list: string[], setList: (items: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const addIngredient = () => {
    if (newIngredient.trim() && !dislikedIngredients.includes(newIngredient.trim())) {
      setDislikedIngredients([...dislikedIngredients, newIngredient.trim()])
      setNewIngredient("")
    }
  }

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      {/* Header */}
      <div className="bg-[#ff8c94] px-4 py-4 flex items-center gap-3">
        <button onClick={handleBack}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-white flex items-center gap-2">
            <span>Tùy chỉnh thực đơn</span>
          </h1>
          <p className="text-sm text-white/80">Cá nhân hóa gợi ý món ăn của bạn</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Dietary Restrictions */}
        <Card className="p-6 bg-white border-[#ff8c94]/20">
          <h2 className="text-lg font-semibold text-[#32201c] mb-4 flex items-center gap-2">
            <span className="text-[#ff8c94]">🥗</span>
            Hạn chế chế độ ăn
          </h2>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((diet) => (
              <button
                key={diet}
                onClick={() => toggleSelection(diet, selectedDiets, setSelectedDiets)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  selectedDiets.includes(diet)
                    ? "bg-[#ff8c94] text-white border-[#ff8c94]"
                    : "bg-white text-[#32201c] border-[#ff8c94]/30 hover:border-[#ff8c94]"
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </Card>

        {/* Preferred Cuisines */}
        <Card className="p-6 bg-white border-[#ff8c94]/20">
          <h2 className="text-lg font-semibold text-[#32201c] mb-4 flex items-center gap-2">
            <span className="text-[#ff8c94]">🍜</span>
            Ẩm thực yêu thích
          </h2>
          <div className="flex flex-wrap gap-2">
            {cuisineOptions.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => toggleSelection(cuisine, selectedCuisines, setSelectedCuisines)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  selectedCuisines.includes(cuisine)
                    ? "bg-[#ff8c94] text-white border-[#ff8c94]"
                    : "bg-white text-[#32201c] border-[#ff8c94]/30 hover:border-[#ff8c94]"
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </Card>

        {/* Disliked Ingredients */}
        <Card className="p-6 bg-white border-[#e5e5e5]">
          <h2 className="text-lg font-semibold text-[#7e2a0c] mb-4">Những nguyên liệu không thích</h2>

          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Thêm nguyên liệu cần tránh..."
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addIngredient()}
              className="flex-1 border-[#e5e5e5] focus:border-[#ff6900]"
            />
            <Button onClick={addIngredient} size="icon" className="bg-[#ff6900] hover:bg-[#ca3500] text-white">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-[#737373] mb-2">Những nguyên liệu không thích:</p>
            <div className="flex flex-wrap gap-2">
              {commonDislikes.map((ingredient) => (
                <button
                  key={ingredient}
                  onClick={() => toggleSelection(ingredient, dislikedIngredients, setDislikedIngredients)}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    dislikedIngredients.includes(ingredient)
                      ? "bg-[#e5e5e5] text-[#737373] border-[#e5e5e5]"
                      : "bg-white text-[#737373] border-[#e5e5e5] hover:border-[#737373]"
                  }`}
                >
                  + {ingredient}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Cooking Preferences */}
        <Card className="p-6 bg-white border-[#e5e5e5]">
          <h2 className="text-lg font-semibold text-[#7e2a0c] mb-6">Sở thích nấu ăn</h2>

          <div className="mb-6">
            <p className="text-sm font-medium text-[#0a0a0a] mb-4">Thời gian nấu tối đa: {cookingTime[0]} phút</p>
            <div className="relative">
              <Slider
                value={cookingTime}
                onValueChange={setCookingTime}
                max={120}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[#737373] mt-2">
                <span>10 min</span>
                <span>60 min</span>
                <span>120 min</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-[#0a0a0a] mb-3">Mức độ khó</p>
            <div className="flex gap-2">
              {["Dễ", "Trung bình", "Khó"].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    difficulty === level
                      ? level === "Easy"
                        ? "bg-[#00c950] text-white"
                        : level === "Medium"
                          ? "bg-[#ff6900] text-white"
                          : "bg-[#737373] text-white"
                      : "bg-[#f5f5f5] text-[#737373] hover:bg-[#e5e5e5]"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Priority Settings */}
        <Card className="p-6 bg-white border-[#e5e5e5]">
          <h2 className="text-lg font-semibold text-[#7e2a0c] mb-4">Cài đặt ưu tiên</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#0a0a0a]">Ưu tiên nguyên liệu theo mùa</p>
                <p className="text-sm text-[#737373]">Gợi ý công thức với nguyên liệu theo mùa</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#0a0a0a]">Ưu tiên nguyên liệu giá rẻ</p>
                <p className="text-sm text-[#737373]">Tập trung vào các tùy chọn bữa ăn tiết kiệm</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#0a0a0a]">Ưu tiên các tùy chọn lành mạnh</p>
                <p className="text-sm text-[#737373]">Nhấn mạnh các bữa ăn dinh dưỡng, cân bằng</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#0a0a0a]">Sử dụng nguyên liệu sắp hết hạn trước</p>
                <p className="text-sm text-[#737373]">Ưu tiên công thức sử dụng các nguyên liệu sắp hết hạn</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button className="w-full bg-[#ff8c94] hover:bg-[#f07784] text-white py-4 text-lg font-semibold">
          Lưu tùy chỉnh
        </Button>
      </div>
    </div>
  )
}
