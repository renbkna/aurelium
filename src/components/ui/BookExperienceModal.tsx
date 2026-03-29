import React, { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiPhone, FiSend, FiUsers, FiX } from "react-icons/fi";

const destinations = [
  "Santorini, Greece",
  "Kyoto, Japan",
  "Bali, Indonesia",
  "Marrakech, Morocco",
  "Patagonia, Argentina",
];

const experiences = [
  "Luxury Escape",
  "Cultural Immersion",
  "Adventure Retreat",
  "Family Getaway",
  "Honeymoon Collection",
];

interface BookExperienceModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const BookExperienceModal = ({ isOpen, onClose }: BookExperienceModalProps) => {
  const initialFocusRef = useRef<HTMLSelectElement>(null);
  const headingId = useId();

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const focusTimer = window.setTimeout(() => {
        initialFocusRef.current?.focus();
      }, 20);

      return () => {
        document.body.style.overflow = previousOverflow;
        window.clearTimeout(focusTimer);
      };
    }
    return;
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleBackdropInteraction = (event: React.MouseEvent | React.TouchEvent) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-warm-200 dark:border-dark-600 bg-white dark:bg-dark-700 px-4 py-3 text-sm text-dark-800 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-100 bg-dark-900/70 backdrop-blur-sm flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleBackdropInteraction}
          onTouchStart={handleBackdropInteraction}
        >
          <motion.div
            className="relative w-full max-w-3xl bg-white dark:bg-dark-800 rounded-3xl shadow-premium overflow-hidden border border-warm-200 dark:border-dark-700"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ damping: 25, stiffness: 200, type: "spring" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
          >
            <button
              type="button"
              className="absolute top-5 right-5 p-2 rounded-full bg-warm-200/60 dark:bg-dark-700 text-dark-600 dark:text-dark-200 hover:bg-warm-200 dark:hover:bg-dark-600 transition-colors z-10"
              onClick={onClose}
              aria-label="Close booking modal"
            >
              <FiX size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 md:p-10">
                <div className="mb-6">
                  <span className="label-text">Tailored Consultation</span>
                  <h3
                    id={headingId}
                    className="mt-3 text-2xl md:text-3xl font-heading font-semibold text-dark-800 dark:text-white"
                  >
                    Design your bespoke experience
                  </h3>
                  <p className="mt-2 text-sm text-dark-400 dark:text-dark-200">
                    Share your dream getaway details and we'll craft a personalized itinerary within
                    24 hours.
                  </p>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={(event: React.FormEvent) => {
                    event.preventDefault();
                    onClose?.();
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs font-semibold text-dark-500 dark:text-dark-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <FiMapPin className="text-primary-500" size={12} /> Destination
                      </span>
                      <select
                        ref={initialFocusRef}
                        className={inputClasses}
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Choose destination
                        </option>
                        {destinations.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-xs font-semibold text-dark-500 dark:text-dark-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <FiCalendar className="text-primary-500" size={12} /> Dates
                      </span>
                      <input
                        type="text"
                        className={inputClasses}
                        placeholder="e.g. 10–18 May 2025"
                        required
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs font-semibold text-dark-500 dark:text-dark-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <FiUsers className="text-primary-500" size={12} /> Travelers
                      </span>
                      <input
                        type="number"
                        min="1"
                        className={inputClasses}
                        placeholder="Number of guests"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-semibold text-dark-500 dark:text-dark-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <FiPhone className="text-primary-500" size={12} /> Phone
                      </span>
                      <input
                        type="tel"
                        className={inputClasses}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-xs font-semibold text-dark-500 dark:text-dark-300 uppercase tracking-wider mb-2 block">
                      Experience type
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {experiences.map((experience) => (
                        <label key={experience} className="relative block cursor-pointer">
                          <input
                            type="radio"
                            name="experience"
                            value={experience}
                            className="peer sr-only"
                            required
                          />
                          <span className="flex items-center justify-center rounded-xl border border-warm-200 dark:border-dark-600 bg-white dark:bg-dark-700 px-3 py-2.5 text-center text-xs font-medium text-dark-500 dark:text-dark-300 transition-all peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-700 dark:peer-checked:bg-primary-900/20 dark:peer-checked:text-primary-300 hover:border-primary-300 dark:hover:border-primary-500/30">
                            {experience}
                          </span>
                        </label>
                      ))}
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-dark-500 dark:text-dark-300 uppercase tracking-wider mb-2 block">
                      Details
                    </span>
                    <textarea
                      className={inputClasses}
                      rows={3}
                      placeholder="Tell us about your dream journey..."
                    />
                  </label>

                  <motion.button
                    type="submit"
                    className="w-full btn btn-primary py-3.5"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Itinerary <FiSend size={14} />
                  </motion.button>
                </form>

                <p className="mt-4 text-[11px] text-dark-300 dark:text-dark-400">
                  A concierge will reach out within one business day.
                </p>
              </div>

              {/* Right panel */}
              <div className="hidden md:flex flex-col justify-center bg-linear-to-br from-primary-700 via-primary-800 to-dark-900 text-white p-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-heading font-semibold">What happens next?</h4>
                    <ul className="mt-4 space-y-3 text-sm text-white/60">
                      <li className="flex gap-2">
                        <span className="text-secondary-400">•</span>
                        Dedicated concierge call tailored to your preferences.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-secondary-400">•</span>
                        Curated itinerary with luxury stays and insider access.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-secondary-400">•</span>
                        Complimentary adjustments until everything feels perfect.
                      </li>
                    </ul>
                  </div>

                  <div className="glass-premium rounded-2xl p-5">
                    <p className="text-sm text-white/60 italic">
                      "Aurelium anticipated every detail—the experience felt truly bespoke."
                    </p>
                    <p className="mt-3 text-sm font-semibold text-secondary-300">
                      Amelia R., Amalfi Coast
                    </p>
                  </div>

                  <div className="text-sm text-white/40">
                    Prefer to talk?{" "}
                    <a
                      href="tel:+15551234567"
                      className="font-semibold text-secondary-400 hover:underline"
                    >
                      Call our team
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookExperienceModal;
