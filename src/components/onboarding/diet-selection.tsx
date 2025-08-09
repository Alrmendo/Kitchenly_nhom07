import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Image } from "../ui"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAPAnimations } from "@/hooks/use-gsap-animations"
import type { DietOption } from "@/hooks/use-onboarding"

interface DietSelectionProps {
  dietOptions: DietOption[]
  onToggleDietOption: (id: string) => void
}

export function DietSelection({ dietOptions, onToggleDietOption }: DietSelectionProps) {
  const { containerRef, addToRefs, animateStepEntry, animateSelection, animateButton } = useGSAPAnimations()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    animateStepEntry()

    // Animate title and subtitle
    gsap.fromTo(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
    )

    // Animate diet option cards
    if (gridRef.current) {
      const cards = gridRef.current.children
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          scale: 0.8,
          rotationY: -90,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.4,
          ease: "back.out(1.7)",
        },
      )
    }
  }, [animateStepEntry])

  const handleDietOptionClick = (optionId: string, element: HTMLElement) => {
    const option = dietOptions.find((o) => o.id === optionId)
    animateSelection(element, !option?.selected)

    // Add image zoom effect
    const image = element.querySelector("img")
    if (image) {
      gsap.to(image, {
        scale: option?.selected ? 1 : 1.1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    onToggleDietOption(optionId)
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
          Bạn có đang theo chế độ ăn nào không?
        </h1>
        <p ref={subtitleRef} className="text-sm text-gray-600">
          Chúng tôi muốn tham khảo thông tin về chế độ ăn của bạn để đưa ra thực đơn tốt hơn.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-2 gap-4 mb-6">
        {dietOptions.map((option) => (
          <Card
            key={option.id}
            ref={addToRefs}
            className={`p-4 cursor-pointer transition-all overflow-hidden ${
              option.selected ? "ring-2 ring-pink-400 bg-pink-50" : "hover:bg-gray-50"
            }`}
            onClick={(e) => handleDietOptionClick(option.id, e.currentTarget)}
            onMouseEnter={(e) => animateButton(e.currentTarget, "hover")}
            onMouseLeave={(e) => animateButton(e.currentTarget, "reset")}
          >
            <div className="text-center">
              <div className="relative w-full h-24 mb-2 rounded-lg overflow-hidden">
                <Image
                  src={option.image || "/placeholder.svg"}
                  alt={option.name}
                  fill
                  className="object-cover transition-transform duration-300"
                />
              </div>
              <div className="text-sm font-medium text-gray-700">{option.name}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
