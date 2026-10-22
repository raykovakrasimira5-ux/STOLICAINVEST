import React from 'react';
import { Search, RotateCcw, Sparkles } from 'lucide-react';
import { Property, PropertyFilterState, PROPERTY_TYPES } from '../types';
import { TopListingsCarousel } from './TopListingsCarousel';

interface HeroSearchProps {
  filters: PropertyFilterState;
  onFilterChange: (filters: Partial<PropertyFilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
  availableNeighborhoods?: string[];
  topProperties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  availableNeighborhoods = ['Алеи Възраждане', 'Божичен', 'Възраждане', 'Дружба', 'Здравец', 'Родина 1', 'Център', 'Червена Вода', 'Ялта'],
  topProperties,
  onSelectProperty,
}) => {
  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.dealType !== 'all' ||
    filters.category !== 'all' ||
    filters.city !== 'all' ||
    filters.neighborhood !== 'all' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '';

  // Ensure neighborhoods are sorted alphabetically (А-Я)
  const sortedNeighborhoods = [...availableNeighborhoods].sort((a, b) =>
    a.localeCompare(b, 'bg')
  );

  return (
    <div className="relative text-white pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-blue-900/30 overflow-hidden min-h-[640px] bg-slate-950">
      {/* High-Resolution Beautiful Real Estate Background Photo - Clearly Visible */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('/assets/aistudio/hoise_8579d183.png')`,
        }}
      />

      {/* Gentle Translucent Gradient Overlay ensuring the background house is clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/30 to-slate-950/70" />
      <div className="absolute inset-0 bg-radial-[at_top_right] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10 sm:space-y-12">
        {/* Full-Width Spacious Headline with Ample Breathing Room */}
        <div className="w-full text-center space-y-4 pt-2">
          {/* Address badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold uppercase tracking-wider text-lime-300 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#67B82D] animate-ping" />
            <span>гр. Русе, ул. Кирил Старцев 3</span>
          </div>

          {/* Main Title - spaced and prominent */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] max-w-5xl mx-auto">
            СТОЛИЦА ИНВЕСТ НЕДВИЖИМИ ИМОТИ
          </h1>

          {/* Subtitle */}
          <p className="text-blue-100 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Пълно професионално съдействие при покупко-продажба и наем. Директна връзка с нашите брокери.
          </p>
        </div>

        {/* Carousel Container: Centered, Spacious & Clean (No side box) */}
        <div className="w-full max-w-5xl mx-auto">
          <TopListingsCarousel
            properties={topProperties}
            onSelectProperty={onSelectProperty}
          />
        </div>

        {/* Dynamic Search Box with Exact Requested Sequence:
            1. Град
            2. Квартал
            3. Тип имот
            4. Цена от - до
        */}
        <div id="search-box" className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-800 border border-white/60">
          {/* Top Deal Type Switcher Tabs (Всички, Продажба, Наем) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="inline-flex p-1.5 bg-slate-100/90 rounded-2xl gap-1">
              <button
                type="button"
                onClick={() => onFilterChange({ dealType: 'all' })}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  filters.dealType === 'all'
                    ? 'bg-[#2F54A3] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Всички оферти
              </button>
              <button
                type="button"
                onClick={() => onFilterChange({ dealType: 'sale' })}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  filters.dealType === 'sale'
                    ? 'bg-[#67B82D] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Продажби
              </button>
              <button
                type="button"
                onClick={() => onFilterChange({ dealType: 'rent' })}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  filters.dealType === 'rent'
                    ? 'bg-[#2F54A3] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Под наем
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold text-slate-600">
                Намерени оферти: <strong className="text-[#2F54A3] font-black text-base">{totalResults}</strong>
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="inline-flex items-center gap-1 text-xs text-[#2F54A3] hover:text-[#182C56] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer border border-blue-200/60"
                  title="Изчисти всички филтри"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Изчисти</span>
                </button>
              )}
            </div>
          </div>

          {/* Exact Sequence of Filters as Requested:
              1. Град
              2. Квартал
              3. Тип имот
              4. Цена от - до
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-4">
            {/* 1. ГРАД */}
            <div className="space-y-1.5">
              <label htmlFor="city-select" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#2F54A3] text-white text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                <span>Град</span>
              </label>
              <div className="relative">
                <select
                  id="city-select"
                  value={filters.city}
                  onChange={(e) => onFilterChange({ city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2F54A3] focus:border-transparent transition-all cursor-pointer appearance-none"
                >
                  <option value="all">Всички градове</option>
                  <option value="Русе">гр. Русе</option>
                  <option value="София">гр. София</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            {/* 2. КВАРТАЛ */}
            <div className="space-y-1.5">
              <label htmlFor="neighborhood-select" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#2F54A3] text-white text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                <span>Квартал</span>
              </label>
              <div className="relative">
                <select
                  id="neighborhood-select"
                  value={filters.neighborhood}
                  onChange={(e) => onFilterChange({ neighborhood: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2F54A3] focus:border-transparent transition-all cursor-pointer appearance-none"
                >
                  <option value="all">Всички квартали</option>
                  {sortedNeighborhoods.map((n) => (
                    <option key={n} value={n}>
                      кв. {n}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            {/* 3. ТИП ИМОТ */}
            <div className="space-y-1.5">
              <label htmlFor="category-select" className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#2F54A3] text-white text-[10px] font-black flex items-center justify-center shrink-0">3</span>
                <span>Тип имот</span>
              </label>
              <div className="relative">
                <select
                  id="category-select"
                  value={filters.category}
                  onChange={(e) => onFilterChange({ category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2F54A3] focus:border-transparent transition-all cursor-pointer appearance-none"
                >
                  <option value="all">Всички видове имоти</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            {/* 4. ЦЕНА ОТ - ДО */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#2F54A3] text-white text-[10px] font-black flex items-center justify-center shrink-0">4</span>
                <span>Цена (€) от - до</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="От €"
                  value={filters.minPrice}
                  onChange={(e) =>
                    onFilterChange({
                      minPrice: e.target.value ? Number(e.target.value) : '',
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2F54A3] focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="До €"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    onFilterChange({
                      maxPrice: e.target.value ? Number(e.target.value) : '',
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2F54A3] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Quick search input */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Търсене по референтен номер, ключова дума или квартал..."
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F54A3] transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
