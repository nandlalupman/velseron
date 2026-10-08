"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { BRAND } from "@/lib/config";
import { MetalPricePill } from "./MetalPricePill";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "@/hooks/useCart";

const NAV_LINKS = [
  { href: "/gold", label: "Gold Coins" },
  { href: "/silver", label: "Silver Coins" },
  { href: "/collections", label: "Collections" },
  { href: "/gifting", label: "Gifting" },
  { href: "/about", label: "About Us" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = useCart((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-40",
          "bg-white border-b transition-shadow duration-300",
          scrolled
            ? "shadow-md border-light-border"
            : "border-light-border/50"
        )}
      >
        <nav
          className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] h-16 flex items-center justify-between gap-4"
          aria-label="Primary"
        >
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex-shrink-0"
            aria-label={`${BRAND.name} home`}
          >
            <span
              className="font-[family-name:var(--font-display)] text-dark-text tracking-tight font-bold"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
            >
              {BRAND.name}
            </span>
          </Link>

          {/* Center: Nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dark-text/80 hover:text-gold-600 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Search + icons */}
          <div className="flex items-center gap-1">
            {/* Search bar — desktop only */}
            <div className="hidden lg:block mr-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-light-surface border border-light-border rounded-full text-muted-text hover:border-gold-500 hover:text-dark-text transition-colors cursor-pointer text-sm"
                aria-label="Search products"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="9" r="6" />
                  <path d="M13 13l5 5" />
                </svg>
                Search for coins, gifts, occasions...
              </button>
            </div>

            {/* Account */}
            <button
              className="hidden lg:flex items-center justify-center w-10 h-10 text-muted-text hover:text-dark-text transition-colors cursor-pointer rounded-full"
              aria-label="My account"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25">
                <circle cx="10" cy="7" r="4" />
                <path d="M4 19c0-4 4-6 6-6s6 2 6 6" />
              </svg>
            </button>

            {/* Wishlist */}
            <button
              className="hidden lg:flex items-center justify-center w-10 h-10 text-muted-text hover:text-dark-text transition-colors cursor-pointer rounded-full"
              aria-label="Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25">
                <path d="M10 17.5s-7-4.5-7-9.5c0-2 1.5-4 4-4 1.5 0 2.5 1 3 2 .5-1 1.5-2 3-2 2.5 0 4 2 4 4 0 5-7 9.5-7 9.5z" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 text-muted-text hover:text-dark-text transition-colors cursor-pointer rounded-full"
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
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-gold-600 text-white text-[9px] font-medium rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-muted-text hover:text-dark-text transition-colors cursor-pointer rounded-full"
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

        {/* Search Modal (Desktop) */}
        {searchOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4" onClick={() => setSearchOpen(false)}>
            <div className="w-full max-w-lg bg-white border border-light-border rounded-xl shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-[family-name:var(--font-display)] text-dark-text text-lg">Search</h3>
                <button onClick={() => setSearchOpen(false)} className="text-muted-text hover:text-dark-text text-2xl leading-none cursor-pointer">&times;</button>
              </div>
              <form className="flex gap-2">
                <input
                  type="search"
                  placeholder="Search coins, collections, occasions..."
                  className="flex-1 px-4 py-3 bg-light-surface border border-light-border text-dark-text text-sm rounded-lg placeholder:text-muted-text/60 focus:outline-none focus:border-gold-500"
                  autoFocus
                />
                <button type="submit" className="px-6 py-3 bg-gold-600 text-white font-medium rounded-lg hover:bg-gold-700 transition-colors">
                  Search
                </button>
              </form>
              <p className="mt-3 text-muted-text text-xs text-center">
                Press ESC to close
              </p>
            </div>
          </div>
        )}
      </header>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
