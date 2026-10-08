"use client";

import { useState } from "react";
import { useMetalPrice } from "@/hooks/useMetalPrice";
import { Calculator } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function PriceCalculator() {
  const prices = useMetalPrice();
  const [metal, setMetal] = useState<"gold" | "silver">("gold");
  const [weight, setWeight] = useState<number>(10);

  const rate = metal === "gold" ? prices.goldPerGram : prices.silverPerGram;
  const rawPrice = rate * weight;
  const makingCharge = rawPrice * 0.08; // 8% making charge
  const gst = (rawPrice + makingCharge) * 0.03; // 3% GST
  const finalPrice = rawPrice + makingCharge + gst;

  return (
    <section className="py-24 bg-light-surface border-y border-light-border">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] max-w-5xl">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-dark-text mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Live Price Calculator
            </h2>
            <p className="text-muted-text max-w-xl mx-auto text-sm">
              Transparent pricing. No hidden fees. See exactly how our prices are calculated.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-lg border border-light-border grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-8">
              <div>
                <label className="font-mono text-xs tracking-widest uppercase text-muted-text mb-3 block">Select Metal</label>
                <div className="flex bg-light-surface p-1.5 rounded-full border border-light-border">
                  <button
                    onClick={() => setMetal("gold")}
                    className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${metal === "gold" ? "bg-gold-500 text-dark-text shadow-md" : "text-muted-text hover:text-dark-text"}`}
                  >
                    24K Gold
                  </button>
                  <button
                    onClick={() => setMetal("silver")}
                    className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${metal === "silver" ? "bg-slate-800 text-white shadow-md" : "text-muted-text hover:text-dark-text"}`}
                  >
                    999 Silver
                  </button>
                </div>
              </div>

              <div>
                <label className="font-mono text-xs tracking-widest uppercase text-muted-text mb-3 block">Select Weight (Grams)</label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 5, 10, 50].map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(w)}
                      className={`py-3 rounded-2xl text-sm font-semibold border transition-all duration-300 ${weight === w ? "border-gold-500 bg-gold-50 text-gold-700 shadow-sm" : "border-light-border text-muted-text hover:border-gold-300 hover:bg-gold-50/50"}`}
                    >
                      {w}g
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-light-surface rounded-2xl p-8 border border-light-border flex flex-col justify-center">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-text">Live Rate ({weight}g × ₹{rate.toLocaleString("en-IN", { maximumFractionDigits: 0 })})</span>
                  <span className="font-mono text-dark-text">₹{rawPrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-text">Making Charges (8%)</span>
                  <span className="font-mono text-dark-text">₹{makingCharge.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-text">GST (3%)</span>
                  <span className="font-mono text-dark-text">₹{gst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="w-full h-px bg-light-border my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-medium text-dark-text">Total Estimate</span>
                  <span className="font-mono text-3xl text-gold-600 font-bold tracking-tight">₹{finalPrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 bg-dark-text text-white py-4 rounded-full hover:bg-black transition-colors font-semibold shadow-md">
                <Calculator className="w-5 h-5" />
                Shop {weight}g {metal === "gold" ? "Gold" : "Silver"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
