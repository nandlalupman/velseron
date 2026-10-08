"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

export function MetalSplit() {
  return (
    <section className="pt-16 pb-24 bg-white border-y border-light-border">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        
        <Reveal>
          <div className="text-center mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-dark-text mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Choose Your Legacy
            </h2>
            <p className="text-muted-text max-w-xl mx-auto text-sm">
              Discover our exclusive collections of pure gold and fine silver coins.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
          {/* Gold Card */}
          <Reveal delay={0.1} className="h-full">
            <Link
              href="/gold"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C1810] to-[#3A2F1A] p-8 md:p-12 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between border border-gold-500/20 h-full"
            >
              <div className="relative z-10">
                <span className="font-mono text-sm tracking-[0.15em] text-gold-300 mb-3 block uppercase font-bold drop-shadow-sm">
                  24K GOLD
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-white mb-4">
                  Gold Collection
                </h2>
                <p className="text-white/80 mb-6 max-w-sm text-sm leading-relaxed">
                  999.9 fine gold coins starting from 5 grams. BIS hallmarked,
                  assay certified, and impeccably minted.
                </p>
              </div>

              <div className="relative z-10 flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-2 text-[#1C1810] bg-gold-400 hover:bg-gold-300 w-max px-7 py-3.5 rounded-full font-semibold transition-colors text-sm shadow-md">
                  <span>Shop Gold</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Decorative Gold Glow & Image */}
              <div className="absolute bottom-[-10%] right-[-10%] w-[60%] aspect-square bg-gold-500/30 rounded-full blur-[80px] group-hover:bg-gold-500/40 transition-all" />
              <div className="absolute bottom-[-5%] right-[-10%] w-[65%] aspect-square flex items-center justify-center opacity-95 group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700">
                <Image src="/coins/card-gold-coin-clean.png" alt="Gold Coin" fill className="object-contain drop-shadow-2xl" sizes="(max-width: 768px) 50vw, 30vw" />
              </div>
            </Link>
          </Reveal>

          {/* Silver Card */}
          <Reveal delay={0.2} className="h-full">
            <Link
              href="/silver"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F4F6F9] to-[#E2E6ED] p-8 md:p-12 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between border border-slate-300 h-full"
            >
              <div className="relative z-10">
                <span className="font-mono text-sm tracking-[0.15em] text-slate-700 mb-3 block uppercase font-bold drop-shadow-sm">
                  999 SILVER
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-dark-text mb-4">
                  Silver Collection
                </h2>
                <p className="text-dark-text/70 mb-6 max-w-sm text-sm leading-relaxed">
                  Pure 999 silver coins from 10 grams to 100 grams. Investment grade,
                  beautifully crafted and securely packaged.
                </p>
              </div>

              <div className="relative z-10 flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-2 text-dark-text bg-white hover:bg-slate-50 border border-slate-300 w-max px-7 py-3.5 rounded-full font-semibold transition-colors shadow-md text-sm">
                  <span>Shop Silver</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Decorative Silver Image Placeholder */}
              <div className="absolute bottom-[-10%] right-[-10%] w-[60%] aspect-square bg-slate-400/20 rounded-full blur-[80px] group-hover:bg-slate-400/30 transition-all" />
              <div className="absolute bottom-[-5%] right-[-10%] w-[65%] aspect-square flex items-center justify-center opacity-95 group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700">
                <Image src="/coins/card-silver-coin-clean.png" alt="Silver Coin" fill className="object-contain drop-shadow-2xl" sizes="(max-width: 768px) 50vw, 30vw" />
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
