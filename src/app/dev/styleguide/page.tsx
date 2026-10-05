"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal, ModalClose } from "@/components/ui/Modal";
import { Drawer } from "@/components/ui/Drawer";
import { Accordion } from "@/components/ui/Accordion";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer, showToast } from "@/components/ui/Toast";
import { BRAND, TRUST_CLAIMS } from "@/lib/config";

const accordionItems = [
  {
    title: "Shipping & Delivery",
    content:
      "All orders are dispatched within 2 working days. Coins are sealed in tamper-evident packaging, fully insured from vault to doorstep. Delivery timelines vary by region.",
  },
  {
    title: "Buy-Back Policy",
    content:
      "We offer a transparent buy-back at market-linked rates. Contact our team for a current quote. Settlement is completed within 3 working days.",
  },
  {
    title: "Certification & Assay",
    content:
      "Each coin ships with an independent assay certificate verifying metal purity, weight and serial number. Certificates are digitally verifiable.",
  },
];

type ViewOption = "front" | "back" | "edge";

export default function StyleGuidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [metalView, setMetalView] = useState<ViewOption>("front");
  const [activeMetal, setActiveMetal] = useState<"gold" | "silver">("gold");

  return (
    <div data-metal={activeMetal} className="min-h-screen bg-bg">
      <ToastContainer />

      {/* ── Header ─────────────────────────────── */}
      <header className="border-b border-line">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] py-8">
          <h1 className="font-display text-ivory" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            {BRAND.name}
          </h1>
          <p className="font-mono-label text-ivory-mute mt-2">
            Design System — Phase 1
          </p>
        </div>
      </header>

      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] py-section space-y-section">

        {/* ── Metal Switch ──────────────────────── */}
        <section>
          <SectionTitle>Metal Context</SectionTitle>
          <p className="text-ivory-mute text-sm mb-6">
            Toggle between gold and silver to see semantic tokens update across all components.
          </p>
          <div className="flex gap-4">
            <Button
              variant={activeMetal === "gold" ? "primary" : "secondary"}
              onClick={() => setActiveMetal("gold")}
            >
              Gold
            </Button>
            <Button
              variant={activeMetal === "silver" ? "primary" : "secondary"}
              onClick={() => setActiveMetal("silver")}
            >
              Silver
            </Button>
          </div>
        </section>

        {/* ── Colour Tokens ────────────────────── */}
        <section>
          <SectionTitle>Colour Tokens</SectionTitle>

          <h3 className="font-mono-label text-ivory-mute mb-4">Semantic</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            <Swatch name="--bg" />
            <Swatch name="--surface" />
            <Swatch name="--surface-elevated" />
            <Swatch name="--accent" />
            <Swatch name="--accent-light" />
            <Swatch name="--accent-dark" />
          </div>

          <h3 className="font-mono-label text-ivory-mute mb-4">Core</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            <Swatch name="--ink-0" />
            <Swatch name="--ink-1" />
            <Swatch name="--ink-2" />
            <Swatch name="--ivory" />
            <Swatch name="--ivory-mute" />
            <Swatch name="--paper" />
          </div>

          <h3 className="font-mono-label text-ivory-mute mb-4">Gold</h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 mb-8">
            <Swatch name="--gold-300" />
            <Swatch name="--gold-500" />
            <Swatch name="--gold-700" />
          </div>

          <h3 className="font-mono-label text-ivory-mute mb-4">Silver</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
            <Swatch name="--silver-300" />
            <Swatch name="--silver-500" />
            <Swatch name="--silver-700" />
            <Swatch name="--ice" />
          </div>

          <h3 className="font-mono-label text-ivory-mute mb-4">Status</h3>
          <div className="grid grid-cols-3 gap-3">
            <Swatch name="--ok" />
            <Swatch name="--warn" />
            <Swatch name="--error" />
          </div>
        </section>

        {/* ── Typography ───────────────────────── */}
        <section>
          <SectionTitle>Typography</SectionTitle>

          <div className="space-y-8">
            <div>
              <p className="font-mono-label text-ivory-mute mb-2">Display — Bodoni Moda</p>
              <h2 className="font-display text-ivory">
                Precious metal, struck to be held.
              </h2>
            </div>

            <div>
              <p className="font-mono-label text-ivory-mute mb-2">Body — Hanken Grotesk</p>
              <p className="text-ivory" style={{ maxWidth: "60ch" }}>
                Each coin is individually assayed and serial-numbered, then sealed in
                tamper-evident packaging for secure delivery. The weight and purity
                are verified to the highest standards before dispatch.
              </p>
            </div>

            <div>
              <p className="font-mono-label text-ivory-mute mb-2">Mono — IBM Plex Mono</p>
              <p className="font-mono-label text-ivory">
                GOLD 999.9 · 10 G · PROOF FINISH · SERIAL 002481
              </p>
            </div>

            <div className="foil-rule" />

            <div>
              <p className="font-mono-label text-ivory-mute mb-2">Foil Rule</p>
              <p className="text-sm text-ivory-mute">
                Used sparingly: 1-2px metallic gradient on dividers, small numerals, and hover sweeps.
              </p>
            </div>
          </div>
        </section>

        {/* ── Buttons ──────────────────────────── */}
        <section>
          <SectionTitle>Buttons</SectionTitle>

          <div className="space-y-6">
            <div>
              <p className="font-mono-label text-ivory-mute mb-3">Primary</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Shop gold coins</Button>
                <Button variant="primary" size="lg">Large primary</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </div>

            <div>
              <p className="font-mono-label text-ivory-mute mb-3">Secondary</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="md">Shop silver coins</Button>
                <Button variant="secondary" size="lg">Large secondary</Button>
              </div>
            </div>

            <div>
              <p className="font-mono-label text-ivory-mute mb-3">Ghost</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="ghost" size="sm">Small</Button>
                <Button variant="ghost" size="md">View details</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Segmented Control ────────────────── */}
        <section>
          <SectionTitle>Segmented Control</SectionTitle>
          <div className="space-y-4">
            <SegmentedControl<ViewOption>
              options={[
                { value: "front", label: "Front" },
                { value: "back", label: "Back" },
                { value: "edge", label: "Edge" },
              ]}
              value={metalView}
              onChange={setMetalView}
            />
            <p className="font-mono-label text-ivory-mute">
              Selected: {metalView.toUpperCase()}
            </p>
          </div>
        </section>

        {/* ── Accordion ────────────────────────── */}
        <section>
          <SectionTitle>Accordion</SectionTitle>
          <div className="max-w-xl">
            <Accordion items={accordionItems} />
          </div>
        </section>

        {/* ── Toasts ───────────────────────────── */}
        <section>
          <SectionTitle>Toasts</SectionTitle>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm" onClick={() => showToast("cart", "1 oz Gold Meridian added to cart.")}>
              Cart toast
            </Button>
            <Button variant="secondary" size="sm" onClick={() => showToast("success", "Certificate verified successfully.")}>
              Success toast
            </Button>
            <Button variant="secondary" size="sm" onClick={() => showToast("info", "Prices are indicative and updated periodically.")}>
              Info toast
            </Button>
            <Button variant="secondary" size="sm" onClick={() => showToast("warning", "Price lock expires in 2 minutes.")}>
              Warning toast
            </Button>
          </div>
        </section>

        {/* ── Modal ────────────────────────────── */}
        <section>
          <SectionTitle>Modal</SectionTitle>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} label="Example modal">
            <ModalClose onClose={() => setModalOpen(false)} />
            <div className="p-8">
              <h3 className="font-display text-ivory mb-4" style={{ fontSize: "1.5rem" }}>
                Notify me
              </h3>
              <p className="text-ivory-mute text-sm mb-6">
                Enter your email to be notified when this coin is back in stock.
              </p>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/50 focus:outline-none focus:border-accent"
              />
              <Button variant="primary" className="mt-4 w-full">
                Notify me
              </Button>
            </div>
          </Modal>
        </section>

        {/* ── Drawer ───────────────────────────── */}
        <section>
          <SectionTitle>Drawer</SectionTitle>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
            Open drawer
          </Button>
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} label="Cart">
            <div className="p-8 pt-16">
              <h3 className="font-display text-ivory mb-4" style={{ fontSize: "1.5rem" }}>
                Cart
              </h3>
              <p className="text-ivory-mute text-sm">
                Your cart is empty. Browse our collection to find your next coin.
              </p>
              <div className="hairline my-6" />
              <Button variant="primary" className="w-full" onClick={() => setDrawerOpen(false)}>
                Continue shopping
              </Button>
            </div>
          </Drawer>
        </section>

        {/* ── Reveal ───────────────────────────── */}
        <section>
          <SectionTitle>Scroll Reveal</SectionTitle>
          <p className="text-ivory-mute text-sm mb-8">Scroll down to see elements reveal.</p>
          <div className="space-y-6">
            {[0, 1, 2, 3].map((i) => (
              <Reveal key={i} stagger={i}>
                <div className="p-6 bg-surface border border-line rounded-[var(--radius-sharp)]">
                  <p className="font-mono-label text-accent mb-2">
                    {TRUST_CLAIMS[i]?.label ?? `ITEM ${i + 1}`}
                  </p>
                  <p className="text-ivory-mute text-sm">
                    {TRUST_CLAIMS[i]?.description ?? "Each element reveals with a staggered delay."}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Trust Claims ─────────────────────── */}
        <section>
          <SectionTitle>Trust Strip (Config)</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TRUST_CLAIMS.map((claim) => (
              <div key={claim.id} className="p-4 border border-line rounded-[var(--radius-sharp)]">
                <p className="font-mono-label text-accent mb-1">{claim.label}</p>
                <p className="text-ivory-mute text-xs">{claim.description}</p>
                {claim.isPlaceholder && (
                  <span className="inline-block mt-2 text-[9px] font-mono-label text-warn border border-warn/30 px-1.5 py-0.5 rounded-[var(--radius-pill)]">
                    Placeholder
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Spacing / Grid Demo ──────────────── */}
        <section>
          <SectionTitle>12-Column Grid</SectionTitle>
          <div className="grid-container">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface-elevated border border-line h-16 flex items-center justify-center"
              >
                <span className="font-mono-label text-ivory-mute text-[10px]">{i + 1}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2
        className="font-mono-label text-ivory mb-6"
        style={{ fontSize: "0.8125rem" }}
      >
        {children}
      </h2>
      <div className="hairline mb-8" />
    </>
  );
}

function Swatch({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full aspect-square rounded-[var(--radius-sharp)] border border-line"
        style={{ backgroundColor: `var(${name})` }}
      />
      <span className="font-mono-label text-ivory-mute" style={{ fontSize: "9px" }}>
        {name}
      </span>
    </div>
  );
}
