"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { siteConfig, birthdayClosing } from "@/data/answeha";
import { Sparkles } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  rotation: number;
  scale: number;
  color: string;
  delay: number;
  type: "petal" | "sparkle";
}

function CelebrationParticles({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const colors = ["#C9A96E", "#E8C7C8", "#B78387", "#F7F1E8", "#C9A96E"];
    const generated: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      rotation: Math.random() * 360,
      scale: 0.3 + Math.random() * 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      type: (i % 3 === 0 ? "sparkle" : "petal") as "petal" | "sparkle",
    }));
    setParticles(generated);
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.type === "sparkle" ? "w-1 h-1 rounded-full" : "w-2 h-3 rounded-full"}`}
          style={{ left: `${p.x}%`, backgroundColor: p.color, opacity: 0.6 }}
          initial={{ y: "-5%", rotate: 0, opacity: 0 }}
          animate={{
            y: "105vh",
            rotate: p.rotation + 540,
            opacity: [0, 0.7, 0.7, 0],
            x: p.type === "petal" ? [0, 30, -20, 10] : 0,
          }}
          transition={{ duration: 4 + Math.random() * 2, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function Cake({ lit }: { lit: boolean }) {
  return (
    <div className="relative flex flex-col items-center" aria-hidden="true">
      {/* Candles */}
      <div className="flex gap-5 mb-1 relative h-14">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative flex flex-col items-center">
            <AnimatePresence>
              {lit && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.5, type: "spring" }}
                  className="absolute -top-4"
                >
                  <motion.div
                    animate={{ scaleY: [1, 1.3, 0.9, 1.15, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2.5 h-4 rounded-full"
                    style={{
                      background: "linear-gradient(180deg, #F7F1E8 0%, #C9A96E 60%, #B78387 100%)",
                      boxShadow: "0 0 12px rgba(201,169,110,0.6), 0 0 30px rgba(201,169,110,0.3), 0 -4px 12px rgba(247,241,232,0.2)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-1.5 h-10 mt-auto rounded-full bg-gradient-to-b from-blush/50 to-rose/30" />
          </div>
        ))}
      </div>

      {/* Cake body */}
      <div className="flex flex-col items-center">
        <div className="w-36 h-3 rounded-t-xl bg-gradient-to-r from-blush/30 via-cream/15 to-blush/30" />
        <div className="w-36 h-12 bg-gradient-to-b from-cream/8 to-cream/3 border-x border-cream/8">
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-28 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
          </div>
        </div>
        <div className="w-40 h-2 bg-gradient-to-r from-rose/15 via-gold/15 to-rose/15" />
        <div className="w-40 h-14 bg-gradient-to-b from-cream/6 to-cream/2 border-x border-b border-cream/6 rounded-b-xl" />
        <div className="w-48 h-1.5 bg-gradient-to-r from-transparent via-cream/8 to-transparent rounded-full mt-2" />
      </div>
    </div>
  );
}

export function BirthdayMoment() {
  const [candlesLit, setCandlesLit] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleWish = useCallback(() => {
    setCandlesLit(true);
    setTimeout(() => setShowCelebration(true), 1000);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding px-6 flex flex-col items-center text-center overflow-hidden"
      aria-labelledby="birthday-heading"
    >
      {/* Background atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[3s]"
        style={{
          background: showCelebration
            ? "radial-gradient(ellipse at 50% 40%, rgba(201,169,110,0.08) 0%, transparent 50%)"
            : "transparent",
          opacity: showCelebration ? 1 : 0,
        }}
        aria-hidden="true"
      />

      <CelebrationParticles active={showCelebration} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="relative z-10 max-w-2xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold/40 text-sm md:text-base tracking-[0.5em] font-sans mb-8"
        >
          {siteConfig.birthdayFull}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-cream tracking-wider mb-16 leading-tight"
        >
          Happy Birthday,
          <br />
          <span className="text-gradient-gold">{siteConfig.name}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-14"
        >
          <Cake lit={candlesLit} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {!candlesLit ? (
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(201,169,110,0.12)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleWish}
              className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full cursor-pointer overflow-hidden
                border border-gold/20 hover:border-gold/40
                transition-all duration-500
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <div className="absolute inset-0 shimmer rounded-full" />
              <Sparkles size={14} className="relative z-10 text-gold/50" />
              <span className="relative z-10 text-cream/70 hover:text-cream text-xs tracking-[0.25em] uppercase font-sans">
                Make a wish
              </span>
            </motion.button>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 2, duration: 1.2 }}
              className="text-cream/50 font-serif italic text-lg md:text-xl"
            >
              {birthdayClosing}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
