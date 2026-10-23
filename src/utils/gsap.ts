export async function getGsap() {
  if (typeof window === "undefined") return null;
  try {
    const gsapModule = await import("gsap/dist/gsap.js");
    const scrollTriggerModule = await import("gsap/dist/ScrollTrigger.js");
    const gsap = (gsapModule as any).gsap || (gsapModule as any).default || gsapModule;
    const ScrollTrigger = (scrollTriggerModule as any).ScrollTrigger || (scrollTriggerModule as any).default || scrollTriggerModule;
    if (gsap && ScrollTrigger && typeof gsap.registerPlugin === "function") {
      gsap.registerPlugin(ScrollTrigger);
    }
    return { gsap, ScrollTrigger };
  } catch (err) {
    console.warn("GSAP dynamic load warning:", err);
    return null;
  }
}
