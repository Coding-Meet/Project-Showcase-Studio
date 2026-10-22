import React from 'react';
import {
  Upload,
  Smartphone,
  Monitor,
  Sparkles,
  Sliders,
  Type,
  Palette,
  Layout,
  Check,
  Plus,
  Trash,
} from 'lucide-react';
import { extractDominantColor } from '../utils/colorExtractor';

const VARIANTS = [
  { id: 'hero_cover', label: '1. Hero Cover', desc: 'Title, tech tags, 3D angled device' },
  { id: 'feature_deep_dive', label: '2. Feature Deep-Dive', desc: 'Device + 3 floating glass cards' },
  { id: 'dual_screen', label: '3. Dual Screen Flow', desc: 'Two phones side-by-side comparison' },
  { id: 'desktop_dashboard', label: '4. Desktop Dashboard', desc: 'MacBook/Web screen + bottom feature bar' },
  { id: 'responsive_combo', label: '5. Responsive Combo', desc: 'Desktop monitor + mobile overlay' },
  { id: 'minimal_focus', label: '6. Minimal Big Focus', desc: 'Clean bold headline + large mockup' },
];

const COLOR_PRESETS = [
  { name: 'Indigo Nebula', bg: '#080a12', accent: '#6366f1' },
  { name: 'Emerald Vault', bg: '#060f0e', accent: '#10b981' },
  { name: 'Cyber Violet', bg: '#0c0714', accent: '#a855f7' },
  { name: 'Solar Flare', bg: '#100a06', accent: '#f97316' },
  { name: 'Electric Cyan', bg: '#060d14', accent: '#06b6d4' },
  { name: 'Clean Slate', bg: '#0e1117', accent: '#94a3b8' },
];

