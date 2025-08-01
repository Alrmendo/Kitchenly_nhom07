import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";

type FavoriteDish = {
  name: string;
  image: string;
};

export interface FavoriteDishesProps {
  dishes?: FavoriteDish[];
  showViewAll?: boolean;
  title?: string;
}

const DEFAULT_DISHES: FavoriteDish[] = [
  {
    name: "Chicken Burger",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Tiramisu",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export const FavoriteDishes: React.FC<FavoriteDishesProps> = ({ dishes = DEFAULT_DISHES, showViewAll = true, title = "Món yêu thích" }) => {
  return (
    <div className="mb-20 px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#000000]">{title}</h2>
        {showViewAll && (
          <Button variant="ghost" className="h-auto p-0 text-sm text-[#666666]">
            Xem tất cả
          </Button>
        )}
      </div>
      <div className="rounded-2xl bg-[#f8b64c] p-4">
        <div className="flex gap-4 overflow-x-auto">
          {dishes.map((dish, index) => (
            <div key={index} className="relative min-w-[200px]">
              <div className="relative mb-3 h-32 overflow-hidden rounded-xl">
                <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
                <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4 text-[#f8b64c]" />
                </Button>
              </div>
              <div className="rounded-lg bg-white px-3 py-2">
                <span className="text-sm font-medium text-[#343434]">{dish.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
