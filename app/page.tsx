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
        <p className="text-3xl font-extrabold tabular-nums text-[#1a3a6b]">
          +{nps}
          <span className="text-base font-bold text-emerald-600"> pts</span>
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">NPS lift</p>
      </div>
      <div className="text-center sm:border-r sm:border-orange-100">
        <p className="text-3xl font-extrabold tabular-nums text-[#1a3a6b]">
          {insights.toLocaleString()}
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Insights / week</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-extrabold tabular-nums text-[#1a3a6b]">
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
    { top: number; left: number; size: number; duration: number; delay: number; opacity: number }[]
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
      { x: 130, y: 310 },
      { x: 218, y: 270 },
      { x: 304, y: 232 },
      { x: 392, y: 192 },
      { x: 492, y: 142 },
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
    <main className="min-h-screen bg-[#fffbf5] text-[#1a3a6b]">
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(249,115,22,0.35),transparent_48%)] animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(251,146,60,0.22),transparent_36%),radial-gradient(circle_at_72%_64%,rgba(234,88,12,0.18),transparent_44%)]" />

            <div className="absolute inset-0">
              {stars.map((star, idx) => (
                <span
                  key={`star-${idx}`}
                  className="intro-star absolute rounded-full bg-orange-200"
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
                    <linearGradient id="warmSky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fffbf5" />
                      <stop offset="100%" stopColor="#fff7ed" />
                    </linearGradient>
                    <linearGradient id="mountBackWarm" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fdba74" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                    <linearGradient id="mountMidWarm" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                    <linearGradient id="mountFrontWarm" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                    <radialGradient id="sunWarm" cx="0.5" cy="0.5" r="0.5">
                      <stop offset="0%" stopColor="rgba(255,215,120,0.95)" />
                      <stop offset="55%" stopColor="rgba(251,146,60,0.45)" />
                      <stop offset="100%" stopColor="rgba(249,115,22,0)" />
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

                  <motion.path
                    d="M0 430 L130 334 L228 356 L312 286 L426 320 L522 258 L625 302 L700 430 Z"
                    fill="url(#mountBackWarm)"
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.75 }}
                    transition={{ duration: 1.3, delay: 1.0, ease: [0.2, 0.9, 0.2, 1] }}
                  />
                  <motion.path
                    d="M0 430 L92 362 L184 296 L278 324 L374 212 L470 292 L566 180 L654 252 L700 430 Z"
                    fill="url(#mountMidWarm)"
                    initial={{ y: 110, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.88 }}
                    transition={{ duration: 1.2, delay: 1.35, ease: [0.2, 0.9, 0.2, 1] }}
                  />
                  <motion.path
                    d="M0 430 L84 368 L172 302 L262 336 L356 194 L446 296 L546 168 L648 248 L700 430 Z"
                    fill="url(#mountFrontWarm)"
                    initial={{ y: 128, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.1, delay: 1.65, ease: [0.2, 0.9, 0.2, 1] }}
                  />

                  <motion.path
                    d="M130 310 L218 270 L304 232 L392 192 L492 142"
                    stroke="#22c55e"
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
                    d="M130 310 L218 270 L304 232 L392 192 L492 142"
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
                      <circle cx={node.x} cy={node.y} r="6.5" fill="#22c55e" />
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
                    d="M130 310 L218 270 L304 232 L392 192 L492 142"
                    stroke="rgba(26,58,107,0.45)"
                    strokeWidth="1.2"
                    strokeDasharray="4 6"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 0.55, 0.4] }}
                    transition={{ duration: 3, delay: 3.1 }}
                  />

                  <motion.circle
                    cx="492"
                    cy="142"
                    r="12"
                    fill="rgba(255,222,158,0.9)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.85] }}
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
              className="absolute left-1/2 top-[62%] w-full max-w-2xl -translate-x-1/2 px-6 text-center"
            >
              <motion.h1
                className="text-4xl font-extrabold tracking-tight sm:text-5xl"
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
                    className="inline-block bg-gradient-to-r from-[#1a3a6b] to-[#f97316] bg-clip-text text-transparent"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
              <p className="mt-4 text-xl font-semibold text-emerald-600 sm:text-2xl">
                {typedTagline}
                <span className="intro-cursor ml-1 inline-block h-6 w-[2px] bg-emerald-500 align-middle" />
              </p>
            </motion.div>

            {showPrompt ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a6b]"
              >
                Tap anywhere to begin
                <span className="mt-2 block text-[10px] font-medium normal-case tracking-[0.12em] text-[#1a3a6b]/55">
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
                <span className="bg-gradient-to-r from-[#1a3a6b] to-[#f97316] bg-clip-text text-transparent">
                  Aglorify
                </span>
              </span>
            </div>
            <div className="hidden items-center gap-8 text-sm font-semibold text-[#1a3a6b] md:flex">
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
            <h1 className="text-balance text-4xl font-extrabold leading-tight text-[#1a3a6b] sm:text-5xl md:text-6xl">
              Turn Customer Feedback Into Growth
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              AI-powered insights that help local businesses fix problems and grow revenue
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="w-full rounded-2xl bg-gradient-to-r from-[#f97316] to-[#ea580c] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-200 transition hover:-translate-y-0.5 sm:w-auto">
                Start Free Trial
              </button>
              <button className="w-full rounded-2xl border-2 border-[#1a3a6b] px-6 py-3 text-sm font-semibold text-[#1a3a6b] transition hover:bg-[#1a3a6b] hover:text-white sm:w-auto">
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
            <h2 className="text-center text-3xl font-bold text-[#1a3a6b] sm:text-4xl">Features built to drive growth</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-orange-100 border-l-4 border-l-[#f97316] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(249,115,22,0.18)]"
                >
                  <span className="text-2xl text-[#f97316]">{feature.icon}</span>
                  <h3 className="mt-3 text-xl font-semibold text-[#1a3a6b]">{feature.title}</h3>
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
            <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#1a3a6b]/80">
              Trusted by local businesses
            </p>
            <div className="marquee-mask">
              <div className="marquee-track">
                {[...logos, ...logos].map((logo, idx) => (
                  <span
                    key={`${logo}-${idx}`}
                    className="mx-3 inline-flex min-w-max items-center rounded-2xl border border-orange-200 bg-white px-5 py-2 text-sm font-semibold text-[#1a3a6b] shadow-sm"
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

        <footer id="about" className="bg-[#1a3a6b] px-6 py-12 text-white sm:px-10">
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