import React from 'react';
import { MapPin, Clock, Phone, Mail, Building2, Sparkles, MessageSquare } from 'lucide-react';

export const OfficesSection: React.FC = () => {
  return (
    <section id="offices-section" className="py-8">
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#2F54A3]">
          <Building2 className="w-3.5 h-3.5 text-[#67B82D]" />
          <span>Нашите локации в страната</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
          ОФИСИ НА СТОЛИЦА ИНВЕСТ
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Заповядайте на място за консултация или се свържете директно с нашите регионални координатори
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ОФИС В РУСЕ (ЛЯВ) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:border-[#2F54A3]/50">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#2F54A3]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2F54A3] border border-blue-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#67B82D] animate-ping" />
                Централен офис
              </span>
              <span className="text-xs font-semibold text-slate-400">Русе</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Офис в Русе
            </h3>

            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2 font-bold text-slate-900">
                <MapPin className="w-4 h-4 text-[#67B82D] shrink-0" />
                ул. „Кирил Старцев“ 3
              </p>
              <p className="flex items-center gap-2 font-medium text-slate-500">
                <Clock className="w-4 h-4 text-[#2F54A3] shrink-0" />
                Работно време: 09:00 - 18:00
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Телефони за контакт:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="tel:0876081309"
                className="px-4 py-2.5 rounded-xl bg-[#67B82D] hover:bg-[#589E26] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:scale-102 transition-all"
                title="Обадете се на 0876 081 309"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0876 081 309</span>
              </a>

              <a
                href="tel:0877633111"
                className="px-4 py-2.5 rounded-xl bg-[#2F54A3] hover:bg-[#25468B] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:scale-102 transition-all"
                title="Обадете се на 0877 633 111"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0877 633 111</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <a
                href="mailto:ruse@stolitsainvest.bg"
                className="flex-1 w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:text-[#2F54A3]"
                title="Имейл на офис Русе"
              >
                <Mail className="w-3.5 h-3.5 text-[#2F54A3]" />
                <span>ruse@stolitsainvest.bg</span>
              </a>

              <a
                href="https://wa.me/359876081309"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                title="Чат по WhatsApp"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* ОФИС В СОФИЯ (ДЕСЕН) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:border-[#67B82D]/50">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#67B82D]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#67B82D] border border-emerald-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#67B82D]" />
                Офис представителство
              </span>
              <span className="text-xs font-semibold text-slate-400">София</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Офис в София
            </h3>

            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2 font-medium text-slate-700">
                <Clock className="w-4 h-4 text-[#2F54A3] shrink-0" />
                Работно време: 09:00 - 18:00
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Телефони за контакт:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="tel:0894371916"
                className="px-4 py-2.5 rounded-xl bg-[#67B82D] hover:bg-[#589E26] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:scale-102 transition-all"
                title="Обадете се на 0894 371 916"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0894 371 916</span>
              </a>

              <a
                href="tel:0877633111"
                className="px-4 py-2.5 rounded-xl bg-[#2F54A3] hover:bg-[#25468B] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:scale-102 transition-all"
                title="Обадете се на 0877 633 111"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0877 633 111</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <a
                href="mailto:sofia@stolitsainvest.bg"
                className="flex-1 w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:text-[#2F54A3]"
                title="Имейл на офис София"
              >
                <Mail className="w-3.5 h-3.5 text-[#2F54A3]" />
                <span>sofia@stolitsainvest.bg</span>
              </a>

              <a
                href="https://wa.me/359894371916"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                title="Чат по WhatsApp"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
