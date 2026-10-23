import React, { useState } from 'react';
import {
  Layout,
  Smartphone,
  Type,
  Palette,
} from 'lucide-react';
import { extractDominantColor } from '../utils/colorExtractor';

import TemplateTab from './inspector/TemplateTab';
import MockupTab from './inspector/MockupTab';
import TypographyTab from './inspector/TypographyTab';
import CanvasTab from './inspector/CanvasTab';

const INSPECTOR_TABS = [
  { id: 'template', label: 'Template', icon: Layout },
  { id: 'mockup', label: 'Mockup', icon: Smartphone },
  { id: 'typography', label: 'Content', icon: Type },
  { id: 'canvas', label: 'Canvas', icon: Palette },
];

export default function InspectorSidebar({
  slide,
  project,
  onUpdateSlide,
  // Background & Canvas (Global Atmosphere Settings)
  backgroundColor,
  onChangeBackgroundColor,
  accentColor,
  onChangeAccentColor,
  glowIntensity,
  onChangeGlowIntensity,
  backgroundVariant,
  onChangeBackgroundVariant,
  bgAlignment,
  onChangeBgAlignment,
  customBgImage,
  onChangeCustomBgImage,
  textureOverlay,
  onChangeTextureOverlay,
  canvasRadius,
  onChangeCanvasRadius,
  exportScale = 2,
  onChangeExportScale,
  exportQuality = 1.0,
  onChangeExportQuality,
  exportFormat = 'png',
  onChangeExportFormat,
  presetKey,
}) {
  const [activeTab, setActiveTab] = useState('template'); // 'template' | 'mockup' | 'typography' | 'canvas'

  const isMultiDeviceVariant =
    slide.variant === 'dual_screen' || slide.variant === 'responsive_combo';

  const handleFileUpload = async (e, field = 'imageSrc') => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;
      onUpdateSlide({ [field]: dataUrl });

      try {
        const detectedColor = await extractDominantColor(dataUrl);
        if (detectedColor) {
          onChangeAccentColor(detectedColor);
        }
      } catch (err) {}
    };
    reader.readAsDataURL(file);
  };

  const handleMagicColor = async () => {
    if (slide.imageSrc) {
      const color = await extractDominantColor(slide.imageSrc);
      onChangeAccentColor(color);
    }
  };

  return (
    <aside className="w-[360px] min-w-[360px] max-w-[360px] flex-shrink-0 h-full bg-[#0a0d14]/95 backdrop-blur-xl border-l border-white/[0.06] flex flex-col z-20 select-none">
      {/* 4 Crystal-Clear, Unified Category Tabs */}
      <div className="p-2.5 border-b border-white/[0.06] bg-[#07090e]/60">
        <div className="grid grid-cols-4 gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.05]">
          {INSPECTOR_TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Category 1: Template & Layout */}
        {activeTab === 'template' && (
          <TemplateTab
            slide={slide}
            onUpdateSlide={onUpdateSlide}
          />
        )}

        {/* Category 2: Mockup & Hardware (Directly bound to active selected slide) */}
        {activeTab === 'mockup' && (
          <MockupTab
            slide={slide}
            onUpdateSlide={onUpdateSlide}
            isMultiDeviceVariant={isMultiDeviceVariant}
            handleFileUpload={handleFileUpload}
            handleMagicColor={handleMagicColor}
            tilt={slide.tilt}
            onChangeTilt={(val) => onUpdateSlide({ tilt: val })}
            tiltAngle={slide.tiltAngle}
            onChangeTiltAngle={(val) => onUpdateSlide({ tiltAngle: val })}
            pitchAngle={slide.pitchAngle}
            onChangePitchAngle={(val) => onUpdateSlide({ pitchAngle: val })}
            shadowStyle={slide.shadowStyle}
            onChangeShadowStyle={(val) => onUpdateSlide({ shadowStyle: val })}
            shadowIntensity={slide.shadowIntensity}
            onChangeShadowIntensity={(val) => onUpdateSlide({ shadowIntensity: val })}
            screenReflection={slide.screenReflection}
            onChangeScreenReflection={(val) => onUpdateSlide({ screenReflection: val })}
            deviceScale={slide.deviceScale}
            onChangeDeviceScale={(val) => onUpdateSlide({ deviceScale: val })}
            offsetX={slide.offsetX}
            onChangeOffsetX={(val) => onUpdateSlide({ offsetX: val })}
            offsetY={slide.offsetY}
            onChangeOffsetY={(val) => onUpdateSlide({ offsetY: val })}
          />
        )}

        {/* Category 3: Typography & Content (Directly bound to active selected slide) */}
        {activeTab === 'typography' && (
          <TypographyTab
            slide={slide}
            project={project}
            onUpdateSlide={onUpdateSlide}
            textScale={slide.textScale}
            onChangeTextScale={(val) => onUpdateSlide({ textScale: val })}
            titleSize={slide.titleSize}
            onChangeTitleSize={(val) => onUpdateSlide({ titleSize: val })}
            subtitleSize={slide.subtitleSize}
            onChangeSubtitleSize={(val) => onUpdateSlide({ subtitleSize: val })}
            badgeSize={slide.badgeSize}
            onChangeBadgeSize={(val) => onUpdateSlide({ badgeSize: val })}
            featureSize={slide.featureSize}
            onChangeFeatureSize={(val) => onUpdateSlide({ featureSize: val })}
            techChipSize={slide.techChipSize}
            onChangeTechChipSize={(val) => onUpdateSlide({ techChipSize: val })}
            iconSize={slide.iconSize}
            onChangeIconSize={(val) => onUpdateSlide({ iconSize: val })}
            fontFamily={slide.fontFamily}
            onChangeFontFamily={(val) => onUpdateSlide({ fontFamily: val })}
            fontWeight={slide.fontWeight}
            onChangeFontWeight={(val) => onUpdateSlide({ fontWeight: val })}
            titleGradient={slide.titleGradient}
            onChangeTitleGradient={(val) => onUpdateSlide({ titleGradient: val })}
            titleColor={slide.titleColor}
            onChangeTitleColor={(val) => onUpdateSlide({ titleColor: val })}
            subtitleColor={slide.subtitleColor}
            onChangeSubtitleColor={(val) => onUpdateSlide({ subtitleColor: val })}
            subtitleGradient={slide.subtitleGradient}
            onChangeSubtitleGradient={(val) => onUpdateSlide({ subtitleGradient: val })}
            badgeColor={slide.badgeColor}
            onChangeBadgeColor={(val) => onUpdateSlide({ badgeColor: val })}
            featureColor={slide.featureColor}
            onChangeFeatureColor={(val) => onUpdateSlide({ featureColor: val })}
            eyebrowIcon={slide.eyebrowIcon}
            onChangeEyebrowIcon={(val) => onUpdateSlide({ eyebrowIcon: val })}
            eyebrowText={slide.eyebrowText}
            onChangeEyebrowText={(val) => onUpdateSlide({ eyebrowText: val })}
            statusBadge={slide.statusBadge}
            onChangeStatusBadge={(val) => onUpdateSlide({ statusBadge: val })}
          />
        )}

        {/* Category 4: Canvas & Atmosphere (Global Project Atmosphere) */}
        {activeTab === 'canvas' && (
          <CanvasTab
            backgroundVariant={backgroundVariant}
            onChangeBackgroundVariant={onChangeBackgroundVariant}
            bgAlignment={bgAlignment}
            onChangeBgAlignment={onChangeBgAlignment}
            customBgImage={customBgImage}
            onChangeCustomBgImage={onChangeCustomBgImage}
            backgroundColor={backgroundColor}
            onChangeBackgroundColor={onChangeBackgroundColor}
            accentColor={accentColor}
            onChangeAccentColor={onChangeAccentColor}
            glowIntensity={glowIntensity}
            onChangeGlowIntensity={onChangeGlowIntensity}
            textureOverlay={textureOverlay}
            onChangeTextureOverlay={onChangeTextureOverlay}
            canvasRadius={canvasRadius}
            onChangeCanvasRadius={onChangeCanvasRadius}
            exportScale={exportScale}
            onChangeExportScale={onChangeExportScale}
            exportQuality={exportQuality}
            onChangeExportQuality={onChangeExportQuality}
            exportFormat={exportFormat}
            onChangeExportFormat={onChangeExportFormat}
            presetKey={presetKey}
          />
        )}
      </div>
    </aside>
  );
}
