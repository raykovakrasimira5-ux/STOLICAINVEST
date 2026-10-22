import React from 'react';
import { Heart, MapPin, Bed, Bath, Maximize, Layers, Phone, ArrowUpRight } from 'lucide-react';
import { Property } from '../types';
import { AnimatedBrokerAvatar } from './AnimatedBrokerAvatar';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  layout = 'grid',
}) => {
  const isSale = property.dealType === 'sale';
  const priceFormatted = property.price.toLocaleString('bg-BG');
  const priceBgn = Math.round(property.price * 1.95583).toLocaleString('bg-BG');
  const pricePerSqm = Math.round(property.price / (property.area || 1)).toLocaleString('bg-BG');

  const isList = layout === 'list';

  return (
    <div
      id={`property-card-${property.id}`}
      className={`group bg-white rounded-2xl border border-slate-200/90 hover:border-[#2F54A3]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ${
        isList ? 'md:flex-row' : ''
      }`}
    >
      {/* Image Container - Clickable to open property details */}
      <div
        onClick={() => onSelectProperty(property)}
        className={`relative overflow-hidden cursor-pointer select-none ${
          isList ? 'md:w-72 lg:w-84 shrink-0' : 'w-full h-56 sm:h-64'
        }`}
        title="Кликнете за преглед на офертата"
      >
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider shadow-xs ${
                isSale ? 'bg-[#67B82D] text-white' : 'bg-[#2F54A3] text-white'
              }`}
            >
              {isSale ? 'Продажба' : 'Под наем'}
            </span>
            {property.featured && (
              <span className="px-2 py-1 rounded-md text-[11px] font-black bg-[#2F54A3] text-white uppercase tracking-wide shadow-xs border border-blue-400/40">
                Топ оферта
              </span>
            )}
            {property.isNew && (
              <span className="px-2 py-1 rounded-md text-[11px] font-bold bg-white text-slate-900 shadow-xs">
                Ново
              </span>
            )}
          </div>

          {/* Favorite button (stop propagation so it doesn't open the modal) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white flex items-center justify-center text-slate-700 hover:text-red-500 shadow-md transition-transform active:scale-90 cursor-pointer"
            title={isFavorite ? 'Премахни от любими' : 'Добави в любими'}
            aria-label="Любими"
          >
            <Heart
              className={`w-4.5 h-4.5 transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'
              }`}
            />
          </button>
        </div>

        {/* Bottom Image Info (Ref number & photos count) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium pointer-events-none">
          <span className="bg-slate-950/80 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-mono border border-slate-700">
            Ref {property.refNumber}
          </span>
          <span className="bg-slate-950/80 backdrop-blur-xs px-2 py-0.5 rounded text-[11px]">
            {property.images.length} снимки
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header - Clickable to open property details */}
          <div
            onClick={() => onSelectProperty(property)}
            className="flex items-baseline justify-between gap-2 mb-1.5 cursor-pointer group/price select-none"
            title="Кликнете за преглед на офертата"
          >
            <div>
              <span className="text-xl sm:text-2xl font-black text-[#2F54A3] group-hover/price:text-[#1e3c7b] transition-colors tracking-tight">
                {priceFormatted} €
              </span>
              {isSale ? (
                <span className="text-xs text-slate-500 ml-2 font-medium">
                  ({pricePerSqm} €/м²)
                </span>
              ) : (
                <span className="text-xs text-slate-500 ml-1.5 font-medium">
                  / месец
                </span>
              )}
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline" title="Ориентировъчна цена в лева">
              ~ {priceBgn} лв.
            </span>
          </div>

          {/* Title - Clickable to open property details */}
          <h3
            onClick={() => onSelectProperty(property)}
            className="text-base font-bold text-slate-900 hover:text-[#2F54A3] transition-colors cursor-pointer line-clamp-1 mb-1.5"
            title={property.title}
          >
            {property.title}
          </h3>

          {/* Location - Only City and Neighborhood (NO exact street address) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#2F54A3] shrink-0" />
            <span className="truncate font-semibold">
              гр. {property.city}, кв. {property.neighborhood}
            </span>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-4 gap-2 py-3 px-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center mb-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <Maximize className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Площ</span>
              </div>
              <span className="font-bold text-slate-800 text-xs sm:text-sm mt-0.5">
                {property.area} м²
              </span>
            </div>

            <div className="flex flex-col items-center border-l border-slate-200">
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <Bed className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Спални</span>
              </div>
              <span className="font-bold text-slate-800 text-xs sm:text-sm mt-0.5">
                {property.bedrooms > 0 ? property.bedrooms : '—'}
              </span>
            </div>

            <div className="flex flex-col items-center border-l border-slate-200">
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <Bath className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Бани</span>
              </div>
              <span className="font-bold text-slate-800 text-xs sm:text-sm mt-0.5">
                {property.bathrooms}
              </span>
            </div>

            <div className="flex flex-col items-center border-l border-slate-200">
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Етаж</span>
              </div>
              <span className="font-bold text-slate-800 text-xs sm:text-sm mt-0.5">
                {property.floor ? `${property.floor}/${property.totalFloors || ''}` : 'Къща'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer with Animated Broker Avatar & View Details Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
          {/* Animated broker avatar and contact */}
          <div className="flex items-center gap-2.5 min-w-0">
            <AnimatedBrokerAvatar
              name={property.agent.name}
              role={property.agent.agencyRole}
              size="sm"
            />
            <div className="truncate text-left">
              <p className="text-[11px] font-bold text-slate-800 truncate leading-tight">
                {property.agent.name}
              </p>
              <a
                href={`tel:${property.agent.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] text-slate-500 hover:text-[#2F54A3] transition-colors flex items-center gap-1 leading-tight font-medium"
              >
                <Phone className="w-2.5 h-2.5 text-[#67B82D]" />
                <span>{property.agent.phone}</span>
              </a>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={() => onSelectProperty(property)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2F54A3] hover:bg-[#25468B] text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
          >
            <span>Детайли</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#67B82D]" />
          </button>
        </div>
      </div>
    </div>
  );
};
