import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = "", children, ...props }, ref) => {
  const classes = ["rounded-lg border bg-card text-card-foreground shadow-sm", className].join(" ");

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className = "", children, ...props }, ref) => {
  const classes = ["p-6 pt-0", className].join(" ");

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Card.displayName = "Card";
CardContent.displayName = "CardContent";
