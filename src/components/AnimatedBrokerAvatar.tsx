import React from 'react';

interface AnimatedBrokerAvatarProps {
  name: string;
  role?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Deterministic vibrant animated gradient presets per broker
const AVATAR_THEMES: Record<string, { bg: string; ring: string; accent: string; iconFill: string }> = {
  'елена воронова': {
    bg: 'from-amber-400 via-rose-500 to-purple-600',
    ring: 'border-rose-300',
    accent: '#F43F5E',
    iconFill: '#FFE4E6',
  },
  'георги георгиев': {
    bg: 'from-sky-400 via-blue-600 to-indigo-700',
    ring: 'border-blue-300',
    accent: '#3B82F6',
    iconFill: '#DBEAFE',
  },
  'антон жвакин': {
    bg: 'from-emerald-400 via-teal-600 to-cyan-700',
    ring: 'border-emerald-300',
    accent: '#10B981',
    iconFill: '#D1FAE5',
  },
  'красимира райкова': {
    bg: 'from-orange-400 via-amber-500 to-pink-600',
    ring: 'border-amber-300',
    accent: '#F59E0B',
    iconFill: '#FEF3C7',
  },
};

export const AnimatedBrokerAvatar: React.FC<AnimatedBrokerAvatarProps> = ({
  name,
  role,
  size = 'md',
  className = '',
}) => {
  const normalized = (name || '').toLowerCase().trim();
  const theme =
    AVATAR_THEMES[normalized] || {
      bg: 'from-blue-500 via-indigo-500 to-purple-600',
      ring: 'border-blue-300',
      accent: '#2F54A3',
      iconFill: '#E0E7FF',
    };

  // Initials
  const parts = name.trim().split(' ');
  const initials = parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}` : name.slice(0, 2).toUpperCase();

  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-14 h-14 text-base',
    xl: 'w-16 h-16 text-lg',
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
    xl: 'w-9 h-9',
  }[size];

  return (
    <div
      className={`relative rounded-2xl p-0.5 group shrink-0 ${className}`}
      title={`${name}${role ? ` • ${role}` : ''}`}
    >
      {/* Animated Glowing Ring */}
      <div
        className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${theme.bg} opacity-75 blur-xs group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse`}
      />

      {/* Avatar Container */}
      <div
        className={`relative ${sizeClasses} rounded-2xl bg-gradient-to-tr ${theme.bg} flex items-center justify-center font-black text-white shadow-md overflow-hidden border border-white/40`}
      >
        {/* Subtle animated light shimmer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/25 pointer-events-none" />

        {/* Floating animated particles / decorative SVG */}
        <svg
          viewBox="0 0 40 40"
          className={`absolute inset-0 w-full h-full opacity-35 transition-transform duration-700 group-hover:rotate-45`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="3" fill="#ffffff" />
          <circle cx="32" cy="30" r="4" fill="#ffffff" />
          <path
            d="M3 35C10 25 30 25 37 35"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Dynamic Stylized Broker Silhouette & Initials */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className="tracking-tighter font-extrabold uppercase drop-shadow-sm select-none">
            {initials}
          </span>
        </div>

        {/* Active Online Indicator */}
        <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#67B82D] ring-2 ring-white shadow-xs" />
      </div>
    </div>
  );
};
