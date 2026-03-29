import React, { Suspense, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Loader from "./components/ui/Loader";
import ScrollToTop from "./components/ui/ScrollToTop";
import SmoothScroll from "./components/ui/SmoothScroll";
import CustomCursor from "./components/ui/CustomCursor";
import NoiseOverlay from "./components/ui/NoiseOverlay";
import BookExperienceModal from "./components/ui/BookExperienceModal";
import SectionNavigator from "./components/ui/SectionNavigator";
import MarqueeDivider from "./components/ui/MarqueeDivider";
import { useTheme } from "./contexts/ThemeContext";

import Hero from "./components/sections/Hero";

const Experience = React.lazy(() => import("./components/sections/Experience"));
const Destinations = React.lazy(() => import("./components/sections/Destinations"));
const ExclusiveOffers = React.lazy(() => import("./components/sections/ExclusiveOffers"));
const Services = React.lazy(() => import("./components/sections/Services"));
const Gallery = React.lazy(() => import("./components/sections/Gallery"));
const Testimonials = React.lazy(() => import("./components/sections/Testimonials"));
const Newsletter = React.lazy(() => import("./components/sections/Newsletter"));
const Contact = React.lazy(() => import("./components/sections/Contact"));

function App() {
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <div className={theme}>
        <NoiseOverlay />
        <CustomCursor />
        <AnimatePresence mode="wait">{loading && <Loader key="loader" />}</AnimatePresence>

        <Header onBookExperience={() => setIsBookingOpen(true)} />
        <BookExperienceModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        <main className="overflow-hidden">
          <Hero />

          <Suspense
            fallback={
              <div className="h-[50vh] flex items-center justify-center bg-warm-100 dark:bg-dark-900">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spinner" />
              </div>
            }
          >
            <MarqueeDivider
              texts={[
                "Santorini",
                "Kyoto",
                "Bali",
                "Marrakech",
                "Patagonia",
                "Amalfi",
                "Maldives",
                "Iceland",
              ]}
              separator="◆"
              dark={theme === "dark"}
            />
            <Experience />
            <MarqueeDivider
              texts={[
                "Discover",
                "Explore",
                "Experience",
                "Wander",
                "Dream",
                "Journey",
                "Adventure",
              ]}
              separator="✦"
              reverse
              speed={35}
              dark={theme === "dark"}
            />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-[50vh] flex items-center justify-center bg-warm-100 dark:bg-dark-900">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spinner" />
              </div>
            }
          >
            <Destinations />
            <ExclusiveOffers />
            <MarqueeDivider
              texts={[
                "Luxury",
                "Authentic",
                "Bespoke",
                "Curated",
                "Premium",
                "Exclusive",
                "Extraordinary",
              ]}
              separator="●"
              speed={40}
              dark={theme === "dark"}
            />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-[50vh] flex items-center justify-center bg-warm-100 dark:bg-dark-900">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spinner" />
              </div>
            }
          >
            <Services />
            <Gallery />
            <MarqueeDivider
              texts={[
                "Culture",
                "Nature",
                "Cuisine",
                "Architecture",
                "History",
                "Wildlife",
                "Heritage",
              ]}
              separator="◇"
              reverse
              speed={28}
              dark={theme === "dark"}
            />
            <Testimonials />
            <Newsletter />
            <Contact />
          </Suspense>
        </main>
        <Footer />
        <ScrollToTop />
        <SectionNavigator />
      </div>
    </SmoothScroll>
  );
}

export default App;
