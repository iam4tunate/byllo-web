import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold",
  {
    variants: {
      variant: {
        default:     "border-transparent bg-dark text-white",
        secondary:   "border-transparent bg-surface-input text-ink-secondary",
        destructive: "border-transparent bg-danger text-white",
        outline:     "border-surface-border bg-transparent text-ink-secondary",
        // ── Semantic ──────────────────────
        brand:   "border-transparent bg-brand-muted text-brand",
        success: "border-transparent bg-accent text-accent-text",
        warning: "border-transparent bg-warning-light text-warning-text",
        danger:  "border-transparent bg-danger-light text-danger-text",
        open:    "border-transparent bg-warning-light text-warning-text",
        paid:    "border-transparent bg-accent text-accent-text",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
