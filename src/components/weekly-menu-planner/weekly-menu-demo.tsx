import { useState } from "react"
import { Calendar, Settings, ShoppingCart, History } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import WeeklyMenuLayout from "./layout"
import ShoppingListScreen from "./shopping-list-screen"
import SettingsScreen from "./settings-screen"
import MealEditScreen from "./meal-edit-screen"
import HistoryScreen from "./history-screen"

const weeklyMenuData = [
  {
    day: "Monday",
    meals: [
      { type: "Breakfast", name: "Avocado Toast", time: "10 min", tag: "Healthy", image: "/avocado-toast-vegetables.jpg" },
      { type: "Lunch", name: "Mediterranean Bowl", time: "15 min", tag: "Vegan", image: "/colorful-vegetarian-meal.png" },
      { type: "Dinner", name: "Grilled Salmon", time: "25 min", tag: "Protein", image: "/salmon-salad-fresh-vegetables.jpg" }
    ]
  },
  {
    day: "Tuesday", 
    meals: [
      { type: "Breakfast", name: "Protein Smoothie", time: "5 min", tag: "Quick", image: "/protein-rich-meal.jpg" },
      { type: "Lunch", name: "Chicken Burger", time: "20 min", tag: "Comfort", image: "/chicken_burger.png" },
      { type: "Dinner", name: "Vegetarian Pasta", time: "18 min", tag: "Vegetarian", image: "/vegetarian-food-spread.png" }
    ]
  },
  {
    day: "Wednesday",
    meals: [
      { type: "Breakfast", name: "Pancakes", time: "15 min", tag: "Sweet", image: "/cherry_pancake.png" },
      { type: "Lunch", name: "Fresh Seafood", time: "30 min", tag: "Premium", image: "/fresh-seafood-platter.png" },
      { type: "Dinner", name: "Roasted Chicken", time: "45 min", tag: "Traditional", image: "/roasted-chicken-herbs.jpg" }
    ]
  }
]

interface WeeklyMenuDemoProps {
  onNavigate?: (screen: string) => void
}

export default function WeeklyMenuDemo({ onNavigate }: WeeklyMenuDemoProps) {
  const [currentScreen, setCurrentScreen] = useState("overview")
  const [editData, setEditData] = useState(null)

  const handleNavigate = (screen: string, data?: any) => {
    if (screen === "edit" && data) {
      setEditData(data)
      setCurrentScreen("edit")
    } else {
      setCurrentScreen(screen)
    }
    
    if (onNavigate) {
      onNavigate(screen)
    }
  }

  const handleMealEdit = (day: string, meal: any) => {
    const mealData = {
      ...meal,
      day,
      meal: meal.type
    }
    handleNavigate("edit", mealData)
  }

  if (currentScreen === "shopping-list") {
    return (
      <WeeklyMenuLayout>
        <ShoppingListScreen onNavigate={handleNavigate} />
      </WeeklyMenuLayout>
    )
  }

  if (currentScreen === "settings") {
    return (
      <WeeklyMenuLayout>
        <SettingsScreen onNavigate={handleNavigate} />
      </WeeklyMenuLayout>
    )
  }

  if (currentScreen === "edit" && editData) {
    return (
      <WeeklyMenuLayout>
        <MealEditScreen data={editData} onNavigate={handleNavigate} />
      </WeeklyMenuLayout>
    )
  }

  if (currentScreen === "history") {
    return (
      <WeeklyMenuLayout>
        <HistoryScreen onNavigate={handleNavigate} />
      </WeeklyMenuLayout>
    )
  }

  // Overview screen
  return (
    <WeeklyMenuLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-orange-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-orange-900">Weekly Menu Planner</h1>
              <p className="text-sm text-orange-600">Jan 8 - Jan 14, 2024</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleNavigate("settings")}
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleNavigate("history")}
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                <History className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleNavigate("shopping-list")}
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-orange-100">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">21</div>
                <div className="text-sm text-gray-600">Total Meals</div>
              </CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">Healthy</div>
              </CardContent>
            </Card>
            <Card className="border-orange-100">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">$127</div>
                <div className="text-sm text-gray-600">Est. Cost</div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Menu */}
          <div className="space-y-4">
            {weeklyMenuData.map((day) => (
              <Card key={day.day} className="border-orange-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-900">
                    <Calendar className="h-5 w-5" />
                    {day.day}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.meals.map((meal) => (
                      <div
                        key={meal.type}
                        className="border border-orange-100 rounded-lg p-3 hover:border-orange-200 transition-colors cursor-pointer"
                        onClick={() => handleMealEdit(day.day, meal)}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={meal.image} 
                            alt={meal.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="text-xs font-medium text-orange-600 uppercase mb-1">
                              {meal.type}
                            </div>
                            <div className="font-medium text-gray-900">{meal.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">{meal.time}</span>
                              <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                                {meal.tag}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => handleNavigate("shopping-list")}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Generate Shopping List
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
              onClick={() => handleNavigate("settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Meal Preferences
            </Button>
          </div>
        </div>
      </div>
    </WeeklyMenuLayout>
  )
}
