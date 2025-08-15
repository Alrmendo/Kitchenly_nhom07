import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { FeaturedDishes } from "./FeaturedDishes";
import { SeasonalDishes } from "./SeasonalDishes";
import { FavoriteDishes } from "./FavoriteDishes";
import { BottomNavigation } from "./BottomNavigation";
import { Button } from "../ui/button";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("morning");
  const [activeTab, setActiveTab] = useState("home");

  const handleNavigateToCooking = () => {
    navigate("/cooking");
  };

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      <Header />

      {/* Temporary button to access Cooking Mode */}
      <div className="mb-4 px-4">
        <Button onClick={handleNavigateToCooking} className="w-full bg-orange-500 text-white hover:bg-orange-600">
          🍳 Chế độ nấu ăn - Taco cá nướng
        </Button>
      </div>

      <FeaturedDishes activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <SeasonalDishes />

      <FavoriteDishes />

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};
