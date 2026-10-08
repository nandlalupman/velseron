"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";
import { Button } from "@/components/ui/Button";

const FONTS = [
  { id: "serif", label: "Classic Serif", family: "Georgia, serif" },
  { id: "sans", label: "Modern Sans", family: "system-ui, sans-serif" },
  { id: "script", label: "Elegant Script", family: '"Brush Script MT", cursive' },
];

const POSITIONS = [
  { id: "center", label: "Center" },
  { id: "bottom", label: "Bottom Arc" },
  { id: "top", label: "Top Arc" },
];

const MAX_CHARS = 20;

export function Personalization({ className }: { className?: string }) {
  const [text, setText] = useState("");
  const [font, setFont] = useState(FONTS[0].id);
  const [position, setPosition] = useState(POSITIONS[0].id);
  const [metal, setMetal] = useState<"gold" | "silver">("gold");
  const [previewRotation, setPreviewRotation] = useState(0);

  const charCount = text.length;
  const isValid = charCount > 0 && charCount <= MAX_CHARS;

  return (
    <section className={cn("py-section bg-white border-t border-light-border", className)} aria-labelledby="personalization-heading">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <Reveal>
          <header className="text-center mb-16">
            <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">PERSONALIZATION</p>
            <h2 id="personalization-heading" className="font-[family-name:var(--font-display)] text-dark-text mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              Make it uniquely yours
            </h2>
            <p className="text-muted-text max-w-xl mx-auto text-sm">
              Add a name, date, or message to any Divine series coin. 
              Laser-engraved with precision. Ready to gift in 3–5 days.
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Configuration Form */}
            <div className="space-y-6">
              <div className="bg-light-surface border border-light-border rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-display)] text-dark-text mb-6" style={{ fontSize: "1.25rem" }}>
                  Design your engraving
                </h3>

                {/* Text Input */}
                <div>
                  <label htmlFor="engraving-text" className="block font-mono-label text-muted-text text-xs mb-2">
                    ENGRAVING TEXT <span className="text-gold-500">({charCount}/{MAX_CHARS})</span>
                  </label>
                  <textarea
                    id="engraving-text"
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                    rows={3}
                    maxLength={MAX_CHARS}
                    placeholder="e.g., Priya & Arjun • 14.02.2024 • Forever yours"
                    className="w-full px-4 py-3 bg-white border border-light-border text-dark-text text-base rounded-lg placeholder:text-muted-text/40 focus:outline-none focus:border-gold-500 resize-none font-[family-name:var(--font-display)]"
                    aria-describedby="char-count"
                  />
                  <p id="char-count" className={cn("font-mono-label text-[9px] mt-1 text-right", charCount > MAX_CHARS * 0.8 ? "text-gold-500" : "text-muted-text/60")}>
                    {charCount} / {MAX_CHARS} characters
                  </p>
                </div>

                {/* Font Selection */}
                <div>
                  <label className="block font-mono-label text-muted-text text-xs mb-3">
                    FONT STYLE
                  </label>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Font style">
                    {FONTS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFont(f.id)}
                        className={cn(
                          "px-4 py-2.5 font-mono-label text-[10px] rounded-[var(--radius-pill)] border transition-all duration-[var(--dur-sm)]",
                          font === f.id
                            ? "bg-gold-600 text-white border-gold-600"
                            : "bg-transparent text-muted-text border-light-border hover:border-gold-500 hover:text-dark-text"
                        )}
                        role="radio"
                        aria-checked={font === f.id}
                        style={{ fontFamily: f.family }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Position Selection */}
                <div>
                  <label className="block font-mono-label text-muted-text text-xs mb-3">
                    POSITION ON COIN
                  </label>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Position">
                    {POSITIONS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPosition(p.id)}
                        className={cn(
                          "px-4 py-2.5 font-mono-label text-[10px] rounded-[var(--radius-pill)] border transition-all duration-[var(--dur-sm)]",
                          position === p.id
                            ? "bg-gold-600 text-white border-gold-600"
                            : "bg-transparent text-muted-text border-light-border hover:border-gold-500 hover:text-dark-text"
                        )}
                        role="radio"
                        aria-checked={position === p.id}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metal Selection */}
                <div>
                  <label className="block font-mono-label text-muted-text text-xs mb-3">
                    COIN METAL
                  </label>
                  <div className="flex gap-3" role="radiogroup" aria-label="Coin metal">
                    {(["gold", "silver"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMetal(m)}
                        className={cn(
                          "flex-1 py-3 font-medium rounded-[var(--radius-sharp)] border transition-all duration-[var(--dur-sm)]",
                          metal === m
                            ? "bg-gold-600 text-white border-gold-600"
                            : "bg-transparent text-muted-text border-light-border hover:border-gold-500 hover:text-dark-text"
                        )}
                        role="radio"
                        aria-checked={metal === m}
                      >
                        {m === "gold" ? "24K Gold" : "Fine Silver"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="pt-4 border-t border-light-border flex items-center justify-between">
                  <div>
                    <p className="font-mono-label text-muted-text text-xs">ENGRAVING FEE</p>
                    <p className="font-[family-name:var(--font-display)] text-gold-600" style={{ fontSize: "1.5rem" }}>
                      + ₹499
                    </p>
                  </div>
                  <Button variant="primary" size="lg" disabled={!isValid} className="w-full sm:w-auto">
                    {isValid ? "Add to Cart — +₹499" : "Enter text to continue"}
                  </Button>
                </div>
              </div>

              {/* Info note */}
              <div className="bg-gold-600/10 border border-gold-700/30 rounded-[var(--radius-sharp)] p-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gold-600/20 text-gold-400 rounded-full">
                    <InfoIcon className="w-4 h-4" />
                  </div>
                  <div className="text-sm text-ivory-mute">
                    <p className="font-medium mb-1">What you need to know</p>
                    <ul className="space-y-1 font-mono-label text-[10px]">
                      <li>• Laser engraving on reverse face only</li>
                      <li>• 3–5 business days additional processing</li>
                      <li>• Personalized items non-returnable (unless defective)</li>
                      <li>• Available on Divine series 10g, 20g, 1oz coins</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: 3D Preview */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <PersonalizationPreview 
                  text={text}
                  font={font}
                  position={position}
                  metal={metal}
                  rotation={previewRotation}
                  onRotationChange={setPreviewRotation}
                />
              </div>
              
              {/* Rotation hint */}
              <p className="font-mono-label text-ivory-mute/50 text-[10px] text-center mt-4">
                Drag to rotate • Scroll to zoom
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PersonalizationPreview({ 
  text, 
  font, 
  position, 
  metal, 
  rotation,
  onRotationChange
}: { 
  text: string; 
  font: string; 
  position: string; 
  metal: "gold" | "silver";
  rotation: number;
  onRotationChange: (val: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);

  const fontFamily = FONTS.find(f => f.id === font)?.family || FONTS[0].family;

  // Render text preview on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.clearRect(0, 0, size, size);

    // Draw coin background (simplified)
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 160;

    // Coin base
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    if (metal === "gold") {
      gradient.addColorStop(0, "#FFDE6A");
      gradient.addColorStop(0.5, "#C9A24B");
      gradient.addColorStop(1, "#8A6A2F");
    } else {
      gradient.addColorStop(0, "#F3F5F7");
      gradient.addColorStop(0.5, "#C4CAD2");
      gradient.addColorStop(1, "#7F8894");
    }
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Inner detail ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, 110, 0, Math.PI * 2);
    ctx.strokeStyle = metal === "gold" ? "rgba(138,106,47,0.3)" : "rgba(127,136,148,0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw text if provided
    if (text.trim()) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation * Math.PI / 180);
      
      const fontSize = 24;
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = metal === "gold" ? "#1A1610" : "#10131A";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let y = 0;
      if (position === "top") y = -50;
      else if (position === "bottom") y = 50;

      // Wrap text if needed
      const maxWidth = radius * 1.5;
      const lines = wrapText(ctx, text, maxWidth);
      const lineHeight = fontSize * 1.3;
      const startY = y - (lines.length - 1) * lineHeight / 2;

      lines.forEach((line, i) => {
        ctx.fillText(line, 0, startY + i * lineHeight);
      });

      ctx.restore();
    }

    // Highlight ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 5, 0, Math.PI * 2);
    ctx.strokeStyle = metal === "gold" ? "rgba(232,207,142,0.3)" : "rgba(232,236,240,0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

  }, [text, font, position, metal, rotation]);

  // Mouse drag to rotate
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    const newRotation = rotation + deltaX * 0.5;
    onRotationChange(newRotation);
    lastXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    // Could add zoom here
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      aria-label={`Personalized ${metal} coin preview with text: ${text || "no text"}`}
      role="img"
    />
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

// Need imports
import { useEffect, useRef } from "react";