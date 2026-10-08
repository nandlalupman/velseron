"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { BRAND } from "@/lib/config";
import { TRANSITION } from "@/lib/motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const navSections = [
  {
    label: "SHOP",
    links: [
      { href: "/gold", label: "Gold Coins" },
      { href: "/silver", label: "Silver Coins" },
      { href: "/collections", label: "Collections" },
    ],
  },
  {
    label: "GIFTING",
    links: [
      { href: "/gifting", label: "Gift Coins" },
      { href: "/occasions", label: "Occasions" },
      { href: "/customize", label: "Customize" },
      { href: "/corporate", label: "Corporate Gifts" },
    ],
  },
  {
    label: "COMPANY",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/learn", label: "Learn" },
      { href: "/verify", label: "Verify Certificate" },
      { href: "/buyback", label: "Buy-Back" },
    ],
  },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={TRANSITION.modal}
          className="fixed inset-0 z-50 bg-bg flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-[var(--grid-gutter)] h-16">
            <span
              className="font-[family-name:var(--font-display)] text-ivory"
              style={{ fontSize: "1.25rem" }}
            >
              {BRAND.name}
            </span>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-ivory-mute hover:text-ivory transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              >
                <path d="M4 4L16 16M16 4L4 16" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col justify-start px-[var(--grid-gutter)] pt-8 gap-8 overflow-y-auto">
            {navSections.map((section, sectionIndex) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ...TRANSITION.reveal,
                  delay: sectionIndex * 0.08,
                }}
              >
                <p className="font-mono-label text-accent text-[10px] mb-4">{section.label}</p>
                <div className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        ...TRANSITION.reveal,
                        delay: sectionIndex * 0.08 + linkIndex * 0.04,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "block py-2",
                          "font-[family-name:var(--font-display)] text-ivory",
                          "text-[clamp(1.5rem,5vw,2.5rem)] leading-tight tracking-tight",
                          "hover:text-accent transition-colors duration-[var(--dur-sm)]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </nav>

          {/* Bottom: Account actions */}
          <div className="px-[var(--grid-gutter)] pb-8 border-t border-line">
            <div className="flex flex-col gap-3 mb-6">
              <Link href="/account" onClick={onClose} className="text-center py-3 bg-accent text-ink-0 font-medium rounded-[var(--radius-sharp)]">
                My Account
              </Link>
              <Link href="/wishlist" onClick={onClose} className="text-center py-3 border border-line text-ivory font-medium rounded-[var(--radius-sharp)] hover:border-accent hover:text-accent transition-colors">
                Wishlist
              </Link>
            </div>
            <div className="hairline mb-4" />
            <p className="font-mono-label text-ivory-mute text-[10px] text-center">
              {BRAND.name} — Precious metal, precisely struck.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
