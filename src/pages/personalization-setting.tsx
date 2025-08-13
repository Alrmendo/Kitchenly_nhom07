import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DietModeSelector } from "@/components/personalization-setting/diet-mode-selector"
import { AllergyInput } from "@/components/personalization-setting/allergy-input"
import { FoodPreferenceSelector } from "@/components/personalization-setting/food-preferences"
import { useDietPreferences } from "@/hooks/use-diet-preferences"
import { useFoodAllergies } from "@/hooks/use-food-allergies"
import { useFoodPreferences } from "@/hooks/use-food-preferences"

export default function PersonalizationSettingPage() {
  const dietHook = useDietPreferences()
  const allergyHook = useFoodAllergies()
  const preferenceHook = useFoodPreferences()

  const handleSave = () => {
    const data = {
      diet: dietHook.dietPreference,
      allergies: allergyHook.allergies,
      preferences: preferenceHook.getSelectedPreferences(),
    }
    console.log("Saving personalization data:", data)
    // Here you would typically save to your backend
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="p-1 mr-3">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium">Thiết lập cá nhân hóa</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-8">
        {/* Diet Mode Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <DietModeSelector
            dietPreference={dietHook.dietPreference}
            onDietModeChange={dietHook.updateDietMode}
            onSupplementModeChange={dietHook.updateSupplementMode}
          />
        </div>

        {/* Allergy Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <AllergyInput
            allergies={allergyHook.allergies}
            allergyInput={allergyHook.allergyInput}
            onInputChange={allergyHook.updateAllergyInput}
            onAllergiesUpdate={allergyHook.parseAllergiesFromInput}
          />
        </div>

        {/* Food Preferences Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <FoodPreferenceSelector
            preferences={preferenceHook.preferences}
            onTogglePreference={preferenceHook.togglePreference}
          />
        </div>

        {/* Save Button */}
        <div className="px-4">
          <Button onClick={handleSave}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3
                            h-full overflow-y-auto">
            Lưu thiết lập
          </Button>
        </div>
      </div>
    </div>
  )
}
