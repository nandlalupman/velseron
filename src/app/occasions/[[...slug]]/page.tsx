"use client";

import { ToastContainer } from "@/components/ui/Toast";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/commerce/ProductCard";
import { OccasionGrid } from "@/components/home/OccasionGrid";
import { OCCASIONS } from "@/data/occasions";
import { COINS } from "@/data/coins";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useParams } from "next/navigation";

export default function OccasionsPage() {
  const params = useParams();
  const slug = params.slug?.[0];

  const occasion = OCCASIONS.find(o => o.id === slug);
  
  // If viewing a specific occasion
  if (slug) {
    // Just mock recommended coins for the occasion using a slice of featured coins
    // In a real app, this would be based on tags or categories
    const recommendedCoins = COINS.filter(c => c.featured).slice(0, 6);
    
    if (!occasion) {
      return (
        <div data-metal="both" className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-display)] text-dark-text mb-4" style={{ fontSize: "2rem" }}>
              Occasion not found
            </h1>
            <Link href="/occasions">
              <Button variant="secondary">View all occasions</Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div data-metal="both">
        <ToastContainer />
        <section className="py-12 bg-light-surface border-b border-light-border">
          <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] text-center">
            <Reveal>
              <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">SHOP FOR</p>
              <h1 className="font-[family-name:var(--font-display)] text-dark-text mb-4 capitalize" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
                {occasion.label}
              </h1>
              <p className="text-muted-text max-w-xl mx-auto text-sm">
                {occasion.description}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-section bg-white">
          <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
            <Reveal>
              <div className="mb-8">
                <h2 className="font-[family-name:var(--font-display)] text-dark-text mb-2 text-2xl">
                  Recommended Gifts
                </h2>
                <p className="text-muted-text text-sm">
                  Hand-picked selections perfect for a {occasion.label.toLowerCase()}.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCoins.map((coin, i) => (
                <Reveal key={coin.id} stagger={i}>
                  <ProductCard coin={coin} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Viewing all occasions
  return (
    <div data-metal="both">
      <ToastContainer />
      <section className="py-12 bg-light-surface border-b border-light-border">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] text-center">
          <Reveal>
            <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">SHOP BY OCCASION</p>
            <h1 className="font-[family-name:var(--font-display)] text-dark-text mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
              Gifts for Every Milestone
            </h1>
            <p className="text-muted-text max-w-xl mx-auto text-sm">
              Explore our collections curated specifically for life's most important celebrations.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="py-12 bg-white">
        <OccasionGrid className="border-t-0" />
      </div>
    </div>
  );
}
