import React from 'react';
import { Phone, Heart, User, Facebook, Instagram, Linkedin, Sparkles } from 'lucide-react';
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
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenFavorites,
  onOpenAuthModal,
  onOpenLogoSettings,
  customLogoUrl,
  onResetFilters,
  user,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-bar in Столица Инвест deep brand navy */}
      <div className="bg-[#152850] text-slate-200 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#67B82D] animate-pulse"></span>
              <span className="text-slate-300 font-medium">Столица Инвест гр. Русе • ул. Кирил Старцев 3</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-medium">Работно време: 09:00 - 18:00</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Direct Phone Numbers */}
            <div className="flex items-center gap-3">
              <a
                href="tel:0876081309"
                className="flex items-center gap-1 text-white hover:text-[#67B82D] transition-colors font-bold"
                title="Обадете се на 0876 081 309"
              >
                <Phone className="w-3.5 h-3.5 text-[#67B82D]" />
                <span>0876 081 309</span>
              </a>
              <span className="text-slate-600">•</span>
              <a
                href="tel:0877633111"
                className="flex items-center gap-1 text-white hover:text-[#67B82D] transition-colors font-bold"
                title="Обадете се на 0877 633 111"
              >
                <span>0877 633 111</span>
              </a>
            </div>

            <span className="text-slate-600">•</span>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 text-slate-300">
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

            <span className="text-slate-600">•</span>

            <button
              onClick={onOpenLogoSettings}
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer text-xs"
              title="Информация за брандинга"
            >
              <Sparkles className="w-3 h-3 text-[#67B82D]" />
              <span>Лого</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Official Brand Logo */}
        <button
          onClick={onResetFilters}
          className="text-left focus:outline-none cursor-pointer group py-1"
          title="Столица Инвест - Начало"
        >
          <AgencyLogo customLogoUrl={customLogoUrl} size="md" />
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Social Links on mobile/tablet */}
          <div className="flex sm:hidden items-center gap-1 text-slate-600 mr-1">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:text-[#2F54A3]"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:text-[#2F54A3]"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:text-[#2F54A3]"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Social links for desktop */}
          <div className="hidden lg:flex items-center gap-1.5 pr-2 border-r border-slate-200">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-500 hover:text-[#2F54A3] hover:bg-slate-100 transition-colors"
              title="Facebook страница"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-500 hover:text-[#2F54A3] hover:bg-slate-100 transition-colors"
              title="Instagram профил"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-500 hover:text-[#2F54A3] hover:bg-slate-100 transition-colors"
              title="LinkedIn профил"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Favorites Button */}
          <button
            id="favorites-btn"
            onClick={onOpenFavorites}
            className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-700 hover:text-[#2F54A3] hover:bg-slate-50 font-semibold text-sm transition-colors cursor-pointer border border-slate-200"
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer ${
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
            <span>{user ? user.name.split(' ')[0] : 'Моят профил'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
