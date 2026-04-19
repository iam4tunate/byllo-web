import { cn } from "@/lib/utils";
import React from "react";

// ── Card ────────────────────────────────────────────────────────────
function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-surface flex flex-col rounded-xl border border-surface-border overflow-hidden shadow-xs",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── CardHeader ──────────────────────────────────────────────────────
function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-5 pt-5 pb-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── CardTitle ───────────────────────────────────────────────────────
function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-bold text-[16px] text-ink", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

// ── CardDescription ─────────────────────────────────────────────────
function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-ink-tertiary font-medium text-[12px]", className)}
      {...props}
    >
      {children}
    </p>
  );
}

// ── CardContent ─────────────────────────────────────────────────────
function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 pb-5", className)} {...props}>
      {children}
    </div>
  );
}

// ── CardFooter ──────────────────────────────────────────────────────
function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center px-5 pb-5 pt-4 border-t border-surface-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── CardDivider ─────────────────────────────────────────────────────
function CardDivider({ className }: { className?: string }) {
  return <hr className={cn("border-0 h-px bg-surface-border mx-5", className)} />;
}

export {
  Card,
  CardContent,
  CardDescription,
  CardDivider,
  CardFooter,
  CardHeader,
  CardTitle,
};
