import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "../shared/BottomNavigation";
import { Header } from "./Header";
import type { IngredientFormData } from "./IngredientForm";
import { IngredientForm } from "./IngredientForm";

export interface AddIngredientsPageProps {}

// Helper function to get emoji icon based on category
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

// Emoji options for selection
const emojiOptions = [
  "🥕",
  "🥬",
  "🥒",
  "🍅",
  "🧄",
  "🧅",
  "🥔",
  "🌶️",
  "🥑",
  "🍆",
  "🥛",
  "🧀",
  "🧈",
  "🥚",
  "🍳",
  "🥓",
  "🥩",
  "🍗",
  "🐟",
  "🦐",
  "🌾",
  "🍞",
  "🥖",
  "🍚",
  "🍜",
  "🥣",
  "🍝",
  "🥧",
  "🍰",
  "🍯",
  "🍎",
  "🍌",
  "🍊",
  "🍇",
  "🍓",
  "🫐",
  "🥭",
  "🍑",
  "🍒",
  "🥝",
  "🥜",
  "🌰",
  "🫘",
  "🍽️",
  "🥄",
  "🥢",
  "🍴",
  "🔥",
  "❄️",
  "🧊",
];

export function AddIngredientsPage() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<IngredientFormData[]>([{ name: "", category: "", amount: "", unit: "", icon: "" }]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(null);
      }
    };

    if (showEmojiPicker !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showEmojiPicker]);

  const handleFormChange = (index: number, field: keyof IngredientFormData, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setIngredients(updatedIngredients);
  };

  const handleEmojiSelect = (ingredientIndex: number, emoji: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[ingredientIndex] = { ...updatedIngredients[ingredientIndex], icon: emoji };
    setIngredients(updatedIngredients);
    setShowEmojiPicker(null);
  };

  const getIngredientIcon = (ingredient: IngredientFormData): string => {
    return ingredient.icon || getCategoryIcon(ingredient.category); // prioritize user's icon
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
    // Filter out empty ingredients and save to localStorage
    const validIngredients = ingredients.filter((ingredient) => ingredient.name.trim() && ingredient.category.trim() && ingredient.amount.trim());

    if (validIngredients.length > 0) {
      localStorage.setItem("pendingIngredients", JSON.stringify(validIngredients));
      navigate("/manage-ingredients");
    } else {
      alert("Vui lòng nhập đầy đủ thông tin cho các nguyên liệu!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header onBack={() => navigate("/manage-ingredients")} />

      {/* Finish Adding Button */}
      <div className="px-4 pt-4">
        <button onClick={handleFinishAdding} className="w-full rounded-lg bg-[#ff8c94] py-3 text-lg font-medium text-white">
          Thêm
        </button>
      </div>

      {/* Ingredient Forms */}
      <div className="flex flex-col items-center gap-6 px-4 pt-6">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="relative rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setShowEmojiPicker(showEmojiPicker === index ? null : index)}
                className="rounded-lg border-2 border-gray-200 p-2 text-lg transition-colors hover:border-[#ff8c94] hover:bg-gray-50">
                {getIngredientIcon(ingredient)}
              </button>
              {ingredients.length > 1 && (
                <button onClick={() => removeIngredient(index)} className="text-sm text-red-500">
                  Xóa
                </button>
              )}
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker === index && (
              <div ref={emojiPickerRef} className="absolute top-16 left-0 z-10 w-full rounded-lg border bg-white p-4 shadow-lg">
                <div className="mb-2 text-sm font-medium text-gray-700">Chọn biểu tượng:</div>
                <div className="grid max-h-48 grid-cols-8 gap-2 overflow-x-hidden overflow-y-auto">
                  {emojiOptions.map((emoji, emojiIndex) => (
                    <button key={emojiIndex} onClick={() => handleEmojiSelect(index, emoji)} className="rounded-md p-2 text-lg transition-colors hover:bg-gray-100">
                      {emoji}
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowEmojiPicker(null)} className="mt-3 w-full rounded-md bg-gray-200 py-2 text-sm text-gray-700 hover:bg-gray-300">
                  Đóng
                </button>
              </div>
            )}

            <IngredientForm formData={ingredient} onChange={(field, value) => handleFormChange(index, field, value)} />
          </div>
        ))}

        {/* Add New Ingredient Button - Circle at bottom */}
        <button onClick={addNewIngredientForm} className="rounded-full bg-[#ff8c94] p-4 text-white shadow-lg transition-colors hover:bg-[#ff7a85]">
          <Plus className="h-6 w-6" />
        </button>
      </div>

      <BottomNavigation
        activeTab="fridge"
        onTabChange={(tabId: string) => {
          console.log("Tab changed to:", tabId);
        }}
      />
    </div>
  );
}
