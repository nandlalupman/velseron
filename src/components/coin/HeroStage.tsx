"use client";

import dynamic from "next/dynamic";
import type { Metal } from "@/data/coins";
import { cn } from "@/lib/cn";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";
import { useState, useEffect } from "react";

// Dynamic import with SSR disabled — R3F cannot render on server
const CoinScene = dynamic(
  () => import("./CoinScene").then((mod) => ({ default: mod.CoinScene })),
  { ssr: false }
);

interface HeroStageProps {
  metal: Metal;
  className?: string;
}

/**
 * Hero coin stage component.
 *
 * - Renders SVG poster immediately for LCP
 * - Loads 3D canvas lazily, crossfades once ready
 * - Radial glow background matches metal
 * - Entrance animation via parent Reveal
 */
export function HeroStage({ metal, className }: HeroStageProps) {
  const isGold = metal === "gold";
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
          background: `radial-gradient(ellipse at 50% 45%, ${
            isGold
              ? "rgba(201,162,75,0.12)"
              : "rgba(196,202,210,0.08)"
          } 0%, transparent 70%)`,
        }}
      />

      {/* SVG Poster — always visible as base layer (LCP) */}
      <div className="absolute inset-0 flex items-center justify-center z-[1]">
        <CoinPosterSVG
          metal={metal}
          size={420}
          className="w-[75%] h-auto opacity-90"
        />
      </div>

      {/* 3D CoinScene — mounted after delay, fades in on top */}
      {mounted && (
        <div className="absolute inset-0 z-[2]">
          <CoinScene
            metal={metal}
            size="hero"
            interactive
            autoRotate
          />
        </div>
      )}
    </div>
  );
}
