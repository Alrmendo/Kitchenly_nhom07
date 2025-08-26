
import { CheckCircle2, Circle, Edit2 } from "lucide-react";
import type { Item } from "./data";

export default function ItemCard({ item, onToggle, onEdit }: {
  item: Item;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm ${
        item.checked ? "opacity-60 bg-gray-50" : ""
      }`}
    >
      <button onClick={() => onToggle(item.id)} className="p-1" aria-label="Toggle">
        {item.checked ? <CheckCircle2 size={22} /> : <Circle size={22} />}
      </button>

      {item.img ? (
        <img src={item.img} className="h-14 w-14 rounded-xl object-cover" alt={item.name} />
      ) : (
        <div className="h-14 w-14 rounded-xl bg-gray-200" />
      )}

      <div className="flex-1 min-w-0">
        <div className={`truncate text-[15px] font-semibold ${item.checked ? "text-gray-400" : ""}`}>{item.name}</div>
        <div className={`text-xs mt-0.5 ${item.checked ? "text-gray-400" : "text-gray-500"}`}>{item.qty} {item.unit}</div>
      </div>

      <button onClick={() => onEdit(item.id)} className="p-2 rounded-lg active:scale-95 transition" aria-label="Sửa">
        <Edit2 size={18} />
      </button>
    </div>
  );
}
