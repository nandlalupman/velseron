"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Use the current metal accent. Defaults to true for primary. */
  metal?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * Primary button with foil hover sweep.
 * Secondary = hairline outline.
 * Ghost = no border, subtle hover.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", metal = true, className, children, ...props },
    ref
  ) {
    // Extract conflicting HTML event handlers that clash with framer-motion types
    const {
      onAnimationStart: _a,
      onDrag: _d,
      onDragEnd: _de,
      onDragStart: _ds,
      ...safeProps
    } = props;

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          /* Base */
          "relative inline-flex items-center justify-center gap-2",
          "font-[family-name:var(--font-body)] font-medium tracking-wide",
          "rounded-[var(--radius-sharp)] cursor-pointer select-none",
          "transition-colors duration-[var(--dur-sm)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          "disabled:opacity-40 disabled:pointer-events-none",
          "overflow-hidden",

          /* Sizes */
          sizeStyles[size],

          /* Variants */
          variant === "primary" && [
            metal
              ? "bg-accent text-ink-0 hover:brightness-110"
              : "bg-ivory text-ink-0 hover:bg-ivory/90",
          ],
          variant === "secondary" && [
            "bg-transparent border border-accent text-accent",
            "hover:bg-accent/8",
          ],
          variant === "ghost" && [
            "bg-transparent text-ivory-mute",
            "hover:text-ivory hover:bg-ivory/5",
          ],

          className
        )}
        {...(safeProps as unknown as HTMLMotionProps<"button">)}
      >
        {/* Foil sweep on hover — primary only */}
        {variant === "primary" && (
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 -translate-x-full",
              "bg-gradient-to-r from-transparent via-white/20 to-transparent",
              "transition-transform duration-[var(--dur-lg)] ease-[var(--ease-out)]",
              "group-hover:translate-x-full pointer-events-none"
            )}
          />
        )}
        <span className="relative z-[1]">{children}</span>
      </motion.button>
    );
  }
);
