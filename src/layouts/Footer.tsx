import React from "react";
import { motion } from "framer-motion";
import { FiArrowUp, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const scrollToTop = () => {
  window.scrollTo({ behavior: "smooth", top: 0 });
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
      y: 0,
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.06 },
    },
  };

  const socialLinks = [
    { icon: <FaFacebookF />, label: "Facebook", url: "#" },
    { icon: <FaTwitter />, label: "Twitter", url: "#" },
    { icon: <FaInstagram />, label: "Instagram", url: "#" },
    { icon: <FaPinterest />, label: "Pinterest", url: "#" },
    { icon: <FaYoutube />, label: "YouTube", url: "#" },
    { icon: <FaTiktok />, label: "TikTok", url: "#" },
  ];

  const destinations = [
    "Santorini, Greece",
    "Kyoto, Japan",
    "Bali, Indonesia",
    "Marrakech, Morocco",
    "Patagonia, Argentina",
    "Amalfi Coast, Italy",
  ];

  const experiences = [
    "Cultural Immersion",
    "Culinary Journeys",
    "Adventure Expeditions",
    "Wellness Retreats",
    "Wildlife Safaris",
    "Private Yacht Charters",
  ];

  return (
    <footer className="bg-dark-900 text-white relative overflow-hidden">
      {/* CTA Banner */}
      <div className="border-b border-dark-700/40">
        <div className="section-container py-20 md:py-28">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="label-text text-secondary-400 mb-4">Start Your Journey</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Ready for your next <span className="text-gradient-gold">adventure?</span>
            </h2>
            <p className="text-dark-300 text-lg mb-10 max-w-xl mx-auto">
              Let our travel experts create a bespoke journey tailored to your dreams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                className="btn btn-accent btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Plan My Trip
              </motion.button>
              <motion.button
                className="btn glass-premium text-white border-dark-600 hover:border-secondary-400/30 btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Destinations
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer columns */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            variants={fadeInUp}
          >
            <div className="flex items-center mb-5">
              <svg
                className="w-7 h-7 mr-2 text-primary-500"
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
              <span className="font-display text-xl font-bold">Aurelium</span>
            </div>
            <p className="text-dark-300 text-sm leading-relaxed mb-6">
              Crafting extraordinary travel experiences for discerning adventurers since 2010.
              Luxury meets authenticity in every journey.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  aria-label={link.label}
                  className="w-9 h-9 rounded-full bg-dark-700 text-dark-300 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-all duration-300 text-xs"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Destinations */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-secondary-400">
              Destinations
            </h3>
            <motion.ul className="space-y-2.5" variants={staggerChildren}>
              {destinations.map((dest, index) => (
                <motion.li key={index} variants={fadeInUp}>
                  <a
                    href="#"
                    className="text-dark-300 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-dark-500 group-hover:bg-secondary-400 rounded-full transition-colors" />
                    {dest}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Experiences */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-secondary-400">
              Experiences
            </h3>
            <motion.ul className="space-y-2.5" variants={staggerChildren}>
              {experiences.map((exp, index) => (
                <motion.li key={index} variants={fadeInUp}>
                  <a
                    href="#"
                    className="text-dark-300 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-dark-500 group-hover:bg-secondary-400 rounded-full transition-colors" />
                    {exp}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-secondary-400">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary-500 mt-0.5 flex-shrink-0" size={14} />
                <span className="text-dark-300 text-sm">123 Voyage Avenue, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary-500 flex-shrink-0" size={14} />
                <span className="text-dark-300 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary-500 flex-shrink-0" size={14} />
                <span className="text-dark-300 text-sm">hello@aurelium.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-dark-700/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-dark-400 text-xs">© {currentYear} Aurelium. All rights reserved.</p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="text-dark-400 hover:text-secondary-400 text-xs flex items-center gap-2 transition-colors"
            whileHover={{ y: -2 }}
          >
            Back to top <FiArrowUp size={12} />
          </motion.button>

          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((text) => (
              <a
                key={text}
                href="#"
                className="text-dark-400 hover:text-white text-xs transition-colors"
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
