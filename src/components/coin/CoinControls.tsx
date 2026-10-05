"use client";

import { cn } from "@/lib/cn";

type ViewPreset = "front" | "back" | "edge";

interface CoinControlsProps {
  activeView: ViewPreset;
  onViewChange: (view: ViewPreset) => void;
  className?: string;
}

/**
 * Snap-view buttons for the 3D coin viewer.
 * Allows quick Front / Back / Edge presets.
 * Keyboard accessible with arrow keys.
 */
export function CoinControls({
  activeView,
  onViewChange,
  className,
}: CoinControlsProps) {
  const views: { id: ViewPreset; label: string; key: string }[] = [
    { id: "front", label: "FRONT", key: "f" },
    { id: "back", label: "BACK", key: "b" },
    { id: "edge", label: "EDGE", key: "e" },
  ];

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = views[(idx + 1) % views.length];
      onViewChange(next.id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = views[(idx - 1 + views.length) % views.length];
      onViewChange(prev.id);
    }
  };

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="radiogroup"
      aria-label="Coin view angle"
    >
      {views.map((view, idx) => (
        <button
          key={view.id}
          role="radio"
          aria-checked={activeView === view.id}
          aria-label={`${view.label} view`}
          onClick={() => onViewChange(view.id)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          tabIndex={activeView === view.id ? 0 : -1}
          className={cn(
            "font-mono-label text-[10px] px-3 py-1.5 rounded-[var(--radius-sharp)]",
            "transition-all duration-[var(--dur-sm)]",
            "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
            activeView === view.id
              ? "bg-surface-elevated text-ivory"
              : "text-ivory-mute/60 hover:text-ivory-mute hover:bg-surface-elevated/50"
          )}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}
