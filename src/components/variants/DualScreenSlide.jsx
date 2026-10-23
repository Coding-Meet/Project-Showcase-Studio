import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { resolveTextGradientStyle } from '../../data/typographyPresets';

export default function DualScreenSlide({
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
  rotation,
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
  const title = slideData.title || 'Seamless Multi-Screen Workflow';
  const tagline = slideData.tagline || 'Experience consistent navigation and high performance across key user flows.';

  const image1 = slideData.imageSrc;
  const image2 = slideData.secondaryImageSrc || slideData.imageSrc;

  const rotation1 = slideData.rotation !== undefined ? slideData.rotation : (rotation !== undefined ? rotation : -3);
  const rotation2 = slideData.secondaryRotation !== undefined ? slideData.secondaryRotation : 3;

  const hasTilt1 = slideData.tilt !== undefined ? slideData.tilt : (tilt || false);
  const tiltAngle1 = slideData.tiltAngle !== undefined ? slideData.tiltAngle : (tiltAngle !== undefined ? tiltAngle : -8);
  const pitchAngle1 = slideData.pitchAngle !== undefined ? slideData.pitchAngle : (pitchAngle !== undefined ? pitchAngle : 4);
  const perspective1 = slideData.perspective || perspective || 1200;

  const hasTilt2 = slideData.secondaryTilt !== undefined ? slideData.secondaryTilt : false;
  const tiltAngle2 = slideData.secondaryTiltAngle !== undefined ? slideData.secondaryTiltAngle : 8;
  const pitchAngle2 = slideData.secondaryPitchAngle !== undefined ? slideData.secondaryPitchAngle : (pitchAngle !== undefined ? pitchAngle : 4);
  const perspective2 = slideData.secondaryPerspective || slideData.perspective || perspective || 1200;

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
      className="w-full h-full flex flex-col items-center justify-center px-[5%] py-[3%] relative overflow-hidden z-10"
      style={{ fontFamily: `${fontFamily}, sans-serif` }}
    >
      {/* Top Header */}
      <div className="text-center max-w-3xl z-10 space-y-1.5 flex-shrink-0 mb-3">
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

      {/* Dual Devices Side-by-Side (Hero-proportioned, perfectly centered) */}
      <div className="flex-1 w-full flex items-center justify-center gap-8 relative z-10 min-h-0">
        <div className="transition-transform duration-300">
          <DeviceMockup
            imageSrc={image1}
            hasFrame={slideData.hasFrame}
            deviceType={slideData.deviceType || 'google-pixel-9'}
            deviceFinish={slideData.deviceFinish || 'natural_titanium'}
            frameGleam={slideData.frameGleam !== false}
            deviceCornerRadius={slideData.deviceCornerRadius}
            rotation={rotation1}
            tilt={hasTilt1}
            tiltAngle={tiltAngle1}
            pitchAngle={pitchAngle1}
            perspective={perspective1}
            shadowStyle={slideData.shadowStyle || shadowStyle}
            shadowIntensity={slideData.shadowIntensity !== undefined ? slideData.shadowIntensity : shadowIntensity}
            screenReflection={slideData.screenReflection !== undefined ? slideData.screenReflection : screenReflection}
            accentColor={accentColor}
            scale={(slideData.deviceScale !== undefined ? slideData.deviceScale : deviceScale) * deviceFitScale * 0.98}
            offsetX={(slideData.offsetX !== undefined ? slideData.offsetX : offsetX) * effectiveRatio}
            offsetY={(slideData.offsetY !== undefined ? slideData.offsetY : offsetY) * effectiveRatio}
          />
        </div>
        <div className="transition-transform duration-300">
          <DeviceMockup
            imageSrc={image2}
            hasFrame={slideData.secondaryHasFrame ?? slideData.hasFrame}
            deviceType={slideData.secondaryDeviceType || 'apple-iphone-16-pro'}
            deviceFinish={slideData.secondaryDeviceFinish || slideData.deviceFinish || 'natural_titanium'}
            frameGleam={slideData.secondaryFrameGleam !== undefined ? slideData.secondaryFrameGleam : (slideData.frameGleam !== false)}
            deviceCornerRadius={slideData.secondaryDeviceCornerRadius ?? slideData.deviceCornerRadius}
            rotation={rotation2}
            tilt={hasTilt2}
            tiltAngle={tiltAngle2}
            pitchAngle={pitchAngle2}
            perspective={perspective2}
            shadowStyle={slideData.secondaryShadowStyle || slideData.shadowStyle || shadowStyle}
            shadowIntensity={slideData.secondaryShadowIntensity !== undefined ? slideData.secondaryShadowIntensity : (slideData.shadowIntensity !== undefined ? slideData.shadowIntensity : shadowIntensity)}
            screenReflection={slideData.secondaryScreenReflection !== undefined ? slideData.secondaryScreenReflection : (slideData.screenReflection !== undefined ? slideData.screenReflection : screenReflection)}
            accentColor={accentColor}
            scale={(slideData.secondaryDeviceScale !== undefined ? slideData.secondaryDeviceScale : (slideData.deviceScale !== undefined ? slideData.deviceScale : deviceScale)) * deviceFitScale * 0.98}
            offsetX={(slideData.secondaryOffsetX !== undefined ? slideData.secondaryOffsetX : (slideData.offsetX !== undefined ? slideData.offsetX : offsetX)) * effectiveRatio}
            offsetY={(slideData.secondaryOffsetY !== undefined ? slideData.secondaryOffsetY : (slideData.offsetY !== undefined ? slideData.offsetY : offsetY)) * effectiveRatio}
          />
        </div>
      </div>
    </div>
  );
}
