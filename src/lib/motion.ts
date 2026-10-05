/**
 * Motion tokens — easing curves, durations, and metal-specific multipliers.
 */

export const EASE = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

/** Duration values in seconds (for Framer Motion). */
export const DUR = {
  xs: 0.12,
  sm: 0.2,
  md: 0.32,
  lg: 0.6,
  xl: 0.9,
  "2xl": 1.4,
} as const;

/** Metal-specific motion scale multiplier. */
export const MOTION_SCALE = {
  gold: 1.25,
  silver: 0.85,
} as const;

/** Apply metal scale to a duration. */
export function metalDuration(
  base: number,
  metal: "gold" | "silver" = "gold"
): number {
  return base * MOTION_SCALE[metal];
}

/** Framer Motion transition presets. */
export const TRANSITION = {
  /** Standard reveal for section elements. */
  reveal: {
    duration: DUR.lg,
    ease: EASE.out,
  },
  /** Quick UI feedback (hover, press). */
  quick: {
    duration: DUR.sm,
    ease: EASE.out,
  },
  /** Modal / drawer open. */
  modal: {
    duration: DUR.md,
    ease: EASE.out,
  },
  /** Modal / drawer close. */
  modalExit: {
    duration: DUR.sm,
    ease: EASE.inOut,
  },
  /** Stagger children in a group. */
  stagger: (staggerMs = 80) => ({
    staggerChildren: staggerMs / 1000,
  }),
} as const;

/** Variants for scroll-reveal animations. */
export const REVEAL_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION.reveal,
  },
} as const;
