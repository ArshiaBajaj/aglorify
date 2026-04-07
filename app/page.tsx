"use client";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimation,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function HeroStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [nps, setNps] = useState(0);
  const [insights, setInsights] = useState(0);
  const [guestScore, setGuestScore] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const a1 = animate(0, 12, {
      duration: 1.25,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setNps(Math.round(v)),
    });
    const a2 = animate(0, 2400, {
      duration: 1.55,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setInsights(Math.round(v)),
    });
    const a3 = animate(0, 4.8, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setGuestScore(Math.round(v * 10) / 10),
    });
    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 rounded-2xl border border-orange-100/90 bg-white/85 px-6 py-5 shadow-sm backdrop-blur-sm sm:grid-cols-3"
    >
      <div className="text-center sm:border-r sm:border-orange-100">
        <p className="text-3xl font-extrabold tabular-nums text-[#071f3d]">
          +{nps}
          <span className="text-base font-bold text-emerald-600"> pts</span>
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">NPS lift</p>
      </div>
      <div className="text-center sm:border-r sm:border-orange-100">
        <p className="text-3xl font-extrabold tabular-nums text-[#071f3d]">
          {insights.toLocaleString()}
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Insights / week</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-extrabold tabular-nums text-[#071f3d]">
          {guestScore.toFixed(1)}
          <span className="ml-0.5 text-amber-500">★</span>
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Guest score</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const introControls = useAnimation();

  const [stars, setStars] = useState<
    {
      top: number;
      left: number;
      size: number;
      duration: number;
      delay: number;
      opacity: number;
      tone: 0 | 1 | 2;
    }[]
  >([]);
  const [embers, setEmbers] = useState<
    { top: number; left: number; size: number; duration: number; delay: number }[]
  >([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25, mass: 0.5 });
  const nodeOffsetX = useTransform(springX, (v) => v * 0.04);
  const nodeOffsetY = useTransform(springY, (v) => v * 0.04);
  const nodeOffsetXReverse = useTransform(nodeOffsetX, (v) => -v * 0.8);
  const nodeOffsetYReverse = useTransform(nodeOffsetY, (v) => -v * 0.8);
  const nodeOffsetXSoft = useTransform(nodeOffsetX, (v) => v * 0.6);
  const nodeOffsetYSoft = useTransform(nodeOffsetY, (v) => v * 0.6);
  const spotlightX = useTransform(springX, (v) => v * 0.12);
  const spotlightY = useTransform(springY, (v) => v * 0.12);

  const growthNodes = useMemo(
    () => [
      { x: 128, y: 318 },
      { x: 212, y: 272 },
      { x: 298, y: 238 },
      { x: 388, y: 200 },
      { x: 498, y: 148 },
    ],
    []
  );

  const logos = [
    "Sunset Bistro",
    "Urban Tandoor",
    "Olive & Thyme",
    "Bluebird Cafe",
    "Brick Oven Co.",
  ];

  const features = [
    {
      icon: "💬",
      title: "Real-time Feedback",
      description:
        "Capture feedback from every table touchpoint and online channel in real time.",
    },
    {
      icon: "✨",
      title: "AI Insights",
      description:
        "Auto-summarize what guests are saying and highlight the highest-impact fixes.",
    },
    {
      icon: "📈",
      title: "Growth Analytics",
      description:
        "Track sentiment, retention, and revenue lift from every operational improvement.",
    },
  ];

  useEffect(() => {
    introControls.set({ opacity: 1, scale: 1, filter: "brightness(1)" });
    const generatedStars = Array.from({ length: 120 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2.2 + 0.8,
      duration: Math.random() * 5 + 2,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.6 + 0.2,
      tone: Math.floor(Math.random() * 3) as 0 | 1 | 2,
    }));
    setStars(generatedStars);

    const generatedEmbers = Array.from({ length: 36 }, () => ({
      top: Math.random() * 24 + 56,
      left: Math.random() * 58 + 18,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 5 + 2.5,
      delay: Math.random() * 2.5,
    }));
    setEmbers(generatedEmbers);

    const promptTimer = window.setTimeout(() => setShowPrompt(true), 5500);
    const typeStartTimer = window.setTimeout(() => {
      let i = 0;
      const typeInterval = window.setInterval(() => {
        i += 1;
        setTypedCount(i);
        if (i >= "Know What Matters.".length) {
          window.clearInterval(typeInterval);
        }
      }, 70);
    }, 4500);

    return () => {
      window.clearTimeout(promptTimer);
      window.clearTimeout(typeStartTimer);
    };
  }, [introControls]);

  const typedTagline = "Know What Matters.".slice(0, typedCount);
  const logoLetters = "Aglorify".split("");

  const handleIntroExit = useCallback(async () => {
    if (isExiting) return;
    setIsExiting(true);
    await introControls.start({
      scale: 1.2,
      opacity: 0,
      filter: "brightness(1.2)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    });
    setShowIntro(false);
    setIsExiting(false);
  }, [isExiting, introControls]);

  useEffect(() => {
    if (!showIntro) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") void handleIntroExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showIntro, handleIntroExit]);

  return (
    <main className="min-h-screen bg-[#fffbf5] text-[#071f3d]">
      <AnimatePresence>
        {showIntro ? (
          <motion.section
            key="warm-intro"
            className="fixed inset-0 z-[120] cursor-pointer overflow-hidden bg-[#fffbf5]"
            initial={{ opacity: 1, scale: 1 }}
            animate={introControls}
            exit={{ opacity: 0 }}
            onClick={handleIntroExit}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(249,115,22,0.32),transparent_48%),radial-gradient(circle_at_12%_35%,rgba(7,31,61,0.12),transparent_42%)] animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(16,185,129,0.14),transparent_38%),radial-gradient(circle_at_72%_58%,rgba(249,115,22,0.2),transparent_44%)]" />

            <div className="absolute inset-0">
              {stars.map((star, idx) => (
                <span
                  key={`star-${idx}`}
                  className={`intro-star absolute rounded-full ${
                    star.tone === 0 ? "bg-amber-200" : star.tone === 1 ? "bg-emerald-300" : "bg-sky-200"
                  }`}
                  style={{
                    top: `${star.top}%`,
                    left: `${star.left}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    animationDuration: `${star.duration}s`,
                    animationDelay: `${star.delay}s`,
                    opacity: star.opacity,
                  }}
                />
              ))}
            </div>

            <div className="intro-aurora absolute inset-x-0 top-0 h-64" />

            <div className="relative flex h-full items-center justify-center px-5">
              <div className="relative w-full max-w-6xl">
                <svg
                  viewBox="0 0 700 430"
                  className="mx-auto w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Sky: cool top-left (navy frame) → warm horizon — matches logo card */}
                    <linearGradient id="warmSky" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f0f6ff" />
                      <stop offset="40%" stopColor="#fffbf5" />
                      <stop offset="100%" stopColor="#fff0e0" />
                    </linearGradient>
                    {/* Distant range — blue haze (logo border cool side) */}
                    <linearGradient id="mountBackAtmos" x1="0%" y1="20%" x2="95%" y2="90%">
                      <stop offset="0%" stopColor="#64748b" />
                      <stop offset="40%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>
                    {/* Mid — navy into green (logo “A” cross-tint) */}
                    <linearGradient id="mountMidRock" x1="0%" y1="85%" x2="100%" y2="5%">
                      <stop offset="0%" stopColor="#0c2d4a" />
                      <stop offset="38%" stopColor="#0f5132" />
                      <stop offset="62%" stopColor="#15803d" />
                      <stop offset="88%" stopColor="#c2410c" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                    {/* Front — same story as mark: deep navy → emerald → orange/gold peak */}
                    <linearGradient id="mountFrontRock" x1="5%" y1="95%" x2="92%" y2="8%">
                      <stop offset="0%" stopColor="#071f3d" />
                      <stop offset="26%" stopColor="#065f46" />
                      <stop offset="48%" stopColor="#16a34a" />
                      <stop offset="72%" stopColor="#ea580c" />
                      <stop offset="92%" stopColor="#fb923c" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                    <linearGradient id="snowCap" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#fffbeb" />
                      <stop offset="100%" stopColor="#fde68a" />
                    </linearGradient>
                    <radialGradient id="sunWarm" cx="0.5" cy="0.5" r="0.5">
                      <stop offset="0%" stopColor="#fff7c2" />
                      <stop offset="35%" stopColor="#fcd34d" />
                      <stop offset="65%" stopColor="rgba(249,115,22,0.55)" />
                      <stop offset="100%" stopColor="rgba(249,115,22,0)" />
                    </radialGradient>
                    {/* Peak orb — matches logo sun at tip of “A” */}
                    <radialGradient id="peakOrb" cx="0.42" cy="0.38" r="0.58">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor="#fde047" />
                      <stop offset="78%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </radialGradient>
                    <filter id="growthGlow">
                      <feGaussianBlur stdDeviation="3.5" result="blurred" />
                      <feMerge>
                        <feMergeNode in="blurred" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <rect width="700" height="430" fill="url(#warmSky)" rx="26" />

                  <motion.ellipse
                    cx="518"
                    cy="142"
                    rx="148"
                    ry="95"
                    fill="url(#sunWarm)"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: [0, 0.9, 0.7, 0.85], scale: [0.85, 1.1, 1] }}
                    transition={{ duration: 2.2, delay: 1.2, repeat: Infinity, repeatType: "mirror" }}
                  />
                  <motion.foreignObject
                    x="420"
                    y="10"
                    width="240"
                    height="240"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0.35] }}
                    transition={{ duration: 1.8, delay: 1.2 }}
                  >
                    <div className="h-full w-full rounded-full intro-conic-rays-warm" />
                  </motion.foreignObject>

                  {/* Distant silhouette — soft rolling peaks (atmospheric perspective) */}
                  <motion.path
                    d="M0 430 C 90 408, 180 378, 268 358 C 356 338, 420 322, 492 312 C 558 304, 630 308, 700 322 L 700 430 Z"
                    fill="url(#mountBackAtmos)"
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.78 }}
                    transition={{ duration: 1.3, delay: 1.0, ease: [0.2, 0.9, 0.2, 1] }}
                  />
                  {/* Mid range — carved ridges, warmer rock */}
                  <motion.path
                    d="M0 430 C 55 415, 120 382, 185 350 C 250 318, 315 295, 380 285 C 445 272, 515 258, 575 262 C 630 266, 675 285, 700 305 L 700 430 Z"
                    fill="url(#mountMidRock)"
                    initial={{ y: 110, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.9 }}
                    transition={{ duration: 1.2, delay: 1.35, ease: [0.2, 0.9, 0.2, 1] }}
                  />
                  {/* Front range — main ridgeline + sunlit right faces */}
                  <motion.path
                    d="M0 430 L 0 404 C 42 392, 78 360, 108 336 C 118 328, 125 322, 128 318 C 168 298, 188 288, 212 272 C 248 252, 272 242, 298 238 C 332 218, 358 208, 388 200 C 418 180, 458 162, 498 148 C 528 132, 558 148, 588 178 C 628 218, 662 252, 700 282 L 700 430 Z"
                    fill="url(#mountFrontRock)"
                    initial={{ y: 128, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.1, delay: 1.65, ease: [0.2, 0.9, 0.2, 1] }}
                  />
                  {/* Snow on high points */}
                  <path
                    d="M 196 278 L 212 258 L 228 278 C 220 272, 204 272, 196 278 Z"
                    fill="url(#snowCap)"
                    opacity={0.92}
                  />
                  <path
                    d="M 282 246 L 298 224 L 314 246 C 306 238, 290 238, 282 246 Z"
                    fill="url(#snowCap)"
                    opacity={0.9}
                  />
                  <path
                    d="M 368 210 L 388 186 L 408 210 C 398 202, 378 202, 368 210 Z"
                    fill="url(#snowCap)"
                    opacity={0.88}
                  />
                  <path
                    d="M 472 158 L 498 128 L 524 158 C 510 148, 486 148, 472 158 Z"
                    fill="url(#snowCap)"
                    opacity={0.95}
                  />

                  <motion.path
                    d="M128 318 C 168 298, 188 288, 212 272 C 248 252, 272 242, 298 238 C 332 218, 358 208, 388 200 C 418 180, 458 162, 498 148"
                    stroke="#16a34a"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    filter="url(#growthGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.35, delay: 2.5, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M128 318 C 168 298, 188 288, 212 272 C 248 252, 272 242, 298 238 C 332 218, 358 208, 388 200 C 418 180, 458 162, 498 148"
                    stroke="rgba(249,115,22,0.45)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.35, delay: 2.5, ease: "easeOut" }}
                  />

                  {growthNodes.map((node, idx) => (
                    <motion.g
                      key={`node-${idx}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                      transition={{ duration: 0.4, delay: 2.8 + idx * 0.18 }}
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="6.5"
                        fill="#ffffff"
                        stroke="#16a34a"
                        strokeWidth="2.25"
                      />
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r="8"
                        fill="none"
                        stroke="#86efac"
                        strokeWidth="1.5"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 0.7, 0], scale: [0.8, 1.9, 2.3] }}
                        transition={{
                          duration: 1,
                          delay: 3.5 + idx * 0.1,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                    </motion.g>
                  ))}

                  <motion.path
                    d="M128 318 C 168 298, 188 288, 212 272 C 248 252, 272 242, 298 238 C 332 218, 358 208, 388 200 C 418 180, 458 162, 498 148"
                    stroke="rgba(7,31,61,0.45)"
                    strokeWidth="1.2"
                    strokeDasharray="4 6"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 0.55, 0.4] }}
                    transition={{ duration: 3, delay: 3.1 }}
                  />

                  <motion.circle
                    cx="498"
                    cy="148"
                    r="12"
                    fill="url(#peakOrb)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.92] }}
                    transition={{ duration: 0.6, delay: 4 }}
                  />
                </svg>

                <div className="pointer-events-none absolute inset-0">
                  {embers.map((ember, idx) => (
                    <span
                      key={`ember-${idx}`}
                      className="intro-ember absolute rounded-full bg-orange-300"
                      style={{
                        top: `${ember.top}%`,
                        left: `${ember.left}%`,
                        width: `${ember.size}px`,
                        height: `${ember.size}px`,
                        animationDuration: `${ember.duration}s`,
                        animationDelay: `${ember.delay}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 4.0 }}
              className="absolute left-1/2 top-[60%] w-full max-w-3xl -translate-x-1/2 px-6 text-center"
            >
              <motion.h1
                className="text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 4.05 } },
                }}
              >
                {logoLetters.map((char, idx) => (
                  <motion.span
                    key={`${char}-${idx}`}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className={`inline-block ${idx < 6 ? "text-[#071f3d]" : "text-[#f97316]"}`}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.div
                aria-hidden
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 4.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-3 h-[3px] max-w-[min(100%,15rem)] origin-center rounded-full bg-gradient-to-r from-[#071f3d] via-[#059669] to-[#f97316]"
              />
              <p className="mt-5 text-2xl font-bold text-emerald-600 sm:text-3xl md:text-4xl">
                {typedTagline}
                <span className="intro-cursor ml-1.5 inline-block h-7 w-[3px] rounded-sm bg-emerald-500 align-middle sm:h-8 sm:w-[3px]" />
              </p>
            </motion.div>

            {showPrompt ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#071f3d]"
              >
                Tap anywhere to begin
                <span className="mt-2 block text-[10px] font-medium normal-case tracking-[0.12em] text-[#071f3d]/55">
                  or press Esc
                </span>
              </motion.p>
            ) : null}

            {isExiting ? <div className="pointer-events-none absolute inset-0 bg-white" /> : null}
          </motion.section>
        ) : null}
      </AnimatePresence>

      <div className={`transition-opacity duration-700 ${showIntro ? "opacity-0" : "opacity-100"}`}>
        <header className="fixed inset-x-0 top-0 z-50 border-b border-orange-200/80 bg-white/95 backdrop-blur-md">
          <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
            <div className="flex items-center gap-3">
              <img src="/aglorify-logo.png" alt="Aglorify" className="h-10 w-10 rounded-xl object-cover" />
              <span className="text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#071f3d] to-[#f97316] bg-clip-text text-transparent">
                  Aglorify
                </span>
              </span>
            </div>
            <div className="hidden items-center gap-8 text-sm font-semibold text-[#071f3d] md:flex">
              <a href="#features" className="transition hover:text-[#f97316]">
                Features
              </a>
              <a href="#pricing" className="transition hover:text-[#f97316]">
                Pricing
              </a>
              <a href="#about" className="transition hover:text-[#f97316]">
                About
              </a>
              <a href="#" className="transition hover:text-[#f97316]">
                Login
              </a>
              <button className="rounded-2xl bg-gradient-to-r from-[#f97316] to-[#ea580c] px-5 py-2.5 text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5">
                Get Started Free
              </button>
            </div>
          </nav>
        </header>

        <section
          onMouseMove={(event) => {
            const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
            mouseX.set(event.clientX - rect.left - rect.width / 2);
            mouseY.set(event.clientY - rect.top - rect.height / 2);
          }}
          className="relative overflow-hidden bg-[#fffbf5] px-6 pt-36 sm:px-10"
        >
          <motion.div
            aria-hidden
            style={{ x: spotlightX, y: spotlightY }}
            className="pointer-events-none absolute left-1/2 top-[42%] h-[min(90vw,38rem)] w-[min(90vw,38rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.14)_0%,rgba(34,197,94,0.06)_35%,transparent_68%)] blur-[2px] motion-reduce:hidden"
          />
          <motion.span
            style={{ x: nodeOffsetX, y: nodeOffsetY }}
            className="pointer-events-none absolute left-[10%] top-40 h-6 w-6 rounded-full bg-orange-300/80 shadow-lg shadow-orange-200"
          />
          <motion.span
            style={{ x: nodeOffsetXReverse, y: nodeOffsetYReverse }}
            className="pointer-events-none absolute right-[14%] top-52 h-4 w-4 rounded-full bg-orange-400/80 shadow-md shadow-orange-200"
          />
          <motion.span
            style={{ x: nodeOffsetXSoft, y: nodeOffsetYSoft }}
            className="pointer-events-none absolute right-[20%] bottom-20 h-5 w-5 rounded-full bg-orange-200 shadow-lg shadow-orange-100"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-5xl py-24 text-center"
          >
            <h1 className="text-balance text-4xl font-extrabold leading-tight text-[#071f3d] sm:text-5xl md:text-6xl">
              Turn Customer Feedback Into Growth
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              AI-powered insights that help local businesses fix problems and grow revenue
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="w-full rounded-2xl bg-gradient-to-r from-[#f97316] to-[#ea580c] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-200 transition hover:-translate-y-0.5 sm:w-auto">
                Start Free Trial
              </button>
              <button className="w-full rounded-2xl border-2 border-[#071f3d] px-6 py-3 text-sm font-semibold text-[#071f3d] transition hover:bg-[#071f3d] hover:text-white sm:w-auto">
                Watch Demo
              </button>
            </div>
            <HeroStats />
          </motion.div>
        </section>

        <section id="features" className="bg-white px-6 py-24 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="mx-auto max-w-6xl"
          >
            <h2 className="text-center text-3xl font-bold text-[#071f3d] sm:text-4xl">Features built to drive growth</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-orange-100 border-l-4 border-l-[#f97316] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(249,115,22,0.18)]"
                >
                  <span className="text-2xl text-[#f97316]">{feature.icon}</span>
                  <h3 className="mt-3 text-xl font-semibold text-[#071f3d]">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="bg-[#fff7ed] px-6 py-24 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-6xl"
          >
            <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#071f3d]/80">
              Trusted by local businesses
            </p>
            <div className="marquee-mask">
              <div className="marquee-track">
                {[...logos, ...logos].map((logo, idx) => (
                  <span
                    key={`${logo}-${idx}`}
                    className="mx-3 inline-flex min-w-max items-center rounded-2xl border border-orange-200 bg-white px-5 py-2 text-sm font-semibold text-[#071f3d] shadow-sm"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="pricing" className="bg-[#fffbf5] px-6 py-24 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-[#f97316] to-[#ea580c] px-8 py-16 text-center text-white shadow-[0_25px_70px_rgba(249,115,22,0.35)]"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to grow your business?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-orange-50">
              Turn guest feedback into actions that increase retention and revenue every week.
            </p>
            <button className="mt-8 rounded-2xl bg-white px-7 py-3 text-sm font-semibold text-[#ea580c] transition hover:-translate-y-0.5 hover:shadow-lg">
              Get Started Free
            </button>
          </motion.div>
        </section>

        <footer id="about" className="bg-[#071f3d] px-6 py-12 text-white sm:px-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm sm:flex-row">
            <p>© 2026 Aglorify</p>
            <div className="flex gap-6 text-orange-300">
              <a href="#" className="transition hover:text-white">
                Privacy
              </a>
              <a href="#" className="transition hover:text-white">
                Terms
              </a>
              <a href="#" className="transition hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}