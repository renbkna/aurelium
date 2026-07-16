import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

import { useScrollRuntime } from "../../runtime/ScrollRuntime";

const ScrollToTop: React.FC = () => {
  const { scrollToTop, showScrollToTop: show } = useScrollRuntime();

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          aria-label="Scroll to top"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 hidden md:block p-3 rounded-full bg-primary-700 text-white shadow-lg hover:bg-primary-600 hover:shadow-glow-primary transition-all duration-300"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
