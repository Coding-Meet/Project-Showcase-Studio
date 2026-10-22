import React from 'react';
import { Upload } from 'lucide-react';
import { BG_VARIANTS, COLOR_PRESETS } from './inspectorConstants';

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
  canvasRadius,
  onChangeCanvasRadius,
}) {
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
          <label className="text-[11px] text-slate-400 mb-1 block">Texture Pattern</label>
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: 'dots', label: 'Dot Matrix' },
              { id: 'grid', label: 'Grid Lines' },
              { id: 'none', label: 'None' },
            ].map((tex) => (
              <button
                key={tex.id}
                onClick={() => onChangeTextureOverlay(tex.id)}
                className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  textureOverlay === tex.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/[0.02] border border-white/[0.06] text-slate-400 hover:text-white'
                }`}
              >
                {tex.label}
              </button>
            ))}
          </div>
        </div>

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
    </section>
  );
}
