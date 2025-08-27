import React from "react";
import { useNavigate } from "react-router-dom";
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
    image: "/chicken_burger.png",
  },
  {
    name: "Tiramisu",
    image: "/tiramisu.png",
  },
];

export const FavoriteDishes: React.FC<FavoriteDishesProps> = ({ dishes = DEFAULT_DISHES, showViewAll = true, title = "Món yêu thích" }) => {
  const navigate = useNavigate();

  const handleDishClick = (dishName: string) => {
    if (dishName === "Tiramisu") {
      navigate("/recipe/tiramisu");
    }
    // Có thể thêm navigation cho các món khác ở đây
  };
  return (
    <div className="mb-20 px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#000000]">{title}</h2>
        {showViewAll && (
          <Button 
            variant="ghost" 
            className="text-[#ff8c94] text-sm font-medium hover:text-[#ff8c94]/80 transition-colors"
            onClick={() => navigate("/favorite-dishes")}
          >
            Xem tất cả
          </Button>
        )}
      </div>
      <div className="rounded-3xl bg-[#FF8C94] p-4">
        <div className="flex gap-6 overflow-x-auto">
          {dishes.map((dish, index) => (
            <div key={index} className="relative min-w-[240px] flex-shrink-0">
              <button
                onClick={() => handleDishClick(dish.name)}
                className="relative h-48 w-full overflow-hidden rounded-2xl transition-transform hover:scale-105"
              >
                <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
                <Button size="icon" variant="ghost" className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-sm">
                  <Heart className="h-5 w-5 text-[#f8b64c]" />
                </Button>
                <div className="absolute bottom-3 left-6 right-6 rounded-2xl bg-white px-2 py-2 text-center">
                  <span className="text-base font-semibold text-[#343434]">{dish.name}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
