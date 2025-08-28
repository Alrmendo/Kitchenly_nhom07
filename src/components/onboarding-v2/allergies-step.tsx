import { OnboardingLayout } from "./onboarding-layout"
import { SelectionGrid } from "./selection-grid"

const ALLERGY_OPTIONS = [
    { id: "banana", label: "Chuối", image: "https://media.vov.vn/sites/default/files/styles/large/public/2024-07/ai_nen_an_chuoi_1.jpg" },
    { id: "meat", label: "Thịt", image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/D%C3%A9coupe_de_b%C5%93uf.jpg" },
    { id: "kiwi", label: "Kiwi", image: "https://cdn.britannica.com/45/126445-050-4C0FA9F6/Kiwi-fruit.jpg" },
    { id: "nuts", label: "Hạt dẻ", image: "https://traicayhoabien.com/wp-content/uploads/2023/03/hat-de-hap-6.png" },
    { id: "milk", label: "Sữa", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Glass_of_Milk_%2833657535532%29.jpg/1200px-Glass_of_Milk_%2833657535532%29.jpg" },
    { id: "eggs", label: "Trứng", image: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2025/3/8/photo-1741408427825-17414084285131651116857.jpeg" },
    { id: "peanuts", label: "Đậu phộng", image: "https://www.vinmec.com/static/uploads/20210524_042253_027495_an_lac_nhieu_2_max_1800x1800_jpg_1f678407c4.jpg" },
    { id: "bread", label: "Bánh mì", image: "https://cdn.tgdd.vn/2021/08/CookProduct/1-1200x676-42.jpg" },
    { id: "shrimp", label: "Tôm", image: "https://haisanloccantho.com/wp-content/uploads/2024/09/Tom-long-scaled.jpg" },

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
