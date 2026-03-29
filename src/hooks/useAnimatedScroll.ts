import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

interface UseAnimatedScrollOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export default function useAnimatedScroll({
  threshold = 0.2,
  triggerOnce = true,
  delay = 0,
}: UseAnimatedScrollOptions = {}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!inView) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      void controls.start("hidden");
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        void controls.start("visible");
        timeoutRef.current = null;
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [controls, inView, delay]);

  return [ref, controls, inView] as const;
}
