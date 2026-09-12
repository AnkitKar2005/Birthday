"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { milestones } from "@/data/answeha";
import { SectionHeading } from "@/components/ui/SectionHeading";

function MilestoneCard({
  entry,
  index,
}: {
  entry: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative p-8 md:p-10 rounded-3xl glass glass-hover transition-all duration-700 overflow-hidden">
        {/* Background glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: index % 2 === 0
              ? "radial-gradient(circle at 30% 50%, rgba(201,169,110,0.06), transparent 60%)"
              : "radial-gradient(circle at 70% 50%, rgba(183,131,135,0.06), transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Large number */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3, type: "spring", stiffness: 100 }}
            className="block font-serif text-7xl md:text-8xl lg:text-9xl font-light text-gradient-gold leading-none mb-4"
          >
            {entry.number}
          </motion.span>

          {/* Label */}
          <h3 className="font-serif text-xl md:text-2xl font-light text-cream/80 italic mb-3">
            {entry.label}
          </h3>

          {/* Detail */}
          <p className="text-cream/40 text-sm font-sans leading-relaxed max-w-sm">
            {entry.detail}
          </p>
        </div>

        {/* Corner decoration */}
        <div
          className="absolute top-4 right-4 w-8 h-8 border-t border-r border-cream/5 group-hover:border-gold/15 rounded-tr-lg transition-colors duration-700"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-cream/5 group-hover:border-gold/15 rounded-bl-lg transition-colors duration-700"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

export function Milestones() {
  return (
    <section
      className="relative section-padding px-6 md:px-12 lg:px-20 max-w-6xl mx-auto"
      aria-labelledby="milestones-heading"
    >
      <SectionHeading subtitle="Counting the moments" title="The Numbers That Matter" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {milestones.map((entry, i) => (
          <MilestoneCard key={entry.label} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
