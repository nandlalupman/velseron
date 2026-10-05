"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";
import { useState, useEffect } from "react";

// Dynamic import with SSR disabled
const HeroDualScene = dynamic(
  () => import("./HeroDualScene").then((mod) => ({ default: mod.HeroDualScene })),
  { ssr: false }
);

interface HeroStageProps {
  className?: string;
}

/**
 * Hero coin stage component.
 *
 * - Renders dual SVG posters immediately for LCP
 * - Loads 3D canvas lazily, crossfades once ready
 * - Radial glow background
 */
export function HeroStage({ className }: HeroStageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay 3D canvas mount to prioritise poster LCP
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full",
        className
      )}
      style={{ aspectRatio: "1 / 1", minHeight: "360px" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(ellipse at 50% 45%, rgba(201,162,75,0.1) 0%, transparent 70%)",
        }}
      />

      {/* SVG Poster Base Layer — LCP (Dual Coins) */}
      <div className="absolute inset-0 flex items-center justify-center z-[1] opacity-80">
        <div className="relative w-full h-full">
          {/* Gold Coin (Left/Foreground) */}
          <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-[60%]">
            <CoinPosterSVG metal="gold" size={400} className="w-full h-auto drop-shadow-2xl" />
          </div>
          {/* Silver Coin (Right/Background) */}
          <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-[45%] w-[50%] opacity-90 blur-[1px]">
            <CoinPosterSVG metal="silver" size={300} className="w-full h-auto drop-shadow-xl" />
          </div>
        </div>
      </div>

      {/* 3D Dual Scene — mounted after delay, fades in on top */}
      {mounted && (
        <div className="absolute inset-0 z-[2]">
          <HeroDualScene />
        </div>
      )}
    </div>
  );
}
