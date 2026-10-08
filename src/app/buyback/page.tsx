"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function BuybackPage() {
  const [serialNumber, setSerialNumber] = useState("");
  const [quote, setQuote] = useState<{ price: number; breakdown: string[] } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;
    
    // Mock quote calculation
    const basePrice = 75000 + Math.random() * 20000;
    const roundedPrice = Math.round(basePrice / 100) * 100;
    setQuote({
      price: roundedPrice,
      breakdown: [
        `Current gold spot: ₹6,245/g`,
        `Coin weight: 10g (24K, 999.9)`,
        `Metal value: ₹62,450`,
        `Buy-back premium: -2% (handling)`,
        `Estimated payout: ₹${roundedPrice.toLocaleString("en-IN")}`,
      ],
    });
    setSubmitted(true);
  };

  return (
    <div data-metal="gold">
      <ToastContainer />
      <section className="pt-32 pb-section bg-premium-0 min-h-screen">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-gold-500 text-[10px] mb-3">BUY-BACK PROGRAM</p>
            <h1
              className="font-[family-name:var(--font-display)] text-ivory mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Sell back at fair value.
            </h1>
            <p className="text-ivory-mute max-w-lg mb-10">
              We buy back any LoveLWK coin at transparent, market-linked rates.
              No hidden deductions. Settlement within 3 working days.
            </p>
          </Reveal>

          {/* Process steps */}
          <Reveal delay={0.1}>
            <div className="max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              <div className="border border-gold-700/30 rounded-[var(--radius-sharp)] p-6 bg-surface relative">
                <div className="absolute -top-3 left-6 w-8 h-8 flex items-center justify-center bg-gold-500 text-ink-0 font-bold rounded-full">1</div>
                <div className="pt-6">
                  <p className="font-mono-label text-gold-500 text-[10px] mb-2">REQUEST QUOTE</p>
                  <p className="text-ivory text-sm font-medium mb-1">Enter serial number</p>
                  <p className="text-ivory-mute text-xs">Get an instant, live market-linked quote.</p>
                </div>
              </div>
              <div className="border border-gold-700/30 rounded-[var(--radius-sharp)] p-6 bg-surface relative">
                <div className="absolute -top-3 left-6 w-8 h-8 flex items-center justify-center bg-gold-500 text-ink-0 font-bold rounded-full">2</div>
                <div className="pt-6">
                  <p className="font-mono-label text-gold-500 text-[10px] mb-2">SHIP COIN</p>
                  <p className="text-ivory text-sm font-medium mb-1">Free insured pickup</p>
                  <p className="text-ivory-mute text-xs">We schedule a secure, insured collection.</p>
                </div>
              </div>
              <div className="border border-gold-700/30 rounded-[var(--radius-sharp)] p-6 bg-surface relative">
                <div className="absolute -top-3 left-6 w-8 h-8 flex items-center justify-center bg-gold-500 text-ink-0 font-bold rounded-full">3</div>
                <div className="pt-6">
                  <p className="font-mono-label text-gold-500 text-[10px] mb-2">RECEIVE PAYMENT</p>
                  <p className="text-ivory text-sm font-medium mb-1">Within 3 days</p>
                  <p className="text-ivory-mute text-xs">Funds transferred to your bank account.</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Quote Form */}
          <Reveal delay={0.2}>
            <div className="max-w-xl">
              <div className="border border-gold-700/30 rounded-[var(--radius-sharp)] p-6 md:p-8 bg-surface">
                <h2 className="font-display text-ivory mb-4" style={{ fontSize: "1.5rem" }}>
                  Get Your Quote
                </h2>
                <p className="text-ivory-mute mb-6">
                  Enter your coin's unique serial number (found on the certificate and coin edge) 
                  to receive a live buy-back estimate.
                </p>

                {(!quote || !submitted) ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="serial" className="font-mono-label text-ivory-mute text-[10px] block mb-2">
                        SERIAL NUMBER
                      </label>
                      <input
                        id="serial"
                        type="text"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
                        className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-gold-500 font-mono-label text-[11px]"
                        placeholder="e.g., VEL-AU-LAK-010-000123"
                        required
                        maxLength={30}
                      />
                    </div>
                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      Get Quote
                    </Button>
                  </form>
                ) : (
                  <QuoteResult quote={quote} onNewQuote={() => { setQuote(null); setSubmitted(false); setSerialNumber(""); }} />
                )}
              </div>

              <p className="font-mono-label text-ivory-mute/40 text-[9px] mt-4 text-center">
                PLACEHOLDER — BUY-BACK QUOTE IS SIMULATED
              </p>
            </div>
          </Reveal>

          {/* Trust features */}
          <Reveal delay={0.3}>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <TrustBadge icon="lock" title="Secure Process" desc="End-to-end encrypted" />
              <TrustBadge icon="shield-check" title="Insured Transit" desc="Fully covered pickup" />
              <TrustBadge icon="certificate" title="Verified Authenticity" desc="Assay re-verification" />
              <TrustBadge icon="rotate-ccw" title="Fast Settlement" desc="3 working days" />
            </div>
          </Reveal>
        </div>
      </section>    </div>
  );
}

function QuoteResult({ quote, onNewQuote }: { quote: { price: number; breakdown: string[] }; onNewQuote: () => void }) {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-gold-600/10 border border-gold-700/30 rounded-[var(--radius-sharp)] text-center">
        <p className="font-mono-label text-gold-500 text-[10px] mb-2">ESTIMATED BUY-BACK VALUE</p>
        <p className="font-display text-gold-400" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          ₹{quote.price.toLocaleString("en-IN")}
        </p>
        <p className="font-mono-label text-ivory-mute/50 text-[9px] mt-2">
          Valid for 24 hours · Based on current spot price
        </p>
      </div>

      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer text-ivory-mute font-mono-label text-[10px]">
          <span>Show breakdown</span>
          <svg className="w-4 h-4 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </summary>
        <div className="mt-4 p-4 bg-surface-elevated border border-line rounded-[var(--radius-sharp)] space-y-2 text-sm">
          {quote.breakdown.map((line, i) => (
            <div key={i} className="flex justify-between text-ivory-mute">
              <span>{line}</span>
            </div>
          ))}
        </div>
      </details>

      <div className="flex gap-3 justify-center">
        <Button variant="secondary" size="md" onClick={onNewQuote}>New Quote</Button>
        <Button variant="primary" size="md">Proceed to Sell</Button>
      </div>
    </div>
  );
}

function TrustBadge({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const icons: Record<string, React.ReactNode> = {
    lock: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    "shield-check": (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    certificate: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
    "rotate-ccw": (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 4v6h6" />
        <path d="M23 20v-6h-6" />
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
      </svg>
    ),
  };

  return (
    <div className="p-4 border border-gold-700/30 rounded-[var(--radius-sharp)] bg-surface text-center">
      <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-gold-600/10 text-gold-500 rounded-[var(--radius-sharp)]">
        {icons[icon]}
      </div>
      <p className="font-display text-ivory mb-1 text-sm">{title}</p>
      <p className="font-mono-label text-ivory-mute/60 text-[9px]">{desc}</p>
    </div>
  );
}
