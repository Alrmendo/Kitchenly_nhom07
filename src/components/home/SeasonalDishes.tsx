import React from "react";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";

type SeasonalDish = {
  name: string;
  image: string;
};

export interface SeasonalDishesProps {
  dishes?: SeasonalDish[];
  showViewAll?: boolean;
  title?: string;
}

const DEFAULT_DISHES: SeasonalDish[] = [
  { name: "Lẩu gà", image: "/image.png" },
  { name: "Sốt kem", image: "/sot_kem.png" },
  { name: "Sốt nấm", image: "/sot_nam.png" },
  { name: "Gà viên", image: "/ga_vien.png" },
];

export const SeasonalDishes: React.FC<SeasonalDishesProps> = ({ dishes = DEFAULT_DISHES, showViewAll = true, title = "Món ăn theo mùa" }) => {
  return (
    <div className="mb-8 px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#000000]">{title}</h2>
        {showViewAll && (
          <Button variant="ghost" className="h-auto p-0 text-sm text-[#666666]">
            Xem tất cả
          </Button>
        )}
      </div>
      <div className="flex gap-4">
        {dishes.map((dish, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-2 h-25 w-20 overflow-hidden rounded-2xl">
              <Image src={dish.image || "/placeholder.svg"} alt={dish.name} width={80} height={80} className="h-full w-full object-cover" />
            </div>
            <span className="text-center text-sm text-[#343434]">{dish.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
