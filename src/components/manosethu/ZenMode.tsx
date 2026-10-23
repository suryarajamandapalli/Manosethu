import React, { useState, useEffect, useRef } from "react";

const ZEN_QUOTES = [
  "Take a moment.",
  "Let the next breath\nbe enough.",
  "One moment\nat a time.",
  "Pause.\nYou can continue\nwhen you're ready.",
  "Quiet moments belong\nin every journey.",
  "Rest\nis allowed.",
  "Your journey\ndoes not have to\nbe rushed.",
  "Let the horizon remind you —\nthere is space ahead.",
  "Even difficult journeys\nmove forward.",
  "You do not have to carry\nevery moment at once.",
  "Stillness is not emptiness.\nIt is presence.",
  "Something good\nis still possible.",
];

const ZEN_IMAGES = [
  "/images/editorial/hero_sky.jpg",
  "/images/editorial/journey_landscape.jpg",
  "/images/editorial/quiet_horizon.jpg",
  "/images/editorial/soft_dawn.jpg",
  "/images/editorial/water_reflection.jpg",
];

interface ZenModeProps {
  isOpen: boolean;
  onClose: () => void;
  musicEnabled: boolean;
  onMusicToggle: () => void;
}

export function ZenMode({ isOpen, onClose, musicEnabled, onMusicToggle }: ZenModeProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [nextImageIdx, setNextImageIdx] = useState(1);
  const [showNext, setShowNext] = useState(false);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [quoteFade, setQuoteFade] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const savedScrollY = useRef(0);

  // ── Fullscreen API ────────────────────────────────────────────
  function requestFS() {
    const el = document.documentElement as any;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
  }
  function exitFS() {
    const d = document as any;
    if (d.fullscreenElement || d.webkitFullscreenElement || d.mozFullScreenElement) {
      if (d.exitFullscreen) d.exitFullscreen();
      else if (d.webkitExitFullscreen) d.webkitExitFullscreen();
      else if (d.mozCancelFullScreen) d.mozCancelFullScreen();
    }
  }

  // ── Entrance / exit ───────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      savedScrollY.current = window.scrollY;
      document.body.style.overflow = "hidden";
      requestFS();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelVisible(true));
      });
    } else {
      setPanelVisible(false);
    }
    return () => {
      if (!isOpen) document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleClose() {
    setPanelVisible(false);
    exitFS();
    setTimeout(() => {
      document.body.style.overflow = "";
      window.scrollTo(0, savedScrollY.current);
      onClose();
    }, 800);
  }

  // ── ESC key ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  // ── Image crossfade — every 14 s ──────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      const nextIdx = (currentImageIdx + 1) % ZEN_IMAGES.length;
      setNextImageIdx(nextIdx);
      setShowNext(true);
      setTimeout(() => {
        setCurrentImageIdx(nextIdx);
        setShowNext(false);
      }, 2200);
    }, 14000);
    return () => clearInterval(timer);
  }, [isOpen, currentImageIdx]);

  // ── Quote rotation — every 10 s ───────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setQuoteFade(true);
      setTimeout(() => {
        setCurrentQuoteIdx((p) => (p + 1) % ZEN_QUOTES.length);
        setQuoteFade(false);
      }, 800);
    }, 10000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen && !panelVisible) return null;

  const lines = ZEN_QUOTES[currentQuoteIdx].split("\n");

  return (
    <div
      className="fixed inset-0 z-[200] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Zen Mode — quiet space"
      style={{
        opacity: panelVisible ? 1 : 0,
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* ── Background images ── */}
      <div className="absolute inset-0">
        {/* Current image */}
        <div
          className="absolute inset-0 zen-kenburns"
          style={{
            backgroundImage: `url(${ZEN_IMAGES[currentImageIdx]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Next image — crossfades in */}
        <div
          className="absolute inset-0 zen-kenburns-r"
          style={{
            backgroundImage: `url(${ZEN_IMAGES[nextImageIdx]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: showNext ? 1 : 0,
            transition: "opacity 2.2s ease-in-out",
          }}
        />
        {/* Deep calm veil */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,12,22,0.25) 0%, rgba(5,12,22,0.50) 50%, rgba(5,12,22,0.78) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(5,12,22,0.30) 100%)",
          }}
        />
      </div>

      {/* ── Top-left logo — use the white SVG (transparent bg, all paths white) ── */}
      <div className="absolute top-8 left-8 md:top-10 md:left-12 z-10">
        <img
          src="/logos/manosethu-mark-white.svg"
          alt="Manosethu"
          className="h-11 w-auto"
          style={{ opacity: 0.80 }}
        />
      </div>

      {/* ── Centre — Quote ── */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 px-8 md:px-24"
        style={{
          opacity: quoteFade ? 0 : 1,
          transition: "opacity 0.8s ease-in-out",
        }}
      >
        <div className="text-center max-w-2xl">
          {lines.map((line, i) => (
            <p
              key={i}
              className="text-white font-light"
              style={{
                fontFamily: "Figtree, sans-serif",
                fontSize: "clamp(2rem, 3.8vw, 3.6rem)",
                lineHeight: 1.20,
                letterSpacing: "-0.02em",
                textShadow: "0 2px 32px rgba(0,0,0,0.6)",
              }}
            >
              {line}
            </p>
          ))}
          {/* Quiet separator */}
          <div
            style={{
              width: 32,
              height: 1,
              background: "rgba(255,255,255,0.28)",
              margin: "2rem auto 0",
            }}
          />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="absolute bottom-0 inset-x-0 z-10 px-8 md:px-12 pb-8 md:pb-10 flex items-end justify-between">
        {/* Music toggle */}
        <button
          onClick={onMusicToggle}
          aria-label={musicEnabled ? "Turn off ambient music" : "Turn on ambient music"}
          className="apple-press flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs tracking-[0.14em] uppercase font-semibold"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.22)",
            color: "rgba(255,255,255,0.90)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
          }}
        >
          {musicEnabled ? <><EqBars /><span>Music On</span></> : <><MuteIcon /><span>Music Off</span></>}
        </button>

        {/* Exit Zen */}
        <button
          onClick={handleClose}
          aria-label="Exit Zen Mode"
          className="apple-press flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs tracking-[0.14em] uppercase font-semibold"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.22)",
            color: "rgba(255,255,255,0.90)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
          }}
        >
          <span>Exit Zen</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Ken Burns + equalizer CSS */}
      <style>{`
        @keyframes zenKB1 {
          0%   { transform: scale(1.00) translate(0%,    0%); }
          100% { transform: scale(1.09) translate(-1.5%, 0.8%); }
        }
        @keyframes zenKB2 {
          0%   { transform: scale(1.09) translate(1%, -1%); }
          100% { transform: scale(1.00) translate(0%,  0%); }
        }
        .zen-kenburns   { animation: zenKB1 28s ease-in-out infinite alternate; }
        .zen-kenburns-r { animation: zenKB2 28s ease-in-out infinite alternate; }

        @keyframes eqBar {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1);   }
        }
      `}</style>
    </div>
  );
}

// ── Micro components ──────────────────────────────────────────

function EqBars() {
  return (
    <span className="flex items-end gap-[2.5px] h-[14px]" aria-hidden="true">
      {[0.5, 1, 0.7, 0.4, 0.85].map((h, i) => (
        <span
          key={i}
          className="w-[2.5px] rounded-full bg-current"
          style={{
            height: `${h * 100}%`,
            animation: `eqBar 0.75s ease-in-out ${i * 0.12}s infinite alternate`,
          }}
        />
      ))}
    </span>
  );
}

function MuteIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
    </svg>
  );
}
