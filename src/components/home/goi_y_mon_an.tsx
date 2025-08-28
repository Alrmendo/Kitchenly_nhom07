import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Filter,
  Search,
  Clock,
  BarChart3,
  Star,
} from "lucide-react";
import { BottomNavigation } from "../shared/BottomNavigation";

interface FoodSuggestionsPageProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function FoodSuggestionsPage({ activeTab, onTabChange }: FoodSuggestionsPageProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fffdf9]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#fffdf9]">
        <button onClick={() => navigate("/home")} aria-label="Quay lại trang chủ">
          <ArrowLeft className="w-6 h-6 text-[#32201c]" />
        </button>
        <h1 className="text-xl font-semibold text-[#32201c]">Gợi ý món ăn</h1>
        <div className="flex gap-2">
          <button className="w-10 h-10 bg-[#ff8c94]/20 rounded-full flex items-center justify-center hover:bg-[#ff8c94]/30 transition-colors">
            <Filter className="w-5 h-5 text-[#ff8c94]" />
          </button>
          <button className="w-10 h-10 bg-[#ff8c94]/20 rounded-full flex items-center justify-center hover:bg-[#ff8c94]/30 transition-colors">
            <Search className="w-5 h-5 text-[#ff8c94]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#ff8c94]">Phù hợp nhất</h2>
        </div>

        {/* Featured Pizza Card */}
        <div className="relative mb-4">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/cheese_roti.png"
              alt="Salami và cheese pizza"
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 right-3 bg-[#ff8c94] text-white px-2 py-1 rounded-full text-sm font-medium">
              95%
            </div>
          </div>
          <div className="bg-white rounded-b-2xl border border-t-0 border-[#ff8c94]/20 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#32201c]">Salami và cheese pizza</h3>
              <div className="flex items-center gap-4 text-[#ff8c94]">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">30 phút</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Khó</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Link */}
        <div className="flex justify-end mb-4">
          <span className="text-[#ff8c94] text-sm font-medium">Xem tất cả</span>
        </div>

        {/* Food Cards Grid */}
        <div className="space-y-4">
          {/* Chicken Card */}
          <div className="flex gap-3">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src="/ga_vien.png"
                alt="Gà sốt phô mai"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 right-1 bg-[#ff8c94] text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                65%
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-[#32201c]">Gà sốt phô mai</h3>
                <span className="bg-[#ff8c94] text-white px-2 py-1 rounded-full text-xs">Bữa chính</span>
              </div>
              <p className="text-sm text-[#ff8c94] mb-2">Sắp hết hạn: gà, cheese</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-[#ff8c94]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>45 phút</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    <span>Dễ</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#32201c]">4</span>
                  <Star className="w-3 h-3 fill-[#f8b64c] text-[#f8b64c]" />
                </div>
              </div>
            </div>
          </div>

          {/* Burger Card */}
          <div className="flex gap-3">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <img src="/chicken_burger.png" alt="Burger bò" className="w-full h-full object-cover" />
              <div className="absolute top-1 right-1 bg-[#ff8c94] text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                60%
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-[#32201c]">Burger bò</h3>
                <span className="bg-[#ff8c94] text-white px-2 py-1 rounded-full text-xs">Tráng miệng</span>
              </div>
              <p className="text-sm text-[#ff8c94] mb-2">Sắp hết hạn: cà chua, bò</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-[#ff8c94]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>40 phút</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    <span>Khó</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#32201c]">4</span>
                  <Star className="w-3 h-3 fill-[#f8b64c] text-[#f8b64c]" />
                </div>
              </div>
            </div>
          </div>

          {/* Tiramisu Card */}
          <button onClick={() => navigate("/recipe/tiramisu")} className="flex gap-3 w-full text-left hover:bg-gray-50 p-2 rounded-xl transition-colors">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <img src="/tiramisu.png" alt="Tiramisu" className="w-full h-full object-cover" />
              <div className="absolute top-1 right-1 bg-[#ff8c94] text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                65%
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-[#32201c]">Tiramisu</h3>
                <span className="bg-[#ff8c94] text-white px-2 py-1 rounded-full text-xs">Tráng miệng</span>
              </div>
              <p className="text-sm text-[#ff8c94] mb-2">Sắp hết hạn: trứng gà</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-[#ff8c94]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>20 phút</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    <span>Dễ</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#32201c]">5</span>
                  <Star className="w-3 h-3 fill-[#f8b64c] text-[#f8b64c]" />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}
