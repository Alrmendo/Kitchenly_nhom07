
import { Plus } from "lucide-react";

export default function FloatingAdd({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed right-4 top-[128px] z-30 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF8C94] text-white shadow-xl active:scale-95 transition"
      aria-label="Thêm sản phẩm"
    >
      <Plus size={22} />
    </button>
  );
}
