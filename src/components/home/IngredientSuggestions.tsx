import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BarChart3 } from 'lucide-react';

interface IngredientSuggestionsProps {
  className?: string;
}

const ingredientDishes = [
  {
    id: 1,
    name: 'Salad rau',
    image: '/quinoa-salad-with-fresh-greens-and-vegetables.png',
    time: '20 phút',
    difficulty: '6/7',
    category: 'Salad rau'
  },
  {
    id: 2,
    name: 'Salad trộn',
    image: '/fresh-falafel-salad-with-vegetables.png',
    time: '15 phút',
    difficulty: '5/8',
    category: 'Salad trộn'
  },
  {
    id: 3,
    name: 'Salad trứng',
    image: '/salmon-salad-fresh-vegetables.jpg',
    time: '25 phút',
    difficulty: '4/5',
    category: 'Salad trứng'
  },
  {
    id: 4,
    name: 'Salad cá',
    image: '/colorful-vegetarian-meal.png',
    time: '30 phút',
    difficulty: '7/8',
    category: 'Salad cá'
  }
];

export const IngredientSuggestions: React.FC<IngredientSuggestionsProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`px-6 mb-8 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#000000]">Gợi ý theo nguyên liệu</h2>
        <button 
          onClick={() => navigate("/ingredient-suggestions-all")}
          className="text-[#ff8c94] text-sm font-medium hover:text-[#ff8c94]/80 transition-colors"
        >
          Xem tất cả
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {ingredientDishes.map((dish) => (
          <div key={dish.id} className="flex-shrink-0 w-32">
            {/* Dish Image */}
            <div className="relative mb-3">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-[#ff8c94]/20">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-dish.png';
                  }}
                />
              </div>
            </div>

            {/* Dish Info */}
            <div className="text-center">
              {/* Time and Difficulty */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#ff8c94]" />
                  <span className="text-xs text-[#ff8c94]">{dish.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-3 h-3 text-[#ff8c94]" />
                  <span className="text-xs text-[#ff8c94]">{dish.difficulty}</span>
                </div>
              </div>

              {/* Category Tag */}
              <div className="bg-[#ff8c94]/10 text-[#ff8c94] px-2 py-1 rounded-full text-xs font-medium">
                {dish.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
