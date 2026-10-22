import React, { forwardRef, useRef, useEffect, useState } from 'react';
import HeroCoverSlide from './variants/HeroCoverSlide';
import FeatureDeepDiveSlide from './variants/FeatureDeepDiveSlide';
import DualScreenSlide from './variants/DualScreenSlide';
import DesktopDashboardSlide from './variants/DesktopDashboardSlide';
import ResponsiveComboSlide from './variants/ResponsiveComboSlide';
import MinimalFocusSlide from './variants/MinimalFocusSlide';
import { resolveSlideProperties } from '../data/slideDefaults';

export const PRESETS = {
  WEBSITE_HD: { label: 'Personal Website HD (1920×1080)', width: 1920, height: 1080, category: 'Website' },
  WEBSITE_720: { label: 'Personal Website 720p (1280×720)', width: 1280, height: 720, category: 'Website' },
  FIVERR_REC: { label: 'Fiverr Recommended (1280×769)', width: 1280, height: 769, category: 'Fiverr' },
  FIVERR_MIN: { label: 'Fiverr Minimum (712×430)', width: 712, height: 430, category: 'Fiverr' },
  UPWORK: { label: 'Upwork Project Catalog (1000×750, 4:3)', width: 1000, height: 750, category: 'Upwork' },
  UPWORK_HD: { label: 'Upwork Ultra-Sharp (1600×1200, 4:3)', width: 1600, height: 1200, category: 'Upwork' },
};

