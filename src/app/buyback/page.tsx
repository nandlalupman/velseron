import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";

export default function BuybackPage() {
  return (
    <div data-metal="gold">
      <ToastContainer />
      <SiteHeader />

      <section className="pt-32 pb-section bg-bg min-h-screen">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-accent mb-3 text-[10px]">BUY-BACK</p>
            <h1
              className="font-[family-name:var(--font-display)] text-ivory mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Sell back at fair value.
            </h1>
            <p className="text-ivory-mute max-w-lg mb-10">
              We buy back any Velseron coin at transparent, market-linked rates.
              No hidden deductions. Settlement within 3 working days.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="border border-line rounded-[var(--radius-sharp)] p-5">
                <p className="font-mono-label text-accent text-[10px] mb-2">STEP 1</p>
                <p className="text-ivory text-sm font-medium mb-1">Request a quote</p>
                <p className="text-ivory-mute text-xs">Enter your serial number and receive a live quote.</p>
              </div>
              <div className="border border-line rounded-[var(--radius-sharp)] p-5">
                <p className="font-mono-label text-accent text-[10px] mb-2">STEP 2</p>
                <p className="text-ivory text-sm font-medium mb-1">Ship your coin</p>
                <p className="text-ivory-mute text-xs">We provide a prepaid, insured shipping label.</p>
              </div>
              <div className="border border-line rounded-[var(--radius-sharp)] p-5">
                <p className="font-mono-label text-accent text-[10px] mb-2">STEP 3</p>
                <p className="text-ivory text-sm font-medium mb-1">Receive payment</p>
                <p className="text-ivory-mute text-xs">Funds are transferred within 3 working days.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Button variant="primary" size="lg">
              Get a buy-back quote
            </Button>
            <p className="font-mono-label text-ivory-mute/40 text-[9px] mt-3">
              PLACEHOLDER — BUY-BACK NOT FUNCTIONAL
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
