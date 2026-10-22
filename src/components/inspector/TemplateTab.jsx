import React from 'react';
import { VARIANTS } from './inspectorConstants';

export default function TemplateTab({ slide, onUpdateSlide }) {
  return (
    <section className="space-y-3">
      <div>
        <span className="text-xs font-bold text-white uppercase tracking-wider block">
          Slide Layout Template
        </span>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Choose the composition structure for this slide
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 pt-1">
        {VARIANTS.map((v) => {
          const isSelected = (slide.variant || 'hero_cover') === v.id;
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
    </section>
  );
}
