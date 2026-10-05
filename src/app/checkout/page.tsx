import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";

export default function CheckoutPage() {
  return (
    <div data-metal="gold">
      <ToastContainer />
      <SiteHeader />

      <section className="pt-32 pb-section bg-bg min-h-screen">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-accent mb-3 text-[10px]">CHECKOUT</p>
            <h1
              className="font-[family-name:var(--font-display)] text-ivory mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Checkout
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-lg p-8 border border-line rounded-[var(--radius-sharp)] bg-surface">
              <p className="text-ivory-mute text-sm mb-6">
                This is a placeholder checkout page. No payment processing is
                connected. In a production environment, this page would collect
                shipping details, display a final order summary, and integrate
                with a payment gateway.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="font-mono-label text-ivory-mute text-[10px] block mb-2">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-accent"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label className="font-mono-label text-ivory-mute text-[10px] block mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-accent"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="font-mono-label text-ivory-mute text-[10px] block mb-2">
                    SHIPPING ADDRESS
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-accent resize-none"
                    placeholder="Address"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 border border-warn/30 rounded-[var(--radius-sharp)] bg-warn/5">
                <p className="font-mono-label text-warn text-[10px] mb-1">
                  PLACEHOLDER
                </p>
                <p className="text-ivory-mute text-xs">
                  This checkout is not functional. No data is collected or
                  transmitted. No charges will be made.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
