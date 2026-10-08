"use client";

import { ToastContainer } from "@/components/ui/Toast";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/commerce/ProductCard";
import { COINS } from "@/data/coins";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useParams } from "next/navigation";
import Image from "next/image";

const PREMIUM_COLLECTIONS = [
  {
    id: "divine",
    name: "Divine Series",
    description: "Sacred deities struck in 24K gold and 999 silver. Lakshmi, Ganesha, Om, Hanuman, Radha-Krishna. Every coin is BIS hallmarked and comes in a premium velvet gift box.",
    image: "/coins/category-premium.jpg",
    slug: "divine"
  },
];

export default function CollectionsPage() {
  const params = useParams();
  const slug = params.slug?.[0];

  const collection = PREMIUM_COLLECTIONS.find(c => c.slug === slug);
  
  // If viewing a specific collection
  if (slug) {
    // For now we only have the Divine series
    const collectionCoins = COINS.filter(c => c.series.toLowerCase() === slug.toLowerCase());
    
    if (collectionCoins.length === 0) {
      return (
        <div data-metal="both" className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-display)] text-dark-text mb-4" style={{ fontSize: "2rem" }}>
              Collection not found
            </h1>
            <Link href="/collections">
              <Button variant="secondary">View all collections</Button>
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
              <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">PREMIUM COLLECTION</p>
              <h1 className="font-[family-name:var(--font-display)] text-dark-text mb-4 capitalize" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
                {collection?.name || `${slug} Series`}
              </h1>
              <p className="text-muted-text max-w-xl mx-auto text-sm">
                {collection?.description || "Explore this exclusive collection of premium coins."}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-section bg-white">
          <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collectionCoins.map((coin, i) => (
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

  // Viewing all collections
  return (
    <div data-metal="both">
      <ToastContainer />
      <section className="py-12 bg-light-surface border-b border-light-border">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] text-center">
          <Reveal>
            <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">CURATED FOR CONNOISSEURS</p>
            <h1 className="font-[family-name:var(--font-display)] text-dark-text mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
              Premium Collections
            </h1>
            <p className="text-muted-text max-w-xl mx-auto text-sm">
              Limited-run artistic designs. Each collection tells a story through craftsmanship, symbolism, and minting mastery.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-section bg-white">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PREMIUM_COLLECTIONS.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.1}>
                <Link href={`/collections/${c.slug}`} className="group block overflow-hidden rounded-2xl border border-light-border hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden bg-light-surface">
                    <Image src={c.image} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-[family-name:var(--font-display)] text-dark-text text-xl mb-2 group-hover:text-gold-700 transition-colors">{c.name}</h3>
                    <p className="text-muted-text text-sm mb-4">{c.description}</p>
                    <span className="text-gold-600 font-semibold text-sm">Explore Collection →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
