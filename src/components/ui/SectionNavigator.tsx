import React from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS, useScrollRuntime } from "../../runtime/ScrollRuntime";

const SectionNavigator: React.FC = () => {
  const { activeSection, progress, scrollToSection } = useScrollRuntime();

  return (
    <div className="pointer-events-none fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
      <div className="relative flex min-h-[300px] flex-col items-center">
        {/* Progress line */}
        <div className="theme-navigation-track h-full w-[1.5px] overflow-hidden rounded-full">
          <motion.div
            className="h-full w-full origin-top rounded-full"
            style={{
              background: "linear-gradient(to bottom, #1b7a5a, #d4a574)",
              scaleY: progress,
            }}
          />
        </div>

        {/* Dots */}
        <div className="absolute inset-0 flex flex-col justify-between py-2">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = id === activeSection;

            return (
              <button
                key={id}
                type="button"
                className="pointer-events-auto group relative flex h-8 w-8 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60 rounded-full"
                onClick={() => scrollToSection(id)}
                aria-label={`Go to ${label}`}
                aria-current={isActive ? "true" : undefined}
              >
                <motion.span
                  className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-3 w-3 bg-secondary-400 shadow-glow-gold"
                      : "theme-navigation-dot h-2 w-2 group-hover:bg-primary-400"
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
