import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
    outline: 'border-2 border-primary text-primary hover:bg-primary-light',
    ghost: 'text-clinical-gray hover:bg-slate-100',
    danger: 'bg-danger text-white hover:bg-red-600',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-14 px-8 text-base',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-clinical-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

export const Card = ({ className, children, ...props }) => (
  <div className={cn('bg-white border border-clinical-border rounded-clinical shadow-clinical p-4', className)} {...props}>
    {children}
  </div>
);

export const Badge = ({ className, variant = 'mild', children, ...props }) => {
  const variants = {
    mild: 'bg-green-100 text-green-800 border-green-200',
    moderate: 'bg-amber-100 text-amber-800 border-amber-200',
    severe: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <span className={cn('badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors', variants[variant], className)} {...props}>
      {children}
    </span>
  );
};

export const Input = React.forwardRef(({ className, label, error, ...props }, ref) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-clinical-sm border border-clinical-border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all',
        error && 'border-danger focus-visible:ring-danger/20',
        className
      )}
      {...props}
    />
    {error && <span className="text-xs text-danger">{error}</span>}
  </div>
));
