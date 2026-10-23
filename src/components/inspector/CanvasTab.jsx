import React from 'react';
import { Upload, Download, Sparkles, Sliders, HardDrive, FileImage, Crosshair } from 'lucide-react';
import { BG_VARIANTS, COLOR_PRESETS } from './inspectorConstants';
import { PRESETS } from '../CanvasStage';
import { estimateImageFileSize } from '../../utils/exportEngine';

export default function CanvasTab({
  backgroundVariant,
  onChangeBackgroundVariant,
  bgAlignment,
  onChangeBgAlignment,
  customBgImage,
  onChangeCustomBgImage,
  backgroundColor,
  onChangeBackgroundColor,
  accentColor,
  onChangeAccentColor,
  glowIntensity,
  onChangeGlowIntensity,
  textureOverlay,
  onChangeTextureOverlay,
  textureOpacity = 0.20,
  onChangeTextureOpacity,
  canvasRadius,
  onChangeCanvasRadius,
  exportScale = 2,
  onChangeExportScale,
  exportQuality = 1.0,
  onChangeExportQuality,
  exportFormat = 'png',
  onChangeExportFormat,
  presetKey = 'WEBSITE_HD',
  showCenterGuides = false,
  onToggleCenterGuides,
}) {
  const currentPreset = (presetKey && PRESETS[presetKey]) || (presetKey && PRESETS[presetKey.toUpperCase()]) || PRESETS.WEBSITE_HD;
  const baseW = currentPreset?.width || 1920;
  const baseH = currentPreset?.height || 1080;
  const calculatedW = baseW * exportScale;
  const calculatedH = baseH * exportScale;
  const estimatedSize = estimateImageFileSize(calculatedW, calculatedH, exportFormat, exportQuality);
  const megaPixels = ((calculatedW * calculatedH) / 1000000).toFixed(1);

  return (
    <section className="space-y-4">
      {/* Background Lighting Styles */}
      <div>
        <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
          Background Lighting
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {BG_VARIANTS.map((bg) => {
            const isSelected = backgroundVariant === bg.id;
            return (
              <button
                key={bg.id}
                onClick={() => onChangeBackgroundVariant(bg.id)}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/30'
                    : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold">{bg.label}</div>
                <div className="text-[10px] text-slate-400 truncate">{bg.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Background Focus Alignment */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Lighting Alignment
          </span>
          <button
            onClick={() => onChangeBgAlignment('behind_device')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
              bgAlignment === 'behind_device'
                ? 'bg-indigo-600 text-white shadow-md ring-1 ring-white/20'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
            }`}
            title="Automatically align lighting glow behind the device based on layout"
          >
            Behind Device (Auto)
          </button>
        </div>

        {/* 3x3 Directional Grid */}
        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          {[
            { id: 'top_left', label: 'Top-Left' },
            { id: 'top_center', label: 'Top-Center' },
            { id: 'top_right', label: 'Top-Right' },
            { id: 'center_left', label: 'Center-Left' },
            { id: 'center', label: 'Center' },
            { id: 'center_right', label: 'Center-Right' },
            { id: 'bottom_left', label: 'Bottom-Left' },
            { id: 'bottom_center', label: 'Bottom-Center' },
            { id: 'bottom_right', label: 'Bottom-Right' },
          ].map((pos) => (
            <button
              key={pos.id}
              onClick={() => onChangeBgAlignment(pos.id)}
              className={`py-2 px-1 rounded-lg text-[10px] font-semibold text-center transition-all cursor-pointer ${
                bgAlignment === pos.id
                  ? 'bg-indigo-600 text-white shadow-md ring-1 ring-white/20'
                  : 'bg-white/[0.02] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {pos.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Background Wallpaper Upload */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
        <span className="text-xs font-bold text-white uppercase tracking-wider block">
          Custom Background Image
        </span>
        {customBgImage ? (
          <div className="relative rounded-xl overflow-hidden border border-white/10 group">
            <img
              src={customBgImage}
              alt="Custom BG"
              className="w-full h-16 object-cover"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => onChangeCustomBgImage(null)}
                className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-semibold cursor-pointer"
              >
                Remove Wallpaper
              </button>
            </div>
          </div>
        ) : (
          <label className="border border-dashed border-white/15 hover:border-indigo-500/50 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer bg-white/[0.01]">
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-300">Upload Wallpaper / Texture</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => onChangeCustomBgImage(event.target.result);
                reader.readAsDataURL(file);
              }}
            />
          </label>
        )}
      </div>

      {/* Atmosphere Presets */}
      <div className="pt-2 border-t border-white/[0.06]">
        <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
          Curated Color Themes
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {COLOR_PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                onChangeBackgroundColor(p.bg);
                onChangeAccentColor(p.accent);
              }}
              className="p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer"
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: p.accent }}
              />
              <span className="text-[11px] truncate">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hex Color Controls */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-slate-300 font-medium">Glow Accent</span>
          <input
            type="color"
            value={accentColor}
            onChange={(e) => onChangeAccentColor(e.target.value)}
            className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
          />
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-slate-300 font-medium">Base Color</span>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => onChangeBackgroundColor(e.target.value)}
            className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
          />
        </div>
      </div>

      {/* Glow Intensity Slider */}
      <div>
        <div className="flex justify-between text-xs mb-1 font-medium">
          <span className="text-slate-300">Glow Brightness</span>
          <span className="text-indigo-400 font-mono">{Math.round(glowIntensity * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="0.8"
          step="0.05"
          value={glowIntensity}
          onChange={(e) => onChangeGlowIntensity(parseFloat(e.target.value))}
          className="w-full accent-indigo-500 cursor-pointer"
        />
      </div>

      {/* Textures & Corner Radius */}
      <div className="space-y-3 pt-2 border-t border-white/[0.06]">
        <span className="text-xs font-bold text-white uppercase tracking-wider block">
          Texture & Frame Style
        </span>

        <div>
          <label className="text-[11px] text-slate-400 mb-1.5 block">Texture Pattern</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'dots', label: 'Dot Matrix' },
              { id: 'grid', label: 'Blueprint Grid' },
              { id: 'plus', label: 'Crosshairs' },
              { id: 'isometric', label: 'Isometric 3D' },
              { id: 'diagonal', label: 'Carbon Mesh' },
              { id: 'honeycomb', label: 'Honeycomb' },
              { id: 'topography', label: 'Topography' },
              { id: 'noise', label: 'Film Grain' },
              { id: 'none', label: 'None' },
            ].map((tex) => (
              <button
                key={tex.id}
                onClick={() => onChangeTextureOverlay(tex.id)}
                className={`py-2 px-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer text-center truncate ${
                  textureOverlay === tex.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-white/20'
                    : 'bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.07]'
                }`}
                title={tex.label}
              >
                {tex.label}
              </button>
            ))}
          </div>
        </div>

        {textureOverlay !== 'none' && onChangeTextureOpacity && (
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium">
              <span className="text-slate-300">Texture Intensity / Opacity</span>
              <span className="text-indigo-400 font-mono">{Math.round(textureOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.60"
              step="0.02"
              value={textureOpacity}
              onChange={(e) => onChangeTextureOpacity(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        )}

        <div>
          <div className="flex justify-between text-xs mb-1 font-medium">
            <span className="text-slate-300">Canvas Corner Radius</span>
            <span className="text-indigo-400 font-mono">{canvasRadius}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="44"
            step="4"
            value={canvasRadius}
            onChange={(e) => onChangeCanvasRadius(parseInt(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Alignment Guides Toggle */}
      {onToggleCenterGuides && (
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                showCenterGuides
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              <Crosshair className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">
                Center Alignment Guides
              </span>
              <span className="text-[10px] text-slate-400">
                Visual vertical & horizontal crosshair lines (ignored during export)
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleCenterGuides}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 ${
              showCenterGuides ? 'bg-cyan-600' : 'bg-white/10'
            }`}
            title="Toggle Center Alignment Guides"
          >
            <span
              className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                showCenterGuides ? 'transform translate-x-5' : ''
              }`}
            />
          </button>
        </div>
      )}

      {/* Export Output Resolution & Size Settings */}
      {onChangeExportScale && (
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Export Resolution & File Size
              </span>
            </div>
            <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              {calculatedW} × {calculatedH} px
            </span>
          </div>

          {/* Live Specs & File Size Preview Card */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/40 border border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Est. File Size</span>
                <span className="font-mono font-bold text-emerald-300 text-xs">~{estimatedSize}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <FileImage className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Fidelity</span>
                <span className="font-mono font-bold text-indigo-300 text-xs">{megaPixels} MP • {exportFormat.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-snug">
            Choose how much to upscale the canvas when exporting. 2x is recommended for crisp 4K Retina, 4x produces full 8K studio prints.
          </p>

          {/* Scale Multiplier Pills */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            {[
              { scale: 1, label: '1x', name: '1080p Standard' },
              { scale: 2, label: '2x', name: '4K Retina' },
              { scale: 3, label: '3x', name: '6K Ultra' },
              { scale: 4, label: '4x', name: '8K Master' },
            ].map((s) => (
              <button
                key={s.scale}
                type="button"
                onClick={() => onChangeExportScale(s.scale)}
                className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border ${
                  exportScale === s.scale
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md ring-1 ring-indigo-500/30'
                    : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <div className="text-xs font-bold">{s.label}</div>
                <div className="text-[9px] text-slate-400 truncate">{s.name}</div>
              </button>
            ))}
          </div>

          {/* Format Selector Pills (PNG / JPG / WebP) */}
          {onChangeExportFormat && (
            <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
              <span className="text-xs font-semibold text-slate-300 block">Output Image Format</span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'png', label: 'PNG', desc: 'Lossless Crisp' },
                  { id: 'jpg', label: 'JPG', desc: 'Compact Size' },
                  { id: 'webp', label: 'WebP', desc: 'Modern Web' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => onChangeExportFormat(fmt.id)}
                    className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer border ${
                      exportFormat === fmt.id
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                        : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="text-xs font-bold">{fmt.label}</div>
                    <div className="text-[9px] text-slate-400 truncate">{fmt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Compression Quality Slider (for JPG & WebP) */}
          {onChangeExportQuality && exportFormat !== 'png' && (
            <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Quality Fidelity</span>
                <span className="font-mono text-indigo-400 text-[11px] font-semibold">
                  {Math.round(exportQuality * 100)}%
                  {exportQuality === 1.0 && ' (100% Max)'}
                </span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.0"
                step="0.05"
                value={exportQuality}
                onChange={(e) => onChangeExportQuality(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>70% (Small KB)</span>
                <span>90% (Crisp)</span>
                <span>100% (Lossless Master)</span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
