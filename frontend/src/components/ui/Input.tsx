import { InputHTMLAttributes, forwardRef, useId } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      id,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;
    const describedBy = [
      ariaDescribedBy,
      error ? errorId : helperText ? helperTextId : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wide text-slate-300"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={error ? true : ariaInvalid}
          aria-describedby={describedBy || undefined}
          className={twMerge(
            clsx(
              "w-full rounded-lg border border-slate-500 bg-dark-850 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-400",
              "transition-colors focus-visible:border-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
              error && "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400",
              className
            )
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-xs font-medium text-red-400">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperTextId} className="text-xs text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
