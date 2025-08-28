import { OnboardingLayout } from "./onboarding-layout"
import { SelectionGrid } from "./selection-grid"

const FOOD_OPTIONS = [
    { id: "salad", label: "Salad cá hồi", image: "/salmon-salad-fresh-vegetables.jpg" },
    { id: "soup", label: "Súp cua", image: "https://bizweb.dktcdn.net/100/489/006/files/sup-cua-11.jpg" },
    { id: "fried-eggs", label: "Trứng chiên", image: "/fried-eggs-sunny-side-up.jpg" },
    { id: "seafood", label: "Hải sản", image: "/fresh-seafood-platter.png" },
    { id: "chicken", label: "Gà chiên", image: "https://file.hstatic.net/200000700229/article/dui-ga-chien-xu-1_9f961db92a3b4c4ea2b5679eda4fa71a.jpg" },
    { id: "meat", label: "Thịt kho", image: "https://cdn.tgdd.vn/2021/01/CookProduct/Thitkhotieu-1200x676.jpg" },
    { id: "burger", label: "Burger", image: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg" },
    { id: "pizza", label: "Pizza cá", image: "https://uk.ooni.com/cdn/shop/articles/20220211142645-margherita-9920_e41233d5-dcec-461c-b07e-03245f031dfe.jpg" },
    { id: "sushi", label: "Sushi bơ", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/960px-Sushi_platter.jpg" },]

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
