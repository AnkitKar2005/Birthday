"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { envelopeLetter } from "@/data/answeha";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mail } from "lucide-react";

export function EnvelopeLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className="relative section-padding px-6 md:px-12 flex flex-col items-center overflow-hidden"
      aria-labelledby="envelope-heading"
    >
      {/* Background atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isOpen
            ? "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 50%)"
            : "transparent",
          transition: "background 2s ease",
        }}
        aria-hidden="true"
      />

      <SectionHeading subtitle="One more thing" title="The Secret Envelope" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, scale: 0.9, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-10 max-w-md text-center"
          >
            {/* Envelope visual — premium redesign */}
            <motion.div
              whileHover={{ y: -6, rotateZ: -1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative group"
            >
              <div className="w-64 h-44 md:w-80 md:h-52 rounded-2xl glass overflow-hidden relative">
                {/* Envelope body gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-cream/[0.05] to-cream/[0.02]" />

                {/* Flap triangle */}
                <div className="absolute top-0 left-0 right-0 h-[55%]">
                  <svg viewBox="0 0 320 120" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M0 0 L160 100 L320 0"
                      fill="none"
                      stroke="rgba(201,169,110,0.15)"
                      strokeWidth="1"
                    />
                  </svg>
                </div>

                {/* Seal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-rose/20 to-gold/10 border border-gold/15 flex items-center justify-center"
                  >
                    <Mail size={16} className="text-gold/50" />
                  </motion.div>
                </div>

                {/* Inner glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.08), transparent 60%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            <div>
              <p className="text-cream/40 text-sm font-serif italic mb-6">
                There&apos;s something I wanted to say.
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(true)}
                className="relative px-8 py-3 rounded-full cursor-pointer overflow-hidden
                  border border-gold/20 hover:border-gold/40
                  transition-all duration-500
                  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <div className="absolute inset-0 shimmer rounded-full" />
                <span className="relative z-10 text-gold/70 hover:text-gold text-xs tracking-[0.25em] uppercase font-sans transition-colors duration-500">
                  Open it
                </span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl"
          >
            {/* Paper card */}
            <div className="relative p-8 md:p-12 rounded-3xl glass overflow-hidden">
              {/* Warm ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/15 flex items-center justify-center">
                    <Mail size={12} className="text-gold/50" />
                  </div>
                  <span className="text-gold/30 text-[10px] tracking-[0.3em] uppercase font-sans">
                    A letter for you
                  </span>
                </div>

                {/* Letter text with staggered reveal */}
                <div className="space-y-0">
                  {envelopeLetter.split("\n").map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={`
                        handwritten text-base md:text-lg leading-[1.8]
                        ${line.trim() === "" ? "h-4" : "text-cream/60"}
                        ${line.startsWith("—") ? "text-gold/50 mt-6 not-italic font-sans text-sm tracking-wider" : ""}
                      `}
                    >
                      {line || "\u00A0"}
                    </motion.p>
                  ))}
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-cream/5 rounded-tr-lg" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-cream/5 rounded-bl-lg" aria-hidden="true" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
