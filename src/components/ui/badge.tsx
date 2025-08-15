import React from 'react';

// Define the available variants and sizes for the badge
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';

// Define the props interface for the Badge component
interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string; // Optional className for additional styling
  onClick?: (...props: any[]) => void; // Optional click handler
}

const Badge = ({ variant = 'default', size = 'md', children, className, onClick }: BadgeProps) => {
  // Define base classes for all badges
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200';

  // Define size-specific classes
  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  // Define variant-specific classes (colors)
  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
    primary: 'bg-blue-600 text-white dark:bg-blue-500',
    success: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    error: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
  };

  // Combine all classes based on props
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return <span className={classes} onClick={onClick}>{children}</span>;
};

export default Badge;