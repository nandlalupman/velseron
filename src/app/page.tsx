"use client";

import { BRAND, TRUST_CLAIMS } from "@/lib/config";
import { COINS, getFeaturedCoins, getCoinsByMetal } from "@/data/coins";
import { useMetalPrice } from "@/hooks/useMetalPrice";
import { formatPrice } from "@/lib/config";
import { calculatePrice } from "@/lib/pricing";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";
import { TrustStrip } from "@/components/commerce/TrustStrip";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";
import { HeroStage } from "@/components/coin/HeroStage";
import { MetalPricePill } from "@/components/layout/MetalPricePill";
import { IntroVideo } from "@/components/effects/IntroVideo";
import { GoldParticles } from "@/components/effects/GoldParticles";
import { ImmersiveScrollSection } from "@/components/effects/ImmersiveScrollSection";
import { DivineCarousel } from "@/components/commerce/DivineCarousel";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const prices = useMetalPrice();
  const featured = getFeaturedCoins();
  const goldCoins = getCoinsByMetal("gold");
  const silverCoins = getCoinsByMetal("silver");

  return (
    <div data-metal="gold">
      <IntroVideo />
      <GoldParticles />
      <ToastContainer />
      <SiteHeader />

      {/* ═══════════════════════════════════════════════
          1. HERO (Immersive Scroll)
         ═══════════════════════════════════════════════ */}
      <ImmersiveScrollSection fadeFactor={0}>
        <section className="relative min-h-screen flex items-center bg-bg overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 65% 40%, rgba(201,162,75,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-32 lg:py-0">
          {/* Left: Copy — spans 5 cols */}
          <div className="lg:col-span-5 relative z-10">
            <Reveal>
              <h1 className="font-display text-ivory mb-6">
                {BRAND.tagline}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-ivory-mute text-lg mb-10 max-w-md">
                {BRAND.description}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-3">
                <Link href="/gold">
                  <Button variant="primary" size="lg">
                    Shop gold coins
                  </Button>
                </Link>
                <Link href="/silver">
                  <Button variant="secondary" size="lg">
                    Shop silver coins
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right: 3D Coin — spans 7 cols */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <Reveal delay={0.15}>
              <HeroStage className="w-full max-w-[600px] lg:-mr-12" />
            </Reveal>
          </div>
        </div>
        </section>
      </ImmersiveScrollSection>

      {/* ═══════════════════════════════════════════════
          TRUST ROW
         ═══════════════════════════════════════════════ */}
      <Reveal>
        <TrustStrip />
      </Reveal>

      {/* ═══════════════════════════════════════════════
          2. METAL SELECTOR — full-width split (Immersive Scroll)
         ═══════════════════════════════════════════════ */}
      <ImmersiveScrollSection scaleFactor={0.75} fadeFactor={0.1}>
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[85vh]">
        {/* Gold half */}
        <Link
          href="/gold"
          className="group relative flex flex-col items-center justify-center p-12 bg-ink-1 hover:bg-ink-2 transition-colors duration-[var(--dur-md)] overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(201,162,75,0.05) 0%, transparent 60%)",
            }}
          />
          <Reveal>
            <CoinPosterSVG metal="gold" size={200} className="mb-6" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-[family-name:var(--font-display)] text-ivory text-center"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Gold Collection
            </h2>
            <p className="font-mono-label text-gold-500 mt-3 text-center">
              24K · 999.9 FINE · 5 G TO 1 OZ
            </p>
          </Reveal>
        </Link>

        {/* Silver half */}
        <Link
          href="/silver"
          className="group relative flex flex-col items-center justify-center p-12 bg-steel-1 hover:bg-steel-2 transition-colors duration-[var(--dur-md)] overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(196,202,210,0.04) 0%, transparent 60%)",
            }}
          />
          <Reveal>
            <CoinPosterSVG metal="silver" size={200} className="mb-6" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-[family-name:var(--font-display)] text-ivory text-center"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Silver Collection
            </h2>
            <p className="font-mono-label text-silver-500 mt-3 text-center">
              999 FINE · 1 OZ TO 100 G
            </p>
          </Reveal>
        </Link>
        </section>
      </ImmersiveScrollSection>

      {/* ═══════════════════════════════════════════════
          3. DIVINE DESIGNS
         ═══════════════════════════════════════════════ */}
      <section
        className="py-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1a1d24 0%, #22262e 40%, #2a2e36 100%)",
        }}
      >
        {/* Silver shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 30%, rgba(196,202,210,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] mb-8 mt-4">
          <Reveal>
            <p className="font-mono-label text-accent mb-2 text-[10px]">
              SACRED COLLECTION
            </p>
            <h2
              className="font-[family-name:var(--font-display)] text-ivory mb-2"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Divine Designs
            </h2>
            <p className="text-ivory-mute max-w-lg text-sm">
              Eternal spiritual motifs meticulously crafted into 24K gold and 999 fine silver.
            </p>
          </Reveal>
        </div>
        <DivineCarousel />
      </section>

      {/* ═══════════════════════════════════════════════
          4. LIVE PRICE STRIP
         ═══════════════════════════════════════════════ */}
      <section className="bg-ink-0 border-y border-line">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="font-mono-label text-ivory-mute text-[10px] block mb-0.5">
                GOLD 24K / GRAM
              </span>
              <span className="text-ivory font-medium tabular-nums">
                {formatPrice(prices.goldPerGram)}
              </span>
            </div>
            <div className="w-px h-8 bg-line" />
            <div>
              <span className="font-mono-label text-ivory-mute text-[10px] block mb-0.5">
                SILVER 999 / GRAM
              </span>
              <span className="text-ivory font-medium tabular-nums">
                {formatPrice(prices.silverPerGram)}
              </span>
            </div>
          </div>
          <span className="font-mono-label text-ivory-mute/50 text-[9px]">
            INDICATIVE · PLACEHOLDER FEED · UPDATED{" "}
            {prices.lastUpdated.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. FEATURED ROOMS
         ═══════════════════════════════════════════════ */}
      <section className="py-section bg-bg">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-accent mb-4">FEATURED</p>
            <h2
              className="font-[family-name:var(--font-display)] text-ivory mb-16"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Select pieces
            </h2>
          </Reveal>

          <div className="space-y-24">
            {/* Featured gold coin */}
            {featured
              .filter((c) => c.metal === "gold")
              .map((coin) => (
                <FeaturedRoom key={coin.id} coin={coin} prices={prices} />
              ))}

            {/* Featured silver coin */}
            {featured
              .filter((c) => c.metal === "silver")
              .map((coin) => (
                <FeaturedRoom key={coin.id} coin={coin} prices={prices} reverse />
              ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. CRAFT & PURITY — paper ground
         ═══════════════════════════════════════════════ */}
      <section className="bg-paper text-paper-ink py-section">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <p className="font-mono-label text-gold-700 mb-4 text-[10px]">
                CRAFT & PURITY
              </p>
              <h2
                className="font-[family-name:var(--font-display)] mb-6"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "var(--paper-ink)",
                }}
              >
                Struck, not stamped.
              </h2>
              <div className="space-y-4 text-paper-ink/80">
                <p>
                  Every coin is individually struck with hydraulic precision at
                  controlled temperatures. The proof finish creates a mirror
                  field that contrasts with frosted relief — a hallmark of
                  considered minting.
                </p>
                <p>
                  Purity is verified through independent assay. Each coin
                  carries a unique serial number etched during minting, linking
                  it permanently to its certificate of authenticity.
                </p>
                <p>
                  The edge is reeded with 180 uniform teeth — a legacy
                  anti-counterfeiting feature, and a tactile mark of genuine
                  bullion.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Abstract SVG visual — measurement ticks and hairline patterns */}
            <div className="relative aspect-square max-w-md mx-auto">
              <CraftVisualSVG />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. COLLECTION PREVIEWS
         ═══════════════════════════════════════════════ */}
      <section className="py-section bg-bg">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          {/* Gold preview */}
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="font-mono-label text-gold-500 mb-2 text-[10px]">
                  GOLD COLLECTION
                </p>
                <h2
                  className="font-[family-name:var(--font-display)] text-ivory"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  Gold coins
                </h2>
              </div>
              <Link href="/gold">
                <Button variant="ghost" size="sm">
                  View all →
                </Button>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-24">
            {goldCoins.slice(0, 2).map((coin, i) => (
              <Reveal key={coin.id} stagger={i}>
                <ProductCard coin={coin} />
              </Reveal>
            ))}
          </div>

          {/* Silver preview */}
          <Reveal>
            <div className="flex items-center justify-between mb-8" data-metal="silver">
              <div>
                <p className="font-mono-label text-silver-500 mb-2 text-[10px]">
                  SILVER COLLECTION
                </p>
                <h2
                  className="font-[family-name:var(--font-display)] text-ivory"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  Silver coins
                </h2>
              </div>
              <Link href="/silver">
                <Button variant="ghost" size="sm">
                  View all →
                </Button>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {silverCoins.slice(0, 3).map((coin, i) => (
              <Reveal key={coin.id} stagger={i}>
                <ProductCard coin={coin} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          7. AUTHENTICITY
         ═══════════════════════════════════════════════ */}
      <section className="py-section bg-ink-1 border-y border-line">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <p className="font-mono-label text-accent mb-4 text-[10px]">
                AUTHENTICITY
              </p>
              <h2
                className="font-[family-name:var(--font-display)] text-ivory mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Verified at every step.
              </h2>
              <p className="text-ivory-mute mb-6 max-w-lg">
                Each coin is independently assayed, serial-numbered and sealed.
                Look up any serial to verify its certificate of authenticity
                and chain of custody.
              </p>

              {/* Mock serial lookup */}
              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="Enter serial number"
                  className="flex-1 px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-accent"
                  aria-label="Serial number lookup"
                />
                <Button variant="primary" size="md">
                  Verify
                </Button>
              </div>
              <p className="font-mono-label text-ivory-mute/40 text-[9px] mt-2">
                PLACEHOLDER — VERIFICATION NOT FUNCTIONAL
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <AssayCardVisualSVG />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          8. BUDGET CHOOSER
         ═══════════════════════════════════════════════ */}
      <BudgetChooser prices={prices} />

      {/* ═══════════════════════════════════════════════
          9. JOURNAL
         ═══════════════════════════════════════════════ */}
      <section className="py-section bg-bg">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-accent mb-4 text-[10px]">
              JOURNAL
            </p>
            <h2
              className="font-[family-name:var(--font-display)] text-ivory mb-12"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              Understanding precious metals
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {JOURNAL_CARDS.map((card, i) => (
              <Reveal key={card.title} stagger={i}>
                <article className="group bg-surface border border-line rounded-[var(--radius-sharp)] overflow-hidden hover:border-accent/30 transition-colors duration-[var(--dur-sm)]">
                  {/* Abstract SVG header */}
                  <div className="aspect-[16/9] bg-ink-2 flex items-center justify-center overflow-hidden">
                    <JournalVisualSVG index={i} />
                  </div>
                  <div className="p-5">
                    <p className="font-mono-label text-accent text-[9px] mb-2">
                      {card.category}
                    </p>
                    <h3 className="text-ivory font-medium mb-2">
                      {card.title}
                    </h3>
                    <p className="text-ivory-mute text-sm">
                      {card.excerpt}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          10. FOOTER
         ═══════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}

/* ── Sub-components ───────────────────────────────── */

function FeaturedRoom({
  coin,
  prices,
  reverse = false,
}: {
  coin: (typeof COINS)[0];
  prices: ReturnType<typeof useMetalPrice>;
  reverse?: boolean;
}) {
  const spot =
    coin.metal === "gold" ? prices.goldPerGram : prices.silverPerGram;
  const price = calculatePrice(
    coin.weightGrams,
    coin.fineness,
    spot,
    coin.pricing.premiumPct
  );

  return (
    <Reveal>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          reverse ? "lg:direction-rtl" : ""
        }`}
        data-metal={coin.metal}
      >
        <div className={`flex justify-center ${reverse ? "lg:order-2" : ""}`}>
          <CoinPosterSVG metal={coin.metal} size={360} className="w-full max-w-[360px]" />
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
          <p className="font-mono-label text-accent mb-3 text-[10px]">
            {coin.series.toUpperCase()} SERIES
          </p>
          <h3
            className="font-[family-name:var(--font-display)] text-ivory mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            {coin.name}
          </h3>
          <p className="text-ivory-mute mb-4">
            {coin.tagline}
          </p>
          <p className="font-mono-label text-ivory-mute mb-6">
            {coin.metal === "gold" ? "GOLD" : "SILVER"} {coin.purityLabel} ·{" "}
            {coin.weightGrams} G · {coin.finish.toUpperCase()} · {coin.edge.toUpperCase()}
          </p>
          <p className="text-ivory text-xl font-medium tabular-nums mb-6">
            {formatPrice(price)}
          </p>
          <Link href={`/coins/${coin.slug}`}>
            <Button variant="primary">View details</Button>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

function BudgetChooser({
  prices,
}: {
  prices: ReturnType<typeof useMetalPrice>;
}) {
  const [amount, setAmount] = useState(50000);
  const [metal, setMetal] = useState<"gold" | "silver">("gold");

  const spot = metal === "gold" ? prices.goldPerGram : prices.silverPerGram;
  const coins = getCoinsByMetal(metal).filter((c) => {
    const price = calculatePrice(
      c.weightGrams,
      c.fineness,
      spot,
      c.pricing.premiumPct
    );
    return price <= amount && c.stock.status !== "out_of_stock";
  });

  return (
    <section className="py-section bg-paper text-paper-ink">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <Reveal>
          <p
            className="font-mono-label mb-4 text-[10px]"
            style={{ color: "var(--gold-700)" }}
          >
            INVEST BY AMOUNT
          </p>
          <h2
            className="font-[family-name:var(--font-display)] mb-8"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--paper-ink)",
            }}
          >
            Start with your budget.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-lg">
            <div className="flex-1">
              <label className="font-mono-label text-[10px] block mb-2" style={{ color: "var(--paper-ink)" }}>
                AMOUNT (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 border text-sm rounded-[var(--radius-sharp)] focus:outline-none"
                style={{
                  backgroundColor: "var(--paper)",
                  borderColor: "var(--paper-ink)",
                  color: "var(--paper-ink)",
                }}
                min={1000}
                step={1000}
              />
            </div>
            <div>
              <label className="font-mono-label text-[10px] block mb-2" style={{ color: "var(--paper-ink)" }}>
                METAL
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMetal("gold")}
                  className={`px-4 py-3 text-sm font-medium rounded-[var(--radius-sharp)] border cursor-pointer transition-colors ${
                    metal === "gold"
                      ? "bg-gold-700 text-white border-gold-700"
                      : "bg-transparent border-current"
                  }`}
                  style={{ color: "var(--paper-ink)" }}
                >
                  Gold
                </button>
                <button
                  onClick={() => setMetal("silver")}
                  className={`px-4 py-3 text-sm font-medium rounded-[var(--radius-sharp)] border cursor-pointer transition-colors ${
                    metal === "silver"
                      ? "bg-silver-700 text-white border-silver-700"
                      : "bg-transparent border-current"
                  }`}
                  style={{ color: "var(--paper-ink)" }}
                >
                  Silver
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          {coins.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coins.map((coin, i) => (
                <div
                  key={coin.id}
                  data-metal={coin.metal}
                  className="bg-ink-1 rounded-[var(--radius-sharp)] overflow-hidden"
                >
                  <ProductCard coin={coin} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-12" style={{ color: "var(--paper-ink)" }}>
              No coins available within this budget. Try increasing your amount.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ── Abstract SVG Visuals ──────────────────────────── */

function CraftVisualSVG() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background */}
      <rect width="400" height="400" fill="#F6F2EA" />

      {/* Concentric circles — measurement reference */}
      {[60, 90, 120, 150].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} stroke="#8A6A2F" strokeWidth="0.4" opacity="0.25" />
      ))}

      {/* Measurement ticks */}
      {Array.from({ length: 72 }).map((_, i) => {
        const angle = (i * 5 * Math.PI) / 180;
        const inner = i % 6 === 0 ? 150 : 155;
        const outer = 162;
        return (
          <line
            key={i}
            x1={200 + inner * Math.cos(angle)}
            y1={200 + inner * Math.sin(angle)}
            x2={200 + outer * Math.cos(angle)}
            y2={200 + outer * Math.sin(angle)}
            stroke="#8A6A2F"
            strokeWidth={i % 6 === 0 ? "0.8" : "0.3"}
            opacity="0.4"
          />
        );
      })}

      {/* Cross-hair */}
      <line x1="200" y1="40" x2="200" y2="360" stroke="#8A6A2F" strokeWidth="0.3" opacity="0.15" />
      <line x1="40" y1="200" x2="360" y2="200" stroke="#8A6A2F" strokeWidth="0.3" opacity="0.15" />

      {/* Coin outline */}
      <circle cx="200" cy="200" r="130" stroke="#8A6A2F" strokeWidth="1" opacity="0.5" />

      {/* Detail labels */}
      <text x="200" y="55" textAnchor="middle" fill="#8A6A2F" fontSize="7" fontFamily="monospace" opacity="0.5">
        ∅ 32.00 mm
      </text>
      <text x="350" y="203" textAnchor="start" fill="#8A6A2F" fontSize="7" fontFamily="monospace" opacity="0.5">
        2.00 mm
      </text>

      {/* Reeding detail */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const r1 = 130;
        const r2 = 138;
        return (
          <line
            key={`reed-${i}`}
            x1={200 + r1 * Math.cos(angle)}
            y1={200 + r1 * Math.sin(angle)}
            x2={200 + r2 * Math.cos(angle)}
            y2={200 + r2 * Math.sin(angle)}
            stroke="#8A6A2F"
            strokeWidth="0.6"
            opacity="0.3"
          />
        );
      })}
    </svg>
  );
}

function AssayCardVisualSVG() {
  return (
    <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Card background */}
      <rect x="20" y="20" width="360" height="240" rx="2" fill="var(--surface-elevated)" stroke="var(--line)" strokeWidth="1" />

      {/* Header */}
      <text x="40" y="55" fill="var(--ivory)" fontFamily="Georgia, serif" fontSize="16">
        Certificate of Authenticity
      </text>
      <line x1="40" y1="65" x2="360" y2="65" stroke="var(--line)" strokeWidth="0.5" />

      {/* Fields */}
      <text x="40" y="90" fill="var(--ivory-mute)" fontFamily="monospace" fontSize="8" letterSpacing="2">SERIAL</text>
      <text x="40" y="105" fill="var(--ivory)" fontFamily="monospace" fontSize="11">VEL-AU-MER-031-000001</text>

      <text x="40" y="130" fill="var(--ivory-mute)" fontFamily="monospace" fontSize="8" letterSpacing="2">METAL</text>
      <text x="40" y="145" fill="var(--ivory)" fontFamily="monospace" fontSize="11">Gold 999.9 Fine (24K)</text>

      <text x="220" y="130" fill="var(--ivory-mute)" fontFamily="monospace" fontSize="8" letterSpacing="2">WEIGHT</text>
      <text x="220" y="145" fill="var(--ivory)" fontFamily="monospace" fontSize="11">31.1035 g (1 troy oz)</text>

      <text x="40" y="170" fill="var(--ivory-mute)" fontFamily="monospace" fontSize="8" letterSpacing="2">ASSAY</text>
      <text x="40" y="185" fill="var(--ivory)" fontFamily="monospace" fontSize="11">Independently verified</text>

      {/* Stamp / seal area */}
      <circle cx="330" cy="200" r="30" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" />
      <circle cx="330" cy="200" r="24" stroke="var(--accent)" strokeWidth="0.3" opacity="0.2" />
      <text x="330" y="198" textAnchor="middle" fill="var(--accent)" fontFamily="monospace" fontSize="7" letterSpacing="1" opacity="0.5">
        ASSAY
      </text>
      <text x="330" y="208" textAnchor="middle" fill="var(--accent)" fontFamily="monospace" fontSize="6" opacity="0.4">
        VERIFIED
      </text>

      {/* Footer */}
      <line x1="40" y1="230" x2="360" y2="230" stroke="var(--line)" strokeWidth="0.5" />
      <text x="40" y="248" fill="var(--ivory-mute)" fontFamily="monospace" fontSize="7" letterSpacing="1" opacity="0.5">
        PLACEHOLDER — NOT A REAL CERTIFICATE
      </text>
    </svg>
  );
}

const JOURNAL_CARDS = [
  {
    category: "EDUCATION",
    title: "Gold vs silver: choosing your first coin",
    excerpt:
      "Both metals have distinct roles in a portfolio. Gold stores wealth; silver amplifies exposure to precious metals at a lower entry point.",
  },
  {
    category: "PROCESS",
    title: "How coins are assayed and certified",
    excerpt:
      "An independent assayer verifies weight and purity using X-ray fluorescence. The result is recorded against the coin's unique serial number.",
  },
  {
    category: "MARKET",
    title: "Understanding spot price and premiums",
    excerpt:
      "The spot price is the current market value of raw metal. The premium covers minting, certification, handling and margin.",
  },
];

function JournalVisualSVG({ index }: { index: number }) {
  const patterns = [
    // Pattern 1: Radial gradient with hairlines
    <>
      <circle cx="160" cy="60" r="40" stroke="var(--accent)" strokeWidth="0.3" opacity="0.3" />
      <circle cx="160" cy="60" r="55" stroke="var(--accent)" strokeWidth="0.2" opacity="0.2" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="160"
          y1="60"
          x2={160 + 50 * Math.cos((i * 30 * Math.PI) / 180)}
          y2={60 + 50 * Math.sin((i * 30 * Math.PI) / 180)}
          stroke="var(--accent)"
          strokeWidth="0.3"
          opacity="0.2"
        />
      ))}
    </>,
    // Pattern 2: Grid pattern
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="20"
          y1={15 + i * 15}
          x2="300"
          y2={15 + i * 15}
          stroke="var(--accent)"
          strokeWidth="0.3"
          opacity="0.15"
        />
      ))}
      <rect x="80" y="30" width="100" height="60" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3" fill="none" />
    </>,
    // Pattern 3: Ascending bars (like a price chart)
    <>
      {[25, 35, 30, 45, 50, 42, 55, 60, 52, 65].map((h, i) => (
        <rect
          key={i}
          x={40 + i * 24}
          y={120 - h}
          width="16"
          height={h}
          fill="var(--accent)"
          opacity={0.08 + i * 0.02}
        />
      ))}
    </>,
  ];

  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {patterns[index % patterns.length]}
    </svg>
  );
}
