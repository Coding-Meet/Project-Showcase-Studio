import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { resolveTextGradientStyle } from '../../data/typographyPresets';

export default function DesktopDashboardSlide({
  slideData,
  projectData,
  baseScale = 1,
  deviceFitScale = 1,
  textScale = 1,
  titleSize,
  subtitleSize,
  featureSize,
  fontFamily,
  fontWeight,
  titleGradient,
  titleColor,
  subtitleColor,
  subtitleGradient,
  badgeColor,
  featureColor,
  deviceScale,
  tilt,
  tiltAngle,
  pitchAngle,
  perspective,
  shadowStyle,
  shadowIntensity,
  screenReflection,
  offsetX,
  offsetY,
  accentColor,
}) {
  const title = slideData.title || projectData.title || 'Cross-Platform Desktop Analysis';
  const tagline = slideData.tagline || projectData.shortDescription || 'Comprehensive insights, workspace diagnostics, and clean workflow execution.';
  const features = slideData.features && slideData.features.length > 0
    ? slideData.features
    : (projectData.features || []).slice(0, 3);

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
  const calcFeature = Math.max(10, Math.round(featureSize * textScale * effectiveRatio));

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between px-[5%] py-[4%] relative overflow-hidden z-10"
      style={{ fontFamily: `${fontFamily}, sans-serif` }}
    >
      {/* Top Header */}
      <div className="text-center max-w-3xl z-10 space-y-1.5 flex-shrink-0">
        <h2
          className={`tracking-tight whitespace-pre-line ${titleStyleObj.className} leading-tight`}
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

      {/* Center Desktop Mockup */}
      <div className="w-full flex-1 flex items-center justify-center my-auto relative z-10 max-h-[60%]">
        <DeviceMockup
          imageSrc={slideData.imageSrc}
          hasFrame={slideData.hasFrame}
          deviceType="desktop"
          deviceFinish={slideData.deviceFinish || 'silver_aluminum'}
          frameGleam={slideData.frameGleam !== false}
          deviceCornerRadius={slideData.deviceCornerRadius}
          tilt={tilt}
          tiltAngle={tiltAngle}
          pitchAngle={pitchAngle}
          perspective={perspective}
          shadowStyle={shadowStyle}
          shadowIntensity={shadowIntensity}
          screenReflection={screenReflection}
          accentColor={accentColor}
          scale={deviceScale * deviceFitScale * 0.95}
          offsetX={offsetX * effectiveRatio}
          offsetY={offsetY * effectiveRatio}
        />
      </div>

      {/* Bottom 3 Feature Pillars */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-4xl z-10 flex-shrink-0">
        {features.slice(0, 3).map((feat, i) => (
          <div
            key={i}
            className="p-2.5 rounded-xl glass-card border border-white/10 flex items-center gap-2.5 text-left shadow-lg"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: accentColor }}
            ></div>
            <p
              className="text-slate-200 font-medium leading-snug whitespace-pre-line truncate"
              style={{ fontSize: `${calcFeature}px` }}
            >
              {feat}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
