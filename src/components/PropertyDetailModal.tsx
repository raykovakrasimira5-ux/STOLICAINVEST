import React, { useState } from 'react';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Layers,
  CheckCircle2,
  Phone,
  Mail,
  Share2,
  Printer,
  ChevronLeft,
  ChevronRight,
  Heart,
  Send,
  ExternalLink,
} from 'lucide-react';
import { Property } from '../types';
import { AnimatedBrokerAvatar } from './AnimatedBrokerAvatar';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    message: '',
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!property) return null;

  const isSale = property.dealType === 'sale';
  const priceFormatted = property.price.toLocaleString('bg-BG');
  const priceBgn = Math.round(property.price * 1.95583).toLocaleString('bg-BG');
  const pricePerSqm = Math.round(property.price / (property.area || 1)).toLocaleString('bg-BG');

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-black uppercase ${
                isSale ? 'bg-[#67B82D]/15 text-[#4D8C21]' : 'bg-blue-100 text-[#2F54A3]'
              }`}
            >
              {isSale ? 'Продажба' : 'Под наем'}
            </span>
            <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
              Реф. № {property.refNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer relative"
              title="Копирай линк"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 text-[10px] font-bold bg-[#152850] text-white px-2 py-1 rounded shadow-md whitespace-nowrap">
                  Копирано!
                </span>
              )}
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Принтирай оферта"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Favorite button */}
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Любими"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'
                }`}
              />
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer ml-1"
              title="Затвори"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6">
          {/* Header Title & Price (Location with NO exact street address) */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {property.title}
              </h2>
              {/* Removed exact street address as requested */}
              <div className="flex items-center gap-1.5 text-slate-600 text-sm mt-1.5">
                <MapPin className="w-4 h-4 text-[#2F54A3] shrink-0" />
                <span className="font-semibold text-slate-700">
                  гр. {property.city}, кв. {property.neighborhood}
                </span>
              </div>
            </div>

            <div className="text-left md:text-right shrink-0 bg-blue-50/80 p-3.5 rounded-2xl border border-blue-200/60">
              {property.oldPrice && property.oldPrice > property.price && (
                <div className="text-xs font-bold text-red-500 line-through mb-0.5">
                  Предишна цена: {property.oldPrice.toLocaleString('bg-BG')} €
                </div>
              )}
              <div className="text-2xl sm:text-3xl font-black text-[#2F54A3]">
                {property.originalCurrency === 'BGN' && property.originalPrice
                  ? `${property.originalPrice.toLocaleString('bg-BG')} лв.`
                  : `${priceFormatted} €`}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">
                {property.originalCurrency === 'BGN'
                  ? `~ ${property.price.toLocaleString('bg-BG')} € ${
                      isSale
                        ? `(${Math.round(property.price / (property.area || 1)).toLocaleString('bg-BG')} €/м²)`
                        : 'на месец'
                    }`
                  : isSale
                  ? `${pricePerSqm} €/м² • ~ ${priceBgn} лв.`
                  : `Наем на месец • ~ ${priceBgn} лв.`}
              </div>
            </div>
          </div>

          {/* Photo Gallery Carousel */}
          <div className="space-y-2">
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner group">
              <img
                src={property.images[currentImageIndex]}
                alt={`${property.title} - снимка ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Prev / Next buttons */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-3 right-3 bg-slate-950/70 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail selector */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 pt-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer border-2 ${
                      currentImageIndex === idx
                        ? 'border-[#2F54A3] scale-95 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Миниатюра ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Parameters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <Maximize className="w-5 h-5 text-[#2F54A3] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Обща площ</span>
              <span className="text-base font-extrabold text-slate-900">{property.area} м²</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <Bed className="w-5 h-5 text-[#2F54A3] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Спални</span>
              <span className="text-base font-extrabold text-slate-900">
                {property.bedrooms > 0 ? property.bedrooms : 'Студио / Офис'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <Bath className="w-5 h-5 text-[#2F54A3] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Бани</span>
              <span className="text-base font-extrabold text-slate-900">{property.bathrooms}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <Layers className="w-5 h-5 text-[#2F54A3] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Етаж</span>
              <span className="text-base font-extrabold text-slate-900">
                {property.floor ? `${property.floor} от ${property.totalFloors || ''}` : 'Самостоятелен'}
              </span>
            </div>
          </div>

          {/* Detailed Property Specs */}
          <div className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
              Основни параметри на имота
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2.5 gap-x-6 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Вид на имота:</span>
                <span className="font-semibold text-slate-900">{property.categoryLabel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Строителство:</span>
                <span className="font-semibold text-slate-900">{property.constructionType || 'Тухла / Монолит'}</span>
              </div>
              {property.yearBuilt && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Година на строеж:</span>
                  <span className="font-semibold text-slate-900">{property.yearBuilt} г.</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Град / Локация:</span>
                <span className="font-semibold text-slate-900">{property.city}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Квартал / Район:</span>
                <span className="font-semibold text-slate-900">{property.neighborhood}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Статус:</span>
                <span
                  className={`font-bold ${
                    property.status === 3
                      ? 'text-slate-600'
                      : property.status === 2
                      ? 'text-amber-600'
                      : 'text-[#4D8C21]'
                  }`}
                >
                  {property.statusLabel || (property.status === 3 ? 'Продаден' : property.status === 2 ? 'Резервиран' : 'Свободен за огледи')}
                </span>
              </div>

              {/* Technical fields from Estate Plus SpecialData */}
              {property.builtArea && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Застроена площ:</span>
                  <span className="font-semibold text-slate-900">{property.builtArea} м²</span>
                </div>
              )}
              {property.landArea && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Площ на парцела:</span>
                  <span className="font-semibold text-slate-900">{property.landArea} м²</span>
                </div>
              )}
              {property.openedArea && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Открита площ:</span>
                  <span className="font-semibold text-slate-900">{property.openedArea} м²</span>
                </div>
              )}
              {property.rooms && property.rooms > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Брой помещения:</span>
                  <span className="font-semibold text-slate-900">{property.rooms}</span>
                </div>
              )}
              {property.heatingText && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Отопление:</span>
                  <span className="font-semibold text-slate-900">{property.heatingText}</span>
                </div>
              )}
              {property.position && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Изложение:</span>
                  <span className="font-semibold text-slate-900">{property.position}</span>
                </div>
              )}
              {property.stage && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Етап на сградата:</span>
                  <span className="font-semibold text-slate-900">{property.stage}</span>
                </div>
              )}
              {property.statute && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Статут на земята:</span>
                  <span className="font-semibold text-slate-900">{property.statute}</span>
                </div>
              )}
              {property.kint && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">КИНТ:</span>
                  <span className="font-semibold text-slate-900">{property.kint}</span>
                </div>
              )}
              {property.height && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Макс. кота корниз:</span>
                  <span className="font-semibold text-slate-900">{property.height} м.</span>
                </div>
              )}
              {property.minPlanting && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Мин. озеленяване:</span>
                  <span className="font-semibold text-slate-900">{property.minPlanting}%</span>
                </div>
              )}
              {property.completeLevel && (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Степен на завършеност:</span>
                  <span className="font-semibold text-slate-900">{property.completeLevel}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Реф. код:</span>
                <span className="font-mono font-bold text-[#2F54A3]">{property.refNumber}</span>
              </div>
            </div>
          </div>

          {/* Amenities & Features */}
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
              Характеристики и удобства
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {property.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#67B82D] shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
              Подробно описание
            </h3>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </div>
          </div>

          {/* Location / Area Preview (General Neighborhood only - NO exact street address) */}
          <div className="p-4 rounded-2xl bg-[#152850] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-base text-white">Район на имота</h4>
              <p className="text-xs text-blue-200 mt-0.5">
                гр. {property.city}, кв. {property.neighborhood}
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${property.city}, ${property.neighborhood}, Bulgaria`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#67B82D] hover:bg-[#589E26] text-white font-bold text-xs transition-colors shrink-0 shadow-sm"
            >
              <span>Преглед на района в Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Responsible Broker with Animated Avatar & Booking Form */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            {/* Broker Info with Animated Avatar */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Отговорен брокер от Столица Инвест
                </span>
                <div className="flex items-center gap-3">
                  <AnimatedBrokerAvatar
                    name={property.agent.name}
                    role={property.agent.agencyRole}
                    size="xl"
                  />
                  <div>
                    <h4 className="text-base font-black text-slate-900 leading-snug">
                      {property.agent.name}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">{property.agent.agencyRole}</p>
                    <span className="inline-block mt-1 text-[10px] bg-emerald-50 text-[#4D8C21] font-bold px-2 py-0.5 rounded border border-emerald-200">
                      Лицензиран консултант
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center gap-2 text-slate-700 hover:text-[#2F54A3] font-semibold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#67B82D]" />
                    <span>{property.agent.phone}</span>
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center gap-2 text-slate-700 hover:text-[#2F54A3] font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#2F54A3]" />
                    <span>{property.agent.email}</span>
                  </a>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                <a
                  href={`https://wa.me/${property.agent.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Здравейте Столица Инвест, интересувам се от имот Ref № ${property.refNumber}: ${property.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Бързо съобщение във WhatsApp
                </a>

                <a
                  href={`viber://chat?number=%2B${property.agent.phone.replace(/[^0-9]/g, '')}`}
                  className="w-full py-2 px-4 rounded-xl bg-[#7360F2] hover:bg-[#6450e0] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  Съобщение във Viber
                </a>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="md:col-span-7 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
              <h4 className="text-sm font-black text-slate-900 mb-1">
                Заявете оглед със Столица Инвест
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                Попълнете Вашите данни и брокер ще се свърже с Вас за организиране на оглед.
              </p>

              {inquirySubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#67B82D] mx-auto mb-2" />
                  <h5 className="font-bold text-sm">Благодарим Ви! Запитването е изпратено.</h5>
                  <p className="text-xs mt-1 text-emerald-700">
                    Брокер от екипа на Столица Инвест ще се свърже с Вас в най-кратък срок.
                  </p>
                  <button
                    onClick={() => setInquirySubmitted(false)}
                    className="mt-3 text-xs text-[#2F54A3] underline font-semibold cursor-pointer"
                  >
                    Изпрати ново запитване
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Вашето име *"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2F54A3]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Телефон за връзка *"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2F54A3]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="email"
                      placeholder="Имейл адрес"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2F54A3]"
                    />
                    <input
                      type="date"
                      value={inquiryForm.preferredDate}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2F54A3] text-slate-700"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Допълнителни въпроси или удобен час за разговор..."
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2F54A3] resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#2F54A3] hover:bg-[#25468B] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    Изпрати запитване за оглед
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
