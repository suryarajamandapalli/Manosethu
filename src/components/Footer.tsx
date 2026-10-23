import { Link, useLoaderData } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Shield,
  HeartHandshake,
} from "lucide-react";
import { DEFAULT_GLOBAL } from "@/lib/cms-defaults";

const SOCIAL_ICONS: Record<string, any> = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
};

export function Footer() {
  const rootData = useLoaderData({ from: "__root__" }) as { globalSettings: typeof DEFAULT_GLOBAL } | undefined;
  const global = rootData?.globalSettings || DEFAULT_GLOBAL;
  const logoText = global.logo || "MANOSETHU";

  return (
    <footer className="relative overflow-hidden bg-[#F6F7F5] border-t border-[#E1E6E2] text-[#12263A]">
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-[#E1E6E2]">
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logos/manosethu-logo.svg" alt="MANOSETHU" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm text-[#4A5E73] max-w-md leading-relaxed">
              ManoSethu brings together conversations, behavioural signals and longitudinal patterns to help identify changing emotional distress and connect people with timely human support.
            </p>
            <div className="space-y-2 text-xs text-[#5A6E82] pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-[#2B9C91]" />
                <span>{global.footer?.contactDetails?.address || "New Delhi, India"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#2B9C91]" />
                <span>{global.footer?.contactDetails?.email || "support@manosethu.org"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#2B9C91]" />
                <span>{global.footer?.contactDetails?.phone || "+91 1800 599 0019"}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-[#173B63]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4A5E73]">
              <li>
                <Link to="/" className="hover:text-[#2B9C91] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#2B9C91] transition-colors">
                  About ManoSethu
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#2B9C91] transition-colors">
                  Platform Capabilities
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#2B9C91] transition-colors">
                  Solutions Suite
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-[#2B9C91] transition-colors">
                  Impact &amp; Pilots
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-[#173B63]">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4A5E73]">
              <li>
                <Link to="/system" className="hover:text-[#2B9C91] transition-colors font-medium text-[#173B63]">
                  Access System
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#2B9C91] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-[#2B9C91] transition-colors">
                  Staff Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-semibold mb-3 text-xs uppercase tracking-widest text-[#173B63]">
              Ethical Grounding
            </h4>
            <div className="p-4 rounded-xl bg-white border border-[#E1E6E2] text-xs text-[#4A5E73] space-y-2 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[#173B63] font-bold">
                <HeartHandshake size={14} className="text-[#2B9C91]" />
                <span>Human-Centred Care</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                AI assists. Humans decide. People receive support. Non-diagnostic decision support designed for dignity and privacy.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-8 text-xs text-[#5A6E82]">
          <span>
            {global.footer?.copyright ||
              `© ${new Date().getFullYear()} MANOSETHU. All rights reserved.`}
          </span>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/about" className="hover:underline">Privacy Charter</Link>
            <span>·</span>
            <Link to="/contact" className="hover:underline">Safety Protocols</Link>
            <span>·</span>
            <Link to="/system" className="hover:underline">System Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
