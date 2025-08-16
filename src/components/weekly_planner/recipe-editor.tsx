import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Search, Clock, ChefHat, X, Plus, ChevronDown, ArrowLeft } from "lucide-react"
import { Button, Input } from "@/components/ui"

const recipes = [
  {
    id: 1,
    name: "Grilled Chicken Salad",
    time: "25 min",
    difficulty: "Medium",
    tags: ["Low-carb", "High-protein"],
    tagColors: ["bg-[#dbeafe] text-[#193cb8]", "bg-[#ffe2e2] text-[#9f0712]"],
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    time: "20 min",
    difficulty: "Easy",
    tags: ["Vegan", "Low-salt"],
    tagColors: ["bg-[#d0fae5] text-[#006045]", "bg-[#fef9c2] text-[#894b00]"],
  },
  {
    id: 3,
    name: "Overnight Oats",
    time: "5 min",
    difficulty: "Easy",
    tags: ["Vegetarian", "High-fiber"],
    tagColors: ["bg-[#d0fae5] text-[#006045]", "bg-[#fef9c2] text-[#894b00]"],
  },
  {
    id: 4,
    name: "Salmon Teriyaki",
    time: "30 min",
    difficulty: "Medium",
    tags: ["Low-carb", "Omega-3"],
    tagColors: ["bg-[#dbeafe] text-[#193cb8]", "bg-[#cefafe] text-[#005f78]"],
  },
  {
    id: 5,
    name: "Quinoa Buddha Bowl",
    time: "35 min",
    difficulty: "Medium",
    tags: ["Vegan", "High-protein"],
    tagColors: ["bg-[#d0fae5] text-[#006045]", "bg-[#ffe2e2] text-[#9f0712]"],
  },
  {
    id: 6,
    name: "Greek Yogurt Parfait",
    time: "5 min",
    difficulty: "Easy",
    tags: ["Vegetarian", "High-protein"],
    tagColors: ["bg-[#d0fae5] text-[#006045]", "bg-[#ffe2e2] text-[#9f0712]"],
  },
  {
    id: 7,
    name: "Turkey Wrap",
    time: "10 min",
    difficulty: "Easy",
    tags: ["High-protein", "Low-fat"],
    tagColors: ["bg-[#ffe2e2] text-[#9f0712]", "bg-[#f3e8ff] text-[#6e11b0]"],
  },
  {
    id: 8,
    name: "Mushroom Risotto",
    time: "45 min",
    difficulty: "Hard",
    tags: ["Vegetarian"],
    tagColors: ["bg-[#d0fae5] text-[#006045]"],
  },
  {
    id: 9,
    name: "Smoothie Bowl",
    time: "10 min",
    difficulty: "Easy",
    tags: ["Vegan", "High-fiber"],
    tagColors: ["bg-[#d0fae5] text-[#006045]", "bg-[#fef9c2] text-[#894b00]"],
  },
]

export default function RecipeEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const mealName = location.state?.mealName || "Recipe";
  
  const [searchQuery, setSearchQuery] = useState("")

  const handleBack = () => {
    navigate("/weekly-planner");
  };

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#ff8c94]/20 bg-[#ff8c94]">
          <button onClick={handleBack} className="p-1 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-lg font-semibold text-white">Chỉnh sửa: {mealName}</h2>
          <button onClick={handleBack} className="p-1 hover:bg-white/20 rounded-full">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Current Selection */}
          <div className="p-6">
            <div className="bg-[#fff7ed] border border-[#ffd6a7] rounded-xl p-4">
              <h3 className="font-semibold text-[#000000] mb-2">Avocado Toast</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-[#ff6900]">
                  <Clock className="h-4 w-4" />
                  <span>10 min</span>
                </div>
                <div className="flex items-center gap-1 text-[#ff6900]">
                  <ChefHat className="h-4 w-4" />
                  <span>Easy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="px-6 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666666]" />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#fafafa] border-[#e5e5e5] text-[#666666] placeholder:text-[#99a1af]"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 mb-6 space-y-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <Button
                  variant="outline"
                  className="w-full justify-between bg-[#fafafa] border-[#e5e5e5] text-[#666666]"
                >
                  All Levels
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <Button
                  variant="outline"
                  className="w-full justify-between bg-[#fafafa] border-[#e5e5e5] text-[#666666]"
                >
                  Any Time
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-between bg-[#fafafa] border-[#e5e5e5] text-[#666666]">
              All Diets
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Alternative Recipes */}
          <div className="px-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#000000]">Alternative Recipes (9)</h3>
              <Button variant="ghost" size="sm" className="text-[#ff6900] hover:bg-[#fff7ed]">
                <Plus className="h-4 w-4 mr-1" />
                Custom
              </Button>
            </div>

            {/* Recipe List */}
            <div className="space-y-3 pb-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex gap-3 p-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fafafa] cursor-pointer"
                >
                  <div className="w-16 h-16 bg-[#eaeaea] rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#000000] mb-1">{recipe.name}</h4>
                    <div className="flex items-center gap-3 text-sm mb-2">
                      <div className="flex items-center gap-1 text-[#ff6900]">
                        <Clock className="h-3 w-3" />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#ff6900]">
                        <ChefHat className="h-3 w-3" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {recipe.tags.map((tag, index) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${recipe.tagColors[index]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
