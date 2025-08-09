import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import type { FoodPreference } from "@/hooks/use-food-preferences"

interface FoodPreferenceSelectorProps {
  preferences: FoodPreference[]
  onTogglePreference: (id: string) => void
}

export function FoodPreferenceSelector({ preferences, onTogglePreference }: FoodPreferenceSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">Loại thức ăn yêu thích</label>
      <div className="grid grid-cols-2 gap-2">
        {preferences.map((preference) => (
          <Button
            key={preference.id}
            variant={preference.selected ? "default" : "outline"}
            className={`justify-between h-12 ${
              preference.selected ? "bg-pink-500 hover:bg-pink-600 text-white" : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onTogglePreference(preference.id)}
          >
            <span>{preference.name}</span>
            {preference.selected && <Check className="h-4 w-4" />}
          </Button>
        ))}
      </div>
    </div>
  )
}
