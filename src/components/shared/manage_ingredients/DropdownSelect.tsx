import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  className?: string;
}

export function DropdownSelect({ value, onChange, options, placeholder = "Chọn...", className = "" }: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left focus:border-[#ff8c94] focus:ring-2 focus:ring-[#ff8c94] focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}>
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>{selectedOption?.label || placeholder}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
