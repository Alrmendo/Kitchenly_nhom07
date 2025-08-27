import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  label: string;
};

export interface CategoryTabsProps {
  categories?: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  showViewAll?: boolean;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: "morning", label: "Buổi sáng" },
  { id: "lunch", label: "Buổi trưa" },
  { id: "evening", label: "Buổi tối" },
];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories = DEFAULT_CATEGORIES, activeCategory, onCategoryChange, showViewAll = true }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-6 px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#000000]">Phân loại</h2>
        {showViewAll && (
          <Button 
            variant="ghost" 
            className="text-[#ff8c94] text-sm font-medium hover:text-[#ff8c94]/80 transition-colors"
            onClick={() => navigate("/view-all")}
          >
            Xem tất cả
          </Button>
        )}
      </div>
      <div className="flex gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`border-b-2 pb-2 text-sm font-medium transition-colors ${activeCategory === category.id ? "border-[#000000] text-[#000000]" : "border-transparent text-[#666666]"}`}>
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};
