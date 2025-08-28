import type React from "react"

import { ChevronLeft } from "lucide-react"
import { Button } from "../ui/button"
import { useSlideInAnimation, useFadeInAnimation } from "../../hooks/use-gsap-animations-v2"

interface OnboardingLayoutProps {
    title: string
    description: string
    progress: number
    onBack: () => void
    onSkip?: () => void
    onContinue: () => void
    canContinue: boolean
    showSkip?: boolean
    isFirstStep: boolean
    children: React.ReactNode,
    contentClassName?: string
}

export const OnboardingLayout = ({
    title,
    description,
    progress,
    onBack,
    onSkip,
    onContinue,
    canContinue,
    showSkip = true,
    isFirstStep,
    children,
    contentClassName = "",
}: OnboardingLayoutProps) => {
    const containerRef = useSlideInAnimation()
    const contentRef = useFadeInAnimation()

    return (
        <div ref={containerRef} className="h-screen bg-[#fffdf9] flex flex-col overflow-hidden fixed inset-0">
            <div className="flex flex-col h-full max-w-2xl mx-auto w-full overflow-hidden">
                {/* Header - Fixed */}
                <div className="flex items-center justify-between px-4 pt-6 pb-4 flex-shrink-0">
                    {!isFirstStep && (
                        <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10">
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                    )}
                    {isFirstStep && <div className="h-10 w-10" />}
                </div>

                {/* Progress Bar - Fixed */}
                <div className="px-4 pb-6 flex-shrink-0">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-[#ff8c94] h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Content - Scrollable */}
                <div ref={contentRef} className={`flex-1 overflow-y-auto px-4 min-h-0 ${contentClassName}`}>
                    <h1 className="text-2xl font-semibold text-[#32201c] mb-4">{title}</h1>
                    <p className="text-[#32201c]/70 text-base mb-8 leading-relaxed">{description}</p>

                    <div className="pb-4">
                        {children}
                    </div>
                </div>

                {/* Navigation - Fixed */}
                <div className="flex gap-4 px-4 py-6 flex-shrink-0 bg-[#fffdf9]">
                    {showSkip && onSkip && (
                        <Button
                            variant="outline"
                            onClick={onSkip}
                            className="flex-1 h-12 rounded-full border-[#ff8c94]/30 text-[#ff8c94] bg-transparent hover:bg-[#ff8c94]/10"
                        >
                            Bỏ qua
                        </Button>
                    )}
                    <Button
                        onClick={onContinue}
                        disabled={!canContinue}
                        className="flex-1 h-12 rounded-full bg-[#ff8c94] hover:bg-[#f07784] text-white disabled:bg-gray-200 disabled:text-gray-400"
                    >
                        Tiếp tục
                    </Button>
                </div>
            </div>
        </div>
    )
}
