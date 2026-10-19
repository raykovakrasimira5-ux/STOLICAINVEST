import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, Heart, CheckCircle2, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  reason?: 'favorite' | 'general' | 'profile';
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
  reason = 'general',
  favoritesCount,
  onOpenFavorites,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [contact, setContact] = useState(''); // email or phone
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Handle standard registration / login
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'register' && !name.trim()) {
      setError('Моля, въведете Вашето име.');
      return;
    }

    if (!contact.trim()) {
      setError('Моля, въведете имейл или телефонен номер.');
      return;
    }

    const newUser: UserProfile = {
      name: activeTab === 'register' ? name.trim() : (name.trim() || 'Клиент Столица Инвест'),
      emailOrPhone: contact.trim(),
      provider: 'standard',
      createdAt: new Date().toLocaleDateString('bg-BG'),
    };

    onLogin(newUser);
    setSuccessMessage(activeTab === 'register' ? 'Успешна регистрация! Добре дошли в Столица Инвест.' : 'Успешен вход!');
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1200);
  };

  // Handle 1-click Google sign in
  const handleGoogleSignIn = () => {
    const googleUser: UserProfile = {
      name: 'Красимира Райкова',
      emailOrPhone: 'raykovakrasimira5@gmail.com',
      provider: 'google',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toLocaleDateString('bg-BG'),
    };

    onLogin(googleUser);
    setSuccessMessage('Успешен вход с Google акаунт!');
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#2F54A3] text-white flex items-center justify-center font-bold shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {user ? 'Моят профил' : 'Вход в Столица Инвест'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {user ? 'Управление на профила и запазени имоти' : 'Лесен достъп с 1 име и контакт или Google'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Context Banner if triggered by saving a favorite property */}
        {reason === 'favorite' && !user && (
          <div className="bg-amber-50 border-b border-amber-200/80 px-5 py-2.5 flex items-center gap-2 text-xs text-amber-900">
            <Heart className="w-4 h-4 text-red-500 fill-red-500 shrink-0" />
            <span>Влезте или се регистрирайте, за да запазвате любими оферти в профила си!</span>
          </div>
        )}

        <div className="p-6">
          {successMessage ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-[#67B82D] mx-auto animate-bounce" />
              <h4 className="text-base font-black text-slate-900">{successMessage}</h4>
            </div>
          ) : user ? (
            /* Logged in view (Profile Dashboard) */
            <div className="space-y-5">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xs"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-[#2F54A3] text-white font-black text-lg flex items-center justify-center shadow-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-base font-black text-slate-900">{user.name}</h4>
                    {user.provider === 'google' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        Google
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{user.emailOrPhone}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Член от: {user.createdAt}</p>
                </div>
              </div>

              {/* Favorites summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-red-50 text-red-600">
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Запазени оферти</span>
                    <span className="text-[11px] text-slate-500">
                      {favoritesCount} {favoritesCount === 1 ? 'имот' : 'имота'} в списъка
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenFavorites();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2F54A3] text-white text-xs font-bold hover:bg-[#25468B] transition-colors cursor-pointer"
                >
                  Виж любими
                </button>
              </div>

              {/* Office Details */}
              <div className="text-[11px] text-slate-500 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1 text-slate-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#67B82D]" />
                  <span>Обслужване от Столица Инвест гр. Русе</span>
                </div>
                <p>Офис: ул. Кирил Старцев 3 • Тел: 0876 081 309 / 0877 633 111</p>
              </div>

              {/* Log out */}
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Изход от профила</span>
              </button>
            </div>
          ) : (
            /* Login / Register Forms */
            <div className="space-y-4">
              {/* 1-Click Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/80 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-2xs transition-all cursor-pointer"
              >
                {/* SVG Google logo */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.86c2.26-2.09 3.685-5.17 3.685-9.14z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3.04c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.25v3.13C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.62H1.25C.45 8.24 0 10.06 0 12s.45 3.76 1.25 5.38l4.02-3.13z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.62l4.02 3.13c.95-2.85 3.6-4.96 6.73-4.96z"
                  />
                </svg>
                <span>Продължи с Google профил</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                  или с име и телефон/имейл
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Tab Switcher */}
              <div className="flex p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setError('');
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'register'
                      ? 'bg-white text-[#2F54A3] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Бърза регистрация
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setError('');
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-white text-[#2F54A3] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Вход
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                {error && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                    {error}
                  </div>
                )}

                {activeTab === 'register' && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Вашето име *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="напр. Красимира, Иван, Елена..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F54A3]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Имейл или Телефонен номер *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="напр. 0876 081 309 или email@domain.com"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F54A3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Парола (по избор)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F54A3]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#2F54A3] hover:bg-[#25468B] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-[#67B82D]" />
                  <span>
                    {activeTab === 'register' ? 'Създай профил' : 'Вход в профила'}
                  </span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
