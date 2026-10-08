"use client";

import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

const TRUST_FEATURES = [
  {
    id: "bis",
    icon: "certificate",
    title: "BIS Hallmarked",
    description: "Every coin bears the Bureau of Indian Standards hallmark — your guarantee of declared purity and weight.",
  },
  {
    id: "insured",
    icon: "shield-check",
    title: "100% Authentic",
    description: "No hidden charges. Every coin is genuine, serial-verified, and backed by our certificate of authenticity.",
  },
  {
    id: "secure-pay",
    icon: "package",
    title: "Transparent Pricing",
    description: "Live market-linked rates updated every 10 minutes. You pay exactly what the market says — nothing hidden.",
  },
  {
    id: "packaging",
    icon: "lock",
    title: "Tamper-Proof Packaging",
    description: "Sealed & secure tamper-evident packaging with velvet presentation boxes — gift-ready, vault-ready.",
  },
  {
    id: "delivery",
    icon: "truck",
    title: "Insured Delivery",
    description: "Fully insured transit from our vault to your door. Safe to your doorstep, every single time.",
  },
  {
    id: "support",
    icon: "headphones",
    title: "Dedicated Support",
    description: "Precious metals specialists here for you always. Call, WhatsApp, or email — Mon–Sat, 9 AM–7 PM IST.",
  },
];

function FeatureIcon({ name, className }: { name: string; className?: string }) {
  const size = 24;
  switch (name) {
    case "certificate":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      );
    case "shield-check":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "lock":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "package":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case "truck":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="1" y="3" width="15" height="13" rx="1" />
          <path d="M16 8h4l3 5v4h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case "headphones":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z" />
          <path d="M21 11h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-5Z" />
          <path d="M5 11a7 7 0 0 1 14 0" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l2 2" />
        </svg>
      );
  }
}

export function TrustFeatures({ className }: { className?: string }) {
  return (
    <section className={cn("py-section bg-white border-t border-light-border", className)} aria-labelledby="trust-heading">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <Reveal>
          <header className="text-center mb-12">
            <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">WHY LOVELWK.COM?</p>
            <h2 id="trust-heading" className="font-[family-name:var(--font-display)] text-dark-text mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              Trust is our biggest reward
            </h2>
            <p className="text-muted-text max-w-xl mx-auto text-sm">
              From minting to delivery, we've built layers of assurance so you
              can buy with absolute confidence.
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRUST_FEATURES.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof TRUST_FEATURES[0]; index: number }) {
  return (
    <article
      className={cn(
        "group relative p-6 bg-white border border-light-border rounded-xl",
        "hover:border-gold-500/60 hover:shadow-md",
        "transition-all duration-300"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Icon box */}
      <div className={cn(
        "w-12 h-12 flex items-center justify-center mb-5 rounded-xl",
        "bg-gold-600/10 text-gold-600",
        "group-hover:bg-gold-600 group-hover:text-white",
        "transition-all duration-300"
      )}>
        <FeatureIcon name={feature.icon} />
      </div>

      <h3 className="font-semibold text-dark-text mb-2 text-base group-hover:text-gold-700 transition-colors">
        {feature.title}
      </h3>
      <p className="text-muted-text text-sm leading-relaxed">
        {feature.description}
      </p>
    </article>
  );
}