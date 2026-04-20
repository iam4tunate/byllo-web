"use client";

import { Avatar, AvatarFallback } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { X, Search, Users, ChevronRight, Plus } from "lucide-react";
import { clients } from "@/lib/vendor-data";
import React, { useState } from "react";
import { Card } from "./Card";

export type ClientType = typeof clients[0];

interface ClientSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (client: ClientType) => void;
  onAddNewClient: () => void;
}

export function ClientSelectorModal({
  isOpen,
  onClose,
  onSelect,
  onAddNewClient,
}: ClientSelectorModalProps) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredClients = clients.filter((client) => {
    const q = search.toLowerCase();
    return (
      client.name.toLowerCase().includes(q) ||
      client.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-ink-inverse/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <Card className="relative w-full max-w-md shadow-2xl flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 h-[600px] max-h-[90vh]">
        <div className="p-6 border-b border-surface-border bg-surface-raised/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">Select a Client</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-input flex items-center justify-center text-muted hover:text-primary transition-colors focus:outline-none"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={16} color="#8C95A6" strokeWidth={2.5} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full h-11 bg-white rounded-lg pl-11 pr-4 text-sm font-medium text-primary placeholder:text-muted focus:outline-none focus:border focus:border-brand shadow-xs border border-surface-border transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
          <div className="space-y-2">
            {filteredClients.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 bg-surface-input rounded-full flex items-center justify-center mb-3">
                  <Users size={20} color="#A0A8C0" />
                </div>
                <p className="text-sm font-bold text-primary mb-1">
                  No matching clients
                </p>
                <p className="text-xs font-medium text-muted mb-4 max-w-[200px]">
                  We couldn&apos;t find anyone in your directory matching &quot;
                  {search}&quot;.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    onSelect(client);
                    onClose();
                  }}
                  className="w-full bg-surface flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-raised border border-transparent hover:border-surface-border transition-all text-left group"
                >
                  <Avatar className="w-12 h-12 rounded-xl">
                    <AvatarFallback className={`${client.bgClass} rounded-xl`}>
                      <span className="text-white text-sm font-extrabold focus:outline-none">
                        {client.initials}
                      </span>
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-primary truncate group-hover:text-brand transition-colors">
                      {client.name}
                    </h4>
                    <p className="text-[12px] font-medium text-muted truncate">
                      {client.email}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-surface-border bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight
                      size={14}
                      className="text-brand"
                      strokeWidth={2.5}
                    />
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full border-dashed border-2 border-brand/30 hover:border-brand/60 bg-brand/5 hover:bg-brand/10 text-brand gap-2"
              onClick={() => {
                onClose();
                onAddNewClient();
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              Register New Client
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
