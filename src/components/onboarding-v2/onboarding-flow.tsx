"use client"

import { useOnboarding } from "@/hooks/use-onboarding-v2"
import { CookingLevelStep } from "./cooking-level-step"
import { DietPreferencesStep } from "./diet-preferences-step"
import { FoodPreferencesStep } from "./food-preferences-step"
import { AllergiesStep } from "./allergies-step"
import { IngredientsStep } from "./ingredients-step"

export const OnboardingFlow = () => {
  const {
    currentStep,
    data,
    updateData,
    nextStep,
    prevStep,
    skipStep,
    isLastStep,
    isFirstStep,
    progress,
    currentStepData,
  } = useOnboarding()

  const handleComplete = () => {
    console.log("Onboarding completed with data:", data)
    // Handle completion - redirect to main app, save data, etc.
  }

  // Render the appropriate step component based on currentStep
  const renderCurrentStep = () => {
    const commonProps = {
      data,
      updateData: updateData as (field: string, value: any) => void,
      nextStep: isLastStep ? handleComplete : nextStep,
      prevStep,
      skipStep,
      isFirstStep,
      progress,
      currentStepData,
    }

    switch (currentStep) {
      case 0:
        return <CookingLevelStep {...commonProps} />
      case 1:
        return <DietPreferencesStep {...commonProps} />
      case 2:
        return <FoodPreferencesStep {...commonProps} />
      case 3:
        return <AllergiesStep {...commonProps} />
      case 4:
        return <IngredientsStep {...commonProps} />
      default:
        return <CookingLevelStep {...commonProps} />
    }
  }

  return <div key={currentStep}>{renderCurrentStep()}</div>
}
