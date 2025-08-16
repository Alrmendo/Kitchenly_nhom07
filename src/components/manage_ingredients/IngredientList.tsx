import { FOOD_CATEGORIES } from "@/constants/foodCategories";
import { ArrowUpDown, Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Ingredient {
  name: string;
  category: string;
  amount: string;
  unit: string;
  icon: string;
}

export interface IngredientListProps {
  ingredients: Ingredient[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

// Get ingredient categories from centralized constants
const ingredientCategories = FOOD_CATEGORIES.map((category) => category.label);

type SortType = "none" | "name-asc" | "name-desc" | "quantity-asc" | "quantity-desc";

export function IngredientList({ ingredients, onDelete, onEdit }: IngredientListProps): React.ReactElement {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortType, setSortType] = useState<SortType>("none");
  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setShowSortMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredIngredients = ingredients.filter((ing) => {
    if (selectedCategory === null) {
      return true; // Show all ingredients when no category is selected
    } else {
      return ing.category === selectedCategory; // Show only ingredients matching the selected category
    }
  });

  // Sort the filtered ingredients
  const sortedIngredients = [...filteredIngredients].sort((a, b) => {
    switch (sortType) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "quantity-asc":
        // Extract numeric value from amount string
        const aNumAsc = parseFloat(a.amount) || 0;
        const bNumAsc = parseFloat(b.amount) || 0;
        return aNumAsc - bNumAsc;
      case "quantity-desc":
        // Extract numeric value from amount string
        const aNumDesc = parseFloat(a.amount) || 0;
        const bNumDesc = parseFloat(b.amount) || 0;
        return bNumDesc - aNumDesc;
      default:
        return 0; // No sorting
    }
  });

  return (
    <div className="px-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-semibold">Nguyên liệu của bạn</div>
        <div className="relative flex gap-2" ref={sortMenuRef}>
          <button className="rounded-full bg-[#ff8c94] p-2 text-white" onClick={() => navigate("add-ingredients")}>
            <Plus className="h-4 w-4" />
          </button>
          <button className="rounded-full bg-[#ff8c94] p-2 text-white" onClick={() => setShowSortMenu(!showSortMenu)}>
            <ArrowUpDown className="h-4 w-4" />
          </button>

          {showSortMenu && (
            <div className="absolute top-12 right-0 z-10 min-w-[150px] rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                onClick={() => {
                  setSortType(sortType === "name-asc" ? "name-desc" : "name-asc");
                  setShowSortMenu(false);
                }}>
                Sắp xếp theo tên {sortType === "name-asc" ? "↓" : sortType === "name-desc" ? "↑" : ""}
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                onClick={() => {
                  setSortType(sortType === "quantity-asc" ? "quantity-desc" : "quantity-asc");
                  setShowSortMenu(false);
                }}>
                Sắp xếp theo số lượng {sortType === "quantity-asc" ? "↓" : sortType === "quantity-desc" ? "↑" : ""}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {ingredientCategories.map((cat) => (
          <button
            key={cat}
            className={`max-w-32 truncate rounded px-2 py-2 text-xs ${selectedCategory === cat ? "bg-[#ff8c94] text-white" : "bg-gray-100"}`}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            title={cat}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {sortedIngredients.map((ing) => {
          // in case of name duplication, it will delete the first one, so no duplication please
          const originalIndex = ingredients.findIndex((ingredient) => ingredient.name === ing.name && ingredient.category === ing.category);

          return (
            <div key={crypto.randomUUID()} className="flex items-center rounded-lg bg-white p-3 shadow">
              <span className="mr-2 text-xl">{ing.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold">{ing.name}</div>
                <div className="text-xs text-gray-500">{ing.category}</div>
              </div>
              <div className="mr-3 text-sm font-medium">
                {ing.amount}
                {ing.unit}
              </div>
              <button className="mr-2 rounded-full bg-[#ff8c94] p-1.5 text-white transition-colors hover:bg-[#ff7a85]" onClick={() => onEdit(originalIndex)}>
                <Edit className="h-4 w-4" />
              </button>
              <button className="rounded-full bg-[#ff8c94] p-1.5 text-white transition-colors hover:bg-[#ff7a85]" onClick={() => onDelete(originalIndex)}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
