"use client";

import { Avatar, AvatarFallback } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ClientType } from "@/components/ClientSelectorModal";
import { ChevronLeft, Lock, Trash, Plus, FileText, Check } from "lucide-react";
import { Input } from "@/components/Input";
import { clients } from "@/lib/vendor-data";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function EditInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = params.id as string;

  // Mock pre-filled data representing the invoice being edited
  const [selectedClient] = useState<ClientType>(clients[0]);

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${invoiceId}`,
    issueDate: "2025-01-14",
    dueDate: "2025-01-28",
    notes: "Thank you for your business. Payment is due within 14 days.",
  });

  const [items, setItems] = useState<Array<{ id: number; description: string; quantity: number; rate: number; amount: number }>>([
    { id: 1, description: "Website Development", quantity: 1, rate: 1200.0, amount: 1200.0 },
    { id: 2, description: "Hosting Setup", quantity: 1, rate: 300.0, amount: 300.0 }
  ]);
  const [newItem, setNewItem] = useState({ description: "", quantity: 1, rate: 0 });

  const addItem = () => {
    if (newItem.description && newItem.quantity > 0 && newItem.rate > 0) {
      setItems([
        ...items,
        {
          id: items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1,
          description: newItem.description,
          quantity: newItem.quantity,
          rate: newItem.rate,
          amount: newItem.quantity * newItem.rate,
        },
      ]);
      setNewItem({ description: "", quantity: 1, rate: 0 });
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const canSubmit = !!selectedClient && items.length > 0;

  const handleSubmit = () => {
    if (canSubmit) {
      router.push(`/vendor/invoices/${invoiceId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={`/vendor/invoices/${invoiceId}`}
            className="w-10 h-10 bg-surface border border-surface-border rounded-xl flex items-center justify-center hover:bg-surface-raised transition-colors text-ink-secondary shadow-sm"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Edit Invoice</h1>
            <p className="text-sm font-medium text-muted">Modify the details of invoice INV-{invoiceId}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full items-start">
        {/* ── Left Column (Workspace Engine) ── */}
        <Card className="xl:col-span-8 overflow-hidden shadow-md flex flex-col border border-surface-border bg-surface">
          <div className="p-8 border-b border-surface-border flex justify-between items-center bg-surface-raised/30">
             <div className="flex items-center gap-4 w-1/2">
                <span className="text-sm font-extrabold text-muted uppercase tracking-widest">
                  Invoice No.
                </span>
                <div className="px-3 py-2 text-xl font-bold text-primary">
                  {invoiceData.invoiceNumber}
                </div>
             </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Bill To Block */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-extrabold text-muted uppercase tracking-[0.15em] border-b border-surface-border pb-2">
                Bill To
              </h3>
              
              <div className="flex items-center justify-between bg-surface-raised border border-surface-border rounded-2xl p-4 shadow-sm opacity-80 pointer-events-none">
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14 rounded-2xl shadow-sm">
                    <AvatarFallback className={`${selectedClient.bgClass} rounded-2xl`}>
                      <span className="text-white text-lg font-extrabold">{selectedClient.initials}</span>
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-base font-bold text-primary">{selectedClient.name}</h4>
                    <p className="text-sm font-medium text-muted">{selectedClient.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-muted" strokeWidth={2.5} />
                  <span className="text-[10px] font-extrabold text-muted uppercase tracking-widest">Locked</span>
                </div>
              </div>
            </div>

            {/* Editing Items Block */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-extrabold text-muted uppercase tracking-[0.15em] border-b border-surface-border pb-2">
                Invoice Items
              </h3>
              
              {items.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-surface-border">
                  <table className="w-full text-left bg-white">
                    <thead className="bg-surface-raised border-b border-surface-border">
                      <tr>
                        <th className="px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider">Description</th>
                        <th className="px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider text-right w-24">Qty</th>
                        <th className="px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider text-right w-32">Rate</th>
                        <th className="px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider text-right w-32">Total</th>
                        <th className="px-3 py-3 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border">
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 font-semibold text-primary">{item.description}</td>
                          <td className="px-4 py-3 font-medium text-muted text-right">{item.quantity}</td>
                          <td className="px-4 py-3 font-medium text-muted text-right">₦{item.rate.toLocaleString()}</td>
                          <td className="px-4 py-3 font-bold text-primary text-right">₦{item.amount.toLocaleString()}</td>
                          <td className="px-3 py-3 text-center">
                            <button onClick={() => removeItem(item.id)} className="text-muted hover:text-danger p-1 rounded-md hover:bg-danger/10 transition-colors">
                              <Trash size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Add New Line Item Row */}
              <div className="flex items-end gap-3 bg-surface-raised/50 p-4 rounded-xl border border-surface-border border-dashed">
                <div className="flex-1">
                  <label className="text-xs font-bold text-muted mb-1 block">Item Name</label>
                  <input type="text" placeholder="e.g. Website Design" className="w-full h-10 px-3 bg-white border border-surface-border rounded-lg text-sm text-primary focus:outline-none focus:border-brand shadow-sm"
                    value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>
                <div className="w-20">
                  <label className="text-xs font-bold text-muted mb-1 block">Qty</label>
                  <input type="number" placeholder="1" min="1" className="w-full h-10 px-3 bg-white border border-surface-border rounded-lg text-sm text-primary focus:outline-none focus:border-brand shadow-sm text-right"
                    value={newItem.quantity || ""} onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="w-32">
                  <label className="text-xs font-bold text-muted mb-1 block">Rate (₦)</label>
                  <input type="number" placeholder="0.00" className="w-full h-10 px-3 bg-white border border-surface-border rounded-lg text-sm text-primary focus:outline-none focus:border-brand shadow-sm text-right"
                    value={newItem.rate || ""} onChange={(e) => setNewItem({ ...newItem, rate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <Button 
                  onClick={addItem}
                  variant="outline" 
                  className="h-10 border-brand/30 text-brand bg-brand/5 hover:bg-brand/10 hover:border-brand px-4 gap-2"
                  disabled={!newItem.description || newItem.quantity <= 0 || newItem.rate <= 0}
                >
                  <Plus size={14} strokeWidth={2.5} />
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Totals Block */}
          {items.length > 0 && (
            <div className="p-8 bg-surface-raised/80 flex justify-end border-t border-surface-border">
              <div className="w-full max-w-sm space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-ink-secondary">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-ink-secondary">
                  <div className="flex items-center gap-2">
                    <span>Tax</span>
                    <Badge variant="brand" className="text-[10px] px-1.5 py-0">10%</Badge>
                  </div>
                  <span>₦{tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-4 border-t border-surface-border flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">Total Amount</span>
                  <span className="text-3xl font-extrabold text-brand">
                    ₦{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* ── Right Column (Metadata Sidebar) ── */}
        <div className="xl:col-span-4 space-y-6">
          <Card className="shadow-sm">
             <div className="p-5 border-b border-surface-border bg-surface-raised/50">
                <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                  <FileText size={16} className="text-muted" />
                  Invoice Settings
                </h3>
             </div>
             <div className="p-5 space-y-5">
                <Input 
                   id="issueDate" 
                   type="date"
                   label="Issue Date" 
                   value={invoiceData.issueDate}
                   onChange={(e) => setInvoiceData({ ...invoiceData, issueDate: e.target.value })}
                />
                <Input 
                   id="dueDate" 
                   type="date"
                   label="Due Date" 
                   value={invoiceData.dueDate}
                   onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                />
             </div>
          </Card>

          <Card className="shadow-sm">
            <div className="p-5">
              <label className="text-sm font-semibold text-ink block mb-2">Terms & Notes</label>
              <textarea 
                 rows={4}
                 placeholder="Thank you for your business. Payment is due within 14 days."
                 className="w-full bg-surface-input border border-surface-border rounded-xl px-4 py-3 font-medium text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-none"
                 value={invoiceData.notes}
                 onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
              />
            </div>
          </Card>

          {/* Action Footer */}
          <div className="bg-surface border border-surface-border rounded-2xl p-4 shadow-sm flex flex-col gap-3 sticky top-6">
            <Button 
               className={`w-full h-12 text-base shadow-lg transition-transform ${!canSubmit ? "opacity-50 cursor-not-allowed shadow-none" : "shadow-brand/25 active:scale-[0.98]"}`}
               onClick={handleSubmit}
            >
              <Check size={18} className="mr-2" strokeWidth={2.5} />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
