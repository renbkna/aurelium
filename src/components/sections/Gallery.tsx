import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiChevronLeft, FiChevronRight, FiPlus, FiX } from "react-icons/fi";
import useAnimatedScroll from "../../hooks/useAnimatedScroll";

gsap.registerPlugin(ScrollTrigger);

interface ImageData {
  id: number;
  src: string;
  alt: string;
  categories: string[];
  size: string;
}

const sizeClass = (size: string) => {
  switch (size) {
    case "featured": {
      return "bento-item featured";
    }
    case "wide": {
      return "bento-item wide";
    }
    case "tall": {
      return "bento-item tall";
    }
    default: {
      return "bento-item";
    }
  }
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [category, setCategory] = useState("all");
  const galleryRef = useRef<HTMLDivElement>(null);
  const previousOverflowRef = useRef("");
  const [titleRef, titleControls] = useAnimatedScroll({ threshold: 0.1 });

  const categories = [
    { id: "all", name: "All" },
    { id: "landmarks", name: "Landmarks" },
    { id: "nature", name: "Nature" },
    { id: "culture", name: "Culture" },
    { id: "luxury", name: "Luxury" },
  ];

  const galleryImages = [
    {
      alt: "Santorini Sunset View",
      categories: ["landmarks", "luxury"],
      id: 1,
      size: "featured",
      src: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80",
    },
    {
      alt: "Alpine Mountain Landscapes",
      categories: ["nature"],
      id: 2,
      size: "wide",
      src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      alt: "Traditional Japanese Temple",
      categories: ["landmarks", "culture"],
      id: 3,
      size: "normal",
      src: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      alt: "Luxury Bali Villa",
      categories: ["luxury"],
      id: 4,
      size: "tall",
      src: "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    },
    {
      alt: "Tropical Island Getaway",
      categories: ["nature", "luxury"],
      id: 5,
      size: "normal",
      src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      alt: "Traditional Moroccan Market",
      categories: ["culture"],
      id: 6,
      size: "wide",
      src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1339&q=80",
    },
    {
      alt: "Ancient Rome Colosseum",
      categories: ["landmarks", "culture"],
      id: 7,
      size: "normal",
      src: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-4.0.3&auto=format&fit=crop&w=1376&q=80",
    },
    {
      alt: "Overwater Bungalow in Maldives",
      categories: ["luxury", "nature"],
      id: 8,
      size: "normal",
      src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80",
    },
  ];

  const filteredImages =
    category === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.categories.includes(category));

  const openLightbox = (image: ImageData) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  const navigateImage = (direction: "next" | "prev") => {
    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage?.id);
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    setSelectedImage(galleryImages[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) {
        return;
      }
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    if (selectedImage) {
      previousOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflowRef.current || "";
      };
    }
    document.body.style.overflow = previousOverflowRef.current || "";
    return () => {
      document.body.style.overflow = previousOverflowRef.current || "";
    };
  }, [selectedImage]);

  useEffect(() => {
    if (!galleryRef.current) {
      return;
    }
    const animations: gsap.core.Tween[] = [];
    const items = galleryRef.current.querySelectorAll(".bento-item");

    items.forEach((item, index) => {
      const tween = gsap.fromTo(
        item,
        { opacity: 0, scale: 0.95, y: 40 },
        {
          delay: index * 0.08,
          duration: 0.8,
          ease: "power3.out",
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
        },
      );
      animations.push(tween);
    });

    return () => {
      animations.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [category]);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
      y: 0,
    },
  };

  return (
    <section id="gallery" className="bg-warm-100 dark:bg-dark-900">
      <div className="section-container">
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="label-text mb-4 block">Visual Stories</span>
          <h2 className="heading-2 mb-6 text-dark-800 dark:text-white">
            Immerse Yourself in <span className="text-gradient">Visual Wonders</span>
          </h2>
          <p className="body-lg text-dark-400 dark:text-dark-200">
            A curated collection of breathtaking moments from around the world.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                category === cat.id
                  ? "bg-primary-600 text-white shadow-glow-primary"
                  : "bg-white dark:bg-dark-800 text-dark-500 dark:text-dark-300 hover:bg-warm-200 dark:hover:bg-dark-700 border border-warm-200 dark:border-dark-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Bento grid */}
        <div ref={galleryRef} className="bento-grid">
          {filteredImages.map((image) => (
            <div key={image.id} className={sizeClass(image.size)}>
              <div
                className="relative group w-full h-full cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-dark-900/70 via-dark-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-semibold text-sm mb-1">{image.alt}</p>
                    <p className="text-white/50 text-xs">{image.categories.join(" · ")}</p>
                  </div>
                  <div className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <FiPlus className="text-white" size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-dark-900/95 backdrop-blur-lg flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20"
              onClick={closeLightbox}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FiX size={20} />
            </motion.button>

            <motion.button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20"
              onClick={() => navigateImage("prev")}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FiChevronLeft size={22} />
            </motion.button>

            <motion.button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20"
              onClick={() => navigateImage("next")}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FiChevronRight size={22} />
            </motion.button>

            <motion.div
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ damping: 30, stiffness: 300, type: "spring" }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-dark-900/80 to-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-white text-lg font-bold">{selectedImage.alt}</h3>
                <p className="text-white/50 text-sm">Aurelium Travel Photography</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
