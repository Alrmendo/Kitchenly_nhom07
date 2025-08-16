import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/use-auth"
import {
  Bell,
  Headphones,
  Shield,
  Globe,
  Moon,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { BottomNavigation } from "../shared/BottomNavigation"

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("me");
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSettingClick = (label: string) => {
    switch (label) {
      case "Thông báo":
        navigate("/settings/notifications");
        break;
      case "Trợ giúp":
        navigate("/settings/help");
        break;
      case "Thoát":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    // Use auth context to logout
    logout();
    
    // Navigate to welcome page
    navigate("/");
  };



  const settingsItems = [
    { icon: Bell, label: "Thông báo", hasChevron: true },
    { icon: Headphones, label: "Trợ giúp", hasChevron: true },
    { icon: Shield, label: "Chính sách bảo mật", hasChevron: true },
    { icon: Globe, label: "Ngôn ngữ", hasChevron: true },
    { icon: Moon, label: "Chế độ tối", hasChevron: false },
    { icon: LogOut, label: "Thoát", hasChevron: false },
  ]

  return (
    <div className="min-h-screen bg-[#fffdf9] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        {/* Header */}
        <h1 className="text-2xl font-medium text-[#ff8c94] text-center mb-12">Cài đặt</h1>

        {/* Settings List */}
        <div className="space-y-6">
          {settingsItems.map((item, index) => (
            <button 
              key={index} 
              className="flex items-center justify-between w-full"
              onClick={() => handleSettingClick(item.label)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#ff8c94] rounded-full flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg text-[#32201c] font-medium">{item.label}</span>
              </div>
              {item.hasChevron && <ChevronRight className="w-6 h-6 text-[#ff8c94]" />}
            </button>
          ))}
        </div>

        {/* Delete Account */}
        <div className="mt-12">
          <button className="text-[#ff8c94] text-lg font-medium">Xóa tài khoản</button>
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
