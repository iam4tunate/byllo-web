import { Zap, Activity } from "lucide-react";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full">
      {/* ── Left Branding Panel (Hidden on Mobile) ── */}
      <div className="hidden lg:flex w-[45%] bg-linear-to-br from-brand to-[#1D4ED8] p-12 relative overflow-hidden text-white flex-col justify-between">
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/10">
            <span className="font-extrabold text-xl">B</span>
          </div>
          <span className="font-bold text-2xl tracking-tight">Byllo</span>
        </div>

        <div className="relative z-10 max-w-lg space-y-10">
          <h1 className="text-[40px] font-extrabold leading-[1.15] tracking-tight">
            Streamline your invoicing & client management.
          </h1>
          <p className="text-lg text-white/80 font-medium leading-relaxed">
            Join thousands of vendors organizing their financials and elevating
            their customer experience securely with Byllo.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/20">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Zap color="white" size={20} strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-base">Lightning Fast</h3>
              <p className="text-sm text-white/70 leading-relaxed font-medium">
                Generate and send beautifully drafted invoices in seconds.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Activity color="white" size={20} strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-base">Real-time Metrics</h3>
              <p className="text-sm text-white/70 leading-relaxed font-medium">
                Track your open, overdue, and paid receipts dynamically.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm font-medium text-white/60">
          <p>© {new Date().getFullYear()} Byllo Inc. All rights reserved.</p>
        </div>

        {/* Abstract Background Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/15 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* ── Right Content Form Panel ── */}
      <div className="flex-1 flex flex-col justify-center bg-surface-raised px-6 sm:px-12 py-12 lg:px-24 relative overflow-y-auto">
        {/* Mobile Header Logo */}
        <div className="lg:hidden absolute top-8 left-6 sm:left-12 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-sm">
            <span className="text-white font-extrabold text-sm">B</span>
          </div>
          <span className="font-extrabold text-xl text-primary tracking-tight">
            Byllo
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}
