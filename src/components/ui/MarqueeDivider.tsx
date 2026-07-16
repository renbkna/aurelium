import React from "react";
import { useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { usePageVisibility } from "../../hooks/usePageVisibility";

interface MarqueeDividerProps {
  texts?: string[];
  separator?: string;
  reverse?: boolean;
  speed?: number;
  className?: string;
  dark?: boolean;
}

const defaultTexts = ["Discover", "Explore", "Experience", "Dream", "Wander", "Journey"];

const MarqueeDivider: React.FC<MarqueeDividerProps> = ({
  texts = defaultTexts,
  separator = "✦",
  reverse = false,
  speed = 30,
  className = "",
  dark = false,
}) => {
  const [containerRef, inView] = useInView({ rootMargin: "200px 0px", threshold: 0 });
  const reduceMotion = useReducedMotion();
  const isPageVisible = usePageVisibility();
  const content = texts.map((t, i) => (
    <span key={t + String(i)} className="inline-flex items-center gap-8 mx-8">
      <span>{t}</span>
      <span className={`text-sm ${dark ? "text-secondary-400" : "text-secondary-500"}`}>
        {separator}
      </span>
    </span>
  ));

  const animationStyle: React.CSSProperties = {
    animationDuration: `${speed}s`,
    animationPlayState: inView && isPageVisible && !reduceMotion ? "running" : "paused",
  };

  return (
    <div
      ref={containerRef}
      className={`marquee-container py-6 border-y ${
        dark ? "border-dark-700/40 bg-dark-900" : "border-warm-200/60 bg-warm-50"
      } ${className}`}
    >
      <div
        className={reverse ? "marquee-content-reverse" : "marquee-content"}
        style={animationStyle}
      >
        <span
          className={`inline-flex items-center font-heading text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight ${
            dark ? "on-dark-text-secondary" : "theme-text-muted"
          }`}
        >
          {content}
          {content}
        </span>
      </div>
    </div>
  );
};

export default MarqueeDivider;
