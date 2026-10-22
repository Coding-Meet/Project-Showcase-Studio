import React from 'react';
import { Upload, Sparkles, X, ArrowLeftRight, Shield } from 'lucide-react';
import { normalizeImageSrc } from '../DeviceMockup';
import { VARIANTS, DEVICE_FINISHES } from './inspectorConstants';

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
  offsetX,
  onChangeOffsetX,
  offsetY,
  onChangeOffsetY,
}) {
  const variant = slide.variant || 'hero_cover';
  const activeTemplate = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];
  const showTiltControls = variant === 'hero_cover';
  const isDesktopVariant = variant === 'desktop_dashboard';

  const currentDeviceType =
    slide.deviceType === 'android' ? 'google-pixel-9'
    : slide.deviceType === 'iphone' ? 'apple-iphone-16-pro'
    : slide.deviceType === 'desktop' ? 'desktop-large'
    : slide.deviceType === 'tablet' ? 'apple-ipad-pro-11-m4'
    : (slide.deviceType || (isDesktopVariant ? 'desktop-large' : 'google-pixel-9'));

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

      {/* Screenshot Upload Dropzone */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {isDesktopVariant ? 'Desktop Screenshot' : 'Screenshot Media'}
          </span>
          {slide.imageSrc && (
            <button
              onClick={handleMagicColor}
              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Auto-Color</span>
            </button>
          )}
        </div>

        {slide.imageSrc ? (
          <div className="relative rounded-xl overflow-hidden border border-white/10 group bg-black/40">
            <img
              src={normalizeImageSrc(slide.imageSrc)}
              alt="Uploaded"
              className="w-full h-28 object-contain bg-black/60 p-2"
            />
            <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <label className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-semibold cursor-pointer">
                Replace
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'imageSrc')}
                />
              </label>
              <button
                onClick={() => onUpdateSlide({ imageSrc: null })}
                className="p-1.5 rounded-lg bg-rose-500/80 text-white hover:bg-rose-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="border border-dashed border-white/15 hover:border-indigo-500/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <Upload className="w-5 h-5 text-slate-400 mb-1" />
              <span className="text-xs font-medium text-slate-300">Upload Screenshot</span>
              <span className="text-[10px] text-slate-500 mt-0.5">PNG, JPG, or WebP</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'imageSrc')}
              />
            </label>
            <input
              type="text"
              placeholder="Or enter local path / URL (e.g. /images/app.png)"
              value={slide.imageSrc && !slide.imageSrc.startsWith('data:') ? slide.imageSrc : ''}
              onChange={(e) => onUpdateSlide({ imageSrc: e.target.value.trim() || null })}
              className="w-full px-2.5 py-1.5 text-[11px] rounded-lg bg-black/40 border border-white/10 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60"
            />
          </div>
        )}

        {/* Secondary Upload for Dual Screen */}
        {isMultiDeviceVariant && (
          <div className="space-y-1.5 pt-1">
            <label className="border border-dashed border-white/10 hover:border-indigo-500/50 rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer bg-white/[0.01]">
              <Upload className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-300">
                {slide.secondaryImageSrc ? 'Replace 2nd Screen' : '+ Add 2nd Screenshot'}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'secondaryImageSrc')}
              />
            </label>
            <input
              type="text"
              placeholder="2nd image path / URL (optional)"
              value={slide.secondaryImageSrc && !slide.secondaryImageSrc.startsWith('data:') ? slide.secondaryImageSrc : ''}
              onChange={(e) => onUpdateSlide({ secondaryImageSrc: e.target.value.trim() || null })}
              className="w-full px-2.5 py-1 text-[11px] rounded-lg bg-black/40 border border-white/10 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60"
            />
          </div>
        )}
      </div>

      {/* Frame Setup */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white block">Image Has Frame?</span>
            <span className="text-[10px] text-slate-400">Prevents double bezel</span>
          </div>
          <input
            type="checkbox"
            checked={slide.hasFrame || false}
            onChange={(e) => onUpdateSlide({ hasFrame: e.target.checked })}
            className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 cursor-pointer"
          />
        </div>

        {!slide.hasFrame && (
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
              onChange={(e) => onUpdateSlide({ deviceType: e.target.value })}
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
              {(isDesktopVariant ? [
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
                  onClick={() => onUpdateSlide({ deviceType: dev.id })}
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
          <span className="text-xs font-semibold text-white block">
            Device Body Finish
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Titanium & Aluminum
          </span>
        </div>

        {/* 10 Realistic Metallic Finishes */}
        <div className="grid grid-cols-2 gap-1.5">
          {DEVICE_FINISHES.map((fin) => {
            const isSelected = (slide.deviceFinish || 'natural_titanium') === fin.id;
            return (
              <button
                key={fin.id}
                onClick={() => onUpdateSlide({ deviceFinish: fin.id })}
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

        {/* Specular Rim Gleam & Screen Corner Radius */}
        <div className="pt-2 border-t border-white/[0.06] space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-300 block">Specular Rim Gleam</span>
              <span className="text-[10px] text-slate-500">Metallic edge light reflection</span>
            </div>
            <input
              type="checkbox"
              checked={slide.frameGleam !== false}
              onChange={(e) => onUpdateSlide({ frameGleam: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Screen Corner Radius</span>
              <span className="text-indigo-400 font-mono">
                {slide.deviceCornerRadius || (isDesktopVariant ? 12 : 36)}px
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="54"
              step="2"
              value={slide.deviceCornerRadius || (isDesktopVariant ? 12 : 36)}
              onChange={(e) => onUpdateSlide({ deviceCornerRadius: parseInt(e.target.value) })}
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

      {/* 3D Isometric Tilt Controls (Exclusive to Hero Cover) */}
      {showTiltControls && (
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">3D Isometric Tilt</span>
              <span className="text-[10px] text-slate-400">Perspective 3D angle</span>
            </div>
            <input
              type="checkbox"
              checked={tilt}
              onChange={(e) => onChangeTilt(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 cursor-pointer"
            />
          </div>

          {tilt && (
            <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Tilt Angle (Y)</span>
                  <span className="text-indigo-400 font-mono">{tiltAngle}°</span>
                </div>
                <input
                  type="range"
                  min="-25"
                  max="25"
                  step="1"
                  value={tiltAngle}
                  onChange={(e) => onChangeTiltAngle(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Pitch Angle (X)</span>
                  <span className="text-indigo-400 font-mono">{pitchAngle}°</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  step="1"
                  value={pitchAngle}
                  onChange={(e) => onChangePitchAngle(parseInt(e.target.value))}
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
            Device Shadow Style
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
                onClick={() => onChangeShadowStyle(s.id)}
                className={`py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  shadowStyle === s.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/[0.02] text-slate-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {shadowStyle !== 'none' && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Shadow Darkness</span>
              <span className="text-indigo-400 font-mono">{Math.round(shadowIntensity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1"
              step="0.05"
              value={shadowIntensity}
              onChange={(e) => onChangeShadowIntensity(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <span className="text-xs text-slate-300">Screen Gloss Streak</span>
          <input
            type="checkbox"
            checked={screenReflection}
            onChange={(e) => onChangeScreenReflection(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 cursor-pointer"
          />
        </div>
      </div>

      {/* Device Position & Zoom Scale */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400 font-medium">Device Zoom Scale</span>
            <span className="text-indigo-400 font-mono">{Math.round(deviceScale * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.4"
            step="0.05"
            value={deviceScale}
            onChange={(e) => onChangeDeviceScale(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Offset X</span>
              <span className="text-indigo-400 font-mono">{offsetX}px</span>
            </div>
            <input
              type="range"
              min="-80"
              max="80"
              step="5"
              value={offsetX}
              onChange={(e) => onChangeOffsetX(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Offset Y</span>
              <span className="text-indigo-400 font-mono">{offsetY}px</span>
            </div>
            <input
              type="range"
              min="-80"
              max="80"
              step="5"
              value={offsetY}
              onChange={(e) => onChangeOffsetY(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
