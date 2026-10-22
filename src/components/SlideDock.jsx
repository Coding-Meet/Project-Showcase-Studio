import React from 'react';
import { Plus, Trash2, Copy, Layers } from 'lucide-react';

export default function SlideDock({
  slides,
  activeSlideIndex,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
  onDuplicateSlide,
}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#0d111a]/85 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/80 ring-1 ring-white/5 select-none">
        <div className="flex items-center gap-1.5 px-2 text-[11px] font-semibold text-slate-400 flex-shrink-0">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>Deck ({slides.length}/20):</span>
        </div>

        <div className="flex items-center gap-1.5 max-w-[60vw] overflow-x-auto scrollbar-none py-0.5">
          {slides.map((slide, index) => {
            const isActive = index === activeSlideIndex;
            const variantShort = (slide.variant || 'hero_cover')
              .replace('_cover', '')
              .replace('_dive', '')
              .replace('_screen', '')
              .replace('_dashboard', '')
              .replace('_combo', '');

            return (
              <button
                key={slide.id || index}
                onClick={() => onSelectSlide(index)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="font-semibold">Slide {index + 1}</span>
                <span className="text-[10px] opacity-75 capitalize font-mono">
                  {variantShort}
                </span>
              </button>
            );
          })}
        </div>

        {/* Add Slide */}
        {slides.length < 20 && (
          <button
            onClick={onAddSlide}
            className="p-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/5 transition-all cursor-pointer flex-shrink-0"
            title="Add Slide (Max 20)"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="h-4 w-[1px] bg-white/10 mx-1 flex-shrink-0"></div>

        {/* Slide Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {slides.length < 20 && (
            <button
              onClick={() => onDuplicateSlide(activeSlideIndex)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Duplicate Active Slide"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          {slides.length > 3 && (
            <button
              onClick={() => onDeleteSlide(activeSlideIndex)}
              className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
              title="Delete Active Slide (Min 3 required)"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
