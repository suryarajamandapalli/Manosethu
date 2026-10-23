import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { ManosethuProvider, useManosethu } from "@/lib/manosethu-store";
import { EntryScreen } from "@/components/system/EntryScreen";
import { SystemHeader } from "@/components/system/SystemHeader";
import { VictimHome } from "@/components/system/VictimHome";
import { SupportConsole } from "@/components/system/SupportConsole";
import { AdminConsole } from "@/components/system/AdminConsole";
import { PrivacyPanel } from "@/components/system/PrivacyPanel";
import { EmergencyModal } from "@/components/system/EmergencyModal";

export const Route = createFileRoute("/system")({
  head: () => ({
    meta: [
      { title: "MANOSETHU — Intelligent Emotional Wellbeing & Support System" },
      {
        name: "description",
        content:
          "MANOSETHU System — Continuous emotional wellbeing monitoring, distress assessment, early risk identification and human-centred support.",
      },
    ],
  }),
  component: ManosethuSystemPage,
});

function ManosethuContent() {
  const { role } = useManosethu();

  if (role === "entry") {
    return (
      <>
        <EntryScreen />
        <PrivacyPanel />
        <EmergencyModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F5] text-[#12263A] flex flex-col antialiased">
      <SystemHeader />

      <main className="flex-1 pb-16">
        {role === "victim" ? (
          <VictimHome />
        ) : role === "admin" ? (
          <AdminConsole />
        ) : (
          <SupportConsole />
        )}
      </main>

      <footer className="border-t border-[#E1E6E2] bg-white py-6 px-4 text-center text-xs text-[#5A6E82]">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            <strong>MANOSETHU PLATFORM</strong> · Continuous Emotional Safety &amp; Human Care
          </p>
          <p className="text-[11px] text-[#2B9C91] font-semibold">
            AI assists. Humans decide. People receive support.
          </p>
        </div>
      </footer>

      <PrivacyPanel />
      <EmergencyModal />
    </div>
  );
}

function ManosethuSystemPage() {
  return (
    <ManosethuProvider>
      <ManosethuContent />
    </ManosethuProvider>
  );
}
