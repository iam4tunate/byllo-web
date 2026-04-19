"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  className,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Create an array of length 6, padded with spaces
  const digits = value.padEnd(length, " ").split("").slice(0, length);

  const focusAt = (index: number) => {
    const clamped = Math.max(0, Math.min(length - 1, index));
    inputRefs.current[clamped]?.focus();
  };

  const handleChange = (index: number, char: string) => {
    // Accept only digits
    const digit = char.replace(/\D/g, "").slice(-1);
    const next = digits.slice();
    next[index] = digit || " ";
    onChange(next.join("").trimEnd());
    if (digit && index < length - 1) focusAt(index + 1);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = digits.slice();
      
      if (digits[index] !== " ") {
        // If current box has a value, clear it
        next[index] = " ";
        onChange(next.join("").trimEnd());
      } else if (index > 0) {
        // If current box is empty, move to previous AND clear it
        next[index - 1] = " ";
        onChange(next.join("").trimEnd());
        focusAt(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusAt(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusAt(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    // Focus last filled box
    const nextIndex = Math.min(pasted.length, length - 1);
    setTimeout(() => focusAt(nextIndex), 0);
  };

  return (
    <div className={cn("flex items-center gap-3 justify-center", className)}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit === " " ? "" : digit}
          disabled={disabled}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "w-12 h-14 rounded-lg border bg-surface-input text-center text-xl font-bold text-ink border-surface-border",
            "focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand",
            "disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150",
            "caret-transparent",
            digit ? "border-brand/50 bg-brand/5" : "",
          )}
        />
      ))}
    </div>
  );
}
