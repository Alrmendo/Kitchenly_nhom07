import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffdf9] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-[#ff8c94] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🍳</span>
          </div>
          <h1 className="text-4xl font-bold text-[#32201c] mb-2">Kitchenly</h1>
          <p className="text-lg text-[#32201c]/70">Ứng dụng nấu ăn thông minh</p>
        </div>

        {/* Description */}
        <div className="mb-12">
          <p className="text-[#32201c]/70 text-center leading-relaxed">
            Khám phá hàng ngàn công thức nấu ăn, lập kế hoạch thực đơn hàng tuần 
            và quản lý nguyên liệu một cách thông minh
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/register")}
            className="w-full h-12 bg-[#ff8c94] hover:bg-[#f07784] text-white font-semibold rounded-lg"
          >
            Bắt đầu với Kitchenly
          </Button>
          
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="w-full h-12 border-[#ff8c94] text-[#ff8c94] hover:bg-[#ff8c94]/10 font-semibold rounded-lg"
          >
            Tôi đã có tài khoản
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-xs text-[#32201c]/50">
          <p>Bằng cách tiếp tục, bạn đồng ý với</p>
          <p>
            <span className="underline">Điều khoản sử dụng</span> và{" "}
            <span className="underline">Chính sách bảo mật</span>
          </p>
        </div>
      </div>
    </div>
  );
}
