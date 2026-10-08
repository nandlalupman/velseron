"use client";

import { getCoinsByMetal } from "@/data/coins";
import { CATEGORIES } from "@/data/categories";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";
import { useState } from "react";
import { cn } from "@/lib/cn";
import Link from "next/link";

const WEIGHT_OPTIONS = [
  { label: "1 oz (31.1 g)", value: "31.1035" },
  { label: "50 g", value: "50" },
  { label: "100 g", value: "100" },
];

const FINISH_OPTIONS = [
  { label: "Proof", value: "proof" },
  { label: "Brilliant", value: "brilliant" },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Weight: Low → High", value: "weight-asc" },
  { label: "Weight: High → Low", value: "weight-desc" },
];

export default function SilverPage() {
  const [weightFilters, setWeightFilters] = useState<string[]>([]);
  const [finishFilters, setFinishFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [hideOutOfStock, setHideOutOfStock] = useState(false);

  const allCoins = getCoinsByMetal("silver");

  function toggleFilter(arr: string[], val: string): string[] {
    return arr.includes(val)
      ? arr.filter((v) => v !== val)
      : [...arr, val];
  }

  let coins = allCoins.filter((c) => {
    if (weightFilters.length > 0 && !weightFilters.includes(c.weightGrams.toString())) return false;
    if (finishFilters.length > 0 && !finishFilters.includes(c.finish)) return false;
    if (hideOutOfStock && c.stock.status === "out_of_stock") return false;
    return true;
  });

  coins = [...coins].sort((a, b) => {
    switch (sortBy) {
      case "weight-asc": return a.weightGrams - b.weightGrams;
      case "weight-desc": return b.weightGrams - a.weightGrams;
      case "price-asc": return a.weightGrams - b.weightGrams;
      case "price-desc": return b.weightGrams - a.weightGrams;
      default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div data-metal="silver">
      <ToastContainer />
      {/* Hero Header */}
      <section className="py-12 bg-ink-0 border-b border-silver-700/30">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-silver-500 text-xs font-semibold uppercase tracking-widest mb-3">SILVER COLLECTION</p>
            <h1
              className="font-[family-name:var(--font-display)] text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Silver coins
            </h1>
            <p className="text-white/60 max-w-lg text-sm">
              Fine silver coins from 1 troy ounce to 100 grams. Precision struck,
              serial-numbered and assay certified.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="py-4 bg-light-surface border-b border-light-border">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <div className="flex flex-wrap gap-3" role="navigation" aria-label="Silver sub-categories">
            {CATEGORIES
              .filter(c => c.metal === "silver" || c.metal === "both")
              .map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  className="px-4 py-2 text-sm bg-white border border-line rounded-[var(--radius-pill)] hover:border-silver-500/50 hover:text-silver-400 transition-colors"
                >
                  {category.label}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Content: filter rail + grid */}
      <section className="py-section bg-white">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          {/* Filter rail — left sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Weight */}
              <div>
                <h3 className="font-mono-label text-ivory mb-3 text-[10px]">
                  WEIGHT
                </h3>
                <div className="space-y-2">
                  {WEIGHT_OPTIONS.map((opt) => {
                    const count = allCoins.filter(
                      (c) => c.weightGrams.toString() === opt.value
                    ).length;
                    return (
                      <label key={opt.value} className="flex items-center gap-2 text-ivory-mute text-sm cursor-pointer hover:text-ivory transition-colors">
                        <input
                          type="checkbox"
                          checked={weightFilters.includes(opt.value)}
                          onChange={() =>
                            setWeightFilters((prev) =>
                              toggleFilter(prev, opt.value)
                            )
                          }
                          className="accent-[var(--accent)]"
                        />
                        {opt.label}
                        <span className="ml-auto font-mono-label text-[9px] text-ivory-mute/50">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Finish */}
              <div>
                <h3 className="font-mono-label text-ivory mb-3 text-[10px]">
                  FINISH
                </h3>
                <div className="space-y-2">
                  {FINISH_OPTIONS.map((opt) => {
                    const count = allCoins.filter(
                      (c) => c.finish === opt.value
                    ).length;
                    return (
                      <label key={opt.value} className="flex items-center gap-2 text-ivory-mute text-sm cursor-pointer hover:text-ivory transition-colors">
                        <input
                          type="checkbox"
                          checked={finishFilters.includes(opt.value)}
                          onChange={() =>
                            setFinishFilters((prev) =>
                              toggleFilter(prev, opt.value)
                            )
                          }
                          className="accent-[var(--accent)]"
                        />
                        {opt.label}
                        <span className="ml-auto font-mono-label text-[9px] text-ivory-mute/50">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Hide out of stock */}
              <div>
                <label className="flex items-center gap-2 text-ivory-mute text-sm cursor-pointer hover:text-ivory transition-colors">
                  <input
                    type="checkbox"
                    checked={hideOutOfStock}
                    onChange={(e) => setHideOutOfStock(e.target.checked)}
                    className="accent-[var(--accent)]"
                  />
                  Hide out of stock
                </label>
              </div>

              <div className="hairline" />

              {/* Sort */}
              <div>
                <h3 className="font-mono-label text-ivory mb-3 text-[10px]">
                  SORT BY
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white border border-light-border text-dark-text text-sm px-3 py-2 rounded-lg cursor-pointer focus:outline-none focus:border-accent"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Grid — silver uses 3-4 columns, spec-forward */}
          <div>
            <p className="text-muted-text text-sm mb-6">
              {coins.length} {coins.length === 1 ? "COIN" : "COINS"}
            </p>

            {coins.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
        </div>
      </section>    </div>
  );
}
