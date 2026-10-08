"use client";

import { cn } from "@/lib/cn";
import { TRUST_CLAIMS } from "@/lib/config";

export function TrustBadgesRow({ className }: { className?: string }) {
  const badges = [
    { icon: "bis", label: "BIS Hallmarked", sub: "Certified Purity" },
    { icon: "purity", label: "999 / 999.9", sub: "Pure & Authentic" },
    { icon: "insured", label: "Insured Delivery", sub: "Safe to Your Doorstep" },
    { icon: "secure", label: "Secure Payments", sub: "100% Protected" },
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4",
        className
      )}
      role="list"
      aria-label="Trust badges"
    >
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-2"
          role="listitem"
        >
          <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white/20 rounded-lg">
            <BadgeIcon name={badge.icon} />
          </div>
          <div>
            <p className="text-white font-semibold text-xs leading-tight">{badge.label}</p>
            <p className="text-white/60 text-[10px] leading-tight">{badge.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BadgeIcon({ name }: { name: string }) {
  const size = 18;
  switch (name) {
    case "bis":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
        </svg>
      );
    case "purity":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "insured":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="1" />
          <path d="M16 8h4l3 5v4h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case "secure":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    default:
      return null;
  }
}