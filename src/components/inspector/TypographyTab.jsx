import React, { useState } from 'react';
import { Search, Plus, X, Sparkles, Layers } from 'lucide-react';
import { TEXT_GRADIENTS, SOLID_COLOR_SWATCHES } from '../../data/typographyPresets';
import {
  FONTS,
  WEIGHTS,
  EYEBROW_ICONS,
  VARIANTS,
  STORE_BADGE_OPTIONS,
  STORE_BADGE_STYLES,
  METRIC_ICONS_LIST,
  METRIC_STYLES,
} from './inspectorConstants';
import GradientColorPicker from './GradientColorPicker';
import TechIcon, { POPULAR_TECH_LOGOS } from '../common/TechIcon';
import { LOCAL_LOGOS } from '../../data/localLogos';

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
  const [logoSearch, setLogoSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showLogoBrowser, setShowLogoBrowser] = useState(false);

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
          <div className="flex items-center gap-1 pt-1 flex-wrap">
            <span className="text-[10px] text-slate-400 mr-1 block w-full mb-0.5">Icon:</span>
            {EYEBROW_ICONS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangeEyebrowIcon(item.id)}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    eyebrowIcon === item.id
                      ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-white/20'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06]'
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

      {/* 5b. App Store & Google Play Badges (High-Converting Trust Badges) */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              App Store & Google Play
            </span>
            <span className="text-[10px] text-slate-400">Official conversion badges</span>
          </div>
          <select
            value={slide.storeBadgeType || (slide.showStoreBadges ? 'both' : 'none')}
            onChange={(e) => {
              const val = e.target.value;
              onUpdateSlide({
                storeBadgeType: val,
                showStoreBadges: val !== 'none',
              });
            }}
            className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {STORE_BADGE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-[#0f141f]">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {(slide.storeBadgeType || (slide.showStoreBadges ? 'both' : 'none')) !== 'none' && (
          <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/[0.06]">
            {STORE_BADGE_STYLES.map((st) => {
              const isSelected = (slide.storeBadgeStyle || 'official') === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => onUpdateSlide({ storeBadgeStyle: st.id })}
                  className={`py-1 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white'
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5c. Tech Stack Chips & Vector SVG Logos (Powered by theSVG 7,600+ Logos) */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Tech Stack & Brand Logos
            </span>
            <span className="text-[10px] text-slate-400">
              Powered by <strong className="text-indigo-400">theSVG</strong> (7,600+ SVGs)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-semibold">Show Logos</span>
            <input
              type="checkbox"
              checked={slide.showTechIcons !== false}
              onChange={(e) => onUpdateSlide({ showTechIcons: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 cursor-pointer"
            />
          </div>
        </div>

        {/* Active Tech Stack Badges with Live Logos */}
        {(() => {
          const rawTechs =
            slide.technologies !== undefined
              ? slide.technologies
              : project.technologies || ['Kotlin', 'Compose', 'MVI'];
          const activeTechList = Array.isArray(rawTechs)
            ? rawTechs
            : typeof rawTechs === 'string'
              ? rawTechs.split(',').map((s) => s.trim()).filter(Boolean)
              : ['Kotlin', 'Compose', 'MVI'];

          const removeTech = (indexToRemove) => {
            const updated = activeTechList.filter((_, idx) => idx !== indexToRemove);
            onUpdateSlide({ technologies: updated });
          };

          const addOrToggleTech = (techName) => {
            const exists = activeTechList.some(
              (t) => t.toLowerCase() === techName.toLowerCase()
            );
            if (exists) {
              onUpdateSlide({
                technologies: activeTechList.filter(
                  (t) => t.toLowerCase() !== techName.toLowerCase()
                ),
              });
            } else {
              onUpdateSlide({ technologies: [...activeTechList, techName] });
            }
          };

          const localListFormatted = LOCAL_LOGOS.map((loc) => ({
            name: loc.label,
            slug: loc.id,
            category: '📁 Local Logos',
            isLocal: true,
            hasWordmark: loc.hasWordmark,
          }));

          const filteredLogos = (
            selectedCategory === '📁 Local Logos' ? localListFormatted : POPULAR_TECH_LOGOS
          ).filter((item) => {
            const matchesCat =
              selectedCategory === 'All' ||
              selectedCategory === '📁 Local Logos' ||
              item.category === selectedCategory;
            const matchesSearch =
              !logoSearch ||
              item.name.toLowerCase().includes(logoSearch.toLowerCase()) ||
              item.slug.toLowerCase().includes(logoSearch.toLowerCase());
            return matchesCat && matchesSearch;
          });

          return (
            <div className="space-y-2.5">
              {/* Current Active Chips */}
              <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-black/40 border border-white/[0.08] min-h-[38px] items-center">
                {activeTechList.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic px-1">
                    No technologies added yet. Select from below or type.
                  </span>
                ) : (
                  activeTechList.map((tech, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[11px] text-white font-medium shadow-sm group hover:border-white/20 transition-all"
                    >
                      <TechIcon
                        name={tech}
                        variant={slide.techLogoVariant || 'icon'}
                        className="w-3 h-3 flex-shrink-0"
                      />
                      <span>{tech}</span>
                      <button
                        onClick={() => removeTech(idx)}
                        className="text-slate-400 hover:text-rose-400 ml-0.5 cursor-pointer p-0.5"
                        title={`Remove ${tech}`}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Logo Asset Style Toggle: Icon Only (_logo.png) vs Logo with Name (_logo_2.png) */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/[0.06]">
                <div>
                  <span className="text-[11px] text-slate-300 font-semibold block">Logo Asset Style</span>
                  <span className="text-[9px] text-slate-500">
                    {(slide.techLogoVariant || 'icon') === 'wordmark'
                      ? 'logoname_logo_2.png (Logo with name)'
                      : 'logoname_logo.png (Only logo icon)'}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white/[0.04] p-0.5 rounded-lg border border-white/10">
                  <button
                    onClick={() => onUpdateSlide({ techLogoVariant: 'icon' })}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
                      (slide.techLogoVariant || 'icon') === 'icon'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Icon Only
                  </button>
                  <button
                    onClick={() => onUpdateSlide({ techLogoVariant: 'wordmark' })}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
                      slide.techLogoVariant === 'wordmark'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Logo + Name
                  </button>
                </div>
              </div>

              {/* Logo Browser Expand Toggle */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setShowLogoBrowser(!showLogoBrowser)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>
                    {showLogoBrowser
                      ? 'Hide Logo Explorer'
                      : `Browse Logos (${LOCAL_LOGOS.length} Local + theSVG)`}
                  </span>
                </button>
                <span className="text-[10px] text-slate-500 font-mono">
                  {selectedCategory === '📁 Local Logos' ? `${LOCAL_LOGOS.length} local` : '7,600+ CDN'}
                </span>
              </div>

              {/* Collapsible Logo Library Browser */}
              {showLogoBrowser && (
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={logoSearch}
                      onChange={(e) => setLogoSearch(e.target.value)}
                      placeholder="Search brands (e.g. Kotlin, Docker, AWS, Firebase)..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
                    />
                    {logoSearch && (
                      <button
                        onClick={() => setLogoSearch('')}
                        className="absolute right-2 top-2 text-slate-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-[10px]">
                    {[
                      'All',
                      '📁 Local Logos',
                      'Mobile',
                      'Frontend',
                      'Backend',
                      'Cloud',
                      'Database',
                      'AI',
                      'Tools',
                    ].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap ${
                          selectedCategory === cat
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Quick-Click Logo Grid with Live SVG & PNG Icons */}
                  <div className="grid grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-1">
                    {filteredLogos.map((item) => {
                      const isAdded = activeTechList.some(
                        (t) => t.toLowerCase() === item.name.toLowerCase()
                      );
                      return (
                        <button
                          key={item.name}
                          onClick={() => addOrToggleTech(item.name)}
                          className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/40'
                              : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.05] hover:border-white/15'
                          }`}
                        >
                          <TechIcon
                            name={item.slug || item.name}
                            variant={slide.techLogoVariant || 'icon'}
                            className="w-3.5 h-3.5 flex-shrink-0"
                          />
                          <span className="text-[11px] font-semibold truncate flex-1">
                            {item.name}
                          </span>
                          {item.hasWordmark && (
                            <span className="text-[8px] px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono" title="Has wordmark logo_2.png">
                              +2
                            </span>
                          )}
                          {isAdded ? (
                            <span className="text-[10px] text-indigo-400 font-bold">✓</span>
                          ) : (
                            <Plus className="w-3 h-3 text-slate-500 group-hover:text-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Search Query Adder (add ANY brand among 7,600+ theSVG logos) */}
                  {logoSearch && (
                    <button
                      onClick={() => {
                        addOrToggleTech(logoSearch.trim());
                        setLogoSearch('');
                      }}
                      className="w-full py-1.5 px-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add &quot;{logoSearch}&quot; from theSVG Library</span>
                    </button>
                  )}
                </div>
              )}

              {/* Direct comma-separated input for power users */}
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Manual Tech List (comma separated)
                </label>
                <input
                  type="text"
                  value={activeTechList.join(', ')}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const arr = raw
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean);
                    onUpdateSlide({ technologies: arr });
                  }}
                  placeholder="e.g. Kotlin, Compose, AWS, Docker"
                  className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>
          );
        })()}
      </div>

      {/* 5d. Social Proof & Conversion Metric Pill */}
      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Social Proof & Rating
            </span>
            <span className="text-[10px] text-slate-400">Upwork/Fiverr conversion booster</span>
          </div>
          <input
            type="checkbox"
            checked={Boolean(slide.showMetricPill)}
            onChange={(e) => onUpdateSlide({ showMetricPill: e.target.checked })}
            className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 cursor-pointer"
          />
        </div>

        {slide.showMetricPill && (
          <div className="space-y-2 pt-1 border-t border-white/[0.06]">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                Badge Headline / Metric Text
              </label>
              <input
                type="text"
                value={slide.metricText || '4.9 ★ Rating • 50K+ Downloads'}
                onChange={(e) => onUpdateSlide({ metricText: e.target.value })}
                placeholder="e.g. 4.9 ★ (50K+ Downloads)"
                className="w-full px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Icon</label>
                <select
                  value={slide.metricIcon || 'star'}
                  onChange={(e) => onUpdateSlide({ metricIcon: e.target.value })}
                  className="w-full px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {METRIC_ICONS_LIST.map((ic) => (
                    <option key={ic.id} value={ic.id} className="bg-[#0f141f]">
                      {ic.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Pill Color</label>
                <select
                  value={slide.metricStyle || 'gold'}
                  onChange={(e) => onUpdateSlide({ metricStyle: e.target.value })}
                  className="w-full px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {METRIC_STYLES.map((st) => (
                    <option key={st.id} value={st.id} className="bg-[#0f141f]">
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

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
          <div className="grid grid-cols-3 gap-1.5">
            {WEIGHTS.map((w) => (
              <button
                key={w.id}
                onClick={() => onChangeFontWeight(w.id)}
                className={`py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  fontWeight === w.id
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
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
