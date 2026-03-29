import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "destinations", label: "Destinations" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Stories" },
  { id: "contact", label: "Contact" },
];

const handleNavigate = (sectionId: string) => {
  const target = document.querySelector(`#${sectionId}`);
  if (!target) {
    return;
  }

  const offset = 80;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    behavior: "smooth",
    top: targetPosition,
  });
};

const SectionNavigator: React.FC = () => {
  const [activeSection, setActiveSection] = useState(NAV_ITEMS[0]?.id ?? "");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navItems = useMemo(() => NAV_ITEMS, []);

  useEffect(() => {
    const handleScrollProgress = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min((scrollTop / maxScroll) * 100, 100) : 0;
      setScrollProgress(progress);
    };

    handleScrollProgress();
    window.addEventListener("scroll", handleScrollProgress, { passive: true });
    window.addEventListener("resize", handleScrollProgress);

    return () => {
      window.removeEventListener("scroll", handleScrollProgress);
      window.removeEventListener("resize", handleScrollProgress);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleActiveSection = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = navItems[0]?.id ?? "";

      navItems.forEach(({ id }) => {
        const section = document.querySelector<HTMLElement>(`#${id}`);
        if (!section) {
          return;
        }

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (probe >= sectionTop) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    handleActiveSection();
    window.addEventListener("scroll", handleActiveSection, { passive: true });
    window.addEventListener("resize", handleActiveSection);

    return () => {
      window.removeEventListener("scroll", handleActiveSection);
      window.removeEventListener("resize", handleActiveSection);
    };
  }, [navItems]);

  if (navItems.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
      <div className="relative flex min-h-[300px] flex-col items-center">
        {/* Progress line */}
        <div className="h-full w-[1.5px] overflow-hidden rounded-full bg-dark-200/20 dark:bg-dark-700/40">
          <motion.div
            className="w-full rounded-full"
            style={{
              background: "linear-gradient(to bottom, #1b7a5a, #d4a574)",
              height: `${scrollProgress}%`,
            }}
          />
        </div>

        {/* Dots */}
        <div className="absolute inset-0 flex flex-col justify-between py-2">
          {navItems.map(({ id, label }) => {
            const isActive = id === activeSection;

            return (
              <button
                key={id}
                type="button"
                className="pointer-events-auto group relative flex h-8 w-8 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60 rounded-full"
                onClick={() => handleNavigate(id)}
                aria-label={`Go to ${label}`}
                aria-current={isActive ? "true" : undefined}
              >
                <motion.span
                  className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-3 w-3 bg-secondary-400 shadow-glow-gold"
                      : "h-2 w-2 bg-dark-300/40 dark:bg-dark-500 group-hover:bg-primary-400"
                  }`}
                  layout
                >
                  {isActive && (
                    <motion.span
                      className="absolute -inset-2 rounded-full bg-secondary-400/15"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.span>

                {/* Label tooltip */}
                <span className="pointer-events-none absolute right-full mr-4 rounded-lg bg-dark-800/90 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase text-dark-100 shadow-lg opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 dark:bg-dark-700/90 whitespace-nowrap">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionNavigator;
