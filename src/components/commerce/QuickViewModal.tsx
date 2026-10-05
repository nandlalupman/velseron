"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";
import { useMetalPrice } from "@/hooks/useMetalPrice";
import { useCart } from "@/hooks/useCart";
import { calculatePrice, calculatePricePerGram } from "@/lib/pricing";
import { formatPrice } from "@/lib/config";
import type { Coin } from "@/data/coins";
import { cn } from "@/lib/cn";
import Link from "next/link";

const CoinScene = dynamic(
  () => import("../coin/CoinScene").then((mod) => ({ default: mod.CoinScene })),
  { ssr: false }
);

interface QuickViewModalProps {
  coin: Coin | null;
  isOpen: boolean;
  onClose: () => void;
  /** Navigate to prev/next coin */
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

/**
 * Quick view modal — expanded card preview with mini 3D coin,
 * price, quantity stepper, and add-to-cart CTA.
 */
export function QuickViewModal({
  coin,
  isOpen,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: QuickViewModalProps) {
  const prices = useMetalPrice();
  const addItem = useCart((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!coin) return null;

  const spotPerGram =
    coin.metal === "gold" ? prices.goldPerGram : prices.silverPerGram;
  const unitPrice = calculatePrice(
    coin.weightGrams,
    coin.fineness,
    spotPerGram,
    coin.pricing.premiumPct
  );
  const totalPrice = unitPrice * qty;
  const perGram = calculatePricePerGram(unitPrice, coin.weightGrams);
  const isGold = coin.metal === "gold";
  const inStock = coin.stock.status !== "out_of_stock";

  const handleAddToCart = () => {
    addItem(coin, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      label={`Quick view — ${coin.name}`}
    >
      <div
        className="flex flex-col md:flex-row gap-6 p-6"
        data-metal={coin.metal}
      >
        {/* Left: Coin visual */}
        <div className="relative md:w-1/2 aspect-square bg-ink-1 rounded-[var(--radius-sharp)] overflow-hidden flex items-center justify-center">
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 45%, ${
                isGold ? "rgba(201,162,75,0.08)" : "rgba(196,202,210,0.06)"
              } 0%, transparent 65%)`,
            }}
          />

          {/* SVG poster base */}
          <div className="absolute inset-0 flex items-center justify-center z-[1]">
            <CoinPosterSVG metal={coin.metal} size={220} className="w-[60%] h-auto" />
          </div>

          {/* 3D overlay */}
          <CoinScene
            metal={coin.metal}
            size="card"
            interactive
            autoRotate
          />

          {/* Badges */}
          {coin.badges.length > 0 && (
            <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
              {coin.badges.map((badge) => (
                <span
                  key={badge}
                  className="font-mono-label text-[8px] px-2 py-0.5 bg-accent/15 text-accent border border-accent/25 rounded-[var(--radius-sharp)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 flex flex-col">
          {/* Metal tag */}
          <span className={cn(
            "font-mono-label text-[9px] self-start px-2 py-0.5 mb-3 border rounded-[var(--radius-sharp)]",
            isGold
              ? "text-gold-500 border-gold-500/30"
              : "text-silver-500 border-silver-500/30"
          )}>
            {isGold ? "GOLD 24K" : "SILVER 999"}
          </span>

          <h3 className="font-[family-name:var(--font-display)] text-ivory text-2xl mb-1">
            {coin.name}
          </h3>
          <p className="font-mono-label text-ivory-mute text-[10px] mb-2">
            {coin.series} SERIES
          </p>
          <p className="text-ivory-mute text-sm mb-6">
            {coin.tagline}
          </p>

          {/* Price */}
          <div className="mb-6">
            <p className="text-ivory text-2xl font-medium tabular-nums">
              {formatPrice(totalPrice)}
            </p>
            <p className="font-mono-label text-ivory-mute text-[9px] mt-1">
              {formatPrice(perGram)}/G INCL. PREMIUM
            </p>
          </div>

          {/* Quantity */}
          {inStock && (
            <div className="mb-6">
              <label className="font-mono-label text-ivory-mute text-[9px] block mb-2">
                QUANTITY
              </label>
              <div className="flex items-center gap-0">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 border border-line text-ivory flex items-center justify-center hover:bg-surface-elevated transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-12 h-10 border-t border-b border-line text-ivory flex items-center justify-center tabular-nums text-sm">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 border border-line text-ivory flex items-center justify-center hover:bg-surface-elevated transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-2 mt-auto">
            {inStock ? (
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="w-full"
              >
                {added ? "✓ Added" : `Add to cart — ${formatPrice(totalPrice)}`}
              </Button>
            ) : (
              <Button variant="secondary" size="lg" className="w-full" disabled>
                Out of stock
              </Button>
            )}
            <Link href={`/coins/${coin.slug}`} onClick={onClose}>
              <Button variant="ghost" size="md" className="w-full">
                Full details →
              </Button>
            </Link>
          </div>

          {/* Prev/Next navigation */}
          {(hasPrev || hasNext) && (
            <div className="flex justify-between mt-4 pt-4 border-t border-line">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className={cn(
                  "font-mono-label text-[9px] text-ivory-mute hover:text-ivory transition-colors",
                  !hasPrev && "opacity-30 cursor-not-allowed"
                )}
              >
                ← PREV
              </button>
              <button
                onClick={onNext}
                disabled={!hasNext}
                className={cn(
                  "font-mono-label text-[9px] text-ivory-mute hover:text-ivory transition-colors",
                  !hasNext && "opacity-30 cursor-not-allowed"
                )}
              >
                NEXT →
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
