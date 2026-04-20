"use client";

import { Card } from "@/components";
import { Avatar, AvatarFallback } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { ClientFormData, ClientModal } from "@/components/ClientModal";
import { EmptyState } from "@/components/EmptyState";
import { Plus, Search, Edit2, Mail, Phone, MapPin, Users } from "lucide-react";
import { clients } from "@/lib/vendor-data";
import Link from "next/link";
import { useState } from "react";
import { authApi } from "@/lib/api/auth";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientFormData | null>(
    null,
  );

  const handleCreateNew = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleEdit = (client: (typeof clients)[0]) => {
    setEditingClient({
      id: client.id.toString(),
      name: client.name,
      email: client.email,
      phone: client.phone,
      billingAddress: client.address,
    });
    setIsModalOpen(true);
  };

  const handleSaveClient = (data: ClientFormData) => {
    console.log("data", data);
    // await authApi.(data);
  };

  const filteredClients = clients.filter((client) => {
    const q = search.toLowerCase();
    return (
      client.name.toLowerCase().includes(q) ||
      client.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex max-md:flex-col items-center justify-between gap-4">
        <div className="max-md:text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-1">
            Client Directory
          </h1>
          <p className="text-sm font-medium text-muted">
            Manage your customer relationships and contact history.
          </p>
        </div>
        <Button
          className="shadow-lg shadow-brand/25 transition-transform hover:-translate-y-0.5 gap-2 h-12 px-6 w-full sm:w-auto"
          onClick={handleCreateNew}
        >
          <Plus size={18} color="white" strokeWidth={2.5} />
          Add New Client
        </Button>
      </div>

      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={16} color="#8C95A6" strokeWidth={2.5} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by client name or email..."
          className="w-full h-12 bg-surface-raised rounded-lg pl-11 pr-4 text-sm font-medium text-primary placeholder:text-muted focus:outline-none focus:bg-white focus:border focus:border-brand shadow-xs border border-surface-border"
        />
      </div>

      {/* ── Stats Overview ── */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-brand rounded-full" />
          <p className="text-sm font-bold text-primary uppercase tracking-widest">
            {filteredClients.length} Total Clients
          </p>
        </div>
      </div>

      {/* ── Client Cards Grid ── */}
      {filteredClients.length === 0 ? (
        <EmptyState
          icon={Users}
          entityName="clients"
          isSearchActive={search.trim() !== ""}
          className="bg-surface border border-surface-border rounded-2xl"
          onClearSearch={() => setSearch("")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card
              key={client.id}
              className="group hover:shadow-brand/5 hover:border-brand/30 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card Header (Stats + Cover) */}
              <div className="h-24 bg-linear-to-r from-surface-raised to-surface relative p-6 flex justify-between items-start border-b border-surface-border group-hover:from-brand/5 group-hover:to-transparent transition-colors duration-500">
                <Badge
                  variant={client.status === "active" ? "brand" : "secondary"}
                >
                  {client.status === "active" ? "Active" : "Inactive"}
                </Badge>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(client)}
                    className="w-8 h-8 rounded-full bg-white border border-surface-border flex items-center justify-center text-muted hover:text-brand hover:border-brand shadow-sm transition-colors"
                  >
                    <Edit2 size={14} color="currentColor" strokeWidth={2.5} />
                  </button>
                  <Link
                    href={`/vendor/invoices/new?clientId=${client.id}`}
                    className="h-8 px-3 rounded-full bg-white border border-surface-border flex items-center justify-center text-muted hover:text-brand hover:border-brand shadow-sm transition-colors gap-1.5 text-[11px] font-bold"
                  >
                    <Plus size={14} color="currentColor" strokeWidth={3} />
                    Invoice
                  </Link>
                </div>
              </div>

              {/* Avatar Drop (Overlaps header) */}
              <div className="px-6 relative -top-10 -mb-8">
                <Avatar className="w-12 h-12 rounded-lg border-4 border-surface shadow-sm">
                  <AvatarFallback className={`${client.bgClass} rounded-lg`}>
                    <span className="text-white text-xl font-extrabold focus:outline-none">
                      {client.initials}
                    </span>
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Client Info */}
              <div className="px-6 pb-6 pt-2">
                <h3 className="text-lg md:text-xl font-extrabold text-primary mb-1 group-hover:text-brand transition-colors">
                  {client.name}
                </h3>
                <div className="space-y-1 mt-4">
                  <div className="flex items-center gap-3 text-muted">
                    <div className="w-7 h-7 bg-surface-raised rounded-lg flex items-center justify-center">
                      <Mail size={14} color="currentColor" strokeWidth={2} />
                    </div>
                    <span className="text-[13px] font-medium truncate">
                      {client.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-muted">
                    <div className="w-7 h-7 bg-surface-raised rounded-lg flex items-center justify-center">
                      <Phone size={14} color="currentColor" strokeWidth={2} />
                    </div>
                    <span className="text-[13px] font-medium truncate">
                      {client.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-muted">
                    <div className="w-7 h-7 bg-surface-raised rounded-lg flex items-center justify-center">
                      <MapPin size={14} color="currentColor" strokeWidth={2} />
                    </div>
                    <span className="text-[13px] font-medium truncate">
                      {client.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* CRM Metrics Footer */}
              <div className="bg-surface-raised/50 border-t border-surface-border p-4 grid grid-cols-2 gap-4 divide-x divide-surface-border">
                <div className="px-2">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
                    Invoices
                  </p>
                  <p className="text-base md:text-lg font-extrabold text-primary">
                    {client.totalInvoices}
                  </p>
                </div>
                <div className="px-2 pl-4">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
                    Total Volume
                  </p>
                  <p className="text-base md:text-lg font-extrabold text-primary">
                    ₦{client.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveClient}
        initialData={editingClient}
      />
    </div>
  );
}
