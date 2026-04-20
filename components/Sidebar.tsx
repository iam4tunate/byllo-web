"use client";

import { LucideIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

export type NavItemConfig = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number | string;
};

export interface SidebarProps {
  navGroups: {
    title: string;
    items: NavItemConfig[];
  }[];
  bottomItems?: NavItemConfig[];
  className?: string;
  onClose?: () => void;
}

export function Sidebar({
  navGroups,
  bottomItems,
  className,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  return (
    <>
      <aside
        className={cn(
          "flex flex-col w-64 bg-surface border-r border-surface-border fixed inset-y-0 shadow-sm transition-transform duration-300 z-50",
          className,
        )}
      >
        {/* ── Logo ── */}
        <div className="px-6 h-16 border-b border-surface-border flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand to-blue-700 flex items-center justify-center shadow-inner shadow-white/20">
            <span className="text-white font-extrabold text-sm tracking-tight focus:outline-none">
              B
            </span>
          </div>
          <span className="font-extrabold text-primary text-xl tracking-tight">
            Byllo
          </span>
        </div>

        {/* ── Navigation ── */}
        <div className="flex-1 overflow-y-auto py-5 px-4 space-y-8 scrollbar-hide">
          {navGroups.map((group, i) => (
            <div key={i} className="space-y-1.5">
              {group.title && (
                <h4 className="px-2 mb-3 text-[11px] font-extrabold text-muted uppercase tracking-[0.15em]">
                  {group.title}
                </h4>
              )}
              <nav className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-all duration-200 group",
                        active
                          ? "bg-brand/10 text-brand border border-brand/10"
                          : "text-ink-secondary hover:bg-surface-raised hover:text-primary border border-transparent",
                      )}
                    >
                      <item.icon
                        size={18}
                        className={cn(
                          "transition-colors",
                          active
                            ? "text-brand"
                            : "text-ink-tertiary group-hover:text-ink-secondary",
                        )}
                        strokeWidth={active ? 2.5 : 2}
                      />
                      <span className="flex-1">{item.label}</span>
                      {item.badge !== undefined && (
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-bold",
                            active
                              ? "bg-brand text-white"
                              : "bg-surface-border text-ink-secondary group-hover:bg-brand/20 group-hover:text-brand",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* ── Bottom Section ── */}
        <div className="p-4 border-t border-surface-border space-y-4">
          {bottomItems && bottomItems.length > 0 && (
            <nav className="flex flex-col gap-1">
              {bottomItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 group",
                      active
                        ? "bg-brand/10 text-brand border border-brand/10"
                        : "text-ink-secondary hover:bg-surface-raised hover:text-primary border border-transparent",
                    )}
                  >
                    <item.icon
                      size={18}
                      className={cn(
                        active
                          ? "text-brand"
                          : "text-ink-tertiary group-hover:text-ink-secondary",
                      )}
                      strokeWidth={active ? 2.5 : 2}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Sign Out Button */}
          <button
            onClick={() => setIsSignOutModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-bold text-danger bg-danger/5 border border-transparent hover:bg-danger/10 hover:border-danger/20 transition-all duration-200 mt-2"
          >
            <LogOut size={18} strokeWidth={2.5} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Sign Out Modal ── */}
      {isSignOutModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink-inverse/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsSignOutModalOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-surface border border-surface-border rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-300">
            <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mb-4 text-danger">
              <LogOut size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2 tracking-tight">
              Sign Out
            </h3>
            <p className="text-sm font-medium text-muted mb-6 leading-relaxed">
              Are you sure you want to sign out? You will need to sign in again
              to access your dashboard.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsSignOutModalOpen(false)}
                className="flex-1 py-3 rounded-xl border-2 border-surface-border font-bold text-sm text-primary hover:bg-surface-raised transition-colors focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsSignOutModalOpen(false);
                  signOut({ callbackUrl: "/sign-in" });
                }}
                className="flex-1 py-3 rounded-xl bg-danger hover:bg-red-600 focus:outline-none text-white font-bold text-sm shadow-md shadow-danger/25 transition-all"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
