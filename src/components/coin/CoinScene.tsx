"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CoinMesh } from "./CoinMesh";
import { StudioEnvironment } from "./StudioEnvironment";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import type { Metal } from "@/data/coins";
import { cn } from "@/lib/cn";

interface CoinSceneProps {
  metal: Metal;
  className?: string;
  /** Enable user orbit controls */
  interactive?: boolean;
  /** Auto-rotate coin */
  autoRotate?: boolean;
  /** Size hint for the container */
  size?: "hero" | "card" | "thumb";
}

/**
 * Complete coin viewing experience with tiered rendering.
 *
 * Tier A: Full R3F canvas with environment, orbit controls, auto-rotate
 * Tier B: R3F canvas with reduced quality (no shadows, simpler env)
 * Tier C: No canvas — parent component handles SVG fallback
 *
 * Canvas has transparent background so it composites over whatever
 * the parent provides (poster, glow, dark ground).
 */
export function CoinScene({
  metal,
  className,
  interactive = true,
  autoRotate = true,
  size = "hero",
}: CoinSceneProps) {
  const { tier } = useDeviceTier();
  const [canvasReady, setCanvasReady] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  // Delay showing canvas to allow poster LCP
  useEffect(() => {
    if (tier === "C") return;
    const timer = setTimeout(() => setShowCanvas(true), 150);
    return () => clearTimeout(timer);
  }, [tier]);

  const handleCreated = useCallback((state: { gl: { domElement: HTMLCanvasElement } }) => {
    // Listen for WebGL context loss
    const canvas = state.gl.domElement;
    const handleLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    canvas.addEventListener("webglcontextlost", handleLost);

    // Canvas is ready, trigger crossfade
    requestAnimationFrame(() => {
      setCanvasReady(true);
    });

    return () => {
      canvas.removeEventListener("webglcontextlost", handleLost);
    };
  }, []);

  const sizeConfig = {
    hero: { fov: 35, cameraPos: [0, 1.2, 5] as [number, number, number] },
    card: { fov: 40, cameraPos: [0, 0.8, 4.5] as [number, number, number] },
    thumb: { fov: 45, cameraPos: [0, 0.5, 4] as [number, number, number] },
  };

  const config = sizeConfig[size];
  const quality = tier === "A" ? "high" : "low";

  // Don't render canvas on Tier C or if context was lost
  const shouldRenderCanvas = showCanvas && tier !== "C" && !contextLost;

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* R3F Canvas — hidden on Tier C or context loss */}
      {shouldRenderCanvas && (
        <div
          className={cn(
            "absolute inset-0 z-[2] transition-opacity",
            canvasReady ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDuration: "var(--dur-lg, 600ms)" }}
        >
          <Canvas
            camera={{
              fov: config.fov,
              position: config.cameraPos,
              near: 0.1,
              far: 100,
            }}
            gl={{
              antialias: tier === "A",
              alpha: true,
              powerPreference: tier === "A" ? "high-performance" : "default",
              preserveDrawingBuffer: false,
              failIfMajorPerformanceCaveat: true,
            }}
            dpr={tier === "A" ? [1, 2] : [1, 1.5]}
            onCreated={handleCreated}
            style={{ background: "transparent" }}
          >
            <Suspense fallback={null}>
              <StudioEnvironment metal={metal} quality={quality} />
              <CoinMesh
                metal={metal}
                autoRotate={autoRotate}
                rotateSpeed={0.3}
              />
              {interactive && (
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 1.5}
                  autoRotate={false}
                  dampingFactor={0.05}
                  enableDamping
                />
              )}
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Tier C indicator (dev only) */}
      {(tier === "C" || contextLost) && (
        <div className="absolute bottom-2 right-2 z-10">
          <span className="font-mono-label text-ivory-mute/30 text-[8px]">
            {contextLost ? "WEBGL CONTEXT LOST · 2D MODE" : "TIER C · 2D FALLBACK"}
          </span>
        </div>
      )}
    </div>
  );
}
