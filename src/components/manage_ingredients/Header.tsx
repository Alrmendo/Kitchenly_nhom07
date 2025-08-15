import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Header(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div className="flex items-center border-b border-gray-100 bg-white px-4 py-3">
      <button onClick={() => navigate(-1)}>
        <ArrowLeft className="h-6 w-6 text-gray-600" />
      </button>
      <h1 className="flex-1 -translate-x-2 text-center text-lg font-semibold">Quản lý nguyên liệu</h1>
    </div>
  );
}
