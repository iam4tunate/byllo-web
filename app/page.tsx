"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ArrowUpRight,
  Menu,
  X,
  Phone,
  Users,
  Check,
  FileText,
  BarChart,
  Zap,
  Lock,
} from "lucide-react";

/* ─── Tiny helpers ──────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Animated counter ──────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView(0.3);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= to) {
        setVal(to);
        clearInterval(id);
      } else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Marquee row ─────────────────────────────────────────────────── */
const LOGOS = [
  "Stripe",
  "Paystack",
  "Flutterwave",
  "Payoneer",
  "Wave",
  "Moniepoint",
];
function Marquee() {
  return (
    <div className="relative overflow-hidden w-full py-4">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-[#060b0a] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-[#060b0a] to-transparent pointer-events-none" />
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {[...LOGOS, ...LOGOS].map((l, i) => (
          <span
            key={i}
            className="text-white/20 font-black text-lg tracking-widest uppercase select-none"
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature card ──────────────────────────────────────────────────── */
function FeatureCard({
  icon: IconComp,
  title,
  desc,
  accent = false,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`group relative rounded-3xl p-8 border transition-all duration-500 cursor-default overflow-hidden
      ${
        accent
          ? "bg-brand border-brand text-white"
          : "bg-white/3 border-white/7 text-white hover:bg-white/6 hover:border-white/12"
      }`}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl
        ${accent ? "" : "bg-linear-to-br from-brand/5 to-transparent"}`}
      />

      <div
        className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300
        ${accent ? "bg-white/20" : "bg-brand/10"}`}
      >
        <IconComp size={22} className={accent ? "text-white" : "text-brand"} />
      </div>

      <h3 className="text-lg font-bold mb-2 tracking-tight">{title}</h3>
      <p
        className={`text-sm leading-relaxed ${accent ? "text-white/70" : "text-white/40"}`}
      >
        {desc}
      </p>

      <div
        className={`absolute bottom-6 right-6 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2
        ${accent ? "text-white/60" : "text-brand"}`}
      >
        <ArrowUpRight size={18} />
      </div>
    </div>
  );
}

/* ─── Testimonial card ──────────────────────────────────────────────── */
function Testimonial({
  quote,
  name,
  role,
  avatar,
}: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}) {
  return (
    <div className="bg-white/3 border border-white/7 rounded-3xl p-8 space-y-6 hover:bg-white/5 transition-colors duration-300">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-brand fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-white/60 text-sm leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-sm">
          {avatar}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{name}</p>
          <p className="text-white/40 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────── */
export default function Home() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { ref: featuresRef, inView: featuresInView } = useInView(0.1);
  const { ref: statsRef, inView: statsInView } = useInView(0.2);
  const { ref: howRef, inView: howInView } = useInView(0.1);
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView(0.1);

  return (
    <div className="flex flex-col min-h-screen bg-[#060b0a] overflow-x-hidden font-sans text-white">
      {/* ─── Navbar ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? "bg-[#060b0a]/90 backdrop-blur-xl border-b border-white/6 py-3" : "py-5"}`}
      >
        <div className="container mx-auto flex h-auto items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-black text-base tracking-tighter">
                B
              </span>
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              byllo
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how" },
              { label: "Pricing", href: "#pricing" },
              { label: "Testimonials", href: "#testimonials" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            {session ? (
              <Link href="/vendor/dashboard">
                <button className="hidden sm:flex items-center gap-2 bg-brand hover:bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.02]">
                  Dashboard
                  <ArrowUpRight size={14} />
                </button>
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden sm:block text-sm font-medium text-white/50 hover:text-white transition-colors"
                >
                  Sign in
                </Link>
                <Link href="/signup">
                  <button className="hidden sm:flex items-center gap-2 bg-brand hover:bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.02]">
                    Start for free
                    <ArrowUpRight size={14} />
                  </button>
                </Link>
              </>
            )}
            <button
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#060b0a]/95 backdrop-blur-xl border-t border-white/6 px-6 py-6 space-y-5 animate-in fade-in slide-in-from-top-4">
            {[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how" },
              { label: "Pricing", href: "#pricing" },
              { label: "Testimonials", href: "#testimonials" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-sm font-medium text-white/70 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/6 flex gap-3">
              {session ? (
                <Link href="/vendor/dashboard" className="flex-1">
                  <button className="w-full text-sm font-bold text-white bg-brand py-2.5 rounded-full hover:bg-blue-500 transition-colors">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/sign-in" className="flex-1">
                    <button className="w-full text-sm font-bold text-white border border-white/10 py-2.5 rounded-full hover:bg-white/5 transition-colors">
                      Sign in
                    </button>
                  </Link>
                  <Link href="/signup" className="flex-1">
                    <button className="w-full text-sm font-bold text-white bg-brand py-2.5 rounded-full hover:bg-blue-500 transition-colors">
                      Get started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* ─── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand/10 rounded-full blur-[120px]" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px]" />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="container mx-auto px-6 text-center relative z-10 max-w-5xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-white/60 mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              2,000+ vendors already growing with Byllo
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              Stop managing <br className="hidden sm:block" />
              clients on{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-brand to-[#60a5fa]">
                  WhatsApp
                </span>
                {/* strikethrough decoration */}
                <span className="absolute top-1/2 left-0 right-0 h-[3px] bg-red-500/60 -rotate-2 rounded-full z-20" />
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl mx-auto text-lg text-white/50 leading-relaxed mb-10">
              Byllo is the all-in-one platform that gives vendors a professional
              way to manage clients, send invoices, and track payments — no
              spreadsheets, no WhatsApp chaos.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              {session ? (
                <Link href="/vendor/dashboard">
                  <button className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.03] w-full sm:w-auto">
                    Take me to dashboard
                    <ArrowUpRight size={16} />
                  </button>
                </Link>
              ) : (
                <Link href="/signup">
                  <button className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.03] w-full sm:w-auto">
                    Get started free
                    <ArrowUpRight size={16} />
                  </button>
                </Link>
              )}
              <button className="flex items-center justify-center gap-2 text-white/60 hover:text-white font-semibold text-base px-8 py-4 rounded-full border border-white/8 hover:border-white/20 transition-all duration-200 w-full sm:w-auto backdrop-blur-sm hover:bg-white/5">
                <Phone size={16} />
                Watch demo
              </button>
            </div>

            {/* Dashboard hero image */}
            <div className="relative mx-auto max-w-5xl group">
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-brand/20 rounded-[3rem] blur-[60px] opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              {/* Card frame */}
              <div className="relative bg-linear-to-b from-white/7 to-white/2 border border-white/10 rounded-[2.5rem] p-2 shadow-2xl backdrop-blur-sm">
                <div className="absolute top-4 left-6 flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <Image
                  src="/dashboard-screenshot.png"
                  alt="Byllo vendor dashboard"
                  width={1200}
                  height={720}
                  className="rounded-4xl w-full border border-white/5 group-hover:scale-[1.01] transition-transform duration-700"
                  priority
                />
                {/* Floating pill - top right */}
                <div className="absolute -top-5 -right-4 sm:-right-8 bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 animate-float">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  Invoice sent ✓
                </div>
                {/* Floating pill - bottom left */}
                <div className="absolute -bottom-5 -left-4 sm:-left-8 bg-[#1a2a3a] border border-white/10 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-float-slow backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center font-bold text-xs shrink-0">
                    A
                  </div>
                  <div>
                    <p className="text-white font-bold">Amaka Obi</p>
                    <p className="text-white/40 text-[10px]">
                      Paid ₦45,000 just now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Logo marquee ──────────────────────────────────────────────── */}
        <section className="py-12 border-y border-white/5 bg-[#060b0a]">
          <p className="text-center text-xs font-bold text-white/20 uppercase tracking-widest mb-8">
            Integrates with the tools you already use
          </p>
          <Marquee />
        </section>

        {/* ─── Stats strip ───────────────────────────────────────────────── */}
        <section className="py-20 bg-[#060b0a]">
          <div
            ref={statsRef}
            className={`container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {[
              { value: 2000, suffix: "+", label: "Vendors onboarded" },
              { value: 98, suffix: "%", label: "Invoice collection rate" },
              { value: 450, suffix: "M+", label: "₦ processed monthly" },
              { value: 4, suffix: ".9★", label: "Average vendor rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl lg:text-5xl font-black text-white mb-2">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-white/40 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Features ──────────────────────────────────────────────────── */}
        <section id="features" className="py-28 bg-[#060b0a]">
          <div
            ref={featuresRef}
            className={`container mx-auto px-6 transition-all duration-1000 ${featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="max-w-2xl mb-16">
              <p className="text-brand text-xs font-bold uppercase tracking-widest mb-4">
                What Byllo does
              </p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                Every tool a vendor needs. In one place.
              </h2>
              <p className="text-white/40 text-lg leading-relaxed">
                Forget juggling WhatsApp messages, Excel sheets, and manual bank
                transfers. Byllo brings professional-grade tools to every
                vendor.
              </p>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <FeatureCard
                icon={Users}
                title="Client Management"
                desc="Keep a clean, organized client list. Add notes, track history, and find any client instantly — no more scrolling through hundreds of WhatsApp chats."
              />
              <FeatureCard
                icon={FileText}
                title="Professional Invoicing"
                desc="Create and send beautiful invoices in seconds. Set payment terms, attach your bank details, and get notified the moment a client pays."
                accent
              />
              <FeatureCard
                icon={BarChart}
                title="Revenue Dashboard"
                desc="See exactly how much you've earned, what's pending, and which clients owe you. Real-time financial clarity at a glance."
              />
              <FeatureCard
                icon={Zap}
                title="Payment Reminders"
                desc="Automatic follow-up reminders for unpaid invoices. Stop chasing clients manually — Byllo handles the awkward conversations."
              />
              <FeatureCard
                icon={Lock}
                title="Secure & Private"
                desc="Your client data, invoices, and business records are encrypted and never shared. What happens in Byllo stays in Byllo."
              />
              <FeatureCard
                icon={Phone}
                title="Mobile-Ready"
                desc="Run your entire vendor business from your phone. Byllo looks great and works perfectly on every screen size."
              />
            </div>
          </div>
        </section>

        {/* ─── How it works ──────────────────────────────────────────────── */}
        <section
          id="how"
          className="py-28 bg-[#030706] border-y border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
          <div
            ref={howRef}
            className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${howInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-brand text-xs font-bold uppercase tracking-widest mb-4">
                Simple to get started
              </p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Up and running in minutes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Create your account",
                  desc: "Sign up in 30 seconds. No credit card needed, no complicated onboarding — just your name and email.",
                  icon: Users,
                },
                {
                  step: "02",
                  title: "Add your clients",
                  desc: "Import from your contacts or add clients manually. All their info lives in one organized, searchable place.",
                  icon: FileText,
                },
                {
                  step: "03",
                  title: "Send your first invoice",
                  desc: "Pick a client, set the amount, and hit send. Your client gets a professional invoice with your payment details instantly.",
                  icon: Zap,
                },
              ].map((item, i) => (
                <div key={i} className="relative text-center group">
                  {/* Connector line */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+48px)] right-[-50%] h-px bg-linear-to-r from-white/10 to-transparent" />
                  )}
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-3xl bg-white/4 border border-white/8 flex items-center justify-center group-hover:border-brand/40 group-hover:bg-brand/10 transition-all duration-300">
                      <item.icon size={28} className="text-brand" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand text-white text-[10px] font-black flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Pricing ──────────────────────────────────────────────────── */}
        <section id="pricing" className="py-28 bg-[#060b0a]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="text-brand text-xs font-bold uppercase tracking-widest mb-4">
                Simple pricing
              </p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                Plans that grow with you
              </h2>
              <p className="text-white/40 text-base">
                Start free. Upgrade when you need more. No hidden fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Starter */}
              <div className="bg-white/3 border border-white/7 rounded-3xl p-8 hover:border-white/12 transition-all duration-300 group">
                <div className="mb-8">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
                    Starter
                  </p>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-5xl font-black text-white">
                      ₦14.9k
                    </span>
                    <span className="text-white/30 text-sm font-medium mb-1">
                      / month
                    </span>
                  </div>
                  <p className="text-white/40 text-sm">
                    Everything you need to run your vendor business
                    professionally.
                  </p>
                </div>
                <Link href="/signup">
                  <button className="w-full py-3.5 rounded-2xl border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all duration-200 mb-8">
                    Start free trial
                  </button>
                </Link>
                <ul className="space-y-3.5">
                  {[
                    "Up to 25 clients",
                    "Unlimited invoices",
                    "Payment reminders",
                    "Revenue dashboard",
                    "Email support",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-sm text-white/50"
                    >
                      <div className="w-5 h-5 rounded-full bg-brand/15 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-brand" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro */}
              <div className="relative bg-brand rounded-3xl p-8 group overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-xs font-bold text-white/60 uppercase tracking-widest">
                      Pro
                    </p>
                    <span className="bg-white/20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
                      Most popular
                    </span>
                  </div>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-5xl font-black text-white">
                      ₦29.9k
                    </span>
                    <span className="text-white/60 text-sm font-medium mb-1">
                      / month
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mb-8">
                    Advanced features for high-volume vendors.
                  </p>
                  {session ? (
                    <Link href="/vendor/dashboard">
                      <button className="w-full py-3.5 rounded-2xl bg-white text-brand text-sm font-bold hover:bg-white/90 transition-all duration-200 mb-8 shadow-lg">
                        Go to dashboard
                      </button>
                    </Link>
                  ) : (
                    <Link href="/signup">
                      <button className="w-full py-3.5 rounded-2xl bg-white text-brand text-sm font-bold hover:bg-white/90 transition-all duration-200 mb-8 shadow-lg">
                        Get started
                      </button>
                    </Link>
                  )}
                  <ul className="space-y-3.5">
                    {[
                      "Unlimited clients",
                      "Priority analytics",
                      "Custom invoice branding",
                      "Auto payment reminders",
                      "Priority 24/7 support",
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-sm text-white/80"
                      >
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-white" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─────────────────────────────────────────────── */}
        <section
          id="testimonials"
          className="py-28 bg-[#030706] border-y border-white/5"
        >
          <div
            ref={testimonialsRef}
            className={`container mx-auto px-6 transition-all duration-1000 ${testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="text-brand text-xs font-bold uppercase tracking-widest mb-4">
                Real vendors, real results
              </p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Loved by vendors across Nigeria
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Testimonial
                quote="Before Byllo, I was chasing clients on WhatsApp for weeks. Now I send an invoice and get paid within days. It changed my business completely."
                name="Fatima Abubakar"
                role="Fabric vendor, Kano"
                avatar="F"
              />
              <Testimonial
                quote="My clients think I run a big company now. The invoices look so professional. Byllo gave me credibility I didn't have before."
                name="Chukwuemeka Okafor"
                role="Electronics dealer, Lagos"
                avatar="C"
              />
              <Testimonial
                quote="I track 40+ clients easily now. I know who has paid, who hasn't, and how much I've earned each month. This is the tool I needed."
                name="Ngozi Eze"
                role="Caterer & event vendor, Abuja"
                avatar="N"
              />
            </div>
          </div>
        </section>

        {/* ─── Final CTA ────────────────────────────────────────────────── */}
        <section className="py-32 bg-[#060b0a] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand/10 rounded-full blur-[100px]" />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
            <p className="text-brand text-xs font-bold uppercase tracking-widest mb-6">
              Ready to grow?
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6">
              Run your vendor business
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-[#60a5fa]">
                like a pro.
              </span>
            </h2>
            <p className="text-white/40 text-lg mb-10 leading-relaxed">
              Join thousands of vendors who replaced WhatsApp chaos with
              Byllo&apos;s clean, professional platform. Free to try. No card
              required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="flex items-center justify-center gap-2 bg-brand hover:bg-blue-500 text-white font-bold text-base px-10 py-4 rounded-full transition-all duration-200 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] w-full sm:w-auto">
                  Get started for free
                  <ArrowUpRight size={16} />
                </button>
              </Link>
              <Link href="/sign-in">
                <button className="text-white/50 hover:text-white font-semibold text-base px-10 py-4 rounded-full border border-white/10 hover:border-white/20 transition-all duration-200 w-full sm:w-auto">
                  I already have an account
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#030706] border-t border-white/5 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand flex items-center justify-center">
                  <span className="text-white font-black text-sm">B</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  byllo
                </span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed max-w-[260px]">
                The modern platform for vendors to manage clients and invoices
                professionally.
              </p>
              <div className="flex gap-3">
                {["twitter", "instagram", "linkedin"].map((s) => (
                  <button
                    key={s}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all text-xs font-bold uppercase"
                  >
                    {s[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Product",
                links: ["Invoicing", "Client CRM", "Dashboard", "Analytics"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              { title: "Legal", links: ["Privacy", "Terms", "Security"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-5">
                  {col.title}
                </p>
                <ul className="space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/40 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs font-medium">
              © 2026 Byllo Ltd. Built for vendors who mean business.
            </p>
            <p className="text-white/10 text-xs">Made with 🤍 in Nigeria</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
