import { clsx, type ClassValue } from "clsx";

/**
 * Merge class names. Lightweight wrapper around clsx.
 * If tailwind-merge is needed later, swap here.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
