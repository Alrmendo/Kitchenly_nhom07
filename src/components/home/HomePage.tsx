import React, { useState } from "react";
import { Header } from "./Header";
import { BottomNavigation } from "../shared/BottomNavigation";
import { CategoryTabs } from "./CategoryTabs";
import { FavoriteDishes } from "./FavoriteDishes";
import { FeaturedDishes } from "./FeaturedDishes";
import { SeasonalDishes } from "./SeasonalDishes";

export interface HomePageProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ activeTab, onTabChange }) => {
  const [activeCategory, setActiveCategory] = useState("morning");

  return (
    <div className="min-h-screen bg-[#fffdf9] pb-20">
      <Header />

      <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <FeaturedDishes activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <SeasonalDishes />

      <FavoriteDishes />

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};
