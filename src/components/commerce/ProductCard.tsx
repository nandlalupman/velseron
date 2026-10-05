"use client";

import { cn } from "@/lib/cn";
import type { Coin } from "@/data/coins";
import { useMetalPrice } from "@/hooks/useMetalPrice";
import { calculatePrice } from "@/lib/pricing";
import { formatPrice } from "@/lib/config";
import { CoinPosterSVG } from "./CoinPosterSVG";
import Link from "next/link";

interface ProductCardProps {
  coin: Coin;
  className?: string;
}

export function ProductCard({ coin, className }: ProductCardProps) {
  const prices = useMetalPrice();
  const spot =
    coin.metal === "gold" ? prices.goldPerGram : prices.silverPerGram;
  const price = calculatePrice(
    coin.weightGrams,
    coin.fineness,
    spot,
    coin.pricing.premiumPct
  );
  const perGram = price / coin.weightGrams;
  const isOutOfStock = coin.stock.status === "out_of_stock";
  const isLowStock = coin.stock.status === "low_stock";
  const isGold = coin.metal === "gold";

  return (
    <Link
      href={`/coins/${coin.slug}`}
      className={cn(
        "group relative block",
        "bg-surface border border-line rounded-[var(--radius-sharp)]",
        "overflow-hidden transition-all duration-[var(--dur-sm)]",
        "hover:border-accent/40 hover:-translate-y-1",
        isOutOfStock && "opacity-60",
        className
      )}
    >
      {/* Card image area — 3:4 ratio with consistent coin size */}
      <div
        className="relative aspect-[3/4] flex items-center justify-center overflow-hidden"
        style={{
          background: isGold
            ? "linear-gradient(180deg, #181410 0%, #1a1610 100%)"
            : "linear-gradient(180deg, #181a1e 0%, #1c1e24 100%)",
        }}
      >
        {/* Radial spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 45%, ${
              isGold ? "rgba(201,162,75,0.1)" : "rgba(196,202,210,0.08)"
            } 0%, transparent 70%)`,
          }}
        />

        {/* Top-left: spec label */}
        <span className="absolute top-3 left-3 font-mono-label text-ivory-mute text-[9px] z-10">
          {coin.metal === "gold" ? "GOLD" : "SILVER"} {coin.purityLabel} ·{" "}
          {coin.weightGrams} G
        </span>

        {/* Top-right: badge */}
        {(isLowStock || coin.limited) && (
          <span
            className={cn(
              "absolute top-3 right-3 z-10",
              "font-mono-label text-[8px] px-2 py-1",
              "border rounded-[var(--radius-sharp)]",
              isLowStock
                ? "text-warn border-warn/30"
                : "text-accent border-accent/30"
            )}
          >
            {isLowStock ? "LOW STOCK" : "LIMITED"}
          </span>
        )}

        {/* Coin SVG — FIXED size for all cards */}
        <CoinPosterSVG
          metal={coin.metal}
          size={180}
          className="relative z-[1] transition-transform duration-[var(--dur-md)] group-hover:scale-105"
        />
      </div>

      {/* Card content */}
      <div className="p-4 border-t border-line">
        <h3 className="text-ivory text-sm font-medium mb-1 truncate">
          {coin.name}
        </h3>
        <p className="text-ivory text-lg font-medium tabular-nums">
          {formatPrice(price)}
        </p>
        <p className="font-mono-label text-ivory-mute mt-1">
          {formatPrice(perGram)}/G INCL. PREMIUM
        </p>

        {isOutOfStock && (
          <span className="inline-block mt-2 font-mono-label text-[9px] text-ivory-mute border border-line px-2 py-0.5 rounded-[var(--radius-sharp)]">
            NOTIFY ME
          </span>
        )}
      </div>
    </Link>
  );
}
