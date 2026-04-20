"use client";

import { Button } from "@/components/Button";
import { Users, X } from "lucide-react";
import { Input } from "@/components/Input";
import React, { useState, useEffect } from "react";
import ErrorMsg from "@/components/ErrorMsg";

export type ClientFormData = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  billingAddress?: string;
};

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ClientFormData) => void;
  initialData?: ClientFormData | null;
}

export function ClientModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ClientModalProps) {
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
    phone: "",
    billingAddress: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: "",
          email: "",
          phone: "",
          billingAddress: "",
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name) {
      setError("Please enter a client or business name.");
      return;
    }

    if (!formData.email) {
      setError("Please enter a client email.");
      return;
    }

    if (!formData.phone) {
      setError("Please enter a client phone number.");
      return;
    }

    setIsLoading(true);

    try {
      onSave(formData);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save client. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-inverse/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden border border-surface-border max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-surface-border bg-surface-raised/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
              <Users size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">
                {isEditing ? "Edit Client" : "Add New Client"}
              </h2>
              <p className="text-xs font-medium text-muted">
                {isEditing
                  ? "Update existing client details."
                  : "Register a new client in your directory."}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-input flex items-center justify-center text-muted hover:text-primary transition-colors focus:outline-none"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {error && <ErrorMsg error={error} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Client/Business Name *"
                id="name"
                placeholder="e.g. Esther Howard"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={isLoading}
                required
              />
              <Input
                label="Email Address *"
                id="email"
                type="email"
                placeholder="example@email.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={isLoading}
              />
              <Input
                label="Phone Number *"
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={isLoading}
              />
              <Input
                label="Billing Address"
                id="billingAddress"
                placeholder="Street address, City, State..."
                value={formData.billingAddress}
                onChange={(e) =>
                  setFormData({ ...formData, billingAddress: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="p-6 pt-2 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="px-8 shadow-lg shadow-brand/25 active:scale-[0.98] transition-transform"
            >
              {isEditing ? "Save Changes" : "Confirm & Add Client"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
