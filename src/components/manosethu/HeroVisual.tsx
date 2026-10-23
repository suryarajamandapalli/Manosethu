import React from "react";

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 py-6 flex items-center justify-center select-none overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute inset-0 bg-radial from-[#2B9C91]/8 via-transparent to-transparent pointer-events-none -z-10" />

      {/* Abstract connected journey visual */}
      <svg
        viewBox="0 0 800 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[220px]"
        aria-label="Abstract visual diagram showing continuous connection from distress signals to human support"
        role="img"
      >
        <defs>
          {/* Subtle gradients */}
          <linearGradient id="bridgeGradient" x1="50" y1="120" x2="750" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#173B63" stopOpacity="0.3" />
            <stop offset="45%" stopColor="#2B9C91" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#2B9C91" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#173B63" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2B9C91" stopOpacity="0" />
            <stop offset="50%" stopColor="#2B9C91" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2B9C91" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base guideline - Baseline context */}
        <path
          d="M 60 170 L 740 170"
          stroke="#E1E6E2"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />

        {/* Primary Bridge Arc (Mano - Sethu concept: Connecting Distress to Support) */}
        <path
          d="M 80 170 C 180 170, 240 60, 400 60 C 560 60, 620 170, 720 170"
          stroke="url(#bridgeGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Lower supportive resonance curve */}
        <path
          d="M 120 170 C 220 170, 280 90, 400 90 C 520 90, 580 170, 680 170"
          stroke="#2B9C91"
          strokeWidth="1.2"
          strokeOpacity="0.25"
          strokeDasharray="2 4"
        />

        {/* Continuous Stream Nodes */}

        {/* Node 1: Origin (Emerging Signals / Person) */}
        <g transform="translate(80, 170)">
          <circle r="14" fill="#FFFFFF" stroke="#E1E6E2" strokeWidth="1.5" />
          <circle r="5" fill="#173B63" />
          <text y="32" textAnchor="middle" fill="#5A6E82" fontSize="11" fontWeight="500" fontFamily="Figtree, sans-serif">
            Emerging Signals
          </text>
        </g>

        {/* Node 2: Continuity Tracking (Journey) */}
        <g transform="translate(240, 95)">
          <circle r="8" fill="#FFFFFF" stroke="#2B9C91" strokeWidth="1.5" />
          <circle r="3" fill="#2B9C91" />
          <text y="-18" textAnchor="middle" fill="#4A5E73" fontSize="11" fontWeight="500" fontFamily="Figtree, sans-serif">
            Continuous Context
          </text>
        </g>

        {/* Node 3: Apex Connection (The Bridge / Sethu) */}
        <g transform="translate(400, 60)">
          <circle r="18" fill="#FFFFFF" stroke="#2B9C91" strokeWidth="2" filter="url(#subtleGlow)" />
          <circle r="7" fill="#2B9C91" />
          <text y="-26" textAnchor="middle" fill="#173B63" fontSize="12" fontWeight="600" fontFamily="Figtree, sans-serif">
            Timely Connection
          </text>
          <text y="42" textAnchor="middle" fill="#5A6E82" fontSize="10" fontWeight="400" fontFamily="Figtree, sans-serif">
            Mano · Sethu
          </text>
        </g>

        {/* Node 4: Anticipation (Early Alerting) */}
        <g transform="translate(560, 95)">
          <circle r="8" fill="#FFFFFF" stroke="#2B9C91" strokeWidth="1.5" />
          <circle r="3" fill="#2B9C91" />
          <text y="-18" textAnchor="middle" fill="#4A5E73" fontSize="11" fontWeight="500" fontFamily="Figtree, sans-serif">
            Proactive Alert
          </text>
        </g>

        {/* Node 5: Destination (Human Support & Care) */}
        <g transform="translate(720, 170)">
          <circle r="14" fill="#FFFFFF" stroke="#E1E6E2" strokeWidth="1.5" />
          <circle r="5" fill="#173B63" />
          <text y="32" textAnchor="middle" fill="#5A6E82" fontSize="11" fontWeight="500" fontFamily="Figtree, sans-serif">
            Human Support
          </text>
        </g>
      </svg>
    </div>
  );
}
