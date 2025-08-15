import type { IngredientFormData } from "@/components/shared";
import { ArrowLeft, Mic } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VoiceChatDrawer } from "../../shared/manage_ingredients/VoiceChatDrawer";

interface HeaderProps {
  onAddIngredients: (ingredients: IngredientFormData[]) => void;
}

export function Header({ onAddIngredients }: HeaderProps) {
  const navigate = useNavigate();
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);

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

      <VoiceChatDrawer isOpen={isVoiceChatOpen} onClose={() => setIsVoiceChatOpen(false)} onAddIngredients={onAddIngredients} />
    </>
  );
}
