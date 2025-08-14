import { ArrowLeft, Camera, Mic } from "lucide-react";

export interface HeaderProps {
  onBack?: () => void;
}

export function Header({ onBack }: HeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
      <button className="mr-2" onClick={onBack}>
        <ArrowLeft className="h-6 w-6 text-gray-600" />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold">Thêm nguyên liệu</h1>
      <div className="flex gap-2">
        <button className="p-2">
          <Mic className="h-6 w-6 text-gray-600" />
        </button>
        <button className="p-2">
          <Camera className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
