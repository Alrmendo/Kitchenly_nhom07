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
}

const DEFAULT_DISHES: FeaturedDish[] = [
  {
    name: "Cheery pancake",
    time: "20 phút",
    difficulty: "Khó",
    rating: "6/7",
    image: "/placeholder.svg?height=200&width=200",
    bgColor: "#fff6de",
  },
  {
    name: "Cheese Roti Burger",
    time: "60 phút",
    difficulty: "Dễ",
    rating: "",
    image: "/placeholder.svg?height=200&width=200",
    bgColor: "#ffe6de",
  },
];

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({ dishes = DEFAULT_DISHES }) => {
  return (
    <div className="mb-8 px-6">
      <div className="flex gap-4 overflow-x-auto">
        {dishes.map((dish, index) => (
          <Card key={index} className="min-w-[280px] border-0 shadow-sm" style={{ backgroundColor: dish.bgColor }}>
            <CardContent className="p-4">
              <div className="relative mb-4 h-40">
                <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-contain" />
              </div>
              <h3 className="mb-3 font-semibold text-[#343434]">{dish.name}</h3>
              <div className="flex items-center gap-4 text-xs text-[#666666]">
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
