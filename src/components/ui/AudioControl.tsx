"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";

export function AudioControl() {
  const { isPlaying, isReady, toggle, hasMusic } = useAudio();

  if (!hasMusic) return null;

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={toggle}
      disabled={!isReady}
      aria-label={isPlaying ? "Mute ambient music" : "Play ambient music"}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full 
        bg-cream/5 backdrop-blur-sm border border-cream/10 
        text-cream/60 hover:text-cream hover:bg-cream/10
        transition-all duration-300 cursor-pointer
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold
        disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      {/* Audio visualizer bars */}
      {isPlaying && (
        <span className="absolute -top-1 -right-1 flex gap-[2px]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[2px] bg-gold/60 rounded-full"
              animate={{ height: ["4px", "8px", "4px"] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </span>
      )}
    </motion.button>
  );
}
