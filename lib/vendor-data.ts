// ── Vendor dashboard data constants (ported from mobile lib/constants.ts) ──
import { FileText, Users, Target, AlertCircle, TrendingUp } from "lucide-react";

export const recentActivity = [
  {
    type: "payment",
    title: "Payment received",
    client: "Apple Inc.",
    amount: "+₦1,967.50",
    time: "2h ago",
    positive: true,
  },
  {
    type: "invoice",
    title: "Invoice created",
    client: "Tech Corp",
    amount: "₦2,500.00",
    time: "5h ago",
    positive: false,
  },
  {
    type: "payment",
    title: "Payment received",
    client: "StartupXYZ",
    amount: "+₦4,200.00",
    time: "1d ago",
    positive: true,
  },
];

export const recentInvoices = [
  {
    id: "00864",
    client: "Apple Inc.",
    amount: 1967.5,
    status: "paid",
    date: "14 Jan 2025",
  },
  {
    id: "00863",
    client: "Tech Corp",
    amount: 2500.0,
    status: "open",
    date: "13 Jan 2025",
  },
  {
    id: "00862",
    client: "StartupXYZ",
    amount: 4200.0,
    status: "paid",
    date: "12 Jan 2025",
  },
];

export const invoices = [
  { id: "00864", title: "Website Redesign", client: "Apple Inc.", amount: 1967.5, status: "paid", date: "14 Jan 2025" },
  { id: "00863", title: "Monthly Retainer", client: "Tech Corp", amount: 2500.0, status: "open", date: "13 Jan 2025" },
  { id: "00862", title: "Brand Identity", client: "StartupXYZ", amount: 4200.0, status: "paid", date: "12 Jan 2025" },
  { id: "00861", title: "SEO Optimization", client: "Design Studio", amount: 1500.0, status: "open", date: "10 Jan 2025" },
  { id: "00860", title: "Social Media Ads", client: "Marketing Co", amount: 2100.0, status: "paid", date: "08 Jan 2025" },
  { id: "00859", title: "Consulting Hours", client: "Tech Corp", amount: 3000.0, status: "paid", date: "05 Jan 2025" },
  { id: "00858", title: "Mobile App Dev", client: "StartupXYZ", amount: 8500.0, status: "open", date: "02 Jan 2025" },
];

export const topClients = [
  {
    name: "Apple Inc.",
    totalAmount: 24500,
    invoices: 12,
    growth: "+15%",
    initials: "AI",
    bgClass: "bg-brand",
  },
  {
    name: "Tech Corp",
    totalAmount: 18400,
    invoices: 8,
    growth: "+22%",
    initials: "TC",
    bgClass: "bg-purple-500",
  },
  {
    name: "StartupXYZ",
    totalAmount: 15900,
    invoices: 6,
    growth: "+8%",
    initials: "SX",
    bgClass: "bg-warning",
  },
];

export const clients = [
  {
    id: 1,
    name: "Apple Inc.",
    email: "contact@apple.com",
    phone: "+1 408 996 1010",
    address: "One Apple Park Way, Cupertino, CA",
    totalInvoices: 12,
    totalAmount: 24500.0,
    initials: "AI",
    bgClass: "bg-brand",
    status: "active"
  },
  {
    id: 2,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    phone: "+1 234 567 8900",
    address: "2972 Westheimer Rd. Santa Ana",
    totalInvoices: 8,
    totalAmount: 12800.0,
    initials: "EH",
    bgClass: "bg-success",
    status: "active"
  },
  {
    id: 3,
    name: "Tech Corp",
    email: "info@techcorp.com",
    phone: "+1 555 123 4567",
    address: "123 Tech Street, San Francisco",
    totalInvoices: 15,
    totalAmount: 38400.0,
    initials: "TC",
    bgClass: "bg-purple-500",
    status: "active"
  },
  {
    id: 4,
    name: "StartupXYZ",
    email: "hello@startupxyz.com",
    phone: "+1 555 987 6543",
    address: "456 Innovation Ave, Austin",
    totalInvoices: 6,
    totalAmount: 18900.0,
    initials: "SX",
    bgClass: "bg-orange-500",
    status: "inactive"
  },
  {
    id: 5,
    name: "Design Studio",
    email: "hello@designstudio.io",
    phone: "+44 20 7946 0958",
    address: "24 Creative Row, London",
    totalInvoices: 4,
    totalAmount: 6200.0,
    initials: "DS",
    bgClass: "bg-danger",
    status: "active"
  },
  {
    id: 6,
    name: "Marketing Co",
    email: "campaigns@mktg.co",
    phone: "+1 212 555 0199",
    address: "782 Broadway, New York, NY",
    totalInvoices: 9,
    totalAmount: 15600.0,
    initials: "MC",
    bgClass: "bg-warning",
    status: "active"
  }
];

export const upcomingPayments = [
  {
    client: "Tech Corp",
    amount: 2500,
    dueDate: "Jan 20",
    daysLeft: 6,
    status: "due-soon",
  },
  {
    client: "Design Studio",
    amount: 3200,
    dueDate: "Jan 25",
    daysLeft: 11,
    status: "upcoming",
  },
  {
    client: "Marketing Co",
    amount: 1800,
    dueDate: "Jan 18",
    daysLeft: 4,
    status: "overdue",
  },
];

export const quickActions = [
  {
    label: "Create Invoice",
    bg: "bg-brand",
    href: "/vendor/invoices/new",
    icon: FileText,
  },
  {
    label: "Add Client",
    bg: "bg-purple-500",
    href: "/vendor/clients/new",
    icon: Users,
  },
];

export const aiInsights = [
  {
    icon: Target,
    title: "Pricing Opportunity",
    body: "Consider a +10% rate increase — market data shows strong demand.",
  },
  {
    icon: AlertCircle,
    title: "Payment Alert",
    body: "2 invoices overdue from Tech Corp. Send a reminder now.",
  },
  {
    icon: TrendingUp,
    title: "Best Send Time",
    body: "Tuesday 10 AM yields 23% faster payments. Schedule invoices.",
  },
];

export const notifications = [
  { id: 1, title: "Invoice INV-00864 Paid", time: "10 min ago", type: "success" as const, unread: true },
  { id: 2, title: "Invoice Overdue", time: "2 hours ago", type: "warning" as const, unread: true },
  { id: 3, title: "New Client Imported", time: "Yesterday", type: "info" as const, unread: false },
];
