import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [click, setClick] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useSpring(dotX, { damping: 30, mass: 0.1, stiffness: 250 });
  const ringY = useSpring(dotY, { damping: 30, mass: 0.1, stiffness: 250 });

  useEffect(() => {
    const getElementTarget = (event: MouseEvent): Element | null => {
      return event.target instanceof Element ? event.target : null;
    };

    const getRelatedNode = (event: MouseEvent): Node | null => {
      return event.relatedTarget instanceof Node ? event.relatedTarget : null;
    };

    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = getElementTarget(e);
      if (!target) {
        return;
      }

      if (
        target?.closest?.('a, button, input, select, textarea, [role="button"], [data-magnetic]')
      ) {
        setHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = getElementTarget(e);
      if (!target) {
        return;
      }

      const relatedTarget = getRelatedNode(e);
      const interactive = target?.closest?.(
        'a, button, input, select, textarea, [role="button"], [data-magnetic]',
      );

      if (interactive && (!relatedTarget || !interactive.contains(relatedTarget))) {
        setHovered(false);
      }
    };

    const handleMouseDown = () => setClick(true);
    const handleMouseUp = () => setClick(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [dotX, dotY]);

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none mix-blend-difference z-10000 hidden md:flex"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          originX: 0.5,
          originY: 0.5,
        }}
        initial={false}
        animate={{
          width: hovered ? 80 : 36,
          height: hovered ? 80 : 36,
          backgroundColor: hovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          border: hovered
            ? "0px solid rgba(255, 255, 255, 0)"
            : "1px solid rgba(255, 255, 255, 0.5)",
          scale: click ? 0.85 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.4,
        }}
      />

      {/* Instant Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-white pointer-events-none mix-blend-difference z-10000 hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 5,
          height: 5,
          originX: 0.5,
          originY: 0.5,
          opacity: hovered ? 0 : 1,
          scale: click && !hovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
