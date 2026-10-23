import React from "react";
import { useManosethu } from "@/lib/manosethu-store";
import { PhoneCall, ShieldAlert, X, HeartHandshake, Phone } from "lucide-react";

export function EmergencyModal() {
  const { isEmergencyOpen, setIsEmergencyOpen, requestCallSupport } = useManosethu();

  if (!isEmergencyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-[#E1E6E2]">
        <div className="flex items-start justify-between border-b border-[#E1E6E2] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-[#FDECEC] p-2 text-[#C94C4C]">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#173B63]">Emergency &amp; Helpline Support</h2>
              <p className="text-xs text-[#5A6E82]">Immediate Human Assistance Channels</p>
            </div>
          </div>
          <button
            onClick={() => setIsEmergencyOpen(false)}
            className="rounded-lg p-1.5 text-[#5A6E82] hover:bg-[#F6F7F5] hover:text-[#12263A]"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-xs text-[#4A5E73] leading-relaxed">
          If you are facing an immediate physical threat, intimidation, or acute distress, please connect directly with dedicated government support services below.
        </p>

        <div className="mt-4 space-y-2.5">
          {/* NHAA 14566 */}
          <div className="flex items-center justify-between rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-3.5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#173B63]">
                National Helpline Against Atrocities (NHAA)
              </span>
              <p className="text-xs text-[#5A6E82]">Toll-free 24/7 legal &amp; protection support</p>
            </div>
            <a
              href="tel:14566"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#173B63] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#12263A]"
            >
              <Phone size={12} />
              <span>14566</span>
            </a>
          </div>

          {/* Tele-MANAS */}
          <div className="flex items-center justify-between rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-3.5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#173B63]">
                Tele-MANAS Mental Health Helpline
              </span>
              <p className="text-xs text-[#5A6E82]">Comprehensive psychological counselling (MoHFW)</p>
            </div>
            <a
              href="tel:14416"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2B9C91] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#238077]"
            >
              <Phone size={12} />
              <span>14416</span>
            </a>
          </div>

          {/* Police Emergency 112 */}
          <div className="flex items-center justify-between rounded-xl border border-[#FDECEC] bg-[#FFF5F5] p-3.5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C94C4C]">
                Emergency Police Response
              </span>
              <p className="text-xs text-[#5A6E82]">Immediate physical protection dispatch</p>
            </div>
            <a
              href="tel:112"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#C94C4C] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#A83838]"
            >
              <Phone size={12} />
              <span>112</span>
            </a>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-[#2B9C91]/30 bg-[#E8F5F3] p-3">
          <p className="text-xs font-semibold text-[#173B63]">
            Request an authorized officer callback
          </p>
          <p className="text-[11px] text-[#4A5E73] mt-0.5">
            Notify your assigned district counsellor to initiate a secure welfare call.
          </p>
          <button
            onClick={() => {
              requestCallSupport();
              setIsEmergencyOpen(false);
            }}
            className="mt-2.5 w-full rounded-lg bg-[#2B9C91] py-2 text-xs font-bold text-white hover:bg-[#238077] flex items-center justify-center gap-1.5"
          >
            <HeartHandshake size={14} />
            <span>Notify District Support Desk</span>
          </button>
        </div>
      </div>
    </div>
  );
}
