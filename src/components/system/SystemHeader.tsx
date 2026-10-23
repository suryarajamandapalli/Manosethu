import React from "react";
import { useManosethu } from "@/lib/manosethu-store";
import { getTranslation, SupportedLanguage } from "@/services/i18n/translations";
import { Shield, PhoneCall, Globe, RotateCcw, User, UserCheck, ArrowLeft, HeartHandshake } from "lucide-react";

export function SystemHeader() {
  const {
    role,
    setRole,
    language,
    setLanguage,
    activeCase,
    setIsEmergencyOpen,
    setIsPrivacyOpen,
    resetDemoEnvironment,
    currentUser,
    loginWithGoogle,
    logoutUser,
  } = useManosethu();

  const t = getTranslation(language);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E1E6E2] bg-white/95 backdrop-blur-md">
      {/* Top Advisory Strip */}
      <div className="bg-[#173B63] px-4 py-1.5 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#2B9C91] animate-pulse" />
            <span className="font-medium tracking-wide">
              MANOSETHU PLATFORM
            </span>
            <span className="hidden sm:inline-block rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#A8D0E8]">
              {t.demoEnvironment}
            </span>
          </div>

          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FFD7D7] hover:text-white transition-colors"
          >
            <PhoneCall size={12} className="text-[#C94C4C]" />
            <span>{t.nationalHelpline}</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Anonymous Case ID */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setRole("entry")}
            className="flex items-center gap-2 group"
            title="Return to Entry Screen"
          >
            <img
              src="/logos/manosethu-logo.svg"
              alt="MANOSETHU"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </button>

          <div className="h-5 w-px bg-[#E1E6E2] hidden sm:block" />

          {/* Anonymous Case Badge */}
          <div className="flex items-center gap-1.5 rounded-full bg-[#F6F7F5] border border-[#E1E6E2] px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-[#2B9C91]" />
            <span className="text-xs font-bold tracking-wider text-[#173B63]">
              {role === "victim" ? activeCase.caseCode : "SUPPORT CONSOLE"}
            </span>
            <span className="text-[10px] text-[#5A6E82] hidden md:inline">
              ({activeCase.anonymousCaseId})
            </span>
          </div>
        </div>

        {/* Center: Role Toggle (Victim / Counsellor / Admin) */}
        <div className="flex items-center rounded-xl bg-[#F6F7F5] p-1 border border-[#E1E6E2]">
          <button
            onClick={() => setRole("victim")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              role === "victim"
                ? "bg-[#173B63] text-white shadow-xs"
                : "text-[#5A6E82] hover:text-[#12263A]"
            }`}
          >
            <User size={13} />
            <span className="hidden sm:inline">{t.victimView}</span>
            <span className="sm:hidden">Citizen</span>
          </button>
          <button
            onClick={() => setRole("counsellor")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              role === "counsellor"
                ? "bg-[#173B63] text-white shadow-xs"
                : "text-[#5A6E82] hover:text-[#12263A]"
            }`}
          >
            <UserCheck size={13} />
            <span className="hidden sm:inline">{t.counsellorConsole}</span>
            <span className="sm:hidden">Counsellor</span>
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              role === "admin"
                ? "bg-[#173B63] text-white shadow-xs"
                : "text-[#5A6E82] hover:text-[#12263A]"
            }`}
          >
            <Shield size={13} />
            <span>Admin</span>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="relative flex items-center">
            <Globe size={13} className="absolute left-2.5 text-[#5A6E82] pointer-events-none" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="appearance-none rounded-lg border border-[#E1E6E2] bg-[#F6F7F5] pl-7 pr-6 py-1.5 text-xs font-semibold text-[#12263A] hover:border-[#173B63]/30 focus:outline-none focus:ring-1 focus:ring-[#2B9C91]"
            >
              <option value="en">English</option>
              <option value="te">తెలుగు</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          {/* Google Auth Status / Button */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-[#E1E6E2] bg-[#F6F7F5] px-2 py-1">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || "User"}
                  className="h-5 w-5 rounded-full border border-[#2B9C91]"
                />
              ) : (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#173B63] text-[10px] font-bold text-white">
                  {(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}
                </div>
              )}
              <span className="hidden xl:inline text-xs font-semibold text-[#12263A] max-w-[100px] truncate">
                {currentUser.displayName?.split(" ")[0] || currentUser.email}
              </span>
              <button
                onClick={() => logoutUser()}
                className="text-[10px] text-[#5A6E82] hover:text-[#C94C4C] ml-1"
                title="Sign out"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => loginWithGoogle()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#173B63]/30 bg-white px-2.5 py-1.5 text-xs font-bold text-[#173B63] hover:bg-[#E8F5F3] hover:border-[#2B9C91] transition-colors"
              title="Sign in with Google"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="hidden md:inline">Google Auth</span>
            </button>
          )}

          {/* Privacy Button */}
          <button
            onClick={() => setIsPrivacyOpen(true)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E1E6E2] bg-[#F6F7F5] px-2.5 py-1.5 text-xs font-semibold text-[#173B63] hover:bg-[#E8F5F3] hover:border-[#2B9C91]/50 transition-colors"
            title={t.privacy}
          >
            <Shield size={13} className="text-[#2B9C91]" />
            <span className="hidden md:inline">Privacy</span>
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={resetDemoEnvironment}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E1E6E2] bg-[#F6F7F5] px-2.5 py-1.5 text-xs font-semibold text-[#5A6E82] hover:text-[#12263A] hover:bg-white transition-colors"
            title="Reset to default synthetic state"
          >
            <RotateCcw size={13} />
            <span className="hidden lg:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
}
