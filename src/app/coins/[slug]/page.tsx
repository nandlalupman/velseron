"use client";

import { useParams } from "next/navigation";
import { getCoinBySlug, COINS } from "@/data/coins";

import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer, showToast } from "@/components/ui/Toast";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";
import { ProductStage } from "@/components/coin/ProductStage";
import { ProductCard } from "@/components/commerce/ProductCard";
import { useMetalPrice } from "@/hooks/useMetalPrice";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/config";
import { getPriceBreakdown } from "@/lib/pricing";
import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import Link from "next/link";

type ViewMode = "front" | "back" | "edge";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const coin = getCoinBySlug(slug);
  const prices = useMetalPrice();
  const addItem = useCart((s) => s.addItem);

  const [view, setView] = useState<ViewMode>("front");
  const [quantity, setQuantity] = useState(1);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [priceLock, setPriceLock] = useState(300); // 5 min countdown

  // Price lock timer
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceLock((prev) => (prev <= 0 ? 300 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!coin) {
    return (
      <div data-metal="gold">
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-display)] text-dark-text mb-4" style={{ fontSize: "2rem" }}>
              Coin not found
            </h1>
            <Link href="/">
              <Button variant="secondary">Back to home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const spot = coin.metal === "gold" ? prices.goldPerGram : prices.silverPerGram;

  // Find best premium for quantity
  let premiumPct = coin.pricing.premiumPct;
  for (const b of coin.pricing.breaks) {
    if (quantity >= b.minQty) premiumPct = b.premiumPct;
  }

  const breakdown = getPriceBreakdown(coin.weightGrams, coin.fineness, spot, premiumPct);
  const totalPrice = breakdown.total * quantity;
  const perGram = breakdown.total / coin.weightGrams;

  const related = COINS.filter(
    (c) => c.metal === coin.metal && c.id !== coin.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addItem(coin, quantity);
    showToast("cart", `${quantity}× ${coin.name} added to cart.`);
  };

  const lockMinutes = Math.floor(priceLock / 60);
  const lockSeconds = priceLock % 60;

  const accordionItems = [
    {
      title: "Shipping & Delivery",
      content:
        "All orders are dispatched within 2 working days from our secure vault. Coins are sealed in tamper-evident packaging and shipped fully insured. Delivery typically takes 3–5 business days, depending on your location.",
    },
    {
      title: "Buy-Back Policy",
      content:
        "We offer a transparent buy-back service at market-linked rates, minus a small handling fee. Contact our team for a current quote. Settlement is completed within 3 working days of receiving the coin. (Placeholder — terms subject to change.)",
    },
    {
      title: "Frequently Asked Questions",
      content:
        "How is purity verified? Each coin undergoes X-ray fluorescence testing by an independent assayer. Can I inspect the coin before purchase? All coins are sealed; opening the seal voids the buy-back guarantee. Is there a minimum order? No minimum — you may purchase a single coin.",
    },
  ];

  return (
    <div data-metal={coin.metal}>
      <ToastContainer />

      {/* Breadcrumb */}
      <div className="py-4 bg-white border-b border-light-border">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <nav className="text-muted-text text-xs" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-dark-text transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${coin.metal}`} className="hover:text-dark-text transition-colors capitalize">
              {coin.metal}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-dark-text font-medium">{coin.name}</span>
          </nav>
        </div>
      </div>

      <section className="bg-white pb-section">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Sticky stage — 7 cols */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              {/* 3D Coin Stage */}
              <ProductStage metal={coin.metal} className="max-h-[65vh]" />

              {/* View controls */}
              <div className="mt-4 flex items-center justify-between">
                <SegmentedControl<ViewMode>
                  options={[
                    { value: "front", label: "Front" },
                    { value: "back", label: "Back" },
                    { value: "edge", label: "Edge" },
                  ]}
                  value={view}
                  onChange={setView}
                  size="sm"
                />
                <p className="font-mono-label text-ivory-mute text-[9px]">
                  3D · INTERACTIVE
                </p>
              </div>

              {/* Thumbnail row */}
              <div className="mt-4 flex gap-2">
                {(["front", "back", "edge"] as ViewMode[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={cn(
                      "w-16 h-16 border rounded-[var(--radius-sharp)] overflow-hidden cursor-pointer transition-colors",
                      view === v ? "border-accent" : "border-line hover:border-ivory-mute/30"
                    )}
                  >
                    <CoinPosterSVG
                      metal={coin.metal}
                      size={64}
                      face={v === "back" ? "reverse" : "obverse"}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Purchase column — 5 cols */}
          <div className="lg:col-span-5">
            <Reveal>
              {/* Metal tag */}
              <span className="inline-block font-mono-label text-accent text-[10px] px-2 py-1 border border-accent/30 rounded-[var(--radius-sharp)] mb-4">
                {coin.metal === "gold" ? "GOLD" : "SILVER"} {coin.purityLabel}
              </span>

              {/* Name */}
              <h1
                className="font-[family-name:var(--font-display)] text-ivory mb-2"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                {coin.name}
              </h1>
              <p className="font-mono-label text-ivory-mute mb-2 text-[10px]">
                {coin.series.toUpperCase()} SERIES
              </p>
              <p className="text-ivory-mute mb-6">{coin.tagline}</p>
            </Reveal>

            <div className="hairline mb-6" />

            {/* Price block */}
            <Reveal delay={0.1}>
              <div className="mb-6">
                <p className="text-ivory text-3xl font-medium tabular-nums mb-1">
                  {formatPrice(totalPrice)}
                </p>
                <p className="font-mono-label text-ivory-mute mb-2">
                  {formatPrice(perGram)}/G INCL. PREMIUM
                </p>

                {/* Expandable breakdown */}
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="font-mono-label text-accent text-[10px] cursor-pointer hover:underline"
                >
                  {showBreakdown ? "HIDE BREAKDOWN" : "PRICE BREAKDOWN"}
                </button>
                {showBreakdown && (
                  <div className="mt-3 p-3 bg-surface-elevated border border-line rounded-[var(--radius-sharp)] space-y-1">
                    <div className="flex justify-between text-ivory-mute text-xs">
                      <span>Metal value</span>
                      <span className="tabular-nums">
                        {formatPrice(breakdown.metalValue * quantity)}
                      </span>
                    </div>
                    <div className="flex justify-between text-ivory-mute text-xs">
                      <span>Premium ({premiumPct}%)</span>
                      <span className="tabular-nums">
                        {formatPrice(breakdown.premium * quantity)}
                      </span>
                    </div>
                    <div className="flex justify-between text-ivory-mute text-xs">
                      <span>Tax (placeholder)</span>
                      <span className="tabular-nums">
                        {formatPrice(breakdown.taxPlaceholder * quantity)}
                      </span>
                    </div>
                    <div className="hairline my-1" />
                    <div className="flex justify-between text-ivory text-sm font-medium">
                      <span>Total</span>
                      <span className="tabular-nums">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Price lock */}
                <p className="font-mono-label text-ivory-mute/60 text-[10px] mt-3">
                  PRICE HELD FOR{" "}
                  <span className="text-ivory tabular-nums">
                    {String(lockMinutes).padStart(2, "0")}:
                    {String(lockSeconds).padStart(2, "0")}
                  </span>
                </p>
              </div>
            </Reveal>

            <div className="hairline mb-6" />

            {/* Quantity */}
            <Reveal delay={0.15}>
              <div className="mb-6">
                <label className="font-mono-label text-ivory-mute text-[10px] block mb-2">
                  QUANTITY
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-line text-ivory hover:border-accent transition-colors cursor-pointer rounded-[var(--radius-sharp)]"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="font-mono-label text-ivory w-8 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-line text-ivory hover:border-accent transition-colors cursor-pointer rounded-[var(--radius-sharp)]"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                {coin.pricing.breaks.length > 0 && (
                  <p className="font-mono-label text-ivory-mute/50 text-[9px] mt-2">
                    VOLUME PRICING: {coin.pricing.breaks.map((b) => `${b.minQty}+ AT ${b.premiumPct}%`).join(" · ")}
                  </p>
                )}
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.2}>
              <div className="flex flex-col gap-3 mb-6">
                {coin.stock.status !== "out_of_stock" ? (
                  <>
                    <Button variant="primary" size="lg" className="w-full" onClick={handleAddToCart}>
                      Add to cart — {formatPrice(totalPrice)}
                    </Button>
                    <Button variant="secondary" size="lg" className="w-full">
                      Buy now
                    </Button>
                  </>
                ) : (
                  <Button variant="secondary" size="lg" className="w-full">
                    Notify me when available
                  </Button>
                )}
              </div>
            </Reveal>

            {/* Stock */}
            <Reveal delay={0.25}>
              <div className="mb-6">
                <StockBadge status={coin.stock.status} quantity={coin.stock.quantity} restockDate={coin.stock.restockDate} />
              </div>
            </Reveal>

            <div className="hairline mb-6" />

            {/* Trust list */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {coin.authenticity.serialNumbered && (
                  <TrustItem label="Serial numbered" />
                )}
                {coin.authenticity.assayCertificate && (
                  <TrustItem label="Assay certified" />
                )}
                <TrustItem label="Insured delivery" />
                <TrustItem label="Buy-back guarantee" />
              </div>
            </Reveal>

            <div className="hairline mb-6" />

            {/* Spec table */}
            <Reveal delay={0.35}>
              <h3 className="font-mono-label text-ivory mb-3 text-[10px]">
                SPECIFICATIONS
              </h3>
              <div className="border border-line rounded-[var(--radius-sharp)] overflow-hidden mb-6">
                <SpecRow label="Metal" value={coin.metal === "gold" ? "Gold" : "Silver"} />
                <SpecRow label="Weight" value={`${coin.weightGrams} g`} />
                <SpecRow label="Purity" value={`${coin.purityLabel} (${coin.fineness})`} />
                <SpecRow label="Diameter" value={`${coin.dimensions.diameterMm} mm`} />
                <SpecRow label="Thickness" value={`${coin.dimensions.thicknessMm} mm`} />
                <SpecRow label="Finish" value={coin.finish.charAt(0).toUpperCase() + coin.finish.slice(1)} />
                <SpecRow label="Edge" value={coin.edge.charAt(0).toUpperCase() + coin.edge.slice(1)} />
                <SpecRow label="Design" value={coin.design.name} />
                {coin.limited && coin.mintageLimit && (
                  <SpecRow label="Mintage" value={`Limited to ${coin.mintageLimit}`} />
                )}
                {coin.authenticity.hallmark && (
                  <SpecRow label="Hallmark" value={coin.authenticity.hallmark} last />
                )}
              </div>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.4}>
              <div className="mb-6">
                <h3 className="font-mono-label text-ivory mb-3 text-[10px]">
                  DESCRIPTION
                </h3>
                <p className="text-ivory-mute text-sm leading-relaxed mb-2">
                  <strong className="text-ivory">Obverse:</strong> {coin.design.obverse}
                </p>
                <p className="text-ivory-mute text-sm leading-relaxed">
                  <strong className="text-ivory">Reverse:</strong> {coin.design.reverse}
                </p>
              </div>
            </Reveal>

            <div className="hairline mb-6" />

            {/* Accordions */}
            <Reveal delay={0.45}>
              <Accordion items={accordionItems} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related coins */}
      {related.length > 0 && (
        <section className="py-section bg-ink-1 border-t border-line">
          <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
            <Reveal>
              <h2
                className="font-[family-name:var(--font-display)] text-ivory mb-8"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
              >
                More in this collection
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((c, i) => (
                <Reveal key={c.id} stagger={i}>
                  <ProductCard coin={c} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky purchase bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-line px-[var(--grid-gutter)] py-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-ivory font-medium tabular-nums">
            {formatPrice(totalPrice)}
          </p>
          <p className="font-mono-label text-ivory-mute text-[9px]">
            {coin.name.toUpperCase()}
          </p>
        </div>
        {coin.stock.status !== "out_of_stock" ? (
          <Button variant="primary" size="md" onClick={handleAddToCart}>
            Add to cart
          </Button>
        ) : (
          <Button variant="secondary" size="md">
            Notify me
          </Button>
        )}
      </div>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────── */

function SpecRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 text-sm",
        !last && "border-b border-line"
      )}
    >
      <span className="font-mono-label text-ivory-mute text-[10px]">
        {label.toUpperCase()}
      </span>
      <span className="text-ivory">{value}</span>
    </div>
  );
}

function TrustItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-ivory-mute text-sm">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
      >
        <path d="M3 7l3 3 5-5" />
      </svg>
      {label}
    </div>
  );
}

function StockBadge({
  status,
  quantity,
  restockDate,
}: {
  status: string;
  quantity: number;
  restockDate?: string;
}) {
  switch (status) {
    case "in_stock":
      return (
        <span className="inline-flex items-center gap-1.5 font-mono-label text-ok text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-ok" />
          IN STOCK
        </span>
      );
    case "low_stock":
      return (
        <span className="inline-flex items-center gap-1.5 font-mono-label text-warn text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-warn" />
          LOW STOCK — {quantity} REMAINING
        </span>
      );
    case "out_of_stock":
      return (
        <span className="inline-flex items-center gap-1.5 font-mono-label text-error text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-error" />
          OUT OF STOCK
          {restockDate && ` — EXPECTED ${restockDate}`}
        </span>
      );
    case "preorder":
      return (
        <span className="inline-flex items-center gap-1.5 font-mono-label text-accent text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          PRE-ORDER
          {restockDate && ` — SHIPS ${restockDate}`}
        </span>
      );
    default:
      return null;
  }
}
