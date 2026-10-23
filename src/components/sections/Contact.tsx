import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, stagger } from "framer-motion";
import { FiCheck, FiClock, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import useAnimatedScroll from "../../hooks/useAnimatedScroll";

const createInitialFormState = () => ({
  email: "",
  message: "",
  name: "",
  phone: "",
  subject: "",
});

const Contact = () => {
  const [formState, setFormState] = useState(createInitialFormState);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const timersRef = useRef<{ submit: number | null; reset: number | null }>({
    reset: null,
    submit: null,
  });
  const [titleRef, titleVariant] = useAnimatedScroll({ threshold: 0.1 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timersRef.current.submit) {
      clearTimeout(timersRef.current.submit);
      timersRef.current.submit = null;
    }
    if (timersRef.current.reset) {
      clearTimeout(timersRef.current.reset);
      timersRef.current.reset = null;
    }

    timersRef.current.submit = window.setTimeout(() => {
      setSubmitted(true);
      timersRef.current.submit = null;
      timersRef.current.reset = window.setTimeout(() => {
        setFormState(createInitialFormState());
        setSubmitted(false);
        timersRef.current.reset = null;
      }, 5000);
    }, 1000);
  };

  useEffect(
    () => () => {
      if (timersRef.current.submit) clearTimeout(timersRef.current.submit);
      if (timersRef.current.reset) clearTimeout(timersRef.current.reset);
    },
    [],
  );

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
      y: 0,
    },
  };

  const contactInfo = [
    {
      details: "123 Aurelium Avenue, New York, NY 10001",
      icon: <FiMapPin />,
      title: "Visit Us",
    },
    { details: "+1 (555) 123-4567", icon: <FiPhone />, title: "Call Us" },
    { details: "hello@aurelium.com", icon: <FiMail />, title: "Email Us" },
    { details: "Mon-Fri: 9AM – 6PM EST", icon: <FiClock />, title: "Hours" },
  ];

  const inputClasses =
    "w-full px-5 py-4 rounded-xl border theme-border-control theme-surface-raised-strong theme-text-primary focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-300 text-sm";

  return (
    <section id="contact" className="theme-surface-subtle relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/20 dark:bg-primary-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="section-container relative z-10">
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleVariant}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="label-text mb-4 block">Get in Touch</span>
          <h2 className="heading-2 mb-6 theme-text-primary">
            Let's Create Your <span className="text-gradient">Dream Journey</span>
          </h2>
          <p className="body-lg theme-text-secondary">
            Our experts are ready to craft your perfect experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1, once: true }}
            variants={fadeIn}
          >
            <div className="theme-surface-raised-strong rounded-3xl shadow-card p-8 md:p-10 border theme-border-control">
              <h3 className="text-2xl font-heading font-bold mb-8 theme-text-primary">
                Send a Message
              </h3>

              <AnimatePresence>
                {submitted ? (
                  <motion.div
                    className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-2xl p-8 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-800/30 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                      <FiCheck size={28} />
                    </div>
                    <h4 className="text-xl font-bold theme-text-primary mb-2">Message Sent!</h4>
                    <p className="theme-text-secondary">Our travel experts will respond shortly.</p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block theme-text-secondary font-medium text-sm mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block theme-text-secondary font-medium text-sm mb-2"
                        >
                          Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                          placeholder="Your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block theme-text-secondary font-medium text-sm mb-2"
                        >
                          Phone
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="block theme-text-secondary font-medium text-sm mb-2"
                        >
                          Subject *
                        </label>
                        <select
                          id="contact-subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                          className={`${inputClasses} appearance-none`}
                        >
                          <option value="">Select subject</option>
                          <option value="booking">New Booking</option>
                          <option value="existing">Existing Booking</option>
                          <option value="custom">Custom Travel Plan</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block theme-text-secondary font-medium text-sm mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className={inputClasses}
                        placeholder="Tell us about your travel plans"
                      />
                    </div>

                    <motion.button type="submit" className="btn btn-primary w-full py-4">
                      Send Message <FiSend className="ml-2" size={14} />
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1, once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delayChildren: stagger(0.1, { startDelay: 0.3 }) },
              },
            }}
          >
            {contactInfo.map((item) => (
              <motion.div
                key={item.title}
                className="theme-surface-raised-strong rounded-2xl p-6 border theme-border-control group hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                variants={fadeIn}
              >
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold theme-text-primary text-sm mb-1">{item.title}</h3>
                    <p className="theme-text-muted text-sm leading-relaxed">{item.details}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative CTA card */}
            <motion.div
              className="bg-linear-to-br from-primary-700 to-primary-800 rounded-2xl p-8 text-white mt-4"
              variants={fadeIn}
            >
              <h3 className="text-lg font-heading font-bold mb-2">Prefer to talk?</h3>
              <p className="text-white/60 text-sm mb-4">
                Schedule a complimentary consultation with our travel experts.
              </p>
              <motion.button className="btn btn-accent btn-sm">Book a Call</motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
