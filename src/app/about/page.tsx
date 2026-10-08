import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "About Us | Velseron",
  description: "Discover the heritage, craftsmanship, and purity behind every Velseron gold and silver coin.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-[calc(var(--header-height)+var(--utility-bar-height))] bg-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#1C1810] to-[#3A2F1A] border-b border-gold-500/20">
        <div className="absolute inset-0 bg-[url('/coins/hero-bg.jpg')] opacity-20 mix-blend-overlay bg-cover bg-center" />
        <div className="relative z-10 max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] text-center">
          <Reveal>
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              Our Legacy
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-white mb-6">
              The Sovereign Standard
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              Velseron was founded on a singular vision: to elevate the act of gifting 
              and investing into an art form. We don't just mint coins; we craft legacies.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal className="order-2 lg:order-1">
            <h2 className="font-[family-name:var(--font-display)] text-4xl text-dark-text mb-6">
              Purity Meets Precision
            </h2>
            <p className="text-muted-text text-base leading-relaxed mb-6">
              Every Velseron coin is a testament to uncompromising quality. Whether it is our 
              <strong> 999.9 Fine Gold</strong> or our <strong>999 Pure Silver</strong>, we ensure 
              that every gram reflects the highest standards of metallurgy and artistry.
            </p>
            <p className="text-muted-text text-base leading-relaxed mb-8">
              We employ state-of-the-art Swiss minting technology combined with traditional 
              Indian design sensibilities. This allows us to achieve flawless mirror finishes, 
              intricate frosted reliefs, and micro-precision detailing that makes every 
              Velseron coin a masterpiece.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-light-border">
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl text-gold-600 mb-2">999.9</p>
                <p className="text-sm font-semibold text-dark-text">Highest Purity</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl text-gold-600 mb-2">100%</p>
                <p className="text-sm font-semibold text-dark-text">BIS Hallmarked</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-light-surface shadow-2xl">
              <Image 
                src="/coins/coins-podium.jpg" 
                alt="Velseron Craftsmanship" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-sm font-semibold tracking-wide uppercase">
                  Swiss Precision. Indian Soul.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Craftsmanship Highlights */}
      <section className="py-24 bg-light-surface border-y border-light-border">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-4xl text-dark-text mb-16">
              The Velseron Promise
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Reveal delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-light-border h-full">
                <div className="w-12 h-12 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-dark-text mb-3">Guaranteed Authenticity</h3>
                <p className="text-sm text-muted-text leading-relaxed">
                  Every coin undergoes rigorous assaying and comes sealed in a tamper-proof 
                  certi-card featuring a unique serial number and BIS Hallmark.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-light-border h-full">
                <div className="w-12 h-12 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-dark-text mb-3">The Divine Series</h3>
                <p className="text-sm text-muted-text leading-relaxed">
                  Our flagship collection features deeply struck, three-dimensional deities 
                  crafted by master sculptors, bringing spirituality to precious metals.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-light-border h-full">
                <div className="w-12 h-12 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-dark-text mb-3">Secure Experience</h3>
                <p className="text-sm text-muted-text leading-relaxed">
                  From live transparent pricing to fully insured doorstep delivery, we ensure 
                  your purchasing journey is as flawless as our products.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-2xl mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-4xl text-dark-text mb-6">
              Begin Your Journey
            </h2>
            <p className="text-muted-text mb-10">
              Explore our collections and find the perfect piece to celebrate your next milestone.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/gold" className="px-8 py-3.5 bg-gold-600 hover:bg-gold-700 text-white font-semibold rounded-lg transition-colors">
                Explore Gold
              </Link>
              <Link href="/silver" className="px-8 py-3.5 bg-white border border-light-border hover:border-dark-text text-dark-text font-semibold rounded-lg transition-colors">
                Explore Silver
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
