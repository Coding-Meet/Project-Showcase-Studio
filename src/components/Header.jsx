import React from 'react';
import {
  FolderOpen,
  Download,
  Eye,
  Archive,
  Sparkles,
  ChevronDown,
  Save,
} from 'lucide-react';
import { PRESETS } from './CanvasStage';
import { estimateImageFileSize } from '../utils/exportEngine';

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
  exportScale = 2,
  onSelectExportScale,
  exportQuality = 1.0,
  onExportCurrentSlide,
  onExportAllSlides,
  isExporting,
  exportProgress,
  isDiskSaved,
  onSaveToDisk,
}) {
  const currentPreset = (presetKey && PRESETS[presetKey]) || (presetKey && PRESETS[presetKey.toUpperCase()]) || PRESETS.WEBSITE_HD;
  const targetW = currentPreset?.width || 1920;
  const targetH = currentPreset?.height || 1080;
  const estimatedSize = estimateImageFileSize(targetW * exportScale, targetH * exportScale, exportFormat, exportQuality);
  return (
    <header className="h-14 px-5 bg-[#090b11]/85 backdrop-blur-xl border-b border-white/[0.07] flex items-center justify-between select-none z-30 sticky top-0">
      {/* Left: Brand & Project Selector */}
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-xs tracking-wider uppercase text-white/90">
            Showcase Studio
          </span>
        </div>

        <div className="h-4 w-[1px] bg-white/10"></div>

        {/* Project Selector Dropdown */}
        <div className="relative flex items-center">
          <FolderOpen className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
          <select
            value={selectedProjectId}
            onChange={(e) => onSelectProject(e.target.value)}
            className="pl-8 pr-7 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-all cursor-pointer appearance-none max-w-[240px] truncate"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0f141f] text-slate-200">
                {p.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Center: Target Dimension & Thumbnail Toggle */}
      <div className="flex items-center gap-2 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
        <div className="relative flex items-center">
          <select
            value={presetKey}
            onChange={(e) => onSelectPreset(e.target.value)}
            className="px-3 py-1 rounded-lg bg-transparent text-xs font-medium text-slate-300 hover:text-white focus:outline-none cursor-pointer appearance-none pr-6"
          >
            {Object.entries(PRESETS).map(([key, val]) => (
              <option key={key} value={key} className="bg-[#0f141f] text-slate-200">
                {val.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 pointer-events-none" />
        </div>

        <div className="h-3 w-[1px] bg-white/10"></div>

        <button
          onClick={onToggleThumbnailPreview}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
            isThumbnailPreview
              ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
          title="Preview small thumbnail"
        >
          <Eye className="w-3 h-3" />
          <span className="text-[11px]">Thumbnail Mode</span>
        </button>
      </div>

      {/* Right: Actions & Export */}
      <div className="flex items-center gap-2">
        {/* Format Selector */}
        <select
          value={exportFormat}
          onChange={(e) => onSelectExportFormat(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 focus:outline-none cursor-pointer"
        >
          <option value="png" className="bg-[#0f141f]">PNG</option>
          <option value="webp" className="bg-[#0f141f]">WebP</option>
          <option value="jpg" className="bg-[#0f141f]">JPG</option>
        </select>

        {/* Resolution Scale Multiplier (1x, 2x, 3x, 4x) */}
        {onSelectExportScale && (
          <select
            value={exportScale}
            onChange={(e) => onSelectExportScale(parseInt(e.target.value, 10))}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 focus:outline-none cursor-pointer transition-colors"
            title="Output Resolution Scale Multiplier (1x to 4x)"
          >
            <option value={1} className="bg-[#0f141f] text-slate-200">1x (Standard)</option>
            <option value={2} className="bg-[#0f141f] text-slate-200">2x (Retina 4K)</option>
            <option value={3} className="bg-[#0f141f] text-slate-200">3x (Ultra 6K)</option>
            <option value={4} className="bg-[#0f141f] text-slate-200">4x (Studio 8K)</option>
          </select>
        )}

        {/* Live File Size Preview Badge */}
        <div
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-400"
          title={`Estimated Export File Size: ~${estimatedSize} (${targetW * exportScale} × ${targetH * exportScale} px at ${exportScale}x ${exportFormat.toUpperCase()})`}
        >
          <span className="text-[10px] text-emerald-500/80 uppercase font-sans font-semibold">Size:</span>
          <span>~{estimatedSize}</span>
        </div>

        {/* Save to Project File (src/data/projectStore.json) */}
        <button
          onClick={onSaveToDisk}
          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            isDiskSaved
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
              : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-slate-200 hover:text-white'
          }`}
          title="Save all customized colors, sizes, and slides permanently to src/data/projectStore.json"
        >
          {isDiskSaved ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Saved to Disk</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5 text-slate-400" />
              <span>Save to File</span>
            </>
          )}
        </button>

        {/* Export Single Slide */}
        <button
          onClick={onExportCurrentSlide}
          disabled={isExporting}
          className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5 text-slate-400" />
          <span>Export Slide</span>
        </button>

        {/* 1-Click Save Deck to Folder & ZIP */}
        <button
          onClick={onExportAllSlides}
          disabled={isExporting}
          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50 ring-1 ring-white/20"
        >
          {isExporting ? (
            <>
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>{exportProgress || 'Processing...'}</span>
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
