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
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Keto",
    "Paleo",
    "Low-carb",
    "Low-fat",
    "Low-salt",
    "Gluten-free",
    "Dairy-free",
    "Nut-free",
    "High-protein",
    "High-fiber",
    "Mediterranean",
    "Diabetic-friendly",
  ]

  const cuisineOptions = [
    "Italian",
    "Mexican",
    "Asian",
    "Mediterranean",
    "American",
    "Indian",
    "Thai",
    "Japanese",
    "French",
    "Greek",
    "Middle Eastern",
    "Chinese",
    "Korean",
    "Spanish",
    "Vietnamese",
    "Lebanese",
  ]

  const commonDislikes = [
    "Mushrooms",
    "Onions",
    "Garlic",
    "Cilantro",
    "Olives",
    "Tomatoes",
    "Bell peppers",
    "Seafood",
    "Spicy food",
    "Coconut",
    "Avocado",
    "Broccoli",
    "Brussels sprouts",
    "Blue cheese",
    "Anchovies",
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
            <span>⚙️</span>
            Tùy chỉnh thực đơn
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
          <h2 className="text-lg font-semibold text-[#7e2a0c] mb-4">Disliked Ingredients</h2>

          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add ingredient to avoid..."
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
            <p className="text-sm text-[#737373] mb-2">Common dislikes:</p>
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
          <h2 className="text-lg font-semibold text-[#7e2a0c] mb-6">Cooking Preferences</h2>

          <div className="mb-6">
            <p className="text-sm font-medium text-[#0a0a0a] mb-4">Maximum Cooking Time: {cookingTime[0]} minutes</p>
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
            <p className="text-sm font-medium text-[#0a0a0a] mb-3">Preferred Difficulty Levels</p>
            <div className="flex gap-2">
              {["Easy", "Medium", "Hard"].map((level) => (
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
          <h2 className="text-lg font-semibold text-[#7e2a0c] mb-4">Priority Settings</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#0a0a0a]">Prioritize seasonal ingredients</p>
                <p className="text-sm text-[#737373]">Suggest recipes with in-season produce</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#0a0a0a]">Prioritize low-cost ingredients</p>
                <p className="text-sm text-[#737373]">Focus on budget-friendly meal options</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#0a0a0a]">Prioritize healthy options</p>
                <p className="text-sm text-[#737373]">Emphasize nutritious, balanced meals</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#0a0a0a]">Use expiring ingredients first</p>
                <p className="text-sm text-[#737373]">Prioritize recipes that use items about to expire</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button className="w-full bg-[#ff8c94] hover:bg-[#f07784] text-white py-4 text-lg font-semibold">
          💾 Lưu tùy chỉnh
        </Button>
      </div>
    </div>
  )
}
