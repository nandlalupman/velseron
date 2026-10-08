import Link from "next/link";
import { BRAND, PLACEHOLDER_NOTICE } from "@/lib/config";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";

const shopLinks = [
  { label: "Gold Coins", href: "/gold" },
  { label: "Silver Coins", href: "/silver" },
  { label: "Collections", href: "/collections" },
  { label: "Gifting", href: "/gifting" },
  { label: "Occasions", href: "/occasions" },
  { label: "Customize", href: "/customize" },
  { label: "Corporate Gifts", href: "/corporate" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Craft", href: "/craft" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Track Order", href: "/track" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Buy-Back", href: "/buyback" },
  { label: "Verify Certificate", href: "/verify" },
  { label: "FAQs", href: "/faqs" },
];

const paymentMethods = ["Visa", "Mastercard", "RuPay", "UPI", "NetBanking"];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: "ig" },
  { label: "Twitter", href: "https://twitter.com", icon: "tw" },
  { label: "YouTube", href: "https://youtube.com", icon: "yt" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
];

export function Footer() {
  return (
    <footer className="bg-premium-0 border-t border-gold-700/30" role="contentinfo">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] py-16">
        {/* Top row: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand + Newsletter + Social */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-6" aria-label={`${BRAND.name} home`}>
              <span
                className="font-[family-name:var(--font-display)] text-ivory block"
                style={{ fontSize: "1.75rem" }}
              >
                {BRAND.name}
              </span>
            </Link>
            <p className="text-ivory-mute text-sm max-w-xs mb-8">
              {BRAND.description}
            </p>

            {/* Newsletter */}
            <form className="flex flex-col gap-2 mb-8" action="/newsletter" method="POST">
              <label htmlFor="footer-email" className="font-mono-label text-gold-500 text-[10px] mb-1">
                NEWSLETTER
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-surface border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-accent"
                  required
                />
                <button type="submit" className="px-4 py-3 bg-gold-500 text-ink-0 font-medium rounded-[var(--radius-sharp)] hover:bg-gold-300 hover:text-ink-0 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="font-mono-label text-ivory-mute/50 text-[9px]">Unsubscribe anytime. No spam.</p>
            </form>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-surface border border-line text-ivory-mute hover:text-accent hover:border-accent transition-colors rounded-full"
                  aria-label={social.label}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Shop */}
          <nav aria-label="Shop navigation">
            <h3 className="font-mono-label text-ivory-mute mb-4 text-[10px]">SHOP</h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory-mute text-sm hover:text-ivory transition-colors duration-[var(--dur-sm)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Company */}
          <nav aria-label="Company navigation">
            <h3 className="font-mono-label text-ivory-mute mb-4 text-[10px]">COMPANY</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory-mute text-sm hover:text-ivory transition-colors duration-[var(--dur-sm)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4: Support */}
          <nav aria-label="Support navigation">
            <h3 className="font-mono-label text-ivory-mute mb-4 text-[10px]">SUPPORT</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory-mute text-sm hover:text-ivory transition-colors duration-[var(--dur-sm)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Middle: Coin Visual + Payment Methods */}
        <div className="flex flex-col md:flex-row items-center justify-between py-12 border-y border-gold-700/20 gap-8">
          <div className="flex items-center justify-center md:justify-start">
            <CoinPosterSVG metal="gold" size={100} className="opacity-80" />
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
            {paymentMethods.map((name) => (
              <span
                key={name}
                className="px-3 py-1.5 border border-gold-700/30 text-ivory-mute text-[9px] font-mono-label rounded-[var(--radius-sharp)]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: Copyright + Policies + India */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-gold-700/20">
          <p className="text-ivory-mute/50 text-xs">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-sm">
            <Link href="/privacy" className="text-ivory-mute/70 hover:text-ivory transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-ivory-mute/70 hover:text-ivory transition-colors">Terms & Conditions</Link>
            <Link href="/shipping-policy" className="text-ivory-mute/70 hover:text-ivory transition-colors">Shipping Policy</Link>
            <Link href="/refund-policy" className="text-ivory-mute/70 hover:text-ivory transition-colors">Refund Policy</Link>
          </div>
          <span className="font-mono-label text-gold-500 text-[10px]">INDIA</span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const size = 18;
  switch (name) {
    case "ig":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "tw":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      );
    case "yt":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.44 24.12 24.12 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.44 24.12 24.12 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
          <path d="M10 10l7 4-7 4v-8z" />
        </svg>
      );
    case "in":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    default:
      return null;
  }
}
