import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";
import { FavoriteDishes } from "./FavoriteDishes";
import { FeaturedDishes } from "./FeaturedDishes";
import { SeasonalDishes } from "./SeasonalDishes";
import { Button } from "../ui/button";

export interface HomePageProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("morning");

  const handleNavigateToCooking = () => {
    navigate("/cooking");
  };

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      <Header />

      {/* Quick Access Buttons */}
      <div className="mb-4 px-4 space-y-2">
        <Button onClick={handleNavigateToCooking} className="w-full bg-orange-500 text-white hover:bg-orange-600">
          🍳 Chế độ nấu ăn - Taco cá nướng
        </Button>
        <Button 
          onClick={() => navigate("/weekly-menu")} 
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          📅 Lập kế hoạch thực đơn tuần
        </Button>
      </div>

      <FeaturedDishes activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <SeasonalDishes />

      <FavoriteDishes />

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};
