import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/manosethu/Navbar";
import { Chapter01Hero } from "@/components/manosethu/Chapter01Hero";
import { Chapter02Journey } from "@/components/manosethu/Chapter02Journey";
import { Chapter03Reality } from "@/components/manosethu/Chapter03Reality";
import { Chapter04System } from "@/components/manosethu/Chapter04System";
import { InnovationGrid } from "@/components/manosethu/InnovationGrid";
import { Chapter05Oversight } from "@/components/manosethu/Chapter05Oversight";
import { Chapter06Ending } from "@/components/manosethu/Chapter06Ending";
import { ExperienceMenu } from "@/components/manosethu/ExperienceMenu";
import { ZenMode } from "@/components/manosethu/ZenMode";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manosethu — Support Should Reach People Before Crisis" },
      {
        name: "description",
        content:
          "Manosethu helps keep well-being visible throughout a person's journey from complaint registration to rehabilitation.",
      },
      { property: "og:title", content: "Manosethu — Support Should Reach People Before Crisis" },
      {
        property: "og:description",
        content:
          "Manosethu helps keep well-being visible throughout a person's journey from complaint registration to rehabilitation.",
      },
      { property: "og:image", content: "/manosethu-logo.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Manosethu — Support Should Reach People Before Crisis" },
      {
        name: "twitter:description",
        content:
          "Manosethu helps keep well-being visible throughout a person's journey from complaint registration to rehabilitation.",
      },
      { name: "twitter:image", content: "/manosethu-logo.jpg" },
    ],
  }),
  component: ManosethuLandingPage,
});

function ManosethuLandingPage() {
  // Restore from localStorage (client-side only)
  const [darkMode, setDarkMode] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [zenMode, setZenMode] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedDark = localStorage.getItem("manosethu-dark") === "true";
    const savedMusic = localStorage.getItem("manosethu-music") === "true";
    setDarkMode(savedDark);
    // Never auto-start music — respect user intent
    // savedMusic is used only to restore UI state, audio starts only on user click
    void savedMusic;
  }, []);

  // Apply dark class to <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("manosethu-dark", String(darkMode));
  }, [darkMode]);

  // Music toggle handler — lazy import audio util (browser only)
  const handleMusicToggle = useCallback(async () => {
    if (typeof window === "undefined") return;
    const { startAmbient, stopAmbient } = await import("@/utils/ambientAudio");
    if (!musicOn) {
      startAmbient(3.0);
      setMusicOn(true);
      localStorage.setItem("manosethu-music", "true");
    } else {
      stopAmbient(2.5);
      setMusicOn(false);
      localStorage.setItem("manosethu-music", "false");
    }
  }, [musicOn]);

  const handleDarkModeChange = useCallback((v: boolean) => {
    setDarkMode(v);
  }, []);

  const handleZenToggle = useCallback(() => {
    setZenMode((v) => !v);
  }, []);

  const handleZenClose = useCallback(() => {
    setZenMode(false);
  }, []);

  // Dark mode background
  const bgClass = darkMode
    ? "min-h-screen flex flex-col bg-[#08152a] text-[#d4e4f2] font-sans antialiased selection:bg-[#2B9C91] selection:text-white transition-colors duration-500"
    : "min-h-screen flex flex-col bg-[#F6F7F5] text-[#12263A] font-sans antialiased selection:bg-[#2B9C91] selection:text-white transition-colors duration-500";

  return (
    <div className={bgClass}>
      {/* Navbar */}
      <Navbar darkMode={darkMode} />

      {/* Chapters */}
      <Chapter01Hero darkMode={darkMode} />
      <Chapter02Journey darkMode={darkMode} />
      <Chapter03Reality darkMode={darkMode} />
      <Chapter04System darkMode={darkMode} />
      <InnovationGrid darkMode={darkMode} />
      <Chapter05Oversight darkMode={darkMode} />
      <Chapter06Ending darkMode={darkMode} />

      {/* Experience Side Menu */}
      <ExperienceMenu
        darkMode={darkMode}
        onDarkModeChange={handleDarkModeChange}
        musicOn={musicOn}
        onMusicToggle={handleMusicToggle}
        zenMode={zenMode}
        onZenModeToggle={handleZenToggle}
      />

      {/* Zen Mode Overlay */}
      <ZenMode
        isOpen={zenMode}
        onClose={handleZenClose}
        musicEnabled={musicOn}
        onMusicToggle={handleMusicToggle}
      />
    </div>
  );
}
