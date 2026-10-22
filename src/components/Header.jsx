import React from 'react';
import {
  FolderOpen,
  Download,
  Eye,
  Archive,
  Save,
  CheckCircle2,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { PRESETS } from './CanvasStage';

export default function Header({
  projects,
  selectedProjectId,
  onSelectProject,
  presetKey,
  onSelectPreset,
  isThumbnailPreview,
  onToggleThumbnailPreview,
  exportFormat,
  onSelectExportFormat,
  onExportCurrentSlide,
  onExportAllSlides,
  isExporting,
  exportProgress,
  onSaveToDisk,
}) {
  return (
    <header className="h-16 px-6 bg-[#0a0d14] border-b border-white/5 flex items-center justify-between select-none z-30">
      {/* Left: App Logo & Project Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white block leading-none">
              SHOWCASE STUDIO
            </span>
            <span className="text-[10px] text-slate-400 font-mono">v1.0 • Professional Deck</span>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-white/10 mx-1"></div>

        {/* Project Selector Dropdown */}
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-slate-400" />
          <select
            value={selectedProjectId}
            onChange={(e) => onSelectProject(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500 max-w-[260px] truncate cursor-pointer"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center: Target Dimension Preset */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-400">Target Size:</span>
        <select
          value={presetKey}
          onChange={(e) => onSelectPreset(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-indigo-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          {Object.entries(PRESETS).map(([key, val]) => (
            <option key={key} value={key} className="bg-slate-900 text-white">
              {val.label}
            </option>
          ))}
        </select>

        {/* Thumbnail Preview Toggle */}
        <button
          onClick={onToggleThumbnailPreview}
          className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
            isThumbnailPreview
              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md'
              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
          }`}
          title="Simulate small card view (Fiverr/Upwork thumbnail test)"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="text-[11px]">Thumbnail Mode</span>
        </button>
      </div>

      {/* Right: Export & Save Controls */}
      <div className="flex items-center gap-2.5">
        {/* Format Selector */}
        <select
          value={exportFormat}
          onChange={(e) => onSelectExportFormat(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 focus:outline-none cursor-pointer"
        >
          <option value="png" className="bg-slate-900">PNG (Crisp)</option>
          <option value="webp" className="bg-slate-900">WebP (Modern)</option>
          <option value="jpg" className="bg-slate-900">JPG (95%)</option>
        </select>

        {/* Export Single Slide */}
        <button
          onClick={onExportCurrentSlide}
          disabled={isExporting}
          className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5 text-slate-300" />
          <span>Export Slide</span>
        </button>

        {/* 1-Click Export Deck to Local Folder & ZIP */}
        <button
          onClick={onExportAllSlides}
          disabled={isExporting}
          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>{exportProgress || 'Rendering...'}</span>
            </>
          ) : (
            <>
              <Archive className="w-3.5 h-3.5" />
              <span>Save Deck & ZIP</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
