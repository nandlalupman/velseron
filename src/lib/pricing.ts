/**
 * Pricing utilities.
 * price = weightGrams × (fineness / 1000) × spotPerGram × (1 + premiumPct / 100)
 */

export function calculatePrice(
  weightGrams: number,
  fineness: number,
  spotPerGram: number,
  premiumPct: number
): number {
  return weightGrams * (fineness / 1000) * spotPerGram * (1 + premiumPct / 100);
}

export function calculatePricePerGram(
  totalPrice: number,
  weightGrams: number
): number {
  return totalPrice / weightGrams;
}

export interface PriceBreakdownData {
  metalValue: number;
  premium: number;
  taxPlaceholder: number;
  total: number;
}

export function getPriceBreakdown(
  weightGrams: number,
  fineness: number,
  spotPerGram: number,
  premiumPct: number,
  taxPct: number = 3 // GST placeholder
): PriceBreakdownData {
  const metalValue = weightGrams * (fineness / 1000) * spotPerGram;
  const premium = metalValue * (premiumPct / 100);
  const subtotal = metalValue + premium;
  const taxPlaceholder = subtotal * (taxPct / 100);
  const total = subtotal + taxPlaceholder;

  return {
    metalValue,
    premium,
    taxPlaceholder,
    total,
  };
}
