import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
  size?: "default" | "icon";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    icon: "h-10 w-10",
  };

  const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className].join(" ");

  return (
    <button className={classes} ref={ref} {...props}>
      {children}
    </button>
  );
});

Button.displayName = "Button";
