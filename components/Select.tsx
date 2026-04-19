import { cn } from "@/lib/utils";
import React from "react";

/**
 * Select — styled <select> wrapping matching the mobile DropdownMenu style.
 */

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, id, children, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={selectId} className="text-sm font-semibold text-ink">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "h-12 w-full appearance-none rounded-xl border bg-surface-input pl-4 pr-10 text-[14px] text-ink",
              "focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand",
              "disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
              error
                ? "border-danger focus:ring-danger"
                : "border-surface-border",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          {/* chevron */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-tertiary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        {error && <p className="text-[12px] font-medium text-danger-text">{error}</p>}
        {hint && !error && <p className="text-[12px] font-medium text-ink-tertiary">{hint}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select };
