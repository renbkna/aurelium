import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FiArrowRight, FiMapPin, FiStar } from "react-icons/fi";
import useAnimatedScroll from "../../hooks/useAnimatedScroll";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { responsiveImage } from "../../utils/responsiveImage";

const Destinations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDesktopPinning = useMediaQuery("(min-width: 769px)");
  const [scrollDistance, setScrollDistance] = useState(0);
  const [titleRef, titleVariant] = useAnimatedScroll({ threshold: 0.1 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const trackX = useTransform(scrollYProgress, (progress) => -progress * scrollDistance);

  useLayoutEffect(() => {
    if (!isDesktopPinning) {
      setScrollDistance(0);
      return undefined;
    }
    const container = scrollContainerRef.current;
    if (!container) {
      return undefined;
    }
    const measure = () => {
      setScrollDistance(Math.max(0, container.scrollWidth - window.innerWidth + 100));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktopPinning]);

  const destinations = [
    {
      country: "Greece",
      description: "White-washed beauty against the Aegean Sea.",
      duration: "7 days",
      id: 1,
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      name: "Santorini",
      price: 2499,
      rating: 4.9,
    },
    {
      country: "Japan",
      description: "Timeless traditions and stunning temples.",
      duration: "10 days",
      id: 2,
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      name: "Kyoto",
      price: 3299,
      rating: 4.8,
    },
    {
      country: "Indonesia",
      description: "Spiritual tranquility amidst lush rice terraces.",
      duration: "8 days",
      id: 3,
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2938&q=80",
      name: "Bali",
      price: 1899,
      rating: 4.7,
    },
    {
      country: "Morocco",
      description: "Vibrant souks and timeless ancient charm.",
      duration: "9 days",
      id: 4,
      image:
        "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2835&q=80",
      name: "Marrakech",
      price: 2199,
      rating: 4.8,
    },
    {
      country: "Argentina",
      description: "Dramatic peaks and pristine glaciers.",
      duration: "12 days",
      id: 5,
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      name: "Patagonia",
      price: 3799,
      rating: 4.9,
    },
  ];

  const titleAnimation = {
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

  return (
    <section
      id="destinations"
      className="horizontal-scroll-section relative bg-dark-900"
      ref={sectionRef}
      style={{ height: isDesktopPinning ? `calc(100vh + ${scrollDistance}px)` : "auto" }}
    >
      <div
        className={
          isDesktopPinning ? "sticky top-0 h-screen overflow-clip pt-24 md:pt-32" : "py-24"
        }
      >
        {/* Section header - positioned absolutely within pinned section */}
        <div className="section-container mb-12">
          <motion.div
            ref={titleRef}
            initial="hidden"
            animate={titleVariant}
            variants={titleAnimation}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <span className="label-text text-secondary-400 mb-4 block">
                Featured Destinations
              </span>
              <h2 className="heading-2 text-white">
                Extraordinary <span className="text-gradient-gold">Destinations</span>
              </h2>
            </div>
            <p className="on-dark-text-secondary max-w-md text-sm leading-relaxed">
              From iconic landmarks to hidden gems, swipe through our curated collection of
              destinations that offer transformative experiences.
            </p>
          </motion.div>
        </div>

        {/* Horizontal scroll container */}
        <motion.div
          ref={scrollContainerRef}
          className={
            isDesktopPinning
              ? "horizontal-scroll-container pl-8 md:pl-16 lg:pl-24"
              : "section-container grid grid-cols-1 gap-6"
          }
          style={isDesktopPinning ? { x: trackX } : undefined}
        >
          {destinations.map((dest, index) => (
            <div
              key={dest.id}
              className={`destination-panel group ${
                isDesktopPinning
                  ? "horizontal-scroll-panel"
                  : "relative h-[36rem] overflow-hidden rounded-3xl"
              }`}
            >
              {/* Background image with parallax */}
              <div className="absolute inset-0 overflow-hidden bg-dark-900">
                <DestinationImage
                  source={dest.image}
                  alt={dest.name}
                  index={index}
                  panelCount={destinations.length + 1}
                  progress={scrollYProgress}
                  parallax={isDesktopPinning}
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-dark-900 via-dark-900/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-linear-to-r from-dark-900/40 to-transparent" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 md:p-10">
                {/* Top */}
                <div className="flex items-center justify-between">
                  <div className="glass-premium px-4 py-2 rounded-full text-white text-xs font-accent tracking-wider">
                    {dest.duration}
                  </div>
                  <div className="flex items-center gap-1 text-secondary-400">
                    <FiStar className="fill-current" size={14} />
                    <span className="text-white text-sm font-medium">{dest.rating}</span>
                  </div>
                </div>

                {/* Bottom */}
                <div>
                  {/* Large destination name */}
                  <h3 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-1 leading-none">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 mb-6">
                    <FiMapPin size={14} />
                    <span className="text-sm">{dest.country}</span>
                  </div>
                  <p className="text-white/50 text-sm mb-6 max-w-sm">{dest.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider">From</p>
                      <p className="text-2xl font-bold text-white">
                        ${dest.price}
                        <span className="text-white/40 text-sm font-normal">/person</span>
                      </p>
                    </div>
                    <motion.button className="btn btn-accent btn-sm group/btn">
                      Explore
                      <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Index number */}
              <div className="absolute top-8 right-10 text-white/5 text-[12rem] font-heading font-bold leading-none select-none pointer-events-none">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          ))}

          {/* CTA panel at the end */}
          <div
            className={`flex items-center justify-center bg-linear-to-br from-primary-800 to-primary-900 rounded-3xl ${
              isDesktopPinning ? "horizontal-scroll-panel" : "min-h-88"
            }`}
          >
            <div className="text-center p-10">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Ready to explore?
              </h3>
              <p className="text-white/50 mb-8 max-w-sm mx-auto">
                Discover all our destinations and find your perfect journey.
              </p>
              <motion.button className="btn btn-accent btn-lg">
                View All Destinations <FiArrowRight />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const DestinationImage = ({
  alt,
  index,
  panelCount,
  parallax,
  progress,
  source,
}: {
  alt: string;
  index: number;
  panelCount: number;
  parallax: boolean;
  progress: MotionValue<number>;
  source: string;
}) => {
  const start = index / panelCount;
  const end = (index + 2) / panelCount;
  const x = useTransform(progress, [start, end], ["-15%", "15%"]);

  return (
    <motion.img
      {...responsiveImage(source, "(max-width: 1058px) 85vw, 900px")}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="panel-image absolute inset-[-15%] w-[130%] h-[130%] max-w-none object-cover object-center transition-transform duration-700 group-hover:scale-105"
      style={parallax ? { x } : undefined}
    />
  );
};

export default Destinations;
