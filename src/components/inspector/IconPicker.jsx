import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, X, Sparkles } from 'lucide-react';
import DynamicIcon from '../common/DynamicIcon';
import { CURATED_ICONS, ICON_CATEGORIES } from '../../utils/iconCatalog';

export default function IconPicker({ currentIcon, onSelectIcon, label = 'Eyebrow Icon' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const activeIconObj = useMemo(() => {
    return (
      CURATED_ICONS.find(
        (i) => i.id === currentIcon || i.iconName.toLowerCase() === (currentIcon || '').toLowerCase()
      ) || { id: currentIcon || 'sparkles', name: currentIcon || 'Sparkles', iconName: currentIcon || 'Sparkles' }
    );
  }, [currentIcon]);

  const filteredIcons = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CURATED_ICONS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.iconName.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelect = (iconId) => {
    onSelectIcon(iconId);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          {label}
        </label>
        <span className="text-[10px] text-indigo-400 font-mono font-medium">
          100+ Icons
        </span>
      </div>

      {/* Trigger Card */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/50 hover:bg-white/[0.05] transition-all flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
            <DynamicIcon name={currentIcon} className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white truncate">
              {activeIconObj.name}
            </span>
            <span className="text-[10px] text-slate-400 truncate">
              {activeIconObj.category || 'Lucide Vector'}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expanded Icon Drawer */}
      {isOpen && (
        <div className="p-3 rounded-2xl bg-[#0b0e17] border border-white/[0.12] shadow-2xl space-y-2.5 animate-in fade-in duration-150">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search icons (e.g. flame, trophy, wifi, chart, lock)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
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

          {/* Category Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {ICON_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Icon Grid */}
          <div className="grid grid-cols-6 gap-1 max-h-52 overflow-y-auto pr-1">
            {filteredIcons.length === 0 ? (
              <div className="col-span-6 py-6 text-center text-xs text-slate-500">
                No matching icons found.
              </div>
            ) : (
              filteredIcons.map((item) => {
                const isSelected =
                  currentIcon === item.id ||
                  (currentIcon || '').toLowerCase() === item.iconName.toLowerCase();
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    title={`${item.name} (${item.category})`}
                    className={`h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md ring-2 ring-indigo-500/30'
                        : 'bg-white/[0.02] border-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/10'
                    }`}
                  >
                    <DynamicIcon name={item.iconName} className="w-4 h-4" />
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
