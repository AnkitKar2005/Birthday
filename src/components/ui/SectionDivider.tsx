"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "line" | "dots" | "space";
}

export function SectionDivider({ variant = "line" }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  if (variant === "space") {
    return <div className="h-12 md:h-20" aria-hidden="true" />;
  }

  if (variant === "dots") {
    return (
      <div ref={ref} className="flex justify-center items-center gap-3 py-16 md:py-24" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="w-1 h-1 rounded-full bg-cream/15"
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="flex justify-center py-16 md:py-24" aria-hidden="true">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-24 h-px bg-gradient-to-r from-transparent via-cream/10 to-transparent"
      />
    </div>
  );
}
