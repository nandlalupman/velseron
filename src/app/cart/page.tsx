"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ToastContainer } from "@/components/ui/Toast";
import { useCart } from "@/hooks/useCart";
import { useMetalPrice } from "@/hooks/useMetalPrice";
import { calculatePrice } from "@/lib/pricing";
import { formatPrice } from "@/lib/config";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clear } = useCart();
  const prices = useMetalPrice();

  const getSpot = (metal: "gold" | "silver") =>
    metal === "gold" ? prices.goldPerGram : prices.silverPerGram;

  const subtotal = items.reduce((sum, item) => {
    const price = calculatePrice(
      item.coin.weightGrams,
      item.coin.fineness,
      getSpot(item.coin.metal),
      item.coin.pricing.premiumPct
    );
    return sum + price * item.quantity;
  }, 0);

  return (
    <div data-metal="gold">
      <ToastContainer />
      <SiteHeader />

      <section className="pt-32 pb-section bg-bg min-h-screen">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <h1
            className="font-[family-name:var(--font-display)] text-ivory mb-8"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Cart
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-ivory-mute mb-6">Your cart is empty.</p>
              <Link href="/">
                <Button variant="secondary">Continue shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
              {/* Line items */}
              <div className="space-y-4">
                {items.map((item) => {
                  const price = calculatePrice(
                    item.coin.weightGrams,
                    item.coin.fineness,
                    getSpot(item.coin.metal),
                    item.coin.pricing.premiumPct
                  );
                  return (
                    <div
                      key={item.coin.id}
                      className="flex gap-4 p-4 border border-line rounded-[var(--radius-sharp)]"
                    >
                      <div className="w-20 h-20 shrink-0 flex items-center justify-center bg-ink-1 rounded-[var(--radius-sharp)]">
                        <CoinPosterSVG metal={item.coin.metal} size={72} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/coins/${item.coin.slug}`}
                          className="text-ivory font-medium hover:text-accent transition-colors"
                        >
                          {item.coin.name}
                        </Link>
                        <p className="font-mono-label text-ivory-mute mt-0.5">
                          {item.coin.metal.toUpperCase()} {item.coin.purityLabel} ·{" "}
                          {item.coin.weightGrams} G
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.coin.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-line text-ivory-mute hover:text-ivory cursor-pointer rounded-[var(--radius-sharp)]"
                          >
                            −
                          </button>
                          <span className="font-mono-label text-ivory tabular-nums w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.coin.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-line text-ivory-mute hover:text-ivory cursor-pointer rounded-[var(--radius-sharp)]"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.coin.id)}
                            className="ml-4 text-ivory-mute hover:text-error text-xs cursor-pointer transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-ivory font-medium tabular-nums">
                          {formatPrice(price * item.quantity)}
                        </p>
                        <p className="font-mono-label text-ivory-mute text-[9px] mt-1">
                          {formatPrice(price)} EACH
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="border border-line rounded-[var(--radius-sharp)] p-6">
                  <h2 className="font-mono-label text-ivory mb-4 text-[10px]">ORDER SUMMARY</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-ivory-mute text-sm">
                      <span>Subtotal</span>
                      <span className="tabular-nums">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-ivory-mute text-sm">
                      <span>Shipping</span>
                      <span>Insured, free</span>
                    </div>
                  </div>
                  <div className="hairline mb-4" />
                  <div className="flex justify-between text-ivory font-medium mb-6">
                    <span>Total</span>
                    <span className="tabular-nums text-lg">{formatPrice(subtotal)}</span>
                  </div>
                  <Link href="/checkout">
                    <Button variant="primary" className="w-full" size="lg">
                      Proceed to checkout
                    </Button>
                  </Link>
                  <p className="font-mono-label text-ivory-mute/40 text-[9px] mt-3 text-center">
                    PLACEHOLDER PRICES · NOT A REAL TRANSACTION
                  </p>
                </div>
                <button
                  onClick={clear}
                  className="w-full mt-3 text-ivory-mute text-xs hover:text-error transition-colors cursor-pointer text-center"
                >
                  Clear cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
