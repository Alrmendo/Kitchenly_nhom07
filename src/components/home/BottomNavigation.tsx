import React from "react";
import { Home, ShoppingCart, Plus, Refrigerator, Lightbulb } from "lucide-react";

type NavItem = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isCenter?: boolean;
};

export interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  navItems?: NavItem[];
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: "fridge", icon: Refrigerator, label: "Tủ lạnh" },
  { id: "suggest", icon: Lightbulb, label: "Đề xuất" },
  { id: "home", icon: Home, label: "", isCenter: true },
  { id: "shop", icon: ShoppingCart, label: "Mua sắm" },
  { id: "more", icon: Plus, label: "Thêm" },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange, navItems = DEFAULT_NAV_ITEMS }) => {
  return (
    <div className="fixed right-0 bottom-0 left-0 bg-[#f8b64c] px-6 py-2">
      <div className="flex items-end justify-around">
        {navItems.map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => onTabChange(tab.id)} 
            className={`flex flex-col items-center gap-1 relative ${
              tab.isCenter ? "-mt-8" : ""
            }`}
          >
            {tab.isCenter ? (
              <div className="bg-white rounded-full p-4 shadow-lg border-1 border-[#f8b64c]">
                <tab.icon className="h-7 w-7 text-[#f8b64c]" />
              </div>
            ) : (
              <>
                <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "text-white" : "text-white/70"}`} />
                {tab.label && (
                  <span className={`text-xs ${activeTab === tab.id ? "text-white" : "text-white/70"}`}>
                    {tab.label}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
