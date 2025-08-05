"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface NavigationFooterProps {
  currentStep: number
  canProceed: boolean
  onPrevStep: () => void
  onNextStep: () => void
}

export function NavigationFooter({ currentStep, canProceed, onPrevStep, onNextStep }: NavigationFooterProps) {
  const footerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate footer entrance
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1 },
      )
    }

    // Animate progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((currentStep + 1) / 4) * 100}%`,
        duration: 0.8,
        ease: "power2.out",
      })
    }

    // Animate navigation items
    if (navItemsRef.current) {
      const items = navItemsRef.current.children
      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 1.2, ease: "back.out(1.7)" },
      )
    }
  }, [currentStep])

  const handleButtonClick = (callback: () => void, element: HTMLElement) => {
    gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      onComplete: callback,
    })
  }

  return (
    <div ref={footerRef} className="absolute bottom-0 left-0 right-0 bg-white border-t max-w-md">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 max-w-md mx-auto">
        <div
          ref={progressRef}
          className="progress-bar h-full bg-pink-400 transition-all duration-800"
          style={{ width: "0%" }}
        />
      </div>

      {/* Step Navigation */}
      <div className="flex justify-between items-center p-4 max-w-md mx-auto">
        <Button
          variant="ghost"
          onClick={(e) => handleButtonClick(onPrevStep, e.currentTarget)}
          disabled={currentStep === 0}
          className="px-6 bg-transparent transition-all duration-200 hover:scale-105"
        >
          Bước trước
        </Button>
        <Button
          onClick={(e) => handleButtonClick(onNextStep, e.currentTarget)}
          disabled={!canProceed}
          className="px-6 bg-pink-400 hover:bg-pink-500 transition-all duration-200 hover:scale-105"
        >
          {currentStep === 3 ? "Hoàn thành" : "Bước kế tiếp"}
        </Button>
      </div>

      {/* Bottom Navigation */}
      {/* <div ref={navItemsRef} className="flex justify-around items-center py-2 bg-pink-100 max-w-md mx-auto">
        <div className="flex flex-col items-center p-2 cursor-pointer hover:scale-110 transition-transform duration-200">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-1 shadow-sm">
            <Home className="w-5 h-5 text-pink-400" />
          </div>
          <span className="text-xs text-pink-400">Tự làm</span>
        </div>
        <div className="flex flex-col items-center p-2 cursor-pointer hover:scale-110 transition-transform duration-200">
          <Search className="w-5 h-5 text-gray-400 mb-1" />
          <span className="text-xs text-gray-400">Đề xuất</span>
        </div>
        <div className="flex flex-col items-center p-2 cursor-pointer hover:scale-110 transition-transform duration-200">
          <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center mb-1 shadow-lg">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-pink-400">Mua sắm</span>
        </div>
        <div className="flex flex-col items-center p-2 cursor-pointer hover:scale-110 transition-transform duration-200">
          <ShoppingCart className="w-5 h-5 text-gray-400 mb-1" />
          <span className="text-xs text-gray-400">Mua sắm</span>
        </div>
        <div className="flex flex-col items-center p-2 cursor-pointer hover:scale-110 transition-transform duration-200">
          <MessageCircle className="w-5 h-5 text-gray-400 mb-1" />
          <span className="text-xs text-gray-400">Thêm</span>
        </div>
      </div> */}
    </div>
  )
}
