import React, { useState } from "react";
import { Header } from "./Header";
import { FeaturedDishes } from "./FeaturedDishes";
import { SeasonalDishes } from "./SeasonalDishes";
import { FavoriteDishes } from "./FavoriteDishes";
import { BottomNavigation } from "./BottomNavigation";

export const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("morning");
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      <Header />

      <FeaturedDishes activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <SeasonalDishes />

      <FavoriteDishes />

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};
