import React from 'react';
import { Sliders, ArrowLeftRight, Maximize2, Scale, Sparkles } from 'lucide-react';
import { VARIANTS } from './inspectorConstants';

export default function TemplateTab({ slide, onUpdateSlide }) {
  const currentVariant = slide.variant || 'hero_cover';
  const layoutSplit = slide.layoutSplit ?? 48;
  const isReversed = slide.layoutAlign === 'right';
  const autoScaleEnabled = slide.autoScaleEnabled !== false;
  const autoScaleIntensity = slide.autoScaleIntensity ?? 1.0;
  const deviceAutoFit = slide.deviceAutoFit !== false;

  const supportsSplit = currentVariant === 'hero_cover' || currentVariant === 'feature_deep_dive';

  return (
    <section className="space-y-5">
      {/* 1. Slide Layout Template Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Slide Layout Template
          </span>
          <span className="text-[10px] text-indigo-400 font-medium">6 Variants</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-snug">
          Choose the composition structure for this slide
        </p>

        <div className="grid grid-cols-1 gap-2 pt-1">
          {VARIANTS.map((v) => {
            const isSelected = currentVariant === v.id;
            return (
              <button
                key={v.id}
                onClick={() => onUpdateSlide({ variant: v.id })}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500 text-white ring-1 ring-indigo-500/40 shadow-lg'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06] text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{v.label}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{v.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Layout Balance & Split Ratio (Text vs Device Space) */}
      {supportsSplit && (
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Layout Split & Balance
              </span>
            </div>
            <span className="text-[11px] font-mono font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
              {layoutSplit}% Text / {100 - layoutSplit}% Device
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-snug">
            Control the column width ratio between Headline/Content and Mockup.
          </p>

          {/* Quick Split Pills */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[
              { label: '35 / 65', desc: 'Focus Device', split: 35 },
              { label: '48 / 52', desc: 'Balanced', split: 48 },
              { label: '60 / 40', desc: 'Focus Content', split: 60 },
            ].map((preset) => (
              <button
                key={preset.split}
                type="button"
                onClick={() => onUpdateSlide({ layoutSplit: preset.split })}
                className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer border ${
                  layoutSplit === preset.split
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                    : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <div className="text-[11px] font-bold">{preset.label}</div>
                <div className="text-[9px] text-slate-400 truncate">{preset.desc}</div>
              </button>
            ))}
          </div>

          {/* Continuous Split Slider */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Text Width: {layoutSplit}%</span>
              <span>Device Width: {100 - layoutSplit}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={70}
              step={1}
              value={layoutSplit}
              onChange={(e) => onUpdateSlide({ layoutSplit: parseInt(e.target.value, 10) })}
              className="w-full accent-indigo-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>

          {/* Swap Sides (Reverse Left/Right) */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">Swap Side (Flip Columns)</span>
            <button
              type="button"
              onClick={() => onUpdateSlide({ layoutAlign: isReversed ? 'left' : 'right' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                isReversed
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>{isReversed ? 'Reversed (Right)' : 'Standard (Left)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Automatic Sizing & Resolution Adaptation */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Automatic Size Adaptation
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            Smart Fit
          </span>
        </div>

        <p className="text-[11px] text-slate-400 leading-snug">
          Customize how text and device sizes adapt when you change canvas resolutions (Fiverr, Upwork, 4:3, 16:9).
        </p>

        {/* Auto-Scale Toggle */}
        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-200">
              Auto-Scale Text & Elements
            </div>
            <div className="text-[10px] text-slate-400">
              {autoScaleEnabled
                ? 'Sizes scale proportionally to canvas resolution'
                : 'Exact fixed font & element sizes (No auto-scaling)'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onUpdateSlide({ autoScaleEnabled: !autoScaleEnabled })}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 ${
              autoScaleEnabled ? 'bg-indigo-600' : 'bg-white/10'
            }`}
          >
            <span
              className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                autoScaleEnabled ? 'transform translate-x-5' : ''
              }`}
            />
          </button>
        </div>

        {/* Auto-Scale Sensitivity / Intensity (Only when enabled) */}
        {autoScaleEnabled && (
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Auto-Scale Intensity</span>
              <span className="font-mono text-indigo-400 text-[11px] font-semibold">
                {Math.round(autoScaleIntensity * 100)}%
                {autoScaleIntensity === 1 && ' (Full)'}
                {autoScaleIntensity === 0.5 && ' (Subtle)'}
                {autoScaleIntensity === 0 && ' (None)'}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={autoScaleIntensity}
              onChange={(e) => onUpdateSlide({ autoScaleIntensity: parseFloat(e.target.value) })}
              className="w-full accent-indigo-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
              <span>0% (Locked size)</span>
              <span>50% (Subtle)</span>
              <span>100% (Full Auto)</span>
            </div>
          </div>
        )}

        {/* Device Auto-Fit Bounds */}
        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-200">
              Device Height Auto-Fit
            </div>
            <div className="text-[10px] text-slate-400">
              {deviceAutoFit
                ? 'Auto-shrinks device on low-height canvas to prevent cut-off'
                : 'Maintains exact device scale regardless of canvas height'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onUpdateSlide({ deviceAutoFit: !deviceAutoFit })}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 ${
              deviceAutoFit ? 'bg-indigo-600' : 'bg-white/10'
            }`}
          >
            <span
              className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                deviceAutoFit ? 'transform translate-x-5' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
