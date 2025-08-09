"use client"

import { Header } from "@/components/discovery/header"
import { HeroSection } from "@/components/discovery/hero-section"
import { FoodCategory } from "@/components/discovery/food-category"
import { useFoodData } from "@/hooks/use-food-data"
import { useGSAPAnimations } from "@/hooks/use-gsap-animations"
import { useEffect } from "react"

export default function DiscoveryPage() {
  const { categories, loading } = useFoodData()
  const { containerRef, animateStepEntry } = useGSAPAnimations()

  useEffect(() => {
    if (!loading) {
      animateStepEntry()
    }
  }, [loading, animateStepEntry])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-50 pb-20 overflow-y-auto">
      <Header />
      <HeroSection />

      <div ref={containerRef} className="space-y-6">
        {categories.map((category, index) => (
          <FoodCategory key={category.id} category={category} index={index} />
        ))}
      </div>
    </div>
  )
}
