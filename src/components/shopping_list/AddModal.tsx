import React from "react";
import { ChevronLeft } from "lucide-react";
import { guessImageForName, toISO } from "./data";
import type { Item } from "./data";

export default function AddModal({
  open,
  onClose,
  onAddManual,
  onUpdateManual,
  defaultDate,
  mode = "add",
  itemToEdit,
}: {
  open: boolean;
  onClose: () => void;
  onAddManual: (payload: { name: string; qty: string; img?: string; date: string; note?: string }) => void;
  onUpdateManual: (payload: { id: string; name: string; qty: string; img?: string; date: string; note?: string }) => void;
  defaultDate: Date;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  mode?: "add" | "edit";
  itemToEdit?: Item | null;
}) {
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [note, setNote] = React.useState("");
  const [date, setDate] = React.useState<string>(toISO(defaultDate));

  const isEdit = mode === "edit";
  const title = isEdit ? "Chỉnh sửa" : "Thêm sản phẩm";
  const ctaText = isEdit ? "Lưu" : "Thêm";

  React.useEffect(() => {
    if (open) {
      const parseQty = (qText?: string) => {
        if (!qText) return { quantity: "", unit: "" };
        const m = qText.match(/^\s*(\S+)\s*(.*)$/);
        if (!m) return { quantity: qText, unit: "" };
        return { quantity: m[1] ?? "", unit: (m[2] ?? "").trim() };
      };

      if (isEdit && itemToEdit) {
        const parsed = parseQty(itemToEdit.qty);
        setName(itemToEdit.name);
        setQuantity(parsed.quantity);
        setUnit(parsed.unit);
        setNote(itemToEdit.note ?? "");
        setDate(itemToEdit.date ?? toISO(defaultDate));
      } else {
        setName("");
        setQuantity("");
        setUnit("");
        setNote("");
        setDate(toISO(defaultDate));
      }
    }
  }, [open, defaultDate, isEdit, itemToEdit]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="px-5 pt-4 pb-2 grid grid-cols-3 items-center">
        <div className="flex items-center">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 -ml-2" aria-label="Đóng">
            <ChevronLeft size={18} />
          </button>
        </div>
        <div className="text-center text-base font-semibold">{title}</div>
        <div className="flex items-center justify-end">
          <button
            disabled={!name.trim() || !quantity.trim() || !date}
            onClick={() => {
              if (!name.trim() || !quantity.trim() || !date) return;
              const qtyText = unit.trim() ? `${quantity.trim()} ${unit.trim()}` : quantity.trim();
              const autoImg = guessImageForName(name.trim());
              if (isEdit && itemToEdit) {
                onUpdateManual({
                  id: itemToEdit.id,
                  name: name.trim(),
                  qty: qtyText,
                  img: autoImg ?? itemToEdit.img,
                  date,
                  note: note.trim() || undefined,
                });
              } else {
                onAddManual({ name: name.trim(), qty: qtyText, img: autoImg, date, note: note.trim() || undefined });
              }
              onClose();
            }}
            className="px-3 py-1.5 text-sm font-semibold rounded-xl bg-rose-500 text-white disabled:opacity-50"
          >
            {ctaText}
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto pb-24 bg-[#F7F8FA]">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-2xl px-3 py-3 text-sm shadow-sm bg-white placeholder:text-gray-400"
                placeholder="Tên sản phẩm"
              />
            </div>
            <div className="h-12 w-12 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
              {guessImageForName(name) ? (
                <img src={guessImageForName(name)!} alt="preview" className="h-full w-full object-cover" />
              ) : (
                <div className="text-[10px] text-gray-500">Ảnh</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border rounded-2xl px-3 py-3 text-sm shadow-sm bg-white placeholder:text-gray-400"
              placeholder="Số lượng"
            />
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full border rounded-2xl px-3 py-3 text-sm shadow-sm bg-white placeholder:text-gray-400"
              placeholder="Đơn vị"
            />
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border rounded-2xl px-3 py-3 text-sm shadow-sm bg-white min-h-[120px] placeholder:text-gray-400"
            placeholder="Ghi chú"
          />

          <input type="hidden" value={date} readOnly />
        </div>
      </div>
    </div>
  );
}
