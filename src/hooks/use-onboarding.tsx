import { useState, useCallback } from "react"

export interface Ingredient {
  id: string
  name: string
  icon: string
}

export interface AllergyTag {
  id: string
  name: string
  selected: boolean
}

export interface DietOption {
  id: string
  name: string
  image: string
  selected: boolean
}

export interface MenuPreference {
  id: string
  name: string
  selected: boolean
}

export interface OnboardingData {
  selectedIngredients: string[]
  allergies: string[]
  dietOptions: string[]
  menuPreferences: string[]
}

export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    selectedIngredients: [],
    allergies: [],
    dietOptions: [],
    menuPreferences: [],
  })

  const ingredients: Ingredient[] = [
    { id: "lemon", name: "Chanh", icon: "🍋" },
    { id: "avocado", name: "Bơ", icon: "🥑" },
    { id: "strawberry", name: "Dâu", icon: "🍓" },
    { id: "broccoli", name: "Bông cải xanh", icon: "🥦" },
    { id: "carrot", name: "Carrot", icon: "🥕" },
    { id: "rice", name: "Gạo", icon: "🍚" },
    { id: "tomato", name: "Cà chua", icon: "🍅" },
    { id: "walnut", name: "Quả óc chó", icon: "🥜" },
    { id: "coconut", name: "Dừa", icon: "🥥" },
    { id: "cucumber", name: "Dưa leo", icon: "🥒" },
    { id: "onion", name: "Hành nhân", icon: "🧅" },
    { id: "banana", name: "Chuối", icon: "🍌" },
    { id: "cherry", name: "Cherry", icon: "🍒" },
    { id: "garlic", name: "Tỏi gia", icon: "🧄" },
    { id: "lime", name: "Cà tim", icon: "🍈" },
    { id: "apple", name: "Táo", icon: "🍎" },
  ]

  const [allergyTags, setAllergyTags] = useState<AllergyTag[]>([
    { id: "eggs", name: "Trứng", selected: false },
    { id: "fish", name: "Cá", selected: false },
    { id: "nuts", name: "Hạnh nhân", selected: false },
    { id: "gluten", name: "Gluten", selected: false },
    { id: "chocolate", name: "Chocolate", selected: false },
    { id: "butter", name: "Bơ", selected: false },
    { id: "fat", name: "Mỡ tạt", selected: false },
    { id: "beans", name: "Đậu", selected: false },
    { id: "flour", name: "Đậu phộng", selected: false },
    { id: "peanuts", name: "Đậu nành", selected: false },
    { id: "seeds", name: "Hạt óc chó", selected: false },
  ])

  const [dietOptions, setDietOptions] = useState<DietOption[]>([
    { id: "vegetarian", name: "Ăn chay", image: "/image.png", selected: false },
    { id: "sugar-free", name: "Kiêng đường", image: "/image.png", selected: false },
    { id: "vegan", name: "Thuần chay", image: "/image.png", selected: false },
    { id: "high-vegetable", name: "Bổ sung rau", image: "/image.png", selected: false },
  ])

  const [menuPreferences, setMenuPreferences] = useState<MenuPreference[]>([
    { id: "special", name: "Đặc biệt", selected: false },
    { id: "very-cold", name: "Lạnh mạnh", selected: false },
    { id: "cold", name: "Lạnh", selected: false },
    { id: "diet", name: "Chế độ ăn kiêng", selected: false },
    { id: "light", name: "Dễ nấu", selected: false },
    { id: "gluten-free", name: "Gluten", selected: false },
    { id: "sweet", name: "Bánh ăn vặt", selected: false },
    { id: "dessert", name: "Tráng miệng", selected: false },
  ])

  const toggleIngredient = useCallback((ingredientId: string) => {
    setData((prev) => ({
      ...prev,
      selectedIngredients: prev.selectedIngredients.includes(ingredientId)
        ? prev.selectedIngredients.filter((id) => id !== ingredientId)
        : [...prev.selectedIngredients, ingredientId],
    }))
  }, [])

  const toggleAllergy = useCallback(
    (allergyId: string) => {
      setAllergyTags((prev) => prev.map((tag) => (tag.id === allergyId ? { ...tag, selected: !tag.selected } : tag)))
      setData((prev) => ({
        ...prev,
        allergies: allergyTags
          .map((tag) => (tag.id === allergyId ? { ...tag, selected: !tag.selected } : tag))
          .filter((tag) => tag.selected)
          .map((tag) => tag.id),
      }))
    },
    [allergyTags],
  )

  const toggleDietOption = useCallback(
    (dietId: string) => {
      setDietOptions((prev) =>
        prev.map((option) => (option.id === dietId ? { ...option, selected: !option.selected } : option)),
      )
      setData((prev) => ({
        ...prev,
        dietOptions: dietOptions
          .map((option) => (option.id === dietId ? { ...option, selected: !option.selected } : option))
          .filter((option) => option.selected)
          .map((option) => option.id),
      }))
    },
    [dietOptions],
  )

  const toggleMenuPreference = useCallback(
    (prefId: string) => {
      setMenuPreferences((prev) =>
        prev.map((pref) => (pref.id === prefId ? { ...pref, selected: !pref.selected } : pref)),
      )
      setData((prev) => ({
        ...prev,
        menuPreferences: menuPreferences
          .map((pref) => (pref.id === prefId ? { ...pref, selected: !pref.selected } : pref))
          .filter((pref) => pref.selected)
          .map((pref) => pref.id),
      }))
    },
    [menuPreferences],
  )

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 0:
        return data.selectedIngredients.length > 0
      case 1:
        return true // Allergies are optional
      case 2:
        return true // Diet options are optional
      case 3:
        return data.menuPreferences.length >= 1
      default:
        return false
    }
  }, [currentStep, data])

  const addCustomIngredient = useCallback(() => {
    // Placeholder for adding custom ingredients
    console.log("Add custom ingredient functionality")
  }, [])

  return {
    currentStep,
    data,
    ingredients,
    allergyTags,
    dietOptions,
    menuPreferences,
    toggleIngredient,
    toggleAllergy,
    toggleDietOption,
    toggleMenuPreference,
    nextStep,
    prevStep,
    canProceed,
    addCustomIngredient,
  }
}
