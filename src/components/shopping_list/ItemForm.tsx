import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as RDRCalendar } from "react-date-range";
import vi from "date-fns/locale/vi";
import { guessImageForName, toISO, toDate } from "./data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export type ItemFormValues = {
  name: string;
  quantity: string;
  unit: string;
  note: string;
  date: string; // yyyy-mm-dd
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
  const [openCal, setOpenCal] = React.useState(false);

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
      {/* Tên + ảnh */}
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

      {/* Số lượng + đơn vị */}
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

      <div className="mt-2">
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setOpenCal((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2
                       text-sm shadow-sm hover:shadow transition"
          >
            <CalendarIcon className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">
              {(toDate(date) ?? new Date()).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </button>

          {openCal && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpenCal(false)} />
              <div
                className="absolute left-0 mt-2 z-50 rounded-2xl border border-gray-200 bg-white
                           shadow-xl overflow-hidden"
              >
                <RDRCalendar
                  date={toDate(date) ?? new Date()}
                  onChange={(d: any) => {
                    const picked = Array.isArray(d) ? d[0] : (d as Date);
                    setDate(toISO(picked));
                    setOpenCal(false);
                  }}
                  locale={vi}
                  className="!p-2"
                  color="#FF8C94"
                />
              </div>
            </>
          )}
        </div>
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
