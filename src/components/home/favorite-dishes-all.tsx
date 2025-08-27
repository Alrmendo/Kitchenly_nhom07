import { ArrowLeft, Filter, Search, Heart, Star, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { BottomNavigation } from "."

interface FavoriteDishesAllProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function SeasonalDishesAll({ activeTab, onTabChange }: FavoriteDishesAllProps) {
  const navigate = useNavigate();

  const foodItems = [
    {
      id: 1,
      image: "/taco-salmon-with-colorful-vegetables-on-yellow-bac.png",
      nameEn: "Taco Salmon",
      nameVi: "Taco cá hồi",
      rating: 5,
      time: "15 phút",
    },
    {
      id: 2,
      image: "/french-toast-with-berries-and-syrup.png",
      nameEn: "French Toast",
      nameVi: "Bánh mì nướng",
      rating: 5,
      time: "20 phút",
    },
    {
      id: 3,
      image: "/oatmeal-bowl-with-nuts-and-berries.png",
      nameEn: "Oatmeal and Nut",
      nameVi: "Sữa hạt",
      rating: 4,
      time: "35 phút",
    },
    {
      id: 4,
      image: "/potato-omelet-on-white-plate.png",
      nameEn: "Still Life Potato",
      nameVi: "Trứng chiên",
      rating: 4,
      time: "30 phút",
    },
    {
      id: 5,
      image: "/granola-bowl-with-berries-and-yogurt.png",
      nameEn: "Oatmeal Granola",
      nameVi: "Dâu tây và việt quất",
      rating: 4,
      time: "30 phút",
    },
    {
      id: 6,
      image: "/bruschetta-with-tomatoes-and-herbs.png",
      nameEn: "Sunny Bruschetta",
      nameVi: "Với kem bơ",
      rating: 4,
      time: "30 phút",
    },
  ]

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
          <button className="w-12 h-12 bg-[#ffc6c9] rounded-full flex items-center justify-center">
            <Filter className="w-5 h-5 text-[#3e2823]" />
          </button>
          <button className="w-12 h-12 bg-[#ffc6c9] rounded-full flex items-center justify-center">
            <Search className="w-5 h-5 text-[#3e2823]" />
          </button>
        </div>
      </div>
      
      {/* Food Grid */}
      <div className="grid grid-cols-2 gap-4 pb-24">
        {foodItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[#ffc6c9]/30 shadow-sm">
            {/* Image Container */}
            <div className="relative h-40">
              <img src={item.image || "/placeholder.svg"} alt={item.nameEn} className="w-full h-full object-cover" />
              <button className="absolute top-3 right-3 w-8 h-8 bg-[#ffc6c9] rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#fd5d69]" />
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
    </div>
  )
}
