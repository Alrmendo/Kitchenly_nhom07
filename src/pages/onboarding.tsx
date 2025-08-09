import { useOnboarding } from "@/hooks/use-onboarding"
import { useGSAPAnimations } from "@/hooks/use-gsap-animations"
import { IngredientSelection } from "@/components/onboarding/ingredient-selection"
import { AllergySelection } from "@/components/onboarding/allergy-selection"
import { DietSelection } from "@/components/onboarding/diet-selection"
import { MenuPreferences } from "@/components/onboarding/menu-preferences"
import { NavigationFooter } from "@/components/onboarding/navigation-footer"
import { useState } from "react"

export default function OnboardingPage() {
  const {
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
  } = useOnboarding()

  const { animateStepExit } = useGSAPAnimations()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleStepChange = async (direction: "next" | "prev") => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // Animate current step exit
    await animateStepExit(direction === "next" ? "left" : "right")

    // Change step
    if (direction === "next") {
      nextStep()
    } else {
      prevStep()
    }

    // Allow new step to animate in
    setTimeout(() => {
      setIsTransitioning(false)
    }, 100)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <IngredientSelection
            ingredients={ingredients}
            selectedIngredients={data.selectedIngredients}
            onToggleIngredient={toggleIngredient}
            onAddCustom={addCustomIngredient}
          />
        )
      case 1:
        return <AllergySelection allergyTags={allergyTags} onToggleAllergy={toggleAllergy} />
      case 2:
        return <DietSelection dietOptions={dietOptions} onToggleDietOption={toggleDietOption} />
      case 3:
        return <MenuPreferences menuPreferences={menuPreferences} onToggleMenuPreference={toggleMenuPreference} />
      default:
        return null
    }
  }

  return (
    <div className="h-full bg-gradient-to-br from-pink-50 to-white max-w-full relative">
      <div className="h-full overflow-y-auto relative">{renderStep()}</div>
      <NavigationFooter
        currentStep={currentStep}
        canProceed={canProceed()}
        onPrevStep={() => handleStepChange("prev")}
        onNextStep={() => handleStepChange("next")}
      />
    </div>
  )
}
