import { OnboardingLayout } from "./onboarding-layout"
import { SelectionGrid } from "./selection-grid"

const ALLERGY_OPTIONS = [
    { id: "banana", label: "Chuối", image: "/placeholder.svg?height=120&width=120" },
    { id: "meat", label: "Thịt", image: "/placeholder.svg?height=120&width=120" },
    { id: "kiwi", label: "Kiwi", image: "/placeholder.svg?height=120&width=120" },
    { id: "nuts", label: "Hạt dẻ", image: "/placeholder.svg?height=120&width=120" },
    { id: "milk", label: "Sữa", image: "/placeholder.svg?height=120&width=120" },
    { id: "eggs", label: "Trứng", image: "/placeholder.svg?height=120&width=120" },
    { id: "peanuts", label: "Đậu nành", image: "/placeholder.svg?height=120&width=120" },
    { id: "bread", label: "Bánh mì", image: "/placeholder.svg?height=120&width=120" },
    { id: "shrimp", label: "Tôm", image: "/placeholder.svg?height=120&width=120" },
    { id: "chocolate", label: "Hạt ốc chó", image: "/placeholder.svg?height=120&width=120" },
    { id: "seafood", label: "Hải sản", image: "/placeholder.svg?height=120&width=120" },
    { id: "fish", label: "Cá", image: "/placeholder.svg?height=120&width=120" },
    { id: "soy-sauce", label: "Nước mắm", image: "/placeholder.svg?height=120&width=120" },
    { id: "soybeans", label: "Đậu bắp", image: "/placeholder.svg?height=120&width=120" },
    { id: "lentils", label: "Đậu phụng", image: "/placeholder.svg?height=120&width=120" },
]

interface AllergiesStepProps {
    data: any
    updateData: (field: string, value: any) => void
    nextStep: () => void
    prevStep: () => void
    skipStep: () => void
    isFirstStep: boolean
    progress: number
    currentStepData: any
}

export const AllergiesStep = ({
    data,
    updateData,
    nextStep,
    prevStep,
    skipStep,
    isFirstStep,
    progress,
    currentStepData,
}: AllergiesStepProps) => {
    const handleSelectionChange = (selected: string[]) => {
        updateData("allergies", selected)
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
                items={ALLERGY_OPTIONS}
                selectedItems={data.allergies}
                onSelectionChange={handleSelectionChange}
                multiSelect={true}
                columns={3}
            />
        </OnboardingLayout>
    )
}
