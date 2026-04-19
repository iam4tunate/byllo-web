"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, CalendarProps } from "./Calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps extends Omit<CalendarProps, "value" | "onChange"> {
  value?: Date;
  onChange?: (date: Date) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = "Select a date",
  disabled,
  readOnly,
  minDate,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const formattedDate = value
    ? value.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className={cn("relative flex flex-col gap-1.5 w-full", className)} ref={containerRef}>
      {label && (
        <label className="text-sm font-semibold text-ink">
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!readOnly && !disabled) {
            setIsOpen(!isOpen);
          }
        }}
        className={cn(
          "h-12 w-full rounded-lg border bg-surface-input flex items-center justify-between px-4 text-[14px] transition-colors focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand",
          disabled ? "opacity-50 cursor-not-allowed border-surface-border bg-surface-input text-ink-tertiary" : "border-surface-border text-ink hover:border-brand/40",
          readOnly && !disabled ? "cursor-not-allowed opacity-60" : (!disabled ? "cursor-pointer" : "")
        )}
      >
        <span className={value ? "text-ink font-medium" : "text-ink-tertiary font-medium"}>
          {formattedDate || placeholder}
        </span>
        <CalendarIcon size={16} className={disabled ? "text-ink-tertiary/50" : "text-ink-tertiary"} />
      </button>

      {isOpen && !readOnly && !disabled && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50">
          <Calendar
            value={value}
            onChange={(date) => {
              onChange?.(date);
              setIsOpen(false);
            }}
            minDate={minDate}
            className="shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
