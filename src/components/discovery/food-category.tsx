import { ChevronRight, Calendar } from "lucide-react"
import type { FoodCategory as FoodCategoryType } from "@/hooks/use-food-data"
import { useGSAPAnimations } from "@/hooks/use-gsap-animations"
import { useEffect } from "react"

interface FoodCategoryProps {
  category: FoodCategoryType
  index: number
}

export const FoodCategory = ({ category, index }: FoodCategoryProps) => {
  const { containerRef, addToRefs, animateGridItems } = useGSAPAnimations()

  useEffect(() => {
    const timer = setTimeout(() => {
      animateGridItems(index * 0.2)
    }, 300)
    return () => clearTimeout(timer)
  }, [animateGridItems, index])

  return (
    <div ref={containerRef} className="mb-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <h2 className="font-semibold text-gray-800">{category.title}</h2>
        </div>
        <button className="flex items-center gap-1 text-sm text-gray-600">
          <span>{category.viewMoreText}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
        {category.items.map((item) => (
          <div
            key={item.id}
            ref={addToRefs}
            className="flex-shrink-0 w-28 cursor-pointer transform transition-transform hover:scale-105"
          >
            <div className="w-28 h-28 rounded-xl overflow-hidden mb-2 shadow-md">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
