import { useState } from "react"
import { ArrowLeft, Clock, ChefHat, Search, Star } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import Input from "../ui/input"
import { Badge } from "../ui/badge"

const alternativeMeals = [
  {
    id: 1,
    name: "Mediterranean Bowl",
    time: "15 min",
    difficulty: "Easy",
    tag: "Vegan",
    rating: 4.8,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 2,
    name: "Protein Smoothie Bowl",
    time: "8 min",
    difficulty: "Easy",
    tag: "High-Protein",
    rating: 4.6,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 3,
    name: "Chia Pudding",
    time: "5 min",
    difficulty: "Easy",
    tag: "Vegan",
    rating: 4.7,
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 4,
    name: "Egg Benedict",
    time: "20 min",
    difficulty: "Medium",
    tag: "Classic",
    rating: 4.9,
    image: "/placeholder.svg?height=120&width=120",
  },
]

interface MealEditScreenProps {
  data: any
  onNavigate: (screen: string, data?: any) => void
}

export default function MealEditScreen({ data, onNavigate }: MealEditScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    time: "",
    difficulty: "",
    dietary: "",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-orange-100 p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => onNavigate("overview")} className="text-orange-700">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-orange-900">Edit {data.meal}</h1>
            <p className="text-sm text-orange-600">{data.day}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Meal */}
        <Card className="border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-medium text-orange-600">CURRENT MEAL</span>
              {data.expiring && (
                <Badge variant="destructive" className="text-xs">
                  Uses expiring ingredients
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <img
                src={data.image || "/placeholder.svg"}
                alt={data.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{data.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {data.time}
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    {data.tag}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10 border-orange-200 focus:border-orange-400"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <select
              value={selectedFilters.time}
              onChange={(e) => setSelectedFilters({ ...selectedFilters, time: e.target.value })}
              className="w-32 p-2 border border-orange-200 rounded-md focus:border-orange-400 focus:outline-none"
            >
              <option value="">Time</option>
              <option value="quick">Under 15 min</option>
              <option value="medium">15-30 min</option>
              <option value="long">30+ min</option>
            </select>

            <select
              value={selectedFilters.difficulty}
              onChange={(e) => setSelectedFilters({ ...selectedFilters, difficulty: e.target.value })}
              className="w-32 p-2 border border-orange-200 rounded-md focus:border-orange-400 focus:outline-none"
            >
              <option value="">Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              value={selectedFilters.dietary}
              onChange={(e) => setSelectedFilters({ ...selectedFilters, dietary: e.target.value })}
              className="w-32 p-2 border border-orange-200 rounded-md focus:border-orange-400 focus:outline-none"
            >
              <option value="">Dietary</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="keto">Keto</option>
              <option value="gluten-free">Gluten-Free</option>
            </select>
          </div>
        </div>

        {/* Alternative Suggestions */}
        <div>
          <h2 className="font-semibold text-orange-900 mb-3">Alternative Suggestions</h2>
          <div className="space-y-3">
            {alternativeMeals.map((meal) => (
              <Card
                key={meal.id}
                className="border-orange-100 hover:border-orange-200 transition-colors cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={meal.image || "/placeholder.svg"}
                      alt={meal.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{meal.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{meal.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {meal.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <ChefHat className="h-3 w-3" />
                          {meal.difficulty}
                        </div>
                        <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                          {meal.tag}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => onNavigate("overview")}
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Custom Recipe */}
        <Card className="border-dashed border-2 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ChefHat className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Add Your Own Recipe</h3>
            <p className="text-sm text-gray-600 mb-4">Create a custom recipe for this meal</p>
            <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent">
              Add Custom Recipe
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
