import { createContext, useContext, useState } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';

// Define the shape of the context's state and functions.
interface SelectContextType {
    value: string | undefined;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleValueChange: (newValue: string) => void;
}

// Create a context with an initial undefined value.
const SelectContext = createContext<SelectContextType | undefined>(undefined);

// A custom hook to use the Select context and ensure it's not undefined.
function useSelectContext() {
    const context = useContext(SelectContext);
    if (context === undefined) {
        throw new Error('useSelectContext must be used within a SelectProvider');
    }
    return context;
}

// 1. The main Select component that holds the state
interface SelectProps {
    children: ReactNode;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    value?: string;
}

export function Select({ children, defaultValue, onValueChange, value: controlledValue }: SelectProps) {
    const [value, setValue] = useState<string | undefined>(defaultValue);
    const [isOpen, setIsOpen] = useState(false);

    // Use controlled value if provided
    const actualValue = controlledValue !== undefined ? controlledValue : value;

    const handleValueChange = (newValue: string) => {
        if (controlledValue === undefined) {
            setValue(newValue);
        }
        setIsOpen(false);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <SelectContext.Provider value={{ value: actualValue, isOpen, setIsOpen, handleValueChange }}>
            <div className="relative inline-block w-full max-w-sm">
                {children}
            </div>
        </SelectContext.Provider>
    );
}

// 2. The trigger component, a button that opens/closes the dropdown.
interface SelectTriggerProps {
    children: ReactNode;
    className?: string;
}

export function SelectTrigger({ children, className }: SelectTriggerProps) {
    const { setIsOpen } = useSelectContext();

    const handleTriggerClick = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <button
            onClick={handleTriggerClick}
            className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:focus:ring-gray-300 [&>span]:line-clamp-1 ${className}`}
        >
            {children}
            {/* Simple chevron icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4 shrink-0 opacity-50"
            >
                <polyline points="6 9 12 15 18 9" />
            </svg>
        </button>
    );
}

// 3. The component to display the currently selected value.
interface SelectValueProps {
    placeholder: string;
}

export function SelectValue({ placeholder }: SelectValueProps) {
    const { value } = useSelectContext();

    return (
        <span>{value || placeholder}</span>
    );
}

// 4. The container for the select items.
interface SelectContentProps {
    children: ReactNode;
}

export function SelectContent({ children }: SelectContentProps) {
    const { isOpen } = useSelectContext();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md animate-in fade-in-80 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
            {children}
        </div>
    );
}

// 5. The individual selectable items.
interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    value: string;
}

export function SelectItem({ children, value, ...props }: SelectItemProps) {
    const { handleValueChange, value: selectedValue } = useSelectContext();
    const isSelected = selectedValue === value;

    const handleItemClick = () => {
        handleValueChange(value);
    };

    return (
        <div
            onClick={handleItemClick}
            role="option"
            aria-selected={isSelected}
            className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 ${isSelected ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            {...props}
        >
            {children}
            {/* Checkmark icon for selected item */}
            {isSelected && (
                <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </span>
            )}
        </div>
    );
}