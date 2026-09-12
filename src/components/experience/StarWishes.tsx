"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { starWishes } from "@/data/answeha";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  delay: number;
}

export function StarWishes() {
  const [stars, setStars] = useState<Star[]>([]);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [revealedStars, setRevealedStars] = useState<Set<number>>(new Set());

  useEffect(() => {
    const generated: Star[] = starWishes.map((_, i) => ({
      id: i,
      x: 8 + Math.random() * 84,
      y: 5 + Math.random() * 75,
      size: 3 + Math.random() * 5,
      brightness: 0.4 + Math.random() * 0.6,
      delay: Math.random() * 2,
    }));
    setStars(generated);
  }, []);

  const handleStarClick = useCallback((id: number) => {
    setSelectedStar(id);
    setRevealedStars((prev) => new Set(prev).add(id));
  }, []);

  return (
    <section
      className="relative section-padding px-6 overflow-hidden"
      aria-labelledby="wishes-heading"
      style={{
        background:
          "linear-gradient(180deg, var(--color-midnight) 0%, #08080f 30%, #0c0c18 70%, var(--color-midnight) 100%)",
      }}
    >
      {/* Nebula-like ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(183,131,135,0.05) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 60%)",
            filter: "blur(50px)",
            animationDelay: "2s",
          }}
        />
      </div>

      <SectionHeading subtitle="Look up" title="A Sky Full of Wishes" />

      <p className="text-center text-cream/20 text-[11px] tracking-[0.25em] font-sans mb-12">
        tap a star to reveal a wish
      </p>

      {/* Star field */}
      <div
        className="relative mx-auto max-w-5xl h-[55vh] min-h-[400px] max-h-[650px]"
        role="group"
        aria-label="Interactive star field with wishes"
      >
        {/* Ambient background stars */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className="absolute rounded-full bg-cream/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 1 + Math.random() * 0.5,
              height: 1 + Math.random() * 0.5,
            }}
            animate={{ opacity: [0.05, 0.4, 0.05] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Interactive wish stars */}
        {stars.map((star) => (
          <motion.button
            key={star.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: star.brightness, scale: 1 }}
            transition={{
              delay: star.delay,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => handleStarClick(star.id)}
            className="absolute cursor-pointer group
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            aria-label={
              revealedStars.has(star.id)
                ? `Star wish: ${starWishes[star.id]}`
                : `Star ${star.id + 1} — click to reveal wish`
            }
          >
            {/* Glow ring on hover */}
            <span
              className="absolute inset-0 -m-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{
                background: "radial-gradient(circle, rgba(201,169,110,0.15), transparent 70%)",
              }}
              aria-hidden="true"
            />
            {/* Star dot */}
            <motion.span
              className={`block rounded-full transition-all duration-700 ${
                revealedStars.has(star.id)
                  ? "bg-gold shadow-[0_0_15px_rgba(201,169,110,0.5)]"
                  : "bg-cream/70 shadow-[0_0_5px_rgba(247,241,232,0.3)]"
              }`}
              style={{ width: star.size, height: star.size }}
            />
          </motion.button>
        ))}

        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          {stars
            .filter((s) => revealedStars.has(s.id))
            .map((star, i, arr) => {
              if (i === 0) return null;
              const prev = arr[i - 1];
              return (
                <motion.line
                  key={`line-${star.id}`}
                  x1={`${prev.x}%`}
                  y1={`${prev.y}%`}
                  x2={`${star.x}%`}
                  y2={`${star.y}%`}
                  stroke="rgba(201,169,110,0.08)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
              );
            })}
        </svg>
      </div>

      {/* Wish reveal */}
      <AnimatePresence mode="wait">
        {selectedStar !== null && (
          <motion.div
            key={selectedStar}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 text-center max-w-lg mx-auto"
          >
            <p className="text-gold/25 text-[10px] tracking-[0.4em] uppercase font-sans mb-4">
              ✧ Wish {selectedStar + 1} of {starWishes.length} ✧
            </p>
            <p className="font-serif text-xl md:text-2xl font-light text-cream/70 italic leading-relaxed">
              &ldquo;{starWishes[selectedStar]}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="mt-10 text-center">
        <p className="text-cream/10 text-[10px] font-sans tracking-widest">
          {revealedStars.size} / {starWishes.length}
        </p>
      </div>
    </section>
  );
}
