import { OnboardingLayout } from "./onboarding-layout"
import { useStaggerAnimation } from "../../hooks/use-gsap-animations-v2"

const COOKING_LEVELS = [
    {
        id: "beginner",
        title: "Người mới bắt đầu",
        description:
            "Dễ hiểu, nhanh gọn - phù hợp cho những ai mới vào bếp. Bạn sẽ học những món cơ bản và kỹ thuật đơn giản nhất.",
    },
    {
        id: "intermediate",
        title: "Trung cấp",
        description:
            "Đã quen với việc nấu nướng và muốn thử thách hơn? Cấp độ này giúp bạn khám phá nhiều công thức phong phú và kỹ thuật nâng cao.",
    },
    {
        id: "advanced",
        title: "Nâng cao",
        description: "Kỹ năng bếp đã vững vàng? Hãy chinh phục các món phức tạp hơn, đòi hỏi sự tinh tế và khéo léo.",
    },
    {
        id: "professional",
        title: "Chuyên nghiệp",
        description: "Bạn là bậc thầy trong bếp? Cấp độ này dành cho những công thức đỉnh cao và sáng tạo không giới hạn.",
    },
]

interface CookingLevelStepProps {
    data: any
    updateData: (field: string, value: any) => void
    nextStep: () => void
    prevStep: () => void
    isFirstStep: boolean
    progress: number
    currentStepData: any
}

export const CookingLevelStep = ({
    data,
    updateData,
    nextStep,
    prevStep,
    isFirstStep,
    progress,
    currentStepData,
}: CookingLevelStepProps) => {
    const cardsRef = useStaggerAnimation()

    const handleLevelSelect = (levelId: string) => {
        updateData("cookingLevel", levelId)
    }

    return (
        <OnboardingLayout
            title={currentStepData.title}
            description={currentStepData.description}
            progress={progress}
            onBack={prevStep}
            onContinue={nextStep}
            canContinue={!!data.cookingLevel}
            showSkip={false}
            isFirstStep={isFirstStep}
        >
            <div ref={cardsRef} className="space-y-4">
                {COOKING_LEVELS.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => handleLevelSelect(level.id)}
                        className={`
              w-full p-4 rounded-2xl border-2 text-left transition-all duration-200
              ${data.cookingLevel === level.id
                                ? "border-red-400 bg-red-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }
            `}
                    >
                        <h3 className="font-semibold text-gray-900 mb-2">{level.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{level.description}</p>
                    </button>
                ))}
            </div>
        </OnboardingLayout>
    )
}
