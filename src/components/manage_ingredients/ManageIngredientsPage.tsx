import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IngredientFormData } from "../add_ingredients";
import { BottomNavigation } from "../shared/BottomNavigation";
import type { Ingredient } from "./index";
import { Header, IngredientList, IngredientSummary } from "./index";

// Helper function to convert form data to ingredient with icon
const convertFormDataToIngredient = (formData: IngredientFormData): Ingredient => {
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
    amount: formData.unit ? `${formData.amount}${formData.unit}` : formData.amount,
    icon: formData.icon || getCategoryIcon(formData.category), // Use custom icon if available
  };
};

const initialIngredients: Ingredient[] = [
  { name: "Sữa", category: "Chế phẩm sữa", amount: "500ml", icon: "🥛" },
  { name: "Cà chua", category: "Rau củ", amount: "2", icon: "🍅" },
  { name: "Cà rốt", category: "Rau củ", amount: "3", icon: "🥕" },
  { name: "Thịt bò", category: "Protein", amount: "1kg", icon: "🥩" },
];

export function ManageIngredientsPage() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);

  // Check for new ingredients from AddIngredientsPage
  useEffect(() => {
    const savedIngredients = localStorage.getItem("pendingIngredients");
    if (savedIngredients) {
      try {
        const newIngredients: IngredientFormData[] = JSON.parse(savedIngredients);
        const convertedIngredients = newIngredients.map(convertFormDataToIngredient);
        setIngredients((prev) => [...prev, ...convertedIngredients]);
        localStorage.removeItem("pendingIngredients");
      } catch (error) {
        console.error("Error processing saved ingredients:", error);
      }
    }
  }, []);

  const handleDeleteIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditIngredient = (index: number) => {
    // For now, just log the edit action - can be expanded later
    console.log("Edit ingredient at index:", index);
  };

  return (
    <div className="min-h-screen bg-[#fff] pb-24">
      <Header onBack={() => navigate(-1)} />
      <IngredientSummary />
      <IngredientList ingredients={ingredients} onDelete={handleDeleteIngredient} onEdit={handleEditIngredient} />
      <BottomNavigation
        activeTab="fridge"
        onTabChange={(tabId: string) => {
          // Handle tab changes if needed
          console.log("Tab changed to:", tabId);
        }}
      />
    </div>
  );
}
