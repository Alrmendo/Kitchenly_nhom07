import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Settings, Search, Edit } from "lucide-react"
import { Card } from "@/components/ui/card"
import { BottomNavigation } from "../shared/BottomNavigation"

export default function WeeklyMenu() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("suggest");
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSettingsClick = () => {
    navigate("/weekly-planner/preferences");
  };

  const handleEditRecipe = (mealName: string) => {
    navigate("/weekly-planner/recipe-editor", { state: { mealName } });
  };

  const menuData = [
    {
      day: "Thu 8th",
      meals: [
        {
          name: "Avocado Toast",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "All-day", color: "bg-[#dcfce7] text-[#016630]" },
            { label: "Vegan", color: "bg-[#f3e8ff] text-[#6e11b0]" },
          ],
        },
        {
          name: "Grilled Chicken Salad",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Low-carb", color: "bg-[#dbeafe] text-[#193cb8]" },
            { label: "Protein-rich", color: "bg-[#ffe2e2] text-[#9f0712]" },
          ],
        },
        {
          name: "Vegetarian Stir Fry",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "All-day", color: "bg-[#dcfce7] text-[#016630]" },
            { label: "Vegan", color: "bg-[#f3e8ff] text-[#6e11b0]" },
          ],
        },
      ],
    },
    {
      day: "Thu 9th",
      meals: [
        {
          name: "Grilled Chicken Salad",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Low-carb", color: "bg-[#dbeafe] text-[#193cb8]" },
            { label: "High-protein", color: "bg-[#ffe2e2] text-[#9f0712]" },
          ],
        },
        {
          name: "Vegetarian Stir Fry",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Vegan", color: "bg-[#f3e8ff] text-[#6e11b0]" },
            { label: "Low-salt", color: "bg-[#fef9c2] text-[#894b00]" },
          ],
        },
        {
          name: "Overnight Oats",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Vegetarian", color: "bg-[#dcfce7] text-[#016630]" },
            { label: "High-fiber", color: "bg-[#fffbeb] text-[#9f2d00]" },
          ],
        },
      ],
    },
    {
      day: "Thu 10",
      meals: [
        {
          name: "Vegetarian Stir Fry",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Vegan", color: "bg-[#f3e8ff] text-[#6e11b0]" },
            { label: "Low-salt", color: "bg-[#fef9c2] text-[#894b00]" },
          ],
        },
        {
          name: "Overnight Oats",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Vegetarian", color: "bg-[#dcfce7] text-[#016630]" },
            { label: "High-fiber", color: "bg-[#fffbeb] text-[#9f2d00]" },
          ],
        },
        {
          name: "Salmon Teriyaki",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Low-carb", color: "bg-[#dbeafe] text-[#193cb8]" },
            { label: "Omega-3", color: "bg-[#cefafe] text-[#005f78]" },
          ],
        },
      ],
    },
    {
      day: "Thu 11th",
      meals: [
        {
          name: "Overnight Oats",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Vegetarian", color: "bg-[#dcfce7] text-[#016630]" },
            { label: "High-fiber", color: "bg-[#fffbeb] text-[#9f2d00]" },
          ],
        },
        {
          name: "Salmon Teriyaki",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Low-carb", color: "bg-[#dbeafe] text-[#193cb8]" },
            { label: "Omega-3", color: "bg-[#cefafe] text-[#005f78]" },
          ],
        },
        {
          name: "Quinoa Buddha Bowl",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Vegan", color: "bg-[#f3e8ff] text-[#6e11b0]" },
            { label: "High-protein", color: "bg-[#ffe2e2] text-[#9f0712]" },
          ],
        },
      ],
    },
    {
      day: "Thu 12th",
      meals: [
        {
          name: "Salmon Teriyaki",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Low-carb", color: "bg-[#dbeafe] text-[#193cb8]" },
            { label: "Omega-3", color: "bg-[#cefafe] text-[#005f78]" },
          ],
        },
        {
          name: "Quinoa Buddha Bowl",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Vegan", color: "bg-[#f3e8ff] text-[#6e11b0]" },
            { label: "High-protein", color: "bg-[#ffe2e2] text-[#9f0712]" },
          ],
        },
        {
          name: "Greek Yogurt Parfait",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Vegetarian", color: "bg-[#dcfce7] text-[#016630]" },
            { label: "High-protein", color: "bg-[#ffe2e2] text-[#9f0712]" },
          ],
        },
      ],
    },
    {
      day: "Thu 13th",
      meals: [
        {
          name: "Quinoa Buddha Bowl",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Vegan", color: "bg-[#f3e8ff] text-[#6e11b0]" },
            { label: "High-protein", color: "bg-[#ffe2e2] text-[#9f0712]" },
          ],
        },
        {
          name: "Greek Yogurt Parfait",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Vegetarian", color: "bg-[#dcfce7] text-[#016630]" },
            { label: "High-protein", color: "bg-[#ffe2e2] text-[#9f0712]" },
          ],
        },
        {
          name: "Turkey Wrap",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "High-protein", color: "bg-[#ffe2e2] text-[#9f0712]" },
            { label: "Low-fat", color: "bg-[#fef9c2] text-[#894b00]" },
          ],
        },
      ],
    },
    {
      day: "Fri 14th",
      meals: [
        {
          name: "Greek Yogurt Parfait",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "Vegetarian", color: "bg-[#dcfce7] text-[#016630]" },
            { label: "High-protein", color: "bg-[#ffe2e2] text-[#9f0712]" },
          ],
        },
        {
          name: "Turkey Wrap",
          image: "/placeholder.svg?height=40&width=40",
          tags: [
            { label: "High-protein", color: "bg-[#ffe2e2] text-[#9f0712]" },
            { label: "Low-fat", color: "bg-[#fef9c2] text-[#894b00]" },
          ],
        },
        {
          name: "Mushroom Risotto",
          image: "/placeholder.svg?height=40&width=40",
          tags: [{ label: "Vegetarian", color: "bg-[#dcfce7] text-[#016630]" }],
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#fffdf9] pb-20">
      {/* Header */}
      <div className="bg-[#ff8c94] px-4 py-6">
        <div className="flex items-center justify-between mb-2">
          <Search className="w-6 h-6 text-white" />
          <h1 className="text-xl font-semibold text-white">Thực đơn tuần</h1>
          <button onClick={handleSettingsClick}>
            <Settings className="w-6 h-6 text-white" />
          </button>
        </div>
        <p className="text-center text-sm text-white/80">Kế hoạch ăn uống hàng ngày trong tuần</p>
      </div>

      {/* Menu Content */}
      <div className="px-4 pb-6 space-y-4">
        {menuData.map((dayData, dayIndex) => (
          <Card key={dayIndex} className="bg-white rounded-2xl p-4 shadow-sm border border-[#ff8c94]/20">
            <h2 className="text-lg font-medium text-[#32201c] mb-4">{dayData.day}</h2>
            <div className="space-y-4">
              {dayData.meals.map((meal, mealIndex) => (
                <div key={mealIndex} className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#eaeaea]">
                    <img
                      src={meal.image || "/placeholder.svg"}
                      alt={meal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-[#32201c]">{meal.name}</h3>
                      <button 
                        onClick={() => handleEditRecipe(meal.name)}
                        className="p-1 rounded-full hover:bg-[#ff8c94]/10 transition-colors"
                        aria-label={`Chỉnh sửa ${meal.name}`}
                      >
                        <Edit className="w-4 h-4 text-[#ff8c94]" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {meal.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 rounded-full text-xs font-medium bg-[#ff8c94]/20 text-[#ff8c94] border border-[#ff8c94]/30">
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
