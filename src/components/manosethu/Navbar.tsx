import React, { useState, useEffect, useRef } from "react";
import { getGsap } from "@/utils/gsap";
import {
  Sparkles,
  Activity,
  Mic,
  Brain,
  ShieldCheck,
  PhoneCall,
  ChevronDown,
  ArrowRight,
  Layers,
  HeartHandshake,
} from "lucide-react";

interface NavbarProps {
  darkMode?: boolean;
}

export function Navbar({ darkMode = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOverviewMenuOpen, setIsOverviewMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // GSAP entrance animation for Navbar
    let isMounted = true;
    getGsap().then((gsapModules) => {
      if (!gsapModules || !isMounted || !navRef.current) return;
      const { gsap } = gsapModules;
      gsap.fromTo(
        navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 }
      );
    });

    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close sub-menu on outside click or ESC
  useEffect(() => {
    if (!isOverviewMenuOpen) return;
    const handleDown = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuTriggerRef.current &&
        !menuTriggerRef.current.contains(e.target as Node)
      ) {
        setIsOverviewMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOverviewMenuOpen(false);
    };
    document.addEventListener("mousedown", handleDown);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleDown);
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOverviewMenuOpen]);

  const navLinks = [
    { label: "Journey", href: "#journey" },
    { label: "Reality", href: "#reality" },
    { label: "System", href: "#system" },
    { label: "Features", href: "#features" },
    { label: "Human Oversight", href: "#oversight" },
  ];

  const featureItems = [
    {
      title: "Emotion AI & Linguistic Signals",
      desc: "Multi-axis affective polarity tracking across regional dialogue.",
      icon: HeartHandshake,
      href: "#features",
    },
    {
      title: "Voice Stress Analytics",
      desc: "Fundamental frequency tremor & response pause duration analysis.",
      icon: Mic,
      href: "#features",
    },
    {
      title: "Dynamic Distress Scoring",
      desc: "Transparent 0–100 mathematical model with 4 risk bands.",
      icon: Activity,
      href: "#system",
    },
    {
      title: "Explainable AI (XAI) Alerts",
      desc: "Interpretable signal attribution dispatched to certified caseworkers.",
      icon: Brain,
      href: "#features",
    },
    {
      title: "Predictive Escalation Engine",
      desc: "Anticipating non-linear spikes before legal hearings or inquiries.",
      icon: Sparkles,
      href: "#features",
    },
    {
      title: "Human Decisional Desk",
      desc: "6 human-controlled support actions with complete audit trails.",
      icon: ShieldCheck,
      href: "#oversight",
    },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 spring-bounce ${
        scrolled ? "py-3 md:py-3.5" : "py-6 md:py-8"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between transition-all duration-500 spring-bounce ${
          scrolled
            ? "apple-glass-nav rounded-2xl py-2.5 mx-4 md:mx-auto shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Official Approved SVG Logo */}
        <a
          href="#"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B9C91] rounded-lg apple-press group"
          aria-label="Manosethu Home"
        >
          <img
            src="/logos/manosethu-logo.svg"
            alt="Manosethu"
            className="h-11 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 spring-bounce group-hover:scale-[1.02]"
            style={darkMode ? { filter: "brightness(0) saturate(0) invert(1)" } : undefined}
          />
        </a>

        {/* Navigation with Apple Fluid Hover Pills */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 p-1 rounded-full" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`apple-press px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.14em] font-semibold transition-all duration-200 ${
                darkMode
                  ? "text-[#9ab5ca] hover:text-[#dce8f0] hover:bg-white/[0.08]"
                  : "text-[#5A6E82] hover:text-[#173B63] hover:bg-[#173B63]/[0.05]"
              }`}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* System & Explore Actions */}
        <div className="relative flex items-center gap-2 sm:gap-2.5">
          <a
            href="/system"
            className="apple-press inline-flex items-center gap-1.5 text-[11.5px] font-bold tracking-[0.1em] uppercase px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-full bg-[#173B63] text-white hover:bg-[#12263A] transition-all duration-200 shadow-xs ring-2 ring-[#2B9C91]/30"
          >
            <span className="h-2 w-2 rounded-full bg-[#2B9C91] animate-pulse" />
            <span>Access MANOSETHU</span>
          </a>

          {/* Sub-menu Trigger: OVERVIEW with Features Dropdown */}
          <button
            ref={menuTriggerRef}
            type="button"
            onClick={() => setIsOverviewMenuOpen((prev) => !prev)}
            aria-expanded={isOverviewMenuOpen}
            className={`apple-press hidden sm:inline-flex items-center gap-1.5 text-[11.5px] font-semibold tracking-[0.14em] uppercase px-4 py-2 sm:py-2.5 rounded-full border transition-all duration-200 ${
              isOverviewMenuOpen
                ? "bg-[#173B63] text-white border-[#173B63] shadow-sm"
                : darkMode
                  ? "bg-white/10 hover:bg-white/15 text-[#dce8f0] border-white/15 shadow-sm"
                  : "bg-white/90 hover:bg-white text-[#173B63] border-[#173B63]/15 hover:border-[#173B63]/30 shadow-xs"
            }`}
          >
            <span>Overview</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                isOverviewMenuOpen ? "rotate-180 text-[#2B9C91]" : "text-[#2B9C91]"
              }`}
            />
          </button>

          {/* Interactive Features Sub-Menu (Mega-Dropdown) */}
          {isOverviewMenuOpen && (
            <div
              ref={menuRef}
              className={`absolute right-0 top-full mt-3 w-[360px] sm:w-[460px] rounded-3xl border shadow-2xl p-5 z-50 backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95 ${
                darkMode
                  ? "bg-[#0b1b33]/95 border-white/15 text-[#d4e4f2] shadow-black/60"
                  : "bg-white/95 border-[#E1E6E2] text-[#12263A] shadow-xl shadow-[#173B63]/10"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E1E6E2]/60 dark:border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-[#2B9C91]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#173B63] dark:text-white">
                    Platform Features &amp; Architecture
                  </span>
                </div>
                <span className="rounded-full bg-[#E8F5F3] dark:bg-[#2B9C91]/20 px-2 py-0.5 text-[9px] font-bold text-[#2B9C91]">
                  PLATFORM
                </span>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featureItems.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <a
                      key={i}
                      href={f.href}
                      onClick={() => setIsOverviewMenuOpen(false)}
                      className={`group rounded-2xl p-3 border transition-all text-left block ${
                        darkMode
                          ? "border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#2B9C91]/40"
                          : "border-[#E1E6E2]/70 bg-[#FAFBF9] hover:bg-[#E8F5F3]/50 hover:border-[#2B9C91]/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1 rounded-lg bg-[#2B9C91]/10 text-[#2B9C91]">
                          <Icon size={14} />
                        </div>
                        <span className="text-xs font-bold text-[#173B63] dark:text-white group-hover:text-[#2B9C91] transition-colors leading-tight">
                          {f.title}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#5A6E82] dark:text-[#9ab5ca] leading-relaxed line-clamp-2">
                        {f.desc}
                      </p>
                    </a>
                  );
                })}
              </div>

              {/* Bottom Quick Action Strip */}
              <div className="mt-4 pt-3 border-t border-[#E1E6E2]/60 dark:border-white/10 flex items-center justify-between gap-3">
                <a
                  href="#journey"
                  onClick={() => setIsOverviewMenuOpen(false)}
                  className="text-xs font-semibold text-[#5A6E82] dark:text-[#9ab5ca] hover:text-[#173B63] dark:hover:text-white transition-colors"
                >
                  Scroll 5 Stages ↓
                </a>

                <a
                  href="/system"
                  onClick={() => setIsOverviewMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#173B63] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#12263A] transition-all shadow-xs"
                >
                  <span>Launch System</span>
                  <ArrowRight size={12} className="text-[#2B9C91]" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
