import React from 'react';
import { Plus, Trash2, Copy, Layers } from 'lucide-react';

export default function SlideManager({
  slides,
  activeSlideIndex,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
  onDuplicateSlide,
}) {
  return (
    <div className="flex items-center gap-2 px-6 py-3 bg-[#0a0d14] border-b border-white/5 overflow-x-auto select-none">
      <div className="flex items-center gap-1.5 mr-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <Layers className="w-3.5 h-3.5 text-indigo-400" />
        <span>Slides ({slides.length}/7):</span>
      </div>

      <div className="flex items-center gap-1.5">
        {slides.map((slide, index) => {
          const isActive = index === activeSlideIndex;
          return (
            <button
              key={slide.id || index}
              onClick={() => onSelectSlide(index)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <span>Slide {index + 1}</span>
              <span className="text-[10px] opacity-75 font-normal capitalize">
                ({(slide.variant || 'hero_cover').replace('_', ' ')})
              </span>
            </button>
          );
        })}
      </div>

      {/* Add Slide Button */}
      {slides.length < 7 && (
        <button
          onClick={onAddSlide}
          className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-300 border border-white/10 hover:border-indigo-500/40 flex items-center gap-1 transition-all cursor-pointer"
          title="Add New Slide (Max 7)"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Slide</span>
        </button>
      )}

      {/* Actions for Active Slide */}
      <div className="ml-auto flex items-center gap-1.5 pl-4 border-l border-white/10">
        {slides.length < 7 && (
          <button
            onClick={() => onDuplicateSlide(activeSlideIndex)}
            className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Duplicate Current Slide"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        )}
        {slides.length > 3 && (
          <button
            onClick={() => onDeleteSlide(activeSlideIndex)}
            className="p-1.5 rounded-md hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
            title="Delete Current Slide (Min 3 required)"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
