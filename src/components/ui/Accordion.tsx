"use client";

import { useState, useId, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { TRANSITION } from "@/lib/motion";

interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  /** Allow multiple items open simultaneously. */
  multiple?: boolean;
}

export function Accordion({ items, className, multiple = false }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const baseId = useId();

  function toggle(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className={cn("divide-y divide-line", className)}>
      {items.map((item, i) => {
        const isOpen = openIndices.has(i);
        const headingId = `${baseId}-heading-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={i}>
            <button
              id={headingId}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={cn(
                "w-full flex items-center justify-between gap-4",
                "py-5 text-left cursor-pointer",
                "text-ivory hover:text-accent",
                "transition-colors duration-[var(--dur-sm)]",
                "font-[family-name:var(--font-body)] text-sm font-medium tracking-wide"
              )}
            >
              {item.title}
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={TRANSITION.quick}
                className="shrink-0 text-ivory-mute"
              >
                <path d="M2 5L7 10L12 5" />
              </motion.svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: TRANSITION.modal,
                    opacity: TRANSITION.quick,
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 text-ivory-mute text-sm leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
