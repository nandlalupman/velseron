"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { TRANSITION } from "@/lib/motion";

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
}

/**
 * Segmented control with a sliding indicator.
 * Used for Front / Back / Edge views and the metal switch.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  size = "md",
}: SegmentedControlProps<T>) {
  const id = useId();
  const activeIndex = options.findIndex((o) => o.value === value);

  return (
    <div
      role="radiogroup"
      aria-label="View selector"
      className={cn(
        "relative inline-flex items-center",
        "bg-surface-elevated rounded-[var(--radius-pill)]",
        "border border-line",
        size === "sm" ? "p-0.5" : "p-1",
        className
      )}
    >
      {/* Sliding indicator */}
      <motion.div
        layoutId={`segment-indicator-${id}`}
        className={cn(
          "absolute bg-accent/15 rounded-[var(--radius-pill)]",
          size === "sm" ? "h-[calc(100%-4px)]" : "h-[calc(100%-8px)]"
        )}
        style={{
          width: `${100 / options.length}%`,
          left: `${(activeIndex / options.length) * 100}%`,
        }}
        transition={TRANSITION.quick}
      />

      {options.map((option) => (
        <button
          key={option.value}
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "relative z-10 flex-1 text-center cursor-pointer",
            "font-mono-label transition-colors duration-[var(--dur-sm)]",
            size === "sm" ? "px-3 py-1.5 text-[10px]" : "px-4 py-2 text-xs",
            value === option.value
              ? "text-accent"
              : "text-ivory-mute hover:text-ivory"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
