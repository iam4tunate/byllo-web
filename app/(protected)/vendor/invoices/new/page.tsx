"use client";

import { Avatar, AvatarFallback } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { ClientModal } from "@/components/ClientModal";
import { ClientSelectorModal, ClientType } from "@/components/ClientSelectorModal";
import { ChevronLeft, Search, Trash, Plus, FileText, Check } from "lucide-react";
import ErrorMsg from "@/components/ErrorMsg";
import { clients } from "@/lib/vendor-data";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@/components/DatePicker";

export default function CreateInvoicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledClientId = searchParams?.get("clientId");

  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [showClientSelector, setShowClientSelector] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [invoiceData, setInvoiceData] = useState<{
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date | undefined;
    notes: string;
  }>({
    invoiceNumber: "INV-49201",
    issueDate: new Date(),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks default
    notes: "",
  });

  const [items, setItems] = useState<Array<{ id: number; description: string; quantity: number; rate: number; amount: number }>>([]);
  const [newItem, setNewItem] = useState({ description: "", quantity: 1, rate: 0 });

  useEffect(() => {
    if (prefilledClientId) {
      const client = clients.find((c) => c.id.toString() === prefilledClientId);
      if (client) setSelectedClient(client);
    }
  }, [prefilledClientId]);

  const addItem = () => {
    if (newItem.description && newItem.quantity > 0 && newItem.rate > 0) {
      setItems([
        ...items,
        {
          id: items.length + 1,
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

  const handleSubmit = async () => {
    setError(null);

    if (!selectedClient) {
      setError("Please select a client to bill to.");
      return;
    }

    if (items.length === 0) {
      setError("Please add at least one item to the invoice.");
      return;
    }

    if (!invoiceData.issueDate || !invoiceData.dueDate) {
      setError("Issue date and due date are required.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate an async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/vendor/invoices");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to finalize invoice. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/vendor/invoices"
            className="w-10 h-10 bg-surface border border-surface-border rounded-xl flex items-center justify-center hover:bg-surface-raised transition-colors text-ink-secondary shadow-xs"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Create Invoice
            </h1>
            <p className="text-sm font-medium text-muted">
              Draft and send a new document to your client.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full items-start">
        <Card className="xl:col-span-9 flex flex-col">
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-[0.15em] border-b border-surface-border pb-2">
                Bill To
              </h3>

              {selectedClient ? (
                <div className="flex items-center justify-between bg-surface-raised border border-surface-border rounded-xl p-4 shadow-xs">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 rounded-2xl shadow-sm">
                      <AvatarFallback
                        className={`${selectedClient.bgClass} rounded-2xl`}
                      >
                        <span className="text-white text-lg font-extrabold">
                          {selectedClient.initials}
                        </span>
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-base font-bold text-primary">
                        {selectedClient.name}
                      </h4>
                      <p className="text-sm font-medium text-muted">
                        {selectedClient.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowClientSelector(true)}
                    disabled={isLoading}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClientSelector(true)}
                  disabled={isLoading}
                  className="w-full h-24 border-2 border-dashed border-surface-border rounded-xl flex flex-col items-center justify-center hover:bg-brand/5 hover:border-brand/40 hover:text-brand transition-all text-muted group bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Search size={20} className="mb-2 text-inherit" />
                  <span className="text-sm font-bold text-inherit">
                    Click to select a client
                  </span>
                </button>
              )}
            </div>

            {/* Editing Items Block */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-[0.15em] border-b border-surface-border pb-2">
                Invoice Items
              </h3>

              {items.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-surface-border">
                  <table className="w-full text-left bg-white">
                    <thead className="bg-surface-raised border-b border-surface-border">
                      <tr>
                        <th className="px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider text-right w-24">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider text-right w-32">
                          Rate
                        </th>
                        <th className="px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider text-right w-32">
                          Total
                        </th>
                        <th className="px-3 py-3 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border">
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 font-semibold text-primary text-sm">
                            {item.description}
                          </td>
                          <td className="px-4 py-3 font-medium text-muted text-right">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 font-medium text-muted text-right">
                            ₦{item.rate.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 font-bold text-primary text-right">
                            ₦{item.amount.toLocaleString()}
                          </td>
                          <td className="px-3 py-3 text-center">
                            <button
                              onClick={() => removeItem(item.id)}
                              disabled={isLoading}
                              className="text-muted hover:text-danger p-1 rounded-md hover:bg-danger/10 transition-colors disabled:opacity-50"
                            >
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
                  <label className="text-xs font-bold text-muted mb-1 block">
                    Item Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Solar Panel"
                    className="w-full h-10 px-3 bg-white border border-surface-border rounded-lg text-sm text-primary focus:outline-none focus:border-brand shadow-xs disabled:opacity-50"
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </div>
                <div className="w-20">
                  <label className="text-xs font-bold text-muted mb-1 block">
                    Qty
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    min="1"
                    className="w-full h-10 px-3 bg-white border border-surface-border rounded-lg text-sm text-primary focus:outline-none focus:border-brand shadow-xs text-right disabled:opacity-50"
                    value={newItem.quantity || ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        quantity: parseInt(e.target.value) || 0,
                      })
                    }
                    disabled={isLoading}
                  />
                </div>
                <div className="w-32">
                  <label className="text-xs font-bold text-muted mb-1 block">
                    Rate (₦)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full h-10 px-3 bg-white border border-surface-border rounded-lg text-sm text-primary focus:outline-none focus:border-brand shadow-xs text-right disabled:opacity-50"
                    value={newItem.rate || ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        rate: parseFloat(e.target.value) || 0,
                      })
                    }
                    disabled={isLoading}
                  />
                </div>
                <Button
                  onClick={addItem}
                  variant="outline"
                  className="h-10 border-brand/30 text-brand bg-brand/5 hover:bg-brand/10 hover:border-brand px-4 gap-2"
                  disabled={
                    !newItem.description ||
                    newItem.quantity <= 0 ||
                    newItem.rate <= 0 ||
                    isLoading
                  }
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
                  <span>
                    ₦
                    {subtotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-ink-secondary">
                  <div className="flex items-center gap-2">
                    <span>Tax</span>
                    <Badge variant="brand" className="text-[10px] px-1.5 py-0">
                      10%
                    </Badge>
                  </div>
                  <span>
                    ₦
                    {tax.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="pt-4 border-t border-surface-border flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">
                    Total Amount
                  </span>
                  <span className="text-2xl md:text-3xl font-extrabold text-brand">
                    ₦
                    {total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* ── Right Column (Metadata Sidebar) ── */}
        <div className="xl:col-span-3 space-y-6">
          <Card className="overflow-visible">
            <div className="p-5 border-b border-surface-border bg-surface-raised/50">
              <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                <FileText size={16} className="text-muted" />
                Invoice Settings
              </h3>
            </div>
            <div className="p-5 space-y-5">
              <DatePicker
                label="Issue Date"
                value={invoiceData.issueDate}
                onChange={(date) => {
                  const newInvoiceData = { ...invoiceData, issueDate: date };
                  // If the new issue date is after the due date, safely push the due date 14 days ahead of it
                  if (invoiceData.dueDate && date > invoiceData.dueDate) {
                    newInvoiceData.dueDate = new Date(
                      date.getTime() + 14 * 24 * 60 * 60 * 1000,
                    );
                  }
                  setInvoiceData(newInvoiceData);
                }}
                disabled={isLoading}
                minDate={new Date()}
              />
              <DatePicker
                label="Due Date"
                placeholder="Select due date"
                value={invoiceData.dueDate}
                onChange={(date) =>
                  setInvoiceData({ ...invoiceData, dueDate: date })
                }
                disabled={isLoading}
                minDate={invoiceData.issueDate} // optional: restricts past dates!
              />
            </div>
          </Card>

          <Card>
            <div className="p-5">
              <label className="text-sm font-semibold text-ink block mb-2">
                Terms & Notes
              </label>
              <textarea
                rows={4}
                placeholder="Thank you for your business. Payment is due within 14 days."
                className="w-full bg-surface-input border border-surface-border rounded-xl px-4 py-3 font-medium text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                value={invoiceData.notes}
                onChange={(e) =>
                  setInvoiceData({ ...invoiceData, notes: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
          </Card>

          {/* Action Footer */}
          <div className="bg-surface border border-surface-border rounded-xl p-4 shadow-xs flex flex-col gap-3 sticky top-6">
            {error && <ErrorMsg error={error} />}
            <Button
              className={`w-full h-12 text-base shadow-lg transition-transform ${!canSubmit || isLoading ? "opacity-50 cursor-not-allowed shadow-none" : "shadow-brand/25 active:scale-[0.98]"}`}
              onClick={handleSubmit}
              disabled={!canSubmit || isLoading}
            >
              <Check size={18} className="mr-2" strokeWidth={2.5} />
              {isLoading ? "Saving..." : "Finalize Invoice"}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <ClientSelectorModal
        isOpen={showClientSelector}
        onClose={() => setShowClientSelector(false)}
        onSelect={(client) => setSelectedClient(client)}
        onAddNewClient={() => {
          setShowClientSelector(false);
          setShowClientModal(true);
        }}
      />
      <ClientModal
        isOpen={showClientModal}
        onClose={() => setShowClientModal(false)}
        onSave={(clientData) => {
          // Mock save + select behavior
          const mappedClient: ClientType = {
            id: Math.floor(Math.random() * 1000),
            name: clientData.name,
            email: clientData.email,
            phone: clientData.phone,
            address: clientData.billingAddress || "Unknown",
            status: "active",
            totalInvoices: 0,
            totalAmount: 0,
            initials: clientData.name.substring(0, 2).toUpperCase(),
            bgClass: "bg-brand/20",
          };
          setSelectedClient(mappedClient);
        }}
      />
    </div>
  );
}
