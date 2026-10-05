"use client";

import { useState, useEffect } from "react";

export type DeviceTier = "A" | "B" | "C";

interface TierInfo {
  tier: DeviceTier;
  gpu: string | null;
  cores: number;
  memory: number; // GB
  mobile: boolean;
}

/**
 * Detects device capability tier for rendering quality decisions.
 *
 * Tier A: Desktop with discrete GPU, ≥8 cores — full R3F, environment map, SSAO
 * Tier B: Mid-range — R3F with reduced quality, no post-processing
 * Tier C: Low-end / WebGL off — CSS sprite fallback, no canvas
 *
 * Starts as Tier B (safe default) on server, upgrades/downgrades after mount.
 */
export function useDeviceTier(): TierInfo {
  const [info, setInfo] = useState<TierInfo>({
    tier: "B",
    gpu: null,
    cores: 4,
    memory: 4,
    mobile: false,
  });

  useEffect(() => {
    const detect = (): TierInfo => {
      const cores = navigator.hardwareConcurrency || 4;
      // @ts-expect-error — deviceMemory is not in all browsers
      const memory = (navigator.deviceMemory as number) || 4;
      const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(
        navigator.userAgent
      );

      // Detect GPU
      let gpu: string | null = null;
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (gl) {
          const ext = gl.getExtension("WEBGL_debug_renderer_info");
          if (ext) {
            gpu = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
          }
        }
        canvas.remove();
      } catch {
        // WebGL not available
      }

      // No WebGL → Tier C
      if (!gpu) {
        return { tier: "C", gpu: null, cores, memory, mobile };
      }

      // Known low-end GPUs
      const lowEnd =
        /SwiftShader|llvmpipe|Software|Mali-4|Adreno 3/i.test(gpu);
      if (lowEnd) {
        return { tier: "C", gpu, cores, memory, mobile };
      }

      // Mobile with < 4 cores or < 4GB → Tier C
      if (mobile && (cores < 4 || memory < 4)) {
        return { tier: "C", gpu, cores, memory, mobile };
      }

      // Desktop with decent GPU and ≥ 8 cores → Tier A
      if (!mobile && cores >= 8 && memory >= 8) {
        return { tier: "A", gpu, cores, memory, mobile };
      }

      // Known high-end desktop GPUs → Tier A
      if (/NVIDIA|Radeon RX|GeForce|RTX|GTX/i.test(gpu) && cores >= 6) {
        return { tier: "A", gpu, cores, memory, mobile };
      }

      // Everything else → Tier B
      return { tier: "B", gpu, cores, memory, mobile };
    };

    requestAnimationFrame(() => {
      setInfo(detect());
    });
  }, []);

  return info;
}
