import React from 'react';
import { TEXT_GRADIENTS, SOLID_COLOR_SWATCHES } from '../../data/typographyPresets';

const QUICK_ANGLES = [
  { label: '0° ↑', angle: 0 },
  { label: '45° ↗', angle: 45 },
  { label: '90° →', angle: 90 },
  { label: '135° ↘', angle: 135 },
  { label: '180° ↓', angle: 180 },
];

export default function GradientColorPicker({
  label = 'Color Style',
  gradientMode, // 'metallic' | 'cyber' | ... | 'custom' | 'solid' | 'none'
  onChangeGradientMode,
  solidColor = '#ffffff',
  onChangeSolidColor,
  customFrom = '#ffffff',
  onChangeCustomFrom,
  customTo = '#818cf8',
  onChangeCustomTo,
  customAngle = 90,
  onChangeCustomAngle,
  defaultGradientPreset = 'metallic',
}) {
  const isSolid = gradientMode === 'solid' || gradientMode === 'none' || !gradientMode;
  const isCustomGradient = gradientMode === 'custom';

  const currentCustomGradientCss = `linear-gradient(${customAngle}deg, ${customFrom} 0%, ${customTo} 100%)`;

  return (
    <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
      {/* Header & Mode Switch */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
          {label}
        </span>
        <div className="inline-flex rounded-lg bg-black/40 p-0.5 border border-white/10">
          <button
            type="button"
            onClick={() => {
              if (isSolid) {
                onChangeGradientMode(defaultGradientPreset);
              }
            }}
            className={`px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
              !isSolid
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ✨ Gradient
          </button>
          <button
            type="button"
            onClick={() => onChangeGradientMode('solid')}
            className={`px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
              isSolid
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🎨 Solid Color
          </button>
        </div>
      </div>

      {/* Mode 1: Gradient Presets & Custom Builder */}
      {!isSolid ? (
        <div className="space-y-2.5">
          {/* Gradient Cards Grid */}
          <div className="grid grid-cols-2 gap-1.5">
            {Object.values(TEXT_GRADIENTS)
              .filter((g) => g.id !== 'solid')
              .map((g) => {
                const isSel = gradientMode === g.id;
                const previewBg = g.id === 'custom' ? currentCustomGradientCss : g.preview;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => onChangeGradientMode(g.id)}
                    className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2 ${
                      isSel
                        ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/40 shadow-sm'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-md flex-shrink-0 border border-white/20 shadow-sm"
                      style={{ background: previewBg }}
                    />
                    <span className="text-[11px] font-medium truncate">{g.label}</span>
                  </button>
                );
              })}
          </div>

          {/* Custom Gradient Builder (Shown when 'custom' is active or user wants custom) */}
          {isCustomGradient && (
            <div className="p-2.5 rounded-xl bg-black/40 border border-indigo-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                  Custom 2-Color Gradient
                </span>
                <span className="text-[10px] font-mono text-slate-400">{customAngle}°</span>
              </div>

              {/* Gradient Preview Strip */}
              <div
                className="w-full h-5 rounded-lg border border-white/20 shadow-inner"
                style={{ background: currentCustomGradientCss }}
              />

              {/* Color Stops Pickers */}
              <div className="grid grid-cols-2 gap-2">
                {/* Color From */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block">Start Color</span>
                  <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-lg border border-white/10">
                    <input
                      type="color"
                      value={customFrom || '#ffffff'}
                      onChange={(e) => onChangeCustomFrom(e.target.value)}
                      className="w-5 h-5 rounded bg-transparent border-0 cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      value={customFrom || '#ffffff'}
                      onChange={(e) => onChangeCustomFrom(e.target.value)}
                      className="w-full text-[10px] font-mono bg-transparent text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Color To */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block">End Color</span>
                  <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-lg border border-white/10">
                    <input
                      type="color"
                      value={customTo || '#818cf8'}
                      onChange={(e) => onChangeCustomTo(e.target.value)}
                      className="w-5 h-5 rounded bg-transparent border-0 cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      value={customTo || '#818cf8'}
                      onChange={(e) => onChangeCustomTo(e.target.value)}
                      className="w-full text-[10px] font-mono bg-transparent text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Gradient Angle Slider & Quick Angle Presets */}
              <div className="space-y-1.5 pt-1 border-t border-white/[0.06]">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400">Direction Angle</span>
                  <span className="text-indigo-400 font-mono font-medium">{customAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={customAngle}
                  onChange={(e) => onChangeCustomAngle(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-1.5"
                />

                <div className="flex items-center justify-between gap-1 pt-0.5">
                  {QUICK_ANGLES.map((qa) => (
                    <button
                      key={qa.angle}
                      type="button"
                      onClick={() => onChangeCustomAngle(qa.angle)}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition-all cursor-pointer ${
                        customAngle === qa.angle
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-white/[0.04] text-slate-400 hover:text-white'
                      }`}
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Mode 2: Solid Color Swatches & Hex Input */
        <div className="space-y-2">
          {/* Swatches Palette */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {SOLID_COLOR_SWATCHES.map((swatch) => (
              <button
                key={swatch.color}
                type="button"
                onClick={() => {
                  onChangeGradientMode('solid');
                  onChangeSolidColor(swatch.color);
                }}
                className={`w-5 h-5 rounded-md border transition-all cursor-pointer relative ${
                  solidColor.toLowerCase() === swatch.color.toLowerCase()
                    ? 'ring-2 ring-indigo-500 scale-110 border-white shadow-sm'
                    : 'border-white/20 hover:scale-105'
                }`}
                style={{ backgroundColor: swatch.color }}
                title={swatch.name}
              />
            ))}
          </div>

          {/* Custom Hex Color Picker */}
          <div className="flex items-center gap-2 pt-1">
            <div className="relative flex items-center">
              <input
                type="color"
                value={solidColor || '#ffffff'}
                onChange={(e) => {
                  onChangeGradientMode('solid');
                  onChangeSolidColor(e.target.value);
                }}
                className="w-6 h-6 rounded-md bg-transparent border border-white/20 cursor-pointer p-0.5"
              />
            </div>
            <input
              type="text"
              value={solidColor || '#ffffff'}
              onChange={(e) => {
                onChangeGradientMode('solid');
                onChangeSolidColor(e.target.value);
              }}
              className="w-24 px-2 py-1 text-[11px] font-mono rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
              placeholder="#ffffff"
            />
            <span className="text-[10px] text-slate-400">Custom Hex Code</span>
          </div>
        </div>
      )}
    </div>
  );
}
