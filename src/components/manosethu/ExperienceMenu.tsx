import React, { useState, useEffect, useRef } from "react";
import { startAmbient, stopAmbient } from "@/utils/ambientAudio";

interface ExperienceMenuProps {
  darkMode: boolean;
  onDarkModeChange: (v: boolean) => void;
  musicOn: boolean;
  onMusicToggle: () => void;
  zenMode: boolean;
  onZenModeToggle: () => void;
}

export function ExperienceMenu({
  darkMode,
  onDarkModeChange,
  musicOn,
  onMusicToggle,
  zenMode,
  onZenModeToggle,
}: ExperienceMenuProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Keyboard ESC closes panel
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const panelBg = darkMode
    ? "bg-[#0e1e30]/90 border-white/10"
    : "bg-white/90 border-[#E1E6E2]/80";
  const labelColor = darkMode ? "text-[#a8bfd4]" : "text-[#5A6E82]";
  const textColor = darkMode ? "text-white" : "text-[#12263A]";
  const dividerColor = darkMode ? "border-white/10" : "border-[#E1E6E2]/60";
  const triggerBg = darkMode
    ? "bg-[#0e1e30]/80 border-white/15 text-white/70 hover:text-white hover:bg-[#0e1e30]"
    : "bg-white/80 border-[#173B63]/15 text-[#5A6E82] hover:text-[#173B63] hover:bg-white";

  return (
    <div
      className="fixed right-5 z-[100] flex flex-col items-end gap-3"
      style={{ top: "50%", transform: "translateY(-50%)" }}
      aria-label="Experience controls"
    >
      {/* Floating Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Experience settings"
          className={`
            w-64 rounded-2xl border backdrop-blur-2xl apple-shadow-ambient
            ${panelBg}
            transition-all duration-300 spring-bounce
          `}
          style={{
            transformOrigin: "right center",
            animation: "appleSpringIn 0.32s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {/* Header */}
          <div className={`px-5 pt-5 pb-3 border-b ${dividerColor}`}>
            <p className={`apple-tracking-caps text-[10px] ${labelColor}`}>
              Experience
            </p>
          </div>

          <div className="px-5 py-4 flex flex-col gap-4">
            {/* Theme */}
            <div className="flex flex-col gap-2">
              <p className={`apple-tracking-caps text-[10px] ${labelColor}`}>Theme</p>
              <div className="flex items-center gap-2">
                <ThemeButton
                  active={!darkMode}
                  onClick={() => onDarkModeChange(false)}
                  label="Light"
                  darkMode={darkMode}
                  icon={
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <circle cx="12" cy="12" r="4" />
                      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                  }
                />
                <ThemeButton
                  active={darkMode}
                  onClick={() => onDarkModeChange(true)}
                  label="Dark"
                  darkMode={darkMode}
                  icon={
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                  }
                />
              </div>
            </div>

            <div className={`border-t ${dividerColor}`} />

            {/* Music */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <p className={`apple-tracking-caps text-[10px] ${labelColor}`}>Ambient Music</p>
                <p className={`text-xs ${darkMode ? "text-white/50" : "text-[#12263A]/50"}`}>
                  {musicOn ? "Playing softly" : "Off by default"}
                </p>
              </div>
              <MusicToggle on={musicOn} onToggle={onMusicToggle} darkMode={darkMode} />
            </div>

            <div className={`border-t ${dividerColor}`} />

            {/* Zen Mode */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <p className={`apple-tracking-caps text-[10px] ${labelColor}`}>Zen Mode</p>
                <p className={`text-xs ${darkMode ? "text-white/50" : "text-[#12263A]/50"}`}>
                  Peaceful nature, calm space
                </p>
              </div>
              <button
                onClick={() => { setOpen(false); onZenModeToggle(); }}
                className={`
                  apple-press w-full py-2.5 rounded-xl border text-xs font-semibold tracking-[0.1em] uppercase
                  transition-all duration-200
                  ${darkMode
                    ? "border-[#2B9C91]/40 text-[#2B9C91] bg-[#2B9C91]/10 hover:bg-[#2B9C91]/20"
                    : "border-[#2B9C91]/30 text-[#2B9C91] bg-[#2B9C91]/08 hover:bg-[#2B9C91]/15"}
                `}
              >
                Enter Zen ◌
              </button>
            </div>

            <div className={`border-t ${dividerColor}`} />

            {/* Quick Features Jump */}
            <div className="flex flex-col gap-2">
              <p className={`apple-tracking-caps text-[10px] ${labelColor}`}>Feature Chapters</p>
              <div className="grid grid-cols-2 gap-1.5 text-left">
                {[
                  { label: "Journey", href: "#journey" },
                  { label: "Reality", href: "#reality" },
                  { label: "System", href: "#system" },
                  { label: "Features", href: "#features" },
                  { label: "Oversight", href: "#oversight" },
                  { label: "Platform", href: "/system" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      item.href === "/system"
                        ? "bg-[#173B63] text-white text-center col-span-2 mt-1 shadow-xs"
                        : darkMode
                          ? "bg-white/5 hover:bg-white/10 text-[#d4e4f2]"
                          : "bg-[#F6F7F5] hover:bg-[#E8F5F3] text-[#173B63] border border-[#E1E6E2]"
                    }`}
                  >
                    {item.label} {item.href === "/system" && "→"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open experience controls"
        aria-expanded={open}
        className={`
          apple-press w-11 h-11 rounded-full border backdrop-blur-xl flex items-center justify-center
          apple-shadow-key transition-all duration-300 spring-bounce
          ${triggerBg}
          ${open ? "rotate-45" : "rotate-0"}
        `}
      >
        {open ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes appleSpringIn {
          from { opacity: 0; transform: scale(0.88) translateX(12px); }
          to   { opacity: 1; transform: scale(1) translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Sub-components ───────────────────────────────────────────── */

interface ThemeButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  darkMode: boolean;
  icon: React.ReactNode;
}
function ThemeButton({ active, onClick, label, darkMode, icon }: ThemeButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`
        flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium tracking-[0.08em]
        transition-all duration-200
        ${active
          ? darkMode
            ? "border-[#2B9C91] bg-[#2B9C91]/15 text-[#2B9C91]"
            : "border-[#173B63] bg-[#173B63] text-white"
          : darkMode
            ? "border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
            : "border-[#E1E6E2] text-[#5A6E82] hover:text-[#173B63] hover:border-[#173B63]/30"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}

interface MusicToggleProps {
  on: boolean;
  onToggle: () => void;
  darkMode: boolean;
}
function MusicToggle({ on, onToggle, darkMode }: MusicToggleProps) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      aria-label={on ? "Turn off ambient music" : "Turn on ambient music"}
      className={`
        relative w-11 h-6 rounded-full border transition-all duration-300
        ${on
          ? "border-[#2B9C91] bg-[#2B9C91]"
          : darkMode
            ? "border-white/20 bg-white/10"
            : "border-[#E1E6E2] bg-[#F0F2F0]"
        }
      `}
    >
      <span
        className={`
          absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-300 shadow-sm
          ${on ? "translate-x-5 bg-white" : darkMode ? "bg-white/50" : "bg-white"}
        `}
      />
      {on && (
        <span
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="flex items-end gap-[1.5px] h-3 ml-[-18px]">
            {[0.6, 1, 0.7].map((h, i) => (
              <span
                key={i}
                className="w-[2px] rounded-full bg-white/80"
                style={{
                  height: `${h * 100}%`,
                  animation: `eqBarMini 0.7s ease-in-out ${i * 0.14}s infinite alternate`,
                }}
              />
            ))}
          </span>
        </span>
      )}
      <style>{`
        @keyframes eqBarMini {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </button>
  );
}
