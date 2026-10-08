"use client";

import { getCoinsByMetal } from "@/data/coins";
import { CATEGORIES } from "@/data/categories";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";
import { useState } from "react";
import { cn } from "@/lib/cn";
import Link from "next/link";

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
      {/* Hero Header */}
      <section className="py-12 bg-ink-0 border-b border-gold-700/20">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-gold-500 text-[10px] mb-3">GOLD COLLECTION</p>
            <h1
              className="font-[family-name:var(--font-display)] text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Gold Coins
            </h1>
            <p className="text-white/60 max-w-lg text-sm">
              24-karat gold coins in weights from 5 grams to 1 troy ounce. Each coin is
              individually assayed, serial-numbered and delivered insured.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="py-4 bg-light-surface border-b border-light-border">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <div className="flex flex-wrap gap-3" role="navigation" aria-label="Gold sub-categories">
            {CATEGORIES
              .filter(c => c.metal === "gold" || c.metal === "both")
              .map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  className="px-5 py-2 text-sm bg-white border border-light-border text-dark-text rounded-full hover:border-gold-500 hover:text-gold-600 transition-colors font-medium"
                >
                  {category.label}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Filter bar — horizontal chips */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-light-border">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] py-3 flex items-center gap-4 overflow-x-auto">
          {/* Weight chips */}
          <div className="flex items-center gap-2 shrink-0">
            {WEIGHT_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setWeightFilter(f.value)}
                className={cn(
                  "px-4 py-1.5 text-xs rounded-full border transition-colors cursor-pointer font-medium",
                  weightFilter === f.value
                    ? "bg-gold-600 border-gold-600 text-white"
                    : "border-light-border text-muted-text hover:text-dark-text hover:border-gold-500"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-line shrink-0" />

          {/* Hide out of stock */}
          <label className="flex items-center gap-2 text-muted-text text-xs cursor-pointer shrink-0">
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
            className="bg-white border border-light-border text-dark-text text-xs px-3 py-1.5 rounded-lg cursor-pointer focus:outline-none focus:border-gold-500"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="py-section bg-white">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <p className="text-muted-text text-sm mb-6">
            {coins.length} {coins.length === 1 ? "COIN" : "COINS"}
          </p>

          {coins.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coins.map((coin, i) => (
                <Reveal key={coin.id} stagger={i}>
                  <ProductCard coin={coin} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-muted-text">No coins match your filters.</p>
            </div>
          )}
        </div>
      </section>    </div>
  );
}
