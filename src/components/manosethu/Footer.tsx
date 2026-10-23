import React from "react";

export function Footer() {
  const links = [
    { label: "The Problem", href: "#problem" },
    { label: "The Journey", href: "#journey" },
    { label: "System Concept", href: "#system" },
    { label: "Intelligence", href: "#intelligence" },
    { label: "AI & Human", href: "#human-support" },
    { label: "Trust & Ethics", href: "#trust" },
  ];

  return (
    <footer className="bg-[#F6F7F5] border-t border-[#E1E6E2] py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 hairline-b">
          {/* Approved Logo & Tagline */}
          <div className="space-y-3">
            <a href="#" className="inline-block" aria-label="Manosethu Home">
              <img
                src="/manosethu-logo.jpg"
                alt="Manosethu Logo"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </a>
            <p className="text-xs text-[#5A6E82]">
              AI-assisted mental health monitoring and distress prediction system
            </p>
          </div>

          {/* Minimal Navigation Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer Navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-mono uppercase tracking-wider text-[#5A6E82] hover:text-[#173B63] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Metadata & Disclaimer */}
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-[#5A6E82]">
          <div className="space-x-3">
            <span className="font-semibold text-[#173B63]">MANOSETHU PLATFORM</span>
            <span className="text-[#E1E6E2]">|</span>
            <span>Continuous Psychological Wellbeing &amp; Distress Monitoring</span>
            <span className="text-[#E1E6E2]">|</span>
            <span>Dignity &amp; Privacy First</span>
          </div>

          <div className="text-[11px] text-[#5A6E82]">
            AI assists. Humans decide. People receive support.
          </div>
        </div>
      </div>
    </footer>
  );
}
