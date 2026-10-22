import React from 'react';
import { Heart, User, Facebook, Instagram, Linkedin, PlusCircle, Building2, Key, Tag } from 'lucide-react';
import { AgencyLogo } from './AgencyLogo';
import { UserProfile } from '../types';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenAuthModal: () => void;
  onOpenLogoSettings: () => void;
  customLogoUrl?: string;
  onResetFilters: () => void;
  user: UserProfile | null;
  saleCount: number;
  rentCount: number;
  activeDealType: 'all' | 'sale' | 'rent';
  onSelectDealType: (dealType: 'all' | 'sale' | 'rent') => void;
  onOpenSellModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenFavorites,
  onOpenAuthModal,
  onOpenLogoSettings,
  customLogoUrl,
  onResetFilters,
  user,
  saleCount,
  rentCount,
  activeDealType,
  onSelectDealType,
  onOpenSellModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-bar in deep brand navy: only working hours and social links */}
      <div className="bg-[#152850] text-slate-200 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#67B82D] animate-pulse"></span>
            <span className="text-slate-300 font-semibold tracking-wide">Работно време: 09:00 - 18:00</span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-1 hover:bg-white/10 rounded-md"
              title="Столица Инвест във Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-1 hover:bg-white/10 rounded-md"
              title="Столица Инвест в Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-1 hover:bg-white/10 rounded-md"
              title="Столица Инвест в LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* Official Brand Logo - Non-deformable */}
        <button
          onClick={onResetFilters}
          className="text-left focus:outline-none cursor-pointer group py-1 shrink-0"
          title="Столица Инвест - Начало"
        >
          <AgencyLogo customLogoUrl={customLogoUrl} size="md" />
        </button>

        {/* Requested Nav Buttons directly in the white header:
            1. ПРОДАЖБИ with count & filter
            2. НАЕМИ with count & filter
            3. ПРОДАЙ/ОТДАЙ СВОЯ ИМОТ
        */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {/* ПРОДАЖБИ */}
          <button
            type="button"
            onClick={() => onSelectDealType('sale')}
            className={`flex items-center gap-2 px-3 lg:px-3.5 py-2 rounded-xl text-xs lg:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeDealType === 'sale'
                ? 'bg-[#67B82D] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#2F54A3] hover:bg-slate-100/80 border border-slate-200'
            }`}
            title="Виж всички имоти за продажба"
          >
            <Tag className="w-3.5 h-3.5 shrink-0" />
            <span>ПРОДАЖБИ</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                activeDealType === 'sale' ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {saleCount}
            </span>
          </button>

          {/* НАЕМИ */}
          <button
            type="button"
            onClick={() => onSelectDealType('rent')}
            className={`flex items-center gap-2 px-3 lg:px-3.5 py-2 rounded-xl text-xs lg:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeDealType === 'rent'
                ? 'bg-[#2F54A3] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#2F54A3] hover:bg-slate-100/80 border border-slate-200'
            }`}
            title="Виж всички имоти под наем"
          >
            <Key className="w-3.5 h-3.5 shrink-0" />
            <span>НАЕМИ</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                activeDealType === 'rent' ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {rentCount}
            </span>
          </button>

          {/* ПРОДАЙ/ОТДАЙ СВОЯ ИМОТ */}
          <button
            type="button"
            onClick={onOpenSellModal}
            className="flex items-center gap-1.5 px-3 lg:px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#2F54A3] to-[#152850] hover:from-[#25468B] hover:to-[#0F1E3D] text-white text-xs lg:text-sm font-black uppercase tracking-wider shadow-xs hover:shadow-md transition-all cursor-pointer hover:scale-102 border border-blue-400/30"
            title="Свържете се с нас за продажба или отдаване: 0876 081 309 / 0877 633 111"
          >
            <PlusCircle className="w-3.5 h-3.5 text-lime-300 shrink-0" />
            <span className="whitespace-nowrap">ПРОДАЙ / ОТДАЙ СВОЯ ИМОТ</span>
          </button>
        </nav>

        {/* Action Controls (Right side: Favorites & My Profile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Favorites Button */}
          <button
            id="favorites-btn"
            onClick={onOpenFavorites}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:text-[#2F54A3] hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-colors cursor-pointer border border-slate-200 shrink-0"
            title="Любими обяви"
          >
            <Heart
              className={`w-4 h-4 ${
                favoritesCount > 0 ? 'fill-red-500 text-red-500' : 'text-slate-500'
              }`}
            />
            <span className="hidden sm:inline">Любими</span>
            {favoritesCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#67B82D] rounded-full shadow-xs">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* My Profile Button (Replaces "Добави обява") */}
          <button
            id="my-profile-btn"
            onClick={onOpenAuthModal}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0 ${
              user
                ? 'bg-blue-50 hover:bg-blue-100 text-[#2F54A3] border border-blue-200'
                : 'bg-[#2F54A3] hover:bg-[#25468B] text-white border border-[#2F54A3]'
            }`}
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-5 h-5 rounded-full object-cover border border-white"
              />
            ) : (
              <User className={`w-4 h-4 ${user ? 'text-[#2F54A3]' : 'text-[#67B82D]'}`} />
            )}
            <span className="whitespace-nowrap">{user ? user.name.split(' ')[0] : 'Моят профил'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Bar with the requested ПРОДАЖБИ / НАЕМИ / ПРОДАЙ ИМОТ buttons */}
      <div className="flex md:hidden items-center justify-between gap-1.5 px-3 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto">
        <button
          type="button"
          onClick={() => onSelectDealType('sale')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shrink-0 transition-all ${
            activeDealType === 'sale'
              ? 'bg-[#67B82D] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <span>ПРОДАЖБИ</span>
          <span className="text-[10px] px-1 bg-black/10 rounded-full font-bold">{saleCount}</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectDealType('rent')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shrink-0 transition-all ${
            activeDealType === 'rent'
              ? 'bg-[#2F54A3] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <span>НАЕМИ</span>
          <span className="text-[10px] px-1 bg-black/10 rounded-full font-bold">{rentCount}</span>
        </button>

        <button
          type="button"
          onClick={onOpenSellModal}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#2F54A3] text-white text-xs font-black uppercase tracking-wider shrink-0 shadow-2xs"
        >
          <PlusCircle className="w-3 h-3 text-lime-300" />
          <span>ПРОДАЙ / ОТДАЙ</span>
        </button>
      </div>
    </header>
  );
};
