import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NotificationSettings() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/settings");
  };



  return (
    <div className="min-h-screen bg-[#fffdf9] px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-center relative mb-12">
        <button className="absolute left-0 p-2" onClick={handleBack}>
          <ChevronLeft className="w-6 h-6 text-[#ff8c94]" />
        </button>
        <h1 className="text-xl font-medium text-[#ff8c94]">Thông báo</h1>
      </div>

      {/* Settings List */}
      <div className="space-y-8">
        {/* General Notifications */}
        <div className="flex items-center justify-between">
          <span className="text-lg text-[#32201c]">Thông báo chung</span>
          <div className="relative">
            <input type="checkbox" className="sr-only" defaultChecked />
            <div className="w-12 h-7 bg-[#ff8c94] rounded-full shadow-inner">
              <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-6 translate-y-1 transition-transform"></div>
            </div>
          </div>
        </div>

        {/* Sound */}
        <div className="flex items-center justify-between">
          <span className="text-lg text-[#32201c]">Âm thanh</span>
          <div className="relative">
            <input type="checkbox" className="sr-only" defaultChecked />
            <div className="w-12 h-7 bg-[#ff8c94] rounded-full shadow-inner">
              <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-6 translate-y-1 transition-transform"></div>
            </div>
          </div>
        </div>

        {/* Vibration */}
        <div className="flex items-center justify-between">
          <span className="text-lg text-[#32201c]">Rung</span>
          <div className="relative">
            <input type="checkbox" className="sr-only" defaultChecked />
            <div className="w-12 h-7 bg-[#ff8c94] rounded-full shadow-inner">
              <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-6 translate-y-1 transition-transform"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
