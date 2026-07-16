import React, { useCallback, useState } from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import CustomCursor from "./components/ui/CustomCursor";
import NoiseOverlay from "./components/ui/NoiseOverlay";
import BookExperienceModal from "./components/ui/BookExperienceModal";
import SectionNavigator from "./components/ui/SectionNavigator";
import MarqueeDivider from "./components/ui/MarqueeDivider";
import { useTheme } from "./contexts/ThemeContext";

import Hero from "./components/sections/Hero";
import Experience from "./components/sections/Experience";
import Destinations from "./components/sections/Destinations";
import ExclusiveOffers from "./components/sections/ExclusiveOffers";
import Services from "./components/sections/Services";
import Gallery from "./components/sections/Gallery";
import Testimonials from "./components/sections/Testimonials";
import Newsletter from "./components/sections/Newsletter";
import Contact from "./components/sections/Contact";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { ScrollRuntimeProvider } from "./runtime/ScrollRuntime";

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const openBooking = useCallback(() => setIsBookingOpen(true), []);
  const closeBooking = useCallback(() => setIsBookingOpen(false), []);
  const { theme } = useTheme();
  const hasDesktopPointer = useMediaQuery(
    "(min-width: 768px) and (hover: hover) and (pointer: fine)",
  );
  const showSectionNavigator = useMediaQuery("(min-width: 1024px)");

  return (
    <ScrollRuntimeProvider>
      <div className={theme}>
        <NoiseOverlay />
        {hasDesktopPointer && <CustomCursor />}

        <Header onBookExperience={openBooking} />
        <BookExperienceModal isOpen={isBookingOpen} onClose={closeBooking} />
        <main>
          <Hero onBookExperience={openBooking} />

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
            texts={["Discover", "Explore", "Experience", "Wander", "Dream", "Journey", "Adventure"]}
            separator="✦"
            reverse
            speed={35}
            dark={theme === "dark"}
          />

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
        </main>
        <Footer />
        <ScrollToTop />
        {showSectionNavigator && <SectionNavigator />}
      </div>
    </ScrollRuntimeProvider>
  );
}

export default App;
