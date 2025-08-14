import { Home, Lightbulb, Refrigerator, ShoppingCart, User } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type NavItem = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isCenter?: boolean;
  path: string;
};

export interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  navItems?: NavItem[];
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: "fridge", icon: Refrigerator, label: "Tủ lạnh", path: "/manage-ingredients" },
  { id: "suggest", icon: Lightbulb, label: "Đề xuất", path: "/suggest" },
  { id: "home", icon: Home, label: "", isCenter: true, path: "/" },
  { id: "shop", icon: ShoppingCart, label: "Mua sắm", path: "/shop" },
  { id: "me", icon: User, label: "Tôi", path: "/me" },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange, navItems = DEFAULT_NAV_ITEMS }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab: NavItem) => {
    onTabChange(tab.id);
    navigate(tab.path);
  };

  // Determine active tab based on current route
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const currentNavItem = navItems.find((item) => item.path === currentPath);
    return currentNavItem?.id || activeTab;
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 bg-[#ff8c94] px-6 py-2">
      <div className="flex items-end justify-around">
        {navItems.map((tab) => {
          const isActive = getCurrentTab() === tab.id;
          return (
            <button key={tab.id} onClick={() => handleTabClick(tab)} className={`relative flex flex-col items-center gap-1 ${tab.isCenter ? "-mt-8" : ""}`}>
              {tab.isCenter ? (
                <div className="rounded-full border-1 border-[#ff8c94] bg-white p-4 shadow-lg">
                  <tab.icon className="h-7 w-7 text-[#ff8c94]" />
                </div>
              ) : (
                <>
                  <tab.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-white/70"}`} />
                  {tab.label && <span className={`text-xs ${isActive ? "text-white" : "text-white/70"}`}>{tab.label}</span>}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
