import { useState } from "react"

export interface FoodPreference {
  id: string
  name: string
  selected: boolean
}

export function useFoodPreferences() {
  const [preferences, setPreferences] = useState<FoodPreference[]>([
    { id: "spicy", name: "Món cay", selected: false },
    { id: "sweet", name: "Món ngọt", selected: false },
    { id: "sour", name: "Món chua", selected: false },
    { id: "salty", name: "Món mặn", selected: false },
    { id: "vegetarian", name: "Món chay", selected: false },
    { id: "seafood", name: "Hải sản", selected: false },
  ])

  const togglePreference = (id: string) => {
    setPreferences((prev) => prev.map((pref) => (pref.id === id ? { ...pref, selected: !pref.selected } : pref)))
  }

  const getSelectedPreferences = () => {
    return preferences.filter((pref) => pref.selected)
  }

  const resetPreferences = () => {
    setPreferences((prev) => prev.map((pref) => ({ ...pref, selected: false })))
  }

  return {
    preferences,
    togglePreference,
    getSelectedPreferences,
    resetPreferences,
  }
}
