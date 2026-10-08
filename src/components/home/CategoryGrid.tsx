"use client";

import { cn } from "@/lib/cn";
import { CATEGORIES } from "@/data/categories";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function CategoryGrid({ className }: { className?: string }) {
  return (
    <section className={cn("py-section bg-white", className)} aria-labelledby="categories-heading">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <Reveal>
          <header className="flex items-end justify-between mb-8">
            <div>
              <h2 id="categories-heading" className="font-[family-name:var(--font-display)] text-dark-text mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Shop by Category
              </h2>
              <p className="text-muted-text text-sm">
                Explore our exclusive range of gold and silver coins for every occasion.
              </p>
            </div>
            <Link href="/collections" className="text-gold-600 hover:text-gold-700 text-sm font-medium whitespace-nowrap hidden sm:block">
              View All Categories →
            </Link>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }: { category: typeof CATEGORIES[0]; index: number }) {
  return (
    <Link
      href={category.href}
      className={cn(
        "group relative block overflow-hidden rounded-xl",
        "bg-light-surface border border-light-border",
        "hover:shadow-lg hover:border-gold-500/50",
        "transition-all duration-300"
      )}
      aria-label={category.label}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={category.image}
          alt={category.label}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-dark-text text-base group-hover:text-gold-600 transition-colors">
            {category.label}
          </h3>
          <p className="text-muted-text text-xs mt-0.5">
            {category.description}
          </p>
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-light-surface border border-light-border group-hover:bg-gold-600 group-hover:text-white group-hover:border-gold-600 transition-all duration-300 text-muted-text flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}