import { ArrowLeft, Bell, Mic, RotateCcw, SkipForward, Play, Pause, Plus, Minus, Volume2, Check } from "lucide-react";
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
        title: "Chuẩn bị kem chua",
        content: "Pha trộn kem chua với gia vị để tạo sốt taco",
        timer: 300, // 5 p
        ingredients: ["1/2 chén kem chua (sour cream)", "2 muỗng canh nước cốt chanh tươi", "1 muỗng cà phê muối", "1/2 muỗng cà phê tiêu đen"],
        image: "/sot_kem.png",
        imageAlt: "Creamy white sauce in a bowl",
      },
      {
        title: "Nước sốt cà chua",
        content: "Chuẩn bị nước sốt cà chua thơm ngon cho taco",
        timer: 300, // 5 p
        ingredients: ["2 quả cà chua chín", "1/4 hành tây băm nhỏ", "2 tép tỏi băm nhỏ", "1 muỗng canh dầu olive", "Muối, tiêu theo khẩu vị"],
        image: "/sot_nam.png",
        imageAlt: "Red tomato sauce in a bowl",
      },
      {
        title: "Sơ chế cá",
        content: "Chuẩn bị và làm sạch cá để tẩm ướp",
        timer: 0,
        ingredients: ["2 phi lê cá tươi (khoảng 400g)", "Rửa sạch và thấm khô bằng khăn giấy", "Cắt thành miếng vừa ăn"],
        image: "/ga_vien.png",
        imageAlt: "Fresh fish fillets on a white plate",
      },
      {
        title: "Ướp cá",
        content: "Tẩm ướp cá với gia vị trong 15 phút",
        timer: 900, // 15 p
        ingredients: ["Phi lê cá đã sơ chế", "2 muỗng canh dầu olive", "1 muỗng cà phê bột ớt paprika", "1/2 muỗng cà phê bột tỏi", "Muối, tiêu theo khẩu vị", "Nước cốt chanh (1 muỗng canh)"],
        image: "/ga_vien.png",
        imageAlt: "Marinated fish with spices",
      },
      {
        title: "Nướng cá",
        content: "Nướng cá ướp đã tẩm ướp trong 12 phút",
        timer: 720, // 12 p
        ingredients: ["Cá đã ướp", "Làm nóng chảo hoặc grill ở nhiệt độ trung bình", "Nướng mỗi mặt 5-6 phút", "Cá chín khi dễ dàng tách bằng nĩa"],
        image: "/ga_vien.png",
        imageAlt: "Grilled fish on a cooking pan",
      },
      {
        title: "Ướp cá",
        content: "Tiếp tục ướp cá với gia vị bổ sung trong 15 phút",
        timer: 900, // 15 p
        ingredients: ["Cá đã nướng sơ", "1 muỗng canh mật ong", "1/2 muỗng cà phê bột ớt chipotle", "Rắc thêm muối biển", "Để cá thấm gia vị thêm 15 phút"],
        image: "/ga_vien.png",
        imageAlt: "Fish with additional marinade",
      },
      {
        title: "Lắp ráp Taco",
        content: "Lắp ráp taco với tất cả nguyên liệu đã chuẩn bị",
        timer: 0,
        ingredients: ["Bánh tortilla làm ấm", "Cá nướng đã hoàn thành", "Kem chua đã pha chế", "Sốt cà chua", "Rau xà lách tươi", "Hành tây thái lát mỏng", "Rau mùi tươi"],
        image: "/tiramisu.png",
        imageAlt: "Assembled fish tacos ready to serve",
      },
      {
        title: "Hoàn thành!",
        content: "Taco cá nướng đã sẵn sàng để thưởng thức",
        timer: 0,
        ingredients: ["Taco đã hoàn thành", "Trang trí với lát chanh", "Phục vụ ngay khi còn nóng", "Thưởng thức cùng gia đình"],
        image: "/tiramisu.png",
        imageAlt: "Finished fish tacos on a serving plate",
      },
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Hidden audio element for timer notification */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/timer-terminer-342934.mp3" type="audio/mpeg" />
      </audio>

      {/* Fixed Header */}
      <div className="sticky top-0 z-10 rounded-b-[32px] bg-gradient-to-r from-[#FFC6C9] to-[#EC888D]/80 px-6 py-8 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={handleNavigateBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-white drop-shadow-sm">Chế độ nấu ăn</h1>
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
            <Bell className="h-6 w-6" />
          </Button>
        </div>

        {/* Progress */}
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold text-white">
            Bước {currentStep + 1}/{steps.length}
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/30">
            <div className="h-full rounded-full bg-white transition-all duration-300 ease-out" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6 pb-32">
          <Card className="overflow-hidden rounded-[28px] border-0 bg-white shadow-2xl">
            <CardContent className="p-0">
              {/* Recipe Image */}
              <div className="relative">
                <Image src={currentStepData.image || "/placeholder.svg"} alt={currentStepData.imageAlt} width={400} height={240} className="h-56 w-full object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                    {currentStep + 1}/{steps.length}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                {/* Step Title */}
                <h2 className="mb-4 text-2xl leading-tight font-bold text-gray-900">{currentStepData.title}</h2>

                {/* Step Content */}
                <div className="mb-6 rounded-2xl border-l-[4px] border-[#EC888D] bg-[#FFC6C9]/30 p-4">
                  <p className="leading-relaxed font-medium text-[#1F2937]">{currentStepData.content}</p>
                </div>

                {/* Timer Section */}
                {currentStepData.timer > 0 && (
                  <div className="mb-6 rounded-3xl border border-[#FF8C94] bg-[#FFDFD9]/30 p-6">
                    <div className="mb-4 flex items-center justify-center">
                      <h3 className="flex items-center text-lg font-bold text-[#09090B]">
                        <Volume2 className="mr-3 h-5 w-5 text-[#FF8C94]" />
                        Đồng hồ đếm ngược
                      </h3>
                    </div>

                    <div className="mb-6 text-center">
                      <div className="mb-4 text-5xl font-bold tracking-tight text-[#FF8C94]">{formatTime(timeLeft)}</div>

                      {!isTimerRunning && (
                        <div className="mb-3 flex items-center justify-center gap-2">
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={() => adjustTimer("minutes", "subtract")}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{timerMinutes}m</span>
                            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={() => adjustTimer("minutes", "add")}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={() => adjustTimer("seconds", "subtract")}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{timerSeconds}s</span>
                            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={() => adjustTimer("seconds", "add")}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-center gap-3">
                        <Button onClick={isTimerRunning ? pauseTimer : startTimer} className="rounded-full bg-[#FF8C94] px-8 py-3 font-semibold text-white shadow hover:bg-[#f07784]">
                          {isTimerRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                          {isTimerRunning ? "Tạm dừng" : "Bắt đầu"}
                        </Button>

                        <Button variant="outline" onClick={resetTimer} className="rounded-full border-[#FF8C94] px-6 py-3 font-semibold text-[#FF8C94] hover:bg-[#FFDFD9]/50">
                          Đặt lại
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ingredients */}
                <div className="space-y-3">
                  <h3 className="mb-4 text-lg font-bold text-gray-900">Nguyên liệu cần:</h3>
                  {currentStepData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <div className="mt-2.5 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-pink-400"></div>
                      <p className="leading-relaxed font-medium text-gray-700">{ingredient}</p>
                    </div>
                  ))}
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
              <Check className="h-10 w-10 text-pink-500" />
            </div>
            <h2 className="mb-3 text-3xl font-bold text-gray-900">Hoàn thành!</h2>
            <p className="mb-8 leading-relaxed text-gray-600">Bạn đã hoàn thành tất cả các bước nấu ăn. Chúc ngon miệng!</p>

            <div className="space-y-4">
              <Button variant="outline" className="w-full rounded-2xl border-pink-300 bg-transparent py-3 font-semibold text-pink-600 hover:bg-pink-50" onClick={() => setShowCompletionModal(false)}>
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
      <div className="fixed right-0 bottom-0 left-0 border-t border-gray-100 bg-white px-6 py-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="h-14 w-14 rounded-full border-0 bg-gray-100 p-0 text-gray-600 hover:bg-gray-200 disabled:opacity-40"
            style={{ borderRadius: "50%" }}
            onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}>
            <RotateCcw className="h-6 w-6" />
          </Button>

          <div className="flex flex-col items-center">
            <Button variant="ghost" className="h-16 w-16 rounded-full border-0 bg-[#FF8C94] bg-gradient-to-r p-0 shadow-lg" style={{ borderRadius: "50%" }} onClick={() => setShowAIAssistant(true)}>
              <Mic className="h-8 w-8 text-white" />
            </Button>
            <p className="mt-2 text-xs font-medium text-gray-500">Nói để tương tác</p>
          </div>

          <Button
            variant="ghost"
            className="h-14 w-14 rounded-full border-0 bg-gray-100 p-0 text-gray-600 hover:bg-gray-200 disabled:opacity-40"
            style={{ borderRadius: "50%" }}
            onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)}
            disabled={currentStep === steps.length - 1}>
            <SkipForward className="h-6 w-6" />
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
                    <p className="text-sm leading-relaxed text-gray-800">Tôi đã chuẩn bị xong nguyên liệu rồi. Bây giờ tôi cần làm gì tiếp theo</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[#FF8C94]/20 bg-[#FF8C94]/10 px-4 py-3">
                    <p className="text-sm leading-relaxed text-gray-800">Tuyệt vời! Bước đầu tiên, chúng ta cần ướp cá. Bạn hãy rửa sạch và thấm khô bằng giấy ăn.</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[#FF8C94]/20 bg-[#FF8C94]/10 px-4 py-3">
                    <p className="text-sm leading-relaxed text-gray-800">Tiếp theo, hãy cắt cá thành từng miếng vừa ăn (dài khoảng 5-7cm)</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="rounded-full bg-[#FF8C94] px-6 py-2 text-sm text-white shadow-md hover:bg-[#f07784]">Tôi cắt xong rồi</Button>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[#FF8C94]/20 bg-[#FF8C94]/10 px-4 py-3">
                    <p className="text-sm leading-relaxed text-gray-800">Bạn đang làm rất tốt! Hãy rắc đều bột ớt và muối kosher lên cá hai mặt cá.</p>
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
