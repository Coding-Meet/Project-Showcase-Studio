import React from 'react';
import { TEXT_GRADIENTS, SOLID_COLOR_SWATCHES } from '../../data/typographyPresets';
import { FONTS, WEIGHTS, EYEBROW_ICONS, VARIANTS } from './inspectorConstants';
import GradientColorPicker from './GradientColorPicker';

export default function TypographyTab({
  slide,
  project,
  onUpdateSlide,
  textScale,
  onChangeTextScale,
  titleSize,
  onChangeTitleSize,
  subtitleSize,
  onChangeSubtitleSize,
  badgeSize,
  onChangeBadgeSize,
  featureSize,
  onChangeFeatureSize,
  techChipSize,
  onChangeTechChipSize,
  iconSize,
  onChangeIconSize,
  fontFamily,
  onChangeFontFamily,
  fontWeight,
  onChangeFontWeight,
  titleGradient,
  onChangeTitleGradient,
  titleColor = '#ffffff',
  onChangeTitleColor,
  subtitleColor = '#cbd5e1',
  onChangeSubtitleColor,
  subtitleGradient = 'none',
  onChangeSubtitleGradient,
  badgeColor = '#818cf8',
  onChangeBadgeColor,
  featureColor = '#cbd5e1',
  onChangeFeatureColor,
  eyebrowIcon,
  onChangeEyebrowIcon,
  eyebrowText,
  onChangeEyebrowText,
  statusBadge,
  onChangeStatusBadge,
}) {
  const variant = slide.variant || 'hero_cover';
  const activeTemplate = VARIANTS.find((v) => v.id === variant) || VARIANTS[0];

  // Template-specific feature guards:
  const showEyebrow = variant === 'hero_cover' || variant === 'feature_deep_dive';
  const showUniversalBadge = variant === 'responsive_combo';
  const showFeatureCards = variant === 'feature_deep_dive' || variant === 'desktop_dashboard';
  const showCalloutPill = variant === 'hero_cover';
  const showBadgeSize = variant === 'hero_cover' || variant === 'feature_deep_dive' || variant === 'responsive_combo';
  const showIconSize = variant === 'hero_cover' || variant === 'feature_deep_dive';
  const showFeatureSize = variant === 'feature_deep_dive' || variant === 'desktop_dashboard';
  const showTechChipSize = variant === 'hero_cover' || variant === 'responsive_combo';

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

      {/* 1. Slide Headline + Color / Gradient Customizer */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-white uppercase tracking-wider">
              Slide Headline
            </label>
            <span className="text-[10px] text-indigo-400 font-mono">Enter / \n for new line</span>
          </div>
          <textarea
            rows={2}
            value={slide.title || ''}
            onChange={(e) => onUpdateSlide({ title: e.target.value })}
            placeholder={project.title || 'Project Title'}
            className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-semibold resize-none"
          />
        </div>

        {/* Headline Color & Gradient Customizer */}
        <GradientColorPicker
          label="Headline Color Style"
          gradientMode={titleGradient}
          onChangeGradientMode={(val) => onChangeTitleGradient(val)}
          solidColor={titleColor}
          onChangeSolidColor={(val) => onChangeTitleColor(val)}
          customFrom={slide.titleGradientFrom}
          onChangeCustomFrom={(val) => onUpdateSlide({ titleGradientFrom: val })}
          customTo={slide.titleGradientTo}
          onChangeCustomTo={(val) => onUpdateSlide({ titleGradientTo: val })}
          customAngle={slide.titleGradientAngle !== undefined ? slide.titleGradientAngle : 90}
          onChangeCustomAngle={(val) => onUpdateSlide({ titleGradientAngle: val })}
          defaultGradientPreset="metallic"
        />
      </div>

      {/* 2. Subtitle / Tagline + Color / Gradient Customizer */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <div>
          <label className="text-xs font-bold text-white uppercase tracking-wider block mb-1">
            Subtitle / Description
          </label>
          <textarea
            rows={2}
            value={slide.tagline || ''}
            onChange={(e) => onUpdateSlide({ tagline: e.target.value })}
            placeholder={project.shortDescription || 'Brief description'}
            className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 transition-all resize-none"
          />
        </div>

        {/* Subtitle Color & Gradient Customizer */}
        <GradientColorPicker
          label="Subtitle Color Style"
          gradientMode={subtitleGradient}
          onChangeGradientMode={(val) => onChangeSubtitleGradient(val)}
          solidColor={subtitleColor}
          onChangeSolidColor={(val) => onChangeSubtitleColor(val)}
          customFrom={slide.subtitleGradientFrom}
          onChangeCustomFrom={(val) => onUpdateSlide({ subtitleGradientFrom: val })}
          customTo={slide.subtitleGradientTo}
          onChangeCustomTo={(val) => onUpdateSlide({ subtitleGradientTo: val })}
          customAngle={slide.subtitleGradientAngle !== undefined ? slide.subtitleGradientAngle : 90}
          onChangeCustomAngle={(val) => onUpdateSlide({ subtitleGradientAngle: val })}
          defaultGradientPreset="cyber"
        />
      </div>

      {/* 3. Top Eyebrow Badge & Color (Hero Cover & Feature Deep Dive) */}
      {showEyebrow && (
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
          <label className="text-xs font-bold text-white uppercase tracking-wider block">
            Top Eyebrow Badge & Tags
          </label>
          <input
            type="text"
            value={eyebrowText}
            onChange={(e) => onChangeEyebrowText(e.target.value)}
            placeholder={project.platform?.join(' • ') || 'Platform tag'}
            className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400 mr-1">Icon:</span>
            {EYEBROW_ICONS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangeEyebrowIcon(item.id)}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    eyebrowIcon === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              );
            })}
          </div>

          {/* Eyebrow Badge Color Customizer */}
          <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                Badge & Tag Accent Color
              </span>
              <div
                className="px-2 py-0.5 rounded text-[10px] font-semibold"
                style={{ backgroundColor: `${badgeColor}22`, color: badgeColor, border: `1px solid ${badgeColor}40` }}
              >
                Preview
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                '#818cf8',
                '#38bdf8',
                '#34d399',
                '#fbbf24',
                '#fb7185',
                '#a855f7',
                '#ffffff',
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => onChangeBadgeColor(color)}
                  className={`w-5 h-5 rounded-md border transition-all cursor-pointer ${
                    badgeColor.toLowerCase() === color.toLowerCase()
                      ? 'ring-2 ring-indigo-500 scale-110 border-white'
                      : 'border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <div className="flex items-center gap-1 ml-auto">
                <input
                  type="color"
                  value={badgeColor || '#818cf8'}
                  onChange={(e) => onChangeBadgeColor(e.target.value)}
                  className="w-5 h-5 rounded bg-transparent border border-white/20 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={badgeColor || '#818cf8'}
                  onChange={(e) => onChangeBadgeColor(e.target.value)}
                  className="w-20 px-1.5 py-0.5 text-[10px] font-mono rounded bg-black/40 border border-white/10 text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3b. Universal UI Badge Color (Responsive Combo) */}
      {showUniversalBadge && (
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Universal UI Badge Color
            </span>
            <div
              className="px-2 py-0.5 rounded text-[10px] font-semibold"
              style={{ backgroundColor: `${badgeColor}22`, color: badgeColor, border: `1px solid ${badgeColor}40` }}
            >
              Monitor + Mobile
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {['#818cf8', '#38bdf8', '#34d399', '#fbbf24', '#fb7185', '#ffffff'].map((color) => (
              <button
                key={color}
                onClick={() => onChangeBadgeColor(color)}
                className={`w-5 h-5 rounded-md border transition-all cursor-pointer ${
                  badgeColor.toLowerCase() === color.toLowerCase()
                    ? 'ring-2 ring-indigo-500 scale-110 border-white'
                    : 'border-white/20 hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
            <input
              type="color"
              value={badgeColor || '#818cf8'}
              onChange={(e) => onChangeBadgeColor(e.target.value)}
              className="w-5 h-5 rounded bg-transparent border border-white/20 cursor-pointer p-0.5 ml-auto"
            />
          </div>
        </div>
      )}

      {/* 4. Feature Bullets & Feature Text Color (Feature Deep Dive & Desktop Dashboard) */}
      {showFeatureCards && (
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">
              Key Features & Cards (3 Items)
            </label>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-400">Card Text Color:</span>
              <input
                type="color"
                value={featureColor || '#cbd5e1'}
                onChange={(e) => onChangeFeatureColor(e.target.value)}
                className="w-5 h-5 rounded bg-transparent border border-white/20 cursor-pointer p-0.5"
              />
            </div>
          </div>

          {/* Quick Feature Color Swatches */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { name: 'Light Slate', color: '#cbd5e1' },
              { name: 'Pure White', color: '#ffffff' },
              { name: 'Muted Slate', color: '#94a3b8' },
              { name: 'Cyan Glow', color: '#38bdf8' },
              { name: 'Emerald Glow', color: '#34d399' },
              { name: 'Amber Glow', color: '#fbbf24' },
            ].map((swatch) => (
              <button
                key={swatch.color}
                onClick={() => onChangeFeatureColor(swatch.color)}
                className={`w-4 h-4 rounded border transition-all cursor-pointer ${
                  featureColor.toLowerCase() === swatch.color.toLowerCase()
                    ? 'ring-2 ring-indigo-500 scale-110 border-white'
                    : 'border-white/20 hover:scale-105'
                }`}
                style={{ backgroundColor: swatch.color }}
                title={swatch.name}
              />
            ))}
          </div>

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
              className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          ))}
        </div>
      )}

      {/* 5. Optional Callout Pill (Hero Cover only) */}
      {showCalloutPill && (
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
          <label className="text-xs font-bold text-white uppercase tracking-wider block">
            Callout Pill (Optional)
          </label>
          <input
            type="text"
            value={statusBadge}
            onChange={(e) => onChangeStatusBadge(e.target.value)}
            placeholder="e.g. ⭐ 88 Stars on GitHub"
            className="w-full px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      )}

      {/* 6. Font Family & Boldness */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
        <div>
          <label className="text-xs font-bold text-white uppercase tracking-wider block mb-1">
            Font Family
          </label>
          <select
            value={fontFamily}
            onChange={(e) => onChangeFontFamily(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {FONTS.map((f) => (
              <option key={f.id} value={f.id} className="bg-[#0f141f]">
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Headline Boldness
          </label>
          <div className="grid grid-cols-4 gap-1">
            {WEIGHTS.map((w) => (
              <button
                key={w.id}
                onClick={() => onChangeFontWeight(w.id)}
                className={`py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  fontWeight === w.id
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Granular Element Text & Icon Size Sliders */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
          Element Sizes & Scale
        </span>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300">Headline Size</span>
            <span className="text-indigo-400 font-mono font-medium">{titleSize}px</span>
          </div>
          <input
            type="range"
            min="28"
            max="76"
            step="2"
            value={titleSize}
            onChange={(e) => onChangeTitleSize(parseInt(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300">Subtitle Size</span>
            <span className="text-indigo-400 font-mono font-medium">{subtitleSize}px</span>
          </div>
          <input
            type="range"
            min="13"
            max="26"
            step="1"
            value={subtitleSize}
            onChange={(e) => onChangeSubtitleSize(parseInt(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {showBadgeSize && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Eyebrow Badge Size</span>
              <span className="text-indigo-400 font-mono font-medium">{badgeSize}px</span>
            </div>
            <input
              type="range"
              min="10"
              max="18"
              step="1"
              value={badgeSize}
              onChange={(e) => onChangeBadgeSize(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        )}

        {showIconSize && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Icon Size</span>
              <span className="text-indigo-400 font-mono font-medium">{iconSize}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="28"
              step="1"
              value={iconSize}
              onChange={(e) => onChangeIconSize(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        )}

        {showFeatureSize && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Feature Text Size</span>
              <span className="text-indigo-400 font-mono font-medium">{featureSize}px</span>
            </div>
            <input
              type="range"
              min="11"
              max="20"
              step="1"
              value={featureSize}
              onChange={(e) => onChangeFeatureSize(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        )}

        {showTechChipSize && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Tech Stack Pills Size</span>
              <span className="text-indigo-400 font-mono font-medium">{techChipSize}px</span>
            </div>
            <input
              type="range"
              min="10"
              max="18"
              step="1"
              value={techChipSize}
              onChange={(e) => onChangeTechChipSize(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        )}

        <div className="pt-1 border-t border-white/[0.06]">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300">Global Text Scale</span>
            <span className="text-indigo-400 font-mono font-medium">{Math.round(textScale * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.75"
            max="1.4"
            step="0.05"
            value={textScale}
            onChange={(e) => onChangeTextScale(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}
