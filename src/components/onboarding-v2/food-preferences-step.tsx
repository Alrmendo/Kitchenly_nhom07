import { OnboardingLayout } from "./onboarding-layout"
import { SelectionGrid } from "./selection-grid"

const FOOD_OPTIONS = [
    { id: "salad", label: "Salad cá hồi", image: "/salmon-salad-fresh-vegetables.jpg" },
    { id: "soup", label: "Súp cua", image: "/placeholder-douxq.jpg" },
    { id: "fried-eggs", label: "Trứng chiên", image: "/fried-eggs-sunny-side-up.jpg" },
    { id: "seafood", label: "Hải sản", image: "/fresh-seafood-platter.png" },
    { id: "chicken", label: "Gà chiên", image: "/placeholder.svg?height=120&width=120" },
    { id: "meat", label: "Thịt kho", image: "/placeholder.svg?height=120&width=120" },
    { id: "burger", label: "Burger tôm", image: "/placeholder.svg?height=120&width=120" },
    { id: "pizza", label: "Pizza cá", image: "/placeholder.svg?height=120&width=120" },
    { id: "sushi", label: "Sushi bơ", image: "/placeholder.svg?height=120&width=120" },
    { id: "fried-rice", label: "Cơm chiên", image: "/placeholder.svg?height=120&width=120" },
    { id: "tiramisu", label: "Tiramisu", image: "/placeholder.svg?height=120&width=120" },
    { id: "bread", label: "Bánh mì", image: "/placeholder.svg?height=120&width=120" },
]

interface FoodPreferencesStepProps {
    data: any
    updateData: (field: string, value: any) => void
    nextStep: () => void
    prevStep: () => void
    skipStep: () => void
    isFirstStep: boolean
    progress: number
    currentStepData: any
}

export const FoodPreferencesStep = ({
    data,
    updateData,
    nextStep,
    prevStep,
    skipStep,
    isFirstStep,
    progress,
    currentStepData,
}: FoodPreferencesStepProps) => {
    const handleSelectionChange = (selected: string[]) => {
        updateData("foodPreferences", selected)
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
                items={FOOD_OPTIONS}
                selectedItems={data.foodPreferences}
                onSelectionChange={handleSelectionChange}
                multiSelect={true}
                columns={3}
            />

       </OnboardingLayout>
    )
}
