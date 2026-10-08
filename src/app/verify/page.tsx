"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";
import { useState } from "react";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";

const mockCertificate = {
  serial: "VEL-AU-LAK-010-000123",
  coin: "Lakshmi Gold Coin",
  metal: "GOLD",
  weight: "10g",
  fineness: "999.9 (24K)",
  minted: "January 2024",
  assayLab: "MMTC-PAMP (BIS Recognised)",
  certificateUrl: "/certificates/VEL-AU-LAK-010-000123.pdf",
};

export default function VerifyPage() {
  const [serial, setSerial] = useState("");
  const [result, setResult] = useState<"idle" | "found" | "not_found">("idle");
  const [certificate, setCertificate] = useState<typeof mockCertificate | null>(null);

  const handleVerify = () => {
    const normalized = serial.toUpperCase().trim();
    if (!normalized.startsWith("VEL-")) {
      setResult("not_found");
      setCertificate(null);
      return;
    }
    if (normalized === mockCertificate.serial) {
      setResult("found");
      setCertificate(mockCertificate);
    } else {
      setResult("not_found");
      setCertificate(null);
    }
  };

  return (
    <div data-metal="gold">
      <ToastContainer />
      <section className="pt-32 pb-section bg-premium-0 min-h-screen">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-gold-500 text-[10px] mb-3">VERIFY CERTIFICATE</p>
            <h1
              className="font-[family-name:var(--font-display)] text-ivory mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Certificate lookup
            </h1>
            <p className="text-ivory-mute max-w-lg mb-10">
              Enter the serial number engraved on your coin to verify its
              certificate of authenticity and view its assay record.
            </p>
          </Reveal>

          {/* Search form */}
          <Reveal delay={0.1}>
            <div className="max-w-xl mx-auto">
              <div className="border border-gold-700/30 rounded-[var(--radius-sharp)] p-6 md:p-8 bg-surface">
                <label className="font-mono-label text-ivory-mute text-[10px] block mb-2">
                  SERIAL NUMBER
                </label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={serial}
                    onChange={(e) => {
                      setSerial(e.target.value.toUpperCase());
                      setResult("idle");
                      setCertificate(null);
                    }}
                    placeholder="VEL-AU-LAK-010-000123"
                    className="flex-1 px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-gold-500 font-[family-name:var(--font-mono)]"
                    maxLength={30}
                  />
                  <Button variant="primary" onClick={handleVerify} size="lg">
                    Verify
                  </Button>
                </div>

                <p className="font-mono-label text-ivory-mute/40 text-[9px] text-center">
                  Format: VEL-AU/AG-SERIES-WEIGHT-SEQUENCE
                </p>
              </div>
            </div>
          </Reveal>

          {/* Results */}
          <Reveal delay={0.15}>
            {result === "found" && certificate && (
              <div className="max-w-3xl mx-auto mt-8">
                <CertificateView certificate={certificate} />
              </div>
            )}

            {result === "not_found" && (
              <div className="max-w-md mx-auto mt-8 text-center">
                <div className="border border-rose-700/30 rounded-[var(--radius-sharp)] p-8 bg-rose-600/5">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-rose-600/10 text-rose-500 rounded-full">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <p className="font-mono-label text-rose-500 text-[10px] mb-2">NOT FOUND</p>
                  <p className="text-ivory-mute text-sm mb-4">
                    No certificate matches <span className="font-mono-label text-ivory">{serial}</span>.
                    Please check the number and try again.
                  </p>
                  <p className="font-mono-label text-ivory-mute/40 text-[9px]">
                    PLACEHOLDER — NOT A REAL VERIFICATION
                  </p>
                </div>
              </div>
            )}
          </Reveal>

          {/* How it works */}
          <Reveal delay={0.2}>
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="font-display text-ivory mb-8 text-center" style={{ fontSize: "1.5rem" }}>How Verification Works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <VerifyStep number={1} title="Enter Serial" desc="Find the unique serial on your coin edge or certificate card." icon="search" />
                <VerifyStep number={2} title="Database Match" desc="We cross-reference our secure registry of minted coins." icon="database" />
                <VerifyStep number={3} title="View Certificate" desc="Access the full assay report, weight, fineness and mint date." icon="file-check" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>    </div>
  );
}

