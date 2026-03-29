import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import useAnimatedScroll from "../../hooks/useAnimatedScroll";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [titleRef, titleControls] = useAnimatedScroll({ threshold: 0.1 });

  const testimonials = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      location: "Santorini, Greece",
      name: "Alexandra Thompson",
      position: "Travel Enthusiast",
      quote:
        "Aurelium transformed what would have been a typical vacation into a life-changing journey. Their attention to detail and personalized service made every moment truly special. The private sunset cruise in Santorini was an experience we'll treasure forever.",
      rating: 5,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      location: "Kyoto, Japan",
      name: "Marcus Williamson",
      position: "Adventure Seeker",
      quote:
        "Our journey through Japan was meticulously planned yet felt effortless. From private tea ceremonies to exclusive access to historic temples, Aurelium created authentic cultural experiences far beyond typical tourist attractions.",
      rating: 5,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1488716820095-cbe80883c496?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      location: "Bali, Indonesia",
      name: "Isabella Rodriguez",
      position: "Honeymoon Traveler",
      quote:
        "We couldn't have dreamed of a more perfect honeymoon. Our private villa was paradise, and the surprise dinner on the beach under the stars was magical. Every single detail was thoughtfully arranged.",
      rating: 5,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      location: "Costa Rica",
      name: "David Chen",
      position: "Family Traveler",
      quote:
        "Traveling with three children can be challenging, but Aurelium made our Costa Rica adventure smooth and enjoyable for everyone. The activities were perfectly balanced for all ages.",
      rating: 5,
    },
  ];

  const goToPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
      y: 0,
    },
  };

  const slideVariants = {
    center: { x: 0, opacity: 1 },
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="bg-dark-900 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-700/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="label-text text-secondary-400 mb-4 block">Client Stories</span>
          <h2 className="heading-2 mb-6 text-white">
            Voices of Our <span className="text-gradient-gold">Travelers</span>
          </h2>
          <p className="body-lg text-dark-300">
            Real stories from real explorers who trusted us with their journeys.
          </p>
        </motion.div>

        {/* Single testimonial — large format */}
        <div className="max-w-5xl mx-auto relative">
          {/* Large decorative quote */}
          <div className="absolute -top-16 left-0 text-[20rem] leading-none font-heading text-white/[0.02] select-none pointer-events-none">
            "
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-center"
            >
              {/* Photo */}
              <div className="relative mx-auto md:mx-0 w-fit shrink-0">
                <div className="w-48 h-48 md:w-64 md:h-72 rounded-3xl overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                {/* Decorative border */}
                <div className="absolute -inset-3 rounded-3xl border border-secondary-400/20 -z-10" />
                <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-linear-to-br from-primary-700 to-secondary-600 rounded-2xl -z-20 opacity-50" />
              </div>

              {/* Quote content */}
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {Array(t.rating)
                    .fill(0)
                    .map((_, i) => (
                      <FiStar key={i} className="text-secondary-400 fill-current" size={16} />
                    ))}
                </div>

                <blockquote className="text-xl md:text-2xl lg:text-3xl font-heading text-white leading-relaxed mb-8">
                  "{t.quote}"
                </blockquote>

                <div>
                  <p className="text-white font-semibold text-lg">{t.name}</p>
                  <p className="text-dark-300 text-sm">
                    {t.position} · {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-14">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className={`transition-all duration-500 rounded-full ${
                    current === index
                      ? "w-8 h-2 bg-secondary-400"
                      : "w-2 h-2 bg-dark-600 hover:bg-dark-500"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={goToPrev}
                className="p-3 rounded-full border border-dark-600 text-white hover:border-secondary-400 hover:text-secondary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={goToNext}
                className="p-3 rounded-full border border-dark-600 text-white hover:border-secondary-400 hover:text-secondary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
