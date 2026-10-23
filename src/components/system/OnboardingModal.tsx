import React, { useState } from "react";
import { useManosethu } from "@/lib/manosethu-store";
import {
  Shield,
  HeartHandshake,
  User,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
} from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartFirstCheckIn: () => void;
}

export function OnboardingModal({ isOpen, onClose, onStartFirstCheckIn }: OnboardingModalProps) {
  const { completeOnboarding, activeCase } = useManosethu();
  const [step, setStep] = useState<number>(1);

  // Form states
  const [preferredName, setPreferredName] = useState("AN-8921");
  const [preferredCadence, setPreferredCadence] = useState<string>("3_days");
  const [preferredTime, setPreferredTime] = useState<string>("morning");
  const [consentAcknowledge, setConsentAcknowledge] = useState<boolean>(false);
  const [voluntaryAcknowledge, setVoluntaryAcknowledge] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 5) {
      setStep((s) => s + 1);
    } else {
      completeOnboarding({ name: preferredName, preferredTime });
      onClose();
      onStartFirstCheckIn();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-[#E1E6E2] overflow-hidden my-6">
        {/* Progress Bar */}
        <div className="w-full bg-[#EFEFEA] h-1.5">
          <div
            className="bg-[#2B9C91] h-1.5 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E1E6E2] px-6 py-4 bg-[#FAFBF9]">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#173B63] text-xs font-bold text-white">
              {step}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E82]">
              Onboarding · Step {step} of 5
            </span>
          </div>

          <span className="text-[11px] font-semibold text-[#2B9C91]">
            {step === 1 && "Welcome"}
            {step === 2 && "Profile"}
            {step === 3 && "Preferences"}
            {step === 4 && "Consent"}
            {step === 5 && "First Check-In"}
          </span>
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: WELCOME */}
          {step === 1 && (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5F3] text-[#2B9C91]">
                <HeartHandshake size={28} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#173B63]">
                Welcome to MANOSETHU
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5E73] leading-relaxed max-w-md mx-auto">
                A calm, respectful companion designed to understand changing emotional distress over time and connect you with timely human support when you need it.
              </p>
              <div className="rounded-2xl border border-[#E1E6E2] bg-[#F6F7F5] p-4 text-left space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#173B63]">
                  <Shield size={14} className="text-[#2B9C91]" />
                  <span>Our Promise to You</span>
                </div>
                <ul className="space-y-1.5 text-[#5A6E82]">
                  <li>• No medical diagnoses or algorithmic labelling</li>
                  <li>• Complete control to pause, adjust, or delete your data</li>
                  <li>• Support from certified human caseworkers, never robots</li>
                </ul>
              </div>
            </div>
          )}

          {/* STEP 2: PROFILE */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-[#173B63]">Confidential Identifier</h2>
                <p className="text-xs text-[#5A6E82] mt-1">
                  You are protected by a decoupled anonymous identifier to preserve your privacy.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#173B63] mb-1">
                    Your Confidential Alias
                  </label>
                  <input
                    type="text"
                    value={preferredName}
                    onChange={(e) => setPreferredName(e.target.value)}
                    placeholder="e.g. AN-8921 or preferred nickname"
                    className="w-full rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] p-3 text-xs sm:text-sm font-semibold text-[#12263A] focus:border-[#2B9C91] focus:bg-white focus:outline-none"
                  />
                  <span className="block text-[11px] text-[#5A6E82] mt-1">
                    This alias is what assigned caseworkers see in review logs.
                  </span>
                </div>

                <div className="rounded-xl border border-[#E1E6E2] bg-[#E8F5F3]/50 p-3.5 text-xs text-[#173B63] flex items-start gap-2.5">
                  <Lock size={15} className="text-[#2B9C91] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Decoupled Case Key</span>
                    <span className="text-[#4A5E73] text-[11px]">
                      Linked to record: <strong>{activeCase.caseCode}</strong> ({activeCase.stageDisplayName})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PREFERENCES */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-[#173B63]">Check-in Frequency</h2>
                <p className="text-xs text-[#5A6E82] mt-1">
                  Choose how often you would like gentle wellness check-in prompts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                {[
                  { id: "1_day", title: "Daily", sub: "For intensive stages" },
                  { id: "3_days", title: "Every 3 Days", sub: "Recommended cadence" },
                  { id: "7_days", title: "Weekly", sub: "Gentle routine" },
                ].map((cad) => (
                  <button
                    key={cad.id}
                    type="button"
                    onClick={() => setPreferredCadence(cad.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      preferredCadence === cad.id
                        ? "border-[#173B63] bg-[#173B63]/5 ring-2 ring-[#173B63]/20"
                        : "border-[#E1E6E2] bg-white hover:bg-[#F6F7F5]"
                    }`}
                  >
                    <span className="block text-xs font-bold text-[#173B63]">{cad.title}</span>
                    <span className="block text-[10px] text-[#5A6E82] mt-0.5">{cad.sub}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-[#173B63] mb-1.5">
                  Preferred Prompt Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "morning", label: "Morning · 9 AM" },
                    { id: "afternoon", label: "Afternoon · 2 PM" },
                    { id: "evening", label: "Evening · 7 PM" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPreferredTime(t.id)}
                      className={`p-2.5 rounded-lg border text-center text-xs font-semibold transition-all ${
                        preferredTime === t.id
                          ? "border-[#2B9C91] bg-[#E8F5F3] text-[#173B63]"
                          : "border-[#E1E6E2] bg-white text-[#5A6E82]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONSENT */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-[#173B63]">Informed Voluntary Consent</h2>
                <p className="text-xs text-[#5A6E82] mt-1">
                  We believe in total transparency regarding your personal data.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E1E6E2] bg-[#FAFBF9] p-4 text-xs space-y-3 text-[#4A5E73]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-[#2B9C91] shrink-0 mt-0.5" />
                  <p>
                    <strong>What we collect:</strong> Self-reported emotional states, brief reflections, and symptom indicators (sleep, worry, safety).
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-[#2B9C91] shrink-0 mt-0.5" />
                  <p>
                    <strong>Who accesses it:</strong> Only certified district caseworkers and psychologists assigned to your case support.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-[#2B9C91] shrink-0 mt-0.5" />
                  <p>
                    <strong>Your unconditional rights:</strong> You may pause monitoring, adjust frequency, export, or delete your records at any time.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentAcknowledge}
                    onChange={(e) => setConsentAcknowledge(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#E1E6E2] text-[#2B9C91] focus:ring-[#2B9C91]"
                  />
                  <span className="text-[#12263A]">
                    I understand how my information will be protected and used for decision support.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={voluntaryAcknowledge}
                    onChange={(e) => setVoluntaryAcknowledge(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#E1E6E2] text-[#2B9C91] focus:ring-[#2B9C91]"
                  />
                  <span className="text-[#12263A]">
                    I confirm that my participation is voluntary and does not impact my statutory relief.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: READY FOR FIRST CHECK-IN */}
          {step === 5 && (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5F3] text-[#2B9C91]">
                <Sparkles size={28} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#173B63]">
                You are all set
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5E73] leading-relaxed max-w-md mx-auto">
                Your first check-in will become the baseline starting point for your wellbeing timeline. It takes less than 60 seconds.
              </p>
              <div className="rounded-2xl border border-[#E1E6E2] bg-[#FAFBF9] p-4 text-xs text-[#5A6E82]">
                Take your time, be as honest as you feel comfortable, and remember you can skip any question.
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-[#E1E6E2] bg-[#FAFBF9] px-6 py-4 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E1E6E2] bg-white px-4 py-2 text-xs font-semibold text-[#5A6E82] hover:bg-[#F6F7F5]"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-[#5A6E82] hover:underline"
            >
              Skip for now
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={step === 4 && (!consentAcknowledge || !voluntaryAcknowledge)}
            className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-xs ${
              step === 4 && (!consentAcknowledge || !voluntaryAcknowledge)
                ? "bg-[#8BA0B2] cursor-not-allowed opacity-60"
                : "bg-[#173B63] hover:bg-[#12263A] active:scale-98"
            }`}
          >
            <span>{step === 5 ? "START FIRST CHECK-IN" : "CONTINUE"}</span>
            <ArrowRight size={14} className="text-[#2B9C91]" />
          </button>
        </div>
      </div>
    </div>
  );
}
