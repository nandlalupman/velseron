"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { CoinMesh } from "@/components/coin/CoinMesh";
import { StudioEnvironment } from "@/components/coin/StudioEnvironment";
import { Button } from "@/components/ui/Button";
import type { Metal } from "@/data/coins";
import * as THREE from "three";

const FRAME_COUNT = 36; // 36 frames = 10° per frame
const RENDER_SIZE = 800; // px

export default function RenderSequencePage() {
  const [metal, setMetal] = useState<Metal>("gold");
  const [face, setFace] = useState<"front" | "back">("front");
  const [frames, setFrames] = useState<string[]>([]);
  const [rendering, setRendering] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  return (
    <div className="min-h-screen bg-bg p-8">
      <h1 className="font-[family-name:var(--font-display)] text-ivory text-2xl mb-4">
        Render Sequence Tool
      </h1>
      <p className="text-ivory-mute text-sm mb-6">
        Renders {FRAME_COUNT} frames of a rotating coin at {RENDER_SIZE}px.
        Download the frames for Tier C sprite fallback.
      </p>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="font-mono-label text-ivory-mute text-[10px] block mb-1">METAL</label>
          <div className="flex gap-2">
            <button
              onClick={() => setMetal("gold")}
              className={`px-3 py-1.5 text-sm border rounded cursor-pointer ${
                metal === "gold"
                  ? "bg-gold-500 text-ink-0 border-gold-500"
                  : "border-line text-ivory-mute"
              }`}
            >
              Gold
            </button>
            <button
              onClick={() => setMetal("silver")}
              className={`px-3 py-1.5 text-sm border rounded cursor-pointer ${
                metal === "silver"
                  ? "bg-silver-500 text-ink-0 border-silver-500"
                  : "border-line text-ivory-mute"
              }`}
            >
              Silver
            </button>
          </div>
        </div>
        <div>
          <label className="font-mono-label text-ivory-mute text-[10px] block mb-1">FACE</label>
          <div className="flex gap-2">
            <button
              onClick={() => setFace("front")}
              className={`px-3 py-1.5 text-sm border rounded cursor-pointer ${
                face === "front"
                  ? "bg-accent/20 border-accent text-ivory"
                  : "border-line text-ivory-mute"
              }`}
            >
              Front
            </button>
            <button
              onClick={() => setFace("back")}
              className={`px-3 py-1.5 text-sm border rounded cursor-pointer ${
                face === "back"
                  ? "bg-accent/20 border-accent text-ivory"
                  : "border-line text-ivory-mute"
              }`}
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Preview + render canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p className="font-mono-label text-ivory-mute text-[10px] mb-2">PREVIEW</p>
          <div
            className="bg-ink-1 border border-line rounded"
            style={{ width: RENDER_SIZE / 2, height: RENDER_SIZE / 2 }}
          >
            <Canvas
              camera={{ fov: 35, position: [0, 0.5, 5], near: 0.1, far: 100 }}
              gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
              dpr={2}
              style={{ background: "transparent" }}
            >
              <StudioEnvironment metal={metal} quality="high" />
              <CoinMesh
                metal={metal}
                autoRotate
                rotateSpeed={0.5}
              />
            </Canvas>
          </div>
        </div>

        <div>
          <p className="font-mono-label text-ivory-mute text-[10px] mb-2">RENDER</p>
          <div className="mb-4">
            <Button
              variant="primary"
              onClick={() => setRendering(true)}
              disabled={rendering}
            >
              {rendering
                ? `Rendering frame ${currentFrame + 1}/${FRAME_COUNT}...`
                : `Render ${FRAME_COUNT} frames`}
            </Button>
          </div>

          {/* Hidden offscreen canvas for rendering */}
          {rendering && (
            <div className="fixed -left-[9999px] -top-[9999px]" aria-hidden>
              <Canvas
                camera={{ fov: 35, position: [0, 0.5, 5], near: 0.1, far: 100 }}
                gl={{
                  antialias: true,
                  alpha: true,
                  preserveDrawingBuffer: true,
                }}
                dpr={2}
                style={{ width: RENDER_SIZE, height: RENDER_SIZE }}
              >
                <StudioEnvironment metal={metal} quality="high" />
                <FrameRenderer
                  metal={metal}
                  face={face}
                  onFrame={(dataUrl, index) => {
                    setFrames((prev) => [...prev, dataUrl]);
                    setCurrentFrame(index);
                    if (index >= FRAME_COUNT - 1) {
                      setRendering(false);
                    }
                  }}
                />
              </Canvas>
            </div>
          )}

          {/* Frame gallery */}
          {frames.length > 0 && (
            <div>
              <p className="font-mono-label text-ivory-mute text-[10px] mb-2">
                {frames.length} FRAMES RENDERED
              </p>
              <div className="grid grid-cols-6 gap-2 mb-4">
                {frames.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Frame ${i}`}
                    className="w-full border border-line rounded"
                  />
                ))}
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  frames.forEach((src, i) => {
                    const a = document.createElement("a");
                    a.href = src;
                    a.download = `${metal}-${face}-${String(i).padStart(2, "0")}.png`;
                    a.click();
                  });
                }}
              >
                Download all frames
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FrameRenderer({
  metal,
  face,
  onFrame,
}: {
  metal: Metal;
  face: "front" | "back";
  onFrame: (dataUrl: string, index: number) => void;
}) {
  const { gl, scene, camera } = useThree();
  const frameIndex = useRef(0);
  const coinRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (frameIndex.current >= FRAME_COUNT) return;

    const angle = (frameIndex.current / FRAME_COUNT) * Math.PI * 2;

    // Rotate the coin to the current frame angle
    if (coinRef.current) {
      coinRef.current.rotation.y = angle;
    }

    // Render and capture
    gl.render(scene, camera);
    const dataUrl = gl.domElement.toDataURL("image/png");
    onFrame(dataUrl, frameIndex.current);
    frameIndex.current++;
  });

  return (
    <group ref={coinRef} rotation={[0.15, 0, 0]}>
      <CoinMesh
        metal={metal}
        autoRotate={false}
      />
    </group>
  );
}
