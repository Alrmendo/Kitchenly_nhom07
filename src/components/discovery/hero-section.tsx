import { useGSAPAnimations } from "@/hooks/use-gsap-animations"
import { useEffect } from "react"

export const HeroSection = () => {
  const { containerRef, animateStepEntry } = useGSAPAnimations()

  useEffect(() => {
    const timer = setTimeout(() => {
      animateStepEntry()
    }, 200)
    return () => clearTimeout(timer)
  }, [animateStepEntry])

  return (
    <div
      ref={containerRef}
      className="mx-4 mb-6 rounded-2xl overflow-hidden bg-gradient-to-r from-pink-400 to-pink-500 relative"
    >
      <div className="flex items-center h-48">
        <div className="flex-1 p-6">
          <h1 className="text-white text-2xl font-bold leading-tight">
            DỰA TRÊN
            <br />
            SỞ THÍCH
          </h1>
        </div>
        <div className="flex-1 relative">
          <img src="/tiramisu.png" alt="Chef cooking" className="w-full h-48 object-cover" />
        </div>
      </div>
    </div>
  )
}
