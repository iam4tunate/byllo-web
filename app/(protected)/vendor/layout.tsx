"use client";

import { Sidebar, type NavItemConfig } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ChevronRight, Home, Bell, FileText, Users, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { SessionLoader } from "@/components/SessionLoader";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navGroups: { title: string; items: NavItemConfig[] }[] = [
    {
      title: "Overview",
      items: [
        { href: "/vendor/dashboard", icon: Home, label: "Dashboard" },
        {
          href: "/vendor/notifications",
          icon: Bell,
          label: "Notifications",
          badge: 2,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          href: "/vendor/invoices",
          icon: FileText,
          label: "Invoices",
          badge: 3,
        },
        { href: "/vendor/clients", icon: Users, label: "Clients" },
        // { href: "/vendor/reports", icon: "bar-chart", label: "Reports" },
      ],
    },
  ];

  const bottomItems: NavItemConfig[] = [
    { href: "/vendor/settings", icon: Settings, label: "Settings" },
  ];

  // Helper to get active page title
  const renderBreadcrumbs = () => {
    const parts = pathname.split("/").filter(Boolean); // e.g. ["vendor", "invoices", "new"]
    const crumbs: React.ReactNode[] = [];
    crumbs.push(
      <span key="home" className="text-muted">
        Home
      </span>,
    );

    if (parts.length > 1) {
      const p1 = parts[1]; // "dashboard", "invoices"
      const sectionName = p1.charAt(0).toUpperCase() + p1.slice(1);

      crumbs.push(
        <ChevronRight
          key="sep1"
          size={14}
          className="text-muted mx-1"
          strokeWidth={3}
        />,
      );

      if (parts.length === 2) {
        crumbs.push(
          <span key="sec" className="text-primary">
            {sectionName}
          </span>,
        );
      } else {
        const sectionSingular = sectionName.endsWith("s")
          ? sectionName.slice(0, -1)
          : sectionName;
        crumbs.push(
          <span key="sec" className="text-muted">
            {sectionSingular}
          </span>,
        );
        crumbs.push(
          <ChevronRight
            key="sep2"
            size={14}
            className="text-muted mx-1"
            strokeWidth={3}
          />,
        );

        const p2 = parts[2];
        const label = p2 === "new" ? "Create" : p2;

        if (parts.length > 3 && parts[3] === "edit") {
          crumbs.push(
            <span key="p2" className="text-muted">
              {label}
            </span>,
          );
          crumbs.push(
            <ChevronRight
              key="sep3"
              size={14}
              className="text-muted mx-1"
              strokeWidth={3}
            />,
          );
          crumbs.push(
            <span key="p3" className="text-primary">
              Edit
            </span>,
          );
        } else {
          crumbs.push(
            <span key="p2" className="text-primary">
              {label}
            </span>,
          );
        }
      }
    }
    return <div className="flex items-center text-sm font-bold">{crumbs}</div>;
  };

  const pageTitle = renderBreadcrumbs();

  return (
    <SessionLoader>
      <div className="flex min-h-screen bg-surface-raised w-full relative">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Component */}
        <Sidebar
          navGroups={navGroups}
          bottomItems={bottomItems}
          onClose={() => setIsMobileMenuOpen(false)}
          className={
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        />

        {/* Main area */}
        <div className="flex-1 flex flex-col lg:ml-64 min-h-screen w-full min-w-0">
          <Header
            pageTitle={pageTitle}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />

          {/* Page content */}
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </SessionLoader>
  );
}
