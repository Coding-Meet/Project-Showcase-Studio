import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { CheckCircle2, Zap, Shield, Cpu, Activity, Flame, Terminal, Star } from 'lucide-react';
import { resolveTextGradientStyle } from '../../data/typographyPresets';

import TrustPill from '../common/TrustPill';

const FEATURE_ICONS = [Zap, Shield, Cpu, Activity, CheckCircle2, Flame, Terminal, Star];

export default function FeatureDeepDiveSlide({
  slideData,
  projectData,
  baseScale = 1,
  deviceFitScale = 1,
  textScale = 1,
  titleSize,
  subtitleSize,
  featureSize,
  iconSize,
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
  const title = slideData.title || 'Core Architecture & Features';
  const features = slideData.features && slideData.features.length > 0
    ? slideData.features
    : (projectData.features || []).slice(0, 3);

  const platforms = projectData.platform || ['Android'];

  const titleStyleObj = resolveTextGradientStyle({
    gradient: titleGradient,
    solidColor: titleColor,
    customFrom: slideData.titleGradientFrom,
    customTo: slideData.titleGradientTo,
    customAngle: slideData.titleGradientAngle,
  });

  // Compute resolution-aware sizes
  const effectiveRatio = baseScale;
  const calcTitle = Math.max(18, Math.round(titleSize * textScale * effectiveRatio));
  const calcFeature = Math.max(11, Math.round(featureSize * textScale * effectiveRatio));
  const calcFeatureTitle = Math.max(12, Math.round((featureSize + 2) * textScale * effectiveRatio));
  const calcIcon = Math.max(12, Math.round(iconSize * textScale * effectiveRatio));

  const isReversed = slideData.layoutAlign === 'right';

  // Customizable layout split ratio (Cards width % vs Mockup width %)
  const split = Math.max(30, Math.min(70, slideData.layoutSplit ?? 52));
  const contentWidthPct = `${split}%`;
  const mockupWidthPct = `${100 - split - 3}%`;

  return (
    <div
      className={`w-full h-full flex items-center justify-between px-[6%] py-[5%] relative overflow-hidden z-10 ${
        isReversed ? 'flex-row-reverse' : ''
      }`}
      style={{ fontFamily: `${fontFamily}, sans-serif` }}
    >
      {/* Mockup Column (Controlled by layoutSplit) */}
      <div
        className="flex-shrink-0 flex items-center justify-center relative z-10"
        style={{ width: mockupWidthPct, maxWidth: mockupWidthPct }}
      >
        <DeviceMockup
          imageSrc={slideData.imageSrc}
          hasFrame={slideData.hasFrame}
          deviceType={slideData.deviceType || (platforms.includes('Desktop') ? 'desktop' : 'android')}
          deviceFinish={slideData.deviceFinish || 'natural_titanium'}
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
          scale={deviceScale * deviceFitScale}
          offsetX={offsetX * effectiveRatio}
          offsetY={offsetY * effectiveRatio}
        />
      </div>

      {/* Right Feature Cards (Controlled by layoutSplit) */}
      <div
        className="flex-shrink-0 flex flex-col justify-center items-start z-10 space-y-3"
        style={{ width: contentWidthPct, maxWidth: contentWidthPct }}
      >
        {/* Section Title with whitespace-pre-line */}
        <h2
          className={`tracking-tight whitespace-pre-line ${titleStyleObj.className} mb-1`}
          style={{
            fontSize: `${calcTitle}px`,
            fontWeight: fontWeight,
            ...titleStyleObj.style,
          }}
        >
          {title}
        </h2>

        {/* Floating Feature Cards */}
        <div className="w-full space-y-2.5">
          {features.slice(0, 3).map((feat, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              <div
                key={i}
                className="w-full p-3.5 rounded-xl glass-card border border-white/10 flex items-start gap-3 transition-all shadow-lg hover:border-white/20"
              >
                <div
                  className="p-2 rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{
                    backgroundColor: `${badgeColor || accentColor}22`,
                    border: `1px solid ${badgeColor || accentColor}40`,
                  }}
                >
                  <Icon
                    style={{
                      width: `${calcIcon}px`,
                      height: `${calcIcon}px`,
                      color: badgeColor || accentColor,
                    }}
                  />
                </div>
                <div>
                  <h4
                    className="font-bold leading-snug"
                    style={{
                      fontSize: `${calcFeatureTitle}px`,
                      color: titleColor || '#ffffff',
                    }}
                  >
                    Feature #{i + 1}
                  </h4>
                  <p
                    className="mt-0.5 leading-relaxed whitespace-pre-line"
                    style={{
                      fontSize: `${calcFeature}px`,
                      color: featureColor || '#cbd5e1',
                    }}
                  >
                    {feat}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
