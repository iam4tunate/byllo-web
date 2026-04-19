"use client";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { Plus, FileText, Clock, Check, Search, Eye } from "lucide-react";
import { invoices } from "@/lib/vendor-data";
import Link from "next/link";
import { useState } from "react";

type Tab = "all" | "open" | "paid";

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");

  const filtered = (() => {
    const base =
      activeTab === "all"
        ? invoices
        : invoices.filter((inv) => inv.status === activeTab);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(
      (inv) =>
        inv.client.toLowerCase().includes(q) ||
        inv.title.toLowerCase().includes(q),
    );
  })();

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All Invoices" },
    { key: "open", label: "Open & Pending" },
    { key: "paid", label: "Successfully Collected" },
  ];

  // Summary Metrics
  const totalOpenAmount = invoices
    .filter((i) => i.status === "open")
    .reduce((s, i) => s + i.amount, 0);
  const totalPaidAmount = invoices
    .filter((i) => i.status === "paid")
    .reduce((s, i) => s + i.amount, 0);
  const totalExpectedAmount = invoices.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex max-md:flex-col gap-4 items-center justify-between">
        <div className="max-md:text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-1">
            Invoices Management
          </h1>
          <p className="text-sm font-medium text-muted">
            Track, manage, and follow up on your client billing.
          </p>
        </div>
        <Link href="/vendor/invoices/new" className="w-full sm:w-auto">
          <Button className="shadow-lg shadow-brand/25 transition-transform hover:-translate-y-0.5 gap-2 h-12 px-6 w-full sm:w-auto">
            <Plus size={18} color="white" strokeWidth={2.5} />
            Create New Invoice
          </Button>
        </Link>
      </div>

      {/* ── Summary KPI Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-surface border border-surface-border rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-muted uppercase tracking-widest">
              Total Billed
            </p>
            <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center text-brand">
              <FileText
                size={18}
                color="currentColor"
                strokeWidth={2.5}
              />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold text-primary mb-1">
            ₦
            {totalExpectedAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs font-medium text-primary bg-surface-raised inline-block px-2 py-1 rounded-md">
            {invoices.length} total invoices
          </p>
        </div>

        <div className="bg-surface border border-surface-border rounded-2xl p-6 shadow-xs border-l-4 border-l-warning">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-muted uppercase tracking-widest">
              Awaiting Payment
            </p>
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center text-warning">
              <Clock
                size={18}
                color="currentColor"
                strokeWidth={2.5}
              />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold text-primary mb-1">
            ₦
            {totalOpenAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs font-medium text-warning-text bg-warning-light inline-block px-2 py-1 rounded-md">
            Follow-up recommended
          </p>
        </div>

        <div className="bg-dark rounded-2xl p-6 shadow-xs shadow-black/10 border border-[#2A2F3D] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/20 blur-3xl rounded-full group-hover:bg-success/30 transition-colors duration-700" />
          <div className="relative z-10 flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">
              Successfully Collected
            </p>
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center text-success-light">
              <Check
                size={20}
                color="currentColor"
                strokeWidth={3}
              />
            </div>
          </div>
          <p className="relative z-10 text-2xl md:text-3xl font-extrabold text-white mb-1">
            ₦
            {totalPaidAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="relative z-10 text-xs font-medium text-success-light bg-success/20 inline-block px-2 py-1 rounded-md border border-success/30">
            Available in balance
          </p>
        </div>
      </div>

      {/* ── Main Data View ── */}
      <div className="bg-surface border border-surface-border rounded-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-surface-border flex flex-col md:flex-row items-center gap-4 justify-between bg-surface-raised/30 rounded-t-2xl">
          {/* Tabs */}
          <div className="flex bg-surface-input p-1.5 rounded-xl w-full md:w-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 md:flex-none px-6 h-10 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-white shadow-sm text-primary"
                      : "text-muted hover:text-primary hover:bg-white/50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={16} color="#8C95A6" strokeWidth={2.5} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client or project..."
              className="w-full h-12 bg-white border border-surface-border rounded-xl pl-11 pr-4 text-sm font-medium text-primary placeholder:text-muted focus:outline-none focus:border focus:border-brand shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto min-h-[400px]">
          {/* Empty state  */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={FileText}
              entityName="invoices"
              isSearchActive={search.trim() !== "" || activeTab !== "all"}
              searchDescription="We couldn't find any invoices matching your filters. Try adjusting your search query or changing tabs."
              onClearSearch={() => {
                setSearch("");
                setActiveTab("all");
              }}
            />
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-muted">
                    Invoice
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-muted">
                    Project & Client
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-muted">
                    Amount
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-muted">
                    Status
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-muted text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {filtered.map((invoice, idx) => (
                  <tr
                    key={`${invoice.id}-${idx}`}
                    className="hover:bg-surface-raised transition-colors group cursor-pointer"
                  >
                    <td className="px-8 py-5 align-middle">
                      <p className="text-sm font-bold text-primary">
                        INV-{invoice.id}
                      </p>
                      <p className="text-[12px] font-medium text-muted mt-0.5">
                        {invoice.date}
                      </p>
                    </td>
                    <td className="px-8 py-5 align-middle">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm font-bold text-primary mb-0.5 group-hover:text-brand transition-colors">
                            {invoice.title}
                          </p>
                          <p className="text-xs font-medium text-muted">
                            {invoice.client}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 align-middle">
                      <p className="text-sm md:text-[15px] font-bold text-primary">
                        ₦
                        {invoice.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </td>
                    <td className="px-8 py-5 align-middle">
                      <Badge
                        variant={invoice.status as "open" | "paid"}
                        className="px-2.5 py-1 text-[11px]"
                      >
                        {invoice.status === "paid"
                          ? "Successfully Paid"
                          : "Awaiting Payment"}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* <Button variant="ghost" size="icon" className="w-9 h-9 rounded-lg text-muted hover:text-brand hover:bg-brand/10 bg-white border border-surface-border shadow">
                          <Icon name="download" size={16} color="currentColor" strokeWidth={2.5} />
                        </Button> */}
                        <Link
                          href={`/vendor/invoices/${invoice.id}`}
                          className="inline-flex w-9 h-9 items-center justify-center rounded-lg text-muted hover:text-brand hover:bg-brand/10 bg-white border border-surface-border transition-colors shadow-xs"
                        >
                          <Eye
                            size={16}
                            color="currentColor"
                            strokeWidth={2.5}
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
