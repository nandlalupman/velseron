"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { TRANSITION } from "@/lib/motion";

type ToastType = "cart" | "success" | "info" | "warning";

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
}

// ── Global toast state ────────────────────────────────────
let toastListeners: Array<(toasts: ToastData[]) => void> = [];
let toastQueue: ToastData[] = [];

function notifyListeners() {
  toastListeners.forEach((fn) => fn([...toastQueue]));
}

/** Show a toast from anywhere in the app. */
export function showToast(type: ToastType, message: string) {
  const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  toastQueue.push({ id, type, message });
  notifyListeners();

  // Auto-dismiss after 4s
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    notifyListeners();
  }, 4000);
}

function dismissToast(id: string) {
  toastQueue = toastQueue.filter((t) => t.id !== id);
  notifyListeners();
}

const typeStyles: Record<ToastType, string> = {
  cart: "border-accent",
  success: "border-ok",
  info: "border-ivory-mute",
  warning: "border-warn",
};

const typeLabels: Record<ToastType, string> = {
  cart: "ADDED",
  success: "SUCCESS",
  info: "INFO",
  warning: "NOTICE",
};

/**
 * Toast container — renders at bottom-centre on mobile, top-right on desktop.
 * Place once in the root layout or a provider.
 */
export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    toastListeners.push(setToasts);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== setToasts);
    };
  }, []);

  const handlePauseEnter = useCallback(() => setPaused(true), []);
  const handlePauseLeave = useCallback(() => setPaused(false), []);

  return (
    <div
      aria-live="polite"
      aria-relevant="additions removals"
      className={cn(
        "fixed z-[60] flex flex-col gap-2 pointer-events-none",
        /* Mobile: bottom-centre */
        "bottom-4 left-4 right-4",
        /* Desktop: top-right */
        "sm:bottom-auto sm:left-auto sm:top-4 sm:right-4 sm:w-80"
      )}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: paused ? 0.95 : 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={TRANSITION.quick}
            onMouseEnter={handlePauseEnter}
            onMouseLeave={handlePauseLeave}
            className={cn(
              "pointer-events-auto",
              "flex items-center gap-3 px-4 py-3",
              "bg-surface border rounded-[var(--radius-sharp)]",
              typeStyles[toast.type],
              "shadow-lg"
            )}
          >
            <span className="font-mono-label text-accent">
              {typeLabels[toast.type]}
            </span>
            <span className="text-ivory text-sm flex-1">{toast.message}</span>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-ivory-mute hover:text-ivory transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M1 1L11 11M11 1L1 11" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
