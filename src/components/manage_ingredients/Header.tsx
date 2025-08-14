import { ArrowLeft } from "lucide-react";
import React from "react";

export interface HeaderProps {
  onBack?: () => void;
}

export function Header({ onBack }: HeaderProps): React.ReactElement {
  return (
    <div className="flex items-center border-b border-gray-100 bg-white px-4 py-3">
      <button className="mr-2" onClick={onBack}>
        <ArrowLeft className="h-6 w-6 text-gray-600" />
      </button>
      <h1 className="flex-1 -translate-x-2 text-center text-lg font-semibold">Quản lý nguyên liệu</h1>
    </div>
  );
}
