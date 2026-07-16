import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Variants } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { NAV_ITEMS, useScrollRuntime } from "../runtime/ScrollRuntime";

interface HeaderProps {
  onBookExperience: () => void;
}

const Header = ({ onBookExperience }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullNavigation, setShowFullNavigation] = useState(false);
  const showBookingAction = useMediaQuery("(min-width: 768px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const persistentActionsRef = useRef<HTMLDivElement>(null);
  const { toggleTheme, isDark } = useTheme();
  const { activeSection, scrolled, scrollToSection } = useScrollRuntime();

  useLayoutEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const navigation = navigationRef.current;
    const persistentActions = persistentActionsRef.current;
    if (!container || !logo || !navigation || !persistentActions) {
      return undefined;
    }

    let active = true;
    const measure = () => {
      const styles = window.getComputedStyle(container);
      const contentWidth =
        container.clientWidth -
        Number.parseFloat(styles.paddingLeft) -
        Number.parseFloat(styles.paddingRight);
      const sideWidth = Math.max(logo.offsetWidth, persistentActions.offsetWidth);
      const requiredWidth = navigation.scrollWidth + sideWidth * 2 + 32;
      if (active) {
        setShowFullNavigation(contentWidth >= requiredWidth);
      }
    };

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(logo);
    observer.observe(navigation);
    observer.observe(persistentActions);
    void document.fonts?.ready.then(measure);
    measure();

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [showBookingAction]);

  useEffect(() => {
    if (showFullNavigation) {
      setIsOpen(false);
    }
  }, [showFullNavigation]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
      y: 0,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants: Variants = {
    closed: {
      transition: { type: "spring", stiffness: 400, damping: 40 },
      x: "100%",
    },
    open: {
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
      x: "0%",
    },
  };

  const navItems = NAV_ITEMS.map(({ id, label }) => ({ name: label, to: id }));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-700 ${
        scrolled
          ? "py-3 theme-header-surface backdrop-blur-xl shadow-sm border-b"
          : "py-5 bg-transparent"
      }`}
    >
      <motion.div
        ref={containerRef}
        className={`mx-auto grid w-full max-w-[1440px] items-center px-4 sm:px-6 lg:px-8 ${
          showFullNavigation ? "grid-cols-[1fr_auto_1fr]" : "grid-cols-[1fr_auto]"
        }`}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        {/* Logo */}
        <motion.div
          ref={logoRef}
          className="flex items-center justify-self-start"
          variants={itemVariants}
        >
          <a href="/" aria-label="Aurelium home" className="flex items-center gap-2">
            <motion.div
              className={`text-2xl font-bold flex items-center group ${
                scrolled ? "text-primary-600 dark:text-primary-400" : "text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ damping: 10, stiffness: 400, type: "spring" }}
            >
              <svg
                className="w-7 h-7 mr-2 transition-transform group-hover:rotate-12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className={`font-display font-bold text-xl ${
                  scrolled ? "theme-text-primary" : "text-white"
                }`}
              >
                Aurelium
              </span>
            </motion.div>
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav
          ref={navigationRef}
          aria-hidden={!showFullNavigation}
          inert={!showFullNavigation}
          className={`items-center justify-self-center gap-0 xl:gap-1 ${
            showFullNavigation ? "relative flex" : "invisible absolute flex"
          }`}
          variants={navVariants}
        >
          {navItems.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <button
                type="button"
                onClick={() => scrollToSection(item.to)}
                className={`relative px-2 py-2 text-[13px] xl:px-4 xl:text-sm font-medium cursor-pointer transition-all duration-300 rounded-full ${
                  scrolled
                    ? activeSection === item.to
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                      : "theme-text-secondary hover:text-primary-600 dark:hover:text-primary-400"
                    : activeSection === item.to
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            </motion.div>
          ))}
        </motion.nav>

        {/* Right side */}
        <motion.div className="flex items-center gap-3 justify-self-end" variants={itemVariants}>
          <div ref={persistentActionsRef} className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              aria-label={isDark ? "Use light theme" : "Use dark theme"}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                scrolled
                  ? "theme-text-secondary hover:text-primary-600 hover:bg-primary-50 dark:hover:text-primary-400 dark:hover:bg-primary-900/20"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>

            {showBookingAction && (
              <button
                type="button"
                className={`header-booking-action btn text-[13px] xl:text-sm ${
                  scrolled
                    ? "btn-primary"
                    : "glass-premium text-white border-white/10 hover:bg-white/10"
                }`}
                data-book-experience-trigger
                onClick={onBookExperience}
              >
                Book Experience
              </button>
            )}
          </div>

          {!showFullNavigation && (
            <motion.button
              type="button"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-full ${scrolled ? "theme-text-primary" : "text-white"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && !showFullNavigation && (
          <motion.div
            className="fixed inset-0 z-50 bg-dark-900/98 backdrop-blur-xl"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            {/* Close button */}
            <div className="absolute top-5 right-5">
              <motion.button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsOpen(false)}
                className="text-white p-2"
                whileTap={{ scale: 0.9 }}
              >
                <FiX size={24} />
              </motion.button>
            </div>

            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={{
                    closed: { opacity: 0, y: 20 },
                    open: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.05 + index * 0.06 },
                    },
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      scrollToSection(item.to);
                      setIsOpen(false);
                    }}
                    className="text-3xl font-display font-medium text-white hover:text-secondary-400 transition-colors"
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}

              <motion.button
                type="button"
                className="mt-8 btn btn-accent btn-lg"
                data-book-experience-trigger
                onClick={() => {
                  onBookExperience();
                  setIsOpen(false);
                }}
                variants={{
                  closed: { opacity: 0, y: 20 },
                  open: { opacity: 1, y: 0, transition: { delay: 0.6 } },
                }}
              >
                Book Experience
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
