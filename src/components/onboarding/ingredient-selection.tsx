import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAPAnimations } from "@/hooks/use-gsap-animations"
import type { Ingredient } from "@/hooks/use-onboarding"

interface IngredientSelectionProps {
  ingredients: Ingredient[]
  selectedIngredients: string[]
  onToggleIngredient: (id: string) => void
  onAddCustom: () => void
}

export function IngredientSelection({
  ingredients,
  selectedIngredients,
  onToggleIngredient,
  onAddCustom,
}: IngredientSelectionProps) {
  const { containerRef, addToRefs, animateGridItems, animateSelection, animateButton } =
    useGSAPAnimations()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const addButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Animate title and subtitle first
    gsap.fromTo(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
    )

    // Then animate grid items
    setTimeout(() => {
      animateGridItems(0.3)
    }, 400)

    // Animate add button
    setTimeout(() => {
      if (addButtonRef.current) {
        gsap.fromTo(
          addButtonRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        )
      }
    }, 800)
  }, [animateGridItems])

  const handleIngredientClick = (ingredientId: string, element: HTMLElement) => {
    const isSelected = selectedIngredients.includes(ingredientId)
    animateSelection(element, !isSelected)
    onToggleIngredient(ingredientId)
  }

  return (
    <div ref={containerRef} className="p-6 max-w-md mx-auto bg-white max-h-full h-full overflow-y-auto">
      <div className="mb-6">
        <div className="text-right mb-4">
          <Button variant="ghost" className="text-pink-400 text-sm">
            Bỏ qua
          </Button>
        </div>
        <h1 ref={titleRef} className="text-lg font-medium text-gray-900 mb-2">
          Bạn thích loại nguyên liệu nào?
        </h1>
        <p ref={subtitleRef} className="text-sm text-gray-600">
          Chúng tôi có thể gợi ý món ăn tốt hơn dựa trên nguyên liệu bạn yêu thích.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6 h-[350px] overflow-y-auto overflow-x-hidden">
        {ingredients.map((ingredient) => (
          <Card
            key={ingredient.id}
            ref={addToRefs}
            className={`p-3 cursor-pointer transition-all ${
              selectedIngredients.includes(ingredient.id) ? "ring-2 ring-pink-400 bg-pink-50" : "hover:bg-gray-50"
            }`}
            onClick={(e) => handleIngredientClick(ingredient.id, e.currentTarget)}
            onMouseEnter={(e) => animateButton(e.currentTarget, "hover")}
            onMouseLeave={(e) => animateButton(e.currentTarget, "reset")}
          >
            <div className="text-center">
              <div className="text-2xl mb-1 ingredient-icon">{ingredient.icon}</div>
              <div className="text-xs text-gray-700">{ingredient.name}</div>
            </div>
          </Card>
        ))}
      </div>

      <Button
        ref={addButtonRef}
        variant="ghost"
        className="w-full mb-6 text-gray-600 border border-dashed border-gray-300"
        onClick={onAddCustom}
        onMouseEnter={(e) => animateButton(e.currentTarget, "hover")}
        onMouseLeave={(e) => animateButton(e.currentTarget, "reset")}
      >
        <Plus className="w-4 h-4 mr-2" />
        Thêm nguyên liệu
      </Button>
    </div>
  )
}
