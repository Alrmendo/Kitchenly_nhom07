import React from "react";
import { guessImageForName, toISO } from "./data";

export type ItemFormValues = {
  name: string;
  quantity: string;
  unit: string;
  note: string;
  date: string; //yyyy-mm-dd
};

export function parseQty(qText?: string) {
  if (!qText) return { quantity: "", unit: "" };
  const m = qText.match(/^\s*(\S+)\s*(.*)$/);
  if (!m) return { quantity: qText, unit: "" };
  return { quantity: m[1] ?? "", unit: (m[2] ?? "").trim() };
}

export default function ItemForm({
  initial,
  onSubmit,
  formId,
}: {
  initial?: Partial<ItemFormValues>;
  onSubmit: (v: ItemFormValues & { img?: string }) => void;
  formId?: string;
}) {
  const [name, setName] = React.useState(initial?.name ?? "");
  const [quantity, setQuantity] = React.useState(initial?.quantity ?? "");
  const [unit, setUnit] = React.useState(initial?.unit ?? "");
  const [note, setNote] = React.useState(initial?.note ?? "");
  const [date, setDate] = React.useState(initial?.date ?? toISO(new Date()));

  const canSubmit = name.trim() && quantity.trim() && date;

  return (
    <form
      id={formId}
      className="p-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        const img = guessImageForName(name.trim());
        onSubmit({
          name: name.trim(),
          quantity: quantity.trim(),
          unit: unit.trim(),
          note: note.trim(),
          date,
          img,
        });
      }}
    >
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

      <div className="grid grid-cols-2 gap-3">
        <div className="text-sm text-gray-600">Ngày</div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-2xl px-3 py-2 text-sm shadow-sm bg-white"
        />
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border rounded-2xl px-3 py-3 text-sm shadow-sm bg-white min-h-[120px] placeholder:text-gray-400"
        placeholder="Ghi chú"
      />

      
    </form>
  );
}
