"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

interface ImmersiveScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  /** How much the section scales down as you scroll past it (default 0.95) */
  scaleFactor?: number;
  /** How much the section fades out as you scroll past it (default 0.3) */
  fadeFactor?: number;
}

/**
 * Creates an immersive 3D "diving in" overlay effect as the user scrolls.
 * The section scales down slightly and fades, giving the illusion that
 * the next section is scrolling *over* it.
 * 
 * Uses inline layout (no sticky/fixed) to avoid breaking page flow.
 */
export function ImmersiveScrollSection({
  children,
  className,
  scaleFactor = 0.75,
  fadeFactor = 0.1,
}: ImmersiveScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform values
  const scale = useTransform(smoothProgress, [0, 0.8], [1, scaleFactor]);
  const opacity = useTransform(smoothProgress, [0, 0.8], [1, fadeFactor]);

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{
        scale,
        opacity,
        transformOrigin: "center top",
      }}
    >
      {children}
    </motion.div>
  );
}
