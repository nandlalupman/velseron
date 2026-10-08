"use client";

import { Shield, CheckCircle, Lock, Truck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: "100% Authentic",
    subtitle: "Certified purity, every coin",
  },
  {
    icon: CheckCircle,
    title: "BIS Hallmarked",
    subtitle: "Bureau of Indian Standards approved",
  },
  {
    icon: Truck,
    title: "Insured Delivery",
    subtitle: "Safe transit from vault to doorstep",
  },
  {
    icon: Lock,
    title: "Secure Packaging",
    subtitle: "Tamper-proof delivery",
  },
];

export function TrustStrip() {
  return (
    <section className="relative py-16 bg-white overflow-hidden border-b border-light-border">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {TRUST_ITEMS.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 mb-5 flex items-center justify-center rounded-full bg-gold-50 group-hover:bg-gold-100 transition-colors">
                  <item.icon className="w-8 h-8 text-gold-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-dark-text mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-text">
                  {item.subtitle}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
