import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { resolveTextGradientStyle } from '../../data/typographyPresets';
import StoreBadges from '../common/StoreBadges';
import TechIcon from '../common/TechIcon';
import TrustPill from '../common/TrustPill';
import DynamicIcon from '../common/DynamicIcon';

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
  const rawTech = slideData.technologies !== undefined ? slideData.technologies : projectData.technologies;
  const technologies = Array.isArray(rawTech) ? rawTech : (typeof rawTech === 'string' ? rawTech.split(',').map((s) => s.trim()).filter(Boolean) : ['Kotlin', 'Compose', 'MVI']);
  const platforms = projectData.platform || ['Android'];
  const isReversed = slideData.layoutAlign === 'right';

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

  // Customizable layout split ratio (Text width % vs Mockup width %)
  const split = Math.max(30, Math.min(70, slideData.layoutSplit ?? 48));
  const contentWidthPct = `${split - 2}%`;
  const mockupWidthPct = `${100 - split}%`;

  return (
    <div
      className={`w-full h-full flex items-center justify-between px-[6%] py-[5%] relative overflow-hidden z-10 ${
        isReversed ? 'flex-row-reverse' : ''
      }`}
      style={{ fontFamily: `${fontFamily}, sans-serif` }}
    >
      {/* Text & Content Column (Controlled by layoutSplit) */}
      <div
        className="flex-shrink-0 flex flex-col justify-center items-start z-10 space-y-3.5"
        style={{ width: contentWidthPct, maxWidth: contentWidthPct }}
      >
        {/* Eyebrow Platform Tag & Trust Metric Pill in Header */}
        <div className="flex flex-wrap items-center gap-2">
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
            <DynamicIcon
              name={eyebrowIcon}
              style={{
                width: `${calcIcon}px`,
                height: `${calcIcon}px`,
                color: badgeColor,
              }}
            />
            <span className="truncate">{eyebrowText || platforms.join(' • ')}</span>
          </div>

          {/* Social Proof Metric / Rating Pill */}
          {slideData.showMetricPill && (
            <TrustPill
              text={slideData.metricText || '4.9 ★ Rating • 50K+ Downloads'}
              icon={slideData.metricIcon || 'star'}
              styleType={slideData.metricStyle || 'gold'}
            />
          )}
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

        {/* Tech Stack Chips with Vector & Local Logos */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {technologies.slice(0, 6).map((tech, i) => {
            const isWordmark = slideData.techLogoVariant === 'wordmark';
            return (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 rounded-lg font-medium shadow-sm transition-all hover:bg-white/[0.08] ${
                  isWordmark
                    ? 'px-2 py-1 bg-white/[0.06] border border-white/10'
                    : 'px-2.5 py-1 bg-white/[0.05] border border-white/[0.1]'
                }`}
                style={{
                  fontSize: `${calcTech}px`,
                  color: '#e2e8f0',
                }}
              >
                {slideData.showTechIcons !== false && (
                  <TechIcon
                    name={tech}
                    variant={isWordmark ? 'wordmark' : 'icon'}
                    className={
                      isWordmark
                        ? 'h-4 w-auto max-w-[95px] object-contain'
                        : 'w-3.5 h-3.5 flex-shrink-0'
                    }
                  />
                )}
                {!isWordmark && <span>{tech}</span>}
              </span>
            );
          })}
        </div>

        {/* App Store & Google Play Conversion Badges */}
        {(slideData.showStoreBadges ||
          (slideData.storeBadgeType && slideData.storeBadgeType !== 'none')) && (
          <StoreBadges
            type={slideData.storeBadgeType || 'both'}
            styleType={slideData.storeBadgeStyle || 'official'}
            scale={Math.min(1, Math.max(0.85, effectiveRatio))}
            className="pt-1"
          />
        )}
      </div>

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
    </div>
  );
}
