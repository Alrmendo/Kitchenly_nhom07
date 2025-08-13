import * as React from "react";

// The InputProps interface extends the standard HTML input attributes,
// allowing all native properties like 'value', 'onChange', etc. to be used.
// It also explicitly defines custom props like 'className'.
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// The Input component is a reusable text input field with a consistent style.
// It uses React.forwardRef to pass a ref to the underlying DOM element,
// which is useful for form management and focus handling.
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        // className combines default styles with any custom styles passed in.
        // Tailwind CSS classes are used for a clean, responsive design.
        className={`
          flex h-10 w-full rounded-md border
          border-input bg-background px-3 py-2 text-sm ring-offset-background
          file:border-0 file:bg-transparent file:text-sm file:font-medium
          placeholder:text-muted-foreground
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

// A descriptive name for the component, useful for debugging.
Input.displayName = "Input";

export default Input;
