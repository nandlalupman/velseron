"use client";

import { ToastContainer } from "@/components/ui/Toast";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/commerce/ProductCard";
import { OccasionGrid } from "@/components/home/OccasionGrid";
import { Personalization } from "@/components/home/Personalization";
import { COINS } from "@/data/coins";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function GiftingPage() {
  // Let's use some lower weight coins as recommended gifts
  const giftCoins = COINS.filter(c => c.weightGrams <= 10 && c.featured).slice(0, 6);

  return (
    <div data-metal="both">
      <ToastContainer />
      
      {/* Hero Header */}
      <section className="py-12 bg-light-surface border-b border-light-border">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] text-center">
          <Reveal>
            <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">PREMIUM GIFTING</p>
            <h1
              className="font-[family-name:var(--font-display)] text-dark-text mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Gifts that Last Forever
            </h1>
            <p className="text-muted-text max-w-xl mx-auto text-sm">
              Whether it's a wedding, an anniversary, or a corporate milestone, give the gift of pure gold and silver. Beautifully packaged and guaranteed authentic.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Occasions Grid */}
      <div className="pt-8 bg-white">
        <OccasionGrid className="border-t-0" />
      </div>

      {/* Recommended Gifts */}
      <section className="py-section bg-light-surface border-y border-light-border">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-dark-text mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Curated Gift Coins
              </h2>
              <p className="text-muted-text max-w-xl mx-auto text-sm">
                Our most popular coins for gifting, featuring exquisite designs and premium presentation.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftCoins.map((coin, i) => (
              <Reveal key={coin.id} stagger={i}>
                <ProductCard coin={coin} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Personalization Section */}
      <Personalization className="border-t-0" />
    </div>
  );
}
