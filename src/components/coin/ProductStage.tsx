"use client";

import dynamic from "next/dynamic";
import type { Metal } from "@/data/coins";
import { cn } from "@/lib/cn";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";

const CoinScene = dynamic(
  () => import("./CoinScene").then((mod) => ({ default: mod.CoinScene })),
  { ssr: false }
);

interface ProductStageProps {
  metal: Metal;
  className?: string;
}

/**
 * Product page coin stage — square aspect, interactive rotation.
 * Used in the PDP left column.
 *
 * SVG poster renders immediately, 3D canvas loads on top.
 */
export function ProductStage({ metal, className }: ProductStageProps) {
  const isGold = metal === "gold";

  return (
    <div
      className={cn(
        "relative aspect-square flex items-center justify-center",
        "bg-ink-1 rounded-[var(--radius-sharp)] border border-line overflow-hidden",
        className
      )}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 45%, ${
            isGold
              ? "rgba(201,162,75,0.08)"
              : "rgba(196,202,210,0.06)"
          } 0%, transparent 65%)`,
        }}
      />

      {/* SVG Poster — always rendered as base (LCP layer) */}
      <div className="absolute inset-0 flex items-center justify-center z-[1]">
        <CoinPosterSVG
          metal={metal}
          size={280}
          className="w-[65%] h-auto"
        />
      </div>

      {/* 3D CoinScene overlay */}
      <CoinScene
        metal={metal}
        size="card"
        interactive
        autoRotate
      />
    </div>
  );
}
