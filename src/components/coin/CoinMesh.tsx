"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { Metal } from "@/data/coins";

interface CoinMeshProps {
  metal: Metal;
  /** Radius in scene units */
  radius?: number;
  /** Thickness in scene units */
  thickness?: number;
  /** Enable slow auto-rotation */
  autoRotate?: boolean;
  /** Rotation speed multiplier */
  rotateSpeed?: number;
}

/**
 * High-fidelity coin mesh using PBR textures from the master design.
 *
 * - Front face: High-relief deity design (Ganesh/Lakshmi)
 * - Back face: Sovereign mint mark and weight/purity
 * - Edge: Milled reeded edge texture
 */
export function CoinMesh({
  metal,
  radius = 1.4,
  thickness = 0.2,
  autoRotate = true,
  rotateSpeed = 0.3,
}: CoinMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isGold = metal === "gold";

  // Load textures
  const textures = useTexture({
    goldFace: "/coins/coin-ganesh-face.png",
    goldBack: "/coins/coin-gold-back.png",
    goldEdge: "/coins/reeded-gold.png",
    silverFace: "/coins/coin-lakshmi-face.png",
    silverBack: "/coins/coin-silver-back.png",
    silverEdge: "/coins/reeded-silver.png",
  });

  // Setup repeating textures for the edges
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
    if (isGold) {
      return [
        // Edge (Cylinder wall)
        new THREE.MeshStandardMaterial({
          map: goldEdgeTexture,
          color: 0xEEBA38,
          metalness: 0.78,
          roughness: 0.25,
        }),
        // Top Face (Obverse)
        new THREE.MeshStandardMaterial({
          map: textures.goldFace,
          color: 0xFFDE6A,
          metalness: 0.72,
          roughness: 0.22,
        }),
        // Bottom Face (Reverse)
        new THREE.MeshStandardMaterial({
          map: textures.goldBack,
          color: 0xFFDE6A,
          metalness: 0.72,
          roughness: 0.22,
        }),
      ];
    } else {
      return [
        // Edge (Cylinder wall)
        new THREE.MeshStandardMaterial({
          map: silverEdgeTexture,
          color: 0xDEE7F0,
          metalness: 0.65,
          roughness: 0.28,
        }),
        // Top Face (Obverse)
        new THREE.MeshStandardMaterial({
          map: textures.silverFace,
          color: 0xFFFFFF,
          metalness: 0.60,
          roughness: 0.24,
        }),
        // Bottom Face (Reverse)
        new THREE.MeshStandardMaterial({
          map: textures.silverBack,
          color: 0xFFFFFF,
          metalness: 0.60,
          roughness: 0.24,
        }),
      ];
    }
  }, [isGold, textures]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * rotateSpeed;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]}>
      {/* 
        Three.js CylinderGeometry expects materials in order:
        [Side, Top, Bottom]
      */}
      <mesh material={materials} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, thickness, 128]} />
      </mesh>
    </group>
  );
}
