"use client";

import { useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CoinMesh } from "./CoinMesh";
import { StudioEnvironment } from "./StudioEnvironment";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { cn } from "@/lib/cn";

export function HeroDualScene({ className }: { className?: string }) {
  const { tier } = useDeviceTier();
  const [canvasReady, setCanvasReady] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    if (tier === "C") return;
    const timer = setTimeout(() => setShowCanvas(true), 150);
    return () => clearTimeout(timer);
  }, [tier]);

  const handleCreated = useCallback((state: { gl: { domElement: HTMLCanvasElement } }) => {
    const canvas = state.gl.domElement;
    const handleLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    canvas.addEventListener("webglcontextlost", handleLost);

    requestAnimationFrame(() => {
      setCanvasReady(true);
    });

    return () => {
      canvas.removeEventListener("webglcontextlost", handleLost);
    };
  }, []);

  const quality = tier === "A" ? "high" : "low";
  const shouldRenderCanvas = showCanvas && tier !== "C" && !contextLost;

  return (
    <div className={cn("relative w-full h-full", className)}>
      {shouldRenderCanvas && (
        <div
          className={cn(
            "absolute inset-0 z-[2] transition-opacity",
            canvasReady ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDuration: "1000ms" }}
        >
          <Canvas
            camera={{
              fov: 40,
              position: [0, 1.5, 6],
              near: 0.1,
              far: 100,
            }}
            gl={{
              antialias: tier === "A",
              alpha: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: true,
            }}
            dpr={tier === "A" ? [1, 2] : 1}
            onCreated={handleCreated}
            style={{ background: "transparent", pointerEvents: "auto" }}
          >
            <StudioEnvironment metal="gold" quality={quality} />
            
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

            <group position={[-0.8, -0.2, 0.5]}>
              <CoinMesh
                metal="gold"
                autoRotate
                rotateSpeed={0.3}
              />
            </group>

            <group position={[0.8, 0.2, -0.5]}>
              <CoinMesh
                metal="silver"
                autoRotate
                rotateSpeed={-0.2}
              />
            </group>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.05}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </div>
      )}
    </div>
  );
}
