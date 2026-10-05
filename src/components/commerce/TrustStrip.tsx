"use client";

import { cn } from "@/lib/cn";
import { TRUST_CLAIMS } from "@/lib/config";

export function TrustStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-line",
        className
      )}
    >
      {TRUST_CLAIMS.map((claim) => (
        <div
          key={claim.id}
          className="bg-bg px-4 py-5 flex flex-col items-center text-center"
        >
          {/* Icon placeholder — hairline SVG */}
          <div className="w-8 h-8 mb-3 flex items-center justify-center">
            <TrustIcon id={claim.id} />
          </div>
          <p className="font-mono-label text-accent text-[10px] mb-1">
            {claim.label}
          </p>
          <p className="text-ivory-mute text-xs leading-snug">
            {claim.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function TrustIcon({ id }: { id: string }) {
  const stroke = "var(--accent)";
  const props = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1,
  };

  switch (id) {
    case "fineness":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <text
            x="12"
            y="12"
            textAnchor="middle"
            dominantBaseline="central"
            fill={stroke}
            fontSize="6"
            fontFamily="monospace"
          >
            999
          </text>
        </svg>
      );
    case "assay":
      return (
        <svg {...props}>
          <path d="M9 12l2 2 4-4" />
          <rect x="4" y="4" width="16" height="16" rx="1" />
        </svg>
      );
    case "serial":
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="10" rx="1" />
          <line x1="7" y1="10" x2="7" y2="14" />
          <line x1="9" y1="10" x2="9" y2="14" />
          <line x1="12" y1="10" x2="12" y2="14" />
          <line x1="14" y1="10" x2="14" y2="14" />
          <line x1="17" y1="10" x2="17" y2="14" />
        </svg>
      );
    case "buyback":
      return (
        <svg {...props}>
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      );
    case "insured":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
