import React, { useState } from "react";
import { useManosethu } from "@/lib/manosethu-store";
import { getTranslation } from "@/services/i18n/translations";
import {
  Shield,
  User,
  UserCheck,
  ArrowRight,
  HeartHandshake,
  PhoneCall,
  Globe,
  Info,
  Lock,
  KeyRound,
  CheckCircle2,
  Building2,
  AlertCircle,
  LogIn,
} from "lucide-react";

export function EntryScreen() {
  const {
    setRole,
    language,
    setLanguage,
    setIsEmergencyOpen,
    setIsPrivacyOpen,
    currentUser,
    isAuthLoading,
    loginWithGoogle,
    loginAsDemoOfficer,
    logoutUser,
  } = useManosethu();
  const t = getTranslation(language);

  // Tab: 'officer' or 'victim'
  const [activeTab, setActiveTab] = useState<"officer" | "victim">("officer");

  // Form states for manual officer login
  const [officerEmail, setOfficerEmail] = useState("nodal.officer@mosje.gov.in");
  const [officerPin, setOfficerPin] = useState("••••••••");
  const [authError, setAuthError] = useState<string | null>(null);

  // Victim Anonymous Case ID entry
  const [anonymousCaseInput, setAnonymousCaseInput] = useState("MS-1042");

  const handleOfficerFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!officerEmail) {
      setAuthError("Please enter your official government ID or email.");
      return;
    }
    loginAsDemoOfficer({
      displayName: officerEmail.split("@")[0].replace(".", " ").toUpperCase(),
      email: officerEmail,
      roleTitle: "Nodal Support Officer (MoSJE)",
    });
    setRole("counsellor");
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      await loginWithGoogle();
      setRole("counsellor");
    } catch (err: any) {
      console.warn("Google popup error / cancelled:", err);
      // Helpful fallback note
      setAuthError("Google Sign-In window closed or blocked by browser. You can also sign in directly using the Official Government Credentials below.");
    }
  };

  const handleDemoPreset = (name: string, email: string, roleTitle: string) => {
    setAuthError(null);
    loginAsDemoOfficer({ displayName: name, email, roleTitle });
    setRole("counsellor");
  };

  const handleVictimEntry = () => {
    setRole("victim");
  };

  return (
    <div className="min-h-screen bg-[#F6F7F5] flex flex-col justify-between">
      {/* Top Advisory Bar */}
      <div className="bg-[#173B63] px-4 py-2.5 text-xs text-white shadow-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#2B9C91] animate-pulse" />
            <span className="font-semibold tracking-wide">
              MANOSETHU DIGITAL PLATFORM · CONTINUOUS WELLBEING &amp; SUPPORT
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="rounded bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#A8D0E8]">
              {t.demoEnvironment}
            </span>
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FFD7D7] hover:text-white transition-colors"
            >
              <PhoneCall size={13} className="text-[#C94C4C]" />
              <span>National Helpline: 14566</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        {/* Brand Header */}
        <div className="text-center mb-6 space-y-3">
          <div className="flex justify-center">
            <img
              src="/logos/manosethu-logo.svg"
              alt="MANOSETHU"
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5F3] px-3.5 py-1 text-xs font-bold text-[#173B63]">
            <HeartHandshake size={14} className="text-[#2B9C91]" />
            <span>Mano = Mind · Sethu = Bridge</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173B63] tracking-tight">
            MANOSETHU SYSTEM
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6E82] max-w-md mx-auto leading-relaxed">
            AI-Powered Continuous Mental Health Monitoring &amp; Distress Prediction System for Victims of Atrocities.
          </p>
        </div>

        {/* Auth Box */}
        <div className="rounded-3xl border border-[#E1E6E2] bg-white shadow-xl shadow-[#173B63]/5 overflow-hidden">
          {/* Dual Navigation Tabs */}
          <div className="grid grid-cols-2 border-b border-[#E1E6E2] bg-[#FAFBF9]">
            <button
              type="button"
              onClick={() => setActiveTab("officer")}
              className={`flex items-center justify-center gap-2 py-4 px-3 text-xs sm:text-sm font-bold transition-all border-b-2 ${
                activeTab === "officer"
                  ? "border-[#173B63] bg-white text-[#173B63] shadow-xs"
                  : "border-transparent text-[#5A6E82] hover:text-[#12263A] hover:bg-white/60"
              }`}
            >
              <UserCheck size={16} className={activeTab === "officer" ? "text-[#2B9C91]" : "text-[#5A6E82]"} />
              <span>Officer &amp; Authority Portal</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("victim")}
              className={`flex items-center justify-center gap-2 py-4 px-3 text-xs sm:text-sm font-bold transition-all border-b-2 ${
                activeTab === "victim"
                  ? "border-[#173B63] bg-white text-[#173B63] shadow-xs"
                  : "border-transparent text-[#5A6E82] hover:text-[#12263A] hover:bg-white/60"
              }`}
            >
              <Shield size={16} className={activeTab === "victim" ? "text-[#2B9C91]" : "text-[#5A6E82]"} />
              <span>Victim / Complainant Access</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* ERROR BANNER IF ANY */}
            {authError && (
              <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{authError}</p>
              </div>
            )}

            {/* TAB 1: OFFICER AUTHENTICATION */}
            {activeTab === "officer" && (
              <div className="space-y-6">
                {currentUser ? (
                  /* ALREADY LOGGED IN AS OFFICER */
                  <div className="rounded-2xl border border-[#2B9C91]/30 bg-[#E8F5F3]/40 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        {currentUser.photoURL ? (
                          <img
                            src={currentUser.photoURL}
                            alt="User"
                            className="h-12 w-12 rounded-full border-2 border-[#2B9C91] shadow-xs object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-[#173B63] text-white font-extrabold flex items-center justify-center text-base shadow-xs">
                            {(currentUser.displayName || currentUser.email || "O")[0].toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-[#12263A]">
                              {currentUser.displayName || "Authorized Case Officer"}
                            </h3>
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#2B9C91] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                              <CheckCircle2 size={10} />
                              Verified
                            </span>
                          </div>
                          <p className="text-xs text-[#5A6E82]">{currentUser.email}</p>
                          <p className="text-[11px] text-[#2B9C91] font-semibold mt-0.5">
                            {(currentUser as any).roleTitle || "Ministry of Social Justice & Empowerment Official"}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => logoutUser()}
                        className="rounded-lg border border-[#E1E6E2] bg-white px-3 py-1.5 text-xs font-semibold text-[#5A6E82] hover:text-[#C94C4C] hover:border-[#C94C4C]/40 transition-colors shadow-2xs"
                      >
                        Sign Out
                      </button>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setRole("counsellor")}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#173B63] text-white py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#12263A] transition-all shadow-md shadow-[#173B63]/20 group"
                      >
                        <span>OPEN SUPPORT CONSOLE</span>
                        <ArrowRight size={16} className="text-[#2B9C91] transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* OFFICER LOGIN OPTIONS */
                  <>
                    {/* 1. Official Google OAuth Button */}
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isAuthLoading}
                      className="w-full flex items-center justify-center gap-3 rounded-2xl border-2 border-[#173B63]/20 bg-white p-3.5 text-sm font-bold text-[#173B63] hover:bg-[#F6F7F5] hover:border-[#173B63] transition-all shadow-xs group"
                    >
                      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
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
                      <span>
                        {isAuthLoading ? "Authenticating..." : "Sign In with Google (Official MoSJE Account)"}
                      </span>
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#E1E6E2]" />
                      </div>
                      <span className="relative bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-[#5A6E82]">
                        or official officer id
                      </span>
                    </div>

                    {/* 2. Official Government ID Form */}
                    <form onSubmit={handleOfficerFormLogin} className="space-y-4">
                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-bold text-[#173B63]">
                          Government Officer ID / Email
                        </label>
                        <div className="relative">
                          <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A6E82]" />
                          <input
                            type="text"
                            value={officerEmail}
                            onChange={(e) => setOfficerEmail(e.target.value)}
                            placeholder="officer.id@mosje.gov.in"
                            className="w-full rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-[#12263A] focus:border-[#2B9C91] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2B9C91] transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-bold text-[#173B63]">
                          Security Passcode / Token
                        </label>
                        <div className="relative">
                          <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A6E82]" />
                          <input
                            type="password"
                            value={officerPin}
                            onChange={(e) => setOfficerPin(e.target.value)}
                            placeholder="Enter statutory PIN"
                            className="w-full rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-[#12263A] focus:border-[#2B9C91] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2B9C91] transition-all"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#173B63] text-white py-3 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#12263A] transition-all shadow-sm"
                      >
                        <LogIn size={16} />
                        <span>Sign In to Support Console</span>
                      </button>
                    </form>

                    {/* Quick Demo Credentials for Instant Evaluation */}
                    <div className="rounded-2xl bg-[#F6F7F5] border border-[#E1E6E2] p-4 text-left space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                          Quick Evaluation Credentials (Demo)
                        </span>
                        <span className="rounded bg-[#2B9C91]/10 px-2 py-0.5 text-[9px] font-bold text-[#2B9C91]">
                          1-Click Instant Login
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            handleDemoPreset("Dr. Radhika Sharma", "r.sharma@mosje.gov.in", "Nodal Welfare Officer (MoSJE)")
                          }
                          className="rounded-xl border border-[#E1E6E2] bg-white p-2 text-left hover:border-[#2B9C91] hover:bg-[#E8F5F3]/30 transition-all text-xs shadow-2xs group"
                        >
                          <span className="block font-bold text-[#173B63] group-hover:text-[#2B9C91] transition-colors">
                            Nodal Officer
                          </span>
                          <span className="block text-[10px] text-[#5A6E82]">MoSJE Central Desk</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDemoPreset("Inspector V. Kumar", "v.kumar@police.gov.in", "District Protection Officer (DSP Cell)")
                          }
                          className="rounded-xl border border-[#E1E6E2] bg-white p-2 text-left hover:border-[#2B9C91] hover:bg-[#E8F5F3]/30 transition-all text-xs shadow-2xs group"
                        >
                          <span className="block font-bold text-[#173B63] group-hover:text-[#2B9C91] transition-colors">
                            Protection Officer
                          </span>
                          <span className="block text-[10px] text-[#5A6E82]">DSP Special Cell</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDemoPreset("Adv. Priya Nair", "p.nair@dlsa.gov.in", "Legal Aid Counsellor (DLSA)")
                          }
                          className="rounded-xl border border-[#E1E6E2] bg-white p-2 text-left hover:border-[#2B9C91] hover:bg-[#E8F5F3]/30 transition-all text-xs shadow-2xs group"
                        >
                          <span className="block font-bold text-[#173B63] group-hover:text-[#2B9C91] transition-colors">
                            Legal Counsellor
                          </span>
                          <span className="block text-[10px] text-[#5A6E82]">DLSA Legal Aid Desk</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* TAB 2: VICTIM / COMPLAINANT CONFIDENTIAL ACCESS */}
            {activeTab === "victim" && (
              <div className="space-y-6 text-left">
                <div className="rounded-2xl bg-[#E8F5F3]/50 border border-[#2B9C91]/30 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-[#2B9C91]" />
                    <h3 className="text-xs font-bold text-[#173B63] uppercase tracking-wider">
                      Confidential &amp; Anonymous Access
                    </h3>
                  </div>
                  <p className="text-xs text-[#4A5E73] leading-relaxed">
                    Under the PoA statutory protection framework, your identity is not required to complete a well-being check-in. Zero phone numbers, names, or device identifiers are permanently retained.
                  </p>
                </div>

                {/* Case Code Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#173B63]">
                    Anonymous Case Key / FIR Access Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={anonymousCaseInput}
                      onChange={(e) => setAnonymousCaseInput(e.target.value)}
                      placeholder="e.g. MS-1042 or AN-8921"
                      className="flex-1 rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#173B63] tracking-wider focus:border-[#2B9C91] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2B9C91]"
                    />
                    <button
                      type="button"
                      onClick={handleVictimEntry}
                      className="rounded-xl bg-[#173B63] px-5 py-2.5 text-xs font-bold text-white uppercase tracking-wider hover:bg-[#12263A] transition-all shadow-xs"
                    >
                      Verify
                    </button>
                  </div>
                  <span className="block text-[11px] text-[#5A6E82]">
                    Sample Case Loaded: <strong className="text-[#173B63]">MS-1042</strong> (Day 18 Investigation Stage)
                  </span>
                </div>

                {/* Direct Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleVictimEntry}
                    className="w-full flex items-center justify-between rounded-2xl bg-[#173B63] p-4 text-white hover:bg-[#12263A] transition-all shadow-md shadow-[#173B63]/15 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white/10 p-2 text-white">
                        <User size={20} />
                      </div>
                      <div>
                        <span className="block text-sm font-bold tracking-wide">
                          START ANONYMOUS CHECK-IN
                        </span>
                        <span className="block text-[11px] text-[#A8D0E8]">
                          Private 4-step check-in with voluntary support pathways
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-[#2B9C91] transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Immediate Helpline Assistance */}
                <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-3 text-xs text-[#5A6E82] flex items-center justify-between">
                  <span>Need to speak with someone right now?</span>
                  <button
                    type="button"
                    onClick={() => setIsEmergencyOpen(true)}
                    className="font-bold text-[#C94C4C] hover:underline"
                  >
                    Dial 14566 (Toll-Free)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer of Auth Card */}
          <div className="border-t border-[#E1E6E2] bg-[#FAFBF9] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Globe size={13} className="text-[#5A6E82]" />
              <span className="text-xs text-[#5A6E82]">Language:</span>
              {(["en", "te", "hi"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`rounded-md px-2 py-0.5 text-xs font-semibold transition-all ${
                    language === lang
                      ? "bg-[#173B63] text-white"
                      : "bg-white text-[#5A6E82] hover:text-[#12263A] border border-[#E1E6E2]"
                  }`}
                >
                  {lang === "en" ? "English" : lang === "te" ? "తెలుగు" : "हिन्दी"}
                </button>
              ))}
            </div>

            {/* Privacy Link */}
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="text-xs font-semibold text-[#173B63] hover:underline flex items-center gap-1"
            >
              <Shield size={12} className="text-[#2B9C91]" />
              <span>Data Protection &amp; Confidentiality</span>
            </button>
          </div>
        </div>

        {/* Clinical Disclaimer */}
        <div className="mt-4 flex items-start gap-2 text-left rounded-xl bg-white/70 border border-[#E1E6E2]/70 p-3 text-[11px] text-[#5A6E82]">
          <Info size={14} className="text-[#5A6E82] shrink-0 mt-0.5" />
          <p>
            MANOSETHU is a decision-support system to assist timely human connection. It does not provide clinical psychiatric diagnosis or replace statutory legal protection.
          </p>
        </div>
      </div>

      {/* Global Page Footer */}
      <footer className="border-t border-[#E1E6E2] bg-white py-3.5 px-6 text-center text-xs text-[#5A6E82]">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MANOSETHU PLATFORM · Ethical &amp; Privacy-Conscious Emotional Support</span>
          <span className="text-[11px] text-[#2B9C91] font-semibold">
            AI assists. Humans decide. People receive support.
          </span>
        </div>
      </footer>
    </div>
  );
}
