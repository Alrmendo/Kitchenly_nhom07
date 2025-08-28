import { useState, useMemo } from "react"
import { ArrowLeft, Filter, Search, Heart, Star, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { BottomNavigation } from "."
import FoodFilterModal, { type FilterState } from "./food-filter-modal";

interface SeasonalDishesAllProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function SeasonalDishesAll({ activeTab, onTabChange }: SeasonalDishesAllProps) {
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [filters, setFilters] = useState<FilterState>({
    selectedFood: "Tất cả",
    selectedDiet: "Bất kì", 
    selectedLevel: "Trung bình",
    selectedTime: "25"
  });

  const categories = [
    { name: "Tất cả", active: activeCategory === "Tất cả" },
    { name: "Mùa xuân", active: activeCategory === "Mùa xuân" },
    { name: "Mùa hè", active: activeCategory === "Mùa hè" },
    { name: "Mùa thu", active: activeCategory === "Mùa thu" },
    { name: "Mùa đông", active: activeCategory === "Mùa đông" },
  ]

  const foodItems = [
    {
      id: 1,
      image: "/taco-salmon-with-colorful-vegetables-on-yellow-bac.png",
      nameEn: "Taco Salmon",
      nameVi: "Taco cá hồi",
      rating: 5,
      time: "15 phút",
      difficulty: "Dễ",
      season: "Mùa xuân",
      category: "Bữa trưa"
    },
    {
      id: 2,
      image: "/french-toast-with-berries-and-syrup.png",
      nameEn: "French Toast",
      nameVi: "Bánh mì nướng",
      rating: 5,
      time: "20 phút",
      difficulty: "Dễ",
      season: "Mùa xuân",
      category: "Bữa sáng"
    },
    {
      id: 3,
      image: "/oatmeal-bowl-with-nuts-and-berries.png",
      nameEn: "Oatmeal and Nut",
      nameVi: "Sữa hạt",
      rating: 4,
      time: "35 phút",
      difficulty: "Trung bình",
      season: "Mùa hè",
      category: "Bữa sáng"
    },
    {
      id: 4,
      image: "/potato-omelet-on-white-plate.png",
      nameEn: "Still Life Potato",
      nameVi: "Trứng chiên",
      rating: 4,
      time: "30 phút",
      difficulty: "Trung bình",
      season: "Mùa thu",
      category: "Bữa tối"
    },
    {
      id: 5,
      image: "/granola-bowl-with-berries-and-yogurt.png",
      nameEn: "Oatmeal Granola",
      nameVi: "Dâu tây và việt quất",
      rating: 4,
      time: "30 phút",
      difficulty: "Dễ",
      season: "Mùa đông",
      category: "Bữa sáng"
    },
    {
      id: 6,
      image: "/bruschetta-with-tomatoes-and-herbs.png",
      nameEn: "Sunny Bruschetta",
      nameVi: "Với kem bơ",
      rating: 4,
      time: "30 phút",
      difficulty: "Khó",
      season: "Mùa xuân",
      category: "Bữa trưa"
    },
  ]

  // Filter and search logic
  const filteredFoodItems = useMemo(() => {
    let filtered = foodItems;

    // Filter by active category/season only if not "Tất cả"
    if (activeCategory !== "Tất cả") {
      filtered = filtered.filter(item => item.season === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameVi.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.selectedFood !== "Tất cả") {
      filtered = filtered.filter(item => item.category === filters.selectedFood);
    }

    if (filters.selectedLevel !== "Trung bình") {
      filtered = filtered.filter(item => item.difficulty === filters.selectedLevel);
    }

    if (filters.selectedTime !== "25") {
      const timeValue = parseInt(filters.selectedTime);
      filtered = filtered.filter(item => {
        const itemTime = parseInt(item.time);
        return Math.abs(itemTime - timeValue) <= 10; // Allow ±10 minutes tolerance
      });
    }

    return filtered;
  }, [searchQuery, activeCategory, filters]);

  const handleFilterApply = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-[#fffdf9] px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/home")} className="p-2" aria-label="Quay lại trang chủ">
            <ArrowLeft className="w-6 h-6 text-[#3e2823]" />
          </button>
          <h1 className="text-2xl font-semibold text-[#3e2823]">Món ăn theo mùa</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="w-10 h-10 bg-[#ffc6c9] rounded-full flex items-center justify-center"
          >
            <Filter className="w-5 h-5 text-[#3e2823]" />
          </button>
          <button 
            onClick={() => setSearchVisible(!searchVisible)}
            className="w-10 h-10 bg-[#ffc6c9] rounded-full flex items-center justify-center transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95"
          >
            <Search className={`w-5 h-5 text-[#3e2823] transition-transform duration-200 ${searchVisible ? 'rotate-90' : 'rotate-0'}`} />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${searchVisible ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 bg-[#fffdf9]">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 border border-[#ffc6c9] rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff8c94] transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:scale-[1.02]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#fd5d69] transition-colors duration-200" />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-4 mb-8 overflow-x-auto">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category.name)}
            className={`px-6 py-3 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              category.active ? "bg-[#ffc6c9] text-[#3e2823]" : "text-[#ec888d] hover:text-[#3e2823]"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-2 gap-4 pb-24">
        {filteredFoodItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[#ffc6c9]/30 shadow-sm">
            {/* Image Container */}
            <div className="relative h-40">
              <img src={item.image || "/placeholder.svg"} alt={item.nameEn} className="w-full h-full object-cover" />
              <button className="absolute top-3 right-3 w-8 h-8 bg-[#ffc6c9] rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-[#3e2823] text-sm mb-1">{item.nameEn}</h3>
              <p className="text-[#ec888d] text-xs mb-3">{item.nameVi}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[#ec888d] text-sm font-medium">{item.rating}</span>
                  <Star className="w-3 h-3 fill-[#f8b64c] text-[#f8b64c]" />
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#ec888d]" />
                  <span className="text-[#ec888d] text-xs">{item.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
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
