import { ArrowLeft, Clock, Calendar, Star, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface CookedDish {
  id: string;
  title: string;
  image: string;
  completedDate: string;
  cookingTime: string;
  rating?: number;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  category: string;
}

export default function CookedDishes() {
  const navigate = useNavigate();
  const [cookedDishes, setCookedDishes] = useState<CookedDish[]>([]);

  useEffect(() => {
    // Load cooked dishes from localStorage
    const savedDishes = localStorage.getItem('cookedDishes');
    if (savedDishes) {
      setCookedDishes(JSON.parse(savedDishes));
    } else {
      // Sample data for demonstration
      setCookedDishes([
        {
          id: "1",
          title: "Tiramisu",
          image: "/public/tiramisu2.png",
          completedDate: "2024-01-15",
          cookingTime: "45 phút",
          rating: 5,
          difficulty: "Trung bình",
          category: "Tráng miệng"
        },
        {
          id: "2", 
          title: "Bánh flan",
          image: "/public/flan.jpg",
          completedDate: "2024-01-10",
          cookingTime: "30 phút",
          rating: 4,
          difficulty: "Dễ",
          category: "Tráng miệng"
        }
      ]);
    }
  }, []);

  const handleNavigateBack = () => {
    navigate("/home");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="flex-shrink-0 rounded-b-[20px] bg-gradient-to-r from-[#FFC6C9] to-[#EC888D]/80 px-4 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-full text-white hover:bg-white/20" 
            onClick={handleNavigateBack}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-white drop-shadow-sm">Món đã nấu</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-white/90 text-sm">
            Bạn đã hoàn thành {cookedDishes.length} món ăn
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {cookedDishes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-24 h-24 bg-[#FFC6C9]/30 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-[#FF8C94]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Chưa có món nào
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Hãy bắt đầu nấu một món ăn để lưu vào đây nhé!
            </p>
            <Button 
              onClick={() => navigate("/home")}
              className="rounded-2xl bg-gradient-to-r from-[#FFC6C9] to-[#EC888D]/80 px-6 py-3 font-semibold shadow-lg hover:from-pink-500 hover:to-pink-600"
            >
              Khám phá công thức
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cookedDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden rounded-2xl border-0 bg-white shadow-md">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative w-28 h-24 flex-shrink-0 mt-3">
                      <Image 
                        src={dish.image} 
                        alt={dish.title}
                        width={112}  // w-28 = 112px
                        height={96}  // h-24 = 96px
                        className="h-full w-full object-cover rounded-xl"
                      />
                      <div className="absolute top-1 left-1">
                        <Badge 
                          variant="secondary" 
                          className="rounded-full bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white"
                        >
                          {dish.category}
                        </Badge>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 text-base leading-tight">
                          {dish.title}
                        </h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#FF8C94]">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Rating */}
                      {dish.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          {renderStars(dish.rating)}
                        </div>
                      )}

                      {/* Details */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Calendar className="h-3 w-3" />
                          <span>Hoàn thành: {formatDate(dish.completedDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>{dish.cookingTime}</span>
                          <span className="mx-1">•</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            dish.difficulty === "Dễ" 
                              ? "bg-[#FF8C94] text-white"
                              : dish.difficulty === "Trung bình"
                              ? "bg-[#FF8C94] text-white"
                              : "bg-[#FF8C94] text-white"
                          }`}>
                            {dish.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      {cookedDishes.length > 0 && (
        <div className="flex-shrink-0 border-t border-gray-100 bg-white px-4 py-4">
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="flex-1 rounded-2xl border-[#FF8C94] bg-transparent py-3 font-semibold text-[#FF8C94] hover:bg-pink-50"
              onClick={() => navigate("/home")}
            >
              Nấu thêm món khác
            </Button>
            <Button 
              className="flex-1 rounded-2xl bg-gradient-to-r from-[#FFC6C9] to-[#EC888D]/80 py-3 font-semibold shadow-lg hover:from-pink-500 hover:to-pink-600"
              onClick={() => {
                // TODO: Implement share functionality
                alert("Tính năng chia sẻ đang được phát triển!");
              }}
            >
              Chia sẻ thành tích
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
