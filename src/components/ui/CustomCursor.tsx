import { useEffect, useRef } from "react";

const interactiveSelector = 'a, button, [role="button"], [data-magnetic]';
const nativeCursorSelector = 'input, textarea, select, [contenteditable="true"]';

const CustomCursor = () => {
  const positionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const position = positionRef.current;
    const visual = visualRef.current;
    if (!position || !visual) {
      return undefined;
    }

    let interactive = false;
    let pressed = false;
    let visible = false;
    let usesNativeCursor = false;
    let lastTarget: EventTarget | null = null;

    const syncAppearance = () => {
      visual.style.opacity = visible && !usesNativeCursor ? "1" : "0";
      const scale = pressed ? 0.75 : interactive ? 2.8 : 1;
      visual.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    const handlePointerMove = (event: PointerEvent) => {
      position.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

      if (event.target !== lastTarget) {
        lastTarget = event.target;
        const target = event.target instanceof Element ? event.target : null;
        usesNativeCursor = Boolean(target?.closest(nativeCursorSelector));
        interactive = Boolean(!usesNativeCursor && target?.closest(interactiveSelector));
        visible = !usesNativeCursor;
        syncAppearance();
      } else if (!visible && !usesNativeCursor) {
        visible = true;
        syncAppearance();
      }
    };
    const handlePointerDown = () => {
      pressed = true;
      syncAppearance();
    };
    const handlePointerUp = () => {
      pressed = false;
      syncAppearance();
    };
    const handlePointerLeave = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        visible = false;
        pressed = false;
        lastTarget = null;
        syncAppearance();
      }
    };
    const handleBlur = () => {
      visible = false;
      pressed = false;
      syncAppearance();
    };

    root.classList.add("custom-cursor-enabled");
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointerout", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handleBlur);

    return () => {
      root.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerout", handlePointerLeave);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <div
      ref={positionRef}
      aria-hidden="true"
      data-custom-cursor
      className="pointer-events-none fixed left-0 top-0 z-10000 will-change-transform"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div
        ref={visualRef}
        className="size-2.5 rounded-full bg-white opacity-0 mix-blend-difference transition-[transform,opacity] duration-150 ease-out will-change-transform"
        style={{ transform: "translate(-50%, -50%) scale(1)" }}
      />
    </div>
  );
};

export default CustomCursor;
