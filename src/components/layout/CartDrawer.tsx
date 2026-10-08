"use client";

import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { useMetalPrice } from "@/hooks/useMetalPrice";
import { calculatePrice } from "@/lib/pricing";
import { formatPrice } from "@/lib/config";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, updateQuantity, removeItem, clear } = useCart();
  const prices = useMetalPrice();
  const isEmpty = items.length === 0;

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
    <Drawer open={open} onClose={onClose} label="Shopping cart">
      <div className="p-6 pt-14 flex flex-col h-full">
        <h2
          className="font-[family-name:var(--font-display)] text-ivory mb-6"
          style={{ fontSize: "1.5rem" }}
        >
          Cart
        </h2>

        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-24 h-24 mb-6 text-ivory-mute/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M15 12h3M6 12h3" />
              </svg>
            </div>
            <h3 className="text-ivory font-display text-xl mb-2">Your vault is empty</h3>
            <p className="text-ivory-mute text-sm mb-8 max-w-xs">
              Discover our collection of premium gold and silver bullion.
            </p>
            <Button variant="primary" onClick={onClose} className="w-full max-w-[200px]">
              Start Exploring
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4">
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
                    className="flex gap-4 p-3 border border-line rounded-[var(--radius-sharp)]"
                  >
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                      <CoinPosterSVG metal={item.coin.metal} size={56} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-ivory text-sm font-medium truncate">
                        {item.coin.name}
                      </p>
                      <p className="font-mono-label text-ivory-mute mt-0.5">
                        {item.coin.metal === "gold" ? "GOLD" : "SILVER"}{" "}
                        {item.coin.purityLabel} · {item.coin.weightGrams} G
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.coin.id, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center border border-line text-ivory-mute hover:text-ivory text-xs cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="font-mono-label text-ivory text-xs w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.coin.id, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center border border-line text-ivory-mute hover:text-ivory text-xs cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.coin.id)}
                          className="ml-auto text-ivory-mute hover:text-error text-xs cursor-pointer transition-colors"
                          aria-label={`Remove ${item.coin.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-ivory text-sm font-medium tabular-nums">
                        {formatPrice(price * item.quantity)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-line">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-label text-ivory-mute">
                  SUBTOTAL
                </span>
                <span className="text-ivory font-medium tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="font-mono-label text-ivory-mute text-[9px] mb-4">
                PRICES ARE INDICATIVE · PLACEHOLDER FEED
              </p>
              <Button variant="primary" className="w-full mb-2">
                Checkout
              </Button>
              <Button variant="ghost" className="w-full" onClick={clear}>
                Clear cart
              </Button>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
}
