import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { Layers } from 'lucide-react';

export default function DualScreenSlide({
  slideData,
  projectData,
  textScale = 1,
  deviceScale = 0.9,
  accentColor = '#6366f1',
}) {
  const title = slideData.title || 'Seamless Multi-Screen Workflow';
  const tagline = slideData.tagline || 'Experience consistent navigation and high performance across key user flows.';

  // Image 1 and secondary image 2
  const image1 = slideData.imageSrc;
  const image2 = slideData.secondaryImageSrc || slideData.imageSrc;

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

      {/* Dual Devices Side-by-Side */}
      <div className="flex items-center justify-center gap-8 w-full max-h-[460px] relative z-10 mt-2">
        <div className="transform -rotate-3 transition-transform hover:rotate-0">
          <DeviceMockup
            imageSrc={image1}
            hasFrame={slideData.hasFrame}
            deviceType={slideData.deviceType || 'android'}
            scale={deviceScale}
          />
        </div>
        <div className="transform rotate-3 transition-transform hover:rotate-0">
          <DeviceMockup
            imageSrc={image2}
            hasFrame={slideData.hasFrame}
            deviceType={slideData.deviceType || 'iphone'}
            scale={deviceScale}
          />
        </div>
      </div>
    </div>
  );
}
