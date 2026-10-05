"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Modal } from "@/components/ui/Modal";
import { CoinControls } from "@/components/coin/CoinControls";
import type { Coin } from "@/data/coins";
import { cn } from "@/lib/cn";

const CoinScene = dynamic(
  () => import("./CoinScene").then((mod) => ({ default: mod.CoinScene })),
  { ssr: false }
);

interface InspectorModalProps {
  coin: Coin;
  isOpen: boolean;
  onClose: () => void;
}

type ViewPreset = "front" | "back" | "edge";

interface HotspotDef {
  id: string;
  label: string;
  value: string;
  x: string;
  y: string;
}

/**
 * Fullscreen 3D coin inspector modal.
 *
 * - Full viewport 3D canvas
 * - Front/Back/Edge snap buttons
 * - Numbered hotspot overlays for mint mark, purity, serial, edge detail
 * - Specs sidebar
 */
export function InspectorModal({ coin, isOpen, onClose }: InspectorModalProps) {
  const [activeView, setActiveView] = useState<ViewPreset>("front");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const isGold = coin.metal === "gold";

  const hotspots: HotspotDef[] = [
    {
      id: "purity",
      label: "Purity",
      value: `${coin.purityLabel} · ${coin.fineness} fine`,
      x: "50%",
      y: "25%",
    },
    {
      id: "weight",
      label: "Weight",
      value: `${coin.weightGrams} g`,
      x: "70%",
      y: "45%",
    },
    {
      id: "edge",
      label: "Edge",
      value: `${coin.edge.charAt(0).toUpperCase() + coin.edge.slice(1)} · ${coin.dimensions.thicknessMm} mm`,
      x: "85%",
      y: "55%",
    },
    {
      id: "serial",
      label: "Serial",
      value: coin.authenticity.serialNumbered ? "Individually numbered" : "Not numbered",
      x: "50%",
      y: "75%",
    },
  ];

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      label={`${coin.name} — 3D Inspector`}
    >
      <div className="relative w-full h-full bg-ink-0 flex flex-col lg:flex-row">
        {/* 3D Viewport */}
        <div className="relative flex-1 min-h-[50vh] lg:min-h-0">
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 45%, ${
                isGold ? "rgba(201,162,75,0.08)" : "rgba(196,202,210,0.06)"
              } 0%, transparent 60%)`,
            }}
          />

          <CoinScene
            metal={coin.metal}
            size="hero"
            interactive
            autoRotate={activeHotspot === null}
          />

          {/* Hotspot overlays */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {hotspots.map((spot, idx) => (
              <button
                key={spot.id}
                className={cn(
                  "pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2",
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                  "text-[9px] font-mono-label font-bold",
                  "transition-all duration-[var(--dur-md)]",
                  "hover:scale-125",
                  activeHotspot === spot.id
                    ? "bg-accent border-accent text-ink-0 scale-125"
                    : "bg-ink-0/60 border-ivory/30 text-ivory backdrop-blur-sm"
                )}
                style={{ left: spot.x, top: spot.y }}
                onClick={() =>
                  setActiveHotspot(activeHotspot === spot.id ? null : spot.id)
                }
                aria-label={`${spot.label}: ${spot.value}`}
              >
                {idx + 1}
              </button>
            ))}

            {/* Active hotspot micro-card */}
            {activeHotspot && (() => {
              const spot = hotspots.find((h) => h.id === activeHotspot);
              if (!spot) return null;
              return (
                <div
                  className="pointer-events-auto absolute -translate-x-1/2 bg-surface-elevated/95 backdrop-blur-md border border-line rounded-[var(--radius-sharp)] px-4 py-3 max-w-[200px]"
                  style={{
                    left: spot.x,
                    top: `calc(${spot.y} + 24px)`,
                  }}
                >
                  <p className="font-mono-label text-accent text-[9px] mb-1">
                    {spot.label}
                  </p>
                  <p className="text-ivory text-sm">{spot.value}</p>
                </div>
              );
            })()}
          </div>

          {/* View controls */}
          <div className="absolute bottom-4 left-4 z-10">
            <CoinControls
              activeView={activeView}
              onViewChange={setActiveView}
            />
          </div>

          <div className="absolute bottom-4 right-4 z-10">
            <span className="font-mono-label text-ivory-mute/40 text-[9px]">
              3D · INTERACTIVE
            </span>
          </div>
        </div>

        {/* Specs sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-line bg-ink-1 p-6 overflow-y-auto">
          <h3 className="font-[family-name:var(--font-display)] text-ivory text-2xl mb-1">
            {coin.name}
          </h3>
          <p className="font-mono-label text-accent mb-6">
            {coin.series} SERIES
          </p>

          <div className="space-y-4">
            {[
              { label: "Metal", value: coin.metal === "gold" ? "Gold" : "Silver" },
              { label: "Purity", value: `${coin.purityLabel} · ${coin.fineness} fine` },
              { label: "Weight", value: `${coin.weightGrams} g` },
              { label: "Diameter", value: `${coin.dimensions.diameterMm} mm` },
              { label: "Thickness", value: `${coin.dimensions.thicknessMm} mm` },
              { label: "Finish", value: coin.finish.charAt(0).toUpperCase() + coin.finish.slice(1) },
              { label: "Edge", value: coin.edge.charAt(0).toUpperCase() + coin.edge.slice(1) },
              { label: "Assay", value: coin.authenticity.assayCertificate ? "Certified" : "—" },
              { label: "Serial", value: coin.authenticity.serialNumbered ? "Numbered" : "—" },
              ...(coin.authenticity.hallmark ? [{ label: "Hallmark", value: coin.authenticity.hallmark }] : []),
            ].map((spec) => (
              <div key={spec.label} className="flex justify-between items-baseline border-b border-line pb-2">
                <span className="font-mono-label text-ivory-mute text-[10px]">
                  {spec.label}
                </span>
                <span className="text-ivory text-sm">{spec.value}</span>
              </div>
            ))}
          </div>

          {coin.limited && (
            <div className="mt-6 p-3 border border-accent/20 rounded-[var(--radius-sharp)] bg-accent/5">
              <p className="font-mono-label text-accent text-[9px] mb-1">
                LIMITED EDITION
              </p>
              <p className="text-ivory text-sm">
                Mintage limited to {coin.mintageLimit?.toLocaleString()} pieces
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
