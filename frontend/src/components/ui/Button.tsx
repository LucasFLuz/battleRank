import React, { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-emerald-700 text-white shadow-lg shadow-brand-500/20 hover:bg-emerald-800 focus-visible:ring-emerald-300",
    secondary: "bg-dark-700 text-slate-100 hover:bg-dark-600 focus-visible:ring-slate-400",
    outline: "border border-slate-500 text-slate-300 hover:bg-dark-800 focus-visible:ring-brand-400",
    ghost: "text-slate-300 hover:bg-dark-800 hover:text-white focus-visible:ring-slate-400",
    danger: "bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-2.5 text-base gap-2.5",
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
};
