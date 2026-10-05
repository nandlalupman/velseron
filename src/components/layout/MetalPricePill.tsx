"use client";

import { useMetalPrice } from "@/hooks/useMetalPrice";
import { CURRENCY } from "@/lib/config";

export function MetalPricePill() {
  const prices = useMetalPrice();

  const formatCompact = (val: number) =>
    new Intl.NumberFormat(CURRENCY.locale, {
      style: "currency",
      currency: CURRENCY.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div
      className="inline-flex items-center gap-3 px-3 py-1.5 rounded-[var(--radius-pill)] border border-line bg-surface/60"
      aria-label="Metal prices per gram, indicative"
    >
      <span className="font-mono-label text-gold-500 text-[10px]">
        Au {formatCompact(prices.goldPerGram)}/g
      </span>
      <span className="w-px h-3 bg-line" aria-hidden />
      <span className="font-mono-label text-silver-500 text-[10px]">
        Ag {formatCompact(prices.silverPerGram)}/g
      </span>
    </div>
  );
}