export default function EditorSidebar({
  slide,
  project,
  onUpdateSlide,
  textScale,
  onChangeTextScale,
  deviceScale,
  onChangeDeviceScale,
  backgroundColor,
  onChangeBackgroundColor,
  accentColor,
  onChangeAccentColor,
  glowIntensity,
  onChangeGlowIntensity,
}) {
  const isMultiDeviceVariant =
    slide.variant === 'dual_screen' || slide.variant === 'responsive_combo';

  const handleFileUpload = async (e, field = 'imageSrc') => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;
      onUpdateSlide({ [field]: dataUrl });

      // Automatically suggest dominant color
      try {
        const detectedColor = await extractDominantColor(dataUrl);
        if (detectedColor) {
          onChangeAccentColor(detectedColor);
        }
      } catch (err) {
        // Fallback
      }
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
    <aside className="w-96 h-full bg-[#0b0e17] border-r border-white/5 flex flex-col overflow-y-auto">
      <div className="p-5 space-y-6">
        {/* 1. Layout Variant */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Layout className="w-3.5 h-3.5 text-indigo-400" />
            <span>Slide Layout Variant</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {VARIANTS.map((v) => {
              const isSelected = (slide.variant || 'hero_cover') === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => onUpdateSlide({ variant: v.id })}
                  className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center justify-between">
                    <span>{v.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{v.desc}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Screenshot Upload & Frame Settings */}
        <section className="space-y-3 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <Upload className="w-3.5 h-3.5 text-indigo-400" />
              <span>Screenshot Upload</span>
            </div>
            {slide.imageSrc && (
              <button
                onClick={handleMagicColor}
                className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                title="Extract color from screenshot"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto-Color</span>
              </button>
            )}
          </div>

          {/* Primary Upload Input */}
          <label className="border-2 border-dashed border-white/10 hover:border-indigo-500/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
            <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 transition-colors mb-1.5" />
            <span className="text-xs font-medium text-slate-300">
              {slide.imageSrc ? 'Replace Primary Screenshot' : 'Upload Screenshot (PNG/WebP/JPG)'}
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">Click or drag & drop</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'imageSrc')}
            />
          </label>

          {/* Secondary Screenshot for Dual / Combo layouts */}
          {isMultiDeviceVariant && (
            <label className="border-2 border-dashed border-white/10 hover:border-purple-500/50 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
              <span className="text-xs font-medium text-slate-300">
                {slide.secondaryImageSrc ? 'Replace Secondary Screenshot' : '+ Upload Secondary Screen'}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'secondaryImageSrc')}
              />
            </label>
          )}

          {/* Frame Toggle */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-200">Image Already Has Frame?</p>
                <p className="text-[10px] text-slate-400">Avoids double bezel on pre-framed mockups</p>
              </div>
              <input
                type="checkbox"
                checked={slide.hasFrame || false}
                onChange={(e) => onUpdateSlide({ hasFrame: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-white/20 cursor-pointer"
              />
            </div>

            {/* If NO frame, choose device frame type */}
            {!slide.hasFrame && (
              <div className="pt-2 border-t border-white/5">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Apply Frame Style:</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'android', label: 'Android' },
                    { id: 'iphone', label: 'iPhone' },
                    { id: 'desktop', label: 'Desktop' },
                  ].map((dev) => (
                    <button
                      key={dev.id}
                      onClick={() => onUpdateSlide({ deviceType: dev.id })}
                      className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        (slide.deviceType || 'android') === dev.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {dev.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. Text & Content Editor */}
        <section className="space-y-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Type className="w-3.5 h-3.5 text-indigo-400" />
            <span>Slide Typography & Content</span>
          </div>

          <div className="space-y-2.5">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Slide Headline
              </label>
              <input
                type="text"
                value={slide.title || ''}
                onChange={(e) => onUpdateSlide({ title: e.target.value })}
                placeholder={project.title || 'Project Title'}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Tagline / Subtitle
              </label>
              <textarea
                rows={2}
                value={slide.tagline || ''}
                onChange={(e) => onUpdateSlide({ tagline: e.target.value })}
                placeholder={project.shortDescription || 'App description'}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Feature Bullets (for Feature Deep-Dive or Dashboard) */}
            {slide.variant === 'feature_deep_dive' && (
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-semibold text-slate-400 block">
                  3 Key Features
                </label>
                {(slide.features || (project.features || []).slice(0, 3)).map((feat, i) => (
                  <input
                    key={i}
                    type="text"
                    value={feat}
                    onChange={(e) => {
                      const updated = [...(slide.features || (project.features || []).slice(0, 3))];
                      updated[i] = e.target.value;
                      onUpdateSlide({ features: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 mb-1"
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 4. Fine-Tuning Sliders (Font size & device size) */}
        <section className="space-y-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Fine-Tune Sizing</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">Text Size Scale</span>
                <span className="text-indigo-400 font-mono font-medium">{Math.round(textScale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.4"
                step="0.05"
                value={textScale}
                onChange={(e) => onChangeTextScale(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">Device Scale</span>
                <span className="text-indigo-400 font-mono font-medium">{Math.round(deviceScale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.25"
                step="0.05"
                value={deviceScale}
                onChange={(e) => onChangeDeviceScale(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* 5. Color & Ambient Lighting */}
        <section className="space-y-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5 text-indigo-400" />
            <span>Background & Ambient Mesh</span>
          </div>

          {/* Quick Color Presets */}
          <div className="grid grid-cols-3 gap-1.5">
            {COLOR_PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  onChangeBackgroundColor(p.bg);
                  onChangeAccentColor(p.accent);
                }}
                className="px-2 py-1.5 rounded-lg text-[10px] font-medium border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] flex items-center gap-1.5 text-slate-300 cursor-pointer"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: p.accent }}
                />
                <span className="truncate">{p.name}</span>
              </button>
            ))}
          </div>

          {/* Custom Color Pickers */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Glow Accent</span>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => onChangeAccentColor(e.target.value)}
                className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
              />
            </div>
            <div className="p-2 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Base BG</span>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => onChangeBackgroundColor(e.target.value)}
                className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
              />
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
