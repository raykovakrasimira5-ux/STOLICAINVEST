import React from 'react';

interface AgencyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  customLogoUrl?: string;
  className?: string;
  showText?: boolean;
}

export const AgencyLogo: React.FC<AgencyLogoProps> = ({
  size = 'md',
  variant = 'dark',
  customLogoUrl,
  className = '',
  showText = true,
}) => {
  if (customLogoUrl) {
    const heightClass = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : 'h-10 sm:h-11';
    return (
      <div className={`shrink-0 flex items-center ${className}`}>
        <img
          src={customLogoUrl}
          alt="Столица Инвест - Недвижими Имоти"
          className={`${heightClass} w-auto max-w-[260px] object-contain shrink-0`}
        />
      </div>
    );
  }

  const isLight = variant === 'light';
  const iconHeight = size === 'sm' ? 32 : size === 'lg' ? 48 : 42;
  const iconWidth = Math.round(iconHeight * 1.08); // exact ratio matching 135/125

  const primaryBlue = isLight ? '#60A5FA' : '#2F54A3';
  const accentGreen = '#67B82D';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 shrink-0 select-none ${className}`}>
      {/* Exact Architectural Outline Emblem with fixed aspect ratio */}
      <svg
        viewBox="0 0 135 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: `${iconWidth}px`, height: `${iconHeight}px` }}
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Leftmost step */}
        <path
          d="M8 115 V70 L20 58"
          stroke={primaryBlue}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Outer roof apex and right wall */}
        <path
          d="M26 52 L68 12 L106 50 V115"
          stroke={primaryBlue}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Diagonal Lime Green Accent Stripes */}
        <line
          x1="82"
          y1="16"
          x2="108"
          y2="42"
          stroke={accentGreen}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <line
          x1="76"
          y1="32"
          x2="118"
          y2="74"
          stroke={accentGreen}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Middle roof structure */}
        <path
          d="M26 115 V70 L68 30 L96 58 V115"
          stroke={primaryBlue}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Internal diagonal beam */}
        <path
          d="M60 52 L94 86"
          stroke={primaryBlue}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central portal / inner house */}
        <path
          d="M48 115 V84 L68 66 L88 84 V115"
          stroke={primaryBlue}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Typography: СТОЛИЦА ИНВЕСТ / НЕДВИЖИМИ ИМОТИ */}
      {showText && (
        <div className="flex flex-col shrink-0 whitespace-nowrap">
          <div
            className={`font-black tracking-tight leading-none ${
              size === 'sm'
                ? 'text-base sm:text-lg'
                : size === 'lg'
                ? 'text-2xl sm:text-3xl'
                : 'text-lg sm:text-xl md:text-2xl'
            } ${isLight ? 'text-white' : 'text-[#2F54A3]'}`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span>СТОЛИЦА </span>
            <span className={isLight ? 'text-blue-300' : 'text-[#2F54A3]'}>ИНВЕСТ</span>
          </div>

          <div
            className={`font-black uppercase tracking-[0.22em] mt-0.5 sm:mt-1 leading-none ${
              size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-xs' : 'text-[9px] sm:text-[10px] md:text-[11px]'
            } text-[#67B82D]`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            НЕДВИЖИМИ ИМОТИ
          </div>
        </div>
      )}
    </div>
  );
};
