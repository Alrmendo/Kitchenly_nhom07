import { OnboardingLayout } from "./onboarding-layout"
import { SelectionGrid } from "./selection-grid"

const DIET_OPTIONS = [
  { id: "vegetarian", label: "Ăn chay", image: "/colorful-vegetarian-meal.png" },
  { id: "no-sugar", label: "Kiêng đường", image: "/sugar-free-macarons.jpg" },
  { id: "pure", label: "Thuần đạm", image: "/roasted-chicken-herbs.jpg" },
  { id: "supplement-vegetables", label: "Bổ sung rau", image: "/avocado-toast-vegetables.jpg" },
  { id: "supplement-protein", label: "Bổ sung protein", image: "/protein-rich-meal.jpg" },
  { id: "no-milk", label: "Kiêng sữa", image: "/placeholder-a11wh.jpg" },
]

interface DietPreferencesStepProps {
  data: any
  updateData: (field: string, value: any) => void
  nextStep: () => void
  prevStep: () => void
  skipStep: () => void
  isFirstStep: boolean
  progress: number
  currentStepData: any
}

export const DietPreferencesStep = ({
  data,
  updateData,
  nextStep,
  prevStep,
  skipStep,
  isFirstStep,
  progress,
  currentStepData,
}: DietPreferencesStepProps) => {
  const handleSelectionChange = (selected: string[]) => {
    updateData("dietPreferences", selected)
  }

  return (
    <OnboardingLayout
      title={currentStepData.title}
      description={currentStepData.description}
      progress={progress}
      onBack={prevStep}
      onSkip={skipStep}
      onContinue={nextStep}
      canContinue={true}
      isFirstStep={isFirstStep}
    >
      <SelectionGrid
        items={DIET_OPTIONS}
        selectedItems={data.dietPreferences}
        onSelectionChange={handleSelectionChange}
        multiSelect={true}
        columns={2}
      />

     </OnboardingLayout>
  )
}
