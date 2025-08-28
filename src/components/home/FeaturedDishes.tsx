import React from "react";
import { Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "@/components/ui/image";


type FeaturedDish = {
  name: string;
  time: string;
  difficulty: string;
  rating?: string;
  image: string;
  bgColor: string;
};

export interface FeaturedDishesProps {
  dishes?: FeaturedDish[];
  activeCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
}

// Categories are now handled by CategoryTabs component

const DEFAULT_DISHES: FeaturedDish[] = [
  {
    name: "Cheery pancake",
    time: "20 phút",
    difficulty: "Khó",
    rating: "6/7",
    image: "/cherry_pancake.png",
    bgColor: "#fff6de",
  },
  {
    name: "Cheese Roti Burger",
    time: "60 phút",
    difficulty: "Dễ",
    rating: "6/7",
    image: "/cheese_roti.png",
    bgColor: "#ffe6de",
  },
];

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({ dishes = DEFAULT_DISHES }) => {

  return (
    <div className="mb-8 px-6">
      {/* Featured Dishes */}
      <div className="flex gap-6 overflow-x-auto rounded-3xl">
        {dishes.map((dish, index) => (
          <Card key={index} className="min-w-[300px] border-none shadow-none overflow-hidden" style={{ backgroundColor: dish.bgColor }}>
            <div className="relative h-75">
              <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover border-none" />
            </div>
            <CardContent className="p-4 pt-6">
              <h3 className="mb-3 font-semibold text-[#343434]">{dish.name}</h3>
              <div className="flex items-center gap-16 text-xs text-[#666666]">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{dish.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{dish.difficulty}</span>
                </div>
                {dish.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{dish.rating}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
