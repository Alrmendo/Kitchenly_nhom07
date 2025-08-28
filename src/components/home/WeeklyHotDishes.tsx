import React from 'react';
import { useNavigate } from 'react-router-dom';

interface WeeklyHotDishesProps {
  className?: string;
}

const hotDishes = [
  {
    id: 1,
    name: 'Burger',
    image: '/chicken_burger.png'
  },
  {
    id: 2,
    name: 'Hải sản',
    image: '/fresh-seafood-platter.png'
  },
  {
    id: 3,
    name: 'Gà quay',
    image: '/roasted-chicken-herbs.jpg'
  },
  {
    id: 4,
    name: 'Bento',
    image: '/protein-rich-meal.jpg'
  }
];

export const WeeklyHotDishes: React.FC<WeeklyHotDishesProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`px-6 mb-5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#000000]">Món hot trong tuần</h2>
        <button 
          onClick={() => navigate("/weekly-hot-dishes")}
          className="text-[#ff8c94] text-sm font-medium hover:text-[#ff8c94]/80 transition-colors"
        >
          Xem tất cả
        </button>
      </div>

      {/* Horizontal Scroll Layout */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {hotDishes.map((dish) => (
          <div key={dish.id} className="group cursor-pointer flex-shrink-0 w-40">
            {/* Dish Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-a11wh.jpg';
                }}
              />
            </div>

            {/* Dish Name Below Image */}
            <div className="text-center">
              <h3 className="text-[#32201c] font-medium text-sm">{dish.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
