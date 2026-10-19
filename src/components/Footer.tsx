import React from 'react';
import { Phone, Mail, MapPin, Award, CheckCircle, ShieldCheck, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { AgencyLogo } from './AgencyLogo';

interface FooterProps {
  customLogoUrl?: string;
  onOpenAuthModal: () => void;
  onOpenFavorites: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  customLogoUrl,
  onOpenAuthModal,
  onOpenFavorites,
}) => {
  return (
    <footer className="bg-[#0F1E3D] text-slate-300 pt-12 pb-8 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand & Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-blue-900/60">
          {/* Column 1: Logo & Mission */}
          <div className="md:col-span-1 space-y-3">
            <AgencyLogo customLogoUrl={customLogoUrl} variant="light" size="md" />
            <p className="text-xs text-slate-400 leading-relaxed mt-2">
              Агенция за недвижими имоти Столица Инвест гр. Русе. Професионално съдействие при покупко-продажба и наем на жилищни и бизнес имоти.
            </p>
            <div className="flex items-center gap-2 text-xs text-lime-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#67B82D]" />
              <span className="font-semibold">Лицензирана агенция за недвижими имоти</span>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2.5 text-slate-400">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-blue-900/50 hover:bg-[#2F54A3] hover:text-white flex items-center justify-center transition-colors"
                title="Facebook страница"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-blue-900/50 hover:bg-[#2F54A3] hover:text-white flex items-center justify-center transition-colors"
                title="Instagram профил"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-blue-900/50 hover:bg-[#2F54A3] hover:text-white flex items-center justify-center transition-colors"
                title="LinkedIn профил"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Contacts */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Офис гр. Русе
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#67B82D] shrink-0 mt-0.5" />
                <span className="text-white font-medium">гр. Русе, ул. „Кирил Старцев“ 3</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#67B82D] shrink-0" />
                <span>Работно време: 09:00 - 18:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#67B82D] shrink-0" />
                <a href="tel:0876081309" className="hover:text-white transition-colors text-white font-semibold">
                  0876 081 309
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#67B82D] shrink-0" />
                <a href="tel:0877633111" className="hover:text-white transition-colors text-white font-semibold">
                  0877 633 111
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#67B82D] shrink-0" />
                <a href="mailto:office@stolicainvest.bg" className="hover:text-white transition-colors">
                  office@stolicainvest.bg
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Навигация
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenAuthModal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Моят профил / Вход
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFavorites}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Запазени любими имоти
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Правно обслужване на сделки
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Пазарна оценка на имот
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Guarantees */}
          <div className="bg-[#152850]/90 p-4 rounded-2xl border border-blue-800/40">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#67B82D]" />
              Защо Столица Инвест?
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#67B82D] shrink-0 mt-0.5" />
                <span>100% проверена правна чистота на имотите</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#67B82D] shrink-0 mt-0.5" />
                <span>Индивидуални огледи и консултации</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#67B82D] shrink-0 mt-0.5" />
                <span>Офис на топ локация в центъра на Русе</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Team Strip for Ruse Office */}
        <div className="py-6 border-b border-blue-900/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#67B82D] block">
                Нашият екип в град Русе
              </span>
              <h5 className="text-sm font-bold text-white mt-0.5">
                Столица Инвест • ул. „Кирил Старцев“ 3
              </h5>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto">
              <div className="bg-[#152850] px-3 py-2 rounded-xl border border-blue-800/40">
                <p className="text-xs font-bold text-white">Елена Воронова</p>
                <p className="text-[10px] text-blue-200">Мениджър и главен брокер</p>
              </div>
              <div className="bg-[#152850] px-3 py-2 rounded-xl border border-blue-800/40">
                <p className="text-xs font-bold text-white">Георги Георгиев</p>
                <p className="text-[10px] text-blue-200">Брокер</p>
              </div>
              <div className="bg-[#152850] px-3 py-2 rounded-xl border border-blue-800/40">
                <p className="text-xs font-bold text-white">Антон Жвакин</p>
                <p className="text-[10px] text-blue-200">Брокер</p>
              </div>
              <div className="bg-[#152850] px-3 py-2 rounded-xl border border-blue-800/40">
                <p className="text-xs font-bold text-white">Красимира Райкова</p>
                <p className="text-[10px] text-blue-200">Офис асистент</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Столица Инвест ООД • Русе, ул. Кирил Старцев 3. Всички права запазени.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Политика за поверителност</span>
            <span>•</span>
            <span>Общи условия</span>
            <span>•</span>
            <span>Етичен кодекс на НСНИ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
