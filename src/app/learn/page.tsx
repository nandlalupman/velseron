import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";

export default function LearnPage() {
  return (
    <div data-metal="gold">
      <ToastContainer />
      <SiteHeader />

      <section className="pt-32 pb-section bg-bg">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-accent mb-3 text-[10px]">LEARN</p>
            <h1
              className="font-[family-name:var(--font-display)] text-ivory mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Understanding precious metals
            </h1>
            <p className="text-ivory-mute max-w-lg mb-12">
              A practical guide to gold and silver as tangible assets.
              How coins are minted, priced, certified and stored.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Reveal>
              <article className="border-t border-line pt-6">
                <p className="font-mono-label text-accent text-[10px] mb-3">BASICS</p>
                <h2 className="text-ivory text-xl font-medium mb-3">
                  Why precious metals
                </h2>
                <p className="text-ivory-mute text-sm leading-relaxed">
                  Gold and silver have served as stores of value for millennia.
                  Unlike paper currency, they cannot be printed. Unlike digital
                  assets, they are physical and self-custodied. A coin is a
                  tangible, portable, private holding.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.1}>
              <article className="border-t border-line pt-6">
                <p className="font-mono-label text-accent text-[10px] mb-3">PRICING</p>
                <h2 className="text-ivory text-xl font-medium mb-3">
                  Spot price and premiums
                </h2>
                <p className="text-ivory-mute text-sm leading-relaxed">
                  The spot price is the current market value per gram of raw
                  metal. The premium covers refining, minting, assay
                  certification, packaging and distribution. Premiums are
                  typically 3–8% for gold and 10–18% for silver.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.15}>
              <article className="border-t border-line pt-6">
                <p className="font-mono-label text-accent text-[10px] mb-3">CERTIFICATION</p>
                <h2 className="text-ivory text-xl font-medium mb-3">
                  Assay and serial numbers
                </h2>
                <p className="text-ivory-mute text-sm leading-relaxed">
                  Each coin is tested using X-ray fluorescence spectroscopy.
                  The result is recorded against a unique serial number
                  engraved during minting. This serial links the coin to its
                  digital certificate, verifiable online.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.2}>
              <article className="border-t border-line pt-6">
                <p className="font-mono-label text-accent text-[10px] mb-3">STORAGE</p>
                <h2 className="text-ivory text-xl font-medium mb-3">
                  Handling and care
                </h2>
                <p className="text-ivory-mute text-sm leading-relaxed">
                  Coins are sealed in tamper-evident capsules. Handle by the
                  edge only. Store in a cool, dry environment away from direct
                  sunlight. Avoid cleaning — it can reduce both surface quality
                  and resale value.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
