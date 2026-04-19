import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

// ── Avatar root ──────────────────────────────────────────────────────
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── AvatarImage ──────────────────────────────────────────────────────
interface AvatarImageProps {
  src: string;
  alt?: string;
  className?: string;
}

function AvatarImage({ src, alt = "", className }: AvatarImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("object-cover", className)}
    />
  );
}

// ── AvatarFallback ───────────────────────────────────────────────────
interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-surface-input",
        className,
      )}
      {...props}
    >
      <span className="text-ink font-semibold text-sm">{children}</span>
    </div>
  );
}

export { Avatar, AvatarFallback, AvatarImage };
