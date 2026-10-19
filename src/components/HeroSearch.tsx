import React from 'react';
import { Search, MapPin, Compass, Building, ArrowRight, Phone, Sparkles, RotateCcw, Home, Layers } from 'lucide-react';
import { PropertyFilterState, PROPERTY_TYPES } from '../types';

interface HeroSearchProps {
  filters: PropertyFilterState;
  onFilterChange: (filters: Partial<PropertyFilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
  availableNeighborhoods?: string[];
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  availableNeighborhoods = ['Алеи Възраждане', 'Възраждане', 'Дружба', 'Здравец', 'Център'],
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
    <div className="relative bg-gradient-to-br from-[#0c1830] via-[#152a55] to-[#25468B] text-white pt-8 sm:pt-10 pb-12 sm:pb-14 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40 overflow-hidden">
      {/* Dynamic Animated Glow & Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#67B82D]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-20 -left-10 w-[450px] h-[450px] bg-[#2F54A3]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6 sm:space-y-8">
        {/* Dynamic Top Badge & Hero Headline */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-lime-300 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#67B82D] animate-ping" />
              <span>Столица Инвест • гр. Русе, ул. Кирил Старцев 3</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Недвижими Имоти в <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-400 to-sky-300">град Русе</span>
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Пълно професионално съдействие при покупко-продажба и наем. Директна връзка с нашите брокери.
            </p>
          </div>

          {/* Quick Contact Box with the two official phone numbers */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-xl">
            <div className="text-center sm:text-left pr-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-lime-300 block">
                Свържете се с нас веднага
              </span>
              <span className="text-xs text-white/80 font-medium">
                Работно време: 09:00 - 18:00
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <a
                href="tel:0876081309"
                className="px-4 py-2.5 rounded-2xl bg-[#67B82D] hover:bg-[#589E26] text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0876 081 309</span>
              </a>

              <a
                href="tel:0877633111"
                className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0877 633 111</span>
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Search Box with Exact Requested Sequence:
            1. Град
            2. Квартал
            3. Тип имот
            4. Цена от - до
        */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl text-slate-800 border border-slate-100">
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
              1. ГРАД
              2. КВАРТАЛ
              3. ТИП ИМОТ
              4. ЦЕНА (ОТ - ДО)
              5. ТЪРСЕНЕ ПО ТЕКСТ / REF
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 pt-5">
            {/* 1. ГРАД (City) */}
            <div className="lg:col-span-2">
              <label htmlFor="city-select" className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <span>1. Град</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#2F54A3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="city-select"
                  value={filters.city}
                  onChange={(e) => onFilterChange({ city: e.target.value })}
                  className="w-full pl-9 pr-6 py-2.5 text-xs sm:text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F54A3]/20 focus:border-[#2F54A3] transition-all appearance-none cursor-pointer"
                >
                  <option value="Русе">Русе</option>
                  <option value="all">Всички градове</option>
                </select>
              </div>
            </div>

            {/* 2. КВАРТАЛ (Neighborhood) */}
            <div className="lg:col-span-3">
              <label htmlFor="neighborhood-select" className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>2. Квартал (А-Я)</span>
                <span className="text-[10px] text-slate-400 font-semibold lowercase">азбучен ред</span>
              </label>
              <div className="relative">
                <Compass className="w-4 h-4 text-[#2F54A3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="neighborhood-select"
                  value={filters.neighborhood || 'all'}
                  onChange={(e) => onFilterChange({ neighborhood: e.target.value })}
                  className="w-full pl-9 pr-7 py-2.5 text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F54A3]/20 focus:border-[#2F54A3] transition-all appearance-none cursor-pointer"
                >
                  <option value="all">Всички квартали</option>
                  {sortedNeighborhoods.map((n) => (
                    <option key={n} value={n}>
                      кв. {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. ТИП ИМОТ (Property Type with exact list) */}
            <div className="lg:col-span-3">
              <label htmlFor="category-select" className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                <span>3. Тип имот</span>
              </label>
              <div className="relative">
                <Home className="w-4 h-4 text-[#2F54A3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="category-select"
                  value={filters.category}
                  onChange={(e) => onFilterChange({ category: e.target.value })}
                  className="w-full pl-9 pr-7 py-2.5 text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F54A3]/20 focus:border-[#2F54A3] transition-all appearance-none cursor-pointer"
                >
                  <option value="all">Всички типове имоти</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. ЦЕНА (ОТ - ДО) (Price from - to) */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                <span>4. Цена (€)</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  id="min-price-input"
                  type="number"
                  placeholder="От €"
                  value={filters.minPrice}
                  onChange={(e) =>
                    onFilterChange({
                      minPrice: e.target.value === '' ? '' : Number(e.target.value),
                    })
                  }
                  className="w-full px-2.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F54A3]/20 focus:border-[#2F54A3]"
                />
                <input
                  id="max-price-input"
                  type="number"
                  placeholder="До €"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    onFilterChange({
                      maxPrice: e.target.value === '' ? '' : Number(e.target.value),
                    })
                  }
                  className="w-full px-2.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F54A3]/20 focus:border-[#2F54A3]"
                />
              </div>
            </div>

            {/* 5. КЛЮЧОВА ДУМА / REF № */}
            <div className="lg:col-span-2 relative">
              <label htmlFor="search-input" className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                Ключова дума / Ref №
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="search-input"
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                  placeholder="SI-1042, обзаведен..."
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F54A3]/20 focus:border-[#2F54A3] transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
