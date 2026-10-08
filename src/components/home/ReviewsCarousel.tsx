"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import { REVIEWS } from "@/data/reviews";
import { Reveal } from "@/components/ui/Reveal";
import { CoinPosterSVG } from "@/components/commerce/CoinPosterSVG";

export function ReviewsCarousel({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = typeof window !== "undefined" 
    ? window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1
    : 3;
  
  const maxIndex = Math.max(0, REVIEWS.length - itemsPerView);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const newItems = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      setCurrentIndex(prev => Math.min(prev, Math.max(0, REVIEWS.length - newItems)));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsAutoPlaying(false);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < maxIndex) {
        setCurrentIndex(prev => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    }
    setTouchStart(null);
    setIsAutoPlaying(true);
  }, [touchStart, currentIndex, maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goPrev = () => goToSlide(currentIndex - 1);
  const goNext = () => goToSlide(currentIndex + 1);

  const visibleReviews = REVIEWS.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className={cn("py-section bg-light-surface border-t border-light-border", className)} aria-labelledby="reviews-heading">
      <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
        <Reveal>
          <header className="text-center mb-12">
            <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">TESTIMONIALS</p>
            <h2 id="reviews-heading" className="font-[family-name:var(--font-display)] text-dark-text mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              What Our Customers Say
            </h2>
            <p className="text-muted-text max-w-xl mx-auto text-sm">
              Trusted by 50,000+ happy customers. Real reviews from real people.
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            {/* Carousel viewport */}
            <div className="overflow-hidden" role="region" aria-label="Customer reviews carousel">
              <div
                className="flex transition-transform duration-[var(--dur-lg)] ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                role="list"
              >
                {visibleReviews.map((review, index) => (
                  <ReviewCard key={review.id} review={review} index={currentIndex + index} />
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className={cn(
                  "w-12 h-12 flex items-center justify-center",
                  "bg-surface border border-line rounded-full",
                  "text-ivory-mute hover:text-ivory hover:border-gold-500/50",
                  "disabled:opacity-30 disabled:cursor-not-allowed",
                  "transition-all duration-[var(--dur-sm)]"
                )}
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2" role="tablist" aria-label="Review slides">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-[var(--dur-sm)]",
                      currentIndex === i
                        ? "bg-gold-500 w-6"
                        : "bg-ivory-mute/30 hover:bg-gold-500/50"
                    )}
                    role="tab"
                    aria-selected={currentIndex === i}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                disabled={currentIndex >= maxIndex}
                className={cn(
                  "w-12 h-12 flex items-center justify-center",
                  "bg-surface border border-line rounded-full",
                  "text-ivory-mute hover:text-ivory hover:border-gold-500/50",
                  "disabled:opacity-30 disabled:cursor-not-allowed",
                  "transition-all duration-[var(--dur-sm)]"
                )}
                aria-label="Next reviews"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Keyboard navigation hint */}
            <p className="text-muted-text/50 text-xs text-center mt-4">
              Use ← → keys to navigate • Auto-advances every 5s
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="text-center mt-12">
            <p className="text-muted-text text-sm">
              {REVIEWS.length}+ verified reviews · 4.9/5 average rating
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewCard({ review, index }: { review: typeof REVIEWS[0]; index: number }) {
  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
  
  return (
    <article 
      className={cn(
        "flex-shrink-0 w-full px-3",
        "sm:basis-1/2 lg:basis-1/3"
      )}
      role="listitem"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="h-full bg-white border border-light-border rounded-xl p-5 hover:border-gold-500/50 hover:shadow-md transition-all duration-300">
        {/* Stars */}
        <div className="flex gap-0.5 mb-4" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "text-[14px]",
                i < review.rating ? "text-gold-500" : "text-ivory-mute/20"
              )}
            >
              ★
            </span>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-dark-text/80 mb-5 leading-relaxed text-sm">
          &ldquo;{review.text}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-line/50">
          <div className="w-9 h-9 rounded-full bg-gold-600/10 flex items-center justify-center text-gold-700 font-semibold text-sm border border-gold-200">
            {review.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-dark-text text-sm">{review.name}</p>
            <p className="text-muted-text text-xs">
              {review.location} · {review.product ? `${review.product} · ` : ""}
              {new Date(review.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}