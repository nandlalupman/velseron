"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

const BADGES = [
  { icon: "✓", label: "100% BIS Hallmarked" },
  { icon: "🛡", label: "Insured & Secure Delivery" },
  { icon: "↩", label: "Easy Returns" },
  { icon: "★", label: "Trusted by 50,000+ Customers" },
];

const RIGHT_LINKS = [
  { label: "India's Trusted Precious Metals Store", href: "/" },
  { label: "Track Order", href: "/track" },
  { label: "Help", href: "/help" },
];

export function TopBar() {
  return (
    <div
      className={cn(
        "w-full z-50",
        "bg-ink-0 text-white",
        "hidden md:block",
      )}
      role="banner"
      aria-label="Top announcements"
    >
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <div className="h-9 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-5">
            {BADGES.map((badge) => (
              <span
                key={badge.label}
                className="flex items-center gap-1.5 text-white/80"
              >
                <span className="text-[10px]">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-5 text-white/60">
            {RIGHT_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "hover:text-white transition-colors duration-[var(--dur-sm)] whitespace-nowrap",
                  i === 0 && "text-gold-300 font-medium"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}