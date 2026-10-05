"use client";

import { useState, useCallback, useRef } from "react";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";
import { cn } from "@/lib/cn";
import type { Metal } from "@/data/coins";

interface CoinFallbackProps {
  metal: Metal;
  className?: string;
  size?: number;
}

/**
 * 2D coin fallback for Tier C devices (no WebGL).
 *
 * Shows the SVG poster with simulated rotation via CSS transforms.
 * - Drag left/right to flip between front/back
 * - Click "Front" / "Back" buttons for snapping
 * - Uses scaleX transform to simulate rotation
 */
export function CoinFallback({
  metal,
  className,
  size = 320,
}: CoinFallbackProps) {
  const [face, setFace] = useState<"obverse" | "reverse">("obverse");
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = (e.clientX - startX.current) / 200;
    setDragOffset(Math.max(-1, Math.min(1, delta)));
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // If dragged far enough, flip the coin
    if (Math.abs(dragOffset) > 0.4) {
      setFace((f) => (f === "obverse" ? "reverse" : "obverse"));
    }
    setDragOffset(0);
  }, [dragOffset]);

  // Calculate visual scale from drag
  const scaleX = Math.cos(dragOffset * Math.PI * 0.5);
  const showFace = scaleX >= 0 ? face : face === "obverse" ? "reverse" : "obverse";

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center gap-4", className)}
    >
      <div
        className="cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `scaleX(${Math.abs(scaleX)})`,
          transition: dragOffset !== 0 ? "none" : "transform 0.3s var(--ease-out)",
        }}
      >
        <CoinPosterSVG metal={metal} size={size} face={showFace} />
      </div>

      {/* Face buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => { setFace("obverse"); setDragOffset(0); }}
          className={cn(
            "font-mono-label text-[9px] px-3 py-1 rounded-[var(--radius-sharp)] transition-colors",
            face === "obverse"
              ? "bg-surface-elevated text-ivory"
              : "text-ivory-mute/50 hover:text-ivory-mute"
          )}
        >
          FRONT
        </button>
        <button
          onClick={() => { setFace("reverse"); setDragOffset(0); }}
          className={cn(
            "font-mono-label text-[9px] px-3 py-1 rounded-[var(--radius-sharp)] transition-colors",
            face === "reverse"
              ? "bg-surface-elevated text-ivory"
              : "text-ivory-mute/50 hover:text-ivory-mute"
          )}
        >
          BACK
        </button>
      </div>

      <span className="font-mono-label text-ivory-mute/30 text-[8px]">
        DRAG TO ROTATE · 2D PREVIEW
      </span>
    </div>
  );
}
