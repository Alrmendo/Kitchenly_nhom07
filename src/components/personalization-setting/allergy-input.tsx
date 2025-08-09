import Textarea from "@/components/ui/textarea"

interface AllergyInputProps {
  allergies: string[]
  allergyInput: string
  onInputChange: (input: string) => void
  onAllergiesUpdate: (input: string) => void
}

export function AllergyInput({ allergies, allergyInput, onInputChange, onAllergiesUpdate }: AllergyInputProps) {
  const handleInputChange = (value: string) => {
    onInputChange(value)
    onAllergiesUpdate(value)
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Bạn có dị ứng loại thức ăn nào không?</label>
      <Textarea
        value={allergyInput}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Thực phẩm chứa Glucose, hải sản"
        className="min-h-[80px] resize-none"
      />
      {allergies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {allergies.map((allergy, index) => (
            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
              {allergy}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
