import { useState } from "react";
import { BottomNavigation } from "../shared/BottomNavigation";
import type { Ingredient } from "./index";
import { Header, IngredientList, IngredientSummary } from "./index";

const initialIngredients: Ingredient[] = [
  { name: "Sữa", category: "Chế phẩm sữa", amount: "500ml", icon: "🥛" },
  { name: "Cà chua", category: "Rau củ", amount: "2", icon: "🍅" },
  { name: "Cà rốt", category: "Rau củ", amount: "3", icon: "🥕" },
  { name: "Thịt bò", category: "Protein", amount: "1kg", icon: "🥩" },
];

export interface ManageIngredientsPageProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onNavigateBack?: () => void;
}

const ManageIngredientsPage = ({ activeTab, onTabChange, onNavigateBack }: ManageIngredientsPageProps) => {
  const [ingredients, setIngredients] = useState(initialIngredients);

  const handleDelete = (idx: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleEdit = (idx: number) => {
    // TODO: Implement edit functionality
    console.log("Edit ingredient at index:", idx);
  };

  const handleAdd = () => {
    // TODO: Implement add functionality
    console.log("Add new ingredient");
  };

  return (
    <div className="min-h-screen bg-[#fff] pb-24">
      <Header onBack={onNavigateBack} />
      <IngredientSummary />
      <IngredientList ingredients={ingredients} onDelete={handleDelete} onEdit={handleEdit} onAdd={handleAdd} />
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default ManageIngredientsPage;
