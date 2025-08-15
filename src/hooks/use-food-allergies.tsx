import { useState } from "react"

export function useFoodAllergies() {
  const [allergies, setAllergies] = useState<string[]>([])
  const [allergyInput, setAllergyInput] = useState("")

  const addAllergy = (allergy: string) => {
    if (allergy.trim() && !allergies.includes(allergy.trim())) {
      setAllergies((prev) => [...prev, allergy.trim()])
    }
  }

  const removeAllergy = (allergy: string) => {
    setAllergies((prev) => prev.filter((item) => item !== allergy))
  }

  const updateAllergyInput = (input: string) => {
    setAllergyInput(input)
  }

  const parseAllergiesFromInput = (input: string) => {
    const allergyList = input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
    setAllergies(allergyList)
  }

  const clearAllergies = () => {
    setAllergies([])
    setAllergyInput("")
  }

  return {
    allergies,
    allergyInput,
    addAllergy,
    removeAllergy,
    updateAllergyInput,
    parseAllergiesFromInput,
    clearAllergies,
  }
}
