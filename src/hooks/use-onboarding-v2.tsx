import { useState, useCallback } from "react"

export interface OnboardingData {
  cookingLevel: string
  dietPreferences: string[]
  foodPreferences: string[]
  allergies: string[]
  ingredients: string[]
  customIngredients: string[]
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  component: string
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "cooking-level",
    title: "Trình độ nấu ăn của bạn là gì?",
    description: "Vui lòng chọn trình độ nấu ăn của bạn để nhận được gợi ý phù hợp hơn.",
    component: "CookingLevelStep",
  },
  {
    id: "diet-preferences",
    title: "Bạn có theo chế độ ăn nào không?",
    description: "Chúng tôi muốn tham khảo thông tin về chế độ ăn của bạn để đưa ra thực đơn tốt hơn.",
    component: "DietPreferencesStep",
  },
  {
    id: "food-preferences",
    title: "Sở thích món ăn của bạn là gì?",
    description: "Vui lòng chọn sở thích món ăn để nhận gợi ý phù hợp hơn, hoặc bạn có thể bỏ qua.",
    component: "FoodPreferencesStep",
  },
  {
    id: "allergies",
    title: "Bạn có bị dị ứng gì không?",
    description: "Thông tin này sẽ giúp bạn tránh các thành phần gây dị ứng trong món ăn.",
    component: "AllergiesStep",
  },
  {
    id: "ingredients",
    title: "Bạn thích nguyên liệu nào?",
    description: "Việc cung cấp nguyên liệu giúp chúng tôi cá nhân hóa thực đơn tốt hơn.",
    component: "IngredientsStep",
  },
]

export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    cookingLevel: "",
    dietPreferences: [],
    foodPreferences: [],
    allergies: [],
    ingredients: [],
    customIngredients: [],
  })

  const updateData = useCallback((field: keyof OnboardingData, value: any) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const nextStep = useCallback(() => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }, [currentStep])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const skipStep = useCallback(() => {
    nextStep()
  }, [nextStep])

  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1
  const isFirstStep = currentStep === 0
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100

  return {
    currentStep,
    data,
    updateData,
    nextStep,
    prevStep,
    skipStep,
    isLastStep,
    isFirstStep,
    progress,
    steps: ONBOARDING_STEPS,
    currentStepData: ONBOARDING_STEPS[currentStep],
  }
}
