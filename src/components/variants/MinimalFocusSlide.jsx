import React from 'react';
import DeviceMockup from '../DeviceMockup';

export default function MinimalFocusSlide({
  slideData,
  projectData,
  textScale = 1,
  deviceScale = 1,
  accentColor = '#6366f1',
}) {
  const title = slideData.title || projectData.title || 'Precision Design & Performance';
  const tagline = slideData.tagline || 'Engineered with clean architectural principles and fluid interactions.';
  const platforms = projectData.platform || ['Android'];

  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-16 py-10 relative overflow-hidden z-10">
      {/* Top Header */}
      <div className="text-center max-w-2xl z-10 space-y-2">
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
      </div>

      {/* Large Centered Mockup */}
      <div className="w-full flex items-center justify-center relative z-10 my-auto">
        <DeviceMockup
          imageSrc={slideData.imageSrc}
          hasFrame={slideData.hasFrame}
          deviceType={slideData.deviceType || (platforms.includes('Desktop') ? 'desktop' : 'android')}
          tilt={false}
          scale={deviceScale * 1.05}
        />
      </div>
    </div>
  );
}
