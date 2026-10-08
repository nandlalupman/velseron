"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface PaperTransitionProps {
  children: React.ReactNode;
  className?: string;
  /** Section index for staggered entry */
  index?: number;
  /** Enable the paper fold/unfold effect */
  enabled?: boolean;
  /** Direction of the fold */
  direction?: "up" | "down";
}

export function PaperTransition({
  children,
  className,
  index = 0,
  enabled = true,
  direction = "up",
}: PaperTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setIsVisible(true);
      setProgress(1);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Animate progress from 0 to 1
            let start: number | null = null;
            const duration = 800; // ms
            const animate = (timestamp: number) => {
              if (!start) start = timestamp;
              const elapsed = timestamp - start;
              const p = Math.min(elapsed / duration, 1);
              // Ease out cubic
              setProgress(1 - Math.pow(1 - p, 3));
              if (p < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
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
  }, [enabled]);

  // Calculate CSS transforms based on progress and direction
  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? `translateY(0) rotateX(0)`
      : direction === "up"
      ? "translateY(60px) rotateX(-12deg)"
      : "translateY(-60px) rotateX(12deg)",
    transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${index * 100}ms`,
    transformOrigin: direction === "up" ? "center top" : "center bottom",
    willChange: "transform, opacity",
  };

  // Inner content gets a counter-rotation for paper fold feel
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
    <div
      ref={ref}
      className={cn("relative", className)}
      style={style}
      aria-hidden={!isVisible}
    >
      <div style={innerStyle}>{children}</div>
      
      {/* Subtle paper edge highlight during transition */}
      {enabled && progress > 0 && progress < 1 && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            opacity: Math.sin(progress * Math.PI) * 0.15,
          }}
        >
          <div
            className="absolute left-0 right-0 h-px"
            style={{
              top: direction === "up" ? "0" : "auto",
              bottom: direction === "down" ? "0" : "auto",
              background: "linear-gradient(90deg, transparent, var(--gold-500), transparent)",
            }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Wrapper that applies paper transition to multiple child sections
 * with automatic index assignment
 */
export function PaperTransitionGroup({
  children,
  className,
  enabled = true,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
  direction?: "up" | "down";
}) {
  const childrenArray = Array.isArray(children) ? children : [children];
  
  return (
    <div className={cn(className)}>
      {childrenArray.map((child, index) =>
        React.cloneElement(child as React.ReactElement<any>, {
          index,
          enabled,
          direction,
        } as any)
      )}
    </div>
  );
}

// Need to import React for cloneElement
import React from "react";