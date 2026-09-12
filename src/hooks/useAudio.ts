"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { siteConfig } from "@/data/answeha";

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!siteConfig.musicPath) return;

    const audio = new Audio(siteConfig.musicPath);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";

    audio.addEventListener("canplaythrough", () => setIsReady(true));
    audio.addEventListener("error", () => setIsReady(false));

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  return { isPlaying, isReady, toggle, hasMusic: !!siteConfig.musicPath };
}
