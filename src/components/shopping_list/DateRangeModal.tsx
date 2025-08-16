import React from "react";
import { DateRange } from "react-date-range";
import type { Range, RangeKeyDict } from "react-date-range";
import vi from "date-fns/locale/vi";
import { startOfDay, addDays, getThisMonthRange } from "./data";
import "react-date-range/dist/styles.css";       
import "react-date-range/dist/theme/default.css";

function QuickButton({ label, onClick, variant = "solid" }: { label: string; onClick: () => void; variant?: "solid" | "ghost" }) {
  return (
    <button
      onClick={onClick}
      className={
        variant === "ghost"
          ? "px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
          : "px-3 py-1.5 text-xs font-semibold rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200"
      }
    >
      {label}
    </button>
  );
}

export default function DateRangeModal({
  open, onClose, value, onApply
}: {
  open: boolean;
  onClose: () => void;
  value: { startDate?: Date; endDate?: Date };
  onApply: (value: { startDate: Date; endDate: Date }) => void;
}) {
  const [sel, setSel] = React.useState<Range[]>([
    { startDate: value?.startDate ?? undefined, endDate: value?.endDate ?? undefined, key: "selection" },
  ]);

  React.useEffect(() => {
    if (open) {
      setSel([{ startDate: value?.startDate ?? undefined, endDate: value?.endDate ?? undefined, key: "selection" }]);
    }
  }, [open, value]);

  if (!open) return null;

  const startDate = sel[0]?.startDate;
  const endDate   = sel[0]?.endDate;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-[92%] max-w-[420px] rounded-3xl bg-white shadow-xl overflow-hidden">
        <div className="px-5 pt-4 pb-2 text-center text-base font-semibold">Chọn khoảng ngày</div>

        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2 pb-3 justify-center">
            <QuickButton label="Hôm nay" onClick={() => {
              const t = startOfDay(new Date());
              setSel([{ startDate: t, endDate: t, key: "selection" }]);
            }} />
            <QuickButton label="3 ngày" onClick={() => {
              const t = startOfDay(new Date());
              const e = addDays(t, 2);
              setSel([{ startDate: t, endDate: e, key: "selection" }]);
            }} />
            <QuickButton label="7 ngày" onClick={() => {
              const t = startOfDay(new Date());
              const e = addDays(t, 6);
              setSel([{ startDate: t, endDate: e, key: "selection" }]);
            }} />
            <QuickButton label="Tháng này" onClick={() => {
              const { start, end } = getThisMonthRange();
              setSel([{ startDate: start, endDate: end, key: "selection" }]);
            }} />
          </div>
          <div className="flex justify-center">
            <DateRange
              onChange={(item: RangeKeyDict) => setSel([item.selection as Range])}
              moveRangeOnFirstSelection={false}
              ranges={sel}
              months={1}
              direction="vertical"
              showDateDisplay={false}
              locale={vi}
              weekdayDisplayFormat="EEEEE"
              rangeColors={["#ff8c94"]}
              retainEndDateOnFirstSelection
              showPreview={false}
              className="mx-auto"
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg" onClick={onClose}>
            Hủy
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold rounded-xl text-white disabled:opacity-50
                      bg-[#FF8C94] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FF8C34]/40"
            disabled={!startDate || !endDate}
            onClick={() => { if (startDate && endDate) { onApply({ startDate, endDate }); } onClose(); }}
          >
            Lưu
          </button>

        </div>
        <style>{`
          .rdrCalendarWrapper .rdrInRange {
            background-color: rgba(255, 140, 148, 0.45) !important;
          }

          .rdrCalendarWrapper .rdrStartEdge,
          .rdrCalendarWrapper .rdrEndEdge,
          .rdrCalendarWrapper .rdrSelected {
            background-color: #FF8C94 !important;
          }

          .rdrCalendarWrapper .rdrStartEdge .rdrDayNumber span,
          .rdrCalendarWrapper .rdrEndEdge .rdrDayNumber span,
          .rdrCalendarWrapper .rdrSelected .rdrDayNumber span {
            color: #fff !important;
          }
        `}</style>
      </div>
    </div>
  );
}
