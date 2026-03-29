import React, { useCallback, useEffect, useState } from "react";
import type { Variants } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

interface HeaderProps {
  onBookExperience?: () => void;
}

const Header = ({ onBookExperience = () => {} }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.to))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.querySelector(`#${sectionId}`);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ behavior: "smooth", top });
    }
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08,
        delayChildren: 1.5,
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

  const navItems = [
    { name: "Home", offset: -80, to: "hero" },
    { name: "Experiences", offset: -80, to: "experience" },
    { name: "Destinations", offset: -80, to: "destinations" },
    { name: "Services", offset: -80, to: "services" },
    { name: "Gallery", offset: -80, to: "gallery" },
    { name: "Stories", offset: -80, to: "testimonials" },
    { name: "Contact", offset: -80, to: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-700 ${
        scrolled
          ? "py-3 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl shadow-sm border-b border-warm-200/50 dark:border-dark-700/50"
          : "py-5 bg-transparent"
      }`}
    >
      <motion.div
        className="section-container flex items-center justify-between"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        {/* Logo */}
        <motion.div className="flex items-center" variants={itemVariants}>
          <a href="/" className="flex items-center gap-2">
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
                  scrolled ? "text-dark-800 dark:text-white" : "text-white"
                }`}
              >
                Aurelium
              </span>
            </motion.div>
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav className="hidden lg:flex items-center gap-1" variants={navVariants}>
          {navItems.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <button
                type="button"
                onClick={() => scrollToSection(item.to)}
                className={`relative px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300 rounded-full ${
                  scrolled
                    ? activeSection === item.to
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                      : "text-dark-600 hover:text-primary-600 dark:text-dark-200 dark:hover:text-primary-400"
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
        <motion.div className="flex items-center gap-3" variants={itemVariants}>
          <motion.button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              scrolled
                ? "text-dark-600 hover:text-primary-600 hover:bg-primary-50 dark:text-dark-200 dark:hover:text-primary-400 dark:hover:bg-primary-900/20"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>

          <motion.button
            className={`hidden md:flex btn text-sm ${
              scrolled
                ? "btn-primary"
                : "glass-premium text-white border-white/10 hover:bg-white/10"
            }`}
            onClick={onBookExperience}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Experience
          </motion.button>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2.5 rounded-full ${
              scrolled ? "text-dark-800 dark:text-white" : "text-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 bg-dark-900/98 backdrop-blur-xl"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            {/* Close button */}
            <div className="absolute top-5 right-5">
              <motion.button
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
                className="mt-8 btn btn-accent btn-lg"
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
