"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";
import { REVEAL_VARIANTS, DUR, EASE } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before reveal starts. */
  delay?: number;
  /** Viewport amount to trigger (0–1). */
  amount?: number;
  /** Stagger index for child staggering (multiply by stagger interval). */
  stagger?: number;
}

/**
 * Scroll-reveal wrapper. Animates children from opacity 0 + translateY 24px
 * to visible, once, at 15% viewport intersection.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.15,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });

  const staggerDelay = stagger ? stagger * 0.08 : 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: REVEAL_VARIANTS.hidden,
        visible: {
          ...REVEAL_VARIANTS.visible,
          transition: {
            duration: DUR.lg,
            ease: EASE.out,
            delay: delay + staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
