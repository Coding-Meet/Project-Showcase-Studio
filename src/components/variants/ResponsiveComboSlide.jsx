import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { Smartphone, Monitor } from 'lucide-react';
import { resolveTextGradientStyle } from '../../data/typographyPresets';
import TechIcon from '../common/TechIcon';

export default function ResponsiveComboSlide({
  slideData,
  projectData,
  baseScale = 1,
  deviceFitScale = 1,
  textScale = 1,
  titleSize,
  subtitleSize,
  badgeSize,
  techChipSize,
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
  const title = slideData.title || projectData.title || 'Multiplatform Responsive Architecture';
  const tagline = slideData.tagline || 'Single unified codebase delivering native performance on Desktop, Tablet, and Mobile.';
  const platforms = projectData.platform || ['Desktop', 'Android', 'iOS'];

  const desktopImage = slideData.imageSrc;
  const mobileImage = slideData.secondaryImageSrc || slideData.imageSrc;

  const rotationDesktop = slideData.rotation !== undefined ? slideData.rotation : (rotation || 0);
  const rotationMobile = slideData.secondaryRotation !== undefined ? slideData.secondaryRotation : 0;

  const hasTiltDesktop = slideData.tilt !== undefined ? slideData.tilt : (tilt || false);
  const tiltAngleDesktop = slideData.tiltAngle !== undefined ? slideData.tiltAngle : (tiltAngle !== undefined ? tiltAngle : -8);
  const pitchAngleDesktop = slideData.pitchAngle !== undefined ? slideData.pitchAngle : (pitchAngle !== undefined ? pitchAngle : 4);
  const perspectiveDesktop = slideData.perspective || perspective || 1200;

  const hasTiltMobile = slideData.secondaryTilt !== undefined ? slideData.secondaryTilt : false;
  const tiltAngleMobile = slideData.secondaryTiltAngle !== undefined ? slideData.secondaryTiltAngle : 8;
  const pitchAngleMobile = slideData.secondaryPitchAngle !== undefined ? slideData.secondaryPitchAngle : (pitchAngle !== undefined ? pitchAngle : 4);
  const perspectiveMobile = slideData.secondaryPerspective || slideData.perspective || perspective || 1200;

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
  const calcBadge = Math.max(9, Math.round(badgeSize * textScale * effectiveRatio));
  const calcTech = Math.max(9, Math.round(techChipSize * textScale * effectiveRatio));

  return (
    <div
      className="w-full h-full flex items-center justify-between px-[6%] py-[5%] relative overflow-hidden z-10"
      style={{ fontFamily: `${fontFamily}, sans-serif` }}
    >
      {/* Left Info (Strict 40% boundary) */}
      <div className="w-[40%] max-w-[40%] flex-shrink-0 flex flex-col justify-center items-start z-10 space-y-3.5">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold glass-card border shadow-sm"
          style={{
            fontSize: `${calcBadge}px`,
            color: badgeColor,
            borderColor: `${badgeColor}35`,
            backgroundColor: `${badgeColor}12`,
          }}
        >
          <Monitor className="w-3.5 h-3.5" style={{ color: badgeColor }} />
          <span>+</span>
          <Smartphone className="w-3.5 h-3.5" style={{ color: badgeColor }} />
          <span className="uppercase text-[11px] ml-1 tracking-wider">Universal UI</span>
        </div>

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

        <div className="flex flex-wrap gap-1.5 pt-1">
          {platforms.map((p, i) => {
            const isWordmark = slideData.techLogoVariant === 'wordmark';
            return (
              <span
                key={i}
                className={`inline-flex items-center rounded-lg font-medium bg-white/[0.04] border border-white/[0.08] shadow-sm ${
                  isWordmark ? 'px-2 py-1 gap-1' : 'px-2.5 py-0.5 gap-1.5'
                }`}
                style={{
                  fontSize: `${calcTech}px`,
                  color: featureColor,
                }}
              >
                {slideData.showTechIcons !== false && (
                  <TechIcon
                    name={p}
                    variant={isWordmark ? 'wordmark' : 'icon'}
                    className={
                      isWordmark
                        ? 'h-4 w-auto max-w-[95px] object-contain'
                        : 'w-3.5 h-3.5 flex-shrink-0'
                    }
                  />
                )}
                {!isWordmark && <span>{p}</span>}
              </span>
            );
          })}
        </div>
      </div>

      {/* Right Multi-Device Stack (Strict 58% boundary) */}
      <div className="w-[58%] max-w-[58%] flex-shrink-0 relative flex items-center justify-center min-h-[460px] z-10">
        <div className="w-[90%] transform -translate-x-4">
          <DeviceMockup
            imageSrc={desktopImage}
            hasFrame={slideData.hasFrame}
            deviceType="desktop"
            deviceFinish={slideData.deviceFinish || 'natural_titanium'}
            frameGleam={slideData.frameGleam !== false}
            deviceCornerRadius={slideData.deviceCornerRadius}
            rotation={rotationDesktop}
            tilt={hasTiltDesktop}
            tiltAngle={tiltAngleDesktop}
            pitchAngle={pitchAngleDesktop}
            perspective={perspectiveDesktop}
            shadowStyle={slideData.shadowStyle || shadowStyle}
            shadowIntensity={slideData.shadowIntensity !== undefined ? slideData.shadowIntensity : shadowIntensity}
            screenReflection={slideData.screenReflection !== undefined ? slideData.screenReflection : screenReflection}
            accentColor={accentColor}
            scale={(slideData.deviceScale !== undefined ? slideData.deviceScale : deviceScale) * deviceFitScale * 0.88}
            offsetX={(slideData.offsetX !== undefined ? slideData.offsetX : offsetX) * effectiveRatio}
            offsetY={(slideData.offsetY !== undefined ? slideData.offsetY : offsetY) * effectiveRatio}
          />
        </div>

        <div className="absolute right-2 bottom-0 transform translate-y-3 z-20 drop-shadow-2xl">
          <DeviceMockup
            imageSrc={mobileImage}
            hasFrame={slideData.secondaryHasFrame ?? slideData.hasFrame}
            deviceType={slideData.secondaryDeviceType || slideData.deviceType || 'google-pixel-9'}
            deviceFinish={slideData.secondaryDeviceFinish || slideData.deviceFinish || 'natural_titanium'}
            frameGleam={slideData.secondaryFrameGleam !== undefined ? slideData.secondaryFrameGleam : (slideData.frameGleam !== false)}
            deviceCornerRadius={slideData.secondaryDeviceCornerRadius ?? slideData.deviceCornerRadius}
            rotation={rotationMobile}
            tilt={hasTiltMobile}
            tiltAngle={tiltAngleMobile}
            pitchAngle={pitchAngleMobile}
            perspective={perspectiveMobile}
            shadowStyle={slideData.secondaryShadowStyle || slideData.shadowStyle || shadowStyle}
            shadowIntensity={slideData.secondaryShadowIntensity !== undefined ? slideData.secondaryShadowIntensity : (slideData.shadowIntensity !== undefined ? slideData.shadowIntensity : shadowIntensity)}
            screenReflection={slideData.secondaryScreenReflection !== undefined ? slideData.secondaryScreenReflection : (slideData.screenReflection !== undefined ? slideData.screenReflection : screenReflection)}
            accentColor={accentColor}
            scale={(slideData.secondaryDeviceScale !== undefined ? slideData.secondaryDeviceScale : (slideData.deviceScale !== undefined ? slideData.deviceScale : deviceScale)) * deviceFitScale * 0.7}
            offsetX={(slideData.secondaryOffsetX !== undefined ? slideData.secondaryOffsetX : (slideData.offsetX !== undefined ? slideData.offsetX : offsetX)) * effectiveRatio}
            offsetY={(slideData.secondaryOffsetY !== undefined ? slideData.secondaryOffsetY : (slideData.offsetY !== undefined ? slideData.offsetY : offsetY)) * effectiveRatio}
          />
        </div>
      </div>
    </div>
  );
}
