import { ChevronLeft, Filter, Search, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from ".";

interface FoodSuggestionPageProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  hideHeader?: boolean;
}

export default function FoodSuggestionPage({ activeTab = "home", onTabChange = () => {}, hideHeader = false }: FoodSuggestionPageProps) {
  const foodItems = [
    {
      id: 1,
      image: "/delicious-burger-with-sesame-bun-and-vegetables.png",
      vietnameseName: "Burger đậu chiên",
      englishName: "Veggie-packed bean burger patty",
      rating: 4,
      score: "2/7",
    },
    {
      id: 2,
      image: "/cheesy-broccoli-lasagna-layers-with-herbs.png",
      vietnameseName: "Bánh kẹp tầng",
      englishName: "Cheesy broccoli-filled lasagna layers",
      rating: 4,
      score: "1/5",
    },
    {
      id: 3,
      image: "/oven-baked-eggplant-with-tomato-and-herbs.png",
      vietnameseName: "Bánh trứng",
      englishName: "Oven-baked eggplant with savory glaze",
      rating: 4,
      score: "5/10",
    },
    {
      id: 4,
      image: "/quinoa-salad-with-fresh-greens-and-vegetables.png",
      vietnameseName: "Salad trái cây",
      englishName: "Nutrient-rich quinoa tossed in salad",
      rating: 4,
      score: "3/7",
    },
    {
      id: 5,
      image: "/creamy-mushroom-risotto-pasta-dish.png",
      vietnameseName: "Risotto nấm",
      englishName: "Creamy mushroom-infused rice dish",
      rating: 4,
      score: "1/5",
    },
    {
      id: 6,
      image: "/fresh-falafel-salad-with-vegetables.png",
      vietnameseName: "Salad kẹm",
      englishName: "Crisp falafel atop fresh salad greens",
      rating: 4,
      score: "8/6",
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffdf9" }}>
      {/* Header */}
      {!hideHeader && (
        <div className="flex items-center justify-between p-4 pt-12">
          <div className="flex items-center gap-3">
            <ChevronLeft className="w-6 h-6" style={{ color: "#000000" }} />
            <h1 className="text-xl font-semibold" style={{ color: "#000000" }}>
              Gợi ý món ăn
            </h1>
          </div>
          <div className="flex gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#ffc6c9" }}
            >
              <Filter className="w-5 h-5" style={{ color: "#ec888d" }} />
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#ffc6c9" }}
            >
              <Search className="w-5 h-5" style={{ color: "#ec888d" }} />
            </div>
          </div>
        </div>
      )}

      {/* Notification Card */}
      <div className="mx-5 mb-6">
        <div
          className="rounded-3xl p-6 border-2 shadow-sm"
          style={{
            borderColor: "#ff8c94",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-1" style={{ color: "#ff8c94" }}>
              Không có công thức chứa
            </h3>
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#ff8c94" }}>
              các nguyên liệu bạn đang có
            </h3>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#666666" }}>
              Đừng lo! Chúng tôi sẽ tìm các công thức gần giống.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
              Bạn chỉ cần thêm một vài nguyên liệu
            </p>
          </div>
          
          <div className="flex gap-3 justify-center">
            <Button 
              variant="ghost" 
              className="text-sm px-5 py-2.5 rounded-full border border-[#ff8c94] hover:bg-[#ff8c94]/10 transition-colors" 
              style={{ color: "#ff8c94" }}
            >
              Điều chỉnh bộ lọc
            </Button>
            <Button 
              className="text-sm px-6 py-2.5 rounded-full text-white font-medium hover:opacity-90 transition-opacity shadow-md" 
              style={{ backgroundColor: "#ff8c94" }}
            >
              Mua sắm
            </Button>
          </div>
        </div>
      </div>

      {/* Reference Section */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: "#000000" }}>
          Tham khảo
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {foodItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden border-2 bg-white"
              style={{ borderColor: "#ffc6c9" }}
            >
              <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.vietnameseName}
                  className="w-full h-32 object-cover"
                />
                <div
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#ffc6c9" }}
                >
                  <Heart className="w-4 h-4" style={{ color: "#ff8c94" }} />
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm mb-1" style={{ color: "#000000" }}>
                  {item.vietnameseName}
                </h3>
                <p className="text-xs mb-2 leading-relaxed" style={{ color: "#666666" }}>
                  {item.englishName}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium" style={{ color: "#000000" }}>
                      {item.rating}
                    </span>
                    <Heart className="w-3 h-3 fill-current" style={{ color: "#ff8c94" }} />
                  </div>
                  <span className="text-xs" style={{ color: "#f8b64c" }}>
                    {item.score}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}
