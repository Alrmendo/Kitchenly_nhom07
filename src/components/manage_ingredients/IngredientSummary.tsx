import { FOOD_CATEGORIES } from "@/constants/foodCategories";
import { ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Ingredient } from "./index";

interface IngredientSummaryProps {
  ingredients: Ingredient[];
}

export function IngredientSummary({ ingredients }: IngredientSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate summary based on actual ingredients
  const calculateSummary = () => {
    const categoryCounts = ingredients.reduce(
      (acc, ingredient) => {
        acc[ingredient.category] = (acc[ingredient.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Create dynamic category map from our food categories
    const categoryIcons = FOOD_CATEGORIES.reduce(
      (acc, category) => {
        acc[category.label] = category.icon;
        return acc;
      },
      {} as Record<string, string>
    );

    const summary = [{ label: "Tổng", value: ingredients.length, icon: "📊" }];

    // Add category summaries
    Object.entries(categoryIcons).forEach(([category, icon]) => {
      const count = categoryCounts[category] || 0; // Object.entries(categoryCounts) - only included categories with items, so we have to do this
      summary.push({
        label: category,
        value: count,
        icon: icon,
      });
    });

    return summary;
  };

  const ingredientSummary = calculateSummary();

  return (
    <div className="px-4 pt-4">
      <div className="mb-1 flex items-center justify-between">
        <div>
          <div className="text-base font-semibold">Tổng quan nguyên liệu</div>
          <div className="text-xs text-gray-500">Theo dõi kho chứa thức ăn của bạn</div>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} className="rounded-full bg-[#ff8c94] p-2 text-white transition-transform duration-200 hover:scale-105">
          <div className={`transition-transform duration-200 ${isExpanded ? "rotate-0" : "rotate-180"}`}>
            <ChevronUp className="h-4 w-4" />
          </div>
        </button>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="mt-2 mb-4 grid grid-cols-2 gap-2">
          {ingredientSummary.map((item, _) => (
            <div key={item.label} className="flex items-center gap-2 rounded-lg bg-white p-3 shadow transition-all duration-200 hover:shadow-md">
              <span className="text-xl">{item.icon}</span>
              <div>
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="text-lg font-bold">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
