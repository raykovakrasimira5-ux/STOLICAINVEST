import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react';
import { Property } from '../types';

interface TopListingsCarouselProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const TopListingsCarousel: React.FC<TopListingsCarouselProps> = ({
  properties,
  onSelectProperty,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Take top 5 properties
  const topListings = properties.slice(0, 5);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % topListings.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + topListings.length) % topListings.length);
  };

  if (topListings.length === 0) return null;

  return (
    <div className="w-full flex flex-col">
      {/* Top Header: Title and Exclusive Badge ONLY (NO arrows here) */}
      <div className="text-center sm:text-left mb-4 sm:mb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-black uppercase tracking-wider text-lime-300 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#67B82D]" />
          <span>Ексклузивна селекция</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight drop-shadow-lg">
          ТОП ОФЕРТИ НА СЕДМИЦАТА
        </h2>
      </div>

      {/* Large Featured Slide Container with Smooth Cross-Fade Animation */}
      <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden border border-white/30 shadow-2xl bg-slate-950 group">
        {topListings.map((property, idx) => {
          const isActive = idx === activeIndex;
          const priceFormatted = property.price.toLocaleString('bg-BG');
          const isSale = property.dealType === 'sale';

          return (
            <div
              key={property.id}
              onClick={() => onSelectProperty(property)}
              className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              title="Кликнете за преглед на офертата"
            >
              {/* Only 1 large, crisp photo per slide */}
              <img
                src={property.images?.[0] || '/assets/aistudio/hoise_8579d183.png'}
                alt={property.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/aistudio/hoise_8579d183.png';
                }}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-103 transition-transform duration-1000 ease-out"
              />

              {/* Luxury dark bottom gradient for high contrast readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-black/20 pointer-events-none" />

              {/* Top tag badge on the slide */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#67B82D] text-white shadow-md">
                  {isSale ? 'Продажба' : 'Под наем'}
                </span>
                <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-black/60 text-white/95 backdrop-blur-md border border-white/20">
                  Ref {property.refNumber}
                </span>
              </div>

              {/* Bottom Card Content: ONLY Short Title & Price as requested */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white hover:text-lime-300 transition-colors drop-shadow-md leading-tight">
                    {property.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-lime-300 font-semibold drop-shadow-sm">
                    Столица Инвест • гр. Русе
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 bg-black/50 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/20 shrink-0 shadow-lg">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-lime-300 transition-colors">
                    {priceFormatted} €
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-blue-100 font-bold hover:text-white">
                    Преглед на имота <ArrowUpRight className="w-3.5 h-3.5 text-[#67B82D]" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONTROLS STRICTLY UNDER THE CAROUSEL: Arrows, Dots & Counter */}
      <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 shadow-xl">
        {/* Left: Previous Button with label & arrow */}
        <button
          type="button"
          onClick={prevSlide}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#2F54A3] active:scale-95 border border-white/25 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm"
          aria-label="Предишна оферта"
          title="Предишна оферта"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
          <span className="hidden sm:inline">Предишна</span>
        </button>

        {/* Center: Slide Dots Indicator & Slide Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {topListings.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-[#67B82D]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
                title={`Към оферта ${idx + 1}`}
                aria-label={`Към оферта ${idx + 1}`}
              />
            ))}
          </div>

          <span className="text-xs sm:text-sm font-mono font-black text-white/90 bg-black/40 px-2.5 py-1 rounded-lg border border-white/15">
            {activeIndex + 1} / {topListings.length}
          </span>
        </div>

        {/* Right: Next Button with label & arrow */}
        <button
          type="button"
          onClick={nextSlide}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#67B82D] hover:bg-[#589E26] active:scale-95 border border-white/25 text-white font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md"
          aria-label="Следваща оферта"
          title="Следваща оферта"
        >
          <span className="hidden sm:inline">Следваща</span>
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};
