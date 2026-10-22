import React, { useState } from 'react';
import { X, Phone, Mail, Building, MapPin, CheckCircle, Sparkles, Send, Clock } from 'lucide-react';
import { PROPERTY_TYPES } from '../types';

interface SellPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellPropertyModal: React.FC<SellPropertyModalProps> = ({ isOpen, onClose }) => {
  const [dealIntent, setDealIntent] = useState<'sale' | 'rent'>('sale');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] = useState('2-стаен');
  const [cityQuarter, setCityQuarter] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setCityQuarter('');
    setPrice('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#0d1c3a] via-[#1a3468] to-[#2F54A3] p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#67B82D]/15 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Затвори"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-lime-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#67B82D]" />
            <span>Безплатна оценка и реализация</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            ПРОДАЙ / ОТДАЙ СВОЯ ИМОТ
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            Свържете се директно с нашите експерти за бърза продажба или наемане с гарантирана сигурност и изгодни условия.
          </p>
        </div>

        {/* Direct Contacts Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Директни контакти с нашите консултанти (09:00 - 18:00):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href="tel:0876081309"
              className="px-3.5 py-2.5 rounded-xl bg-[#67B82D] hover:bg-[#589E26] text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>0876 081 309</span>
            </a>
            <a
              href="tel:0877633111"
              className="px-3.5 py-2.5 rounded-xl bg-[#2F54A3] hover:bg-[#25468B] text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>0877 633 111</span>
            </a>
            <a
              href="mailto:stolitsainvest@mail.bg"
              className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all truncate"
              title="stolitsainvest@mail.bg"
            >
              <Mail className="w-3.5 h-3.5 text-[#2F54A3] shrink-0" />
              <span className="truncate">stolitsainvest@mail.bg</span>
            </a>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#67B82D]" />
              <span>Работно време: 09:00 - 18:00</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/359876081309"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-bold hover:underline"
              >
                WhatsApp
              </a>
              <span>•</span>
              <a
                href="viber://chat?number=%2B359876081309"
                className="text-[#7360F2] font-bold hover:underline"
              >
                Viber
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Owner Submission Form */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#67B82D] flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Запитването за Вашия имот е получено!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Благодарим Ви, {name}! Наш брокер ще се свърже с Вас на телефон <strong>{phone}</strong> в рамките на работното време за безплатна оценка и оглед.
              </p>
              <button
                type="button"
                onClick={handleResetForm}
                className="mt-4 px-6 py-2.5 bg-[#2F54A3] hover:bg-[#25468B] text-white font-bold text-sm rounded-xl cursor-pointer"
              >
                Затвори прозореца
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Какво желаете да направите?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDealIntent('sale')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                      dealIntent === 'sale'
                        ? 'bg-[#67B82D] text-white border-[#67B82D] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Искам да ПРОДАМ имот
                  </button>
                  <button
                    type="button"
                    onClick={() => setDealIntent('rent')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                      dealIntent === 'rent'
                        ? 'bg-[#2F54A3] text-white border-[#2F54A3] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Искам да ОТДАМ ПОД НАЕМ
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Вашето име *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="напр. Иван Иванов"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F54A3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Телефон за връзка *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="напр. 0888 123 456"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F54A3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Тип имот
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F54A3]"
                  >
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Град / Квартал
                  </label>
                  <input
                    type="text"
                    value={cityQuarter}
                    onChange={(e) => setCityQuarter(e.target.value)}
                    placeholder="напр. Русе, Център"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F54A3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ориентировъчна цена (€)
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="напр. 95 000 €"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F54A3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Допълнителна информация (по избор)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Опишете накратко имота (етаж, състояние, площ...)"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F54A3] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-bold text-xs cursor-pointer"
                >
                  Отказ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#67B82D] hover:bg-[#589E26] text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer hover:scale-102 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Изпрати запитване към Столица Инвест</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
