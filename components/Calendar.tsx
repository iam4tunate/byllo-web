import React, { useState } from "react";
import { ChevronLeft, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper functions for date manipulation
const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Convert Sunday(0) to 6, Monday(1) to 0, etc. (Mon-Sun starting)
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  minDate?: Date; // Optional, to disable past dates based on a certain date
}

export function Calendar({
  value,
  onChange,
  className,
  minDate,
}: CalendarProps) {
  // State
  const [view, setView] = useState<"date" | "year">("date");
  const [viewDate, setViewDate] = useState(value || new Date());

  // For the year view, pagination (20 years per page)
  const [yearPageStart, setYearPageStart] = useState(
    Math.floor((value || new Date()).getFullYear() / 20) * 20,
  );

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const handlePrevMonth = () =>
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  const handleNextMonth = () =>
    setViewDate(new Date(viewYear, viewMonth + 1, 1));

  const handlePrevYearPage = () => setYearPageStart((prev) => prev - 20);
  const handleNextYearPage = () => setYearPageStart((prev) => prev + 20);

  // Date view variables
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const daysInPrevMonth = getDaysInMonth(viewYear, viewMonth - 1);
  const prevMonthDays = Array.from(
    { length: firstDay },
    (_, i) => daysInPrevMonth - firstDay + i + 1,
  );
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Today
  const today = new Date();

  const isToday = (d: number) => {
    return (
      today.getDate() === d &&
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear
    );
  };

  const isSelected = (d: number) => {
    if (!value) return false;
    return (
      value.getDate() === d &&
      value.getMonth() === viewMonth &&
      value.getFullYear() === viewYear
    );
  };

  const isBeforeMinDate = (y: number, m: number, d: number) => {
    if (!minDate) return false;
    const check = new Date(y, m, d, 0, 0, 0, 0);
    const min = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate(),
      0,
      0,
      0,
      0,
    );
    return check < min;
  };

  const handleSelectDay = (day: number) => {
    if (isBeforeMinDate(viewYear, viewMonth, day)) return;
    const newDate = new Date(viewYear, viewMonth, day);
    onChange?.(newDate);
  };

  // ---------------------------------------------------------------------------
  // Render Date View
  // ---------------------------------------------------------------------------
  if (view === "date") {
    return (
      <div
        className={cn(
          "w-[320px] h-fit bg-white rounded-xl p-5 shadow-sm border border-primary font-sans select-none",
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-8 h-8 flex items-center justify-center text-accent-text hover:bg-surface-raised rounded-full transition-colors"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => {
              setYearPageStart(Math.floor(viewYear / 20) * 20);
              setView("year");
            }}
            className="flex items-center gap-1.5 text-[15px] font-bold text-foreground hover:opacity-80 transition-opacity pb-[2px] leading-none"
          >
            {MONTH_NAMES[viewMonth]} {viewYear}
            <ChevronDown size={16} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-8 h-8 flex items-center justify-center text-accent-text hover:bg-surface-raised rounded-full transition-colors"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 mb-4">
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className="text-center text-[13px] font-medium text-primary"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-x-1">
          {/* Previous Month */}
          {prevMonthDays.map((d) => (
            <div key={`prev-${d}`} className="h-10" />
          ))}

          {/* Current Month */}
          {currentMonthDays.map((d) => {
            const disabled = isBeforeMinDate(viewYear, viewMonth, d);
            const selected = isSelected(d);
            const todaySelected = isToday(d);

            return (
              <button
                type="button"
                key={`curr-${d}`}
                onClick={() => handleSelectDay(d)}
                disabled={disabled}
                className={cn(
                  "h-8 w-8 mx-auto flex items-center justify-center rounded-full text-[15px] transition-all relative",
                  selected
                    ? "bg-brand text-white font-bold shadow-sm"
                    : disabled
                      ? "text-muted opacity-40 font-medium cursor-not-allowed"
                      : "text-primary font-medium hover:bg-surface-raised",
                )}
              >
                {d}
                {todaySelected && !selected && (
                  <div className="absolute bottom-1.5 w-4 h-[2px] bg-brand rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render Year View
  // ---------------------------------------------------------------------------
  const years = Array.from({ length: 20 }, (_, i) => yearPageStart + i);

  return (
    <div
      className={cn(
        "w-[320px] bg-white rounded-[24px] p-5 shadow-sm border border-surface-border font-sans select-none",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={handlePrevYearPage}
          className="w-8 h-8 flex items-center justify-center text-accent-text hover:bg-surface-raised rounded-full transition-colors"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onClick={handleNextYearPage}
          className="w-8 h-8 flex items-center justify-center text-accent-text hover:bg-surface-raised rounded-full transition-colors"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Year Grid */}
      <div className="grid grid-cols-4 gap-y-6 gap-x-2 pb-6">
        {years.map((y) => {
          // Highlight current selected value's year, or viewYear if value isn't purely determined yet
          const selected =
            value?.getFullYear() === y || (!value && viewYear === y);
          // Disable years if they are before the strictly defined minDate or just generally in the past
          const disabled = (minDate && y < minDate.getFullYear()) || y < today.getFullYear();

          return (
            <button
              type="button"
              key={y}
              disabled={disabled}
              onClick={() => {
                setViewDate(new Date(y, viewMonth, 1));
                setView("date"); // Switch back to date view on year select
              }}
              className={cn(
                "h-11 rounded-xl flex items-center justify-center text-[15px] transition-colors mx-1",
                selected
                  ? "bg-accent-text text-accent font-bold shadow-sm"
                  : disabled
                    ? "text-muted opacity-40 font-medium cursor-not-allowed"
                    : "text-primary font-medium hover:bg-surface-raised",
              )}
            >
              {y}
            </button>
          );
        })}
      </div>
    </div>
  );
}
