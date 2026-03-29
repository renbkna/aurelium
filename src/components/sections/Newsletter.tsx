import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiCheck, FiGift, FiMapPin, FiSend } from "react-icons/fi";
import useAnimatedScroll from "../../hooks/useAnimatedScroll";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [containerRef, containerControls] = useAnimatedScroll({
    threshold: 0.2,
  });
  const timeoutRef = useRef<number | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setSubscribed(true);
        setEmail("");
        timeoutRef.current = undefined;
      }, 800);
    }
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const benefits = [
    {
      desc: "First access to limited deals.",
      icon: <FiGift />,
      title: "Exclusive Offers",
    },
    {
      desc: "Insider destination tips.",
      icon: <FiMapPin />,
      title: "Hidden Gems",
    },
    {
      desc: "New premium experiences.",
      icon: <FiAward />,
      title: "Luxury Updates",
    },
  ];

  return (
    <section className="bg-warm-100 dark:bg-dark-900 overflow-hidden">
      <div className="section-container">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={containerControls}
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: {
              opacity: 1,
              transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
              y: 0,
            },
          }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1682685797742-42c9987a2c34?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-br from-primary-900/95 via-primary-800/90 to-dark-900/95" />
          </div>

          {/* Decorative */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-secondary-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-primary-400/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 p-10 md:p-20 text-white">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <motion.p
                className="label-text text-secondary-300 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Stay Inspired
              </motion.p>

              <motion.h2
                className="heading-2 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Get Curated <span className="text-gradient-gold">Travel Insights</span>
              </motion.h2>

              <motion.p
                className="text-white/50 text-lg mb-12 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Expert travel tips, exclusive offers, and curated destination guides delivered to
                your inbox.
              </motion.p>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {!subscribed ? (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3"
                  >
                    <div className="relative flex-grow group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary-400/60 focus:bg-white/10 transition-all duration-500"
                        required
                      />
                      {/* Animated focus ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-transparent group-focus-within:border-secondary-400/30 transition-all duration-500 pointer-events-none" />
                    </div>
                    <motion.button
                      type="submit"
                      className="btn btn-accent px-8 py-4 rounded-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Subscribe <FiSend className="ml-1" size={14} />
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    className="glass-premium rounded-full py-4 px-6 max-w-md mx-auto inline-flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="bg-primary-500 p-2 rounded-full mr-3">
                      <FiCheck className="text-white" size={14} />
                    </div>
                    <p className="text-white font-medium text-sm">
                      Welcome! You're now subscribed.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl mx-auto mb-3 text-secondary-400">
                    {benefit.icon}
                  </div>
                  <h3 className="text-base font-bold mb-1">{benefit.title}</h3>
                  <p className="text-white/40 text-sm">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-white/20 text-xs text-center mt-12">
              By subscribing, you agree to our Privacy Policy. We never share your data.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
