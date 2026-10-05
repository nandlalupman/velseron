"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";
import { useState } from "react";

export default function VerifyPage() {
  const [serial, setSerial] = useState("");
  const [result, setResult] = useState<"idle" | "found" | "not_found">("idle");

  const handleVerify = () => {
    if (serial.toUpperCase().startsWith("VEL-")) {
      setResult("found");
    } else {
      setResult("not_found");
    }
  };

  return (
    <div data-metal="gold">
      <ToastContainer />
      <SiteHeader />

      <section className="pt-32 pb-section bg-bg min-h-screen">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-accent mb-3 text-[10px]">VERIFY</p>
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

          <Reveal delay={0.1}>
            <div className="max-w-md">
              <label className="font-mono-label text-ivory-mute text-[10px] block mb-2">
                SERIAL NUMBER
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={serial}
                  onChange={(e) => {
                    setSerial(e.target.value);
                    setResult("idle");
                  }}
                  placeholder="VEL-AU-MER-031-000001"
                  className="flex-1 px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-accent font-[family-name:var(--font-mono)]"
                />
                <Button variant="primary" onClick={handleVerify}>
                  Verify
                </Button>
              </div>

              {result === "found" && (
                <div className="mt-6 p-4 border border-ok/30 rounded-[var(--radius-sharp)] bg-ok/5">
                  <p className="font-mono-label text-ok text-[10px] mb-2">
                    CERTIFICATE VERIFIED
                  </p>
                  <p className="text-ivory text-sm">
                    Serial {serial.toUpperCase()} is registered and valid.
                  </p>
                  <p className="font-mono-label text-ivory-mute/50 text-[9px] mt-2">
                    PLACEHOLDER — NOT A REAL VERIFICATION
                  </p>
                </div>
              )}

              {result === "not_found" && (
                <div className="mt-6 p-4 border border-error/30 rounded-[var(--radius-sharp)] bg-error/5">
                  <p className="font-mono-label text-error text-[10px] mb-2">
                    NOT FOUND
                  </p>
                  <p className="text-ivory text-sm">
                    No certificate matches this serial. Check the number and try again.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
