import { ArrowLeft, Filter, Search, Star, Clock, Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { BottomNavigation } from "."

interface WeeklyHotDishAllProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function WeeklyHotDishAll({ activeTab, onTabChange }: WeeklyHotDishAllProps) {
  const navigate = useNavigate();
  const dishes = [
    {
      id: 1,
      name: "Pasta gà quay",
      description: "Sợi mì mềm kết hợp với thịt gà quay vàng giòn, sốt béo nhẹ và rau củ tươi, tạo hương vị đậm đà...",
      rating: 4.8,
      time: "50 phút",
      image: "/creamy-pasta-with-roasted-chicken-and-herbs.png",
    },
    {
      id: 2,
      name: "Cánh gà chiên nước mắm",
      description: "Cánh gà giòn rum bên ngoài, thịt mềm bên trong, phủ sốt mắn ngọt đặc trưng của nước mắm...",
      rating: 4.1,
      time: "38 phút",
      image: "/glazed-chicken-wings-with-sesame-seeds.png",
    },
    {
      id: 3,
      name: "Bánh Socola Vani",
      description: "Bánh socola mềm ẩm, đậm vị, kết hợp hạt đinh dương giòn tan, tạo sự hòa quyến giữa ngọt dịu...",
      rating: 4.7,
      time: "14 phút",
      image: "/layered-chocolate-vanilla-cake-with-nuts.png",
    },
  ]

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={() => navigate("/home")} aria-label="Quay lại trang chủ">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-xl font-semibold text-black">Món hot trong tuần</h1>
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-[#ffc6c9] rounded-full flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div className="w-10 h-10 bg-[#ffc6c9] rounded-full flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Food Cards */}
      <div className="px-9 space-y-6 mt-3 pb-24">
        {dishes.map((dish) => (
          <div key={dish.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Image Section */}
            <div className="relative">
              <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full h-32 object-cover" />
              <div className="absolute top-2 right-2 w-6 h-6 bg-[#ffc6c9] rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-[#ffc6c9] p-3">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold text-base">{dish.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-white fill-white" />
                  <span className="text-white text-xs font-medium">{dish.rating}</span>
                </div>
              </div>

              <p className="text-white text-xs leading-relaxed mb-2 opacity-90 line-clamp-2">{dish.description}</p>

              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-white" />
                <span className="text-white text-xs">{dish.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}
