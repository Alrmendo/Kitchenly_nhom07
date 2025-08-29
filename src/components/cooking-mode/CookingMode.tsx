import { ArrowLeft, Volume2, Mic, RotateCcw, SkipForward, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function CookingMode() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isClosingAI, setIsClosingAI] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleNavigateBack = () => {
    navigate("/home");
  };

  const steps = useMemo(
    () => [
      {
        title: "Chuẩn bị phần cà phê nhúng bánh",
        content: "Pha trộn kem chua với gia vị để tạo sốt taco",
        timer: 0,
        ingredients: ["Pha 200ml cà phê đen đặc", "Cho vào 2–3 muỗng canh rượu Rhum", "Để nguội hẳn"],
        image: "/kem.jpg",
        imageAlt: "Creamy white sauce in a bowl",
      },
      {
        title: "Đánh lòng đỏ trứng",
        timer: 0,
        ingredients: ["Cho 3 lòng đỏ trứng + 80g đường vào tô, đánh đến khi vàng nhạt, sánh mịn", "Thêm 250g mascarpone vào, trộn đều đến khi mịn mượt"],
        image: "/do.jpg",
        imageAlt: "Red tomato sauce in a bowl",
      },
      {
        title: "Đánh bông kem whipping",
        timer: 0,
        ingredients: ["Đổ 200ml kem whipping vào tô lạnh, đánh bông mềm (chóp đứng nhẹ)", "Trộn kem này nhẹ nhàng vào hỗn hợp mascarpone"],
        image: "/kem1.jpg",
        imageAlt: "Fresh fish fillets on a white plate",
      },
      {
        title: "Đánh bông lòng trắng trứng",
        timer: 0, 
        ingredients: ["Cho 3 lòng trắng trứng + 1 nhúm muối, đánh đến khi bông cứng"],
        image: "/trang.webp",
        imageAlt: "Marinated fish with spices",
      },
      {
        title: "Hoàn thiện kem",
        timer: 300, // 5p
        ingredients: ["Trộn phần lòng trắng đã đánh bông vào hỗn hợp mascarpone để giữ độ xốp", "Đợi 5 phút để kem nghỉ"],
        image: "/kem.jpg",
        imageAlt: "Grilled fish on a cooking pan",
      },
      {
        title: "Lắp ráp Tiramisu",
        timer: 0, 
        ingredients: ["Nhúng ladyfinger vào cà phê trong 1–2 giây", "Xếp một lớp bánh vào đáy khuôn/khay", "Phủ một lớp kem tiramisu lên trên"],
        image: "/tiramisu1.jpeg",
        imageAlt: "Fish with additional marinade",
      },
      {
        title: "Hoàn thiện Tiramisu",
        timer: 0,
        ingredients: ["Dùng rây mịn, rắc bột cacao phủ đều mặt bánh", "Cá nướng đã hoàn thành", "Đậy kín, để ngăn mát ít nhất 4–6 tiếng  (ngon nhất là để qua đêm)"],
        image: "/tiramisu2.png",
        imageAlt: "Assembled fish tacos ready to serve",
      }
    ],
    []
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      // Timer finished - play sound
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  useEffect(() => {
    const stepTimer = steps[currentStep].timer;
    if (stepTimer > 0) {
      const minutes = Math.floor(stepTimer / 60);
      const seconds = stepTimer % 60;
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
      setTimeLeft(stepTimer);
    } else {
      setTimerMinutes(0);
      setTimerSeconds(0);
      setTimeLeft(0);
    }
    setIsTimerRunning(false);
  }, [currentStep, steps]);

  useEffect(() => {
    if (currentStep === steps.length - 1) {
      const timer = setTimeout(() => {
        setShowCompletionModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    setTimeLeft(timerMinutes * 60 + timerSeconds);
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(timerMinutes * 60 + timerSeconds);
  };

  const adjustTimer = (type: "minutes" | "seconds", operation: "add" | "subtract") => {
    if (type === "minutes") {
      if (operation === "add" && timerMinutes < 60) {
        setTimerMinutes(timerMinutes + 1);
      } else if (operation === "subtract" && timerMinutes > 0) {
        setTimerMinutes(timerMinutes - 1);
      }
    } else {
      if (operation === "add" && timerSeconds < 59) {
        setTimerSeconds(timerSeconds + 1);
      } else if (operation === "subtract" && timerSeconds > 0) {
        setTimerSeconds(timerSeconds - 1);
      }
    }
  };

  const currentStepData = steps[currentStep];

  // Function to close AI Assistant
  const closeAIAssistant = () => {
    setIsClosingAI(true);
    setTimeout(() => {
      setShowAIAssistant(false);
      setIsClosingAI(false);
    }, 300);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 overflow-hidden">
      {/* Hidden audio element for timer notification */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/timer-terminer-342934.mp3" type="audio/mpeg" />
      </audio>

      {/* Fixed Header */}
      <div className="flex-shrink-0 rounded-b-[20px] bg-gradient-to-r from-[#FFC6C9] to-[#EC888D]/80 px-4 py-3 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white hover:bg-white/20" onClick={handleNavigateBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold text-white drop-shadow-sm">Chế độ nấu ăn</h1>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white hover:bg-white/20">
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress */}
        <div className="text-center">
          <p className="mb-2 text-xs font-semibold text-white">
            Bước {currentStep + 1}/{steps.length}
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/30">
            <div className="h-full rounded-full bg-white transition-all duration-300 ease-out" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 pt-2 pb-20">
          <Card className="overflow-hidden rounded-[20px] border-0 bg-white shadow-lg">
            <CardContent className="p-0">
              {/* Recipe Image */}
              <div className="relative">
                <Image src={currentStepData.image || "/placeholder.svg"} alt={currentStepData.imageAlt} width={400} height={120} className="h-44 w-full rounded-lg mt-2 object-cover" />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="rounded-full bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">
                    {currentStep + 1}/{steps.length}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                {/* Step Title */}
                <h2 className="mb-3 text-xl leading-tight font-bold text-gray-900">{currentStepData.title}</h2>

                {/* Step Content */}
                  {/* <div className="mb-6 rounded-2xl border-l-[4px] border-[#EC888D] bg-[#FFC6C9]/30 p-4">
                    <p className="leading-relaxed font-medium text-[#1F2937]">{currentStepData.content}</p>
                  </div> */}

                {/* Timer Section */}
                {currentStepData.timer > 0 && (
                  <div className="mb-3 rounded-xl border border-[#FF8C94] bg-white p-3 text-center shadow-sm">
                    {/* Time Display */}
                    <div className="mb-2 text-5xl font-bold text-[#FF8C94]">
                      {formatTime(timeLeft)}
                    </div>

                    {/* Adjust time */}
                    {!isTimerRunning && (
                      <div className="mb-3 flex items-center justify-center gap-4 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <button
                            className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                            onClick={() => adjustTimer("minutes", "subtract")}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium">{timerMinutes}m</span>
                          <button
                            className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                            onClick={() => adjustTimer("minutes", "add")}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                            onClick={() => adjustTimer("seconds", "subtract")}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium">{timerSeconds}s</span>
                          <button
                            className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                            onClick={() => adjustTimer("seconds", "add")}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={isTimerRunning ? pauseTimer : startTimer}
                        className="rounded-lg bg-[#FF8C94] px-3 py-1 text-xs font-semibold text-white hover:bg-[#f07784]"
                      >
                        {isTimerRunning ? "Tạm dừng" : "Bắt đầu"}
                      </button>
                      <button
                        onClick={resetTimer}
                        className="rounded-lg border border-[#FF8C94] bg-white px-3 py-1 text-xs font-semibold text-[#FF8C94] hover:bg-[#FFDFD9]/50"
                      >
                        Đặt lại
                      </button>
                    </div>
                  </div>
                )}

                {/* Ingredients */}
                <div className="space-y-2">
                  {/* <h3 className="mb-2 text-base font-bold text-gray-900">Nguyên liệu cần:</h3> */}
                  <div className="space-y-1">
                    {currentStepData.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-start rounded-lg border border-gray-100 bg-gray-50 p-2">
                        <div className="mt-1.5 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-400"></div>
                        <p className="text-sm leading-relaxed font-medium text-gray-700">{ingredient}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[32px] bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-pink-100 to-orange-100">
              <Check className="h-10 w-10 text-pink-300" />
            </div>
            <h2 className="mb-3 text-3xl font-bold text-gray-900">Hoàn thành!</h2>
            <p className="mb-8 leading-relaxed text-gray-600">Bạn đã hoàn thành tất cả các bước nấu ăn. Chúc ngon miệng!</p>

            <div className="space-y-4">
              <Button variant="outline" className="w-full rounded-2xl border-pink-300 bg-transparent py-3 font-semibold text-[#FF8C94] hover:bg-pink-50" onClick={() => setShowCompletionModal(false)}>
                Lưu vào mục đã nấu
              </Button>
              <Button
                className="w-full rounded-2xl bg-gradient-to-r from-[#FFC6C9] to-[#EC888D]/80 py-3 font-semibold shadow-lg hover:from-pink-500 hover:to-pink-600"
                onClick={() => {
                  setShowCompletionModal(false);
                  handleNavigateBack();
                }}>
                Về lại Home
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white px-4 py-2 shadow-lg">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="h-12 w-12 rounded-full border-0 bg-gray-100 p-0 text-gray-600 hover:bg-gray-200 disabled:opacity-40"
            style={{ borderRadius: "50%" }}
            onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}>
            <RotateCcw className="h-5 w-5" />
          </Button>

          <div className="flex flex-col items-center">
            <Button variant="ghost" className="h-14 w-14 rounded-full border-0 bg-[#FF8C94] bg-gradient-to-r p-0 shadow-lg" style={{ borderRadius: "50%" }} onClick={() => setShowAIAssistant(true)}>
              <Mic className="h-6 w-6 text-white" />
            </Button>
            <p className="mt-1 text-xs font-medium text-gray-500">Nói để tương tác</p>
          </div>

          <Button
            variant="ghost"
            className="h-12 w-12 rounded-full border-0 bg-gray-100 p-0 text-gray-600 hover:bg-gray-200 disabled:opacity-40"
            style={{ borderRadius: "50%" }}
            onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)}
            disabled={currentStep === steps.length - 1}>
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* AI Assistant Overlay */}
      {showAIAssistant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={closeAIAssistant}>
          <div
            className="max-h-[90vh] w-full max-w-sm rounded-[32px] border-3 border-[#FF8C94] bg-white shadow-2xl transition-transform duration-300 ease-out"
            style={{
              animation: isClosingAI ? "slideDown 0.3s ease-in forwards" : "slideUp 0.3s ease-out forwards",
            }}
            onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-3">
              <div className="flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full">
                  <img src="/public/idea.png" alt="icon" className="h-full w-full rounded-full object-cover" />
                </div>
                <h2 className="text-lg font-semibold text-[#FF8C94]">Trợ lý nấu ăn AI</h2>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="max-h-[50vh] flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {/* AI Messages */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[#FF8C94]/20 bg-[#FF8C94]/10 px-4 py-3">
                    <p className="text-sm leading-relaxed text-gray-800">Xin chào! Bạn có muốn cùng mình làm một chiếc bánh tiramisu thơm ngon không?</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[#FF8C94]/20 bg-[#FF8C94]/10 px-4 py-3">
                    <p className="text-sm leading-relaxed text-gray-800">Tuyệt vời! Bước đầu tiên, bạn cần chuẩn bị các nguyên liệu sau.</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[#FF8C94]/20 bg-[#FF8C94]/10 px-4 py-3">
                    <p className="text-sm leading-relaxed text-gray-800">Bánh ladyfinger, phô mai mascarpone, trứng gà, đường, cà phê đậm, bột cacao. Bạn đã có đủ chưa?</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="rounded-full bg-[#FF8C94] px-6 py-2 text-sm text-white shadow-md hover:bg-[#f07784]">Mình có rồi.</Button>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[#FF8C94]/20 bg-[#FF8C94]/10 px-4 py-3">
                    <p className="text-sm leading-relaxed text-gray-800">Rồi, chúng ta bắt đầu. Trước tiên, bạn hãy pha một ly cà phê đậm, để nguội.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Input Area */}
            <div className="mt-9 border-gray-100 px-6 py-4">
              <div className="flex flex-col items-center">
                {/* Center Mic Button */}
                <Button
                  onClick={() => setIsListening(!isListening)}
                  variant="ghost"
                  className={`mb-2 h-16 w-16 rounded-full border-0 p-0 shadow-xl transition-all duration-300 ${
                    isListening ? "scale-80 animate-pulse bg-gradient-to-r from-red-500 to-red-600 text-white" : "bg-[#FF8C94] text-white hover:bg-[#f07784]"
                  }`}
                  style={{ borderRadius: "50%" }}>
                  <Mic className="h-8 w-8" />
                </Button>
                <p className="text-center text-xs font-medium text-gray-600">Nói để tương tác</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
