import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { Sparkles, Flame, Star, Shield, Terminal } from 'lucide-react';
import { resolveTextGradientStyle } from '../../data/typographyPresets';

const ICONS = {
  sparkles: Sparkles,
  flame: Flame,
  star: Star,
  shield: Shield,
  terminal: Terminal,
};

export default function HeroCoverSlide({
  slideData,
  projectData,
  baseScale = 1,
  deviceFitScale = 1,
  textScale = 1,
  titleSize,
  subtitleSize,
  badgeSize,
  techChipSize,
  iconSize,
  fontFamily,
  fontWeight,
  titleGradient,
  titleColor,
  subtitleColor,
  subtitleGradient,
  badgeColor,
  featureColor,
  eyebrowIcon,
  eyebrowText,
  statusBadge,
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
  const title = slideData.title || projectData.title || 'App Showcase';
  const tagline = slideData.tagline || projectData.shortDescription || 'Next-Generation Application Experience';
  const technologies = projectData.technologies || ['Kotlin', 'Compose', 'MVI'];
  const platforms = projectData.platform || ['Android'];

  const EyebrowIcon = ICONS[eyebrowIcon] || Sparkles;

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
  const calcTitle = Math.max(20, Math.round(titleSize * textScale * effectiveRatio));
  const calcSubtitle = Math.max(11, Math.round(subtitleSize * textScale * effectiveRatio));
  const calcBadge = Math.max(9, Math.round(badgeSize * textScale * effectiveRatio));
  const calcIcon = Math.max(10, Math.round(iconSize * textScale * effectiveRatio));
  const calcTech = Math.max(9, Math.round(techChipSize * textScale * effectiveRatio));

  return (
    <div
      className="w-full h-full flex items-center justify-between px-[6%] py-[5%] relative overflow-hidden z-10"
      style={{ fontFamily: `${fontFamily}, sans-serif` }}
    >
      {/* Left Content (Strict 46% boundary to guarantee 0% overlap) */}
      <div className="w-[46%] max-w-[46%] flex-shrink-0 flex flex-col justify-center items-start z-10 space-y-4">
        {/* Category / Platform Tag */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold uppercase tracking-wider glass-card shadow-sm border"
          style={{
            fontSize: `${calcBadge}px`,
            color: badgeColor,
            borderColor: `${badgeColor}35`,
            backgroundColor: `${badgeColor}12`,
          }}
        >
          <EyebrowIcon
            style={{
              width: `${calcIcon}px`,
              height: `${calcIcon}px`,
              color: badgeColor,
            }}
          />
          <span className="truncate">{eyebrowText || platforms.join(' • ')}</span>
        </div>

        {/* Big Title with whitespace-pre-line */}
        <h1
          className={`tracking-tight whitespace-pre-line ${titleStyleObj.className} leading-[1.08] drop-shadow-sm`}
          style={{
            fontSize: `${calcTitle}px`,
            fontWeight: fontWeight,
            ...titleStyleObj.style,
          }}
        >
          {title}
        </h1>

        {/* Tagline */}
        <p
          className={`font-normal leading-relaxed whitespace-pre-line ${subStyleObj.className}`}
          style={{
            fontSize: `${calcSubtitle}px`,
            ...subStyleObj.style,
          }}
        >
          {tagline}
        </p>

        {/* Status / Highlight Badge (Optional) */}
        {statusBadge && (
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.04] border font-semibold shadow-sm"
            style={{
              fontSize: `${calcBadge}px`,
              color: badgeColor,
              borderColor: `${badgeColor}30`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: badgeColor }}
            ></span>
            <span className="truncate">{statusBadge}</span>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {technologies.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-lg font-medium bg-white/[0.04] border shadow-sm"
              style={{
                fontSize: `${calcTech}px`,
                color: '#e2e8f0',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Right Mockup (Strict 50% boundary, perfectly contained) */}
      <div className="w-[50%] max-w-[50%] flex-shrink-0 flex items-center justify-center relative z-10">
        <DeviceMockup
          imageSrc={slideData.imageSrc}
          hasFrame={slideData.hasFrame}
          deviceType={slideData.deviceType || (platforms.includes('Desktop') ? 'desktop' : 'android')}
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
    </div>
  );
}
