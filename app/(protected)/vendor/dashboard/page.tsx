"use client";

import { Card } from "@/components";
import { Avatar, AvatarFallback } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { ArrowUpRight, AlertCircle, Check, Clock, Users, Activity, Banknote, FileText, Bell, ChevronRight } from "lucide-react";
import {
  quickActions,
  recentActivity,
  recentInvoices,
  topClients,
  upcomingPayments,
  notifications,
} from "@/lib/vendor-data";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function VendorDashboard() {
  const { data: session } = useSession();
  const user = session?.user;
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Bento Grid Header ── */}
      <div className="grid grid-cols-12 gap-4 auto-rows-auto">
        {/* Greeting tile — col 1-4 */}
        <div className="col-span-12 md:col-span-4 bg-surface border border-surface-border rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block text-[10px] font-extrabold tracking-[0.2em] uppercase text-muted bg-surface-raised border border-surface-border px-2.5 py-1 rounded-lg mb-4">
              {greeting}
            </span>
            <h1 className="text-2xl font-bold text-primary leading-snug">
              Welcome back,
              <br />
              <span className="text-brand capitalize">
                {user?.firstName}
              </span>{" "}
              👋
            </h1>
          </div>
          <p className="text-xs font-medium text-muted mt-4">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Revenue tile — col 5-9 */}
        <div className="col-span-12 md:col-span-5 relative bg-linear-to-br from-brand to-[#1D4ED8] rounded-2xl overflow-hidden shadow-lg shadow-brand/20 p-6 group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-white/15 transition-colors duration-500" />
          <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-white/60 mb-3">
            Total Revenue
          </p>
          <p className="text-4xl font-extrabold text-white tracking-tight mb-4">
            ₦24,580
            <span className="text-xl text-white/40 font-semibold">.00</span>
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-3 py-1.5">
              <ArrowUpRight size={13} color="#6EE7B7" strokeWidth={2.5} />
              <span className="text-xs font-bold text-emerald-300">
                +12.5% vs last month
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-lg px-3 py-1.5">
              <span className="text-xs font-bold text-white/70">
                57 invoices total
              </span>
            </div>
          </div>
        </div>

        {/* Overdue alert tile — col 10-12 */}
        <div className="col-span-12 md:col-span-3 bg-danger/5 border border-danger/20 rounded-2xl p-6 flex flex-col justify-between group hover:bg-danger/10 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center mb-4">
            <AlertCircle size={20} color="#EF4444" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-danger/70 mb-1">
              Overdue
            </p>
            <p className="text-3xl font-extrabold text-danger">₦5.2k</p>
            <p className="text-xs font-medium text-danger/60 mt-1">
              3 invoices overdue
            </p>
          </div>
        </div>

        {/* Quick Actions — Create Invoice + Notifications count */}
        {quickActions.map((action) =>
          action.label !== "Add Client" ? (
            <Link
              key={action.label}
              href={action.href}
              className="col-span-6 md:col-span-3 group bg-surface border border-surface-border hover:border-brand/40 rounded-2xl p-5 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className={`w-11 h-11 ${action.bg} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
              >
                <action.icon size={20} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-primary group-hover:text-brand transition-colors">
                  {action.label}
                </p>
                <p className="text-[11px] text-muted font-medium mt-0.5">
                  Draft a new invoice
                </p>
              </div>
              <ArrowUpRight
                size={15}
                className="ml-auto text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={2.5}
              />
            </Link>
          ) : (
            (() => {
              const unreadCount = notifications.filter((n) => n.unread).length;
              return (
                <Link
                  key="notifications"
                  href="/vendor/notifications"
                  className="col-span-6 md:col-span-3 group bg-surface border border-surface-border hover:border-brand/40 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 bg-brand/10 rounded-xl flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                      <Bell
                        size={20}
                        className="text-brand"
                        strokeWidth={2.5}
                      />
                    </div>
                    {unreadCount > 0 && (
                      <span className="w-6 h-6 bg-brand text-white text-[11px] font-extrabold rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary group-hover:text-brand transition-colors">
                      Notifications
                    </p>
                    <p className="text-[11px] text-muted font-medium mt-0.5">
                      {unreadCount > 0
                        ? `${unreadCount} unread`
                        : "All caught up"}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="mt-3 ml-auto text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                    strokeWidth={2.5}
                  />
                </Link>
              );
            })()
          ),
        )}

        {/* KPI tiles */}
        {[
          {
            label: "Paid Invoices",
            value: "45",
            icon: Check,
            color: "text-success",
            bg: "bg-success/10",
            iconColor: "#22C55E",
          },
          {
            label: "Pending",
            value: "12",
            icon: Clock,
            color: "text-warning",
            bg: "bg-warning/10",
            iconColor: "#F59E0B",
          },
          {
            label: "Active Clients",
            value: "24",
            icon: Users,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            iconColor: "#A855F7",
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="col-span-4 md:col-span-2 bg-surface border border-surface-border rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:shadow-sm transition-shadow"
          >
            <div
              className={`w-9 h-9 ${kpi.bg} rounded-xl flex items-center justify-center`}
            >
              <kpi.icon size={17} color={kpi.iconColor} strokeWidth={2.5} />
            </div>
            <p className={`text-2xl font-extrabold ${kpi.color}`}>
              {kpi.value}
            </p>
            <p className="text-[10px] font-bold text-muted uppercase tracking-wider leading-tight">
              {kpi.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="flex flex-col">
          <div className="p-6 border-b border-surface-border flex justify-between items-center bg-surface-raised/50">
            <h3 className="text-sm md:text-base font-bold text-primary flex items-center gap-2">
              <Activity size={18} className="text-brand" strokeWidth={2.5} />
              Recent Activity
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs text-brand hover:bg-brand/10"
            >
              View All
            </Button>
          </div>
          <div className="p-2 space-y-1">
            {recentActivity.length === 0 ? (
              <EmptyState
                icon={Activity}
                entityName="Activity"
                isSearchActive={false}
                emptyDescription="No activity events recorded yet. Interacting with your workspace will populate this feed."
                className="py-12"
              />
            ) : (
              recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center p-4 rounded-2xl hover:bg-surface-raised transition-colors group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.positive ? "bg-success-light/50 text-success" : "bg-brand/10 text-brand"}`}
                  >
                    {item.positive ? (
                      <Banknote
                        size={18}
                        color="currentColor"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <FileText
                        size={18}
                        color="currentColor"
                        strokeWidth={2.5}
                      />
                    )}
                  </div>
                  <div className="ml-4 flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-primary truncate group-hover:text-brand transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs font-medium text-muted mt-0.5">
                      {item.client}
                    </p>
                  </div>
                  <div className="text-right pl-2">
                    <p
                      className={`text-sm font-bold ${item.positive ? "text-success" : "text-primary"}`}
                    >
                      {item.amount}
                    </p>
                    <p className="text-[10px] font-bold text-muted mt-0.5 uppercase tracking-wider">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Upcoming Payments */}
        <Card className="flex flex-col">
          <div className="p-6 border-b border-surface-border flex justify-between items-center bg-surface-raised/50">
            <h3 className="text-sm md:text-base font-bold text-primary flex items-center gap-2">
              <Clock size={18} color="#EA580C" strokeWidth={2.5} />
              Upcoming Payments
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs text-brand hover:bg-brand/10"
            >
              Calendar
            </Button>
          </div>
          <div className="p-2 space-y-1">
            {upcomingPayments.length === 0 ? (
              <EmptyState
                icon={Clock}
                entityName="Upcoming Payments"
                isSearchActive={false}
                emptyDescription="You have no immediate upcoming payments from clients."
                className="py-12"
              />
            ) : (
              upcomingPayments.map((p, i) => {
                const isOverdue = p.status === "overdue";
                const isDueSoon = p.status === "due-soon";
                return (
                  <div
                    key={i}
                    className="flex items-center p-4 rounded-2xl hover:bg-surface-raised transition-colors group"
                  >
                    <div className="flex-1 overflow-hidden pr-4">
                      <p className="text-sm font-bold text-primary truncate mb-1.5">
                        {p.client}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            isOverdue
                              ? "danger"
                              : isDueSoon
                                ? "warning"
                                : "secondary"
                          }
                          className="px-2 py-0"
                        >
                          {isOverdue ? "Overdue" : `${p.daysLeft}d left`}
                        </Badge>
                        <span className="text-[11px] font-semibold text-muted">
                          Due {p.dueDate}
                        </span>
                      </div>
                    </div>
                    <p className="text-base font-bold text-primary shrink-0">
                      ₦{p.amount.toLocaleString()}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Recent Invoices Table (Spans 8) */}
        <Card className="xl:col-span-8 flex flex-col">
          <div className="p-6 border-b border-surface-border flex justify-between items-center">
            <h3 className="text-base md:text-lg font-bold text-primary">
              Recent Invoices
            </h3>
            {recentInvoices.length !== 0 && (
              <Link
                href="/vendor/invoices"
                className="text-sm font-bold text-brand hover:text-brand-dark transition-colors flex items-center gap-1 bg-brand/5 px-4 py-2 rounded-xl"
              >
                View all invoices
                <ArrowUpRight
                  size={16}
                  color="currentColor"
                  strokeWidth={2.5}
                />
              </Link>
            )}
          </div>
          {recentInvoices.length === 0 ? (
            <EmptyState
              icon={FileText}
              entityName="Invoices"
              isSearchActive={false}
              emptyDescription="No invoices created yet. Generate one to get started."
              className="py-16"
              actionLabel="Create Invoice"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-surface-border bg-surface-raised/30">
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted">
                      Invoice ID
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted">
                      Client
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted">
                      Status
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {recentInvoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-surface-raised transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-primary">
                          INV-{inv.id}
                        </p>
                        <p className="text-[11px] font-medium text-muted mt-0.5">
                          {inv.date}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-surface-input flex items-center justify-center text-[10px] font-bold text-ink">
                            {inv.client.substring(0, 2).toUpperCase()}
                          </div>
                          <p className="text-sm font-semibold text-primary">
                            {inv.client}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-primary">
                          ₦
                          {inv.amount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={inv.status === "paid" ? "paid" : "open"}
                        >
                          {inv.status === "paid" ? "Paid" : "Open"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href={`/vendor/invoices/${inv.id}`}
                          className="inline-flex w-8 h-8 items-center justify-center rounded-lg hover:bg-surface-border text-muted hover:text-primary transition-colors"
                        >
                          <ChevronRight
                            size={18}
                            color="currentColor"
                            strokeWidth={2.5}
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* AI Insights Banner (Spans 4) */}
        {/* <div className="xl:col-span-4 rounded-[2rem] bg-gradient-to-br from-indigo-900 to-slate-900 p-[2px] shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
          <div className="rounded-[calc(2rem-2px)] bg-[#0B101E] h-full flex flex-col p-6 relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                <Icon name="sparkles" size={18} color="#818CF8" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-indigo-400">AI Insights</p>
                <h3 className="text-base font-bold text-white">Smart Recommendations</h3>
              </div>
            </div>
            
            <div className="space-y-3 flex-1">
              {aiInsights.map((insight, i) => (
                <div key={i} className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 flex gap-4 hover:bg-indigo-500/20 transition-colors cursor-default">
                  <div className="mt-0.5 shrink-0 bg-indigo-500/20 w-8 h-8 rounded-lg flex items-center justify-center">
                    <Icon name={insight.icon as IconName} size={14} color="#818CF8" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white mb-1">{insight.title}</p>
                    <p className="text-[11px] font-medium text-indigo-200/70 leading-relaxed">{insight.body}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-900/50">
              Analyze Full History
            </Button>
          </div>
        </div> */}

        {/* Top Clients */}
        <div className="xl:col-span-4 bg-[#0A0D14] rounded-xl flex flex-col overflow-hidden shadow-xl shadow-black/10 text-white relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-3xl rounded-full" />
          <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10">
            <div>
              <h3 className="text-sm md:text-base font-bold flex items-center gap-2">
                <Users size={18} color="#A78BFA" strokeWidth={2.5} />
                Top Clients
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs text-[#A78BFA] hover:bg-[#A78BFA]/10 hover:text-[#A78BFA]"
            >
              Manage
            </Button>
          </div>
          <div className="p-4 space-y-2 relative z-10">
            {topClients.map((client, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors"
              >
                <Avatar className="w-12 h-12 rounded-2xl border border-white/10 shadow-sm">
                  <AvatarFallback className={`${client.bgClass} rounded-2xl`}>
                    <span className="text-white text-sm font-bold">
                      {client.initials}
                    </span>
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate text-white">
                    {client.name}
                  </p>
                  <p className="text-xs font-medium text-white/50">
                    {client.invoices} invoices
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-white mb-0.5">
                    ₦{(client.totalAmount / 1000).toFixed(1)}k
                  </p>
                  <p className="text-[10px] font-bold text-[#A78BFA] bg-[#A78BFA]/10 inline-block px-1.5 rounded">
                    {client.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
