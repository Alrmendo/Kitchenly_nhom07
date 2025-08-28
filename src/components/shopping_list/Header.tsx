import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Header(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div className="flex items-center border-b border-[#ff8c94]/20 bg-white px-4 py-3">
      <button onClick={() => navigate("/home")} aria-label="Về trang chủ">
        <ArrowLeft className="h-6 w-6 text-[#ff8c94]" />
      </button>
      <h1 className="flex-1 -translate-x-2 text-center text-lg font-semibold text-[#32201c]">Danh sách mua sắm</h1>
    </div>
  );
}
