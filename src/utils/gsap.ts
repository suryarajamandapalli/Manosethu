export async function getGsap() {
  if (typeof window === "undefined") return null;
  try {
    const gsapModule = await import("gsap");
    const scrollTriggerModule = await import("gsap/ScrollTrigger");
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
