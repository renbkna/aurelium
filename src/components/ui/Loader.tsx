import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const pathVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i: number) => ({
      opacity: 1,
      pathLength: 1,
      transition: {
        pathLength: {
          duration: 1.2,
          delay: i * 0.2,
          ease: [0.76, 0, 0.24, 1] as const,
        },
        opacity: { duration: 0.3, delay: i * 0.2 },
      },
    }),
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.6 + i * 0.05,
        ease: [0.22, 1, 0.36, 1] as const,
      },
      y: 0,
    }),
  };

  const letters = "Aurelium".split("");

  return (
    <motion.div
      className="fixed inset-0 bg-dark-900 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(27,122,90,0.15) 0%, rgba(212,165,116,0.08) 40%, transparent 70%)",
          }}
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      <div className="relative text-center z-10">
        <motion.div
          className="w-20 h-20 mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="url(#grad1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
              custom={0}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M2 17L12 22L22 17"
              stroke="url(#grad1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
              custom={1}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M2 12L12 17L22 12"
              stroke="url(#grad1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
              custom={2}
              initial="hidden"
              animate="visible"
            />
            <defs>
              <linearGradient id="grad1" x1="2" y1="2" x2="22" y2="22">
                <stop stopColor="#1b7a5a" />
                <stop offset="1" stopColor="#d4a574" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <div className="flex items-center justify-center mb-6 overflow-hidden">
          {letters.map((letter, i) => (
            <motion.span
              key={letter + String(i)}
              className="text-3xl md:text-4xl font-display font-bold text-white inline-block"
              variants={letterVariants}
              custom={i}
              initial="hidden"
              animate="visible"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="text-dark-300 text-sm tracking-[0.3em] uppercase mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Extraordinary Journeys
        </motion.p>

        <div className="w-48 mx-auto">
          <div className="h-0.5 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #1b7a5a, #d4a574)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <motion.p
            className="text-dark-400 text-xs mt-3 font-accent tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
