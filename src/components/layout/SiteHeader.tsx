"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { BRAND } from "@/lib/config";
import { MetalPricePill } from "./MetalPricePill";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "@/hooks/useCart";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const totalItems = useCart((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40",
          "transition-all duration-[var(--dur-md)]",
          scrolled
            ? "bg-ink-0/90 backdrop-blur-xl border-b border-line"
            : "bg-transparent"
        )}
        style={{ top: "var(--banner-offset, 0px)" }}
      >
        <nav
          className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] h-16 flex items-center justify-between"
          aria-label="Primary"
        >
          {/* Left: Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/gold"
              className="font-mono-label text-ivory-mute hover:text-ivory transition-colors duration-[var(--dur-sm)]"
            >
              Gold
            </Link>
            <Link
              href="/silver"
              className="font-mono-label text-ivory-mute hover:text-ivory transition-colors duration-[var(--dur-sm)]"
            >
              Silver
            </Link>
            <Link
              href="/learn"
              className="font-mono-label text-ivory-mute hover:text-ivory transition-colors duration-[var(--dur-sm)]"
            >
              Learn
            </Link>
          </div>

          {/* Centre: Wordmark */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            <span
              className="font-[family-name:var(--font-display)] text-ivory tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
            >
              {BRAND.name}
            </span>
          </Link>

          {/* Right: Price pill, Cart */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <MetalPricePill />
            </div>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 text-ivory-mute hover:text-ivory transition-colors cursor-pointer"
              aria-label={`Cart, ${totalItems} items`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              >
                <path d="M3 4h1.5l1.2 8.4a1 1 0 001 .85h8.6a1 1 0 001-.85L17 6H5.5" />
                <circle cx="8" cy="17" r="1" fill="currentColor" />
                <circle cx="14" cy="17" r="1" fill="currentColor" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-accent text-ink-0 text-[9px] font-medium rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-ivory-mute hover:text-ivory transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              >
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
