import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffdf9] flex flex-col">
      {/* Food Illustration */}
      <div className="flex-1">
        <img
          src="Rectangle 1190.png"
          alt="Japanese meal illustration with ramen, katsu, and side dishes"
          className="w-full h-150 object-cover"
        />
      </div>

      {/* Welcome Text */}
      <div className="text-center mb-6 max-w-sm mx-auto px-6">
        <h1 className="text-[#32201c] text-2xl font-bold mb-3">Chào mừng</h1>
        <p className="text-[#32201c] text-sm leading-relaxed opacity-800">
          Khám phá những công thức nấu ăn tuyệt vời nhất từ khắp nơi trên thế giới, kèm hướng dẫn từng bước giúp bạn
          nâng cao kỹ năng nấu nướng
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-sm mx-auto space-y-3 pb-15 px-6">
        <button 
          onClick={() => navigate("/register")}
          className="w-full bg-[#ffc6c9] text-[#32201c] py-3 px-6 rounded-full text-base font-medium hover:bg-[#ec888d] transition-colors"
        >
          Người mới
        </button>

        <button 
          onClick={() => navigate("/login")}
          className="w-full border-2 border-[#ffc6c9] text-[#ec888d] py-3 px-6 rounded-full text-base font-medium hover:bg-[#ffc6c9] hover:text-[#32201c] transition-colors"
        >
          Đã sử dụng
        </button>
      </div>
    </div>
  );
}
