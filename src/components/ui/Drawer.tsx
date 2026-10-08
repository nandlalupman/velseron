"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { TRANSITION } from "@/lib/motion";
import { ModalClose } from "./Modal";
import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  label?: string;
  /** Side to slide from. */
  side?: "right" | "left";
}

/**
 * Drawer — slides from the right (default). Shares Modal's focus trap and scroll lock logic.
 * Glass effect allowed per brief (cart drawer and header only).
 */
export function Drawer({
  open,
  onClose,
  children,
  className,
  label,
  side = "right",
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const trapFocus = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", trapFocus);

    requestAnimationFrame(() => {
      const drawer = drawerRef.current;
      if (!drawer) return;
      const first = drawer.querySelector<HTMLElement>(
        'button, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    });

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", trapFocus);
      previousFocusRef.current?.focus();
    };
  }, [open, trapFocus]);

  const slideFrom = side === "right" ? { x: "100%" } : { x: "-100%" };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITION.modal}
            className="absolute inset-0 bg-ink-0/72"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={slideFrom}
            animate={{ x: 0 }}
            exit={slideFrom}
            transition={{
              ...TRANSITION.modal,
              type: "tween",
            }}
            className={cn(
              "absolute top-0 h-full w-full max-w-md",
              side === "right" ? "right-0" : "left-0",
              "bg-surface/95 backdrop-blur-xl",
              "border-l border-line",
              "shadow-2xl overflow-y-auto",
              className
            )}
          >
            <ModalClose onClose={onClose} />
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
