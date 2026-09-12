"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Opening } from "@/components/experience/Opening";
import { Milestones } from "@/components/experience/Milestones";
import { PhotoGallery } from "@/components/experience/PhotoGallery";
import { AppreciationCards } from "@/components/experience/AppreciationCards";
import { EnvelopeLetter } from "@/components/experience/EnvelopeLetter";
import { StarWishes } from "@/components/experience/StarWishes";
import { BirthdayMoment } from "@/components/experience/BirthdayMoment";
import { FinalMessage } from "@/components/experience/FinalMessage";
import { AudioControl } from "@/components/ui/AudioControl";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = useCallback(() => {
    setHasEntered(true);
  }, []);

  return (
    <>
      {/* Opening screen */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            key="opening"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Opening onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main experience */}
      {hasEntered && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="relative"
        >
          {/* Audio control (only after entering) */}
          <AudioControl />

          {/* Sections */}
          <Milestones />
          <SectionDivider variant="dots" />

          <PhotoGallery />
          <SectionDivider variant="line" />

          <AppreciationCards />
          <SectionDivider variant="dots" />

          <EnvelopeLetter />
          <SectionDivider variant="line" />

          <StarWishes />
          <SectionDivider variant="dots" />

          <BirthdayMoment />
          <SectionDivider variant="space" />

          <FinalMessage />
        </motion.main>
      )}
    </>
  );
}
