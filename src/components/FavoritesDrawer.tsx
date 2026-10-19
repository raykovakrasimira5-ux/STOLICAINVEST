import React from 'react';
import { X, Trash2, ArrowRight, Heart } from 'lucide-react';
import { Property } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteProperties: Property[];
  onRemoveFavorite: (id: string) => void;
  onClearFavorites: () => void;
  onSelectProperty: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteProperties,
  onRemoveFavorite,
  onClearFavorites,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="text-base font-black text-slate-900">
              Любими Обяви ({favoriteProperties.length})
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {favoriteProperties.length > 0 && (
              <button
                onClick={onClearFavorites}
                className="text-xs text-slate-500 hover:text-red-600 font-medium px-2 py-1 rounded transition-colors cursor-pointer"
                title="Изчисти всички"
              >
                Изчисти
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {favoriteProperties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-300">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-700">Нямате запазени имоти</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Кликнете върху сърчицето на всяка обява, за да я добавите към списъка с любими оферти за бърз преглед и сравнение.
              </p>
            </div>
          ) : (
            favoriteProperties.map((prop) => (
              <div
                key={prop.id}
                className="flex gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#2F54A3]/50 transition-colors group cursor-pointer"
                onClick={() => {
                  onSelectProperty(prop);
                  onClose();
                }}
              >
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-black uppercase text-[#2F54A3] bg-blue-50 px-1.5 py-0.5 rounded">
                        Ref {prop.refNumber}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFavorite(prop.id);
                        }}
                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                        title="Премахни"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#2F54A3] transition-colors truncate mt-1">
                      {prop.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {prop.city}, {prop.neighborhood}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-black text-[#2F54A3]">
                      {prop.price.toLocaleString('bg-BG')} €
                    </span>
                    <span className="text-[11px] font-semibold text-[#2F54A3] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Преглед <ArrowRight className="w-3 h-3 text-[#67B82D]" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {favoriteProperties.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#2F54A3] hover:bg-[#25468B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Продължи разглеждането
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
