"use client";

import { cn } from "@/lib/cn";
import { COINS, getCoinsByMetal } from "@/data/coins";
import { useMetalPrice } from "@/hooks/useMetalPrice";
import { formatPrice } from "@/lib/config";
import { calculatePrice } from "@/lib/pricing";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import Image from "next/image";

const PREMIUM_COLLECTIONS = [
  {
    id: "divine",
    name: "Divine Series",
    description: "Sacred deities struck in 24K gold and 999 silver. Lakshmi, Ganesha, Om, Hanuman, Radha-Krishna. Every coin is BIS hallmarked and comes in a premium velvet gift box.",
    image: "/coins/category-premium.jpg",
    metal: "both" as const,
    coins: ["divine-lakshmi", "divine-ganesha", "divine-om", "divine-hanuman", "divine-radhakrishna"],
    href: "/collections/divine",
    badge: "GOLD & SILVER",
    badgeColor: "bg-gold-600",
  },
  {
    id: "packaging",
    name: "Premium Packaging",
    description: "Your coin comes in an elegant box with authenticity certificate. A perfect blend of tradition and trust. Tamper-proof, insured, gift-ready.",
    image: "/coins/category-gift.jpg",
    metal: "both" as const,
    coins: [],
    href: "/gifting",
    badge: "GIFT READY",
    badgeColor: "bg-cta-green",
  },
];

export function PremiumCollections({ className }: { className?: string }) {
  const prices = useMetalPrice();

  return (
    <section className={cn("py-section bg-white border-t border-light-border", className)} aria-labelledby="premium-heading">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <Reveal>
          <header className="text-center mb-12">
            <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">PREMIUM COLLECTIONS</p>
            <h2 id="premium-heading" className="font-[family-name:var(--font-display)] text-dark-text mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              Curated for connoisseurs
            </h2>
            <p className="text-muted-text max-w-xl mx-auto text-sm">
              Limited-run artistic designs. Each collection tells a story through
              craftsmanship, symbolism, and minting mastery.
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PREMIUM_COLLECTIONS.map((collection, index) => (
              <PremiumCollectionCard
                key={collection.id}
                collection={collection}
                prices={prices}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="text-center mt-10">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-8 py-3 border border-dark-text text-dark-text font-semibold rounded-lg hover:bg-dark-text hover:text-white transition-all text-sm"
            >
              View All Collections →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PremiumCollectionCard({
  collection,
  prices,
}: {
  collection: typeof PREMIUM_COLLECTIONS[0];
  prices: ReturnType<typeof useMetalPrice>;
}) {
  const firstCoin = COINS.find(c => c.id === collection.coins[0]);
  const spot = firstCoin?.metal === "gold" ? prices.goldPerGram : prices.silverPerGram;
  const price = firstCoin ? calculatePrice(
    firstCoin.weightGrams,
    firstCoin.fineness,
    spot,
    firstCoin.pricing.premiumPct
  ) : 0;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-light-border bg-white hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <span className={cn("absolute top-4 left-4 px-3 py-1 text-white text-xs font-semibold rounded-full", collection.badgeColor)}>
          {collection.badge}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-[family-name:var(--font-display)] text-dark-text text-xl mb-2 group-hover:text-gold-700 transition-colors">
          {collection.name}
        </h3>
        <p className="text-muted-text text-sm leading-relaxed mb-4">
          {collection.description}
        </p>

        {firstCoin && (
          <p className="text-muted-text text-xs mb-4">
            Starting from <span className="font-bold text-dark-text">{formatPrice(price)}</span> · {firstCoin.weightGrams}g · {firstCoin.purityLabel}
          </p>
        )}

        <Link
          href={collection.href}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold-600 text-white font-semibold rounded-lg hover:bg-gold-700 transition-colors text-sm"
        >
          Explore Collection →
        </Link>
      </div>
    </article>
  );
}