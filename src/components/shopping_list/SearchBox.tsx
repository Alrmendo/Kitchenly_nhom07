import { Calendar, Search, X } from "lucide-react";

export default function SearchBox({
  value,
  onChange,
  onOpenCalendar,
  displayRange,
}: {
  value: string;
  onChange: (value: string) => void;
  onOpenCalendar: () => void;
  displayRange: () => string;
}) {
  return (
    <div className="flex items-center gap-2 mx-4 h-14 pb-3">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm mt-2.5">
        <Search size={18} className="shrink-0 text-gray-500" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tìm kiếm sản phẩm"
          className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
        />
        {value && (
          <button onClick={() => onChange("")} className="rounded-full p-1 hover:bg-rose-200" aria-label="Xoá">
            <X size={16} className="text-gray-500" />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onOpenCalendar}
        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition mt-2.5"
      >
        <Calendar size={16} className="text-[#FF8C94]" />
        <span className="text-sm font-semibold text-gray-700">{displayRange()}</span>
      </button>
    </div>
  );
}
