import type { Metal } from "@/data/coins";

type CoinMetal = Metal | "both";

interface CoinPosterSVGProps {
  metal: CoinMetal;
  size?: number;
  className?: string;
  /** Show front or back face */
  face?: "obverse" | "reverse";
}

/**
 * Pure CSS/SVG coin poster — no images, no AI generation.
 * Used as placeholder until real 3D-rendered posters replace them.
 *
 * Gold: warm radial sunburst (Meridian design).
 * Silver: geometric lattice pattern.
 */
export function CoinPosterSVG({
  metal,
  size = 320,
  className,
  face = "obverse",
}: CoinPosterSVGProps) {
  const isGold = metal === "gold" || metal === "both";

  const bg = isGold ? "#1A1610" : "#10131A";
  const coinBody = isGold ? "#C9A24B" : "#C4CAD2";
  const coinDark = isGold ? "#8A6A2F" : "#7F8894";
  const coinLight = isGold ? "#E8CF8E" : "#F3F5F7";
  const rimHighlight = isGold ? "#E8CF8E" : "#E8ECF0";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${metal} coin ${face} view, placeholder design`}
    >
      <defs>
        {/* Radial spotlight behind coin */}
        <radialGradient id={`spot-${metal}`} cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={isGold ? "#C9A24B" : "#7F8894"} stopOpacity="0.15" />
          <stop offset="100%" stopColor={bg} stopOpacity="0" />
        </radialGradient>

        {/* Coin face gradient */}
        <linearGradient id={`face-${metal}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={coinLight} />
          <stop offset="50%" stopColor={coinBody} />
          <stop offset="100%" stopColor={coinDark} />
        </linearGradient>

        {/* Rim highlight */}
        <linearGradient id={`rim-${metal}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={rimHighlight} stopOpacity="0.6" />
          <stop offset="50%" stopColor={coinDark} stopOpacity="0.3" />
          <stop offset="100%" stopColor={rimHighlight} stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="400" fill={bg} />

      {/* Spotlight */}
      <rect width="400" height="400" fill={`url(#spot-${metal})`} />

      {/* Shadow */}
      <ellipse cx="200" cy="330" rx="100" ry="12" fill="black" opacity="0.4" />

      {/* Coin body — outer rim */}
      <circle cx="200" cy="195" r="145" fill={`url(#rim-${metal})`} />

      {/* Coin field */}
      <circle cx="200" cy="195" r="136" fill={`url(#face-${metal})`} />

      {/* Inner rim line */}
      <circle cx="200" cy="195" r="128" fill="none" stroke={coinDark} strokeWidth="0.5" opacity="0.5" />

      {face === "obverse" ? (
        /* ── Obverse: Meridian sunburst / Lattice pattern ── */
        <>
          {/* Radial sunburst lines (Meridian) or lattice (Silver) */}
          {isGold ? (
            /* Gold — radial sunburst */
            <g opacity="0.25">
              {Array.from({ length: 36 }).map((_, i) => (
                <line
                  key={i}
                  x1="200"
                  y1="195"
                  x2={200 + 120 * Math.cos((i * 10 * Math.PI) / 180)}
                  y2={195 + 120 * Math.sin((i * 10 * Math.PI) / 180)}
                  stroke={coinLight}
                  strokeWidth="0.5"
                />
              ))}
            </g>
          ) : (
            /* Silver — geometric lattice */
            <g opacity="0.2">
              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="80"
                  y1={110 + i * 28}
                  x2="320"
                  y2={110 + i * 28}
                  stroke={coinLight}
                  strokeWidth="0.4"
                />
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={110 + i * 28}
                  y1="75"
                  x2={110 + i * 28}
                  y2="315"
                  stroke={coinLight}
                  strokeWidth="0.4"
                />
              ))}
              {/* Diagonal cross */}
              <line x1="100" y1="95" x2="300" y2="295" stroke={coinLight} strokeWidth="0.3" />
              <line x1="300" y1="95" x2="100" y2="295" stroke={coinLight} strokeWidth="0.3" />
            </g>
          )}

          {/* Central weight numeral */}
          <text
            x="200"
            y="195"
            textAnchor="middle"
            dominantBaseline="central"
            fill={coinDark}
            fontFamily="Georgia, serif"
            fontSize="42"
            fontWeight="400"
            letterSpacing="-1"
            opacity="0.7"
          >
            {isGold ? "1 oz" : "1 oz"}
          </text>

          {/* Concentric detail rings */}
          <circle cx="200" cy="195" r="70" fill="none" stroke={coinDark} strokeWidth="0.3" opacity="0.3" />
          <circle cx="200" cy="195" r="100" fill="none" stroke={coinDark} strokeWidth="0.3" opacity="0.2" />

          {/* Brand name arc — top */}
          <text
            x="200"
            y="112"
            textAnchor="middle"
            fill={coinDark}
            fontFamily="monospace"
            fontSize="8"
            letterSpacing="4"
            opacity="0.5"
          >
            VELSERON
          </text>
        </>
      ) : (
        /* ── Reverse: purity, weight, brand ── */
        <>
          <text
            x="200"
            y="160"
            textAnchor="middle"
            fill={coinDark}
            fontFamily="monospace"
            fontSize="9"
            letterSpacing="3"
            opacity="0.5"
          >
            {isGold ? "FINE GOLD 999.9" : "FINE SILVER 999"}
          </text>
          <text
            x="200"
            y="195"
            textAnchor="middle"
            dominantBaseline="central"
            fill={coinDark}
            fontFamily="Georgia, serif"
            fontSize="28"
            fontWeight="400"
            opacity="0.6"
          >
            {isGold ? "31.1035 g" : "31.1035 g"}
          </text>
          <line x1="150" y1="220" x2="250" y2="220" stroke={coinDark} strokeWidth="0.5" opacity="0.3" />
          <text
            x="200"
            y="240"
            textAnchor="middle"
            fill={coinDark}
            fontFamily="monospace"
            fontSize="7"
            letterSpacing="2"
            opacity="0.4"
          >
            SERIAL: 000000
          </text>
          <text
            x="200"
            y="270"
            textAnchor="middle"
            fill={coinDark}
            fontFamily="monospace"
            fontSize="8"
            letterSpacing="4"
            opacity="0.5"
          >
            VELSERON
          </text>
        </>
      )}

      {/* Top highlight arc */}
      <path
        d={`M 120 120 A 120 120 0 0 1 280 120`}
        fill="none"
        stroke={rimHighlight}
        strokeWidth="1"
        opacity="0.15"
      />
    </svg>
  );
}
