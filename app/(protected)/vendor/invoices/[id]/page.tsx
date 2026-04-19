"use client";

import { Avatar, AvatarFallback } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ChevronLeft, Zap, Check, AlertCircle, Edit2, Download, Send, Users, Clock } from "lucide-react";
import { SendReminderModal } from "@/components/SendReminderModal";
import Link from "next/link";
import React, { useState } from "react";
import { useParams } from "next/navigation";

export default function InvoiceDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock static data (matching the mobile implementation, upgraded for web)
  const [invoice, setInvoice] = useState({
    id: id || "00864",
    date: "14 Jan 2025",
    dueDate: "28 Jan 2025",
    amount: 1967.5,
    status: "open", // open, paid, overdue
    billTo: {
      name: "Esther Howard",
      email: "esther.howard@example.com",
      address: "2972 Westheimer Rd. Santa Ana",
    },
    items: [
      { name: "iPad Pro", quantity: 1, price: 1200.0, total: 1200.0 },
      { name: "Mac Book Pro", quantity: 1, price: 700.0, total: 700.0 },
      { name: "Home Pod", quantity: 1, price: 150.0, total: 150.0 },
    ],
    subtotal: 2050.0,
    discount: 82.5,
    total: 1967.5,
    history: [
      {
        id: 2,
        action: "Invoice Updated",
        date: "15 Jan 2025, 11:20 AM",
        user: "You",
      },
      {
        id: 1,
        action: "Invoice Created",
        date: "14 Jan 2025, 09:41 AM",
        user: "You",
      },
    ],
  });

  const [reminderModalOpen, setReminderModalOpen] = useState(false);

  const handleMarkAsPaid = () => {
    setInvoice({ ...invoice, status: "paid" });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/vendor/invoices"
            className="w-10 h-10 bg-surface border border-surface-border rounded-xl flex items-center justify-center hover:bg-surface-raised transition-colors text-ink-secondary"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Invoice INV-{invoice.id}
            </h1>
            <p className="text-sm font-medium text-muted">
              View and manage invoice details.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full items-start">
        <Card className="xl:col-span-8 overflow-visible">
          <div className="p-8 border-b border-surface-border flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
                  INV-{invoice.id}
                </h2>
                <Badge
                  variant={invoice.status === "paid" ? "success" : "warning"}
                >
                  {invoice.status === "paid" ? "Paid" : "Awaiting Payment"}
                </Badge>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <div>
                  <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">
                    Issued Date
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {invoice.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">
                    Due Date
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {invoice.dueDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">
                Amount Due
              </p>
              <p className="text-3xl md:text-4xl font-extrabold text-brand">
                ₦
                {invoice.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-raised/30 border-b border-surface-border">
                  <th className="px-8 py-4 text-xs font-bold text-muted uppercase tracking-widest">
                    Item Description
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-muted uppercase tracking-widest text-right">
                    Qty
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-muted uppercase tracking-widest text-right">
                    Rate
                  </th>
                  <th className="px-8 py-4 text-xs font-bold text-muted uppercase tracking-widest text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {invoice.items.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-surface-raised/50 transition-colors"
                  >
                    <td className="px-8 py-4 font-bold text-primary">
                      {item.name}
                    </td>
                    <td className="px-8 py-4 font-medium text-muted text-right">
                      {item.quantity}
                    </td>
                    <td className="px-8 py-4 font-medium text-muted text-right">
                      ₦
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-8 py-4 font-extrabold text-primary text-right">
                      ₦
                      {item.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Block */}
          <div className="p-8 bg-surface-raised/30 flex justify-end">
            <div className="w-full max-w-sm space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-ink-secondary">
                <span>Subtotal</span>
                <span>
                  ₦
                  {invoice.subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-danger">
                <span>Discount</span>
                <span>
                  −₦
                  {invoice.discount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="pt-4 border-t border-surface-border flex justify-between items-center">
                <span className="text-base font-bold text-primary">
                  Total Amount
                </span>
                <span className="text-xl md:text-2xl font-extrabold text-primary">
                  ₦
                  {invoice.total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* ── Right Column (Metadata & Actions) ── */}
        <div className="xl:col-span-4 space-y-6">
          <Card className="flex flex-col shadow-sm">
            <div className="p-6 border-b border-surface-border bg-surface-raised/50">
              <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                <Zap size={16} className="text-brand" />
                Quick Actions
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {invoice.status !== "paid" && (
                <Button
                  variant="default"
                  className="w-full bg-success hover:bg-success-text text-white shadow-lg shadow-success/20"
                  onClick={handleMarkAsPaid}
                >
                  <Check size={18} className="mr-2" />
                  Mark as Paid
                </Button>
              )}

              {invoice.status === "overdue" && (
                <Button
                  variant="default"
                  className="w-full bg-danger text-white shadow-sm hover:bg-danger-light"
                  onClick={() => setReminderModalOpen(true)}
                >
                  <AlertCircle
                    size={18}
                    className="mr-2"
                    strokeWidth={2.5}
                  />
                  Send Reminder
                </Button>
              )}

              {invoice.status !== "paid" && (
                <Link href={`/vendor/invoices/${invoice.id}/edit`}>
                  <Button
                    variant="outline"
                    className="w-full border-surface-border shadow-sm"
                  >
                    <Edit2
                      size={18}
                      className="mr-2 text-ink-tertiary"
                    />
                    Edit Invoice
                  </Button>
                </Link>
              )}

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-surface-border">
                <Button variant="secondary" className="w-full">
                  <Download size={16} className="mr-2" />
                  Download
                </Button>
                <Button variant="dark" className="w-full">
                  <Send size={16} className="mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </Card>

          {/* Bill To Card */}
          <Card className="flex flex-col shadow-sm">
            <div className="p-5 border-b border-surface-border bg-surface-raised/50">
              <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                <Users size={16} className="text-muted" />
                Client Details
              </h3>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10 rounded-xl shadow-sm border border-surface-border">
                  <AvatarFallback className="bg-brand/10 text-brand font-bold rounded-xl">
                    {invoice.billTo.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-extrabold text-primary">
                    {invoice.billTo.name}
                  </h4>
                  <p className="text-xs font-medium text-muted">
                    {invoice.billTo.email}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-surface-raised rounded-lg border border-surface-border">
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
                  Billing Address
                </p>
                <p className="text-xs font-semibold text-primary leading-relaxed">
                  {invoice.billTo.address}
                </p>
              </div>
            </div>
          </Card>

          {/* Activity Timeline Card */}
          <Card className="flex flex-col shadow-sm">
            <div className="p-6 border-b border-surface-border bg-surface-raised/50 flex justify-between items-center">
              <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                <Clock size={16} className="text-muted" />
                Activity History
              </h3>
              <Badge
                variant="secondary"
                className="text-[10px] uppercase font-bold"
              >
                {invoice.history.length} Events
              </Badge>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {invoice.history.map((event, idx) => (
                  <div key={event.id} className="flex gap-4 relative">
                    {idx !== invoice.history.length - 1 && (
                      <div className="absolute left-[9px] top-[24px] bottom-[-16px] w-[2px] bg-surface-border" />
                    )}
                    <div className="relative z-10 w-[20px] h-[20px] rounded-full bg-surface-raised border-2 border-surface-border flex shrink-0 items-center justify-center mt-0.5 shadow-sm">
                      <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-bold text-primary mb-1">
                        {event.action}
                      </p>
                      <p className="text-[11px] font-medium text-muted">
                        <span className="text-ink-secondary font-bold">
                          {event.user}
                        </span>{" "}
                        • {event.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <SendReminderModal
        isOpen={reminderModalOpen}
        onClose={() => setReminderModalOpen(false)}
        invoiceNumber={invoice.id}
        clientName="Esther Howard"
      />
    </div>
  );
}
