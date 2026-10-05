import Link from "next/link";
import { BRAND, PLACEHOLDER_NOTICE } from "@/lib/config";

const navLinks = [
  { label: "Gold Coins", href: "/gold" },
  { label: "Silver Coins", href: "/silver" },
  { label: "Learn", href: "/learn" },
  { label: "Verify Certificate", href: "/verify" },
  { label: "Buy-Back", href: "/buyback" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Risk Disclosure", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-ink-0 border-t border-line" role="contentinfo">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <span
              className="font-[family-name:var(--font-display)] text-ivory block mb-3"
              style={{ fontSize: "1.5rem" }}
            >
              {BRAND.name}
            </span>
            <p className="text-ivory-mute text-sm max-w-xs">
              {BRAND.description}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-mono-label text-ivory-mute mb-4 text-[10px]">
              NAVIGATION
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navLinks.map((link) => (
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

          {/* Legal */}
          <div>
            <h3 className="font-mono-label text-ivory-mute mb-4 text-[10px]">
              LEGAL
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ivory-mute text-sm hover:text-ivory transition-colors duration-[var(--dur-sm)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Payment logos placeholder */}
            <div className="mt-6 flex items-center gap-3">
              {["Visa", "MC", "UPI"].map((name) => (
                <span
                  key={name}
                  className="px-2 py-1 border border-line text-ivory-mute text-[9px] font-mono-label rounded-[var(--radius-sharp)]"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Risk disclosure */}
        <div className="border-t border-line pt-8">
          <p className="text-ivory-mute/60 text-xs leading-relaxed mb-4 max-w-3xl">
            Precious metals are commodities. Their value fluctuates with market
            conditions. Past performance is not indicative of future returns.
            Investment in precious metals involves risk and may not be suitable
            for all investors. This is a placeholder risk disclosure for
            development purposes.
          </p>
          <p className="font-mono-label text-ivory-mute/40 text-[9px]">
            {PLACEHOLDER_NOTICE}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-4 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-ivory-mute/50 text-xs">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="font-mono-label text-ivory-mute/30 text-[9px]">
            PLACEHOLDER · NOT A REAL STORE
          </p>
        </div>
      </div>
    </footer>
  );
}
