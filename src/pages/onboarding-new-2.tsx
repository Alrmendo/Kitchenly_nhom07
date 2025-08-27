import { useNavigate } from 'react-router-dom';

export default function OnboardingNew() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/welcome'); // Navigate to welcome page
  };

  return (
    <div className="min-h-screen bg-[#fffdf9] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/Frame 583.png" 
          alt="Delicious food" 
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Beige gradient overlay only at top */}
        <div className="absolute top-0 left-0 right-0 h-85 bg-gradient-to-b from-[#FFFDF9] to-transparent"></div>

      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-screen p-6">
        {/* Top Section */}
        <div className="pt-12">
          <div className="text-left text-white">
            <h1 className="text-[#32201C] text-2xl font-bold mb-4 leading-tight">
              Nâng cao kỹ năng của bạn
            </h1>
            <p className="text-[#32201C] text-base leading-relaxed">
              Khám phá cảm hứng mới với công thức nấu ăn mỗi ngày
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-8">
          {/* Text Content */}
          {/* <div className="mb-8">
            <h1 className="text-white text-2xl font-bold mb-4 leading-tight">
              Gợi ý món ngon mỗi ngày
            </h1>
            <p className="text-white/90 text-base leading-relaxed">
              Khám phá cảm hứng mới với công thức nấu ăn mỗi ngày
            </p>
          </div> */}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-white text-[#ff8c94] py-4 px-6 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}
