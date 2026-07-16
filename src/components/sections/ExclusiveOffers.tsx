import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowRight, FiClock, FiStar } from "react-icons/fi";
import useAnimatedScroll from "../../hooks/useAnimatedScroll";
import { usePageVisibility } from "../../hooks/usePageVisibility";
import { responsiveImage } from "../../utils/responsiveImage";

const INITIAL_REMAINING_SECONDS = 7 * 86_400 + 14 * 3_600 + 32 * 60 + 18;

const getTimeLeft = (deadline: number) => {
  const remaining = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
  return {
    days: Math.floor(remaining / 86_400),
    hours: Math.floor((remaining % 86_400) / 3_600),
    mins: Math.floor((remaining % 3_600) / 60),
    secs: remaining % 60,
  };
};

const ExclusiveOffers = () => {
  const [containerRef, containerControls] = useAnimatedScroll({
    threshold: 0.1,
  });
  const [sectionRef, sectionInView] = useInView({ threshold: 0, rootMargin: "200px" });
  const isPageVisible = usePageVisibility();
  const deadline = useRef(Date.now() + INITIAL_REMAINING_SECONDS * 1000);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(deadline.current));

  useEffect(() => {
    if (!sectionInView || !isPageVisible) {
      return undefined;
    }
    const update = () => setTimeLeft(getTimeLeft(deadline.current));
    update();
    const interval = window.setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [isPageVisible, sectionInView]);

  const offers = [
    {
      badge: "Limited Time",
      badgeColor: "bg-tertiary-500",
      description:
        "Private villa accommodations, exclusive sunset cruises, and VIP access to the island's finest restaurants.",
      discount: "17%",
      duration: "8 days",
      id: 1,
      image:
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2835&q=80",
      originalPrice: 3499,
      rating: 4.9,
      salePrice: 2899,
      title: "Santorini Luxury Escape",
    },
    {
      badge: "Best Seller",
      badgeColor: "bg-primary-600",
      description:
        "Private tea ceremonies, expert-guided temple visits, and authentic culinary experiences across Japan.",
      discount: "16%",
      duration: "12 days",
      id: 2,
      image:
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      originalPrice: 4299,
      rating: 4.8,
      salePrice: 3599,
      title: "Japanese Cultural Immersion",
    },
    {
      badge: "New",
      badgeColor: "bg-secondary-500",
      description:
        "Luxury desert camping, private guided tours of ancient medinas, and authentic Berber cultural experiences.",
      discount: "17%",
      duration: "10 days",
      id: 3,
      image:
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      originalPrice: 2999,
      rating: 4.7,
      salePrice: 2499,
      title: "Moroccan Desert Adventure",
    },
  ];

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

  return (
    <section ref={sectionRef} className="theme-surface-canvas overflow-hidden relative">
      {/* Decorative */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary-200/10 dark:bg-secondary-900/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={containerControls}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="label-text text-tertiary-500 dark:text-tertiary-400 mb-4 block">
            Exclusive Offers
          </span>
          <h2 className="heading-2 mb-6 theme-text-primary">
            Limited-Time <span className="text-gradient-warm">Luxury Deals</span>
          </h2>
          <p className="body-lg theme-text-secondary">
            Premium travel experiences at exceptional value. Book before they're gone.
          </p>
        </motion.div>

        {/* Stacked full-width offer cards */}
        <div className="space-y-8">
          {offers.map((offer, index) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              index={index}
              reverse={index % 2 !== 0}
              timeLeft={timeLeft}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface Offer {
  id: number;
  title: string;
  badge: string;
  badgeColor: string;
  originalPrice: number;
  salePrice: number;
  discount: string;
  image: string;
  duration: string;
  rating: number;
  description: string;
}

interface OfferCardProps {
  offer: Offer;
  index: number;
  reverse: boolean;
  timeLeft: ReturnType<typeof getTimeLeft>;
}

const OfferCard = ({ offer, index, reverse, timeLeft }: OfferCardProps) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl theme-surface-raised border theme-border-subtle shadow-card hover:shadow-premium transition-all duration-700"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-80px", once: true }}
      transition={{
        delay: index * 0.15,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-5 ${reverse ? "lg:[direction:rtl]" : ""}`}>
        {/* Image side - 3 cols */}
        <div className="lg:col-span-3 relative h-72 lg:h-[420px] overflow-hidden lg:[direction:ltr]">
          <img
            {...responsiveImage(offer.image, "(max-width: 1024px) 100vw, 60vw")}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-white/10 dark:to-dark-800/20" />
          <div className="absolute inset-0 bg-linear-to-t from-dark-900/50 via-transparent to-transparent lg:hidden" />

          {/* Badge */}
          <div className="absolute top-6 left-6">
            <span
              className={`${offer.badgeColor} text-white text-xs font-bold px-4 py-2 rounded-full tracking-wider uppercase`}
            >
              {offer.badge}
            </span>
          </div>

          {/* Discount badge */}
          <div className="absolute top-6 right-6">
            <div className="bg-dark-900/80 backdrop-blur-sm text-secondary-400 text-sm font-bold px-3 py-1.5 rounded-full">
              Save {offer.discount}
            </div>
          </div>
        </div>

        {/* Content side - 2 cols */}
        <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center lg:[direction:ltr]">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 text-secondary-400">
              <FiStar className="fill-current" size={14} />
              <span className="theme-text-primary text-sm font-semibold">{offer.rating}</span>
            </div>
            <div className="flex items-center gap-1 theme-text-muted">
              <FiClock size={14} />
              <span className="text-sm">{offer.duration}</span>
            </div>
          </div>

          <h3 className="text-2xl lg:text-3xl font-heading font-bold theme-text-primary mb-3">
            {offer.title}
          </h3>
          <p className="theme-text-secondary mb-6 leading-relaxed">{offer.description}</p>

          {/* Countdown */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wider theme-text-muted mb-3">Offer ends in</p>
            <div className="flex gap-3">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.mins },
                { label: "Secs", value: timeLeft.secs },
              ].map((t) => (
                <div key={t.label} className="text-center">
                  <div className="w-14 h-14 rounded-xl theme-surface-raised-strong flex items-center justify-center text-lg font-bold theme-text-primary font-accent tabular-nums">
                    {String(t.value).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] theme-text-muted uppercase tracking-wider mt-1 block">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-end justify-between">
            <div>
              <span className="theme-text-muted text-sm line-through">${offer.originalPrice}</span>
              <span className="block text-3xl font-bold theme-text-primary">
                ${offer.salePrice}
                <span className="theme-text-muted text-sm font-normal">/person</span>
              </span>
            </div>
            <motion.button className="btn btn-primary group/btn">
              Book Now
              <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExclusiveOffers;
