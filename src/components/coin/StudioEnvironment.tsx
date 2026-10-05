"use client";

import { Environment, ContactShadows } from "@react-three/drei";
import type { Metal } from "@/data/coins";

interface StudioEnvironmentProps {
  metal: Metal;
  /** Tier A gets full environment, Tier B gets simplified */
  quality?: "high" | "low";
}

/**
 * Studio lighting environment for coin rendering.
 *
 * - Key light: warm directional from top-right
 * - Fill light: subtle from bottom-left
 * - Rim light: accent-coloured from behind for metallic edge highlight
 * - Environment: "studio" preset from drei
 * - Contact shadows: soft ground shadow
 */
export function StudioEnvironment({
  metal,
  quality = "high",
}: StudioEnvironmentProps) {
  const isGold = metal === "gold";

  return (
    <>
      {/* Environment map for metallic reflections */}
      <Environment preset="studio" environmentIntensity={0.8} />

      {/* Key light — warm, from top-right */}
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.8}
        color={isGold ? "#FFF5E0" : "#F0F4FF"}
        castShadow={quality === "high"}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Fill light — subtle, from bottom-left */}
      <directionalLight
        position={[-2, -1, 3]}
        intensity={0.4}
        color={isGold ? "#E8CF8E" : "#C4CAD2"}
      />

      {/* Rim light — accent from behind for metallic edge glow */}
      <pointLight
        position={[0, 1, -3]}
        intensity={isGold ? 2.0 : 1.5}
        color={isGold ? "#C9A24B" : "#A8B4C2"}
        distance={8}
        decay={2}
      />

      {/* Ambient fill */}
      <ambientLight intensity={0.15} color="#FFFFFF" />

      {/* Contact shadow on ground plane */}
      {quality === "high" && (
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.4}
          scale={6}
          blur={2.5}
          far={4}
          color={isGold ? "#1A1610" : "#10131A"}
        />
      )}
    </>
  );
}
