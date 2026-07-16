import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const read = (path) => readFileSync(path, "utf8");
const walk = (directory) =>
  readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const sourceFiles = walk("src").filter((path) => /\.(?:ts|tsx)$/.test(path));
const sources = sourceFiles.map((path) => [path, read(path)]);
const combined = sources.map(([, source]) => source).join("\n");
const scrollRuntime = read("src/runtime/ScrollRuntime.tsx");
const sourcesOutsideScrollRuntime = sources
  .filter(([path]) => path !== "src/runtime/ScrollRuntime.tsx")
  .map(([, source]) => source)
  .join("\n");

assert.doesNotMatch(combined, /\bgsap\b|ScrollTrigger/, "GSAP must not regain motion authority");
assert.doesNotMatch(
  sourcesOutsideScrollRuntime,
  /addEventListener\(["']scroll["']/,
  "scroll-derived application state must remain owned by ScrollRuntime",
);
assert.equal(
  scrollRuntime.match(/addEventListener\(["']scroll["']/g)?.length,
  1,
  "reduced motion may have exactly one native scroll transport",
);
assert.match(
  scrollRuntime,
  /useNativeScroll = reduceMotion \|\| !hasFinePointer/,
  "native scroll transport must own reduced-motion and coarse-pointer devices",
);
assert.match(
  scrollRuntime,
  /if \(useNativeScroll\)[\s\S]*addEventListener\("scroll"[\s\S]*else[\s\S]*new Lenis/,
  "Lenis must remain exclusive to fine-pointer desktop scrolling",
);
assert.doesNotMatch(
  read("src/App.tsx"),
  /React\.lazy|Suspense/,
  "eager sections must not pose as lazy",
);

for (const [path, source] of sources) {
  if (source.includes("<img") || source.includes("<motion.img")) {
    assert.match(
      source,
      /responsiveImage\(/,
      `${path} renders an image without the responsive media policy`,
    );
  }
}

const app = read("src/App.tsx");
assert.match(
  app,
  /hasDesktopPointer && <CustomCursor \/>/,
  "cursor must not mount without capability",
);
assert.doesNotMatch(
  app,
  /<main[^>]*overflow-(?:hidden|clip)/,
  "the pinned destination runtime must not regain an overflow ancestor",
);

const destinations = read("src/components/sections/Destinations.tsx");
assert.match(
  destinations,
  /ResizeObserver/,
  "horizontal travel must be measured from rendered overflow",
);
assert.match(
  destinations,
  /-progress \* scrollDistance/,
  "horizontal travel and pinned scroll length must share one measurement",
);
assert.match(
  destinations,
  /isDesktopPinning \? `calc\(100vh \+ \$\{scrollDistance\}px\)` : "auto"/,
  "mobile destinations must remain in native document flow",
);
assert.match(
  destinations,
  /parallax=\{isDesktopPinning\}/,
  "desktop destination parallax must not leak into mobile",
);
assert.match(
  app,
  /showSectionNavigator && <SectionNavigator \/>/,
  "desktop navigator must not mount below its breakpoint",
);

const offers = read("src/components/sections/ExclusiveOffers.tsx");
assert.equal(
  offers.match(/setInterval\(/g)?.length,
  1,
  "the offer countdown must have exactly one scheduler",
);
assert.match(offers, /sectionInView/, "the offer scheduler must be visibility-bound");
assert.match(offers, /isPageVisible/, "the offer scheduler must stop with the document lifecycle");

const hero = read("src/components/sections/Hero.tsx");
assert.match(hero, /isHeroVisible/, "the hero carousel must stop outside the viewport");
assert.match(hero, /isPageVisible/, "the hero carousel must stop with the document lifecycle");
assert.match(hero, /reduceMotion/, "the hero carousel must respect reduced motion");

const marquee = read("src/components/ui/MarqueeDivider.tsx");
assert.match(marquee, /inView && isPageVisible/, "marquees must stop when they cannot render");

const main = read("src/main.tsx");
assert.ok(
  main.indexOf("applyTheme(resolveInitialTheme())") < main.indexOf("createRoot"),
  "theme must be applied before the first React render",
);
assert.match(
  main,
  /<MotionConfig reducedMotion="user">/,
  "component motion must respect the user's reduced-motion preference",
);

const theme = read("src/contexts/ThemeContext.tsx");
assert.match(theme, /"system" \| "light" \| "dark"/, "theme preference must model system mode");
assert.match(theme, /localStorage\.removeItem\("theme"\)/, "system mode must remain system-owned");
assert.match(
  theme,
  /addEventListener\("change", syncSystemTheme\)/,
  "system-owned theme must respond to preference changes",
);

const styles = read("src/index.css");
assert.match(styles, /--theme-surface-canvas:/, "theme surfaces need one semantic authority");
assert.match(styles, /color-scheme: dark/, "native controls must receive the resolved dark scheme");
assert.doesNotMatch(
  styles.match(/\.btn \{[\s\S]*?\n\}/)?.[0] ?? "",
  /rounded-full/,
  "shared actions must not collapse every control into a pill",
);
assert.match(
  styles,
  /\.service-description \{[\s\S]*max-height: 5rem/,
  "service descriptions must remain visible without interaction",
);
assert.doesNotMatch(
  styles,
  /group:hover \.service-description|\.service-description[\s\S]{0,80}max-height: 0/,
  "service content must not regain a hover-only disclosure path",
);

const header = read("src/layouts/Header.tsx");
assert.match(header, /aria-label=\{isDark/, "the icon-only theme control needs an accessible name");
assert.match(
  header,
  /showBookingAction &&/,
  "the desktop booking action must be capability-rendered rather than CSS-hidden",
);
assert.doesNotMatch(
  header,
  /hidden md:flex btn/,
  "shared button display must not override responsive visibility",
);
assert.match(
  header,
  /max-w-\[1440px\][\s\S]*showFullNavigation \? "grid-cols-\[1fr_auto_1fr\]"/,
  "the wide header must center navigation independently of unequal side groups",
);
assert.match(
  header,
  /new ResizeObserver\(measure\)/,
  "navigation capability must follow rendered content rather than a device breakpoint",
);
assert.match(
  header,
  /navigation\.scrollWidth \+ sideWidth \* 2 \+ 32/,
  "navigation fit must include both centered side tracks and explicit breathing room",
);
assert.match(
  scrollRuntime,
  /querySelector\("header"\).*getBoundingClientRect\(\)\.height/,
  "section navigation must derive its offset from the rendered header",
);

assert.match(
  hero,
  /max-w-64 sm:w-auto sm:max-w-none/,
  "mobile hero actions must retain touch height without occupying the full content width",
);
assert.match(
  hero,
  /onClick=\{onBookExperience\}/,
  "the primary hero action must remain functional",
);
assert.doesNotMatch(
  `${hero}\n${header}`,
  /onBookExperience\?:|noOperation/,
  "booking actions must not permit a silent no-op state",
);
assert.match(
  hero,
  /onClick=\{\(\) => scrollToSection\("destinations"\)\}/,
  "the destination hero action must remain functional",
);
assert.match(
  styles,
  /\.hero-secondary-action \{[\s\S]*background-color: rgb\(10 9 8 \/ 48%\)/,
  "the secondary hero action must retain an action-grade surface over photography",
);

const bookingModal = read("src/components/ui/BookExperienceModal.tsx");
assert.match(
  bookingModal,
  /max-h-\[min\(40rem,calc\(100dvh-2rem\)\)\]/,
  "the booking dialog must remain bounded by the dynamic viewport",
);
assert.match(
  bookingModal,
  /overflow-y-auto overscroll-contain/,
  "booking fields must scroll inside the bounded dialog",
);
assert.match(bookingModal, /focusableSelector/, "the modal boundary must contain keyboard focus");
assert.match(
  bookingModal,
  /previousFocus\?\.isConnected/,
  "closing the modal must restore the invoking focus context",
);
assert.doesNotMatch(
  bookingModal,
  /What happens next\?|Amelia R\.|May 2025|type="radio"/,
  "the compact consultation dialog must not regain its marketing panel, stale date, or chip grid",
);

const cursor = read("src/components/ui/CustomCursor.tsx");
assert.doesNotMatch(
  cursor,
  /framer-motion|useState|useSpring|mousemove|mouseover|mouseout|requestAnimationFrame/,
  "cursor position must not regain framework scheduling, React state, or a trailing frame loop",
);
assert.match(
  cursor,
  /position\.style\.transform = `translate3d/,
  "cursor position must write directly to a compositor transform",
);
assert.match(
  cursor,
  /event\.target !== lastTarget/,
  "cursor hit classification must run only when the target changes",
);
assert.equal(
  cursor.match(/mix-blend-difference/g)?.length,
  1,
  "the cursor must retain exactly one inversion layer",
);
assert.match(cursor, /nativeCursorSelector/, "native editing cursors must remain available");

const vite = read("vite.config.js");
assert.match(vite, /copyPublicDir: false/, "documentation assets must not ship as runtime assets");
assert.match(vite, /sourcemap: false/, "public production source maps must remain disabled");

console.log(`Performance contracts passed across ${sourceFiles.length} source files.`);
