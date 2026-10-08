"use client";

import { cn } from "@/lib/cn";
import { COINS, getFeaturedCoins } from "@/data/coins";
import { useMetalPrice } from "@/hooks/useMetalPrice";
import { formatPrice } from "@/lib/config";
import { calculatePrice } from "@/lib/pricing";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import Image from "next/image";

interface ProductCardHorizontalProps {
  coin: typeof COINS[0];
  price: number;
  index: number;
}

export function BestSellers({ className }: { className?: string }) {
  const prices = useMetalPrice();
  const featured = getFeaturedCoins();
  const topSellers = featured.slice(0, 7);

  const sellersWithPrices = topSellers.map(coin => {
    const spot = coin.metal === "gold" ? prices.goldPerGram : prices.silverPerGram;
    const price = calculatePrice(
      coin.weightGrams,
      coin.fineness,
      spot,
      coin.pricing.premiumPct
    );
    return { coin, price };
  });

  return (
    <section className={cn("py-section bg-light-surface border-t border-light-border", className)} aria-labelledby="bestsellers-heading">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <Reveal>
          <header className="flex items-end justify-between mb-8">
            <div>
              <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">BEST SELLERS</p>
              <h2 id="bestsellers-heading" className="font-[family-name:var(--font-display)] text-dark-text mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Our most loved coins
              </h2>
              <p className="text-muted-text text-sm">
                Chosen by customers across India.
              </p>
            </div>
            <Link href="/gold" className="text-gold-600 hover:text-gold-700 text-sm font-medium whitespace-nowrap hidden sm:block">
              View All Products →
            </Link>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="flex gap-4 overflow-x-auto pb-4 -mx-[var(--grid-gutter)] px-[var(--grid-gutter)] scrollbar-hide"
            role="list"
            aria-label="Best selling coins"
          >
            {sellersWithPrices.map(({ coin, price }, index) => (
              <div
                key={coin.id}
                className="flex-shrink-0 w-[200px] sm:w-[220px]"
                role="listitem"
              >
                <ProductCardHorizontal coin={coin} price={price} index={index} />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/gold"
              className="px-6 py-2.5 bg-white border border-light-border text-dark-text text-sm font-medium rounded-lg hover:border-gold-500 hover:text-gold-600 transition-colors"
            >
              View all gold coins →
            </Link>
            <Link
              href="/silver"
              className="px-6 py-2.5 bg-white border border-light-border text-dark-text text-sm font-medium rounded-lg hover:border-gold-500 hover:text-gold-600 transition-colors"
            >
              View all silver coins →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProductCardHorizontal({ coin, price, index }: ProductCardHorizontalProps) {
  const isGold = coin.metal === "gold";

  return (
    <article
      className="group bg-white border border-light-border rounded-xl overflow-hidden hover:shadow-md hover:border-gold-500/50 transition-all duration-300"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link href={`/coins/${coin.slug}`} className="block">
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden bg-light-surface">
          <CoinPosterSVG
            metal={coin.metal}
            size={220}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top badges */}
          <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-1">
            <span className={cn(
              "px-2 py-0.5 text-[9px] font-semibold rounded-full",
              isGold
                ? "bg-gold-600 text-white"
                : "bg-gray-700 text-white"
            )}>
              {coin.metal.toUpperCase()} {coin.purityLabel}
            </span>
            {coin.series === "Divine" && (
              <span className="px-2 py-0.5 bg-amber-500 text-white text-[9px] font-semibold rounded-full">
                DIVINE
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-white/90 rounded-full text-muted-text hover:text-red-500 transition-colors shadow-sm"
            onClick={(e) => e.preventDefault()}
            aria-label="Add to wishlist"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          <p className="text-muted-text text-[10px] font-medium uppercase tracking-wide mb-0.5">
            {coin.series} Series
          </p>
          <h3 className="text-dark-text font-semibold text-sm mb-1 leading-tight group-hover:text-gold-700 transition-colors line-clamp-2">
            {coin.name}
          </h3>
          <p className="text-muted-text text-[10px] mb-2">
            {coin.weightGrams} G · {coin.finish}
          </p>

          {/* Weight options */}
          <div className="flex flex-wrap gap-1 mb-3">
            {[1, 2, 5, 10].map(w => (
              <span key={w} className="px-1.5 py-0.5 bg-light-surface border border-light-border text-muted-text text-[9px] rounded">
                {w}g
              </span>
            ))}
          </div>

          {/* Price + Add to cart */}
          <div className="flex items-center justify-between pt-2 border-t border-light-border">
            <div>
              <p className="text-[9px] text-muted-text">Starting at</p>
              <span className="text-dark-text font-bold text-sm tabular-nums">
                {formatPrice(price)}
              </span>
            </div>
            <div className="px-3 py-1.5 bg-gold-600 text-white text-xs font-semibold rounded-lg hover:bg-gold-700 transition-colors">
              Add to Cart
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}