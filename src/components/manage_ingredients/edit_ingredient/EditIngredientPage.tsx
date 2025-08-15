import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IngredientForm } from "../../shared";
import type { Ingredient } from "../IngredientList";
import { Header } from "./Header";

export function EditIngredientPage() {
  const navigate = useNavigate();
  const { index } = useParams<{ index: string }>();

  // Get ingredient data from localStorage or navigation state
  const [ingredient, setIngredient] = useState<Ingredient>(() => {
    const savedIngredient = localStorage.getItem(`editIngredient_${index}`);
    if (savedIngredient) {
      return JSON.parse(savedIngredient);
    }
    // Default ingredient if not found
    return {
      name: "",
      category: "",
      amount: "",
      unit: "",
      icon: "🍽️",
    };
  });

  const handleFormChange = (field: keyof Ingredient, value: string) => {
    setIngredient((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validate form
    if (!ingredient.name.trim() || !ingredient.category.trim() || !ingredient.amount.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin nguyên liệu!");
      return;
    }

    // Get current total ingredients list
    const totalIngredients = JSON.parse(localStorage.getItem("totalIngredients") || "[]");

    // Convert form data to ingredient format
    const getCategoryLabel = (category: string): string => {
      switch (category) {
        case "rau-cu":
          return "Rau củ";
        case "che-pham-sua":
          return "Chế phẩm sữa";
        case "ngu-coc":
          return "Ngũ cốc";
        case "protein":
          return "Protein";
        default:
          return "Khác";
      }
    };

    const updatedIngredientData = {
      name: ingredient.name,
      category: getCategoryLabel(ingredient.category),
      amount: ingredient.unit ? `${ingredient.amount}${ingredient.unit}` : ingredient.amount,
      icon: ingredient.icon,
    };

    // Update the ingredient at the specified index
    if (index !== undefined) {
      const ingredientIndex = parseInt(index);
      totalIngredients[ingredientIndex] = updatedIngredientData;
      localStorage.setItem("totalIngredients", JSON.stringify(totalIngredients));
    }

    // Clean up edit data
    localStorage.removeItem(`editIngredient_${index}`);
    navigate("/manage-ingredients");
  };

  const handleBack = () => {
    localStorage.removeItem(`editIngredient_${index}`);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header onBack={handleBack} />

      {/* Ingredient Form */}
      <div className="flex flex-col items-center px-4 pt-6">
        <IngredientForm formData={ingredient} onChange={handleFormChange} />
      </div>

      {/* Save Button */}
      <div className="px-4 pt-4">
        <button onClick={handleSave} className="w-full rounded-lg bg-[#ff8c94] py-3 text-lg font-medium text-white">
          Cập nhật
        </button>
      </div>
    </div>
  );
}
