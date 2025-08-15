import { useState, useEffect, useCallback } from "react"

export interface FoodItem {
  id: string
  name: string
  image: string
  category?: string
  cookingTime?: number
  difficulty?: "Dễ" | "Trung bình" | "Khó"
  tags?: string[]
  isFavorite?: boolean
  isCooked?: boolean
}

export interface FoodCategory {
  id: string
  title: string
  items: FoodItem[]
  viewMoreText: string
}

export const useFoodData = () => {
  // Category data (mock API)
  const [categories, setCategories] = useState<FoodCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const mockCategories: FoodCategory[] = [
        {
          id: "fast-food",
          title: "Món ăn nhanh",
          viewMoreText: "Xem thêm",
          items: [
            {
              id: "1",
              name: "Pizza",
              image: "/tiramisu.png",
              category: "fast-food",
            },
            {
              id: "2",
              name: "Burger",
              image: "/tiramisu.png",
              category: "fast-food",
            },
            {
              id: "3",
              name: "Hot Dog",
              image: "/tiramisu.png",
              category: "fast-food",
            },
          ],
        },
        {
          id: "mid-autumn",
          title: "Lẩu hội trung thu",
          viewMoreText: "Xem thêm",
          items: [
            {
              id: "4",
              name: "Bánh trung thu",
              image: "/tiramisu.png",
              category: "mid-autumn",
            },
            {
              id: "5",
              name: "Lẩu thái",
              image: "/tiramisu.png",
              category: "mid-autumn",
            },
            {
              id: "6",
              name: "Chả cá",
              image: "/tiramisu.png",
              category: "mid-autumn",
            },
          ],
        },
        {
          id: "delicious",
          title: "Rất ngon",
          viewMoreText: "Xem thêm",
          items: [
            {
              id: "7",
              name: "Bánh mì",
              image: "/tiramisu.png",
              category: "delicious",
            },
            {
              id: "8",
              name: "Phở",
              image: "/tiramisu.png",
              category: "delicious",
            },
            {
              id: "9",
              name: "Bún bò Huế",
              image: "/tiramisu.png",
              category: "delicious",
            },
          ],
        },
      ]

      setTimeout(() => {
        setCategories(mockCategories)
        setLoading(false)
      }, 1000)
    }

    fetchData()
  }, [])

  // Food items for favorites/cooked tab
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: "1",
      name: "Salad mì ống Địa Trung Hải",
      image: "/mediterranean-pasta-salad.png",
      cookingTime: 15,
      difficulty: "Dễ",
      tags: ["Chay", "Nhanh"],
      isFavorite: true,
      isCooked: false,
    },
    {
      id: "2",
      name: "Phở bò truyền thống",
      image: "/traditional-beef-pho.png",
      cookingTime: 120,
      difficulty: "Khó",
      tags: ["Truyền thống", "Nóng"],
      isFavorite: false,
      isCooked: true,
    },
    {
      id: "3",
      name: "Bánh mì thịt nướng",
      image: "/placeholder-1uiur.png",
      cookingTime: 30,
      difficulty: "Trung bình",
      tags: ["Nhanh", "Đường phố"],
      isFavorite: true,
      isCooked: false,
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"favorites" | "cooked">("favorites")

  const toggleFavorite = useCallback((id: string) => {
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    )
  }, [])

  const toggleCooked = useCallback((id: string) => {
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCooked: !item.isCooked } : item
      )
    )
  }, [])

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "favorites" ? item.isFavorite : item.isCooked
    return matchesSearch && matchesTab
  })

  return {
    categories,
    loading,
    foodItems: filteredItems,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    toggleFavorite,
    toggleCooked,
  }
}