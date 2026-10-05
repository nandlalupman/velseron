"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Initial full-screen cinematic video intro.
 * Plays once per session, fades out to reveal the site.
 */
export function IntroVideo() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleComplete = () => {
    setShow(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("velseron_intro_played", "true");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if we've already played this session
    const hasPlayed = sessionStorage.getItem("velseron_intro_played");
    if (hasPlayed) {
      setShow(false);
    } else {
      // Fallback in case video fails to load or finish
      const timeout = setTimeout(() => {
        handleComplete();
      }, 8000);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev + 0.05; // 5% every 100ms
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [show]);



  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-ink-0 flex items-center justify-center overflow-hidden"
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 text-ivory">
            <div className="flex items-center gap-2 font-mono-label text-sm tracking-widest">
              <span className="w-4 h-4 inline-flex">👑</span>
              VELSERON
            </div>
          </div>

          {/* Video */}
          <div className="absolute inset-0 z-0 opacity-70">
            <video
              src="/coins/velseron-hero-video.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handleComplete}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-0 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-ink-0/30" />
          </div>

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-6 opacity-80">
              <div className="w-12 h-px bg-accent/50" />
              <span className="font-mono-label text-[10px] tracking-widest text-accent">THE SOVEREIGN STANDARD</span>
              <div className="w-12 h-px bg-accent/50" />
            </div>

            <h1 className="font-display text-ivory text-5xl md:text-7xl mb-4 tracking-tight">
              VELSERON
            </h1>
            <div className="font-mono-label text-ivory-mute text-xs md:text-sm tracking-[0.3em] mb-8">
              GOLD & SILVER COINS
            </div>
            
            <p className="text-ivory/80 italic font-serif text-lg md:text-xl mb-12">
              &quot;Crafted to be held. Designed to be remembered.&quot;
            </p>

            {/* Progress Bar */}
            <div className="w-64 max-w-[80vw] mb-8">
              <div className="h-0.5 w-full bg-ink-2 relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="flex justify-between items-center mt-3 font-mono-label text-[9px] text-ivory-mute">
                <span>CINEMATIC FILM</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
            </div>

            <button 
              onClick={handleComplete}
              className="group flex items-center gap-2 font-mono-label text-[10px] tracking-widest text-ivory/60 hover:text-ivory transition-colors"
            >
              SKIP INTRO
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
