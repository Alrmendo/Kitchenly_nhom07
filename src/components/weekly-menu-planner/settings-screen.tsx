import { useState } from "react"
import { ArrowLeft, User, Utensils, DollarSign, Leaf, Clock } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

const dietaryRestrictions = [
  { id: "vegetarian", name: "Vegetarian", active: true },
  { id: "vegan", name: "Vegan", active: false },
  { id: "gluten-free", name: "Gluten-Free", active: false },
  { id: "dairy-free", name: "Dairy-Free", active: false },
  { id: "keto", name: "Keto", active: false },
  { id: "low-sodium", name: "Low Sodium", active: true },
  { id: "low-fat", name: "Low Fat", active: false },
  { id: "paleo", name: "Paleo", active: false },
]

const dislikedIngredients = ["Mushrooms", "Cilantro", "Olives", "Blue Cheese"]

const preferredCuisines = [
  { name: "Mediterranean", active: true },
  { name: "Asian", active: true },
  { name: "Mexican", active: false },
  { name: "Italian", active: true },
  { name: "Indian", active: false },
  { name: "American", active: false },
]

interface SettingsScreenProps {
  onNavigate: (screen: string) => void
}

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [maxCookingTime, setMaxCookingTime] = useState([30])
  const [budgetPriority, setBudgetPriority] = useState(true)
  const [seasonalPriority, setSeasonalPriority] = useState(true)
  const [restrictions, setRestrictions] = useState(dietaryRestrictions)
  const [cuisines, setCuisines] = useState(preferredCuisines)

  const toggleRestriction = (id: string) => {
    setRestrictions(restrictions.map((r) => (r.id === id ? { ...r, active: !r.active } : r)))
  }

  const toggleCuisine = (name: string) => {
    setCuisines(cuisines.map((c) => (c.name === name ? { ...c, active: !c.active } : c)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-orange-100 p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => onNavigate("overview")} className="text-orange-700">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-orange-900">Menu Preferences</h1>
            <p className="text-sm text-orange-600">Customize your meal suggestions</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Dietary Restrictions */}
        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <Utensils className="h-5 w-5" />
              Dietary Restrictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {restrictions.map((restriction) => (
                <Badge
                  key={restriction.id}
                  variant={restriction.active ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors ${
                    restriction.active
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => toggleRestriction(restriction.id)}
                >
                  {restriction.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disliked Ingredients */}
        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <User className="h-5 w-5" />
              Disliked Ingredients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-3">
              {dislikedIngredients.map((ingredient) => (
                <Badge key={ingredient} variant="destructive" className="bg-red-100 text-red-700">
                  {ingredient}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 bg-transparent">
              Add Ingredient
            </Button>
          </CardContent>
        </Card>

        {/* Preferred Cuisines */}
        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <Utensils className="h-5 w-5" />
              Preferred Cuisines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cuisines.map((cuisine) => (
                <Badge
                  key={cuisine.name}
                  variant={cuisine.active ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors ${
                    cuisine.active ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => toggleCuisine(cuisine.name)}
                >
                  {cuisine.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cooking Preferences */}
        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <Clock className="h-5 w-5" />
              Cooking Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Maximum Cooking Time</span>
                <span className="text-sm text-orange-600">{maxCookingTime[0]} minutes</span>
              </div>
              <input
                type="range"
                min={10}
                max={120}
                step={5}
                value={maxCookingTime[0]}
                onChange={(e) => setMaxCookingTime([parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </CardContent>
        </Card>

        {/* Priority Settings */}
        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <Leaf className="h-5 w-5" />
              Priority Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Prioritize Budget-Friendly</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={budgetPriority}
                  onChange={(e) => setBudgetPriority(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Prioritize Seasonal Ingredients</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={seasonalPriority}
                  onChange={(e) => setSeasonalPriority(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Save Preferences</Button>
      </div>
    </div>
  )
}
