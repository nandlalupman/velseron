"use client";

import { cn } from "@/lib/cn";
import { OCCASIONS } from "@/data/occasions";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function OccasionGrid({ className }: { className?: string }) {
  return (
    <section className={cn("py-section bg-light-surface border-t border-light-border", className)} aria-labelledby="occasions-heading">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <Reveal>
          <header className="flex items-end justify-between mb-8">
            <div>
              <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">SHOP BY OCCASION</p>
              <h2 id="occasions-heading" className="font-[family-name:var(--font-display)] text-dark-text mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Gifting made meaningful
              </h2>
              <p className="text-muted-text text-sm max-w-md">
                Every milestone deserves a gift that lasts forever.
              </p>
            </div>
            <Link href="/occasions" className="text-gold-600 hover:text-gold-700 text-sm font-medium whitespace-nowrap hidden sm:block">
              View All Occasions →
            </Link>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {OCCASIONS.map((occasion, index) => (
              <OccasionCard key={occasion.id} occasion={occasion} index={index} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function OccasionCard({ occasion, index }: { occasion: typeof OCCASIONS[0]; index: number }) {
  return (
    <Link
      href={occasion.href}
      className={cn(
        "group relative block overflow-hidden rounded-xl",
        "border border-light-border bg-white",
        "hover:shadow-md hover:border-gold-500/50",
        "transition-all duration-300"
      )}
      aria-label={occasion.label}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-light-surface">
        <Image
          src={occasion.image}
          alt={occasion.label}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />
        {/* Gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-semibold text-white text-sm mb-0.5">
            {occasion.label}
          </h3>
          <p className="text-white/70 text-xs leading-snug hidden sm:block">
            {occasion.description}
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-3 py-2.5 flex items-center justify-between border-t border-light-border">
        <span className="text-gold-600 text-xs font-semibold">
          Shop {occasion.label}
        </span>
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gold-600/10 text-gold-600 group-hover:bg-gold-600 group-hover:text-white transition-all duration-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}