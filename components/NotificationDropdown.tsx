import { Check, AlertCircle, Users } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const unreadCount = 3;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-surface-input border border-surface-border rounded-lg flex items-center justify-center text-ink-tertiary hover:bg-surface-border hover:text-ink-secondary transition-colors relative focus:outline-none"
      >
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-brand ring-2 ring-surface-input" />
        )}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d0f14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-[340px] bg-surface rounded-xl shadow-xl shadow-brand/10 border border-surface-border overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="p-4 border-b border-surface-border bg-surface-raised flex items-center justify-between">
            <h3 className="font-bold text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-brand bg-brand/10 px-2 py-0.5 rounded-md">
                {unreadCount} Unread
              </span>
            )}
          </div>
          
          <div className="flex flex-col divide-y divide-surface-border max-h-[300px] overflow-y-auto">
            {/* Mock Item 1 */}
            <div className="p-4 hover:bg-surface-raised/50 transition-colors flex gap-3 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0 mt-0.5">
                <Check size={16} strokeWidth={3} />
              </div>
              <div>
                <p className="text-sm font-bold text-primary leading-tight mb-1">Invoice INV-00864 Paid</p>
                <p className="text-xs font-medium text-muted line-clamp-2 leading-relaxed">
                  Apple Inc. just paid their outstanding invoice of ₦1,967.50. The amount has been credited to your balance.
                </p>
                <p className="text-[10px] font-bold text-ink-tertiary mt-2 uppercase tracking-widest">
                  10 minutes ago
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-brand shrink-0 mt-2" />
            </div>

            {/* Mock Item 2 */}
            <div className="p-4 hover:bg-surface-raised/50 transition-colors flex gap-3 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-warning/10 flex items-center justify-center text-warning shrink-0 mt-0.5">
                <AlertCircle size={16} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-primary leading-tight mb-1">Invoice Overdue</p>
                <p className="text-xs font-medium text-muted line-clamp-2 leading-relaxed">
                  INV-40292 passed its due date yesterday. Consider sending a reminder to the client.
                </p>
                <p className="text-[10px] font-bold text-ink-tertiary mt-2 uppercase tracking-widest">
                  2 hours ago
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-brand shrink-0 mt-2" />
            </div>
            
             {/* Mock Item 3 */}
             <div className="p-4 hover:bg-surface-raised/50 transition-colors flex gap-3 cursor-pointer group opacity-60">
              <div className="w-9 h-9 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0 mt-0.5">
                <Users size={16} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-primary leading-tight mb-1">New Client Imported</p>
                <p className="text-xs font-medium text-muted line-clamp-2 leading-relaxed">
                  You successfully bulk imported 14 new clients into your directory.
                </p>
                <p className="text-[10px] font-bold text-ink-tertiary mt-2 uppercase tracking-widest">
                  Yesterday, 2:40 PM
                </p>
              </div>
            </div>
          </div>

          <div className="p-2 border-t border-surface-border">
            <Link 
              href="/vendor/notifications"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full py-2.5 text-sm font-bold text-brand hover:bg-brand/5 rounded-lg transition-colors"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
