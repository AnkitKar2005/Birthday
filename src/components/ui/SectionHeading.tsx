"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  className?: string;
}

export function SectionHeading({ subtitle, title, className = "" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`text-center mb-16 md:mb-20 ${className}`}
    >
      {subtitle && (
        <p className="text-gold/80 text-xs tracking-[0.3em] uppercase mb-4 font-sans">
          {subtitle}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-cream tracking-wide">
        {title}
      </h2>
      <div className="mt-6 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </motion.div>
  );
}
