import React, { forwardRef, useRef, useEffect, useState } from 'react';
import HeroCoverSlide from './variants/HeroCoverSlide';
import FeatureDeepDiveSlide from './variants/FeatureDeepDiveSlide';
import DualScreenSlide from './variants/DualScreenSlide';
import DesktopDashboardSlide from './variants/DesktopDashboardSlide';
import ResponsiveComboSlide from './variants/ResponsiveComboSlide';
import MinimalFocusSlide from './variants/MinimalFocusSlide';

export const PRESETS = {
  WEBSITE_HD: { label: 'Personal Website HD (1920×1080)', width: 1920, height: 1080, category: 'Website' },
  WEBSITE_720: { label: 'Personal Website 720p (1280×720)', width: 1280, height: 720, category: 'Website' },
  FIVERR_REC: { label: 'Fiverr Recommended (1280×769)', width: 1280, height: 769, category: 'Fiverr' },
  FIVERR_MIN: { label: 'Fiverr Minimum (712×430)', width: 712, height: 430, category: 'Fiverr' },
  UPWORK: { label: 'Upwork Portfolio (1000×750)', width: 1000, height: 750, category: 'Upwork' },
};

const CanvasStage = forwardRef(function CanvasStage(
  {
    slide,
    project,
    presetKey = 'WEBSITE_HD',
    customSize = { width: 1920, height: 1080 },
    textScale = 1,
    deviceScale = 1,
    backgroundColor = '#080a11',
    accentColor = '#6366f1',
    glowIntensity = 0.35,
    isThumbnailPreview = false,
  },
  ref
) {
  const containerRef = useRef(null);
  const [stageScale, setStageScale] = useState(0.5);

  const targetWidth = presetKey === 'CUSTOM' ? customSize.width : PRESETS[presetKey].width;
  const targetHeight = presetKey === 'CUSTOM' ? customSize.height : PRESETS[presetKey].height;

  // Auto calculate scale so canvas fits viewport cleanly
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

  // Variant dispatcher
  const renderVariant = () => {
    const variant = slide.variant || 'hero_cover';
    const commonProps = {
      slideData: slide,
      projectData: project,
      textScale,
      deviceScale,
      accentColor,
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
        {/* Actual Unscaled Canvas (Export Target) */}
        <div
          ref={ref}
          id="showcase-canvas-target"
          style={{
            width: `${targetWidth}px`,
            height: `${targetHeight}px`,
            transform: `scale(${stageScale})`,
            transformOrigin: 'top left',
            backgroundColor: backgroundColor,
          }}
          className="absolute top-0 left-0 overflow-hidden select-none shadow-2xl rounded-[28px] ring-1 ring-white/10"
        >
          {/* Ambient Lighting & Mesh Gradients */}
          <div
            className="ambient-glow w-[800px] h-[800px] -top-64 -right-32"
            style={{
              backgroundColor: accentColor,
              opacity: glowIntensity,
            }}
          />
          <div
            className="ambient-glow w-[600px] h-[600px] -bottom-48 -left-32"
            style={{
              backgroundColor: accentColor,
              opacity: glowIntensity * 0.6,
            }}
          />

          {/* Subtle Grid Lines Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: '36px 36px',
            }}
          />

          {/* Render Slide Variant */}
          {renderVariant()}
        </div>
      </div>
    </div>
  );
});

export default CanvasStage;
