import { useState } from "react"

export interface DietPreference {
  dietMode: string
  supplementMode: string
}

export function useDietPreferences() {
  const [dietPreference, setDietPreference] = useState<DietPreference>({
    dietMode: "normal",
    supplementMode: "none",
  })

  const updateDietMode = (mode: string) => {
    setDietPreference((prev) => ({
      ...prev,
      dietMode: mode,
    }))
  }

  const updateSupplementMode = (mode: string) => {
    setDietPreference((prev) => ({
      ...prev,
      supplementMode: mode,
    }))
  }

  const resetPreferences = () => {
    setDietPreference({
      dietMode: "normal",
      supplementMode: "none",
    })
  }

  return {
    dietPreference,
    updateDietMode,
    updateSupplementMode,
    resetPreferences,
  }
}
