import { useState, useRef, useEffect } from "react";

const UNITS = ["kg", "g", "lít", "ml", "cái", "hộp", "chai", "quả", "trái"];

export default function UnitDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = UNITS.filter((u) =>
    u.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div ref={ref} className="relative w-full">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder="Đơn vị"
          className="w-full border rounded-2xl px-3 py-3 text-sm shadow-sm bg-white placeholder:text-gray-400"
      />

      {open && (
        <div className="absolute mt-1 w-full rounded-xl border bg-white shadow-lg z-50 max-h-48 overflow-auto">
          
          {filtered.map((u) => (
            <div
              key={u}
              onClick={() => {
                onChange(u);
                setOpen(false);
              }}
              className="px-3 py-2 text-sm hover:bg-rose-50 cursor-pointer"
            >
              {u}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
