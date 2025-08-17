import { ChevronLeft, Heart, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function FAQPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/settings");
  };



  return (
    <div className="min-h-screen bg-[#fffdf9] px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-center relative mb-8">
        <button className="absolute left-0 p-2" onClick={handleBack}>
          <ChevronLeft className="w-6 h-6 text-[#ff8c94]" />
        </button>
        <h1 className="text-xl font-medium text-[#ff8c94]">Trợ giúp</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-3 mb-6">
        <button className="flex-1 bg-[#ff8c94] text-white py-3 px-6 rounded-full font-medium">FAQ</button>
        <button className="flex-1 bg-[#ff8c94]/30 text-[#ff8c94] py-3 px-6 rounded-full font-medium">Liên hệ</button>
      </div>

      <div className="mb-6">
        <button className="w-full bg-[#ff8c94]/20 text-[#ff8c94] py-3 px-6 rounded-full font-medium text-left">
          Tìm kiếm
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {/* First FAQ Item - Expanded */}
        <div className="bg-white rounded-lg p-4 border border-[#ff8c94]/20">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-[#32201c] font-medium flex-1 pr-4">
              App có gợi ý món ăn phù hợp với dị ứng hoặc sở thích không?
            </h3>
            <Heart className="w-5 h-5 text-[#ff8c94] flex-shrink-0" />
          </div>
          <p className="text-[#32201c]/70 text-sm leading-relaxed">
            Có, app hoàn toàn có thể gợi ý món ăn phù hợp dựa trên dị ứng hoặc sở thích của người dùng.
          </p>
        </div>

        {/* Other FAQ Items */}
        <div className="flex items-center justify-between py-4">
          <h3 className="text-[#32201c] font-medium flex-1 pr-4">App có hỗ trợ đa ngôn ngữ không?</h3>
          <ChevronRight className="w-5 h-5 text-[#ff8c94] flex-shrink-0" />
        </div>

        <div className="flex items-center justify-between py-4">
          <h3 className="text-[#32201c] font-medium flex-1 pr-4">Nếu gặp lỗi hoặc sự cố, tôi nên liên hệ ai?</h3>
          <ChevronRight className="w-5 h-5 text-[#ff8c94] flex-shrink-0" />
        </div>

        <div className="flex items-center justify-between py-4">
          <h3 className="text-[#32201c] font-medium flex-1 pr-4">Làm sao để thay đổi trình độ nấu ăn của tôi?</h3>
          <ChevronRight className="w-5 h-5 text-[#ff8c94] flex-shrink-0" />
        </div>

        <div className="flex items-center justify-between py-4">
          <h3 className="text-[#32201c] font-medium flex-1 pr-4">
            Làm thế nào để theo dõi tiến trình học các kỹ thuật nấu ăn?
          </h3>
          <ChevronRight className="w-5 h-5 text-[#ff8c94] flex-shrink-0" />
        </div>

        <div className="flex items-center justify-between py-4">
          <h3 className="text-[#32201c] font-medium flex-1 pr-4">Có thể tải video hướng dẫn nấu ăn về máy không?</h3>
          <ChevronRight className="w-5 h-5 text-[#ff8c94] flex-shrink-0" />
        </div>

        <div className="flex items-center justify-between py-4">
          <h3 className="text-[#32201c] font-medium flex-1 pr-4">Làm thế nào để tạo tài khoản trên app?</h3>
          <ChevronRight className="w-5 h-5 text-[#ff8c94] flex-shrink-0" />
        </div>

        <div className="flex items-center justify-between py-4">
          <h3 className="text-[#32201c] font-medium flex-1 pr-4">
            Tôi có thể tìm kiếm công thức theo nguyên liệu có sẵn không?
          </h3>
          <ChevronRight className="w-5 h-5 text-[#ff8c94] flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}
