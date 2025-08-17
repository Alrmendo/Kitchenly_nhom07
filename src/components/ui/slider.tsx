import React, { useState, useRef, useCallback } from "react";

export interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue = [50],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const currentValue = value !== undefined ? value : internalValue;
  const currentSingleValue = currentValue[0];
  
  const percentage = ((currentSingleValue - min) / (max - min)) * 100;

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      const newValue = min + (percentage / 100) * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      
      if (value === undefined) {
        setInternalValue([clampedValue]);
      }
      
      onValueChange?.([clampedValue]);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const rect = sliderRef.current!.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((moveEvent.clientX - rect.left) / rect.width) * 100));
        const newValue = min + (percentage / 100) * (max - min);
        const steppedValue = Math.round(newValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, steppedValue));
        
        if (value === undefined) {
          setInternalValue([clampedValue]);
        }
        
        onValueChange?.([clampedValue]);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [disabled, min, max, step, value, onValueChange]
  );

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={sliderRef}
        className={`
          relative h-2 bg-gray-200 rounded-full cursor-pointer
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        onMouseDown={handleMouseDown}
      >
        {/* Progress track */}
        <div
          className="absolute h-2 bg-[#ff8c94] rounded-full"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Thumb */}
        <div
          className={`
            absolute top-1/2 w-5 h-5 bg-white border-2 border-[#ff8c94] rounded-full 
            transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-md
            ${disabled ? "cursor-not-allowed" : "hover:scale-110"}
            transition-transform
          `}
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
