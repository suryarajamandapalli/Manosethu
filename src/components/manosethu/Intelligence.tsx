import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

export function Intelligence() {
  const inputs = [
    { title: "Voice Signals", spec: "Acoustic Prosody", desc: "Tremor, pitch volatility, long pauses, and vocal energy decline from phone streams." },
    { title: "Text Signals", spec: "Linguistic Semantics", desc: "Syntactic markers of despair, cognitive helplessness, and explicit threat mentions." },
    { title: "Behavior Signals", spec: "Interaction Telemetry", desc: "Response latency, check-in abandonment, and sudden communication avoidance." },
    { title: "Context Signals", spec: "Institutional Milestone", desc: "Proximity to court hearings, police inquiries, and statutory relief timelines." },
  ];

  const intelligencePillars = [
    { title: "Natural Language Processing", code: "NLP / Vernacular", desc: "Contextual tokenization and semantic distress modeling across regional Indian languages." },
    { title: "Sentiment & Emotion AI", code: "Affective Valence", desc: "Tracking emotional shifts across fear, sorrow, numbness, and anxiety across time." },
    { title: "Voice Stress Analytics", code: "Acoustic Signal Processing", desc: "Paralinguistic feature extraction measuring autonomic nervous arousal." },
    { title: "Predictive Risk Modelling", code: "Time-Series Forecasting", desc: "Anticipating non-linear distress accumulation prior to crisis moments." },
  ];

  return (
    <section id="intelligence" className="py-24 md:py-36 bg-[#F6F7F5]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Metadata Header */}
        <div className="flex items-center gap-3 mb-8 text-[11px] font-mono tracking-[0.25em] uppercase text-[#2B9C91]">
          <span>06 // INTELLIGENCE LAYER</span>
          <span className="text-[#E1E6E2]">——</span>
          <span>MULTIMODAL SYNTHESIS</span>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="editorial-section-title font-bold text-[#173B63] text-balance">
            One interaction <br />
            <span className="font-light text-[#12263A]">can carry many signals.</span>
          </h2>
          <p className="mt-4 text-base text-[#4A5E73] leading-relaxed">
            Human distress manifests simultaneously in speech acoustics, written expression, and interaction behavior. Manosethu synthesizes multiple sensory streams into a coherent understanding of well-being.
          </p>
        </div>

        {/* Editorial Data Flow Composition */}
        <div className="bg-white border border-[#E1E6E2] p-8 md:p-12">
          {/* Row 1: Raw Signal Inputs */}
          <div className="mb-4">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#5A6E82]">
              STEP 01 // MULTI-MODAL INPUT STREAMS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 hairline-b">
            {inputs.map((inp, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#2B9C91] uppercase">{inp.spec}</span>
                <h4 className="text-sm font-semibold text-[#173B63]">{inp.title}</h4>
                <p className="text-xs text-[#5A6E82] leading-relaxed">{inp.desc}</p>
              </div>
            ))}
          </div>

          {/* Flow Divider */}
          <div className="py-6 flex items-center justify-between text-[10px] font-mono text-[#5A6E82]">
            <span>TRANSFORMATION // FEATURE EXTRACTION & SYNTHESIS</span>
            <ArrowDown size={14} className="text-[#2B9C91]" />
          </div>

          {/* Row 2: Intelligence & Longitudinal Integration */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            <div className="lg:col-span-4 p-6 bg-[#F6F7F5] border border-[#E1E6E2] space-y-2">
              <span className="text-[10px] font-mono text-[#2B9C91] uppercase font-bold">CORE METRIC</span>
              <h3 className="text-lg font-bold text-[#173B63]">Dynamic Distress Score</h3>
              <p className="text-xs text-[#5A6E82] leading-relaxed">
                Normalized instantaneous score synthesizing acoustic prosody, sentiment valence, and response latency.
              </p>
            </div>

            <div className="lg:col-span-4 p-6 bg-[#F6F7F5] border border-[#E1E6E2] space-y-2">
              <span className="text-[10px] font-mono text-[#2B9C91] uppercase font-bold">TEMPORAL CONTEXT</span>
              <h3 className="text-lg font-bold text-[#173B63]">Longitudinal Trajectory</h3>
              <p className="text-xs text-[#5A6E82] leading-relaxed">
                Evaluating current readings against the individual's established baseline to separate temporary dips from severe degradation.
              </p>
            </div>

            <div className="lg:col-span-4 p-6 bg-[#173B63] text-white space-y-2">
              <span className="text-[10px] font-mono text-[#2B9C91] uppercase font-bold">HUMAN OUTCOME</span>
              <h3 className="text-lg font-bold text-white">Actionable Review</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Dispatching interpretable evidence to certified caseworkers with explainable attribution factors.
              </p>
            </div>
          </div>
        </div>

        {/* Proposed AI Pillars List (Refined Typography) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {intelligencePillars.map((p, idx) => (
            <div key={idx} className="p-5 bg-white border border-[#E1E6E2] space-y-1">
              <span className="text-[10px] font-mono text-[#5A6E82] uppercase">{p.code}</span>
              <h4 className="text-sm font-semibold text-[#173B63]">{p.title}</h4>
              <p className="text-xs text-[#5A6E82] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
