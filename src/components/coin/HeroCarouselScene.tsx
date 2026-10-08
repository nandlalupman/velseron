"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { DivineCoinMesh } from "./DivineCoinMesh";
import { StudioEnvironment } from "./StudioEnvironment";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { cn } from "@/lib/cn";
import { WebGLErrorBoundary } from "@/components/ui/WebGLErrorBoundary";
import * as THREE from "three";

const SHOWCASE_COINS = [
  { metal: "gold", deity: "lakshmi", label: "24K Gold Lakshmi Coin", desc: "10g • 999.9 Purity" },
  { metal: "silver", deity: "ganesha", label: "Fine Silver Ganesha", desc: "50g • 999 Purity" },
  { metal: "gold", deity: "om", label: "24K Gold Om Coin", desc: "5g • 999.9 Purity" },
  { metal: "gold", deity: "hanuman", label: "24K Gold Hanuman", desc: "10g • 999.9 Purity" },
  { metal: "silver", deity: "radha-krishna", label: "Silver Radha-Krishna", desc: "100g • 999 Purity" },
] as const;

export function HeroCarouselScene({ className }: { className?: string }) {
  const { tier } = useDeviceTier();
  const [canvasReady, setCanvasReady] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  
  const [activeIndex, setActiveIndex] = useState(0);

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
  
  const activeCoin = SHOWCASE_COINS[activeIndex];

  const nextCoin = () => setActiveIndex((prev) => (prev + 1) % SHOWCASE_COINS.length);
  const prevCoin = () => setActiveIndex((prev) => (prev - 1 + SHOWCASE_COINS.length) % SHOWCASE_COINS.length);

  return (
    <div className={cn("relative w-full h-[500px] flex items-center justify-center", className)}>
      
      {/* 3D Canvas Box */}
      <div className="relative w-[340px] sm:w-[400px] h-[400px] bg-white/5 border border-white/20 rounded-3xl backdrop-blur-md shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Label */}
        <div className="absolute top-0 inset-x-0 p-4 text-center z-10 bg-gradient-to-b from-black/40 to-transparent pointer-events-none">
          <p className="text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-1">
            INTERACTIVE 3D VIEWER
          </p>
          <h3 className="text-white font-medium text-lg drop-shadow-md">
            {activeCoin.label}
          </h3>
          <p className="text-white/70 text-xs">
            {activeCoin.desc}
          </p>
        </div>

        {/* 3D Viewer Area */}
        <div className="flex-1 w-full relative cursor-grab active:cursor-grabbing">
          {shouldRenderCanvas ? (
            <div
              className={cn(
                "absolute inset-0 z-[2] transition-opacity duration-1000",
                canvasReady ? "opacity-100" : "opacity-0"
              )}
            >
              <WebGLErrorBoundary fallbackMetal={activeCoin.metal as any}>
                <Canvas
                  camera={{ fov: 40, position: [0, 0, 5.5] }}
                  gl={{
                    antialias: tier === "A",
                    alpha: true,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: true,
                  }}
                  dpr={tier === "A" ? [1, 2] : 1}
                  onCreated={handleCreated}
                >
                  <StudioEnvironment metal={activeCoin.metal as any} quality={quality} />
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
                  <directionalLight position={[-5, -5, -5]} intensity={0.5} />

                  <Suspense fallback={null}>
                    {/* The Coin */}
                    <group position={[0, -0.2, 0]}>
                      {/* We use a key so it remounts and resets rotation when activeIndex changes */}
                      <DivineCoinMesh
                        key={activeIndex}
                        metal={activeCoin.metal as any}
                        deity={activeCoin.deity as any}
                        autoRotate={true}
                        rotateSpeed={0.3}
                        initialFace="obverse"
                        radius={1.6}
                        thickness={0.25}
                      />
                    </group>
                    
                    {/* Floor Shadow */}
                    <ContactShadows 
                      position={[0, -1.8, 0]} 
                      opacity={0.4} 
                      scale={5} 
                      blur={2} 
                      far={3}
                      color="#000000"
                    />
                  </Suspense>

                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableDamping
                    dampingFactor={0.05}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                  />
                </Canvas>
              </WebGLErrorBoundary>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between z-10 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          <button 
            onClick={prevCoin}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors pointer-events-auto"
            aria-label="Previous coin"
          >
            ←
          </button>
          
          <div className="flex gap-2">
            {SHOWCASE_COINS.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  i === activeIndex ? "bg-gold-500 w-4" : "bg-white/40"
                )} 
              />
            ))}
          </div>

          <button 
            onClick={nextCoin}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors pointer-events-auto"
            aria-label="Next coin"
          >
            →
          </button>
        </div>

      </div>
    </div>
  );
}
