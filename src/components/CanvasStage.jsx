import React, { forwardRef, useRef, useEffect, useState } from 'react';
import HeroCoverSlide from './variants/HeroCoverSlide';
import FeatureDeepDiveSlide from './variants/FeatureDeepDiveSlide';
import DualScreenSlide from './variants/DualScreenSlide';
import DesktopDashboardSlide from './variants/DesktopDashboardSlide';
import ResponsiveComboSlide from './variants/ResponsiveComboSlide';
import MinimalFocusSlide from './variants/MinimalFocusSlide';
import { resolveSlideProperties } from '../data/slideDefaults';
import { loadGoogleFont } from '../utils/fontLoader';

export const PRESETS = {
  WEBSITE_HD: { label: 'Personal Website HD (1920×1080)', width: 1920, height: 1080, category: 'Website' },
  WEBSITE_720: { label: 'Personal Website 720p (1280×720)', width: 1280, height: 720, category: 'Website' },
  FIVERR_REC: { label: 'Fiverr Recommended (1280×769)', width: 1280, height: 769, category: 'Fiverr' },
  FIVERR_MIN: { label: 'Fiverr Minimum (712×430)', width: 712, height: 430, category: 'Fiverr' },
  UPWORK: { label: 'Upwork Project Catalog (1000×750, 4:3)', width: 1000, height: 750, category: 'Upwork' },
  UPWORK_HD: { label: 'Upwork Ultra-Sharp (1600×1200, 4:3)', width: 1600, height: 1200, category: 'Upwork' }
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
    rotation = 0,
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
    textureOpacity = 0.20,
    canvasRadius = 28,
    isThumbnailPreview = false,
    showCenterGuides = false,
  },
  ref
) {
  const containerRef = useRef(null);
  const [stageScale, setStageScale] = useState(0.5);

  const currentPreset = (presetKey && PRESETS[presetKey]) || (presetKey && PRESETS[presetKey.toUpperCase()]) || PRESETS.WEBSITE_HD;
  const targetWidth = presetKey === 'CUSTOM' ? (customSize?.width || 1920) : currentPreset.width;
  const targetHeight = presetKey === 'CUSTOM' ? (customSize?.height || 1080) : currentPreset.height;

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

  // Dynamically load Google Font into document head
  useEffect(() => {
    if (fontFamily) {
      loadGoogleFont(fontFamily);
    }
  }, [fontFamily]);

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

  // Resolve all properties for the active slide using centralized top-level defaults
  const resolvedSlide = resolveSlideProperties(slide, project);

  // Aspect-ratio aware base resolution scaling factor:
  const aspectRatio = targetWidth / targetHeight;
  // If widescreen (>= 1.55 like 16:9 or 16:10), reference is 1920x1080.
  // If 4:3 (like Upwork 1000x750 or 1600x1200), reference is 1440x1080 so 4:3 height is not penalized by width.
  const refWidth = aspectRatio >= 1.55 ? 1920 : 1080 * aspectRatio;
  const rawBaseScale = Math.min(targetWidth / refWidth, targetHeight / 1080);

  // User-customizable Auto-Scale:
  const isAutoScale = resolvedSlide.autoScaleEnabled !== false;
  const intensity = resolvedSlide.autoScaleIntensity ?? 1.0;
  // If disabled, scale is fixed at 1.0; if enabled, interpolate difference by intensity:
  const baseScale = isAutoScale ? 1 + (rawBaseScale - 1) * intensity : 1;

  // Proportional Device Dimensions Auto-Fit (Personal / Fiverr / Upwork):
  // Automatically scales device height and width proportionally across all canvas presets:
  // - Personal HD (1920x1080): 100% scale
  // - Personal 720p (1280x720): 66.7% scale (matches 720p height)
  // - Fiverr Recommended (1280x769): 71.2% scale (matches 769p height)
  // - Upwork Portfolio (1000x750 4:3): ~65.1% scale (fits 750px height + 1000px width with no clipping)
  // - Fiverr Minimum (712x430): ~39.8% scale (fits 430px height with no clipping)
  const isDeviceAutoFit = resolvedSlide.deviceAutoFit !== false;
  const normHeightScale = targetHeight / 1080;
  const normWidthScale = targetWidth / 1920;
  const proportionalDeviceFit = Math.min(normHeightScale, normWidthScale * 1.25);
  const deviceFitScale = isDeviceAutoFit ? proportionalDeviceFit : 1;

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
            transform: `scale(${stageScale}) translateZ(0)`,
            transformOrigin: 'top left',
            backgroundColor: backgroundColor,
            borderRadius: `${canvasRadius}px`,
            fontFamily: `${fontFamily}, sans-serif`,
            imageRendering: '-webkit-optimize-contrast',
            WebkitBackfaceVisibility: 'hidden',
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

          {/* BACKGROUND VARIANT 6: SUNSET GLOW (WARM DUAL-TONE AMBIENCE) */}
          {backgroundVariant === 'mesh_sunset' && !customBgImage && (
            <>
              <div
                className="ambient-glow aspect-square transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '75%',
                  left: `${focusX}%`,
                  top: `${focusY}%`,
                  backgroundColor: accentColor,
                  opacity: glowIntensity * 1.2,
                  filter: 'blur(100px)',
                }}
              />
              <div
                className="ambient-glow aspect-square transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '55%',
                  left: `${focusX > 50 ? focusX - 25 : focusX + 25}%`,
                  top: `${focusY > 50 ? focusY - 20 : focusY + 20}%`,
                  backgroundColor: '#f59e0b',
                  opacity: glowIntensity * 0.45,
                  filter: 'blur(110px)',
                }}
              />
            </>
          )}

          {/* BACKGROUND VARIANT 7: CONCENTRIC RADAR RINGS */}
          {backgroundVariant === 'cyber_rings' && !customBgImage && (
            <>
              <div
                className="ambient-glow aspect-square transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '65%',
                  left: `${focusX}%`,
                  top: `${focusY}%`,
                  backgroundColor: accentColor,
                  opacity: glowIntensity * 0.9,
                  filter: 'blur(90px)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at ${focusX}% ${focusY}%, transparent 90px, rgba(255,255,255,0.08) 91px, transparent 93px, transparent 180px, rgba(255,255,255,0.06) 181px, transparent 183px, transparent 270px, rgba(255,255,255,0.04) 271px, transparent 273px, transparent 360px, rgba(255,255,255,0.03) 361px, transparent 363px)`,
                }}
              />
            </>
          )}

          {/* BACKGROUND VARIANT 8: STUDIO VIGNETTE (DEEP CLEAN DROPOFF) */}
          {backgroundVariant === 'deep_void' && !customBgImage && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 95% 85% at ${focusX}% ${focusY}%, ${accentColor} 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.98) 100%)`,
                opacity: Math.min(1, glowIntensity * 1.5),
              }}
            />
          )}

          {/* BACKGROUND VARIANT 9: HORIZON RAY (CINEMATIC SPLIT BEAM) */}
          {backgroundVariant === 'split_horizon' && !customBgImage && (
            <>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, transparent 0%, ${accentColor} 50%, transparent 100%)`,
                  opacity: Math.min(1, glowIntensity * 0.45),
                }}
              />
              <div
                className="ambient-glow aspect-square transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '80%',
                  left: `${focusX}%`,
                  top: `${focusY}%`,
                  backgroundColor: accentColor,
                  opacity: glowIntensity * 1.1,
                  filter: 'blur(100px)',
                }}
              />
            </>
          )}

          {/* TEXTURE OVERLAYS */}
          {textureOverlay === 'dots' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.75) 1.5px, transparent 1.5px)`,
                backgroundSize: '24px 24px',
                opacity: textureOpacity,
              }}
            />
          )}
          {textureOverlay === 'grid' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                opacity: textureOpacity,
              }}
            />
          )}
          {textureOverlay === 'plus' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 12V24M12 18H24' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-opacity='0.75'/%3E%3C/svg%3E")`,
                backgroundSize: '36px 36px',
                opacity: textureOpacity,
              }}
            />
          )}
          {textureOverlay === 'isometric' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='69.282' viewBox='0 0 40 69.282' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L20 11.547L0 0M40 69.282L20 57.735L0 69.282M20 11.547V57.735M40 23.094L0 46.188M0 23.094L40 46.188' stroke='white' stroke-width='1' stroke-opacity='0.6'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 69.282px',
                opacity: textureOpacity,
              }}
            />
          )}
          {textureOverlay === 'diagonal' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.45) 0, rgba(255, 255, 255, 0.45) 1px, transparent 0, transparent 16px)`,
                opacity: textureOpacity,
              }}
            />
          )}
          {textureOverlay === 'honeycomb' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66ZM28 100L0 84L0 66L28 82L56 66L56 84L28 100Z' stroke='white' stroke-width='1.2' stroke-opacity='0.6'/%3E%3C/svg%3E")`,
                backgroundSize: '56px 100px',
                opacity: textureOpacity,
              }}
            />
          )}
          {textureOverlay === 'topography' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='60' cy='60' rx='52' ry='32' stroke='white' stroke-width='1.2' stroke-opacity='0.5'/%3E%3Cellipse cx='60' cy='60' rx='40' ry='24' stroke='white' stroke-width='1.2' stroke-opacity='0.5'/%3E%3Cellipse cx='60' cy='60' rx='26' ry='16' stroke='white' stroke-width='1.2' stroke-opacity='0.5'/%3E%3Cellipse cx='60' cy='60' rx='12' ry='8' stroke='white' stroke-width='1.2' stroke-opacity='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '120px 120px',
                opacity: textureOpacity,
              }}
            />
          )}
          {textureOverlay === 'noise' && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.75'/%3E%3C/svg%3E")`,
                opacity: textureOpacity * 1.5,
              }}
            />
          )}

          {/* Render Slide Variant */}
          {renderVariant()}

          {/* VISUAL CENTER ALIGNMENT GUIDES (Purely for visual reference, ignored during export) */}
          {showCenterGuides && (
            <div
              className="export-ignore absolute inset-0 pointer-events-none z-50 select-none"
              data-export-ignore="true"
            >
              {/* Vertical Center Guide Line (50% X) */}
              <div
                className="absolute top-0 bottom-0 left-1/2 w-[1.5px] -translate-x-1/2 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.85), rgba(99, 102, 241, 0.85), rgba(6, 182, 212, 0.85))',
                  boxShadow: '0 0 8px rgba(6, 182, 212, 0.7), 0 0 2px #ffffff',
                }}
              >
                {/* Top Badge */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-950/90 border border-cyan-400/60 shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[10px] font-mono font-bold text-cyan-300">
                    CENTER X: 50% ({Math.round(targetWidth / 2)}px)
                  </span>
                </div>
                {/* Bottom Badge */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-950/90 border border-cyan-400/60 shadow-xl whitespace-nowrap">
                  <span className="text-[10px] font-mono font-semibold text-cyan-300">
                    50% X
                  </span>
                </div>
              </div>

              {/* Horizontal Center Guide Line (50% Y) */}
              <div
                className="absolute left-0 right-0 top-1/2 h-[1.5px] -translate-y-1/2 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(6, 182, 212, 0.85), rgba(99, 102, 241, 0.85), rgba(6, 182, 212, 0.85))',
                  boxShadow: '0 0 8px rgba(6, 182, 212, 0.7), 0 0 2px #ffffff',
                }}
              >
                {/* Left Badge */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-slate-950/90 border border-cyan-400/60 shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[10px] font-mono font-bold text-cyan-300">
                    CENTER Y: 50% ({Math.round(targetHeight / 2)}px)
                  </span>
                </div>
                {/* Right Badge */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-slate-950/90 border border-cyan-400/60 shadow-xl whitespace-nowrap">
                  <span className="text-[10px] font-mono font-semibold text-cyan-300">
                    50% Y
                  </span>
                </div>
              </div>

              {/* Center Crosshair Target Reticle */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                {/* Outer Ring */}
                <div className="w-10 h-10 rounded-full border-2 border-cyan-400 bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                  {/* Inner Target Bullseye */}
                  <div className="w-3 h-3 rounded-full bg-cyan-300 ring-2 ring-indigo-500 shadow-[0_0_8px_#ffffff]" />
                </div>
                {/* Center Coordinates Pill */}
                <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-slate-950/95 border border-cyan-400/60 shadow-2xl text-[10px] font-mono font-bold text-cyan-200 tracking-wider whitespace-nowrap">
                  EXACT CENTER ({Math.round(targetWidth / 2)} × {Math.round(targetHeight / 2)})
                </div>
              </div>

              {/* Golden Ratio / Rule of Thirds subtle lines */}
              <div className="absolute top-0 bottom-0 left-[33.33%] w-[1px] border-l border-dashed border-cyan-400/25 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-[66.67%] w-[1px] border-l border-dashed border-cyan-400/25 pointer-events-none" />
              <div className="absolute left-0 right-0 top-[33.33%] h-[1px] border-t border-dashed border-cyan-400/25 pointer-events-none" />
              <div className="absolute left-0 right-0 top-[66.67%] h-[1px] border-t border-dashed border-cyan-400/25 pointer-events-none" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CanvasStage;
