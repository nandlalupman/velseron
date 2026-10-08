"use client";

import { useMetalPrice } from "@/hooks/useMetalPrice";
import { formatPrice } from "@/lib/config";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";
import { TrustStrip } from "@/components/home/TrustStrip";
import { MetalSplit } from "@/components/home/MetalSplit";
import { BestSellers } from "@/components/home/BestSellers";
import { TrustFeatures } from "@/components/home/TrustFeatures";
import { OccasionGrid } from "@/components/home/OccasionGrid";
import { Personalization } from "@/components/home/Personalization";
import { PremiumCollections } from "@/components/home/PremiumCollections";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { PriceCalculator } from "@/components/commerce/PriceCalculator";
import { ImmersiveScrollSection } from "@/components/effects/ImmersiveScrollSection";
import { HeroCarouselScene } from "@/components/coin/HeroCarouselScene";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const prices = useMetalPrice();

  return (
    <div>
      <ToastContainer />

      {/* ═══════════════════════════════════════════════
          1. HERO — Full-width with background image
         ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-black" style={{ minHeight: "600px" }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/coins/hero-bg.jpg"
            alt="Gold and silver coins collection"
            fill
            className="object-cover object-center opacity-40"
            priority
            sizes="100vw"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] min-h-[600px] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center py-12">
            
            {/* Left text content */}
            <div className="max-w-xl">
              <Reveal>
                <p className="text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
                  INVEST | GIFT | CELEBRATE
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-white mb-6 font-bold drop-shadow-lg max-w-[14ch]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05 }}>
                  <span className="block text-gold-400">Divine</span>
                  <span className="block text-white">Designs</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-white/80 text-lg mb-10 leading-relaxed max-w-md font-medium">
                  Eternal spiritual motifs meticulously crafted into 24K gold and 999
                  fine silver. Each piece tells a story of devotion.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <Link href="/gold">
                    <button className="group flex items-center gap-3 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-dark-text font-semibold rounded-full transition-all shadow-lg hover:shadow-gold-500/20 text-sm">
                      Shop Coins
                    </button>
                  </Link>
                  <Link href="/gifting">
                    <button className="px-8 py-4 bg-transparent border border-gold-400 text-gold-400 font-semibold rounded-full hover:bg-gold-400/10 transition-all text-sm">
                      Gifting
                    </button>
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex items-center gap-4 text-sm text-slate-300">
                  BIS-hallmarked · Assay certified · Insured delivery
                </div>
              </Reveal>
            </div>

            {/* Right 3D Carousel Box */}
            <div className="hidden lg:flex justify-end">
              <Reveal delay={0.5} className="w-full">
                <HeroCarouselScene />
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          1.5. LIVE METAL RATES BAR
         ═══════════════════════════════════════════════ */}
      <LiveRatesBar prices={prices} />

      <TrustStrip />

      <div className="relative">
        <ImmersiveScrollSection paperEffect paperIndex={0}>
          <MetalSplit />
        </ImmersiveScrollSection>

        <ImmersiveScrollSection paperEffect paperIndex={1}>
          <BestSellers />
        </ImmersiveScrollSection>

        <ImmersiveScrollSection paperEffect paperIndex={2}>
          <TrustFeatures />
        </ImmersiveScrollSection>

        <ImmersiveScrollSection paperEffect paperIndex={3}>
          <OccasionGrid />
        </ImmersiveScrollSection>

        <ImmersiveScrollSection paperEffect paperIndex={4}>
          <PriceCalculator />
        </ImmersiveScrollSection>

        <ImmersiveScrollSection paperEffect paperIndex={5}>
          <Personalization />
        </ImmersiveScrollSection>

        <ImmersiveScrollSection paperEffect paperIndex={6}>
          <PremiumCollections />
        </ImmersiveScrollSection>

        <ImmersiveScrollSection paperEffect paperIndex={7}>
          <ReviewsCarousel />
        </ImmersiveScrollSection>
      </div>

      {/* ═══════════════════════════════════════════════
          9. FAQ SECTION
         ═══════════════════════════════════════════════ */}
      <FAQSection />

      {/* ═══════════════════════════════════════════════
          10. NEWSLETTER SIGNUP
         ═══════════════════════════════════════════════ */}
      <NewsletterSignup />
    </div>
  );
}

/* ── Sub-components ───────────────────────────────── */

function LiveRatesBar({ prices }: { prices: ReturnType<typeof useMetalPrice> }) {
  return (
    <div className="bg-cream border-y border-light-border">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <div className="flex flex-wrap items-center justify-between py-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gold-600 font-semibold text-xs">Live Metal Rates</span>
            <span className="text-muted-text text-xs">(Indicative)</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              <span className="font-medium text-dark-text text-sm">Gold Rate</span>
              <span className="font-bold text-dark-text tabular-nums">{formatPrice(prices.goldPerGram * 10)}</span>
              <span className="text-muted-text text-xs">/ 10g</span>
              <span className="text-green-600 text-xs font-medium">▲ +0.32%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-silver-500" />
              <span className="font-medium text-dark-text text-sm">Silver Rate</span>
              <span className="font-bold text-dark-text tabular-nums">{formatPrice(prices.silverPerGram * 1000)}</span>
              <span className="text-muted-text text-xs">/ 1kg</span>
              <span className="text-green-600 text-xs font-medium">▲ +0.18%</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-muted-text text-xs">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            Prices update every 10 minutes
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Are the coins BIS hallmarked?", a: "Yes, every gold coin is BIS 916/999 hallmarked, and silver coins are 999/999.9 purity certified with proper assay certificates." },
    { q: "How is the delivery handled?", a: "All orders are shipped in tamper-proof, insured packaging via our secure logistics partners. Delivery takes 3-5 business days across India." },
    { q: "Do you provide a certificate of authenticity?", a: "Yes, every coin comes with a certificate of authenticity mentioning purity, weight, and a unique serial number." },
    { q: "Can I get a personalised coin?", a: "Yes! Our Divine series coins can be laser-engraved with names, dates, or messages. Personalized coins take 3-5 additional business days." },
  ];

  return (
    <section className="py-section bg-white border-t border-light-border" aria-labelledby="faq-heading">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Reveal>
              <h2 id="faq-heading" className="font-[family-name:var(--font-display)] text-dark-text mb-2" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Frequently Asked Questions
              </h2>
              <p className="text-muted-text mb-8">
                <Link href="/faqs" className="text-gold-600 hover:underline text-sm font-medium">View All FAQs →</Link>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-light-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left text-dark-text font-medium text-sm hover:bg-light-surface transition-colors cursor-pointer"
                    >
                      {faq.q}
                      <span className={`text-lg text-muted-text transition-transform duration-200 ${openIndex === i ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {openIndex === i && (
                      <div className="px-5 pb-4 text-muted-text text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right side: Stay Updated */}
          <div className="flex items-center">
            <Reveal delay={0.2}>
              <div className="bg-ink-0 rounded-xl p-8 w-full text-white">
                <h3 className="font-[family-name:var(--font-display)] text-white text-xl mb-2">Stay Updated</h3>
                <p className="text-white/70 text-sm mb-6">
                  Get latest offers, new arrivals and investment insights.
                </p>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white text-sm rounded-lg placeholder:text-white/40 focus:outline-none focus:border-gold-500"
                    required
                  />
                  <button type="submit" className="px-6 py-3 bg-gold-600 text-white font-semibold rounded-lg hover:bg-gold-500 transition-colors whitespace-nowrap text-sm">
                    Subscribe
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterSignup() {
  return null; // Merged into FAQ section
}