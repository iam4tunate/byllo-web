"use client";

import { useSession } from "next-auth/react";

export function SessionLoader({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-surface-raised/60 backdrop-blur-md">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-surface-border" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand animate-spin" />
          </div>
          <p className="text-sm font-semibold text-muted tracking-wide">
            Loading your session…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
