import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Filter, Search, Heart, Star, Clock } from "lucide-react";
import { BottomNavigation } from "../shared/BottomNavigation";
import FoodFilterModal, { type FilterState } from "./food-filter-modal";

interface ViewAllPageProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function ViewAllPage({ activeTab, onTabChange }: ViewAllPageProps) {
  const navigate = useNavigate();
  const foodItems = [
    {
      id: 1,
      nameEn: "Eggs Benedict",
      nameVi: "Trứng trần",
      image: "/fried-eggs-sunny-side-up.jpg",
      rating: 5,
      time: 15,
      liked: false,
    },
    {
      id: 2,
      nameEn: "French Toast",
      nameVi: "Bánh mì nướng",
      image: "/avocado-toast-vegetables.jpg",
      rating: 5,
      time: 20,
      liked: true,
    },
    {
      id: 3,
      nameEn: "Oatmeal and Nut",
      nameVi: "Sữa hạt",
      image: "/almondmilk.png",
      rating: 4,
      time: 35,
      liked: false,
    },
    {
      id: 4,
      nameEn: "Still Life Potato",
      nameVi: "Trứng chiên",
      image: "/fried-eggs-sunny-side-up.jpg",
      rating: 4,
      time: 30,
      liked: false,
    },
    {
      id: 5,
      nameEn: "Oatmeal Granola",
      nameVi: "Dâu tây và việt quất",
      image: "/oat.png",
      rating: 4,
      time: 30,
      liked: false,
    },
    {
      id: 6,
      nameEn: "Sunny Bruschetta",
      nameVi: "Với kem bơ",
      image: "/cherry_pancake.png",
      rating: 4,
      time: 30,
      liked: false,
    },
  ]

  const [activeCategory, setActiveCategory] = useState("morning");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    selectedFood: "Tất cả",
    selectedDiet: "Bắt kì",
    selectedLevel: "Trung bình",
    selectedTime: "25",
  });
  
  const tabs = [
    { id: "morning", name: "Buổi sáng" },
    { id: "lunch", name: "Buổi trưa" },
    { id: "evening", name: "Buổi tối" },
  ]

  const handleFilterApply = (filters: FilterState) => {
    setCurrentFilters(filters);
    // Here you could add logic to actually filter the food items
    console.log("Applied filters:", filters);
  };

  return (
    <div className="min-h-screen bg-[#fffdf9] pb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={() => navigate("/home")} aria-label="Quay lại trang chủ">
          <ArrowLeft className="w-6 h-6 text-[#3e2823]" />
        </button>
        <h1 className="text-xl font-semibold text-[#3e2823]">
          {tabs.find(tab => tab.id === activeCategory)?.name || "Buổi sáng"}
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#ff8c94]/30 transition-colors ${
              currentFilters.selectedFood !== "Tất cả" || currentFilters.selectedDiet !== "Bắt kì" 
                ? "bg-[#ff8c94] text-white" 
                : "bg-[#ff8c94]/20 text-[#ff8c94]"
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-[#ff8c94]/20 rounded-full flex items-center justify-center hover:bg-[#ff8c94]/30 transition-colors">
            <Search className="w-5 h-5 text-[#ff8c94]" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 mb-6">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                activeCategory === tab.id ? "border-[#000000] text-[#000000]" : "border-transparent text-[#666666]"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 pb-24">
        {foodItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#ff8c94]/20 overflow-hidden shadow-sm">
            {/* Food Image */}
            <div className="relative">
              <img src={item.image || "/placeholder.svg"} alt={item.nameEn} className="w-full h-32 object-cover" />
              <div
                className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${
                  item.liked ? "bg-[#ff8c94]" : "bg-white/90"
                }`}
              >
                <Heart className={`w-4 h-4 ${item.liked ? "text-white fill-white" : "text-[#ff8c94]"}`} />
              </div>
            </div>

            {/* Food Info */}
            <div className="p-3">
              <h3 className="font-medium text-[#32201c] text-sm mb-1">{item.nameEn}</h3>
              <p className="text-[#ff8c94] text-xs mb-3">{item.nameVi}</p>

              <div className="flex items-center justify-between">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <span className="text-[#ff8c94] text-sm font-medium">{item.rating}</span>
                  <Star className="w-3 h-3 fill-[#f8b64c] text-[#f8b64c]" />
                </div>

                {/* Time */}
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#ff8c94]" />
                  <span className="text-[#ff8c94] text-xs">{item.time} phút</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
      
      {/* Filter Modal */}
      <FoodFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilter={handleFilterApply}
      />
    </div>
  )
}
