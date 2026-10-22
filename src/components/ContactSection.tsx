import React from 'react';
import { Phone, Mail, Clock, MessageSquare, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section className="mt-12 bg-gradient-to-br from-[#0c1938] via-[#142a5c] to-[#0A1325] rounded-3xl p-6 sm:p-10 text-white border border-blue-900/50 shadow-2xl relative overflow-hidden">
      {/* Decorative background glow accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#67B82D]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#2F54A3]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Side: Header, Online Status & Working Hours */}
        <div className="space-y-4 text-center lg:text-left max-w-xl">
          <div className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#67B82D]/20 text-lime-300 border border-[#67B82D]/40 text-xs font-black uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-[#67B82D] animate-ping" />
              Онлайн консултанти
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs text-blue-200 font-mono bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <Clock className="w-3.5 h-3.5 text-lime-300" />
              09:00 - 18:00
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
            СВЪРЖЕТЕ СЕ С НАС ВЕДНАГА
          </h2>

          <p className="text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
            Работно време: 09:00 - 18:00. Пълно съдействие при покупко-продажба, наем, безплатни консултации и огледи на имоти в гр. Русе и гр. София.
          </p>

          <p className="text-xs text-slate-300 font-mono">
            Офис Русе: ул. „Кирил Старцев“ 3
          </p>
        </div>

        {/* Right Side: Phone calls, WhatsApp, Viber, and Email */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/20 shadow-xl">
          {/* Direct Phone Numbers */}
          <div className="space-y-2.5 w-full sm:w-64 lg:w-72">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block text-center sm:text-left">
              Директни телефони:
            </span>

            <a
              href="tel:0876081309"
              className="w-full px-5 py-3.5 rounded-2xl bg-[#67B82D] hover:bg-[#589E26] text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer hover:scale-102 active:scale-98"
              title="Обадете се на 0876 081 309"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span className="tracking-wide">0876 081 309</span>
            </a>

            <a
              href="tel:0877633111"
              className="w-full px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer hover:scale-102 active:scale-98"
              title="Обадете се на 0877 633 111"
            >
              <Phone className="w-4 h-4 text-lime-300" />
              <span className="tracking-wide">0877 633 111</span>
            </a>
          </div>

          {/* Social Messaging: WhatsApp & Viber */}
          <div className="space-y-2.5 w-full sm:w-64 lg:w-72 pt-3 border-t border-white/15">
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block text-center sm:text-left">
              Пишете ни:
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/359876081309?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D0%B5%D0%B9%D1%82%D0%B5%2C%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D0%B2%D0%B0%D0%BC%20%D1%81%D0%B5%20%D0%BE%D1%82%20%D0%B8%D0%BC%D0%BE%D1%82%20%D0%B2%20%D0%A1%D1%82%D0%BE%D0%BB%D0%B8%D1%86%D0%B0%20%D0%98%D0%BD%D0%B2%D0%B5%D1%81%D1%82"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
                title="Пишете ни в WhatsApp"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.777.818 2.791.819h.005c3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.765-5.773-5.765zm3.376 8.204c-.14.394-.711.724-1.026.772-.315.048-.71.077-2.072-.472-1.745-.705-2.885-2.474-2.973-2.59-.088-.116-.71-1.042-.71-1.989 0-.947.492-1.413.667-1.606.175-.193.385-.241.513-.241.129 0 .257.001.369.006.118.006.276-.044.432.333.16.386.545 1.332.593 1.428.048.096.08.209.016.337-.064.128-.096.208-.192.32-.096.112-.203.25-.29.336-.096.096-.197.2-.084.393.112.193.498.822 1.069 1.331.734.654 1.353.857 1.545.953.193.096.305.08.417-.048.112-.128.481-.561.61-.754.128-.192.257-.16.433-.096.177.064 1.123.53 1.315.626.193.096.321.144.369.225.048.08.048.465-.092.859z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.004L2 22l5.127-1.344C8.563 21.503 10.231 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.574 0-3.057-.458-4.316-1.248l-.309-.194-3.044.798.812-2.969-.213-.339C4.102 14.945 3.6 13.518 3.6 12c0-4.632 3.768-8.4 8.4-8.4 4.633 0 8.4 3.768 8.4 8.4 0 4.633-3.767 8.4-8.4 8.4z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Viber Button */}
              <a
                href="viber://chat?number=%2B359876081309"
                className="px-3 py-2.5 rounded-xl bg-[#7360F2] hover:bg-[#6450e0] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
                title="Пишете ни във Viber"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M19.294 15.69c-.439-.333-.918-.544-1.464-.263-.357.183-.717.391-1.07.601-.252.15-.494.135-.742-.016-1.579-.964-2.825-2.228-3.784-3.821-.148-.246-.145-.487.01-.734.208-.332.427-.655.617-.999.309-.56.096-1.05-.278-1.488-.588-.69-1.205-1.357-1.841-2.001-.462-.47-1.002-.455-1.484.02-.464.457-.869.967-1.121 1.573-.417 1.005-.333 1.996.113 2.977 1.042 2.296 2.531 4.254 4.394 5.922 1.83 1.638 3.918 2.873 6.326 3.528.983.267 1.93.181 2.823-.338.528-.306.945-.733 1.282-1.248.337-.514.288-1.044-.199-1.472-.647-.573-1.31-1.134-1.986-1.685l.12-.055z" />
                  <path d="M12.923 2C6.918 2 2 6.64 2 12.35c0 3.238 1.642 6.136 4.221 8.026v2.969c0 .414.475.644.801.388l3.159-2.483c.877.227 1.796.35 2.742.35 6.005 0 10.923-4.64 10.923-10.35S18.928 2 12.923 2zm-.058 17.5c-.864 0-1.705-.121-2.5-.349a.625.625 0 0 0-.414.045l-2.457 1.932v-2.072a.625.625 0 0 0-.274-.518C4.945 17.067 3.5 14.521 3.5 11.75 3.5 6.925 7.697 3 12.865 3c5.168 0 9.365 3.925 9.365 8.75s-4.197 8.75-9.365 8.75z" />
                </svg>
                <span>Viber</span>
              </a>
            </div>

            {/* Email button */}
            <a
              href="mailto:stolitsainvest@mail.bg"
              className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/15"
              title="stolitsainvest@mail.bg"
            >
              <Mail className="w-3.5 h-3.5 text-lime-300" />
              <span>stolitsainvest@mail.bg</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
