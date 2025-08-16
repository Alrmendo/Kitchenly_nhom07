import type { Ingredient } from "@/components/manage_ingredients";
import { getCategoryDropdownOptions, getCategoryIcon } from "@/constants/foodCategories";
import { useState } from "react";
import type { DropdownOption } from "./DropdownSelect";
import { DropdownSelect } from "./DropdownSelect";
import { EmojiPicker } from "./EmojiPicker";

export interface IngredientFormProps {
  formData: Ingredient;
  onChange: (field: keyof Ingredient, value: string) => void;
}

// Get category options from centralized constants
const categoryOptions: DropdownOption[] = getCategoryDropdownOptions();

const unitOptions: DropdownOption[] = [
  { value: "", label: "Trống" },
  { value: "g", label: "g" },
  { value: "kg", label: "kg" },
  { value: "mg", label: "mg" },
  { value: "ml", label: "ml" },
  { value: "l", label: "l" },
];

export function IngredientForm({ formData, onChange }: IngredientFormProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji: string) => {
    onChange("icon", emoji);
    setShowEmojiPicker(false);
  };

  const getIngredientIcon = (): string => {
    return formData.icon || getCategoryIcon(formData.category);
  };

  return (
    <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-sm">
      {/* Emoji Button */}
      <div className="mb-4 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="rounded-lg border-2 border-gray-200 p-3 text-2xl transition-colors hover:border-[#ff8c94] hover:bg-gray-50">
          {getIngredientIcon()}
        </button>
      </div>

      {/* Emoji Picker */}
      <EmojiPicker isOpen={showEmojiPicker} onClose={() => setShowEmojiPicker(false)} onEmojiSelect={handleEmojiSelect} />

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Ingredient Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nguyên liệu</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Gà"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff8c94] focus:ring-2 focus:ring-[#ff8c94] focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Phân loại</label>
            <DropdownSelect value={formData.category} onChange={(value) => onChange("category", value)} options={categoryOptions} placeholder="Protein" />
          </div>
        </div>
        {/* Amount and Unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Số lượng</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => onChange("amount", e.target.value)}
              placeholder="1"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff8c94] focus:ring-2 focus:ring-[#ff8c94] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Đơn vị (Tùy chọn)</label>
            <DropdownSelect value={formData.unit} onChange={(value) => onChange("unit", value)} options={unitOptions} placeholder="kg" />
          </div>
        </div>
      </div>
    </div>
  );
}
