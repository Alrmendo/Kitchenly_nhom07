import { useState } from "react"
import { ArrowLeft, Calendar, Star, RotateCcw } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"

const menuHistory = [
  {
    id: 1,
    name: "Healthy Mediterranean Week",
    dateRange: "Jan 1 - Jan 7, 2024",
    rating: 4.8,
    tags: ["Mediterranean", "Low-Carb", "Vegetarian"],
    totalMeals: 21,
    favorite: true,
  },
  {
    id: 2,
    name: "Quick & Easy Meals",
    dateRange: "Dec 25 - Dec 31, 2023",
    rating: 4.5,
    tags: ["Quick", "Family-Friendly", "Budget"],
    totalMeals: 21,
    favorite: false,
  },
  {
    id: 3,
    name: "Holiday Feast Week",
    dateRange: "Dec 18 - Dec 24, 2023",
    rating: 4.9,
    tags: ["Holiday", "Traditional", "Comfort Food"],
    totalMeals: 21,
    favorite: true,
  },
  {
    id: 4,
    name: "Keto Challenge Week",
    dateRange: "Dec 11 - Dec 17, 2023",
    rating: 4.2,
    tags: ["Keto", "Low-Carb", "High-Protein"],
    totalMeals: 21,
    favorite: false,
  },
  {
    id: 5,
    name: "Asian Fusion Week",
    dateRange: "Dec 4 - Dec 10, 2023",
    rating: 4.7,
    tags: ["Asian", "Spicy", "Vegetarian"],
    totalMeals: 21,
    favorite: true,
  },
]

interface HistoryScreenProps {
  onNavigate: (screen: string) => void
}

export default function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const [menus, setMenus] = useState(menuHistory)

  const toggleFavorite = (id: number) => {
    setMenus(menus.map((menu) => (menu.id === id ? { ...menu, favorite: !menu.favorite } : menu)))
  }

  const applyMenu = () => {
    // In a real app, this would apply the selected menu to the current week
    onNavigate("overview")
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
            <h1 className="font-semibold text-orange-900">Menu History</h1>
            <p className="text-sm text-orange-600">Reuse your favorite weekly menus</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Favorites Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-orange-900 mb-3 flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            Favorites
          </h2>
          <div className="space-y-3">
            {menus
              .filter((menu) => menu.favorite)
              .map((menu) => (
                <Card key={menu.id} className="border-orange-200 hover:border-orange-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{menu.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{menu.dateRange}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-700">{menu.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">• {menu.totalMeals} meals</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(menu.id)}
                        className="text-yellow-500 hover:bg-yellow-50"
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {menu.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button onClick={applyMenu} className="w-full bg-orange-500 hover:bg-orange-600">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Apply This Menu
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All History */}
        <div>
          <h2 className="text-lg font-semibold text-orange-900 mb-3">All History</h2>
          <div className="space-y-3">
            {menus.map((menu) => (
              <Card key={menu.id} className="border-orange-100 hover:border-orange-200 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{menu.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{menu.dateRange}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{menu.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">• {menu.totalMeals} meals</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(menu.id)}
                      className={
                        menu.favorite ? "text-yellow-500 hover:bg-yellow-50" : "text-gray-400 hover:bg-gray-50"
                      }
                    >
                      <Star className={`h-4 w-4 ${menu.favorite ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {menu.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={applyMenu}
                      size="sm"
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
