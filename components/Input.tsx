import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-ink"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-12 w-full rounded-lg border bg-surface-input px-4 text-[14px] text-ink placeholder:text-ink-tertiary border-surface-border",
            "focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand",
            "disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            className,
          )}
          {...props}
        />
        {hint && (
          <p className="text-[12px] font-medium text-ink-tertiary">{hint}</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
