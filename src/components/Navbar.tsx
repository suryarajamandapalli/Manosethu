import { Link, useRouterState, useLoaderData } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Shield } from "lucide-react";
import { DEFAULT_GLOBAL } from "@/lib/cms-defaults";
import { subscribeToGlobalChanges } from "@/lib/cms";

export function Navbar() {
  const rootData = useLoaderData({ from: "__root__" }) as { globalSettings: typeof DEFAULT_GLOBAL } | undefined;
  const [global, setGlobal] = useState<any>(rootData?.globalSettings || DEFAULT_GLOBAL);

  useEffect(() => {
    if (rootData?.globalSettings) {
      setGlobal(rootData.globalSettings);
    }
  }, [rootData]);

  useEffect(() => {
    const unsub = subscribeToGlobalChanges((data) => {
      if (data) setGlobal(data);
    });

    return () => unsub();
  }, []);

  const logoText = global.logo || "MANOSETHU";
  
  const rawNav = Array.isArray(global.navbar) && global.navbar.length > 0
    ? global.navbar
    : DEFAULT_GLOBAL.navbar;

  const parsedLinks = (rawNav || [])
    .filter((l: any) => l && !l.hidden && l.label && l.href)
    .map((l: any) => ({ to: l.href, label: l.label }));

  const links: { to: string; label: string }[] = parsedLinks.length > 0
    ? parsedLinks
    : DEFAULT_GLOBAL.navbar.map((l) => ({ to: l.href, label: l.label }));

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2.5" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md border border-[#E1E6E2] shadow-[0_4px_20px_-4px_rgba(23,59,99,0.08)]"
              : "bg-white/90 backdrop-blur-md border border-[#E1E6E2]/80 shadow-[0_2px_12px_-2px_rgba(23,59,99,0.04)]"
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/logos/manosethu-logo.svg"
              alt="MANOSETHU"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors rounded-lg ${
                    active
                      ? "text-[#173B63] bg-[#173B63]/5 font-bold"
                      : "text-[#4A5E73] hover:text-[#173B63] hover:bg-[#F6F7F5]"
                  }`}
                >
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              to="/system"
              className="group relative inline-flex items-center gap-2 rounded-full bg-[#173B63] hover:bg-[#12263A] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all duration-200"
            >
              <span>ACCESS SYSTEM</span>
              <ArrowRight size={13} className="text-[#2B9C91] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 text-[#173B63] hover:bg-[#F6F7F5] rounded-xl transition-colors"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 rounded-2xl p-4 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md border border-[#E1E6E2] shadow-xl text-[#12263A]"
            >
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === l.to
                      ? "bg-[#173B63] text-white"
                      : "text-[#4A5E73] hover:bg-[#F6F7F5] hover:text-[#173B63]"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/system"
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-[#173B63] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs"
              >
                <span>ACCESS SYSTEM</span>
                <ArrowRight size={14} className="text-[#2B9C91]" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
