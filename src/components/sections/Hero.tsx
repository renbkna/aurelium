import React, { useEffect, useRef, useState } from "react";
import type { Variants } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2938&q=80",
  "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-4.0.3&auto=format&fit=crop&w=1376&q=80",
];

const floatingPills = [
  { delay: 0, label: "Santorini", x: "12%", y: "20%" },
  { delay: 0.8, label: "Kyoto", x: "78%", y: "25%" },
  { delay: 1.2, label: "Bali", x: "18%", y: "72%" },
  { delay: 0.4, label: "Marrakech", x: "82%", y: "68%" },
  { delay: 1.6, label: "Patagonia", x: "55%", y: "82%" },
];

const Hero = () => {
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const textRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animations: gsap.core.Tween[] = [];
    const parallaxElement = parallaxRef.current;
    const textElement = textRef.current;

    if (parallaxElement && heroRef.current) {
      const parallaxTween = gsap.to(parallaxElement, {
        ease: "none",
        scale: 1.1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
      });
      animations.push(parallaxTween);
    }

    if (textElement && heroRef.current) {
      const textTween = gsap.to(textElement, {
        ease: "power2.out",
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "5% top",
          end: "30% top",
          scrub: true,
        },
        y: 100,
      });
      animations.push(textTween);
    }

    return () => {
      animations.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 3.4,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 1,
      },
      y: 0,
    },
  };

  const pillVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 4.2 + delay,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden" ref={heroRef}>
      {/* Background Image Carousel with Parallax */}
      <div className="absolute inset-0" style={{ transform: "translateZ(0)" }} ref={parallaxRef}>
        <AnimatePresence mode="sync">
          <motion.img
            key={currentImage}
            src={heroImages[currentImage]}
            alt="Hero Background"
            className="absolute inset-0 w-full h-[120%] object-cover object-center"
            style={{ transform: "translateZ(0)" }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as const }}
          />
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-dark-900/60 via-dark-900/30 to-dark-900/80" />
        <div className="absolute inset-0 bg-linear-to-r from-dark-900/50 via-transparent to-dark-900/30" />
      </div>

      {/* Grain texture overlay (Moved outside parallax container for performance) */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating destination pills */}
      <div className="absolute inset-0 z-10 hidden lg:block">
        {floatingPills.map((pill, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: pill.x, top: pill.y }}
            custom={pill.delay}
            variants={pillVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="glass-premium px-4 py-2 rounded-full text-white/70 text-xs font-accent tracking-widest uppercase cursor-default select-none"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                delay: i * 0.3,
                duration: 3 + i * 0.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              whileHover={{
                backgroundColor: "rgba(27,122,90,0.3)",
                scale: 1.1,
              }}
            >
              {pill.label}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex items-center justify-center" ref={textRef}>
        <div className="section-container">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Label */}
            <div className="overflow-hidden mb-6">
              <motion.p className="label-text text-secondary-300" variants={itemVariants}>
                Discover • Experience • Remember
              </motion.p>
            </div>

            {/* Headline */}
            <div className="overflow-hidden mb-8">
              <motion.h1
                className="heading-1 text-white font-heading text-balance"
                variants={itemVariants}
              >
                Where the world <span className="text-gradient-gold">reveals</span>
                <br />
                its secrets
              </motion.h1>
            </div>

            {/* Subtext */}
            <div className="overflow-hidden mb-12">
              <motion.p
                className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light"
                variants={itemVariants}
              >
                Bespoke journeys to the world's most extraordinary corners, crafted for those who
                seek wonder beyond the ordinary.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <motion.button
                data-magnetic="true"
                className="btn btn-accent btn-lg w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Begin Your Journey
              </motion.button>

              <motion.button
                data-magnetic="true"
                className="btn glass-premium text-white border-white/10 btn-lg w-full sm:w-auto hover:bg-white/10"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Destinations
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Image counter dots */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`transition-all duration-500 rounded-full ${
              i === currentImage
                ? "w-8 h-2 bg-secondary-400"
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/50 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.2, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
          onClick={() => {
            const el = document.querySelector("#experience");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span className="text-xs tracking-[0.3em] uppercase mb-3 group-hover:text-secondary-400 transition-colors">
            Scroll
          </span>
          <div className="w-px h-8 bg-linear-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
