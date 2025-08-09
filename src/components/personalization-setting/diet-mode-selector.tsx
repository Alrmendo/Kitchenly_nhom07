import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { useDietPreferences } from "@/hooks/use-diet-preferences"

interface DietModeSelectorProps {
  dietPreference: ReturnType<typeof useDietPreferences>["dietPreference"]
  onDietModeChange: (mode: string) => void
  onSupplementModeChange: (mode: string) => void
}

export function DietModeSelector({ dietPreference, onDietModeChange, onSupplementModeChange }: DietModeSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Chế độ ăn</label>
        <Select value={dietPreference.dietMode} onValueChange={onDietModeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn chế độ ăn" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Đang ăn bình thường</SelectItem>
            <SelectItem value="vegetarian">Chế độ chay</SelectItem>
            <SelectItem value="keto">Chế độ Keto</SelectItem>
            <SelectItem value="lowcarb">Ít carb</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select value={dietPreference.supplementMode} onValueChange={onSupplementModeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chế độ bổ sung Protein..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Không bổ sung</SelectItem>
            <SelectItem value="protein">Bổ sung Protein</SelectItem>
            <SelectItem value="vitamin">Bổ sung Vitamin</SelectItem>
            <SelectItem value="mineral">Bổ sung khoáng chất</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
