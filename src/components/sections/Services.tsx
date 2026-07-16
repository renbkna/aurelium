import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiCamera,
  FiCoffee,
  FiCompass,
  FiHeart,
  FiHome,
  FiMapPin,
  FiShield,
  FiWifi,
} from "react-icons/fi";
import useAnimatedScroll from "../../hooks/useAnimatedScroll";
import { responsiveImage } from "../../utils/responsiveImage";

const Services = () => {
  const sectionRef = useRef(null);
  const [titleRef, titleControls] = useAnimatedScroll({ threshold: 0.1 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "center center"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(20% 0 20% 0)", "inset(0% 0 0% 0)"],
  );
  const imageY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
      y: 0,
    },
  };

  const services = [
    {
      description: "Discover hidden gems with knowledgeable local guides.",
      icon: <FiMapPin />,
      title: "Expert-Guided Tours",
    },
    {
      description: "Every journey tailored to your unique preferences.",
      icon: <FiCompass />,
      title: "Bespoke Itineraries",
    },
    {
      description: "Round-the-clock assistance throughout your trip.",
      icon: <FiShield />,
      title: "24/7 Concierge",
    },
    {
      description: "Premium hotels, villas, and unique properties.",
      icon: <FiHome />,
      title: "Luxury Stays",
    },
    {
      description: "Professional sessions at stunning locations.",
      icon: <FiCamera />,
      title: "Photography",
    },
    {
      description: "Private dining, cooking classes, top restaurants.",
      icon: <FiCoffee />,
      title: "Culinary Journeys",
    },
    {
      description: "Spa, meditation, and wellness experiences.",
      icon: <FiHeart />,
      title: "Wellness",
    },
    {
      description: "Document your journey with our travel app.",
      icon: <FiWifi />,
      title: "Digital Journal",
    },
  ];

  return (
    <section id="services" className="theme-surface-subtle overflow-hidden" ref={sectionRef}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            {/* Decorative blurs */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary-200/20 dark:bg-primary-900/10 rounded-full mix-blend-multiply blur-3xl" />
            <div className="absolute -bottom-16 -right-12 w-64 h-64 bg-secondary-200/20 dark:bg-secondary-900/10 rounded-full mix-blend-multiply blur-3xl" />

            <motion.div className="relative z-10" style={{ clipPath, y: imageY }}>
              <div className="rounded-3xl overflow-hidden shadow-premium">
                <img
                  {...responsiveImage(
                    "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    "(max-width: 1024px) 100vw, 50vw",
                  )}
                  alt="Premium travel service"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
              </div>

              {/* Floating testimonial card */}
              <motion.div
                className="absolute -bottom-6 -right-6 lg:-right-10 w-80 glass-light rounded-2xl p-6 shadow-premium"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p className="text-primary-600 dark:text-primary-400 font-semibold text-xs uppercase tracking-wider mb-2">
                  Client Review
                </p>
                <p className="theme-text-primary text-sm italic mb-4 leading-relaxed">
                  "The attention to detail exceeded all our expectations. Truly the best travel
                  experience we've ever had."
                </p>
                <div className="flex items-center gap-3">
                  <img
                    {...responsiveImage(
                      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                      "40px",
                    )}
                    alt="Sarah Johnson"
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm theme-text-primary">Sarah Johnson</p>
                    <p className="text-xs theme-text-muted">Amalfi Coast Journey</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2">
            <motion.div
              ref={titleRef}
              initial="hidden"
              animate={titleControls}
              variants={fadeIn}
              className="max-w-xl"
            >
              <span className="label-text mb-4 block">Our Services</span>
              <h2 className="heading-2 mb-6 theme-text-primary">
                Exceptional <span className="text-gradient">Travel Services</span>
                <br />
                Beyond the Ordinary
              </h2>
              <p className="body-lg theme-text-secondary mb-12">
                From expert-guided tours to personalized concierge service, every aspect of your
                journey is crafted with meticulous attention.
              </p>

              {/* Service grid - minimalist icons with hover reveal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    className="theme-surface-hover group flex gap-4 p-4 rounded-2xl transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                  >
                    <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center text-lg group-hover:scale-110 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-all duration-300">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold mb-1 theme-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="service-description theme-text-muted text-xs leading-relaxed overflow-hidden transition-all duration-500">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
