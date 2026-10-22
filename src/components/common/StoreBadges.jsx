import React from 'react';

export function AppleAppStoreBadge({ styleType = 'official', scale = 1 }) {
  const isGlass = styleType === 'glass';
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border select-none transition-transform hover:scale-105 ${
        isGlass
          ? 'bg-white/[0.08] backdrop-blur-md border-white/20 text-white shadow-lg shadow-black/20'
          : 'bg-black border-white/20 text-white shadow-md'
      }`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
      }}
    >
      {/* Apple Vector Logo */}
      <svg viewBox="0 0 170 170" width="18" height="18" fill="currentColor">
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.42-6.53-10.12-11.45-21.43-14.75-33.93-3.3-12.5-4.95-24.28-4.95-35.34 0-14.9 3.59-27.42 10.77-37.56 7.18-10.14 16.73-15.35 28.66-15.63 4.12 0 9.04 1.15 14.75 3.44 5.71 2.29 9.38 3.5 11.01 3.63 1.3 0 4.93-1.28 10.88-3.85 5.95-2.57 10.9-3.71 14.86-3.41 12.82.76 22.84 5.56 30.06 14.4-11.2 6.74-16.63 16.2-16.29 28.38.33 9.46 4.07 17.39 11.22 23.79 7.15 6.4 15.62 10.05 25.42 10.95-2.18 6.52-4.63 12.93-7.36 19.23zM119.22 31.86c0-7.39 2.66-14.46 7.98-21.2 5.32-6.74 11.95-10.66 19.89-11.76.22 1.3.33 2.45.33 3.44 0 7.39-2.83 14.78-8.49 22.18-5.66 7.4-12.44 11.66-20.34 12.78-.22-1.74-.37-3.55-.37-5.44z" />
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-[8px] uppercase tracking-wider text-slate-300 font-medium">Download on the</span>
        <span className="text-[12px] font-bold tracking-tight text-white mt-0.5">App Store</span>
      </div>
    </div>
  );
}

export function GooglePlayBadge({ styleType = 'official', scale = 1 }) {
  const isGlass = styleType === 'glass';
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border select-none transition-transform hover:scale-105 ${
        isGlass
          ? 'bg-white/[0.08] backdrop-blur-md border-white/20 text-white shadow-lg shadow-black/20'
          : 'bg-black border-white/20 text-white shadow-md'
      }`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
      }}
    >
      {/* Official Google Play 4-Color Triangle */}
      <svg viewBox="0 0 512 512" width="18" height="18">
        <path
          d="M325.3 234.3L104.6 13l280.8 161.2-60.1 59.9.2.2z"
          fill="#00E676"
        />
        <path
          d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l255.6-255.9L47 0z"
          fill="#00B0FF"
        />
        <path
          d="M474.2 221.7l-88.8-51-60.1 59.9 60.1 59.9 89.2-51.2c15.7-9 24.3-22.3 24.3-33.8s-8.9-24.8-24.7-33.8z"
          fill="#FFD600"
        />
        <path
          d="M325.3 277.7l60.1 59.9L104.6 499l220.7-221.3z"
          fill="#FF3D00"
        />
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-[8px] uppercase tracking-wider text-slate-300 font-medium">GET IT ON</span>
        <span className="text-[12px] font-bold tracking-tight text-white mt-0.5">Google Play</span>
      </div>
    </div>
  );
}

export default function StoreBadges({
  type = 'both', // 'both' | 'app_store' | 'google_play'
  styleType = 'official',
  scale = 1,
  className = '',
}) {
  if (!type || type === 'none') return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 pt-1 ${className}`}>
      {(type === 'both' || type === 'app_store') && (
        <AppleAppStoreBadge styleType={styleType} scale={scale} />
      )}
      {(type === 'both' || type === 'google_play') && (
        <GooglePlayBadge styleType={styleType} scale={scale} />
      )}
    </div>
  );
}
