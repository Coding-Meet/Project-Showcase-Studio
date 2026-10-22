import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { Smartphone, Monitor } from 'lucide-react';

export default function ResponsiveComboSlide({
  slideData,
  projectData,
  textScale = 1,
  deviceScale = 1,
  accentColor = '#6366f1',
}) {
  const title = slideData.title || projectData.title || 'Multiplatform Responsive Architecture';
  const tagline = slideData.tagline || 'Single unified codebase delivering native performance on Desktop, Tablet, and Mobile.';
  const platforms = projectData.platform || ['Desktop', 'Android', 'iOS'];

  const desktopImage = slideData.imageSrc;
  const mobileImage = slideData.secondaryImageSrc || slideData.imageSrc;

  return (
    <div className="w-full h-full flex items-center justify-between px-14 py-10 relative overflow-hidden z-10">
      {/* Left Info (38%) */}
      <div className="w-[38%] flex flex-col justify-center items-start z-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold glass-card text-white">
          <Monitor className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span>+</span>
          <Smartphone className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span className="uppercase text-[11px] ml-1 tracking-wider">Universal UI</span>
        </div>

        <h2
          className="font-extrabold text-white tracking-tight leading-tight"
          style={{ fontSize: `${Math.round(36 * textScale)}px` }}
        >
          {title}
        </h2>

        <p
          className="text-slate-300 font-normal leading-relaxed"
          style={{ fontSize: `${Math.round(15 * textScale)}px` }}
        >
          {tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {platforms.map((p, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-slate-300"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Right Multi-Device Stack (60%) */}
      <div className="w-[60%] relative flex items-center justify-center min-h-[460px] z-10">
        {/* Background Desktop */}
        <div className="w-[90%] transform -translate-x-4">
          <DeviceMockup
            imageSrc={desktopImage}
            hasFrame={slideData.hasFrame}
            deviceType="desktop"
            scale={deviceScale * 0.9}
          />
        </div>

        {/* Foreground Mobile Phone overlapping bottom right */}
        <div className="absolute right-2 bottom-0 transform translate-y-3 z-20 drop-shadow-2xl">
          <DeviceMockup
            imageSrc={mobileImage}
            hasFrame={slideData.secondaryHasFrame ?? slideData.hasFrame}
            deviceType={slideData.deviceType || 'android'}
            scale={deviceScale * 0.72}
          />
        </div>
      </div>
    </div>
  );
}
