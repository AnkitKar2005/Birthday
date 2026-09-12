"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { appreciationCards } from "@/data/answeha";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { X } from "lucide-react";

function Card({
  card,
  index,
  onSelect,
}: {
  card: (typeof appreciationCards)[0];
  index: number;
  onSelect: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelect(index)}
        className="group w-full text-left cursor-pointer
          relative p-6 md:p-7 rounded-2xl overflow-hidden
          glass glass-hover transition-all duration-700
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        aria-label={`Read more about: ${card.title}`}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "radial-gradient(circle at 50% 80%, rgba(201,169,110,0.08), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Emoji accent */}
          <span className="block text-gold/40 text-2xl mb-4 group-hover:text-gold/60 transition-colors duration-500">
            {card.emoji}
          </span>

          {/* Title */}
          <span className="block font-serif text-xl md:text-2xl font-light text-cream/80 italic group-hover:text-cream transition-colors duration-500">
            {card.title}
          </span>

          {/* Decorative line */}
          <div className="mt-4 w-8 h-px bg-gold/15 group-hover:w-12 group-hover:bg-gold/30 transition-all duration-700" aria-hidden="true" />

          {/* Hint text */}
          <span className="block mt-3 text-cream/15 text-[10px] tracking-[0.2em] uppercase font-sans group-hover:text-cream/30 transition-colors duration-500">
            tap to read
          </span>
        </div>

        {/* Corner accents */}
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-cream/0 group-hover:border-cream/8 rounded-tr-md transition-all duration-700" aria-hidden="true" />
      </motion.button>
    </motion.div>
  );
}

export function AppreciationCards() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section
      className="relative section-padding px-6 md:px-12 lg:px-20 max-w-6xl mx-auto"
      aria-labelledby="appreciation-heading"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(183,131,135,0.04) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <SectionHeading subtitle="The quiet things" title="Little Things I Appreciate" />

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {appreciationCards.map((card, i) => (
          <Card key={card.title} card={card} index={i} onSelect={setSelected} />
        ))}
      </div>

      {/* Expanded card modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(10,10,16,0.85)", backdropFilter: "blur(12px)" }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`About: ${appreciationCards[selected].title}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full p-10 md:p-12 rounded-3xl glass overflow-hidden"
            >
              {/* Ambient glow behind card */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.08), transparent 60%)",
                }}
                aria-hidden="true"
              />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 p-2 text-cream/20 hover:text-cream/50 
                  transition-colors cursor-pointer rounded-full hover:bg-cream/5
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="relative z-10">
                <span className="text-gold/40 text-3xl block mb-4">
                  {appreciationCards[selected].emoji}
                </span>
                <p className="text-gold/40 text-[10px] tracking-[0.3em] uppercase font-sans mb-4">
                  A little note
                </p>
                <h3 className="font-serif text-3xl md:text-4xl font-light text-cream italic mb-6">
                  {appreciationCards[selected].title}
                </h3>
                <div className="w-10 h-px bg-gradient-to-r from-gold/30 to-transparent mb-6" aria-hidden="true" />
                <p className="handwritten text-cream/60 text-lg md:text-xl leading-relaxed">
                  {appreciationCards[selected].note}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
