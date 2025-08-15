import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "../shared/BottomNavigation";
import type { Ingredient } from "./index";
import { Header, IngredientList, IngredientSummary } from "./index";

// Load ingredients from localStorage, fallback to default
const loadIngredients = (): Ingredient[] => {
  try {
    const saved = localStorage.getItem("totalIngredients");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading ingredients from localStorage:", error);
  }
  return [];
};

// Save ingredients to localStorage
const saveIngredients = (ingredients: Ingredient[]) => {
  try {
    localStorage.setItem("totalIngredients", JSON.stringify(ingredients));
  } catch (error) {
    console.error("Error saving ingredients to localStorage:", error);
  }
};

export function ManageIngredientsPage() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<Ingredient[]>(loadIngredients);

  // Reload ingredients when returning from add/edit pages
  useEffect(() => {
    const handleFocus = () => {
      // Reload ingredients from localStorage when window gains focus
      const currentIngredients = loadIngredients();
      setIngredients(currentIngredients);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleDeleteIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
    saveIngredients(updatedIngredients);
  };

  const handleEditIngredient = (index: number) => {
    // Save ingredient data for editing and navigate to edit page
    const ingredientToEdit = ingredients[index];
    const formData: Ingredient = {
      name: ingredientToEdit.name,
      category: getOriginalCategory(ingredientToEdit.category),
      amount: ingredientToEdit.amount,
      unit: ingredientToEdit.unit,
      icon: ingredientToEdit.icon,
    };

    localStorage.setItem(`editIngredient_${index}`, JSON.stringify(formData));
    navigate(`edit-ingredient/${index}`);
  };

  // Helper function to convert category label back to value
  const getOriginalCategory = (categoryLabel: string): string => {
    switch (categoryLabel) {
      case "Rau củ":
        return "rau-cu";
      case "Chế phẩm sữa":
        return "che-pham-sua";
      case "Ngũ cốc":
        return "ngu-coc";
      case "Protein":
        return "protein";
      default:
        return "khac";
    }
  };

  return (
    <div className="min-h-screen bg-[#fff] pb-24">
      <Header />
      <IngredientSummary ingredients={ingredients} />
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
