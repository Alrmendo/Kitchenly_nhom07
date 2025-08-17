import { useState } from "react"
import { ArrowLeft, Check, ShoppingCart, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

const shoppingCategories = [
  {
    name: "Vegetables & Fruits",
    items: [
      { name: "Avocados", quantity: "3 pieces", inStock: false, checked: false },
      { name: "Spinach", quantity: "1 bag", inStock: true, checked: false },
      { name: "Tomatoes", quantity: "4 pieces", inStock: false, checked: false },
      { name: "Bananas", quantity: "1 bunch", inStock: false, checked: true },
    ],
  },
  {
    name: "Proteins",
    items: [
      { name: "Salmon fillet", quantity: "2 pieces", inStock: false, checked: false },
      { name: "Greek yogurt", quantity: "1 container", inStock: true, checked: false },
      { name: "Chicken breast", quantity: "500g", inStock: false, checked: false },
    ],
  },
  {
    name: "Grains & Pantry",
    items: [
      { name: "Quinoa", quantity: "1 bag", inStock: true, checked: false },
      { name: "Whole grain bread", quantity: "1 loaf", inStock: false, checked: false },
      { name: "Olive oil", quantity: "1 bottle", inStock: true, checked: false },
    ],
  },
  {
    name: "Dairy & Eggs",
    items: [
      { name: "Eggs", quantity: "1 dozen", inStock: false, checked: false },
      { name: "Milk", quantity: "1 liter", inStock: true, checked: false },
    ],
  },
]

interface ShoppingListScreenProps {
  onNavigate: (screen: string) => void
}

export default function ShoppingListScreen({ onNavigate }: ShoppingListScreenProps) {
  const [categories, setCategories] = useState(shoppingCategories)

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].items[itemIndex].checked = !newCategories[categoryIndex].items[itemIndex].checked
    setCategories(newCategories)
  }

  const totalItems = categories.reduce((total, category) => total + category.items.length, 0)
  const checkedItems = categories.reduce(
    (total, category) => total + category.items.filter((item) => item.checked).length,
    0,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-orange-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => onNavigate("overview")} className="text-orange-700">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-orange-900">Shopping List</h1>
              <p className="text-sm text-orange-600">
                {checkedItems} of {totalItems} items
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-orange-100 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(checkedItems / totalItems) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Auto-generated notice */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-orange-700">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Auto-generated from your weekly menu</span>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Categories */}
        {categories.map((category, categoryIndex) => (
          <Card key={category.name} className="border-orange-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-orange-900 flex items-center justify-between">
                {category.name}
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {category.items.filter((item) => !item.checked).length} items
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={item.name}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      item.checked
                        ? "bg-gray-50 border-gray-200 opacity-60"
                        : "bg-white border-orange-100 hover:border-orange-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(categoryIndex, itemIndex)}
                      className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${item.checked ? "line-through text-gray-500" : "text-gray-900"}`}
                        >
                          {item.name}
                        </span>
                        {item.inStock && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            In Stock
                          </Badge>
                        )}
                      </div>
                      <span className={`text-sm ${item.checked ? "text-gray-400" : "text-gray-600"}`}>
                        {item.quantity}
                      </span>
                    </div>
                    {item.checked && (
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Custom Item */}
        <Card className="border-dashed border-2 border-orange-200">
          <CardContent className="p-4">
            <Button variant="ghost" className="w-full text-orange-700 hover:bg-orange-50">
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Item
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
