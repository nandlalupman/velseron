"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { Metal } from "@/data/coins";

interface DivineCoinMeshProps {
  metal: Metal;
  /** Deity identifier for texture selection */
  deity: "lakshmi" | "ganesha" | "om" | "hanuman" | "radha-krishna";
  /** Radius in scene units */
  radius?: number;
  /** Thickness in scene units */
  thickness?: number;
  /** Enable slow auto-rotation */
  autoRotate?: boolean;
  /** Rotation speed multiplier */
  rotateSpeed?: number;
  /** Which face to show initially: "obverse" (deity) or "reverse" */
  initialFace?: "obverse" | "reverse";
}

/**
 * Divine Coin Mesh - uses PNG deity textures mapped to coin faces.
 * 
 * Texture mapping:
 * - Front (obverse): High-relief deity design (Lakshmi, Ganesha, Om, Hanuman, Radha-Krishna)
 * - Back (reverse): Sovereign mint mark with weight/purity
 * - Edge: Milled reeded edge texture
 * 
 * Uses existing divine-*.png assets from /public/coins/
 */
export function DivineCoinMesh({
  metal,
  deity,
  radius = 1.4,
  thickness = 0.2,
  autoRotate = true,
  rotateSpeed = 0.3,
  initialFace = "obverse",
}: DivineCoinMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isGold = metal === "gold";

  // Map deity to texture filenames
  const textureMap = useMemo(() => ({
    lakshmi: "/coins/divine-lakshmi.png",
    ganesha: "/coins/divine-ganesh.png",
    om: "/coins/divine-om.png",
    hanuman: "/coins/divine-hanuman.png",
    "radha-krishna": "/coins/divine-radhakrishna.png",
  }), []);

  // Load textures
  const textures = useTexture({
    face: textureMap[deity],
    goldEdge: "/coins/reeded-gold.png",
    silverEdge: "/coins/reeded-silver.png",
    goldBack: "/coins/coin-gold-back.png",
    silverBack: "/coins/coin-silver-back.png",
  });

  // Setup repeating edge textures
  const goldEdgeTexture = useMemo(() => {
    const tex = textures.goldEdge.clone();
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(160, 1);
    tex.needsUpdate = true;
    return tex;
  }, [textures.goldEdge]);

  const silverEdgeTexture = useMemo(() => {
    const tex = textures.silverEdge.clone();
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(160, 1);
    tex.needsUpdate = true;
    return tex;
  }, [textures.silverEdge]);

  const materials = useMemo(() => {
    // Use deity face texture for obverse, generic back for reverse
    const faceMap = textures.face;
    const backMap = isGold ? textures.goldBack : textures.silverBack;

    if (isGold) {
      return [
        // Edge (Cylinder wall) - index 0
        new THREE.MeshStandardMaterial({
          map: goldEdgeTexture,
          color: 0xEEBA38,
          metalness: 0.78,
          roughness: 0.25,
        }),
        // Top Face (Obverse - deity) - index 1
        new THREE.MeshStandardMaterial({
          map: faceMap,
          color: 0xFFDE6A,
          metalness: 0.72,
          roughness: 0.22,
        }),
        // Bottom Face (Reverse) - index 2
        new THREE.MeshStandardMaterial({
          map: backMap,
          color: 0xFFDE6A,
          metalness: 0.72,
          roughness: 0.22,
        }),
      ];
    } else {
      return [
        // Edge (Cylinder wall) - index 0
        new THREE.MeshStandardMaterial({
          map: silverEdgeTexture,
          color: 0xDEE7F0,
          metalness: 0.65,
          roughness: 0.28,
        }),
        // Top Face (Obverse - deity) - index 1
        new THREE.MeshStandardMaterial({
          map: faceMap,
          color: 0xFFFFFF,
          metalness: 0.60,
          roughness: 0.24,
        }),
        // Bottom Face (Reverse) - index 2
        new THREE.MeshStandardMaterial({
          map: backMap,
          color: 0xFFFFFF,
          metalness: 0.60,
          roughness: 0.24,
        }),
      ];
    }
  }, [isGold, textures, goldEdgeTexture, silverEdgeTexture]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * rotateSpeed;
    }
  });

  // Initial rotation to show correct face
  const initialRotation: [number, number, number] = initialFace === "obverse" 
    ? [Math.PI / 2, 0, 0]  // Face up
    : [-Math.PI / 2, 0, 0]; // Face down (show reverse)

  return (
    <group ref={groupRef} rotation={initialRotation}>
      <mesh material={materials} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, thickness, 128]} />
      </mesh>
    </group>
  );
}