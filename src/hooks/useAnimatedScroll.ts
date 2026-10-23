import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface UseAnimatedScrollOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

type ScrollVariant = "hidden" | "visible";

/** Returns the variant label a motion element should animate to as it scrolls into view. */
export default function useAnimatedScroll({
  threshold = 0.2,
  triggerOnce = true,
  delay = 0,
}: UseAnimatedScrollOptions = {}) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });
  const [variant, setVariant] = useState<ScrollVariant>("hidden");

  useEffect(() => {
    if (!inView) {
      setVariant("hidden");
      return undefined;
    }
    const timeout = setTimeout(() => setVariant("visible"), delay);
    return () => clearTimeout(timeout);
  }, [inView, delay]);

  return [ref, variant, inView] as const;
}
