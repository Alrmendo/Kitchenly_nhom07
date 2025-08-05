import React from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface HeaderProps {
  userName?: string;
  greeting?: string;
}

export const Header: React.FC<HeaderProps> = ({ userName = "Elsa", greeting = "Bạn muốn ăn gì hôm nay?" }) => {
  return (
    <div className="px-6 pt-12 pb-6">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-[#f8b64c]">Xin chào, {userName}!</h1>
          <p className="text-sm text-[#666666]">{greeting}</p>
        </div>
        <div className="flex gap-3">
          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-[#f8b64c]/20">
            <Bell className="h-5 w-5 text-[#f8b64c]" />
          </Button>
          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-[#f8b64c]/20">
            <Search className="h-5 w-5 text-[#f8b64c]" />
          </Button>
        </div>
      </div>
    </div>
  );
};
