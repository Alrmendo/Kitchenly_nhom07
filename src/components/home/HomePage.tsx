import React, { useState } from "react";
import { Header } from "./Header";
import { FeaturedDishes } from "./FeaturedDishes";
import { SeasonalDishes } from "./SeasonalDishes";
import { FavoriteDishes } from "./FavoriteDishes";
import { BottomNavigation } from "./BottomNavigation";
import { Button } from "../ui/button";

interface HomePageProps {
  onNavigateToCooking?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToCooking }) => {
  const [activeCategory, setActiveCategory] = useState("morning");
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      <Header />

      {/* Temporary button to access Cooking Mode */}
      {onNavigateToCooking && (
        <div className="mb-4 px-4">
          <Button onClick={onNavigateToCooking} className="w-full bg-orange-500 text-white hover:bg-orange-600">
            🍳 Chế độ nấu ăn - Taco cá nướng
          </Button>
        </div>
      )}

      <FeaturedDishes activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <SeasonalDishes />

      <FavoriteDishes />

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};
