import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Play, Clock, Users, Star, Check, X } from "lucide-react";
import { BottomNavigation } from "../shared/BottomNavigation";

interface TiramisuRecipePageProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TiramisuRecipePage({ activeTab, onTabChange }: TiramisuRecipePageProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fffdf9] flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white">
        <button onClick={() => navigate("/home")} aria-label="Quay lại trang chủ">
          <ArrowLeft className="w-6 h-6 text-[#111827]" />
        </button>
        <h1 className="text-lg font-semibold text-[#111827]">Tiramisu</h1>
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-[#ffc6c9] rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-[#ec888d]" />
          </div>
          <div className="w-10 h-10 bg-[#ffc6c9] rounded-full flex items-center justify-center">
            <Share2 className="w-5 h-5 text-[#ec888d]" />
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative">
        <div className="aspect-[3/2] bg-gray-200 relative overflow-hidden">
          <img src="/tiramisu.png" alt="Tiramisu dessert" className="w-full h-full object-cover" />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#ff8c94] rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          </div>
        </div>

        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#ff8c94] text-white p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tiramisu</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">20 phút</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">4</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">5</span>
                <Star className="w-4 h-4" fill="white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24 space-y-4">
        {/* Chi tiết */}
        <section>
          <h3 className="text-lg font-semibold text-[#ff8c94] mb-2">Chi tiết</h3>
          <p className="text-[#6b7280] text-sm leading-relaxed">
            Tiramisu là món tráng miệng truyền thống của Ý với hương vị đậm đà từ cà phê và kem mascarpone mềm mịn.
          </p>
        </section>

        {/* Nguyên liệu */}
        <section>
          <h3 className="text-lg font-semibold text-[#ff8c94] mb-4">Nguyên liệu</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md border border-[#FF8C94]">
              <div className="w-10 h-10 bg-[#FFC6C9]/52 border border-[#FF8C94] rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-[#FF8C94]" />
              </div>
              <div className="flex-1">
                <span className="text-[#111827] font-medium text-base">Bơ nhạt</span>
                <div className="text-[#6b7280] text-sm">1/2 cốc</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md border border-[#FF8C94]">
              <div className="w-10 h-10 bg-[#FFC6C9]/52 border border-[#FF8C94] rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-[#FF8C94]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#111827] font-medium text-base">Trứng gà</span>
                  <span className="text-[#6b7280]">≈ Trứng vịt</span>
                </div>
                <div className="text-[#6b7280] text-sm">2 quả</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md border border-[#FF8C94]">
              <div className="w-10 h-10 bg-[#FFC6C9]/52 border border-[#FF8C94] rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-[#FF8C94]" />
              </div>
              <div className="flex-1">
                <span className="text-[#111827] font-medium text-base">Cà phê</span>
                <div className="text-[#6b7280] text-sm">1 thìa</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl shadow-md border border-[#FF8C94]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#FFC6C9]/52 border border-[#FF8C94] rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#FF8C94]" />
                </div>
                <div className="flex-1">
                  <span className="text-[#111827] font-medium text-base">Bột mì đa dụng</span>
                  <div className="text-[#6b7280] text-sm">1/2 cốc</div>
                </div>
              </div>
              <span className="text-xs bg-[#FF8C94] text-white px-3 py-1 rounded-full">
                Sắp hết hạn
              </span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md border border-[#FF8C94]">
              <div className="w-10 h-10 bg-[#FFC6C9]/52 border border-[#FF8C94] rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-[#FF8C94]" />
              </div>
              <div className="flex-1">
                <span className="text-[#111827] font-medium text-base">Hạt óc chó</span>
                <div className="text-[#6b7280] text-sm">1/2 cốc</div>
              </div>
            </div>

          </div>
        </section>

        {/* Bước làm */}
        <section>
          <h3 className="text-lg font-semibold text-[#ff8c94] mb-2">Bước làm</h3>
          <div className="space-y-2">
            <div className="bg-[#EC888D]/70 p-3 rounded-lg text-[#3B2B24]">
              <div className="font-semibold mb-1">1. Đánh kem:</div>
              <p className="text-sm">
                Đánh kem tươi với đường, cho mascarpone vào đánh đến khi hỗn hợp mịn.
              </p>
            </div>

            <div className="bg-[#FFC6C9]/75 p-3 rounded-lg text-[#3B2B24]">
              <div className="font-semibold mb-1">2. Pha cà phê:</div>
              <p className="text-sm">
                Pha cà phê đen đậm đà, để nguội hoàn toàn.
              </p>
            </div>

            <div className="bg-[#EC888D]/70 p-3 rounded-lg text-[#3B2B24]">
              <div className="font-semibold mb-1">3. Nhúng bánh:</div>
              <p className="text-sm">
                Nhúng nhanh bánh ladyfinger vào cà phê để thấm.
              </p>
            </div>

            <div className="bg-[#FFC6C9]/75 p-3 rounded-lg text-[#3B2B24]">
              <div className="font-semibold mb-1">4. Xếp lớp:</div>
              <p className="text-sm">
                Xếp lớp bánh và kem luân phiên, kết thúc bằng lớp kem.
              </p>
            </div>

            <div className="bg-[#EC888D]/70 p-3 rounded-lg text-[#3B2B24]">
              <div className="font-semibold mb-1">5. Làm lạnh & trang trí:</div>
              <p className="text-sm">
                Để tủ lạnh ít nhất 4 tiếng, rắc bột cacao trước khi dùng.
              </p>
            </div>
          </div>
        </section>

        {/* Start Cooking Button */}
        <div className="mt-6 bg-[#fffdf9] pt-4 pb-2">
          <button 
            onClick={() => navigate("/cooking")}
            className="w-full bg-[#ff8c94] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#f07784] transition-colors active:scale-95"
          >
            Bắt đầu nấu ăn
          </button>
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}
