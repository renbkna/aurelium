import React from "react";

interface MarqueeDividerProps {
  texts?: string[];
  separator?: string;
  reverse?: boolean;
  speed?: number;
  className?: string;
  dark?: boolean;
}

const MarqueeDivider: React.FC<MarqueeDividerProps> = ({
  texts = ["Discover", "Explore", "Experience", "Dream", "Wander", "Journey"],
  separator = "✦",
  reverse = false,
  speed = 30,
  className = "",
  dark = false,
}) => {
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
  };

  return (
    <div
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
            dark ? "text-dark-300" : "text-dark-200"
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
