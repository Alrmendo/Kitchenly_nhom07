import React, { useState } from "react";

export interface SwitchProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  defaultChecked = false,
  checked,
  onCheckedChange,
  disabled = false,
  className = "",
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  const isChecked = checked !== undefined ? checked : internalChecked;
  
  const handleToggle = () => {
    if (disabled) return;
    
    if (checked === undefined) {
      setInternalChecked(!internalChecked);
    }
    
    onCheckedChange?.(checked !== undefined ? !checked : !internalChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleToggle}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${isChecked 
          ? "bg-[#ff8c94]" 
          : "bg-gray-200"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${isChecked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
};
