import { Button } from "@/components/ui/button"
import Badge from "@/components/ui/badge"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAPAnimations } from "@/hooks/use-gsap-animations"
import type { MenuPreference } from "@/hooks/use-onboarding"

interface MenuPreferencesProps {
  menuPreferences: MenuPreference[]
  onToggleMenuPreference: (id: string) => void
}

export function MenuPreferences({ menuPreferences, onToggleMenuPreference }: MenuPreferencesProps) {
  const { containerRef, animateStepEntry, animateSelection } = useGSAPAnimations()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const preferencesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    animateStepEntry()

    // Animate title and subtitle
    gsap.fromTo(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
    )

    // Animate preference badges with wave effect
    if (preferencesContainerRef.current) {
      const badges = preferencesContainerRef.current.children
      gsap.fromTo(
        badges,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.4,
          ease: "back.out(2)",
        },
      )
    }
  }, [animateStepEntry])

  const handlePreferenceClick = (prefId: string, element: HTMLElement) => {
    const pref = menuPreferences.find((p) => p.id === prefId)
    animateSelection(element, !pref?.selected)

    // Add sparkle effect for selection
    gsap.to(element, {
      boxShadow: pref?.selected ? "0 0 0 rgba(244, 114, 182, 0)" : "0 0 20px rgba(244, 114, 182, 0.6)",
      duration: 0.3,
      ease: "power2.out",
    })

    onToggleMenuPreference(prefId)
  }

  return (
    <div ref={containerRef} className="p-6 max-w-md mx-auto bg-white min-h-screen">
      <div className="mb-6">
        <div className="text-right mb-4">
          <Button variant="ghost" className="text-pink-400 text-sm">
            Bỏ qua
          </Button>
        </div>
        <h1 ref={titleRef} className="text-lg font-medium text-gray-900 mb-2">
          Chọn ít nhất 1 thực đơn mà bạn thích
        </h1>
        <p ref={subtitleRef} className="text-sm text-gray-600">
          Chọn tất cả có thể
        </p>
      </div>

      <div ref={preferencesContainerRef} className="flex flex-wrap gap-2 mb-6">
        {menuPreferences.map((pref) => (
          <Badge
            key={pref.id}
            variant={pref.selected ? "default" : "primary"}
            className={`cursor-pointer px-4 py-2 transition-all ${
              pref.selected ? "bg-pink-400 hover:bg-pink-500 text-white" : "hover:bg-gray-100"
            }`}
            onClick={(e) => handlePreferenceClick(pref.id, e.currentTarget)}
          >
            {pref.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}
