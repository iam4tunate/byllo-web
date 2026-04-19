import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:     "bg-brand text-white hover:bg-brand-dark",
        destructive: "bg-danger text-white hover:bg-danger-text",
        outline:     "border border-surface-border bg-surface text-ink hover:bg-surface-raised",
        secondary:   "bg-surface-input text-ink hover:bg-surface-border",
        ghost:       "bg-transparent text-ink hover:bg-surface-raised",
        link:        "bg-transparent text-brand underline-offset-4 hover:underline",
        accent:      "bg-accent text-accent-text hover:bg-accent-dark",
        dark:        "bg-dark text-white hover:bg-dark-card",
      },
      size: {
        default: "h-12 px-6 py-2 text-[15px]",
        sm:      "h-9  px-4      text-[13px]",
        lg:      "h-14 px-8      text-[16px]",
        icon:    "h-12 w-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Please wait...
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
