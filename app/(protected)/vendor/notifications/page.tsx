"use client";

import { Card } from "@/components";
import { Button } from "@/components/Button";
import { Check, AlertCircle, Users, Sparkles, Eye, LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Invoice INV-00864 Paid",
    description: "Apple Inc. just paid their outstanding invoice of ₦1,967.50. The amount has been credited to your balance.",
    time: "10 minutes ago",
    type: "success",
    icon: Check,
    unread: true,
  },
  {
    id: 2,
    title: "Invoice Overdue",
    description: "INV-40292 passed its due date yesterday. Consider sending a reminder to Esther Howard or triggering the automated Dunning emails.",
    time: "2 hours ago",
    type: "warning",
    icon: AlertCircle,
    unread: true,
  },
  {
    id: 3,
    title: "New Client Imported",
    description: "You successfully bulk imported 14 new clients into your directory.",
    time: "Yesterday, 2:40 PM",
    type: "info",
    icon: Users,
    unread: false,
  },
  {
    id: 4,
    title: "System Update",
    description: "We've added new customizable templates for your invoice exports. Head to the settings to check them out.",
    time: "Apr 04, 9:00 AM",
    type: "neutral",
    icon: Sparkles,
    unread: false,
  },
];

type FilterType = "all" | "unread";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<FilterType>("all");

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, unread: false })));
  };

  const displayedNotifications = notifications.filter(n => {
    if (filter === "unread") return n.unread;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight max-md:text-center mb-1">
            Notifications
          </h1>
          <p className="text-sm font-medium text-muted max-md:text-center">
            Stay up to date with your billing cycles and account alerts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 text-sm" onClick={markAllAsRead}>
            <Check size={16} className="mr-2" strokeWidth={3} />
            Mark all as read
          </Button>
        </div>
      </div>

      <Card className="flex flex-col">
        <div className="p-4 bg-surface border-b border-surface-border flex gap-2">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 text-[13px] font-bold transition-colors rounded-full ${
              filter === "all" ? "text-white bg-ink" : "text-muted hover:text-primary"
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter("unread")}
            className={`px-4 py-1.5 text-[13px] font-bold transition-colors rounded-full relative ${
              filter === "unread" ? "text-white bg-ink" : "text-muted hover:text-primary"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-brand rounded-full" />
            )}
          </button>
        </div>
        
        <div className="flex flex-col divide-y divide-surface-border/80">
          {displayedNotifications.map((item) => {
            let iconBg = "bg-surface-raised text-ink-tertiary";
            if (item.type === "success") iconBg = "bg-success/10 text-success";
            if (item.type === "warning") iconBg = "bg-warning/10 text-warning";
            if (item.type === "info") iconBg = "bg-brand/10 text-brand";
            
            return (
              <div 
                key={item.id} 
                className={`group p-6 flex gap-5 transition-colors hover:bg-surface-raised/40 ${!item.unread && "opacity-75"}`}
              >
                <div className={`w-12 h-12 rounded-2xl max-md:hidden flex items-center justify-center shrink-0 ${iconBg}`}>
                  <item.icon size={20} strokeWidth={2.5} />
                </div>
                
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex max-sm:flex-col items-start justify-between gap-x-4 mb-1">
                    <h3 className={`text-sm md:text-base font-bold ${item.unread ? "text-primary" : "text-ink-secondary"}`}>
                      {item.title}
                    </h3>
                    <div className="flex max-sm:flex-row-reverse items-center gap-4 shrink-0 pt-0.5">
                      {item.unread && (
                        <button 
                          onClick={() => markAsRead(item.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-bold text-brand hover:text-brand-dark px-2 py-1 flex items-center gap-1 bg-brand/10 rounded-md"
                        >
                          <Check size={12} strokeWidth={3} />
                          Mark as read
                        </button>
                      )}
                      <span className="text-[11px] font-bold text-muted uppercase tracking-widest">{item.time}</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-muted leading-relaxed max-w-2xl max-sm:pt-2">
                    {item.description}
                  </p>
                  
                  {(item.type === "warning" || item.type === "success") && (
                    <div className="flex items-center gap-3 mt-4">
                      <Link href="/vendor/invoices/1">
                        <Button variant="outline" size="sm" className="h-8 text-xs px-3 bg-surface text-ink-secondary border-surface-border hover:bg-brand/10 hover:text-brand hover:border-brand/40 shadow-none">
                          <Eye size={12} className="mr-1.5" />
                          View Invoice
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                
                <div className="w-4 shrink-0 flex justify-end pt-1">
                  {item.unread && (
                     <div className="w-2.5 h-2.5 bg-brand rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                  )}
                </div>
              </div>
            );
          })}
          
          {displayedNotifications.length === 0 && (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <Check size={48} className="text-surface-border mb-4" />
              <h3 className="text-base md:text-lg font-bold text-primary mb-1">You&apos;re all caught up!</h3>
              <p className="text-sm font-medium text-muted">No notifications found in this view.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
