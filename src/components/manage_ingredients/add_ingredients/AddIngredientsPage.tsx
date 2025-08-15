import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IngredientForm } from "../../shared";
import type { Ingredient } from "../IngredientList";
import { Header } from "./Header";

export interface AddIngredientsPageProps {}

export function AddIngredientsPage() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", category: "", amount: "", unit: "", icon: "" }]);

  const handleFormChange = (index: number, field: keyof Ingredient, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setIngredients(updatedIngredients);
  };

  const handleAIAddIngredients = (aiIngredients: Ingredient[]) => {
    // Add to existing ingredients (which are not empty)
    const currentIngredients = ingredients.filter((ingredient) => ingredient.name.trim() || ingredient.category.trim() || ingredient.amount.trim());

    setIngredients([...currentIngredients, ...aiIngredients]);
  };

  const addNewIngredientForm = () => {
    setIngredients([...ingredients, { name: "", category: "", amount: "", unit: "", icon: "" }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleFinishAdding = () => {
    // Filter out empty ingredients
    const validIngredients = ingredients.filter((ingredient) => ingredient.name.trim() && ingredient.category.trim() && ingredient.amount.trim());

    if (validIngredients.length > 0) {
      // Get current total ingredients list
      const existingIngredients = JSON.parse(localStorage.getItem("totalIngredients") || "[]");

      // Convert form data to ingredient format
      const convertedIngredients = validIngredients.map((formData) => {
        const getCategoryIcon = (category: string): string => {
          switch (category) {
            case "rau-cu":
              return "🥕";
            case "che-pham-sua":
              return "🥛";
            case "ngu-coc":
              return "🌾";
            case "protein":
              return "🥩";
            default:
              return "🍽️";
          }
        };

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

        return {
          name: formData.name,
          category: getCategoryLabel(formData.category),
          amount: formData.amount,
          unit: formData.unit,
          icon: formData.icon || getCategoryIcon(formData.category),
        };
      });

      // Add new ingredients to the total list
      const updatedIngredients = [...existingIngredients, ...convertedIngredients];
      localStorage.setItem("totalIngredients", JSON.stringify(updatedIngredients));

      navigate("/manage-ingredients");
    } else {
      alert("Vui lòng nhập đầy đủ thông tin cho các nguyên liệu!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header onAddIngredients={handleAIAddIngredients} />

      {/* Finish Adding Button */}
      <div className="px-4 pt-4">
        <button onClick={handleFinishAdding} className="w-full rounded-lg bg-[#ff8c94] py-3 text-lg font-medium text-white">
          Thêm
        </button>
      </div>

      {/* Ingredient Forms */}
      <div className="flex flex-col items-center gap-6 px-4 pt-6">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="relative">
            <IngredientForm formData={ingredient} onChange={(field, value) => handleFormChange(index, field, value)} />
            {ingredients.length > 1 && (
              <button onClick={() => removeIngredient(index)} className="absolute top-2 right-2 rounded-[4px] px-3 py-2 text-sm text-red-500">
                Xóa
              </button>
            )}
          </div>
        ))}

        {/* Add New Ingredient Button - Circle at bottom */}
        <button onClick={addNewIngredientForm} className="rounded-full bg-[#ff8c94] p-4 text-white shadow-lg transition-colors">
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
