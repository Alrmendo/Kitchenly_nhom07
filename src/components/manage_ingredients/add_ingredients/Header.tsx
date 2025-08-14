import { ArrowLeft, Camera, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
      <button onClick={() => navigate(-1)}>
        <ArrowLeft className="h-6 w-6 text-gray-600" />
      </button>
      <h1 className="translate-x-2 text-center text-lg font-semibold">Thêm nguyên liệu</h1>
      <div className="flex gap-5">
        <button>
          <Mic className="h-6 w-6 text-gray-600" />
        </button>
        <button>
          <Camera className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
