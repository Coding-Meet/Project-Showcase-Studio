import React, { useState, useMemo, useEffect } from 'react';
import { Search, Sparkles, Check, ChevronDown, X, Globe } from 'lucide-react';
import { POPULAR_GOOGLE_FONTS, FONT_CATEGORIES, loadGoogleFont } from '../../utils/fontLoader';

export default function FontPicker({ currentFont, onSelectFont }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Automatically load the active font into head on mount or change
  useEffect(() => {
    if (currentFont) {
      loadGoogleFont(currentFont);
    }
  }, [currentFont]);

  // Filter fonts by search query and category
  const filteredFonts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return POPULAR_GOOGLE_FONTS.filter((f) => {
      const matchesCategory =
        selectedCategory === 'All' || f.category === selectedCategory;
      const matchesSearch =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.style.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const isCustomCandidate = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return false;
    return !POPULAR_GOOGLE_FONTS.some(
      (f) => f.name.toLowerCase() === q.toLowerCase()
    );
  }, [searchQuery]);

  const handleSelect = (fontName) => {
    loadGoogleFont(fontName);
    onSelectFont(fontName);
    setIsOpen(false);
  };

  const handleApplyCustom = () => {
    const customName = searchQuery.trim();
    if (customName) {
      loadGoogleFont(customName);
      onSelectFont(customName);
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-white uppercase tracking-wider block">
          Font Family Library
        </label>
        <span className="text-[10px] text-indigo-400 font-mono font-medium">
          Google Fonts (1,600+)
        </span>
      </div>

      {/* Active Font Trigger Card */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/50 hover:bg-white/[0.05] transition-all flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex flex-col min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-bold text-white truncate"
              style={{ fontFamily: `"${currentFont}", sans-serif` }}
            >
              {currentFont}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Active
            </span>
          </div>
          <span
            className="text-[11px] text-slate-400 truncate mt-0.5"
            style={{ fontFamily: `"${currentFont}", sans-serif` }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 group-hover:text-indigo-400">
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Expanded Font Library Modal / Drawer */}
      {isOpen && (
        <div className="p-3 rounded-2xl bg-[#0b0e17] border border-white/[0.12] shadow-2xl space-y-3 animate-in fade-in duration-150">
          {/* Search Header */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search 80+ fonts or type ANY Google Font name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-8 pr-7 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Badges */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {FONT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Custom Google Font Loader Prompt */}
          {isCustomCandidate && (
            <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Load from Google Fonts</span>
                </div>
                <div className="text-[10px] text-indigo-300 truncate">
                  Import "{searchQuery.trim()}" directly from CDN
                </div>
              </div>
              <button
                type="button"
                onClick={handleApplyCustom}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer flex-shrink-0"
              >
                <Sparkles className="w-3 h-3" />
                <span>Apply</span>
              </button>
            </div>
          )}

          {/* Font List Scrollbox */}
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
            {filteredFonts.length === 0 && !isCustomCandidate ? (
              <div className="py-6 text-center text-xs text-slate-500">
                No matching fonts found. Type any Google Font name to load it!
              </div>
            ) : (
              filteredFonts.map((font) => {
                const isSelected = currentFont === font.name;
                return (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => handleSelect(font.name)}
                    onMouseEnter={() => loadGoogleFont(font.name)}
                    className={`w-full p-2 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500/50 text-white'
                        : 'bg-white/[0.01] border-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.08] text-slate-300'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold text-white truncate"
                          style={{ fontFamily: `"${font.name}", sans-serif` }}
                        >
                          {font.name}
                        </span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-white/[0.05] text-slate-400">
                          {font.category}
                        </span>
                      </div>
                      <span
                        className="text-[11px] text-slate-400 truncate block mt-0.5"
                        style={{ fontFamily: `"${font.name}", sans-serif` }}
                      >
                        {font.style} • Showcase Design
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
