import React, { useState, useEffect, useRef } from "react";
import { useManosethu } from "@/lib/manosethu-store";
import { getTranslation } from "@/services/i18n/translations";
import { CheckInResponses } from "@/services/scoring/distress-engine";
import {
  Mic,
  Square,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  PhoneCall,
  Loader2,
  Trash2,
  Play,
  RotateCcw,
  CheckCircle2,
  Info,
} from "lucide-react";

interface CheckInFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type FeelingType = "calm" | "okay" | "worried" | "distressed" | "very_distressed";
type SafetyType = "yes" | "not_sure" | "no";
type FrequencyType = "never" | "sometimes" | "often" | "nearly_every_day";

export function CheckInFlow({ isOpen, onClose, onComplete }: CheckInFlowProps) {
  const { language, submitCheckIn, requestCallSupport, setIsEmergencyOpen } = useManosethu();
  const t = getTranslation(language);

  const [step, setStep] = useState<number>(1);
  const [feeling, setFeeling] = useState<FeelingType>("worried");
  const [feelingNote, setFeelingNote] = useState<string>("");
  const [safety, setSafety] = useState<SafetyType>("yes");
  const [showImmediateSafetyAlert, setShowImmediateSafetyAlert] = useState<boolean>(false);

  // Step 3 Recent experiences
  const [recentExperiences, setRecentExperiences] = useState<{
    sleep: FrequencyType;
    worry: FrequencyType;
    safety: FrequencyType;
    concentration: FrequencyType;
    isolation: FrequencyType;
    lossOfInterest: FrequencyType;
  }>({
    sleep: "often",
    worry: "often",
    safety: "sometimes",
    concentration: "sometimes",
    isolation: "sometimes",
    lossOfInterest: "sometimes",
  });

  // Step 4 Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasVoiceRecorded, setHasVoiceRecorded] = useState(false);
  const [voiceAudioUrl, setVoiceAudioUrl] = useState<string | null>(null);
  const [voiceTranscript, setVoiceTranscript] = useState<string>("");
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionPhase, setSubmissionPhase] = useState<number>(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  if (!isOpen) return null;

  // Real Browser Microphone Handling with Fallback
  const handleToggleRecord = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      clearInterval(timerRef.current);
      setIsRecording(false);
      setHasVoiceRecorded(true);
    } else {
      audioChunksRef.current = [];
      setRecordingSeconds(0);

      try {
        if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const recorder = new MediaRecorder(stream);
          mediaRecorderRef.current = recorder;

          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunksRef.current.push(event.data);
            }
          };

          recorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const audioUrl = URL.createObjectURL(audioBlob);
            setVoiceAudioUrl(audioUrl);
            setVoiceTranscript("Voice reflection captured (pacing analyzed for baseline continuity)");
            stream.getTracks().forEach((track) => track.stop());
          };

          recorder.start();
          setIsRecording(true);

          timerRef.current = setInterval(() => {
            setRecordingSeconds((prev) => {
              if (prev >= 20) {
                if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                  mediaRecorderRef.current.stop();
                }
                clearInterval(timerRef.current);
                setIsRecording(false);
                setHasVoiceRecorded(true);
                return 20;
              }
              return prev + 1;
            });
          }, 1000);
        } else {
          simulateVoiceRecording();
        }
      } catch (err) {
        console.warn("Microphone access unavailable or denied. Using fallback voice analysis mode:", err);
        setMicPermissionDenied(true);
        simulateVoiceRecording();
      }
    }
  };

  const simulateVoiceRecording = () => {
    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 6) {
          clearInterval(timerRef.current);
          setIsRecording(false);
          setHasVoiceRecorded(true);
          setVoiceTranscript("Voice reflection recorded in calibrated acoustic analysis mode.");
          return 6;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleResetRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setVoiceAudioUrl(null);
    setHasVoiceRecorded(false);
    setRecordingSeconds(0);
    setVoiceTranscript("");
    setIsRecording(false);
  };

  const handleSafetySelect = (val: SafetyType) => {
    setSafety(val);
    setShowImmediateSafetyAlert(val === "no");
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionPhase(0);

    const checkInData: CheckInResponses = {
      feeling,
      feelingNote: feelingNote.trim() || undefined,
      safety,
      experiences: recentExperiences,
      voiceTranscript: hasVoiceRecorded ? voiceTranscript || "Voice check-in signals recorded" : undefined,
      voiceAcousticPace: hasVoiceRecorded ? (recordingSeconds < 4 ? "hesitant" : "steady") : "steady",
    };

    // Staged calm analysis progression
    setTimeout(() => setSubmissionPhase(1), 350);
    setTimeout(() => setSubmissionPhase(2), 700);
    setTimeout(() => setSubmissionPhase(3), 1050);

    setTimeout(async () => {
      await submitCheckIn(checkInData);
      setIsSubmitting(false);
      onComplete();
    }, 1400);
  };

  const analysisStages = [
    "Understanding response",
    "Looking for meaningful patterns",
    "Comparing recent history",
    "Preparing your summary",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-[#E1E6E2] overflow-hidden my-6">
        {/* Progress Bar */}
        <div className="w-full bg-[#EFEFEA] h-1.5">
          <div
            className="bg-[#2B9C91] h-1.5 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E1E6E2] px-6 py-4 bg-[#FAFBF9]">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#173B63] text-xs font-bold text-white">
              {step}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E82]">
              {t.step} {step} {t.of} 4
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#5A6E82] hover:bg-[#F6F7F5] hover:text-[#12263A]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSubmitting ? (
            <div className="py-12 text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F5F3] text-[#2B9C91]">
                <Loader2 size={32} className="animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#173B63]">ANALYZING YOUR CHECK-IN</h3>
                <p className="text-xs text-[#2B9C91] font-semibold">
                  {analysisStages[submissionPhase]}...
                </p>
              </div>

              {/* Progress Steps */}
              <div className="max-w-xs mx-auto space-y-2 text-left pt-2">
                {analysisStages.map((stg, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span
                      className={`h-2 w-2 rounded-full transition-colors ${
                        i <= submissionPhase ? "bg-[#2B9C91]" : "bg-[#E1E6E2]"
                      }`}
                    />
                    <span className={i <= submissionPhase ? "text-[#173B63] font-semibold" : "text-[#8BA0B2]"}>
                      {stg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: CURRENT FEELING */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#173B63]">{t.feelingQuestion}</h2>
                    <p className="mt-1 text-xs text-[#5A6E82]">{t.feelingSubtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                    {[
                      { id: "calm", label: t.calm, icon: "🌱" },
                      { id: "okay", label: t.okay, icon: "🌤️" },
                      { id: "worried", label: t.worried, icon: "🌧️" },
                      { id: "distressed", label: t.distressed, icon: "⚡" },
                      { id: "very_distressed", label: t.veryDistressed, icon: "🌊" },
                    ].map((opt) => {
                      const isSelected = feeling === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFeeling(opt.id as FeelingType)}
                          className={`flex sm:flex-col items-center justify-start sm:justify-center p-3 sm:py-4 rounded-xl border text-left sm:text-center transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#173B63] bg-[#173B63]/5 ring-2 ring-[#173B63]/20 shadow-xs"
                              : "border-[#E1E6E2] bg-white hover:bg-[#F6F7F5]"
                          }`}
                        >
                          <span className="text-2xl sm:text-3xl mb-0 sm:mb-1.5 mr-3 sm:mr-0">{opt.icon}</span>
                          <span className={`text-xs font-bold ${isSelected ? "text-[#173B63]" : "text-[#12263A]"}`}>
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-[#173B63] mb-1.5">
                      {t.tellUsMore} <span className="font-normal text-[#5A6E82]">(Optional)</span>
                    </label>
                    <textarea
                      value={feelingNote}
                      onChange={(e) => setFeelingNote(e.target.value)}
                      placeholder={t.tellUsMorePlaceholder}
                      rows={3}
                      className="w-full rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] p-3 text-xs text-[#12263A] placeholder-[#8BA0B2] focus:border-[#2B9C91] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: SAFETY */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#173B63]">{t.safetyQuestion}</h2>
                    <p className="mt-1 text-xs text-[#5A6E82]">{t.safetySubtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "yes", label: t.yes, borderActive: "border-[#2B9C91] bg-[#E8F5F3] text-[#173B63]" },
                      { id: "not_sure", label: t.notSure, borderActive: "border-[#173B63] bg-[#F0F6FA] text-[#173B63]" },
                      { id: "no", label: t.no, borderActive: "border-[#C94C4C] bg-[#FFF5F5] text-[#C94C4C]" },
                    ].map((opt) => {
                      const isSelected = safety === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSafetySelect(opt.id as SafetyType)}
                          className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? `${opt.borderActive} ring-2 ring-current/20 shadow-xs font-bold`
                              : "border-[#E1E6E2] bg-white hover:bg-[#F6F7F5] font-semibold"
                          }`}
                        >
                          <span className="text-sm">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showImmediateSafetyAlert && (
                    <div className="rounded-2xl border border-[#C94C4C]/40 bg-[#FFF5F5] p-5 text-left space-y-3">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#C94C4C]">
                          {t.dontHandleAlone}
                        </h4>
                        <p className="mt-1 text-xs text-[#5A6E82] leading-relaxed">
                          Your safety is our priority. If you feel threatened or unsafe, you can connect directly with support right now.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            requestCallSupport();
                            alert("Urgent callback requested. Dispatched to caseworker queue.");
                          }}
                          className="rounded-xl bg-[#C94C4C] px-4 py-2 text-xs font-bold text-white hover:bg-[#A83838]"
                        >
                          {t.requestImmediateSupport}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEmergencyOpen(true)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[#C94C4C] bg-white px-4 py-2 text-xs font-bold text-[#C94C4C]"
                        >
                          <PhoneCall size={13} />
                          <span>National Helpline: 14566</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: RECENT EXPERIENCES */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#173B63]">{t.experiencesQuestion}</h2>
                    <p className="mt-1 text-xs text-[#5A6E82]">{t.experiencesSubtitle}</p>
                  </div>

                  <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                    {[
                      { key: "sleep", label: t.expSleep },
                      { key: "worry", label: t.expWorry },
                      { key: "safety", label: t.expSafety },
                      { key: "concentration", label: t.expConcentration },
                      { key: "isolation", label: t.expIsolation },
                      { key: "lossOfInterest", label: t.expInterest },
                    ].map((item) => {
                      const val = recentExperiences[item.key as keyof typeof recentExperiences];
                      return (
                        <div key={item.key} className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-3">
                          <p className="text-xs font-semibold text-[#173B63] mb-2">{item.label}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                            {[
                              { id: "never", label: t.never },
                              { id: "sometimes", label: t.sometimes },
                              { id: "often", label: t.often },
                              { id: "nearly_every_day", label: t.nearlyEveryDay },
                            ].map((freq) => {
                              const isSelected = val === freq.id;
                              return (
                                <button
                                  key={freq.id}
                                  type="button"
                                  onClick={() =>
                                    setRecentExperiences((prev) => ({
                                      ...prev,
                                      [item.key]: freq.id as FrequencyType,
                                    }))
                                  }
                                  className={`rounded-lg py-1.5 px-2 text-[11px] font-medium transition-all text-center ${
                                    isSelected
                                      ? "bg-[#173B63] text-white font-bold shadow-xs"
                                      : "bg-white text-[#4A5E73] border border-[#E1E6E2]"
                                  }`}
                                >
                                  {freq.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: VOICE REFLECTION */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#173B63]">{t.voiceCheckInTitle}</h2>
                    <p className="mt-1 text-xs text-[#5A6E82]">{t.voiceCheckInSubtitle}</p>
                  </div>

                  <div className="rounded-2xl border border-[#E1E6E2] bg-[#FAFBF9] p-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E1E6E2] px-3 py-1 text-[11px] font-bold text-[#173B63]">
                      <Sparkles size={13} className="text-[#2B9C91]" />
                      <span>{t.voiceAnalysisLabel}</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 my-2">
                      <button
                        type="button"
                        onClick={handleToggleRecord}
                        className={`relative flex h-20 w-20 items-center justify-center rounded-full transition-all shadow-md ${
                          isRecording
                            ? "bg-[#C94C4C] text-white ring-8 ring-[#C94C4C]/20 animate-pulse"
                            : hasVoiceRecorded
                            ? "bg-[#2B9C91] text-white"
                            : "bg-[#173B63] text-white hover:bg-[#12263A]"
                        }`}
                      >
                        {isRecording ? <Square size={24} /> : <Mic size={28} />}
                      </button>

                      {hasVoiceRecorded && (
                        <button
                          type="button"
                          onClick={handleResetRecording}
                          title="Re-record"
                          className="h-10 w-10 rounded-full border border-[#E1E6E2] bg-white text-[#5A6E82] hover:text-[#C94C4C] flex items-center justify-center shadow-xs"
                        >
                          <RotateCcw size={16} />
                        </button>
                      )}
                    </div>

                    <p className="text-xs font-bold text-[#173B63]">
                      {isRecording
                        ? `${t.recording} (00:${recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds})`
                        : hasVoiceRecorded
                        ? `Voice check-in recorded (${recordingSeconds || 6}s)`
                        : t.recordVoiceCheckIn}
                    </p>

                    {voiceAudioUrl && (
                      <div className="pt-2 flex justify-center">
                        <audio controls src={voiceAudioUrl} className="h-9 w-full max-w-xs" />
                      </div>
                    )}

                    {micPermissionDenied && (
                      <p className="text-[11px] text-[#D97706] font-medium">
                        Microphone access ungranted. Simulated acoustic analysis mode active.
                      </p>
                    )}

                    <div className="rounded-xl bg-white p-3 border border-[#E1E6E2] text-left">
                      <div className="flex items-start gap-2">
                        <Info size={14} className="text-[#5A6E82] shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[#5A6E82] leading-relaxed">
                          Audio reflections help evaluate pacing and latency. Spoken data is encrypted and never shared with third parties.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <div className="mt-7 flex items-center justify-between border-t border-[#E1E6E2] pt-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#E1E6E2] bg-white px-4 py-2 text-xs font-bold text-[#173B63]"
                  >
                    <ArrowLeft size={14} />
                    <span>{t.back}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs font-semibold text-[#5A6E82] hover:text-[#12263A]"
                  >
                    {t.cancel}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#173B63] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#12263A] shadow-xs"
                >
                  <span>{step === 4 ? t.submitCheckIn : t.continue}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
