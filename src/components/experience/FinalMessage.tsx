"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { finalMessage } from "@/data/answeha";

export function FinalMessage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative section-padding px-6 flex flex-col items-center text-center min-h-[60vh] justify-center"
      aria-labelledby="final-heading"
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(183,131,135,0.05) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-lg">
        {/* Message lines */}
        {finalMessage.lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: i * 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`
              font-serif text-lg md:text-xl font-light leading-relaxed tracking-wide
              ${line === "" ? "h-6" : "text-cream/70"}
            `}
          >
            {line || "\u00A0"}
          </motion.p>
        ))}

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: finalMessage.lines.length * 0.2 + 0.5, duration: 1 }}
          className="mt-8 text-gold/50 text-sm tracking-[0.2em] font-sans"
        >
          {finalMessage.signature}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: finalMessage.lines.length * 0.2 + 1, duration: 1.2 }}
          className="mt-10 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-cream/15 to-transparent"
          aria-hidden="true"
        />

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: finalMessage.lines.length * 0.2 + 1.5, duration: 1 }}
          className="mt-8 text-cream/20 text-xs tracking-[0.4em] font-sans"
        >
          {finalMessage.footer}
        </motion.p>
      </div>

      {/* Bottom spacer for scroll */}
      <div className="h-20" aria-hidden="true" />
    </section>
  );
}
