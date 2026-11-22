import { SelectHTMLAttributes, forwardRef, useId } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectOptionGroup {
  label: string;
  options: readonly SelectOption[];
}

export type SelectOptions = readonly (SelectOption | SelectOptionGroup)[];

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOptions;
  placeholder?: string;
}

const isOptionGroup = (opt: SelectOption | SelectOptionGroup): opt is SelectOptionGroup => {
  return "options" in opt;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      placeholder,
      className,
      id,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const errorId = `${selectId}-error`;
    const describedBy = [ariaDescribedBy, error ? errorId : undefined].filter(Boolean).join(" ");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wide text-slate-300"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          aria-invalid={error ? true : ariaInvalid}
          aria-describedby={describedBy || undefined}
          className={twMerge(
            clsx(
              "w-full rounded-lg border border-slate-500 bg-dark-850 px-3.5 py-2.5 text-sm text-slate-100",
              "transition-colors focus-visible:border-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
              error && "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400",
              className
            )
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-dark-850 text-slate-400">
              {placeholder}
            </option>
          )}
          {options.map((opt, _idx) => {
            if (isOptionGroup(opt)) {
              return (
                <optgroup key={opt.label} label={opt.label}>
                  {opt.options.map((option) => (
                    <option key={option.value} value={option.value} className="bg-dark-850 text-slate-100">
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              );
            }
            return (
              <option key={opt.value} value={opt.value} className="bg-dark-850 text-slate-100">
                {opt.label}
              </option>
            );
          })}
        </select>
        {error && (
          <p id={errorId} className="text-xs font-medium text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
