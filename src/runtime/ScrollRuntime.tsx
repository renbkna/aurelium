import Lenis from "lenis";
import { motionValue, type MotionValue } from "framer-motion";
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "destinations", label: "Destinations" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Stories" },
  { id: "contact", label: "Contact" },
] as const;

interface ScrollRuntimeValue {
  activeSection: string;
  progress: MotionValue<number>;
  scrolled: boolean;
  showScrollToTop: boolean;
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
}

const ScrollRuntimeContext = createContext<ScrollRuntimeValue | null>(null);

export const ScrollRuntimeProvider = ({ children }: { children: ReactNode }) => {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const useNativeScroll = reduceMotion || !hasFinePointer;
  const progress = useMemo(() => motionValue(0), []);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let lenis: Lenis | null = null;
    let frame = 0;
    let nativeFrame = 0;

    const syncScrollState = (scroll: number, nextProgress: number) => {
      progress.set(nextProgress);
      setScrolled(scroll > 50);
      setShowScrollToTop(scroll > 500);
    };
    const animate = (time: number) => {
      lenis?.raf(time);
      frame = requestAnimationFrame(animate);
    };
    const start = () => {
      if (frame === 0 && !document.hidden) {
        frame = requestAnimationFrame(animate);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const handleVisibility = () => (document.hidden ? stop() : start());

    const syncNativeScroll = () => {
      if (nativeFrame !== 0) {
        return;
      }
      nativeFrame = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        syncScrollState(window.scrollY, maxScroll > 0 ? window.scrollY / maxScroll : 0);
        nativeFrame = 0;
      });
    };

    if (useNativeScroll) {
      window.addEventListener("scroll", syncNativeScroll, { passive: true });
      syncNativeScroll();
    } else {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        touchMultiplier: 2,
      });
      lenis.on("scroll", ({ scroll, progress: nextProgress }) =>
        syncScrollState(scroll, nextProgress),
      );
      document.addEventListener("visibilitychange", handleVisibility);
      start();
    }

    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-34% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", syncNativeScroll);
      cancelAnimationFrame(nativeFrame);
      stop();
      lenis?.destroy();
    };
  }, [progress, useNativeScroll]);

  const value = useMemo<ScrollRuntimeValue>(
    () => ({
      activeSection,
      progress,
      scrolled,
      scrollToSection: (sectionId) => {
        const target = document.getElementById(sectionId);
        if (target) {
          const headerHeight =
            document.querySelector("header")?.getBoundingClientRect().height ?? 0;
          window.scrollTo({
            behavior: reduceMotion ? "auto" : "smooth",
            top: target.getBoundingClientRect().top + window.scrollY - headerHeight,
          });
        }
      },
      scrollToTop: () => window.scrollTo({ behavior: reduceMotion ? "auto" : "smooth", top: 0 }),
      showScrollToTop,
    }),
    [activeSection, progress, reduceMotion, scrolled, showScrollToTop],
  );

  return <ScrollRuntimeContext.Provider value={value}>{children}</ScrollRuntimeContext.Provider>;
};

export const useScrollRuntime = () => {
  const value = useContext(ScrollRuntimeContext);
  if (!value) {
    throw new Error("useScrollRuntime must be used within ScrollRuntimeProvider");
  }
  return value;
};
