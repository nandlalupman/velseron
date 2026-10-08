/**
 * Brand configuration, trust claims, and placeholder flags.
 * Every trust claim must be substantiated before launch.
 */

export const BRAND = {
  name: "LoveLWK.com",
  tagline: "Pure Gold. Pure Silver. A Prosperous Tomorrow.",
  description:
    "BIS Hallmarked gold & silver coins. Insured delivery across India. Premium gifting & investment.",
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
 * LOVE LWK trust claims.
 * Each claim must be verified and substantiated before any public launch.
 */
export const TRUST_CLAIMS = [
  {
    id: "bis",
    label: "100% BIS Hallmarked",
    description: "Government-certified purity guarantee.",
    isPlaceholder: true,
  },
  {
    id: "insured",
    label: "Insured Delivery",
    description: "Fully insured from vault to doorstep.",
    isPlaceholder: true,
  },
  {
    id: "secure",
    label: "Secure Payments",
    description: "PCI-DSS compliant payment processing.",
    isPlaceholder: true,
  },
  {
    id: "packaging",
    label: "Premium Packaging",
    description: "Tamper-proof, gift-ready presentation.",
    isPlaceholder: true,
  },
  {
    id: "returns",
    label: "Easy Returns",
    description: "7-day return on unopened seals.",
    isPlaceholder: true,
  },
  {
    id: "support",
    label: "Dedicated Support",
    description: "Expert guidance via chat, call, email.",
    isPlaceholder: true,
  },
] as const;

export const PLACEHOLDER_NOTICE =
  "All products, prices, certifications and claims on this site are PLACEHOLDERS for development purposes only. Nothing here constitutes a real offer, financial advice or guarantee." as const;

export const IS_DEV = process.env.NODE_ENV === "development";
