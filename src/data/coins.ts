export type Metal = "gold" | "silver";
export type CoinFinish = "proof" | "brilliant" | "satin";
export type CoinEdge = "reeded" | "plain" | "lettered";
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "preorder";

export interface Coin {
  id: string;
  slug: string;
  sku: string;
  metal: Metal;
  name: string;
  series: string;
  tagline: string;
  weightGrams: number;
  fineness: number;
  purityLabel: string;
  dimensions: {
    diameterMm: number;
    thicknessMm: number;
  };
  finish: CoinFinish;
  edge: CoinEdge;
  design: {
    name: string;
    obverse: string;
    reverse: string;
  };
  limited: boolean;
  mintageLimit?: number;
  pricing: {
    premiumPct: number;
    breaks: { minQty: number; premiumPct: number }[];
  };
  stock: {
    status: StockStatus;
    quantity: number;
    restockDate?: string;
  };
  authenticity: {
    assayCertificate: boolean;
    serialNumbered: boolean;
    hallmark?: string;
  };
  badges: string[];
  featured: boolean;
  createdAt: string;
  isPlaceholder: true;
}

/**
 * All product data is PLACEHOLDER.
 * Prices are computed at runtime from the simulated spot feed.
 */
export const COINS: Coin[] = [
  // ═══════════════════════════════════════════
  //  GOLD COINS
  // ═══════════════════════════════════════════
  {
    id: "g-05",
    slug: "gold-meridian-5g",
    sku: "VEL-AU-MER-005",
    metal: "gold",
    name: "Meridian 5 g",
    series: "Meridian",
    tagline: "Entry point to fine gold ownership.",
    weightGrams: 5,
    fineness: 999.9,
    purityLabel: "24K",
    dimensions: { diameterMm: 18, thicknessMm: 1.0 },
    finish: "proof",
    edge: "reeded",
    design: {
      name: "Meridian",
      obverse: "Fine radial sunburst centred on the weight numeral.",
      reverse: "Purity statement, weight, serial area, brand mark.",
    },
    limited: false,
    pricing: {
      premiumPct: 6,
      breaks: [
        { minQty: 3, premiumPct: 5.5 },
        { minQty: 5, premiumPct: 5 },
      ],
    },
    stock: { status: "in_stock", quantity: 42 },
    authenticity: {
      assayCertificate: true,
      serialNumbered: true,
      hallmark: "BIS 999.9",
    },
    badges: [],
    featured: false,
    createdAt: "2024-01-15",
    isPlaceholder: true,
  },
  {
    id: "g-10",
    slug: "gold-lotus-10g",
    sku: "VEL-AU-LOT-010",
    metal: "gold",
    name: "Lotus 10 g",
    series: "Lotus",
    tagline: "Balanced weight, timeless design.",
    weightGrams: 10,
    fineness: 999.9,
    purityLabel: "24K",
    dimensions: { diameterMm: 22, thicknessMm: 1.4 },
    finish: "proof",
    edge: "reeded",
    design: {
      name: "Lotus",
      obverse: "Eight-petal lotus in frosted relief on mirror field.",
      reverse: "Purity statement, weight, serial area, brand mark.",
    },
    limited: false,
    pricing: {
      premiumPct: 6,
      breaks: [
        { minQty: 3, premiumPct: 5.5 },
        { minQty: 5, premiumPct: 5 },
      ],
    },
    stock: { status: "in_stock", quantity: 28 },
    authenticity: {
      assayCertificate: true,
      serialNumbered: true,
      hallmark: "BIS 999.9",
    },
    badges: [],
    featured: false,
    createdAt: "2024-02-01",
    isPlaceholder: true,
  },
  {
    id: "g-20",
    slug: "gold-meridian-20g",
    sku: "VEL-AU-MER-020",
    metal: "gold",
    name: "Meridian 20 g",
    series: "Meridian",
    tagline: "Substantial presence, precise craft.",
    weightGrams: 20,
    fineness: 999.9,
    purityLabel: "24K",
    dimensions: { diameterMm: 28, thicknessMm: 1.7 },
    finish: "proof",
    edge: "reeded",
    design: {
      name: "Meridian",
      obverse: "Fine radial sunburst centred on the weight numeral.",
      reverse: "Purity statement, weight, serial area, brand mark.",
    },
    limited: true,
    mintageLimit: 500,
    pricing: {
      premiumPct: 6,
      breaks: [
        { minQty: 2, premiumPct: 5.5 },
        { minQty: 5, premiumPct: 5 },
      ],
    },
    stock: { status: "low_stock", quantity: 7 },
    authenticity: {
      assayCertificate: true,
      serialNumbered: true,
      hallmark: "BIS 999.9",
    },
    badges: ["Limited Edition"],
    featured: false,
    createdAt: "2024-03-01",
    isPlaceholder: true,
  },
  {
    id: "g-31",
    slug: "gold-meridian-1oz",
    sku: "VEL-AU-MER-031",
    metal: "gold",
    name: "Meridian 1 oz",
    series: "Meridian",
    tagline: "The flagship. One troy ounce of 999.9 fine gold.",
    weightGrams: 31.1035,
    fineness: 999.9,
    purityLabel: "24K",
    dimensions: { diameterMm: 32, thicknessMm: 2.0 },
    finish: "proof",
    edge: "reeded",
    design: {
      name: "Meridian",
      obverse: "Fine radial sunburst centred on the weight numeral.",
      reverse: "Purity statement, weight, serial area, brand mark.",
    },
    limited: true,
    mintageLimit: 250,
    pricing: {
      premiumPct: 6,
      breaks: [
        { minQty: 2, premiumPct: 5.5 },
      ],
    },
    stock: { status: "in_stock", quantity: 18 },
    authenticity: {
      assayCertificate: true,
      serialNumbered: true,
      hallmark: "BIS 999.9",
    },
    badges: ["Flagship", "Limited Edition"],
    featured: true,
    createdAt: "2024-01-01",
    isPlaceholder: true,
  },

  // ═══════════════════════════════════════════
  //  SILVER COINS
  // ═══════════════════════════════════════════
  {
    id: "s-31",
    slug: "silver-lattice-1oz",
    sku: "VEL-AG-LAT-031",
    metal: "silver",
    name: "Lattice 1 oz",
    series: "Lattice",
    tagline: "Pure silver in a geometric framework.",
    weightGrams: 31.1035,
    fineness: 999,
    purityLabel: "999",
    dimensions: { diameterMm: 38, thicknessMm: 2.6 },
    finish: "proof",
    edge: "reeded",
    design: {
      name: "Lattice",
      obverse: "Geometric lattice pattern with central weight numeral.",
      reverse: "Purity statement, weight, serial area, brand mark.",
    },
    limited: false,
    pricing: {
      premiumPct: 14,
      breaks: [
        { minQty: 5, premiumPct: 12 },
        { minQty: 10, premiumPct: 10 },
      ],
    },
    stock: { status: "in_stock", quantity: 85 },
    authenticity: {
      assayCertificate: true,
      serialNumbered: true,
    },
    badges: [],
    featured: true,
    createdAt: "2024-01-10",
    isPlaceholder: true,
  },
  {
    id: "s-50",
    slug: "silver-meridian-50g",
    sku: "VEL-AG-MER-050",
    metal: "silver",
    name: "Meridian 50 g",
    series: "Meridian",
    tagline: "Fifty grams of fine silver, sunburst struck.",
    weightGrams: 50,
    fineness: 999,
    purityLabel: "999",
    dimensions: { diameterMm: 45, thicknessMm: 3.0 },
    finish: "brilliant",
    edge: "reeded",
    design: {
      name: "Meridian",
      obverse: "Fine radial sunburst centred on the weight numeral.",
      reverse: "Purity statement, weight, serial area, brand mark.",
    },
    limited: false,
    pricing: {
      premiumPct: 14,
      breaks: [
        { minQty: 3, premiumPct: 12 },
        { minQty: 10, premiumPct: 10 },
      ],
    },
    stock: { status: "out_of_stock", quantity: 0, restockDate: "2024-06-15" },
    authenticity: {
      assayCertificate: true,
      serialNumbered: true,
    },
    badges: [],
    featured: false,
    createdAt: "2024-02-20",
    isPlaceholder: true,
  },
  {
    id: "s-100",
    slug: "silver-lattice-100g",
    sku: "VEL-AG-LAT-100",
    metal: "silver",
    name: "Lattice 100 g",
    series: "Lattice",
    tagline: "A significant silver holding in geometric form.",
    weightGrams: 100,
    fineness: 999,
    purityLabel: "999",
    dimensions: { diameterMm: 55, thicknessMm: 4.0 },
    finish: "proof",
    edge: "reeded",
    design: {
      name: "Lattice",
      obverse: "Geometric lattice pattern with central weight numeral.",
      reverse: "Purity statement, weight, serial area, brand mark.",
    },
    limited: true,
    mintageLimit: 1000,
    pricing: {
      premiumPct: 14,
      breaks: [
        { minQty: 2, premiumPct: 12 },
        { minQty: 5, premiumPct: 10 },
      ],
    },
    stock: { status: "in_stock", quantity: 34 },
    authenticity: {
      assayCertificate: true,
      serialNumbered: true,
    },
    badges: ["Limited Edition"],
    featured: false,
    createdAt: "2024-03-15",
    isPlaceholder: true,
  },
];

export function getCoinBySlug(slug: string): Coin | undefined {
  return COINS.find((c) => c.slug === slug);
}

export function getCoinsByMetal(metal: Metal): Coin[] {
  return COINS.filter((c) => c.metal === metal);
}

export function getFeaturedCoins(): Coin[] {
  return COINS.filter((c) => c.featured);
}
