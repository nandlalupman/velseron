"use client";

import { getCoinsByMetal } from "@/data/coins";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";
import { useState } from "react";
import { cn } from "@/lib/cn";

const WEIGHT_FILTERS = [
  { label: "All", value: "all" },
  { label: "5 g", value: "5" },
  { label: "10 g", value: "10" },
  { label: "20 g", value: "20" },
  { label: "1 oz", value: "31.1035" },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Weight: Low → High", value: "weight-asc" },
  { label: "Weight: High → Low", value: "weight-desc" },
];

export default function GoldPage() {
  const [weightFilter, setWeightFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [hideOutOfStock, setHideOutOfStock] = useState(false);

  const allCoins = getCoinsByMetal("gold");

  let coins = allCoins.filter((c) => {
    if (weightFilter !== "all" && c.weightGrams.toString() !== weightFilter) return false;
    if (hideOutOfStock && c.stock.status === "out_of_stock") return false;
    return true;
  });

  coins = [...coins].sort((a, b) => {
    switch (sortBy) {
      case "weight-asc": return a.weightGrams - b.weightGrams;
      case "weight-desc": return b.weightGrams - a.weightGrams;
      case "price-asc": return a.weightGrams - b.weightGrams; // approximate
      case "price-desc": return b.weightGrams - a.weightGrams;
      default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div data-metal="gold">
      <ToastContainer />
      <SiteHeader />

      {/* Header */}
      <section className="pt-32 pb-12 bg-bg border-b border-line">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-accent mb-3 text-[10px]">
              GOLD COLLECTION
            </p>
            <h1
              className="font-[family-name:var(--font-display)] text-ivory mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Gold coins
            </h1>
            <p className="text-ivory-mute max-w-lg">
              24-karat gold coins in weights from 5 grams to 1 troy ounce. Each coin is
              individually assayed, serial-numbered and delivered insured.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter bar — horizontal chips */}
      <section className="sticky top-16 z-30 bg-bg/95 backdrop-blur-sm border-b border-line">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] py-3 flex items-center gap-4 overflow-x-auto">
          {/* Weight chips */}
          <div className="flex items-center gap-2 shrink-0">
            {WEIGHT_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setWeightFilter(f.value)}
                className={cn(
                  "px-3 py-1.5 text-xs font-mono-label rounded-[var(--radius-pill)] border transition-colors cursor-pointer",
                  weightFilter === f.value
                    ? "bg-accent/15 border-accent text-accent"
                    : "border-line text-ivory-mute hover:text-ivory hover:border-ivory-mute/30"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-line shrink-0" />

          {/* Hide out of stock */}
          <label className="flex items-center gap-2 text-ivory-mute text-xs cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={hideOutOfStock}
              onChange={(e) => setHideOutOfStock(e.target.checked)}
              className="accent-[var(--accent)]"
            />
            Hide out of stock
          </label>

          <div className="flex-1" />

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface border border-line text-ivory text-xs px-3 py-1.5 rounded-[var(--radius-sharp)] cursor-pointer focus:outline-none focus:border-accent"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Grid — gold uses 2-column editorial layout */}
      <section className="py-section bg-bg">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <p className="font-mono-label text-ivory-mute text-[10px] mb-6">
            {coins.length} {coins.length === 1 ? "COIN" : "COINS"}
          </p>

          {coins.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coins.map((coin, i) => (
                <Reveal key={coin.id} stagger={i}>
                  <ProductCard coin={coin} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-ivory-mute">No coins match your filters.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
