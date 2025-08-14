import type { DropdownOption } from "./DropdownSelect";
import { DropdownSelect } from "./DropdownSelect";

export interface IngredientFormData {
  name: string;
  category: string;
  amount: string;
  unit: string;
  icon: string;
}

export interface IngredientFormProps {
  formData: IngredientFormData;
  onChange: (field: keyof IngredientFormData, value: string) => void;
}

const categoryOptions: DropdownOption[] = [
  { value: "rau-cu", label: "Rau củ" },
  { value: "che-pham-sua", label: "Chế phẩm sữa" },
  { value: "ngu-coc", label: "Ngũ cốc" },
  { value: "protein", label: "Protein" },
];

const unitOptions: DropdownOption[] = [
  { value: "", label: "Trống" },
  { value: "g", label: "g" },
  { value: "kg", label: "kg" },
  { value: "mg", label: "mg" },
  { value: "ml", label: "ml" },
  { value: "l", label: "l" },
];

export function IngredientForm({ formData, onChange }: IngredientFormProps) {
  return (
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
  );
}
