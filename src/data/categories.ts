export interface Category {
  id: string;
  label: string;
  description: string;
  image: string;
  href: string;
  metal: "gold" | "silver" | "both";
}

export const CATEGORIES: Category[] = [
  {
    id: "gold-coins",
    label: "Gold Coins",
    description: "24K Pure | BIS Hallmarked",
    image: "/coins/category-gold.jpg",
    href: "/gold",
    metal: "gold",
  },
  {
    id: "silver-coins",
    label: "Silver Coins",
    description: "999 / 999.9 Pure",
    image: "/coins/category-silver.jpg",
    href: "/silver",
    metal: "silver",
  },
  {
    id: "gift-coins",
    label: "Gift Coins",
    description: "Perfect for every occasion",
    image: "/coins/category-gift.jpg",
    href: "/gifting",
    metal: "both",
  },
  {
    id: "premium-collections",
    label: "Premium Collections",
    description: "Limited Edition Designs",
    image: "/coins/category-premium.jpg",
    href: "/collections",
    metal: "both",
  },
];