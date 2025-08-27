import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Filter,
  Search,
  Clock,
  BarChart3,
  Star,
} from "lucide-react";
import { BottomNavigation } from ".";
import NoIngredientMatchPage from "./no_ingredient_match";

interface IngredientSuggestionsAllPageProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const allDishes = [
    {
        id: 1,
        name: "Salad quinoa với rau xanh",
        image: "/quinoa-salad-with-fresh-greens-and-vegetables.png",
        match: "95%",
        time: "30 phút",
        difficulty: "Khó",
        isFeatured: true,
    },
    {
        id: 2,
        name: "Salad falafel rau củ",
        image: "/fresh-falafel-salad-with-vegetables.png",
        match: "85%",
        time: "45 phút",
        difficulty: "Dễ",
        expiring: "Sắp hết hạn: rau xanh, cà chua",
        mealType: "Bữa chính",
        rating: 4,
    },
    {
        id: 3,
        name: "Salad cá hồi rau xanh",
        image: "/salmon-salad-fresh-vegetables.jpg",
        match: "80%",
        time: "40 phút",
        difficulty: "Khó",
        expiring: "Sắp hết hạn: cá hồi, rau xanh",
        mealType: "Bữa chính",
        rating: 4,
    },
    {
        id: 4,
        name: "Salad chay đầy màu sắc",
        image: "/colorful-vegetarian-meal.png",
        match: "65%",
        time: "20 phút",
        difficulty: "Dễ",
        expiring: "Sắp hết hạn: rau củ quả",
        mealType: "Bữa chính",
        rating: 5,
    },
];

export default function IngredientSuggestionsAllPage({ activeTab, onTabChange }: IngredientSuggestionsAllPageProps) {
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDishes = useMemo(() => {
    if (!searchQuery) {
      return allDishes;
    }
    return allDishes.filter(dish =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const featuredDish = useMemo(() => filteredDishes.find(d => d.isFeatured), [filteredDishes]);
  const otherDishes = useMemo(() => filteredDishes.filter(d => !d.isFeatured), [filteredDishes]);

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#fffdf9]">
        <button onClick={() => navigate("/home")} aria-label="Quay lại trang chủ">
          <ArrowLeft className="w-6 h-6 text-[#32201c]" />
        </button>
        <h1 className="text-lg font-semibold text-[#32201c]">Gợi ý theo nguyên liệu</h1>
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-[#ffc6c9] rounded-full flex items-center justify-center">
            <Filter className="w-5 h-5 text-[#fd5d69]" />
          </div>
          <button onClick={() => setSearchVisible(!searchVisible)} className="w-10 h-10 bg-[#ffc6c9] rounded-full flex items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95">
            <Search className={`w-5 h-5 text-[#fd5d69] transition-transform duration-200 ${searchVisible ? 'rotate-90' : 'rotate-0'}`} />
          </button>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchVisible ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 bg-[#fffdf9]">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Tìm kiếm món ăn..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 pl-10 border border-[#ffc6c9] rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff8c94] transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:scale-[1.02]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#fd5d69] transition-colors duration-200" />
            </div>
        </div>
      </div>

      <div className="transition-all duration-300 ease-in-out">
        {filteredDishes.length === 0 && searchQuery ? (
          <div className="animate-fade-in">
            <NoIngredientMatchPage activeTab={activeTab} onTabChange={onTabChange} hideHeader={true} />
          </div>
        ) : (
          <div className="px-4 pb-20 animate-fade-in">
          {/* Section Header */}
          <h2 className="text-[#ff8c94] font-medium mb-4">Phù hợp nhất</h2>

          {/* Featured Pizza Card */}
          {featuredDish && (
            <div className="relative mb-4">
              <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-[#ffc6c9]">
                <div className="relative">
                  <img src={featuredDish.image} alt={featuredDish.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 right-3 bg-[#ff8c94] text-white px-2 py-1 rounded-full text-sm font-medium">
                    {featuredDish.match}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[#32201c] font-medium text-lg">{featuredDish.name}</h3>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-[#ff8c94] text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{featuredDish.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#ff8c94] text-sm mt-1">
                        <BarChart3 className="w-4 h-4" />
                        <span>{featuredDish.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View All Link */}
          <div className="text-right mb-4">
            <span className="text-[#ff8c94] text-sm">Xem tất cả</span>
          </div>

          {/* Food Cards Grid */}
          <div className="space-y-4">
            {otherDishes.map(dish => (
              <div className="flex gap-3" key={dish.id}>
                <div className="relative">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <div className="absolute -top-1 -right-1 bg-[#ff8c94] text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                    {dish.match}
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-3 border border-[#ffc6c9]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[#32201c] font-medium">{dish.name}</h3>
                    <span className="bg-[#ff8c94] text-white px-2 py-1 rounded-full text-xs">{dish.mealType}</span>
                  </div>
                  <p className="text-[#ff8c94] text-sm mb-2">{dish.expiring}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[#ff8c94] text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{dish.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#ff8c94] text-xs">
                        <BarChart3 className="w-3 h-3" />
                        <span>{dish.difficulty}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#32201c] text-sm">{dish.rating}</span>
                      <Star className="w-4 h-4 fill-[#f8b64c] text-[#f8b64c]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}
