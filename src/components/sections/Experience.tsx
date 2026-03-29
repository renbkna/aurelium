import React, { useCallback, useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { FiAward, FiMapPin, FiShield, FiStar, FiUsers } from "react-icons/fi";
import useAnimatedScroll from "../../hooks/useAnimatedScroll";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  delay?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 2.5,
  decimals = 0,
  delay = 0,
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) {
      return;
    }

    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(value) {
        node.textContent = value.toFixed(decimals);
      },
    });

    return () => controls.stop();
  }, [from, to, duration, decimals, delay]);

  return <span ref={nodeRef} />;
};

const Experience = () => {
  const [containerRef, containerControls] = useAnimatedScroll({
    threshold: 0.15,
  });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { margin: "-100px", once: true });

  const fadeIn = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
      },
      y: 0,
    },
  };

  const staggeredItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const featureItem = {
    hidden: { opacity: 0, rotateX: 10, y: 40 },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
      y: 0,
    },
  };

  const featureCards = [
    {
      description:
        "Every journey is meticulously planned by our expert travel curators to deliver authentic and memorable experiences.",
      icon: <FiMapPin />,
      title: "Handcrafted Itineraries",
    },
    {
      description:
        "Exceptional accommodations, private transfers, and exclusive access to iconic landmarks and hidden gems.",
      icon: <FiAward />,
      title: "Premium Experience",
    },
    {
      description:
        "24/7 concierge service, comprehensive travel insurance, and local support throughout your journey.",
      icon: <FiShield />,
      title: "Peace of Mind",
    },
    {
      description:
        "Tailor-made experiences designed around your preferences, interests, and travel style.",
      icon: <FiUsers />,
      title: "Personalized Service",
    },
  ];

  const stats = [
    { label: "Happy Travelers", suffix: "+", value: 10000 },
    { label: "Destinations", suffix: "+", value: 120 },
    { label: "Years Experience", suffix: "+", value: 15 },
    {
      decimals: 1,
      icon: <FiStar className="text-secondary-400 fill-current" />,
      label: "Customer Rating",
      suffix: "",
      value: 4.9,
    },
  ];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  }, []);

  return (
    <section id="experience" className="bg-warm-100 dark:bg-dark-900 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-200/20 dark:bg-secondary-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={containerControls}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="label-text mb-4 block">Why Aurelium</span>
          <h2 className="heading-2 mb-6 text-dark-800 dark:text-white">
            Redefining <span className="text-gradient">Luxury Travel</span>
            <br />
            for the Modern Explorer
          </h2>
          <p className="body-lg text-dark-400 dark:text-dark-200 max-w-2xl mx-auto">
            We believe true luxury is found in authentic experiences, cultural immersion, and
            personalized service that connects you deeply to every destination.
          </p>
        </motion.div>

        {/* Feature cards with 3D tilt */}
        <motion.div
          initial="hidden"
          animate={containerControls}
          variants={staggeredItems}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              variants={featureItem}
              className="premium-card group cursor-default"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease-out",
              }}
            >
              <div className="mb-6 w-14 h-14 rounded-2xl bg-linear-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-600 dark:text-primary-400 flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow-primary">
                {card.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 text-dark-800 dark:text-white">{card.title}</h3>

              <p className="text-dark-400 dark:text-dark-200 text-sm leading-relaxed">
                {card.description}
              </p>

              {/* Bottom accent line */}
              <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-linear-to-r from-primary-500 to-secondary-400 transition-all duration-700 rounded-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section with animated counters */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-br from-primary-700 via-primary-800 to-dark-900" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1540544660406-6a69dacb2804?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />

          {/* Decorative elements */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-secondary-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 p-12 md:p-20 text-white">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-center">
              Our Journey in Numbers
            </h3>
            <p className="text-white/50 text-center mb-14 max-w-lg mx-auto">
              Over 15 years of crafting unforgettable travel experiences
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading">
                      {statsInView ? (
                        <AnimatedCounter
                          from={0}
                          to={stat.value}
                          duration={2.5}
                          decimals={stat.decimals || 0}
                          delay={0.3 + index * 0.2}
                        />
                      ) : (
                        "0"
                      )}
                    </span>
                    <span className="text-3xl md:text-4xl font-heading text-secondary-400">
                      {stat.suffix}
                    </span>
                    {stat.icon && <span className="text-2xl">{stat.icon}</span>}
                  </div>
                  <span className="text-sm text-white/50 tracking-wider uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
