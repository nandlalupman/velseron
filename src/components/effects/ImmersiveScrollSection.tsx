"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

interface ImmersiveScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  /** How much the section scales down as you scroll past it (default 0.95) */
  scaleFactor?: number;
  /** How much the section fades out as you scroll past it (default 0.3) */
  fadeFactor?: number;
  /** Enable paper fold/unfold transition on scroll into view */
  paperEffect?: boolean;
  /** Section index for staggered paper effect */
  paperIndex?: number;
  /** Direction of paper fold */
  paperDirection?: "up" | "down";
}

export function ImmersiveScrollSection({
  children,
  className,
  scaleFactor = 0.75,
  fadeFactor = 0.1,
  paperEffect = false,
  paperIndex = 0,
  paperDirection = "up",
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

  if (!paperEffect) {
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

  // Paper effect: combine immersive scroll with paper fold
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
      <PaperTransitionInner
        index={paperIndex}
        direction={paperDirection}
      >
        {children}
      </PaperTransitionInner>
    </motion.div>
  );
}

/**
 * Inner component for paper fold effect - separated to avoid
 * Framer Motion conflicts with the outer motion.div
 */
function PaperTransitionInner({
  children,
  index,
  direction,
}: {
  children: React.ReactNode;
  index: number;
  direction: "up" | "down";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translateY(0) rotateX(0)"
      : direction === "up"
      ? "translateY(60px) rotateX(-12deg)"
      : "translateY(-60px) rotateX(12deg)",
    transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${index * 100}ms`,
    transformOrigin: direction === "up" ? "center top" : "center bottom",
    willChange: "transform, opacity",
  };

  const innerStyle: React.CSSProperties = {
    transform: isVisible
      ? "rotateX(0)"
      : direction === "up"
      ? "rotateX(8deg)"
      : "rotateX(-8deg)",
    transformOrigin: direction === "up" ? "center top" : "center bottom",
    transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${index * 100 + 50}ms`,
    willChange: "transform",
  };

  return (
    <div ref={ref} style={style} aria-hidden={!isVisible}>
      <div style={innerStyle}>{children}</div>
    </div>
  );
}