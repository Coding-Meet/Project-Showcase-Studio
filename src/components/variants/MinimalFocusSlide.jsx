import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { resolveTextGradientStyle } from '../../data/typographyPresets';

export default function MinimalFocusSlide({
  slideData,
  projectData,
  baseScale = 1,
  deviceFitScale = 1,
  textScale = 1,
  titleSize,
  subtitleSize,
  fontFamily,
  fontWeight,
  titleGradient,
  titleColor,
  subtitleColor,
  subtitleGradient,
  badgeColor,
  featureColor,
  deviceScale,
  shadowStyle,
  shadowIntensity,
  screenReflection,
  offsetX,
  offsetY,
  accentColor,
}) {
  const title = slideData.title || projectData.title || 'Precision Design & Performance';
  const tagline = slideData.tagline || 'Engineered with clean architectural principles and fluid interactions.';
  const platforms = projectData.platform || ['Android'];

  const titleStyleObj = resolveTextGradientStyle({
    gradient: titleGradient,
    solidColor: titleColor,
    customFrom: slideData.titleGradientFrom,
    customTo: slideData.titleGradientTo,
    customAngle: slideData.titleGradientAngle,
  });

  const subStyleObj = resolveTextGradientStyle({
    gradient: subtitleGradient,
    solidColor: subtitleColor,
    customFrom: slideData.subtitleGradientFrom,
    customTo: slideData.subtitleGradientTo,
    customAngle: slideData.subtitleGradientAngle,
  });

  // Compute resolution-aware sizes
  const effectiveRatio = baseScale;
  const calcTitle = Math.max(18, Math.round(titleSize * textScale * effectiveRatio));
  const calcSubtitle = Math.max(11, Math.round(subtitleSize * textScale * effectiveRatio));

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between px-[6%] py-[4%] relative overflow-hidden z-10"
      style={{ fontFamily: `${fontFamily}, sans-serif` }}
    >
      {/* Top Header */}
      <div className="text-center max-w-2xl z-10 space-y-1.5 flex-shrink-0">
        <h2
          className={`tracking-tight whitespace-pre-line ${titleStyleObj.className} leading-tight drop-shadow-sm`}
          style={{
            fontSize: `${calcTitle}px`,
            fontWeight: fontWeight,
            ...titleStyleObj.style,
          }}
        >
          {title}
        </h2>
        <p
          className={`font-normal leading-relaxed whitespace-pre-line ${subStyleObj.className}`}
          style={{
            fontSize: `${calcSubtitle}px`,
            ...subStyleObj.style,
          }}
        >
          {tagline}
        </p>
      </div>

      {/* Large Centered Mockup */}
      <div className="w-full flex-1 flex items-center justify-center relative z-10 my-auto max-h-[70%]">
        <DeviceMockup
          imageSrc={slideData.imageSrc}
          hasFrame={slideData.hasFrame}
          deviceType={slideData.deviceType || (platforms.includes('Desktop') ? 'desktop' : 'android')}
          deviceFinish={slideData.deviceFinish || 'natural_titanium'}
          frameGleam={slideData.frameGleam !== false}
          deviceCornerRadius={slideData.deviceCornerRadius}
          tilt={false}
          shadowStyle={shadowStyle}
          shadowIntensity={shadowIntensity}
          screenReflection={screenReflection}
          accentColor={accentColor}
          scale={deviceScale * deviceFitScale * 1.05}
          offsetX={offsetX * effectiveRatio}
          offsetY={offsetY * effectiveRatio}
        />
      </div>
    </div>
  );
}
