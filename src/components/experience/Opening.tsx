"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/answeha";

interface OpeningProps {
  onEnter: () => void;
}

/* Animated floating particles — stars + soft orbs */
function Particles() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number; type: "star" | "orb" }>
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: i < 40 ? Math.random() * 2 + 0.5 : Math.random() * 60 + 30,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      type: (i < 40 ? "star" : "orb") as "star" | "orb",
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) =>
        p.type === "star" ? (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cream/50"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ) : (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, ${
                p.id % 2 === 0 ? "rgba(183,131,135,0.06)" : "rgba(201,169,110,0.04)"
              } 0%, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: p.duration + 3, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        )
      )}
    </div>
  );
}

export function Opening({ onEnter }: OpeningProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setPhase(4), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = useCallback(() => {
    onEnter();
  }, [onEnter]);

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center grain"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #1a1a28 0%, #101018 50%, #0a0a10 100%)",
      }}
      role="banner"
      aria-label="Welcome screen"
    >
      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(183,131,135,0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
            animationDelay: "2s",
          }}
        />
      </div>

      <Particles />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              key="date"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span className="text-gradient-gold text-2xl md:text-3xl tracking-[0.5em] font-serif font-light">
                {siteConfig.birthday}
              </span>
            </motion.div>
          )}

          {phase >= 2 && (
            <motion.p
              key="subtitle"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-cream/40 text-xs md:text-sm tracking-[0.35em] uppercase font-sans mb-6"
            >
              A little world for
            </motion.p>
          )}

          {phase >= 3 && (
            <motion.h1
              key="name"
              initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-cream tracking-[0.08em] mb-10 leading-none"
            >
              {siteConfig.name}
            </motion.h1>
          )}

          {phase >= 4 && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <p className="text-cream/20 text-[11px] tracking-[0.25em] font-sans">
                made with a lot of thought ♡
              </p>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(201,169,110,0.15)" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnter}
                className="group relative px-10 py-4 rounded-full cursor-pointer overflow-hidden
                  border border-cream/10 hover:border-gold/30
                  transition-all duration-700
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {/* Shimmer bg */}
                <div className="absolute inset-0 shimmer rounded-full" />
                <span className="relative z-10 flex items-center gap-3 text-cream/70 group-hover:text-cream text-xs tracking-[0.3em] uppercase font-sans transition-colors duration-500">
                  <span className="text-gold/60 group-hover:text-gold transition-colors duration-500">✦</span>
                  Enter
                  <span className="text-gold/60 group-hover:text-gold transition-colors duration-500">✦</span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 5, duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cream/10 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
