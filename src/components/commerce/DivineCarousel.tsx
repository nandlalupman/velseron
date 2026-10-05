"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import Image from "next/image";

const DIVINE_COINS = [
  { id: "ganesh", name: "Shree Ganesh", image: "/coins/divine-ganesh.png" },
  { id: "lakshmi", name: "Maa Lakshmi", image: "/coins/divine-lakshmi.png" },
  { id: "durga", name: "Maa Durga", image: "/coins/divine-durga.png" },
  { id: "hanuman", name: "Shree Hanuman", image: "/coins/divine-hanuman.png" },
  { id: "radhakrishna", name: "Radha Krishna", image: "/coins/divine-radhakrishna.png" },
  { id: "om", name: "Om", image: "/coins/divine-om.png" },
];

/**
 * Divine designs carousel showing the available deities.
 * Silver metallic panel background with consistent card sizes.
 */
export function DivineCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("ganesh");

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)] relative">
      {/* Arrow Controls */}
      <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10 hidden md:block">
        <button 
          onClick={scrollLeft}
          className="w-9 h-9 rounded-full bg-ink-1/90 border border-line flex items-center justify-center text-ivory hover:border-accent hover:text-accent transition-colors backdrop-blur-sm cursor-pointer"
          aria-label="Previous coin"
        >
          ←
        </button>
      </div>

      <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10 hidden md:block">
        <button 
          onClick={scrollRight}
          className="w-9 h-9 rounded-full bg-ink-1/90 border border-line flex items-center justify-center text-ivory hover:border-accent hover:text-accent transition-colors backdrop-blur-sm cursor-pointer"
          aria-label="Next coin"
        >
          →
        </button>
      </div>

      {/* Carousel Track */}
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {DIVINE_COINS.map((coin) => (
          <button
            key={coin.id}
            onClick={() => setActiveId(coin.id)}
            className={cn(
              "relative flex-shrink-0 w-[140px] md:w-[170px] flex flex-col items-center",
              "p-4 rounded-lg snap-center transition-all duration-300 cursor-pointer",
              "border",
              activeId === coin.id 
                ? "border-accent/50 bg-ink-1 shadow-[0_0_20px_rgba(201,162,75,0.12)] -translate-y-1" 
                : "border-line/30 bg-ink-1/60 hover:border-line hover:bg-ink-1/80"
            )}
          >
            {/* Glow */}
            {activeId === coin.id && (
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent/15 rounded-full blur-xl pointer-events-none" />
            )}
            
            {/* Coin Image — fixed size */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 flex-shrink-0">
              <Image 
                src={coin.image}
                alt={coin.name}
                fill
                className="object-contain drop-shadow-lg"
                sizes="(max-width: 768px) 80px, 96px"
              />
            </div>
            
            {/* Name — small fixed text, no overflow */}
            <p className={cn(
              "text-xs font-medium text-center leading-tight mb-1 transition-colors w-full truncate",
              activeId === coin.id ? "text-ivory" : "text-ivory-mute"
            )}>
              {coin.name}
            </p>
            <span className="font-mono-label text-[8px] text-accent/70">
              GOLD | SILVER
            </span>
          </button>
        ))}
      </div>
      
      {/* Mobile dots */}
      <div className="flex justify-center mt-2 md:hidden">
        <div className="flex gap-1.5">
          {DIVINE_COINS.map((coin) => (
            <div 
              key={`dot-${coin.id}`} 
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                activeId === coin.id ? "w-4 bg-accent" : "w-1.5 bg-line"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
