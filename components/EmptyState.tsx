import { Button } from "@/components/Button";
import { LucideIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

export interface EmptyStateProps {
  icon: LucideIcon;
  entityName: string;
  isSearchActive: boolean;
  onClearSearch?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  searchDescription?: string;
  emptyDescription?: string;
  className?: string;
}

export function EmptyState({
  icon: IconComponent,
  entityName,
  isSearchActive,
  onClearSearch,
  onAction,
  actionLabel,
  searchDescription,
  emptyDescription,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-20 text-center animate-in fade-in",
        className
      )}
    >
      <div className="w-16 h-16 bg-surface-input rounded-full flex items-center justify-center mb-4 shadow-inner">
        {isSearchActive ? (
          <Search size={32} color="#A0A8C0" strokeWidth={2} />
        ) : (
          <IconComponent size={32} color="#A0A8C0" strokeWidth={2} />
        )}
      </div>
      
      <h3 className="text-lg font-bold text-primary mb-2">
        {isSearchActive ? `No ${entityName} found` : `No ${entityName} yet`}
      </h3>
      
      <p className="text-sm font-medium text-muted max-w-sm mb-4">
        {isSearchActive
          ? searchDescription || `We couldn't find any ${entityName} matching your search query.`
          : emptyDescription || `You don't have any ${entityName} recorded yet. Create your first one to get started.`}
      </p>

      {isSearchActive ? (
        onClearSearch && (
          <Button variant="outline" onClick={onClearSearch}>
            Clear Filters
          </Button>
        )
      ) : (
        onAction && actionLabel && (
          <Button onClick={onAction}>
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
}
