/**
 * Brand configuration, trust claims, and placeholder flags.
 * Every trust claim must be substantiated before launch.
 */

export const BRAND = {
  name: "Velseron",
  tagline: "Precious metal, struck to be held.",
  description:
    "Serial-numbered gold and silver coins, assayed and delivered insured.",
} as const;

export const CURRENCY = {
  code: "INR",
  symbol: "₹",
  locale: "en-IN",
} as const;

/**
 * Format a number as currency.
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: "currency",
    currency: CURRENCY.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * PLACEHOLDER trust claims.
 * Each claim must be verified and substantiated before any public launch.
 */
export const TRUST_CLAIMS = [
  {
    id: "fineness",
    label: "999.9 Fine",
    description: "Refined to the highest standard of purity.",
    isPlaceholder: true,
  },
  {
    id: "assay",
    label: "Assay Certified",
    description: "Independent purity verification with every coin.",
    isPlaceholder: true,
  },
  {
    id: "serial",
    label: "Serial Numbered",
    description: "Each coin carries a unique serial for traceability.",
    isPlaceholder: true,
  },
  {
    id: "buyback",
    label: "Buy-Back Guarantee",
    description: "Sell back at transparent, market-linked rates.",
    isPlaceholder: true,
  },
  {
    id: "insured",
    label: "Insured Delivery",
    description: "Fully insured from vault to doorstep.",
    isPlaceholder: true,
  },
] as const;

export const PLACEHOLDER_NOTICE =
  "All products, prices, certifications and claims on this site are PLACEHOLDERS for development purposes only. Nothing here constitutes a real offer, financial advice or guarantee." as const;

export const IS_DEV = process.env.NODE_ENV === "development";
