import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = "", children, ...props }, ref) => {
  const classes = ["rounded-3xl border bg-card text-card-foreground shadow-sm", className].join(" ");

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

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className = "", children, ...props }, ref) => {
  const classes = ["flex flex-col space-y-1.5 p-6", className].join(" ");

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(({ className = "", children, ...props }, ref) => {
  const classes = ["text-2xl font-semibold leading-none tracking-tight", className].join(" ");

  return (
    <h3 ref={ref} className={classes} {...props}>
      {children}
    </h3>
  );
});

Card.displayName = "Card";
CardContent.displayName = "CardContent";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
