import React, { useState } from 'react';
import { Upload, Sparkles, X, ArrowLeftRight, Shield, Crop } from 'lucide-react';
import { normalizeImageSrc } from '../DeviceMockup';
import { VARIANTS, DEVICE_FINISHES } from './inspectorConstants';
import { autoTrimImage } from '../../utils/imageTrim';

export default function MockupTab({
  slide,
  onUpdateSlide,
  isMultiDeviceVariant,
  handleFileUpload,
  handleMagicColor,
  tilt,
  onChangeTilt,
  tiltAngle,
  onChangeTiltAngle,
  pitchAngle,
  onChangePitchAngle,
  shadowStyle,
  onChangeShadowStyle,
  shadowIntensity,
  onChangeShadowIntensity,
  screenReflection,
  onChangeScreenReflection,
  deviceScale,
  onChangeDeviceScale,
  rotation,
  onChangeRotation,
  offsetX,
  onChangeOffsetX,
  offsetY,
  onChangeOffsetY,
}) {
  const [activeScreenIndex, setActiveScreenIndex] = useState('primary'); // 'primary' | 'secondary'

  const variant = slide.variant || 'hero_cover';
  const activeTemplate = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];
  const showTiltControls = true;
  const isDesktopVariant = variant === 'desktop_dashboard';

  // In multi-device variants (Dual Screen & Responsive Combo), allow switching between Screen 1 and Screen 2
  const isSecondary = isMultiDeviceVariant && activeScreenIndex === 'secondary';

  // Active screen properties
  const currentImageSrc = isSecondary ? slide.secondaryImageSrc : slide.imageSrc;
  const currentUploadKey = isSecondary ? 'secondaryImageSrc' : 'imageSrc';
  const currentHasFrame = isSecondary
    ? (slide.secondaryHasFrame ?? slide.hasFrame ?? false)
    : (slide.hasFrame || false);

  const rawDeviceType = isSecondary
    ? (slide.secondaryDeviceType || (variant === 'dual_screen' ? 'apple-iphone-16-pro' : 'google-pixel-9'))
    : (slide.deviceType || (isDesktopVariant ? 'desktop-large' : 'google-pixel-9'));

  const currentDeviceType =
    rawDeviceType === 'android' ? 'google-pixel-9'
    : rawDeviceType === 'iphone' ? 'apple-iphone-16-pro'
    : rawDeviceType === 'desktop' ? 'desktop-large'
    : rawDeviceType === 'tablet' ? 'apple-ipad-pro-11-m4'
    : rawDeviceType;

  const currentFinish = isSecondary
    ? (slide.secondaryDeviceFinish ?? slide.deviceFinish ?? 'natural_titanium')
    : (slide.deviceFinish || 'natural_titanium');

  const currentFrameGleam = isSecondary
    ? (slide.secondaryFrameGleam !== undefined ? slide.secondaryFrameGleam : (slide.frameGleam !== false))
    : (slide.frameGleam !== false);

  const currentCornerRadius = isSecondary
    ? (slide.secondaryDeviceCornerRadius !== undefined ? slide.secondaryDeviceCornerRadius : (slide.deviceCornerRadius || (isDesktopVariant ? 12 : 36)))
    : (slide.deviceCornerRadius || (isDesktopVariant ? 12 : 36));

  const currentShadowStyle = isSecondary
    ? (slide.secondaryShadowStyle || slide.shadowStyle || shadowStyle || 'dramatic')
    : (slide.shadowStyle || shadowStyle || 'dramatic');

  const currentShadowIntensity = isSecondary
    ? (slide.secondaryShadowIntensity !== undefined ? slide.secondaryShadowIntensity : (slide.shadowIntensity !== undefined ? slide.shadowIntensity : (shadowIntensity !== undefined ? shadowIntensity : 0.8)))
    : (slide.shadowIntensity !== undefined ? slide.shadowIntensity : (shadowIntensity !== undefined ? shadowIntensity : 0.8));

  const currentScreenReflection = isSecondary
    ? (slide.secondaryScreenReflection !== undefined ? slide.secondaryScreenReflection : (slide.screenReflection !== undefined ? slide.screenReflection : (screenReflection !== false)))
    : (slide.screenReflection !== undefined ? slide.screenReflection : (screenReflection !== false));

  const currentDeviceScale = isSecondary
    ? (slide.secondaryDeviceScale !== undefined ? slide.secondaryDeviceScale : (slide.deviceScale !== undefined ? slide.deviceScale : (deviceScale !== undefined ? deviceScale : 1.0)))
    : (slide.deviceScale !== undefined ? slide.deviceScale : (deviceScale !== undefined ? deviceScale : 1.0));

  const currentOffsetX = isSecondary
    ? (slide.secondaryOffsetX !== undefined ? slide.secondaryOffsetX : (slide.offsetX !== undefined ? slide.offsetX : (offsetX || 0)))
    : (slide.offsetX !== undefined ? slide.offsetX : (offsetX || 0));

  const currentOffsetY = isSecondary
    ? (slide.secondaryOffsetY !== undefined ? slide.secondaryOffsetY : (slide.offsetY !== undefined ? slide.offsetY : (offsetY || 0)))
    : (slide.offsetY !== undefined ? slide.offsetY : (offsetY || 0));

  const currentTilt = isSecondary
    ? (slide.secondaryTilt !== undefined ? slide.secondaryTilt : false)
    : (slide.tilt !== undefined ? slide.tilt : (tilt || false));

  const currentTiltAngle = isSecondary
    ? (slide.secondaryTiltAngle !== undefined ? slide.secondaryTiltAngle : 8)
    : (slide.tiltAngle !== undefined ? slide.tiltAngle : (tiltAngle !== undefined ? tiltAngle : -8));

  const currentPitchAngle = isSecondary
    ? (slide.secondaryPitchAngle !== undefined ? slide.secondaryPitchAngle : 4)
    : (slide.pitchAngle !== undefined ? slide.pitchAngle : (pitchAngle !== undefined ? pitchAngle : 4));

  const defaultRotation = variant === 'dual_screen' ? (isSecondary ? 3 : -3) : 0;
  const currentRotation = isSecondary
    ? (slide.secondaryRotation !== undefined ? slide.secondaryRotation : defaultRotation)
    : (slide.rotation !== undefined ? slide.rotation : (rotation !== undefined ? rotation : defaultRotation));

  const updateHasFrame = (checked) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryHasFrame: checked });
    } else {
      onUpdateSlide({ hasFrame: checked });
    }
  };

  const updateDeviceType = (type) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryDeviceType: type });
    } else {
      onUpdateSlide({ deviceType: type });
    }
  };

  const updateDeviceFinish = (finish) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryDeviceFinish: finish });
    } else {
      onUpdateSlide({ deviceFinish: finish });
    }
  };

  const updateFrameGleam = (checked) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryFrameGleam: checked });
    } else {
      onUpdateSlide({ frameGleam: checked });
    }
  };

  const updateCornerRadius = (val) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryDeviceCornerRadius: val });
    } else {
      onUpdateSlide({ deviceCornerRadius: val });
    }
  };

  const updateShadowStyle = (val) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryShadowStyle: val });
    } else {
      onChangeShadowStyle(val);
    }
  };

  const updateShadowIntensity = (val) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryShadowIntensity: val });
    } else {
      onChangeShadowIntensity(val);
    }
  };

  const updateScreenReflection = (val) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryScreenReflection: val });
    } else {
      onChangeScreenReflection(val);
    }
  };

  const updateDeviceScale = (val) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryDeviceScale: val });
    } else {
      onChangeDeviceScale(val);
    }
  };

  const updateOffsetX = (val) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryOffsetX: val });
    } else {
      onChangeOffsetX(val);
    }
  };

  const updateOffsetY = (val) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryOffsetY: val });
    } else {
      onChangeOffsetY(val);
    }
  };

  const updateTilt = (checked) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryTilt: checked });
    } else {
      onChangeTilt(checked);
    }
  };

  const updateTiltAngle = (val) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryTiltAngle: val });
    } else {
      onChangeTiltAngle(val);
    }
  };

  const updatePitchAngle = (val) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryPitchAngle: val });
    } else {
      onChangePitchAngle(val);
    }
  };

  const updateRotation = (val) => {
    if (isSecondary) {
      onUpdateSlide({ secondaryRotation: val });
    } else {
      if (onChangeRotation) onChangeRotation(val);
      else onUpdateSlide({ rotation: val });
    }
  };

  const handleSwapScreens = () => {
    onUpdateSlide({
      imageSrc: slide.secondaryImageSrc || null,
      secondaryImageSrc: slide.imageSrc || null,
      hasFrame: slide.secondaryHasFrame ?? slide.hasFrame ?? false,
      secondaryHasFrame: slide.hasFrame ?? false,
      deviceType: slide.secondaryDeviceType || (variant === 'dual_screen' ? 'apple-iphone-16-pro' : 'google-pixel-9'),
      secondaryDeviceType: slide.deviceType || (variant === 'dual_screen' ? 'google-pixel-9' : 'desktop-large'),
      deviceFinish: slide.secondaryDeviceFinish ?? slide.deviceFinish ?? 'natural_titanium',
      secondaryDeviceFinish: slide.deviceFinish || 'natural_titanium',
      frameGleam: slide.secondaryFrameGleam ?? slide.frameGleam ?? true,
      secondaryFrameGleam: slide.frameGleam ?? true,
      deviceCornerRadius: slide.secondaryDeviceCornerRadius ?? slide.deviceCornerRadius,
      secondaryDeviceCornerRadius: slide.deviceCornerRadius,
      shadowStyle: slide.secondaryShadowStyle || slide.shadowStyle || shadowStyle || 'dramatic',
      secondaryShadowStyle: slide.shadowStyle || shadowStyle || 'dramatic',
      shadowIntensity: slide.secondaryShadowIntensity ?? slide.shadowIntensity ?? shadowIntensity ?? 0.8,
      secondaryShadowIntensity: slide.shadowIntensity ?? shadowIntensity ?? 0.8,
      screenReflection: slide.secondaryScreenReflection ?? slide.screenReflection ?? screenReflection ?? true,
      secondaryScreenReflection: slide.screenReflection ?? screenReflection ?? true,
      deviceScale: slide.secondaryDeviceScale ?? slide.deviceScale ?? deviceScale ?? 1.0,
      secondaryDeviceScale: slide.deviceScale ?? deviceScale ?? 1.0,
      offsetX: slide.secondaryOffsetX ?? slide.offsetX ?? offsetX ?? 0,
      secondaryOffsetX: slide.offsetX ?? offsetX ?? 0,
      offsetY: slide.secondaryOffsetY ?? slide.offsetY ?? offsetY ?? 0,
      secondaryOffsetY: slide.offsetY ?? offsetY ?? 0,
      tilt: slide.secondaryTilt ?? slide.tilt ?? false,
      secondaryTilt: slide.tilt ?? false,
      tiltAngle: slide.secondaryTiltAngle ?? slide.tiltAngle ?? -8,
      secondaryTiltAngle: slide.tiltAngle ?? 8,
      pitchAngle: slide.secondaryPitchAngle ?? slide.pitchAngle ?? 4,
      secondaryPitchAngle: slide.pitchAngle ?? 4,
      rotation: slide.secondaryRotation ?? (variant === 'dual_screen' ? 3 : 0),
      secondaryRotation: slide.rotation ?? (variant === 'dual_screen' ? -3 : 0),
    });
  };

  return (
    <section className="space-y-4">
      {/* Active Template Context Pill */}
      <div className="px-3 py-1.5 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
          Active Layout:
        </span>
        <span className="text-xs font-bold text-indigo-300">
          {activeTemplate.label}
        </span>
      </div>

      {/* Multi-Device Screen Switcher (Dual Screen & Responsive Combo) */}
      {isMultiDeviceVariant && (
        <div className="space-y-1.5 p-2 rounded-xl bg-white/[0.02] border border-white/[0.08]">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Select Device to Customize:
            </span>
            <button
              type="button"
              onClick={handleSwapScreens}
              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 bg-white/[0.04] hover:bg-white/10 px-2 py-0.5 rounded border border-white/10 cursor-pointer transition-colors"
              title="Swap Screen 1 and Screen 2"
            >
              <ArrowLeftRight className="w-3 h-3 text-indigo-400" />
              <span>Swap Screens</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/50 rounded-lg border border-white/10">
            <button
              type="button"
              onClick={() => setActiveScreenIndex('primary')}
              className={`py-1.5 px-2 rounded-md font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer truncate ${
                !isSecondary
                  ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span>{variant === 'responsive_combo' ? '🖥️ Desktop' : '📱 Screen 1 (Left)'}</span>
              {slide.imageSrc && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
            </button>
            <button
              type="button"
              onClick={() => setActiveScreenIndex('secondary')}
              className={`py-1.5 px-2 rounded-md font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer truncate ${
                isSecondary
                  ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span>{variant === 'responsive_combo' ? '📱 Mobile' : '📱 Screen 2 (Right)'}</span>
              {slide.secondaryImageSrc && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
            </button>
          </div>
        </div>
      )}

      {/* Screenshot Upload Dropzone */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {isMultiDeviceVariant
              ? isSecondary
                ? (variant === 'responsive_combo' ? 'Mobile Screenshot (Secondary)' : 'Screen 2 Screenshot (Right)')
                : (variant === 'responsive_combo' ? 'Desktop Screenshot (Primary)' : 'Screen 1 Screenshot (Left)')
              : isDesktopVariant
              ? 'Desktop Screenshot'
              : 'Screenshot Media'}
          </span>
          {slide.imageSrc && !isSecondary && (
            <button
              onClick={handleMagicColor}
              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Auto-Color</span>
            </button>
          )}
        </div>

        {currentImageSrc ? (
          <div className="space-y-2">
            <div className="relative rounded-xl overflow-hidden border border-white/10 group bg-black/40">
              <img
                src={normalizeImageSrc(currentImageSrc)}
                alt="Uploaded"
                className="w-full h-28 object-contain bg-black/60 p-2"
              />
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    const trimmed = await autoTrimImage(currentImageSrc);
                    if (trimmed && trimmed !== currentImageSrc) {
                      onUpdateSlide(isSecondary ? { secondaryImageSrc: trimmed } : { imageSrc: trimmed });
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold cursor-pointer flex items-center gap-1 shadow"
                  title="Auto-crop transparent padding around screenshot"
                >
                  <Crop className="w-3 h-3" />
                  <span>Trim Margins</span>
                </button>
                <label className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer">
                  Replace
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, currentUploadKey)}
                  />
                </label>
                <button
                  onClick={() => onUpdateSlide(isSecondary ? { secondaryImageSrc: null } : { imageSrc: null })}
                  className="p-1.5 rounded-lg bg-rose-500/80 text-white hover:bg-rose-600 cursor-pointer"
                  title="Remove Screenshot"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {/* Quick Trim button always visible below thumbnail */}
            <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
              <span className="text-[10px]">Transparent margins?</span>
              <button
                type="button"
                onClick={async () => {
                  const trimmed = await autoTrimImage(currentImageSrc);
                  if (trimmed && trimmed !== currentImageSrc) {
                    onUpdateSlide(isSecondary ? { secondaryImageSrc: trimmed } : { imageSrc: trimmed });
                  }
                }}
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/20"
                title="Automatically crop transparent empty borders around screenshot"
              >
                <Crop className="w-3 h-3" />
                <span>Trim Transparent Padding</span>
              </button>
            </div>
            <input
              type="text"
              placeholder={`Or enter ${isSecondary ? '2nd ' : ''}local path / URL (e.g. /images/app.png)`}
              value={currentImageSrc && !currentImageSrc.startsWith('data:') ? currentImageSrc : ''}
              onChange={(e) =>
                onUpdateSlide(
                  isSecondary
                    ? { secondaryImageSrc: e.target.value.trim() || null }
                    : { imageSrc: e.target.value.trim() || null }
                )
              }
              className="w-full px-2.5 py-1 text-[11px] rounded-lg bg-black/40 border border-white/10 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <label className="border border-dashed border-white/15 hover:border-indigo-500/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <Upload className="w-5 h-5 text-slate-400 mb-1" />
              <span className="text-xs font-medium text-slate-300">
                Upload {isMultiDeviceVariant ? (isSecondary ? '2nd Screenshot' : '1st Screenshot') : 'Screenshot'}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">PNG, JPG, or WebP</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, currentUploadKey)}
              />
            </label>
            <input
              type="text"
              placeholder={`Or enter ${isSecondary ? '2nd ' : ''}local path / URL (e.g. /images/app.png)`}
              value=""
              onChange={(e) =>
                onUpdateSlide(
                  isSecondary
                    ? { secondaryImageSrc: e.target.value.trim() || null }
                    : { imageSrc: e.target.value.trim() || null }
                )
              }
              className="w-full px-2.5 py-1.5 text-[11px] rounded-lg bg-black/40 border border-white/10 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60"
            />
          </div>
        )}
      </div>

      {/* Frame Setup */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white block">
              {isMultiDeviceVariant
                ? isSecondary
                  ? (variant === 'responsive_combo' ? 'Mobile Has Frame?' : 'Screen 2 Has Frame?')
                  : (variant === 'responsive_combo' ? 'Desktop Has Frame?' : 'Screen 1 Has Frame?')
                : 'Image Has Frame?'}
            </span>
            <span className="text-[10px] text-slate-400">Prevents double bezel</span>
          </div>
          <input
            type="checkbox"
            checked={currentHasFrame}
            onChange={(e) => updateHasFrame(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 cursor-pointer"
          />
        </div>

        {!currentHasFrame && (
          <div className="pt-2 border-t border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Hardware Frame Model:
              </span>
              <span className="text-[10px] font-mono text-indigo-400 font-semibold">
                33 Specs
              </span>
            </div>

            {/* Full Device Specs Dropdown (33 Real Models) */}
            <select
              value={currentDeviceType}
              onChange={(e) => updateDeviceType(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <optgroup label="Special Frames">
                <option value="frameless">Clean Frameless Card</option>
              </optgroup>
              <optgroup label="Google Pixel (Real Specs)">
                <option value="google-pixel-9">Google Pixel 9 (2024)</option>
                <option value="google-pixel-10">Google Pixel 10 (2025)</option>
                <option value="google-pixel-10-pro-fold">Google Pixel 10 Pro Fold</option>
              </optgroup>
              <optgroup label="Apple iPhone (Real Specs)">
                <option value="apple-iphone-16-pro">iPhone 16 Pro (Titanium)</option>
                <option value="apple-iphone-16-pro-max">iPhone 16 Pro Max</option>
                <option value="apple-iphone-16">iPhone 16</option>
                <option value="apple-iphone-16-plus">iPhone 16 Plus</option>
                <option value="apple-iphone-17-pro">iPhone 17 Pro</option>
                <option value="apple-iphone-17-pro-max">iPhone 17 Pro Max</option>
                <option value="apple-iphone-17">iPhone 17</option>
                <option value="apple-iphone-17e">iPhone 17e</option>
                <option value="apple-iphone-air">iPhone Air (Ultra-thin)</option>
                <option value="apple-iphone-se-3">iPhone SE (3rd Gen)</option>
              </optgroup>
              <optgroup label="Samsung Galaxy (Real Specs)">
                <option value="samsung-galaxy-s25">Samsung Galaxy S25 (2025)</option>
                <option value="samsung-galaxy-s24">Samsung Galaxy S24</option>
                <option value="samsung-galaxy-z-fold-8">Galaxy Z Fold 8 (Foldable)</option>
                <option value="samsung-galaxy-z-fold-8-ultra">Galaxy Z Fold 8 Ultra</option>
                <option value="samsung-galaxy-z-flip-8">Galaxy Z Flip 8</option>
              </optgroup>
              <optgroup label="Tablets & iPads (Real Specs)">
                <option value="apple-ipad-pro-11-m4">iPad Pro 11" M4</option>
                <option value="apple-ipad-pro-13-m4">iPad Pro 13" M4</option>
                <option value="apple-ipad-air-11-m2">iPad Air 11" M2</option>
                <option value="apple-ipad-air-13-m2">iPad Air 13" M2</option>
                <option value="apple-ipad-mini">iPad mini</option>
                <option value="apple-ipad-10">iPad 10th Gen</option>
                <option value="samsung-galaxy-tab-s11">Samsung Galaxy Tab S11</option>
                <option value="samsung-galaxy-tab-s10-plus">Samsung Galaxy Tab S10+</option>
              </optgroup>
              <optgroup label="Desktop Windows (Real Specs)">
                <option value="desktop-large">macOS Desktop Window (Big Sur/Sequoia)</option>
                <option value="desktop-small">Windows Desktop Window</option>
              </optgroup>
            </select>

            {/* Quick Access Popular Model Badges */}
            <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-lg">
              {((isDesktopVariant || (!isSecondary && variant === 'responsive_combo')) ? [
                { id: 'desktop-large', label: 'macOS Window' },
                { id: 'desktop-small', label: 'Windows Window' },
                { id: 'frameless', label: 'Frameless' },
              ] : [
                { id: 'google-pixel-9', label: 'Pixel 9' },
                { id: 'apple-iphone-16-pro', label: 'iPhone 16 Pro' },
                { id: 'samsung-galaxy-s25', label: 'Galaxy S25' },
                { id: 'apple-ipad-pro-11-m4', label: 'iPad Pro' },
                { id: 'desktop-large', label: 'macOS Win' },
                { id: 'frameless', label: 'Frameless' },
              ]).map((dev) => (
                <button
                  key={dev.id}
                  onClick={() => updateDeviceType(dev.id)}
                  className={`py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer truncate px-1 ${
                    currentDeviceType === dev.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {dev.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Device Body Finish & Metallic Realism */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white block">
              {isMultiDeviceVariant
                ? isSecondary
                  ? (variant === 'responsive_combo' ? 'Mobile Body Finish' : 'Screen 2 Finish')
                  : (variant === 'responsive_combo' ? 'Desktop Body Finish' : 'Screen 1 Finish')
                : 'Device Body Finish'}
            </span>
            <span className="text-[10px] text-slate-400">
              {currentHasFrame
                ? 'In-built Image Frame Active'
                : currentFinish === 'none'
                ? 'Disabled (Original Stock)'
                : 'Titanium & Aluminum'}
            </span>
          </div>
          {!currentHasFrame && (
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                  currentFinish === 'none'
                    ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {currentFinish === 'none' ? 'OFF' : 'ON'}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (currentFinish === 'none') {
                    updateDeviceFinish('natural_titanium');
                  } else {
                    updateDeviceFinish('none');
                  }
                }}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  currentFinish === 'none' ? 'bg-slate-700' : 'bg-indigo-600'
                }`}
                title="Toggle Device Body Finish ON/OFF"
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    currentFinish === 'none' ? 'translate-x-0' : 'translate-x-4'
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        {/* When image has its own frame, finish swatches don't apply */}
        {currentHasFrame ? (
          <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-slate-300 flex items-start gap-2">
            <span className="text-sm">ℹ️</span>
            <div>
              <p className="font-semibold text-white text-[11px]">Image Already Has a Phone Frame</p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                The frame on your screen is part of your uploaded screenshot file. Studio finishes (Titanium/None) apply to studio hardware frames when "Image Has Frame?" is unchecked.
              </p>
            </div>
          </div>
        ) : (
          /* Realistic Metallic Finishes + None Option */
          <div className="grid grid-cols-2 gap-1.5">
            {/* Dedicated "None / Stock" button */}
            <button
              type="button"
              onClick={() => updateDeviceFinish('none')}
              className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all cursor-pointer col-span-2 ${
                currentFinish === 'none'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/50'
                  : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
              }`}
            >
              <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border border-dashed border-white/40 text-[10px] font-mono text-slate-400 bg-white/[0.05]">
                ∅
              </span>
              <div className="flex-1 min-w-0 flex items-center justify-between">
                <span className="text-[11px] font-semibold truncate leading-none">
                  None (Original Stock Frame)
                </span>
                {currentFinish === 'none' && (
                  <span className="text-[9px] font-mono uppercase bg-indigo-500/30 text-indigo-300 px-1 py-0.5 rounded">
                    Active
                  </span>
                )}
              </div>
            </button>

            {DEVICE_FINISHES.map((fin) => {
              const isSelected = currentFinish !== 'none' && currentFinish === fin.id;
              return (
                <button
                  key={fin.id}
                  type="button"
                  onClick={() => updateDeviceFinish(fin.id)}
                  className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/50'
                      : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.05] hover:border-white/10'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0 shadow-inner border border-white/20"
                    style={{ background: fin.gradient }}
                  />
                  <span className="text-[11px] font-semibold truncate leading-none">
                    {fin.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Specular Rim Gleam & Screen Corner Radius */}
        <div className="pt-2 border-t border-white/[0.06] space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-300 block">
                {isMultiDeviceVariant
                  ? isSecondary
                    ? (variant === 'responsive_combo' ? 'Mobile Rim Gleam' : 'Screen 2 Rim Gleam')
                    : (variant === 'responsive_combo' ? 'Desktop Rim Gleam' : 'Screen 1 Rim Gleam')
                  : 'Specular Rim Gleam'}
              </span>
              <span className="text-[10px] text-slate-500">Metallic edge light reflection</span>
            </div>
            <input
              type="checkbox"
              checked={currentFrameGleam !== false}
              onChange={(e) => updateFrameGleam(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">
                {isMultiDeviceVariant
                  ? isSecondary
                    ? (variant === 'responsive_combo' ? 'Mobile Corner Radius' : 'Screen 2 Corner Radius')
                    : (variant === 'responsive_combo' ? 'Desktop Corner Radius' : 'Screen 1 Corner Radius')
                  : 'Screen Corner Radius'}
              </span>
              <span className="text-indigo-400 font-mono">
                {currentCornerRadius}px
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="54"
              step="2"
              value={currentCornerRadius}
              onChange={(e) => updateCornerRadius(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Swap Layout Alignment (for Hero Cover and Feature Deep-Dive) */}
      {(variant === 'hero_cover' || variant === 'feature_deep_dive') && (
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white block">Layout Alignment</span>
            <span className="text-[10px] text-slate-400">
              {(slide.layoutAlign || 'left') === 'left'
                ? variant === 'hero_cover'
                  ? 'Text Left ⇄ Mockup Right'
                  : 'Mockup Left ⇄ Features Right'
                : variant === 'hero_cover'
                  ? 'Mockup Left ⇄ Text Right'
                  : 'Features Left ⇄ Mockup Right'}
            </span>
          </div>
          <button
            onClick={() =>
              onUpdateSlide({
                layoutAlign: (slide.layoutAlign || 'left') === 'left' ? 'right' : 'left',
              })
            }
            className="px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Swap Sides</span>
          </button>
        </div>
      )}

      {/* 3D Isometric Tilt Controls (Universal to all layouts & individual per image) */}
      {showTiltControls && (
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">
                {isMultiDeviceVariant
                  ? isSecondary
                    ? (variant === 'responsive_combo' ? 'Mobile 3D Isometric Tilt' : 'Screen 2 3D Isometric Tilt')
                    : (variant === 'responsive_combo' ? 'Desktop 3D Isometric Tilt' : 'Screen 1 3D Isometric Tilt')
                  : '3D Isometric Tilt'}
              </span>
              <span className="text-[10px] text-slate-400">
                {isMultiDeviceVariant
                  ? `Perspective 3D angle for ${isSecondary ? 'device 2' : 'device 1'}`
                  : 'Perspective 3D angle'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={currentTilt}
              onChange={(e) => updateTilt(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 cursor-pointer"
            />
          </div>

          {currentTilt && (
            <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Tilt Angle (Y)</span>
                  <span className="text-indigo-400 font-mono">{currentTiltAngle}°</span>
                </div>
                <input
                  type="range"
                  min="-25"
                  max="25"
                  step="1"
                  value={currentTiltAngle}
                  onChange={(e) => updateTiltAngle(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Pitch Angle (X)</span>
                  <span className="text-indigo-400 font-mono">{currentPitchAngle}°</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  step="1"
                  value={currentPitchAngle}
                  onChange={(e) => updatePitchAngle(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Shadows & Screen Reflection */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <div>
          <span className="text-xs font-semibold text-white block mb-1.5">
            {isMultiDeviceVariant
              ? isSecondary
                ? (variant === 'responsive_combo' ? 'Mobile Shadow Style' : 'Screen 2 Shadow Style')
                : (variant === 'responsive_combo' ? 'Desktop Shadow Style' : 'Screen 1 Shadow Style')
              : 'Device Shadow Style'}
          </span>
          <div className="grid grid-cols-4 gap-1">
            {[
              { id: 'dramatic', label: 'Dramatic' },
              { id: 'soft', label: 'Soft' },
              { id: 'neon', label: 'Neon' },
              { id: 'none', label: 'None' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => updateShadowStyle(s.id)}
                className={`py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  currentShadowStyle === s.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/[0.02] text-slate-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {currentShadowStyle !== 'none' && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">
                {isMultiDeviceVariant
                  ? isSecondary
                    ? 'Screen 2 Shadow Darkness'
                    : 'Screen 1 Shadow Darkness'
                  : 'Shadow Darkness'}
              </span>
              <span className="text-indigo-400 font-mono">{Math.round(currentShadowIntensity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1"
              step="0.05"
              value={currentShadowIntensity}
              onChange={(e) => updateShadowIntensity(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <div>
            <span className="text-xs text-slate-300 block">
              {isMultiDeviceVariant
                ? isSecondary
                  ? (variant === 'responsive_combo' ? 'Mobile Glass Streak' : 'Screen 2 Glass Streak')
                  : (variant === 'responsive_combo' ? 'Desktop Glass Streak' : 'Screen 1 Glass Streak')
                : 'Screen Glass Streak (Reflection)'}
            </span>
            <span className="text-[10px] text-slate-500">Diagonal realistic glass sheen & glare</span>
          </div>
          <input
            type="checkbox"
            checked={currentScreenReflection !== false}
            onChange={(e) => updateScreenReflection(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 cursor-pointer"
          />
        </div>
      </div>

      {/* Preset Dimension Auto-Fit (Upwork / Fiverr / Personal) */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-white block">Preset Dimension Auto-Fit</span>
          <span className="text-[10px] text-slate-400">
            {slide.deviceAutoFit !== false
              ? 'Auto-scales device height & width for Upwork, Fiverr & Personal presets'
              : 'Fixed 100% device scale regardless of preset'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onUpdateSlide({ deviceAutoFit: slide.deviceAutoFit === false ? true : false })}
          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 ${
            slide.deviceAutoFit !== false ? 'bg-indigo-600' : 'bg-white/10'
          }`}
          title="Toggle Preset Dimension Auto-Fit"
        >
          <span
            className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
              slide.deviceAutoFit !== false ? 'transform translate-x-5' : ''
            }`}
          />
        </button>
      </div>

      {/* Device Position & Zoom Scale */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400 font-medium">
              {isMultiDeviceVariant
                ? isSecondary
                  ? (variant === 'responsive_combo' ? 'Mobile Zoom Scale' : 'Screen 2 Zoom Scale')
                  : (variant === 'responsive_combo' ? 'Desktop Zoom Scale' : 'Screen 1 Zoom Scale')
                : 'Device Zoom Scale'}
            </span>
            <span className="text-indigo-400 font-mono">{Math.round(currentDeviceScale * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.4"
            step="0.05"
            value={currentDeviceScale}
            onChange={(e) => updateDeviceScale(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* 2D Device Rotation */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400 font-medium">
              {isMultiDeviceVariant
                ? isSecondary
                  ? (variant === 'responsive_combo' ? 'Mobile Rotation' : 'Screen 2 Rotation')
                  : (variant === 'responsive_combo' ? 'Desktop Rotation' : 'Screen 1 Rotation')
                : 'Device Rotation'}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-indigo-400 font-mono text-xs">{currentRotation}°</span>
              {currentRotation !== 0 && (
                <button
                  type="button"
                  onClick={() => updateRotation(0)}
                  className="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                  title="Reset rotation to 0°"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
          <input
            type="range"
            min="-90"
            max="90"
            step="1"
            value={currentRotation}
            onChange={(e) => updateRotation(parseInt(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-500 mt-0.5">
            <span>-90° (Left)</span>
            <span>0° (Straight)</span>
            <span>+90° (Right)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">
                {isMultiDeviceVariant ? (isSecondary ? 'Screen 2 Offset X' : 'Screen 1 Offset X') : 'Offset X'}
              </span>
              <span className="text-indigo-400 font-mono">{currentOffsetX}px</span>
            </div>
            <input
              type="range"
              min="-80"
              max="80"
              step="5"
              value={currentOffsetX}
              onChange={(e) => updateOffsetX(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">
                {isMultiDeviceVariant ? (isSecondary ? 'Screen 2 Offset Y' : 'Screen 1 Offset Y') : 'Offset Y'}
              </span>
              <span className="text-indigo-400 font-mono">{currentOffsetY}px</span>
            </div>
            <input
              type="range"
              min="-80"
              max="80"
              step="5"
              value={currentOffsetY}
              onChange={(e) => updateOffsetY(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