const CanvasStage = forwardRef(function CanvasStage(
  {
    slide,
    project,
    presetKey = 'WEBSITE_HD',
    customSize = { width: 1920, height: 1080 },
    // Typography & Element Sizes
    textScale = 1,
    titleSize = 52,
    subtitleSize = 18,
    badgeSize = 12,
    featureSize = 14,
    techChipSize = 12,
    iconSize = 16,
    fontFamily = 'Plus Jakarta Sans',
    fontWeight = '800',
    titleGradient = 'metallic',
    titleColor = '#ffffff',
    subtitleColor = '#cbd5e1',
    subtitleGradient = 'none',
    badgeColor = '#818cf8',
    featureColor = '#cbd5e1',
    eyebrowIcon = 'sparkles',
    eyebrowText = '',
    statusBadge = '',
    // Device & 3D
    deviceScale = 1,
    tilt = true,
    tiltAngle = -8,
    pitchAngle = 4,
    perspective = 1200,
    shadowStyle = 'dramatic',
    shadowIntensity = 0.8,
    screenReflection = true,
    offsetX = 0,
    offsetY = 0,
    // Background & Atmosphere
    backgroundColor = '#080a11',
    accentColor = '#6366f1',
    glowIntensity = 0.35,
    backgroundVariant = 'aurora',
    bgAlignment = 'behind_device', // 'behind_device' | 'center' | 'top_right' | 'top_left'
    customBgImage = null,
    textureOverlay = 'dots',
    textureOpacity = 0.04,
    canvasRadius = 28,
    isThumbnailPreview = false,
  },
  ref
) {
  const containerRef = useRef(null);
  const [stageScale, setStageScale] = useState(0.5);

  const targetWidth = presetKey === 'CUSTOM' ? customSize.width : PRESETS[presetKey].width;
  const targetHeight = presetKey === 'CUSTOM' ? customSize.height : PRESETS[presetKey].height;

  useEffect(() => {
    function updateScale() {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth - 40;
      const containerHeight = containerRef.current.clientHeight - 40;

      if (isThumbnailPreview) {
        setStageScale(320 / targetWidth);
        return;
      }

      const scaleX = containerWidth / targetWidth;
      const scaleY = containerHeight / targetHeight;
      const newScale = Math.min(scaleX, scaleY, 0.85);
      setStageScale(Math.max(newScale, 0.2));
    }

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [targetWidth, targetHeight, isThumbnailPreview]);

  // Determine focus coordinates based on variant and alignment
  const variant = slide.variant || 'hero_cover';
  let focusX = 72;
  let focusY = 50;

  if (bgAlignment === 'center') {
    focusX = 50;
    focusY = 50;
  } else if (bgAlignment === 'top_left') {
    focusX = 20;
    focusY = 20;
  } else if (bgAlignment === 'top_center') {
    focusX = 50;
    focusY = 20;
  } else if (bgAlignment === 'top_right') {
    focusX = 80;
    focusY = 20;
  } else if (bgAlignment === 'center_left') {
    focusX = 20;
    focusY = 50;
  } else if (bgAlignment === 'center_right') {
    focusX = 80;
    focusY = 50;
  } else if (bgAlignment === 'bottom_left') {
    focusX = 20;
    focusY = 80;
  } else if (bgAlignment === 'bottom_center') {
    focusX = 50;
    focusY = 80;
  } else if (bgAlignment === 'bottom_right') {
    focusX = 80;
    focusY = 80;
  } else {
    // behind_device auto alignment:
    if (variant === 'feature_deep_dive') {
      focusX = 26;
      focusY = 50;
    } else if (variant === 'desktop_dashboard' || variant === 'minimal_focus') {
      focusX = 50;
      focusY = 52;
    } else if (variant === 'dual_screen') {
      focusX = 50;
      focusY = 60;
    } else {
      focusX = 74;
      focusY = 50;
    }
  }

  // Aspect-ratio aware base resolution scaling factor:
  const aspectRatio = targetWidth / targetHeight;
  // If widescreen (>= 1.55 like 16:9 or 16:10), reference is 1920x1080.
  // If 4:3 (like Upwork 1000x750 or 1600x1200), reference is 1440x1080 so 4:3 height is not penalized by width.
  const refWidth = aspectRatio >= 1.55 ? 1920 : 1080 * aspectRatio;
  const baseScale = Math.min(targetWidth / refWidth, targetHeight / 1080);

  // Device mockup fit factor:
  // Container percentages (w-[50%], w-[45%]) automatically scale with container width.
  // Device only needs slight reduction if vertical canvas height is under 600px (e.g. 712x430).
  const deviceFitScale = Math.min(1, targetHeight / 640);

  // Resolve all properties for the active slide using centralized top-level defaults
  const resolvedSlide = resolveSlideProperties(slide, project);

  // Variant dispatcher
  const renderVariant = () => {
    const commonProps = {
      slideData: resolvedSlide,
      projectData: project,
      baseScale,
      deviceFitScale,
      accentColor,
      ...resolvedSlide,
    };

    switch (variant) {
      case 'feature_deep_dive':
        return <FeatureDeepDiveSlide {...commonProps} />;
      case 'dual_screen':
        return <DualScreenSlide {...commonProps} />;
      case 'desktop_dashboard':
        return <DesktopDashboardSlide {...commonProps} />;
      case 'responsive_combo':
        return <ResponsiveComboSlide {...commonProps} />;
      case 'minimal_focus':
        return <MinimalFocusSlide {...commonProps} />;
      case 'hero_cover':
      default:
        return <HeroCoverSlide {...commonProps} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full h-full flex items-center justify-center p-6 overflow-hidden relative bg-[#06070a]"
    >
      {/* Scaled Preview Wrapper */}
      <div
        style={{
          width: `${targetWidth * stageScale}px`,
          height: `${targetHeight * stageScale}px`,
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
        className={`relative flex items-center justify-center transition-all ${
          isThumbnailPreview ? 'ring-2 ring-indigo-500 rounded-lg shadow-2xl' : ''
        }`}
      >
        {/* Actual Unscaled Canvas */}
        <div
          ref={ref}
          id="showcase-canvas-target"
          style={{
            width: `${targetWidth}px`,
            height: `${targetHeight}px`,
            transform: `scale(${stageScale})`,
            transformOrigin: 'top left',
            backgroundColor: backgroundColor,
            borderRadius: `${canvasRadius}px`,
            fontFamily: `${fontFamily}, sans-serif`,
          }}
          className="absolute top-0 left-0 overflow-hidden select-none shadow-2xl ring-1 ring-white/10"
        >
          {/* OPTIONAL CUSTOM BACKGROUND IMAGE */}
          {customBgImage && (
            <div
              className="absolute inset-0 pointer-events-none bg-cover bg-center"
              style={{ backgroundImage: `url(${customBgImage})` }}
            />
          )}

          {/* BACKGROUND VARIANT 1: PROPORTIONALLY ALIGNED AURORA MESH */}
          {backgroundVariant === 'aurora' && !customBgImage && (
            <>
              {/* Primary Orb directly aligned with device focus */}
              <div
                className="ambient-glow aspect-square transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '70%',
                  left: `${focusX}%`,
                  top: `${focusY}%`,
                  backgroundColor: accentColor,
                  opacity: glowIntensity * 1.1,
                  filter: 'blur(95px)',
                }}
              />
              {/* Secondary Balance Orb (subtly placed on opposite side so it never overrides primary light) */}
              <div
                className="ambient-glow aspect-square transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '45%',
                  left: `${100 - focusX}%`,
                  top: `${100 - focusY}%`,
                  backgroundColor: accentColor,
                  opacity: glowIntensity * 0.25,
                  filter: 'blur(120px)',
                }}
              />
            </>
          )}

          {/* BACKGROUND VARIANT 2: SPOTLIGHT CONE (PRECISELY AT FOCUS) */}
          {backgroundVariant === 'spotlight' && !customBgImage && (
            <>
              {/* Spotlight Core Beam */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 45% 40% at ${focusX}% ${focusY}%, ${accentColor} 0%, transparent 70%)`,
                  opacity: Math.min(1, glowIntensity * 1.8),
                }}
              />
              {/* Spotlight Ambient Wash */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 85% 75% at ${focusX}% ${focusY}%, ${accentColor} 0%, transparent 75%)`,
                  opacity: Math.min(1, glowIntensity * 0.9),
                }}
              />
            </>
          )}

          {/* BACKGROUND VARIANT 3: APPLE STUDIO RADIAL (PRECISELY AT FOCUS) */}
          {backgroundVariant === 'radial' && !customBgImage && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 85% 70% at ${focusX}% ${focusY}%, ${accentColor} 0%, transparent 72%)`,
                opacity: Math.min(1, glowIntensity * 1.4),
              }}
            />
          )}

          {/* BACKGROUND VARIANT 4: DEVELOPER CYBER GRID */}
          {backgroundVariant === 'grid' && !customBgImage && (
            <>
              <div
                className="ambient-glow aspect-square transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '65%',
                  left: `${focusX}%`,
                  top: `${focusY}%`,
                  backgroundColor: accentColor,
                  opacity: glowIntensity * 0.95,
                  filter: 'blur(95px)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.09]"
                style={{
                  backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                  backgroundSize: '48px 48px',
                }}
              />
            </>
          )}

          {/* BACKGROUND VARIANT 5: LINEAR GRADIENT (DIRECTIONALLY ALIGNED WITH FOCUS) */}
          {backgroundVariant === 'linear' && !customBgImage && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  bgAlignment === 'top_center'
                    ? `linear-gradient(180deg, ${accentColor} 0%, transparent 70%)`
                    : bgAlignment === 'bottom_center'
                    ? `linear-gradient(0deg, ${accentColor} 0%, transparent 70%)`
                    : bgAlignment === 'top_left'
                    ? `linear-gradient(135deg, ${accentColor} 0%, transparent 70%)`
                    : bgAlignment === 'top_right'
                    ? `linear-gradient(225deg, ${accentColor} 0%, transparent 70%)`
                    : bgAlignment === 'bottom_left'
                    ? `linear-gradient(45deg, ${accentColor} 0%, transparent 70%)`
                    : bgAlignment === 'bottom_right'
                    ? `linear-gradient(315deg, ${accentColor} 0%, transparent 70%)`
                    : bgAlignment === 'center_left'
                    ? `linear-gradient(90deg, ${accentColor} 0%, transparent 70%)`
                    : bgAlignment === 'center_right'
                    ? `linear-gradient(270deg, ${accentColor} 0%, transparent 70%)`
                    : `radial-gradient(ellipse 85% 75% at ${focusX}% ${focusY}%, ${accentColor} 0%, transparent 70%)`,
                opacity: Math.min(1, glowIntensity * 1.3),
              }}
            />
          )}

          {/* TEXTURE OVERLAYS */}
          {textureOverlay === 'dots' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                backgroundSize: '32px 32px',
                opacity: textureOpacity,
              }}
            />
          )}
          {textureOverlay === 'grid' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                opacity: textureOpacity,
              }}
            />
          )}

          {/* Render Slide Variant */}
          {renderVariant()}
        </div>
      </div>
    </div>
  );
});

export default CanvasStage;
