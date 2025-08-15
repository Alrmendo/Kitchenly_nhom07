import { ArrowLeft, Mic } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VoiceChatDrawer } from "../../shared/manage_ingredients/VoiceChatDrawer";

interface HeaderProps {
  onAddIngredients?: (ingredients: any[]) => void;
}

export function Header({ onAddIngredients }: HeaderProps) {
  const navigate = useNavigate();
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);

  const handleAddIngredients = (ingredients: any[]) => {
    // Convert to the format expected by AddIngredientsPage
    const convertedIngredients = ingredients.map((ingredient) => ({
      name: ingredient.name,
      category: ingredient.category,
      amount: ingredient.amount,
      unit: ingredient.unit,
      icon: ingredient.icon,
    }));

    // Pass ingredients to parent component (AddIngredientsPage)
    onAddIngredients?.(convertedIngredients);

    // Close the drawer and show success message
    setIsVoiceChatOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-center text-lg font-semibold">Thêm nguyên liệu</h1>
        <button onClick={() => setIsVoiceChatOpen(true)}>
          <Mic className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <VoiceChatDrawer isOpen={isVoiceChatOpen} onClose={() => setIsVoiceChatOpen(false)} onAddIngredients={handleAddIngredients} />
    </>
  );
}
