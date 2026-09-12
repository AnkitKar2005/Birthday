"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timelineEntries } from "@/data/answeha";
import { SectionHeading } from "@/components/ui/SectionHeading";

function TimelineItem({
  entry,
  index,
}: {
  entry: (typeof timelineEntries)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`
        relative flex items-start gap-6 md:gap-10
        ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
        flex-row
      `}
    >
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`
          flex-1 md:w-[45%]
          ${isEven ? "md:text-right" : "md:text-left"}
          text-left
        `}
      >
        <div
          className="p-6 md:p-8 rounded-2xl border border-cream/5 bg-cream/[0.02]
            hover:border-cream/10 hover:bg-cream/[0.04] transition-all duration-500"
        >
          <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-sans block mb-2">
            {entry.title}
          </span>
          <p className="text-cream/60 text-sm md:text-base font-sans leading-relaxed">
            {entry.description}
          </p>
        </div>
      </motion.div>

      {/* Center line + dot */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0 w-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
          className="relative z-10 flex items-center justify-center"
        >
          <div className="w-10 h-10 rounded-full border border-gold/30 bg-midnight flex items-center justify-center">
            <span className="text-gold text-xs font-sans font-medium">
              {String(entry.year).slice(2)}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Mobile year badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, type: "spring" }}
        className="md:hidden flex-shrink-0 order-first"
      >
        <div className="w-12 h-12 rounded-full border border-gold/30 bg-midnight flex items-center justify-center">
          <span className="text-gold text-xs font-sans font-medium">
            {String(entry.year).slice(2)}
          </span>
        </div>
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1 md:w-[45%]" />
    </div>
  );
}

export function Timeline() {
  return (
    <section
      className="relative section-padding px-6 md:px-12 lg:px-20 max-w-5xl mx-auto"
      aria-labelledby="timeline-heading"
    >
      <SectionHeading
        subtitle="A journey through the years"
        title="Since 2017"
      />

      {/* Vertical line (desktop) */}
      <div
        className="hidden md:block absolute left-1/2 -translate-x-[0.5px] top-48 bottom-32 w-px bg-gradient-to-b from-transparent via-cream/10 to-transparent"
        aria-hidden="true"
      />

      <div className="space-y-8 md:space-y-12">
        {timelineEntries.map((entry: (typeof timelineEntries)[0], i: number) => (
          <TimelineItem key={entry.year} entry={entry} index={i} />
        ))}
      </div>

      {/* Year labels at start & end */}
      <div className="flex justify-between items-center mt-16 px-4">
        <span className="text-cream/20 text-xs tracking-[0.3em] font-sans">
          {timelineEntries[0]?.year}
        </span>
        <div className="flex-1 mx-6 h-px bg-gradient-to-r from-cream/10 via-gold/20 to-cream/10" />
        <span className="text-gold/50 text-xs tracking-[0.3em] font-sans">
          {timelineEntries[timelineEntries.length - 1]?.year}
        </span>
      </div>
    </section>
  );
}
