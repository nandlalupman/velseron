"use client";

import { useState, useEffect, useCallback } from "react";

export interface MetalPrices {
  goldPerGram: number;
  silverPerGram: number;
  lastUpdated: Date;
  isPlaceholder: true;
}

// Starting reference prices (INR per gram, indicative)
const BASE_GOLD = 7450;
const BASE_SILVER = 92;
const DRIFT_RANGE = 0.003; // ±0.3% drift per tick

/**
 * Simulated metal price feed.
 * Starts from fixed values (avoids hydration mismatch).
 * Begins drifting only after mount.
 *
 * PLACEHOLDER: "Indicative, placeholder feed"
 */
export function useMetalPrice(): MetalPrices {
  const [prices, setPrices] = useState<MetalPrices>({
    goldPerGram: BASE_GOLD,
    silverPerGram: BASE_SILVER,
    lastUpdated: new Date(),
    isPlaceholder: true,
  });

  const drift = useCallback((base: number) => {
    const change = base * DRIFT_RANGE * (Math.random() * 2 - 1);
    return Math.round((base + change) * 100) / 100;
  }, []);

  useEffect(() => {
    // Start drifting after mount
    const interval = setInterval(() => {
      setPrices((prev) => ({
        goldPerGram: drift(prev.goldPerGram),
        silverPerGram: drift(prev.silverPerGram),
        lastUpdated: new Date(),
        isPlaceholder: true,
      }));
    }, 15000); // 15-second refresh

    return () => clearInterval(interval);
  }, [drift]);

  return prices;
}
