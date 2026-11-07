import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface TestimonialItem {
  id: number;
  quote: string;
  rating: number;
  badge: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    quote: "Professional service and accurate diagnosis. Highly recommended.",
    rating: 5,
    badge: "Verified Client",
  },
  {
    id: 2,
    quote: "Very knowledgeable team and excellent customer support.",
    rating: 5,
    badge: "Verified Client",
  },
  {
    id: 3,
    quote: "They solved an issue that other workshops couldn't identify.",
    rating: 5,
    badge: "Verified Client",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = testimonialsData.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-swipe timer (runs every 4.5 seconds, pauses when hovered/touched)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch handlers for finger swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      setIsPaused(false);
      return;
    }
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40; // in px

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 sm:py-24 bg-gradient-to-br from-[#051124] via-[#091b38] to-[#040b18] text-white relative overflow-hidden border-y border-slate-800"
    >
      {/* Background Ambience Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: strictly "Clients Testimonial" without "What Our Customers Say" */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Clients Testimonial
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Real feedback from vehicle owners who trust Tahir Autos with their vehicle maintenance and repairs.
          </p>
        </div>

        {/* Carousel Slider with Auto-Swipe and Finger-Swipe (3 exact client reviews) */}
        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Active Card Window */}
          <div className="overflow-hidden px-2 py-4">
            <div 
              className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialsData.map((item) => (
                <div 
                  key={item.id} 
                  className="w-full shrink-0 px-2 sm:px-4"
                >
                  <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl relative flex flex-col justify-between min-h-[220px]">
                    {/* Top Row: Star Rating & Verified Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400" />
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.badge}</span>
                      </div>
                    </div>

                    {/* Quote Content */}
                    <div className="relative">
                      <Quote className="w-8 h-8 text-sky-400/30 absolute -top-4 -left-2 pointer-events-none" />
                      <p className="text-lg sm:text-2xl text-slate-100 font-semibold leading-relaxed italic pl-4">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Bottom subtle indicator */}
                    <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>Tahir Autos Verified Client Review</span>
                      <span>Review {item.id} of {total}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Indicators & Finger Swipe Hint */}
          <div className="flex flex-col items-center gap-3 mt-6">
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === idx 
                      ? 'w-8 bg-gradient-to-r from-orange-500 to-amber-400' 
                      : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Auto-swiping · Swipe left or right
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
