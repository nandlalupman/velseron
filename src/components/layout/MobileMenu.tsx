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

const links = [
  { href: "/gold", label: "Gold" },
  { href: "/silver", label: "Silver" },
  { href: "/learn", label: "Learn" },
  { href: "/verify", label: "Verify" },
  { href: "/buyback", label: "Buy-Back" },
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
          <nav className="flex-1 flex flex-col justify-center px-[var(--grid-gutter)] gap-2">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ...TRANSITION.reveal,
                  delay: i * 0.06,
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "block py-3",
                    "font-[family-name:var(--font-display)] text-ivory",
                    "text-[clamp(2rem,6vw,3rem)] leading-tight tracking-tight",
                    "hover:text-accent transition-colors duration-[var(--dur-sm)]"
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom: Metal info */}
          <div className="px-[var(--grid-gutter)] pb-8">
            <div className="hairline mb-4" />
            <p className="font-mono-label text-ivory-mute text-[10px]">
              {BRAND.name} — Precious metal, precisely struck.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
