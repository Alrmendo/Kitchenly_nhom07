import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { BottomNavigation } from "../shared/BottomNavigation";

interface NotificationsHomePageProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function NotificationsHomePage({ activeTab, onTabChange }: NotificationsHomePageProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fffdf9] px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate("/home")} aria-label="Quay lại trang chủ">
          <ChevronLeft className="w-6 h-6 text-[#32201c] mr-4" />
        </button>
        <h1 className="text-xl font-semibold text-[#32201c]">Thông báo</h1>
      </div>

      {/* Today Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-[#32201c] mb-4">Hôm nay</h2>

        {/* Notification 1 */}
        <div className="bg-white border border-[#ff8c94]/20 rounded-2xl p-4 mb-4 flex items-start shadow-sm">
          <div className="w-10 h-10 bg-[#ff8c94] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[#ff8c94] font-medium mb-1">Công thức nấu ăn mới hàng tuần!</h3>
            <p className="text-[#32201c] text-sm">Khám phá công thức nấu ăn mới của tuần này!</p>
          </div>
          <span className="text-[#32201c] text-xs ml-2 flex-shrink-0">2 phút trước</span>
        </div>

        {/* Notification 2 */}
        <div className="bg-white border border-[#ff8c94]/20 rounded-2xl p-4 mb-4 flex items-start shadow-sm">
          <div className="w-10 h-10 bg-[#ff8c94] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[#ff8c94] font-medium mb-1">Nhắc nhở nguyên liệu</h3>
            <p className="text-[#32201c] text-sm">Sữa tươi sắp hết hạn sử dụng (05/08/2025)</p>
          </div>
          <span className="text-[#32201c] text-xs ml-2 flex-shrink-0">35 phút trước</span>
        </div>
      </div>

      {/* Wednesday Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-[#32201c] mb-4">Thứ tư</h2>

        {/* Notification 3 */}
        <div className="bg-white border border-[#ff8c94]/20 rounded-2xl p-4 mb-4 flex items-start shadow-sm">
          <div className="w-10 h-10 bg-[#ff8c94] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[#ff8c94] font-medium mb-1">Đã có bản cập nhật mới</h3>
            <p className="text-[#32201c] text-sm">Cải thiện hiệu suất và sửa lỗi</p>
          </div>
          <span className="text-[#32201c] text-xs ml-2 flex-shrink-0">29/07/2025</span>
        </div>

        {/* Notification 4 */}
        <div className="bg-white border border-[#ff8c94]/20 rounded-2xl p-4 mb-4 flex items-start shadow-sm">
          <div className="w-10 h-10 bg-[#ff8c94] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[#ff8c94] font-medium mb-1">Công thức nấu ăn mới hàng tuần!</h3>
            <p className="text-[#32201c] text-sm">Khám phá công thức nấu ăn mới của tuần này!</p>
          </div>
          <span className="text-[#32201c] text-xs ml-2 flex-shrink-0">27/07/2025</span>
        </div>

        {/* Notification 5 */}
        <div className="bg-white border border-[#ff8c94]/20 rounded-2xl p-4 mb-4 flex items-start shadow-sm">
          <div className="w-10 h-10 bg-[#ff8c94] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[#ff8c94] font-medium mb-1">Chú ý quan trọng</h3>
            <p className="text-[#32201c] text-sm">
              Hãy nhớ thay đổi mật khẩu thường xuyên để giữ an toàn cho tài khoản của bạn
            </p>
          </div>
          <span className="text-[#32201c] text-xs ml-2 flex-shrink-0">25/07/2025</span>
        </div>
      </div>

      {/* Monday Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-[#32201c] mb-4">Thứ hai</h2>

        {/* Notification 6 */}
        <div className="bg-white border border-[#ff8c94]/20 rounded-2xl p-4 mb-4 flex items-start shadow-sm">
          <div className="w-10 h-10 bg-[#ff8c94] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[#ff8c94] font-medium mb-1">Đã có bản cập nhật mới</h3>
            <p className="text-[#32201c] text-sm">Cải thiện hiệu suất và sửa lỗi</p>
          </div>
          <span className="text-[#32201c] text-xs ml-2 flex-shrink-0">23/06/2025</span>
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}
