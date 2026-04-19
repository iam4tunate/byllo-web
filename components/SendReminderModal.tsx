import { Button } from "@/components/Button";
import { X, Mail, Phone, Send } from "lucide-react";
import React, { useState } from "react";

interface SendReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceNumber: string;
  clientName: string;
}

export function SendReminderModal({ isOpen, onClose, invoiceNumber, clientName }: SendReminderModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<"whatsapp" | "email">("email");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-surface rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden border border-surface-border">
        {/* Header */}
        <div className="p-6 border-b border-surface-border bg-surface-raised flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary">Send Reminder</h2>
            <p className="text-xs font-medium text-muted mt-1">Remind {clientName} about {invoiceNumber}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface border border-surface-border flex items-center justify-center text-ink-tertiary hover:bg-surface-raised hover:text-primary transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <button
            onClick={() => setSelectedMethod("email")}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
              selectedMethod === "email"
                ? "border-brand bg-brand/5 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
                : "border-surface-border bg-surface hover:border-brand/40"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              selectedMethod === "email" ? "bg-brand text-white" : "bg-surface-raised text-ink-tertiary"
            }`}>
              <Mail size={20} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h3 className={`text-sm font-bold ${selectedMethod === "email" ? "text-primary" : "text-ink-secondary"}`}>
                Email Alert
              </h3>
              <p className="text-xs font-medium text-muted mt-0.5">Send a formal reminder via email.</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === "email" ? "border-brand" : "border-surface-border"
            }`}>
              {selectedMethod === "email" && <div className="w-2.5 h-2.5 bg-brand rounded-full" />}
            </div>
          </button>

          <button
            onClick={() => setSelectedMethod("whatsapp")}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
              selectedMethod === "whatsapp"
                ? "border-success bg-success/5 shadow-[0_0_0_4px_rgba(34,197,94,0.1)]"
                : "border-surface-border bg-surface hover:border-success/40"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              selectedMethod === "whatsapp" ? "bg-success text-white" : "bg-surface-raised text-ink-tertiary"
            }`}>
              <Phone size={20} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h3 className={`text-sm font-bold ${selectedMethod === "whatsapp" ? "text-primary" : "text-ink-secondary"}`}>
                WhatsApp Message
              </h3>
              <p className="text-xs font-medium text-muted mt-0.5">Direct chat with the client&apos;s phone.</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === "whatsapp" ? "border-success" : "border-surface-border"
            }`}>
              {selectedMethod === "whatsapp" && <div className="w-2.5 h-2.5 bg-success rounded-full" />}
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-surface-border bg-surface-raised/50 flex flex-col-reverse sm:flex-row justify-end gap-3 rounded-b-3xl">
          <Button variant="ghost" onClick={onClose} className="sm:flex-1 md:flex-none">
            Cancel
          </Button>
          <Button 
            className={`pl-4 sm:flex-1 md:flex-none text-white border-transparent ${selectedMethod === "whatsapp" ? "bg-success hover:bg-success-dark shadow-[0_0_8px_rgba(34,197,94,0.3)]" : "bg-brand hover:bg-brand-dark shadow-[0_0_8px_rgba(37,99,235,0.3)]"}`}
            variant="default"
            onClick={() => {
              // Action triggers
              onClose();
            }}
          >
            <Send size={16} className="mr-2" />
            Send Now
          </Button>
        </div>
      </div>
    </div>
  );
}
