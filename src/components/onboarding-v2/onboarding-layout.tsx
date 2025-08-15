"use client"

import type React from "react"

import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSlideInAnimation, useFadeInAnimation } from "@/hooks/use-gsap-animations-v2"

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
        <div ref={containerRef} className="min-h-screen bg-white p-4">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    {!isFirstStep && (
                        <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10">
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                    )}
                    {isFirstStep && <div className="h-10 w-10" />}
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-red-400 h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div ref={contentRef} className={`h-[500px] overflow-y-auto ${contentClassName}`}>
                    <h1 className="text-xl font-semibold text-gray-900 mb-3">{title}</h1>
                    <p className="text-gray-600 text-sm mb-8 leading-relaxed">{description}</p>

                    {children}
                </div>

                {/* Navigation */}
                <div className="flex gap-3 mt-8">
                    {showSkip && onSkip && (
                        <Button
                            variant="outline"
                            onClick={onSkip}
                            className="flex-1 h-12 rounded-full border-gray-200 text-gray-600 bg-transparent"
                        >
                            Bỏ qua
                        </Button>
                    )}
                    <Button
                        onClick={onContinue}
                        disabled={!canContinue}
                        className="flex-1 h-12 rounded-full !bg-red-400 hover:!bg-red-500 text-white disabled:bg-gray-200 disabled:text-gray-400"
                    >
                        Tiếp tục
                    </Button>
                </div>
            </div>
        </div>
    )
}
