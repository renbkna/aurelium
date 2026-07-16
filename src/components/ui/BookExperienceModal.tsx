import React, { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCalendar,
  FiCompass,
  FiMail,
  FiMapPin,
  FiSend,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

const destinations = [
  "Santorini, Greece",
  "Kyoto, Japan",
  "Bali, Indonesia",
  "Marrakech, Morocco",
  "Patagonia, Argentina",
  "I'm not sure yet",
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
  onClose: () => void;
}

const focusableSelector = [
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "a[href]",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const BookExperienceModal = ({ isOpen, onClose }: BookExperienceModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const initialFocusRef = useRef<HTMLInputElement>(null);
  const headingId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const activeElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousFocus = activeElement === document.body ? null : activeElement;
    const focusTimer = window.setTimeout(() => initialFocusRef.current?.focus(), 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) {
        event.preventDefault();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);

      window.setTimeout(() => {
        if (previousFocus?.isConnected) {
          previousFocus.focus();
          return;
        }
        const fallback = Array.from(
          document.querySelectorAll<HTMLElement>(
            '[aria-label="Open navigation menu"], [data-book-experience-trigger]',
          ),
        ).find((element) => element.getClientRects().length > 0);
        fallback?.focus();
      }, 0);
    };
  }, [isOpen, onClose]);

  const handleBackdropInteraction = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const inputClasses =
    "w-full rounded-xl border theme-border-control theme-surface-raised-strong px-4 py-3 text-sm theme-text-primary focus:border-primary-500 focus:ring-2 focus:ring-primary-400/20 transition-all duration-300";
  const labelClasses =
    "text-xs font-semibold theme-text-muted uppercase tracking-wider flex items-center gap-1.5 mb-2";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-100 bg-dark-900/70 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onPointerDown={handleBackdropInteraction}
        >
          <motion.dialog
            ref={dialogRef}
            open
            className="relative m-0 flex max-h-[min(40rem,calc(100dvh-2rem))] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border theme-border-subtle theme-surface-raised shadow-premium sm:rounded-3xl"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ damping: 28, stiffness: 260, type: "spring" }}
            aria-modal="true"
            aria-labelledby={headingId}
            aria-describedby={descriptionId}
          >
            <header className="relative shrink-0 border-b theme-border-subtle px-5 py-5 pr-16 sm:px-8 sm:py-6 sm:pr-20">
              <span className="label-text">Tailored Consultation</span>
              <h2
                id={headingId}
                className="mt-2 text-2xl font-heading font-semibold theme-text-primary sm:text-3xl"
              >
                Design your bespoke experience
              </h2>
              <p id={descriptionId} className="mt-2 max-w-xl text-sm theme-text-secondary">
                Tell us where you want to go. A dedicated concierge will follow up within one
                business day.
              </p>

              <button
                type="button"
                className="absolute right-4 top-4 rounded-full p-2.5 theme-surface-raised-strong theme-text-secondary transition-colors hover:bg-warm-200 dark:hover:bg-dark-600 sm:right-6 sm:top-6"
                onClick={onClose}
                aria-label="Close booking modal"
              >
                <FiX size={18} />
              </button>
            </header>

            <form
              className="flex min-h-0 flex-1 flex-col"
              onSubmit={(event: React.FormEvent) => {
                event.preventDefault();
                onClose();
              }}
            >
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClasses}>
                      <FiUser className="text-primary-500" size={12} /> Name
                    </span>
                    <input
                      ref={initialFocusRef}
                      type="text"
                      name="name"
                      autoComplete="name"
                      className={inputClasses}
                      placeholder="Your name"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className={labelClasses}>
                      <FiMail className="text-primary-500" size={12} /> Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      className={inputClasses}
                      placeholder="you@example.com"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className={labelClasses}>
                      <FiMapPin className="text-primary-500" size={12} /> Destination
                    </span>
                    <select name="destination" className={inputClasses} defaultValue="" required>
                      <option value="" disabled>
                        Choose a destination
                      </option>
                      {destinations.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className={labelClasses}>
                      <FiCalendar className="text-primary-500" size={12} /> Approximate dates
                    </span>
                    <input
                      type="text"
                      name="dates"
                      className={inputClasses}
                      placeholder="Early October or flexible"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className={labelClasses}>
                      <FiUsers className="text-primary-500" size={12} /> Travelers
                    </span>
                    <input
                      type="number"
                      name="travelers"
                      min="1"
                      inputMode="numeric"
                      className={inputClasses}
                      placeholder="Number of guests"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className={labelClasses}>
                      <FiCompass className="text-primary-500" size={12} /> Experience
                    </span>
                    <select name="experience" className={inputClasses} defaultValue="" required>
                      <option value="" disabled>
                        Choose an experience
                      </option>
                      {experiences.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block sm:col-span-2">
                    <span className={labelClasses}>Optional details</span>
                    <textarea
                      name="details"
                      className={inputClasses}
                      rows={2}
                      placeholder="Tell us what would make this journey unforgettable..."
                    />
                  </label>
                </div>
              </div>

              <footer className="shrink-0 border-t theme-border-subtle px-5 py-4 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-8">
                <p className="mb-3 text-[11px] theme-text-muted sm:mb-0">
                  No commitment—just thoughtful planning with a travel expert.
                </p>
                <button type="submit" className="btn btn-primary w-full shrink-0 py-3 sm:w-auto">
                  Request Consultation <FiSend size={14} />
                </button>
              </footer>
            </form>
          </motion.dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookExperienceModal;
