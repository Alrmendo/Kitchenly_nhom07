import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/use-auth"
import { useOnboarding } from "../../hooks/use-onboarding-v2"
import { CookingLevelStep } from "./cooking-level-step"
import { DietPreferencesStep } from "./diet-preferences-step"
import { FoodPreferencesStep } from "./food-preferences-step"
import { AllergiesStep } from "./allergies-step"
import { IngredientsStep } from "./ingredients-step"
import { Check } from "lucide-react"

export const OnboardingFlow = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [showCompletion, setShowCompletion] = useState(false);
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
    // Save preferences and complete onboarding
    localStorage.setItem('user-preferences', JSON.stringify(data));
    completeOnboarding();
    
    // Show completion message
    setShowCompletion(true);
    
    // Navigate to home after a delay
    setTimeout(() => {
      navigate("/home");
    }, 2000);
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

  // Show completion screen if onboarding is completed
  if (showCompletion) {
    return (
      <div className="min-h-screen bg-[#fffdf9] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ff8c94]">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#32201c] mb-4">Hoàn thành!</h1>
          <p className="text-lg text-[#32201c]/70 mb-2">Cảm ơn bạn đã hoàn tất thiết lập</p>
          <p className="text-sm text-[#ff8c94]">Đang chuyển đến trang chủ...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fffdf9]" key={currentStep}>
      {renderCurrentStep()}
    </div>
  )
}
