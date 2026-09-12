"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { photoEntries, type PhotoEntry } from "@/data/answeha";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Sparkles,
  Heart,
  Eye,
} from "lucide-react";

export function PhotoGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const categories = ["All", "Celebration", "Tradition", "Serenity", "Candid"];

  const filteredPhotos =
    activeFilter === "All"
      ? photoEntries
      : photoEntries.filter(
          (p) =>
            p.tag.toLowerCase() === activeFilter.toLowerCase() ||
            (activeFilter === "Candid" && (p.tag === "Candid" || p.tag === "Warmth"))
        );

  const openLightbox = (index: number) => {
    // Find original index in photoEntries
    const photo = filteredPhotos[index];
    const originalIdx = photoEntries.findIndex((p) => p.src === photo.src);
    setSelectedIdx(originalIdx >= 0 ? originalIdx : index);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const nextPhoto = useCallback(() => {
    setSelectedIdx((prev) =>
      prev === null ? null : (prev + 1) % photoEntries.length
    );
  }, []);

  const prevPhoto = useCallback(() => {
    setSelectedIdx((prev) =>
      prev === null
        ? null
        : (prev - 1 + photoEntries.length) % photoEntries.length
    );
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, nextPhoto, prevPhoto]);

  // Toggle favorite on photo
  const toggleLike = (src: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({ ...prev, [src]: !prev[src] }));
  };

  const currentPhoto = selectedIdx !== null ? photoEntries[selectedIdx] : null;

  return (
    <section
      ref={containerRef}
      className="relative section-padding px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-rose/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-gold/10 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Section Heading */}
      <SectionHeading
        subtitle="Curated Frames • 08 Moments"
        title="A Little Visual Anthology"
      />

      {/* Narrative Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center text-cream/60 max-w-xl mx-auto -mt-10 mb-10 text-sm md:text-base font-serif italic tracking-wide"
      >
        "Some moments don&apos;t ask for words — they just ask to be remembered."
      </motion.p>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12"
      >
        {categories.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`
                px-5 py-2 rounded-full text-xs md:text-sm tracking-[0.15em] font-sans transition-all duration-300 relative
                ${
                  isActive
                    ? "text-cream bg-white/10 border border-gold/40 shadow-[0_0_20px_rgba(201,169,110,0.2)]"
                    : "text-cream/50 hover:text-cream/80 bg-white/[0.02] border border-white/5 hover:border-white/10"
                }
              `}
            >
              {isActive && (
                <motion.span
                  layoutId="activeFilterIndicator"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_#c9a96e]"
                />
              )}
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Gallery Grid — Dynamic Luxury Bento / Masonry */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, idx) => {
            const isLiked = !!likedPhotos[photo.src];
            // Varied heights for magazine aesthetic
            const heightClass =
              photo.aspect === "tall"
                ? "aspect-[3/4]"
                : photo.aspect === "wide"
                ? "aspect-[16/10]"
                : "aspect-[4/5]";

            return (
              <motion.div
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                {/* Outer Glass Card Frame */}
                <div className="relative overflow-hidden rounded-2xl glass p-2 transition-all duration-700 group-hover:border-gold/30 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                  {/* Image Container */}
                  <div
                    className={`relative w-full ${heightClass} overflow-hidden rounded-xl bg-midnight/80`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title || photo.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Overlay for Mood & Contrast */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                      aria-hidden="true"
                    />

                    {/* Subtle Top Vignette */}
                    <div
                      className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-midnight/60 to-transparent opacity-40"
                      aria-hidden="true"
                    />

                    {/* Top Row: Frame Number & Tag */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] tracking-[0.2em] font-sans font-medium uppercase bg-midnight/60 backdrop-blur-md border border-white/10 text-gold">
                        № {photo.number}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] tracking-[0.15em] font-sans uppercase bg-white/10 backdrop-blur-md border border-white/10 text-cream/80">
                          {photo.tag}
                        </span>
                        {/* Quick Favorite Button */}
                        <button
                          onClick={(e) => toggleLike(photo.src, e)}
                          className={`p-1.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
                            isLiked
                              ? "bg-rose/30 border-rose text-rose scale-110"
                              : "bg-midnight/60 border-white/10 text-cream/60 hover:text-rose"
                          }`}
                          aria-label="Appreciate photo"
                        >
                          <Heart
                            size={13}
                            className={isLiked ? "fill-rose text-rose" : ""}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Hover Center Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-midnight/70 backdrop-blur-md border border-gold/40 flex items-center justify-center text-gold shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Eye size={20} />
                      </div>
                    </div>

                    {/* Bottom Content / Caption */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-serif text-lg md:text-xl font-light text-cream mb-1 tracking-wide group-hover:text-gold transition-colors duration-300">
                        {photo.title}
                      </h3>
                      <p className="text-cream/60 text-xs font-serif italic line-clamp-2 leading-relaxed">
                        {photo.caption}
                      </p>

                      <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-gold/80 font-sans font-medium">
                          Click to expand
                        </span>
                        <Maximize2 size={11} className="text-gold/80" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle outer gold glow on hover */}
                <div
                  className="absolute -inset-1 rounded-2xl bg-gold/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10"
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/95 backdrop-blur-2xl p-4 md:p-8"
            onClick={closeLightbox}
          >
            {/* Ambient Background Nebulae */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose/10 blur-[150px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Toolbar */}
            <div
              className="absolute top-4 inset-x-4 md:top-8 md:inset-x-8 flex items-center justify-between z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Frame Indicator */}
              <div className="flex items-center gap-3">
                <span className="font-serif text-xl md:text-2xl text-gradient-gold">
                  № {currentPhoto.number}
                </span>
                <span className="text-cream/30 text-xs tracking-[0.2em]">/</span>
                <span className="text-cream/40 text-xs tracking-[0.2em] font-sans">
                  {String(photoEntries.length).padStart(2, "0")}
                </span>
                <span className="hidden sm:inline-block ml-3 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase bg-white/5 border border-white/10 text-cream/70">
                  {currentPhoto.tag}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => toggleLike(currentPhoto.src, e)}
                  className={`p-3 rounded-full backdrop-blur-lg border transition-all duration-300 ${
                    likedPhotos[currentPhoto.src]
                      ? "bg-rose/20 border-rose text-rose scale-105"
                      : "bg-white/5 border-white/15 text-cream hover:text-rose hover:border-rose/50"
                  }`}
                  aria-label="Appreciate"
                >
                  <Heart
                    size={18}
                    className={
                      likedPhotos[currentPhoto.src] ? "fill-rose text-rose" : ""
                    }
                  />
                </button>

                <button
                  onClick={closeLightbox}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-cream transition-all duration-300"
                  aria-label="Close lightbox"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-midnight/70 hover:bg-midnight border border-white/15 text-cream hover:text-gold hover:border-gold/40 transition-all duration-300 backdrop-blur-md"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-midnight/70 hover:bg-midnight border border-white/15 text-cream hover:text-gold hover:border-gold/40 transition-all duration-300 backdrop-blur-md"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Central Modal Container */}
            <motion.div
              key={currentPhoto.src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-6 max-h-[85vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Photo Frame */}
              <div className="relative w-full max-w-lg h-[50vh] md:h-[72vh] rounded-2xl overflow-hidden glass p-2 border border-gold/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.title || currentPhoto.caption}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 600px"
                    className="object-contain md:object-cover"
                  />
                  {/* Subtle inner border */}
                  <div
                    className="absolute inset-2 border border-white/10 rounded-lg pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Details Column */}
              <div className="w-full md:w-80 flex flex-col justify-center text-left px-2 md:px-0">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-gold" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80 font-sans">
                    Anwesha&apos;s World
                  </span>
                </div>

                <h2 className="font-serif text-2xl md:text-3xl font-light text-cream mb-4">
                  {currentPhoto.title}
                </h2>

                <div className="w-10 h-px bg-gradient-to-r from-gold/50 to-transparent mb-4" />

                <p className="font-serif italic text-cream/70 text-base md:text-lg leading-relaxed mb-6">
                  &ldquo;{currentPhoto.caption}&rdquo;
                </p>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
                  <p className="text-xs text-cream/40 font-sans leading-relaxed">
                    Captured across different chapters. A quiet reminder of your
                    grace, warmth, and quiet strength.
                  </p>
                </div>

                {/* Lightbox Thumbnail Strip */}
                <div className="mt-6 flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
                  {photoEntries.map((p, idx) => (
                    <button
                      key={p.src}
                      onClick={() => setSelectedIdx(idx)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                        selectedIdx === idx
                          ? "ring-2 ring-gold scale-105 opacity-100"
                          : "opacity-40 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={p.src}
                        alt={`Thumbnail ${p.number}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
