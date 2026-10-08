export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
  product?: string;
}

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Priya Sharma",
    location: "Mumbai, MH",
    rating: 5,
    text: "The Lakshmi 10g coin is absolutely stunning. The detail on the deity is incredible — you can see every lotus petal. Delivery was insured and arrived in a beautiful velvet box. Will definitely buy again for Diwali gifts.",
    date: "2024-10-15",
    product: "Lakshmi 10g",
  },
  {
    id: "rev-2",
    name: "Rajesh Kumar",
    location: "Delhi, NCR",
    rating: 5,
    text: "First time buying gold online and I was nervous. LoveLWK made it seamless — BIS hallmark certificate included, serial number verified on their site. The Ganesha coin is my wife's favorite. Transparent pricing with live gold rates.",
    date: "2024-09-28",
    product: "Ganesha 10g",
  },
  {
    id: "rev-3",
    name: "Anita Desai",
    location: "Bangalore, KA",
    rating: 5,
    text: "Ordered the Radha Krishna silver coin for our anniversary. The packaging alone is worth it — tamper-proof seal, certificate, and a lovely cloth pouch. Customer support helped me choose the right weight. Exceptional experience.",
    date: "2024-08-20",
    product: "Radha Krishna 1oz",
  },
  {
    id: "rev-4",
    name: "Vikram Singh",
    location: "Chandigarh, PB",
    rating: 5,
    text: "Corporate gifting made easy. Ordered 50 Om 5g coins for Diwali clients. They handled engraving our logo on each box, bulk pricing was fair, and everything arrived on schedule with individual certificates. Professional end-to-end.",
    date: "2024-07-12",
    product: "Om 5g (Bulk)",
  },
  {
    id: "rev-5",
    name: "Meera Patel",
    location: "Ahmedabad, GJ",
    rating: 5,
    text: "The Hanuman coin has such powerful energy. The 3D view on the website let me inspect every detail before buying. Insured delivery gave peace of mind. The buy-back guarantee is a nice safety net even though I'll never sell.",
    date: "2024-06-03",
    product: "Hanuman 10g",
  },
  {
    id: "rev-6",
    name: "Arjun Reddy",
    location: "Hyderabad, TG",
    rating: 5,
    text: "Best pricing I found for 24K gold coins. No hidden making charges — premium is shown upfront. The Meridian 1oz is a masterpiece. Serial verification works perfectly. This is how gold buying should be.",
    date: "2024-05-18",
    product: "Meridian 1oz",
  },
  {
    id: "rev-7",
    name: "Kavya Nair",
    location: "Kochi, KL",
    rating: 5,
    text: "Gifted the personalized Lakshmi coin to my parents for their 30th anniversary. The engraving was perfect — their names and wedding date. They were moved to tears. The gift box with marigolds was a beautiful touch.",
    date: "2024-04-22",
    product: "Lakshmi 10g (Personalized)",
  },
  {
    id: "rev-8",
    name: "Sanjay Mehta",
    location: "Pune, MH",
    rating: 5,
    text: "Silver Lattice 100g — geometric perfection. As an engineer, I appreciate the precision. Edge reeding is flawless. Used their buy-back quote tool and got a fair rate instantly. Transparent, trustworthy, premium.",
    date: "2024-03-30",
    product: "Lattice 100g",
  },
];