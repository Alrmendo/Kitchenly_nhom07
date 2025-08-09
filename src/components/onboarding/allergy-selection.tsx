import { Button } from "@/components/ui/button"
import Badge from "@/components/ui/badge"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAPAnimations } from "@/hooks/use-gsap-animations"
import type { AllergyTag } from "@/hooks/use-onboarding"

interface AllergySelectionProps {
  allergyTags: AllergyTag[]
  onToggleAllergy: (id: string) => void
}

export function AllergySelection({ allergyTags, onToggleAllergy }: AllergySelectionProps) {
  const { containerRef, animateStepEntry, animateSelection } = useGSAPAnimations()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const tagsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    animateStepEntry()

    // Animate title and subtitle
    gsap.fromTo(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
    )

    // Animate tags with stagger
    if (tagsContainerRef.current) {
      const tags = tagsContainerRef.current.children
      gsap.fromTo(
        tags,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.4,
          ease: "back.out(1.7)",
        },
      )
    }
  }, [animateStepEntry])

  const handleTagClick = (tagId: string, element: HTMLElement) => {
    const tag = allergyTags.find((t) => t.id === tagId)
    animateSelection(element, !tag?.selected)

    // Add a bounce effect for selection
    gsap.to(element, {
      y: -5,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    })

    onToggleAllergy(tagId)
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
          Bạn có bị dị ứng loại thực phẩm nào?
        </h1>
        <p ref={subtitleRef} className="text-sm text-gray-600">
          Chúng tôi muốn tham khảo thông tin về dị ứng của cơ thể bạn để đưa ra thực đơn tốt hơn.
        </p>
      </div>

      <div ref={tagsContainerRef} className="flex flex-wrap gap-2 mb-6">
        {allergyTags.map((tag) => (
          <Badge
            key={tag.id}
            variant={tag.selected ? "default" : "primary"}
            className={`cursor-pointer px-4 py-2 transition-all ${
              tag.selected ? "bg-pink-400 hover:bg-pink-500 text-white" : "hover:bg-gray-100"
            }`}
            onClick={(e) => handleTagClick(tag.id, e.currentTarget)}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}