function CertificateView({ certificate }: { certificate: typeof mockCertificate }) {
  const metalColor = certificate.metal === "GOLD" ? "text-gold-400" : "text-silver-400";
  const metalBg = certificate.metal === "GOLD" ? "bg-gold-600/10" : "bg-silver-600/10";

  return (
    <div className="space-y-6">
      {/* Verified badge */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-12 flex items-center justify-center bg-emerald-600/10 text-emerald-500 rounded-full">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div>
          <p className="font-mono-label text-emerald-500 text-[10px]">CERTIFICATE VERIFIED</p>
          <p className="font-display text-ivory text-sm">This coin is authentic and registered</p>
        </div>
      </div>

      {/* Certificate card */}
      <div className="border border-gold-700/30 rounded-[var(--radius-sharp)] overflow-hidden bg-surface">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gold-700/30 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 shrink-0 flex items-center justify-center bg-ink-1 rounded-[var(--radius-sharp)]">
              <CoinPosterSVG metal={certificate.metal.toLowerCase() as "gold" | "silver"} size={80} />
            </div>
            <div>
              <p className="font-mono-label text-ivory-mute text-[10px] mb-1">{certificate.coin}</p>
              <h2 className="font-display text-ivory" style={{ fontSize: "1.5rem" }}>{certificate.metal} {certificate.weight}</h2>
              <p className={`font-mono-label text-[10px] ${metalColor} ${metalBg} inline-block px-2 py-0.5 rounded mt-2`}>
                {certificate.fineness}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono-label text-ivory-mute text-[10px] mb-1">SERIAL NUMBER</p>
            <p className="font-mono-label text-ivory text-lg tabular-nums">{certificate.serial}</p>
          </div>
        </div>

        {/* Details grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gold-700/30">
          <CertificateField label="Minted" value={certificate.minted} />
          <CertificateField label="Assay Laboratory" value={certificate.assayLab} />
          <CertificateField label="Weight" value={`${certificate.weight} (${certificate.fineness})`} />
          <CertificateField label="Metal Type" value={certificate.metal} />
        </div>

        {/* Actions */}
        <div className="p-6 md:p-8 flex flex-col sm:flex-row gap-4 justify-end">
          <Button variant="secondary" size="md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </Button>
          <Button variant="primary" size="md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Share Certificate
          </Button>
        </div>
      </div>

      <p className="font-mono-label text-ivory-mute/40 text-[9px] text-center">
        PLACEHOLDER — NOT A REAL VERIFICATION
      </p>
    </div>
  );
}

function CertificateField({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-elevated border border-line rounded-[var(--radius-sharp)] p-4">
      <p className="font-mono-label text-ivory-mute text-[10px] mb-1">{label}</p>
      <p className="text-ivory text-sm">{value}</p>
    </div>
  );
}

function VerifyStep({ number, title, desc, icon }: { number: number; title: string; desc: string; icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    search: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    database: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 7.33 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 7.33 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    "file-check": (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <polyline points="16 13 20 17 22 9" />
      </svg>
    ),
  };

  return (
    <div className="text-center p-6 border border-line rounded-[var(--radius-sharp)] bg-surface hover:border-gold-700/50 transition-colors">
      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-gold-600/10 text-gold-500 rounded-full">
        <span className="font-bold text-xl">{number}</span>
      </div>
      <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-gold-600/10 text-gold-500 rounded-[var(--radius-sharp)]">
        {icons[icon]}
      </div>
      <h3 className="font-display text-ivory mb-2 text-lg">{title}</h3>
      <p className="text-ivory-mute text-sm">{desc}</p>
    </div>
  );
}
