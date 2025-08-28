"use client"
import { useStaggerAnimation } from "@/hooks/use-gsap-animations-v2"

interface SelectionItem {
    id: string
    label: string
    image: string
}

interface SelectionGridProps {
    items: SelectionItem[]
    selectedItems: string[]
    onSelectionChange: (selected: string[]) => void
    multiSelect?: boolean
    columns?: number
    className?: string
}

export const SelectionGrid = ({
    items,
    selectedItems,
    onSelectionChange,
    multiSelect = true,
    columns = 2,
    className = ""
}: SelectionGridProps) => {
    const gridRef = useStaggerAnimation()

    const handleItemClick = (itemId: string) => {
        if (multiSelect) {
            const newSelection = selectedItems.includes(itemId)
                ? selectedItems.filter((id) => id !== itemId)
                : [...selectedItems, itemId]
            onSelectionChange(newSelection)
        } else {
            onSelectionChange([itemId])
        }
    }

    const gridCols = columns === 2 ? "grid-cols-2" : "grid-cols-3"

    return (
        <div ref={gridRef} className={`grid ${gridCols} gap-4 ${className}`}>
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`
            relative p-4 rounded-2xl border-2 transition-all duration-200
            ${selectedItems.includes(item.id)
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }
          `}
                >
                    <div className="aspect-square mb-3 rounded-xl overflow-hidden">
                        <img src={item.image || "/placeholder.svg"} alt={item.label} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    {selectedItems.includes(item.id) && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    )}
                </button>
            ))}
        </div>
    )
}
