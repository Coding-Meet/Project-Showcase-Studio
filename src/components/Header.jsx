import React from 'react';
import {
  FolderOpen,
  Download,
  Eye,
  Archive,
  Sparkles,
  ChevronDown,
  Save,
  Crosshair,
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
  showCenterGuides = false,
  onToggleCenterGuides,
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
    <header className="h-14 px-3 sm:px-4 bg-[#090b11]/90 backdrop-blur-xl border-b border-white/[0.07] flex items-center justify-between select-none z-30 sticky top-0 gap-2 w-full">
      {/* Left: Brand & Project Selector */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 flex-shrink-0" title="Project Showcase Studio">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20 ring-1 ring-white/20 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-xs tracking-wider uppercase text-white/90 whitespace-nowrap hidden lg:inline">
            Studio
          </span>
        </div>

        <div className="h-4 w-[1px] bg-white/10 hidden lg:block"></div>

        {/* Project Selector Dropdown */}
        <div className="relative flex items-center flex-shrink-0">
          <FolderOpen className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />
          <select
            value={selectedProjectId}
            onChange={(e) => onSelectProject(e.target.value)}
            className="h-8 pl-7 pr-6 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-all cursor-pointer appearance-none max-w-[120px] sm:max-w-[150px] md:max-w-[175px] truncate whitespace-nowrap"
            title="Switch Project Deck"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0f141f] text-slate-200">
                {p.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 pointer-events-none" />
        </div>
      </div>

      {/* Center: Target Dimension & Canvas View Controls */}
      <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06] flex-shrink-0">
        <div className="relative flex items-center flex-shrink-0">
          <select
            value={presetKey}
            onChange={(e) => onSelectPreset(e.target.value)}
            className="h-7.5 px-2 rounded-lg bg-transparent text-xs font-medium text-slate-300 hover:text-white focus:outline-none cursor-pointer appearance-none pr-6"
            title="Canvas Dimension Preset"
          >
            {Object.entries(PRESETS).map(([key, val]) => (
              <option key={key} value={key} className="bg-[#0f141f] text-slate-200">
                {val.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1 pointer-events-none" />
        </div>

        <div className="h-3.5 w-[1px] bg-white/10 mx-0.5"></div>

        <button
          onClick={onToggleThumbnailPreview}
          className={`h-7.5 px-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
            isThumbnailPreview
              ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
          title="Thumbnail Preview Mode"
        >
          <Eye className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-[11px] font-medium leading-none whitespace-nowrap hidden sm:inline">Thumbnail</span>
        </button>

        {onToggleCenterGuides && (
          <button
            onClick={onToggleCenterGuides}
            className={`h-7.5 px-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
              showCenterGuides
                ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            title="Toggle horizontal & vertical visual center alignment guide lines"
          >
            <Crosshair className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-[11px] font-medium leading-none whitespace-nowrap hidden sm:inline">Guides</span>
          </button>
        )}
      </div>

      {/* Right: Actions & Export */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* Format Selector */}
        <select
          value={exportFormat}
          onChange={(e) => onSelectExportFormat(e.target.value)}
          className="h-8 px-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 focus:outline-none cursor-pointer whitespace-nowrap flex-shrink-0"
          title="Export Image Format"
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
            className="h-8 px-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 focus:outline-none cursor-pointer transition-colors whitespace-nowrap flex-shrink-0"
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
          className="hidden xl:flex h-8 items-center gap-1 px-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono font-bold text-emerald-400 whitespace-nowrap flex-shrink-0"
          title={`Estimated Export File Size: ~${estimatedSize} (${targetW * exportScale} × ${targetH * exportScale} px at ${exportScale}x ${exportFormat.toUpperCase()})`}
        >
          <span className="text-[9px] text-emerald-500/80 uppercase font-sans font-semibold">Size:</span>
          <span>~{estimatedSize}</span>
        </div>

        {/* Save to Project File (src/data/projectStore.json) */}
        <button
          onClick={onSaveToDisk}
          className={`h-8 px-2.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
            isDiskSaved
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
              : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-slate-200 hover:text-white'
          }`}
          title="Save all customized colors, sizes, and slides permanently to src/data/projectStore.json"
        >
          {isDiskSaved ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
              <span className="whitespace-nowrap">Saved</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="whitespace-nowrap">Save</span>
            </>
          )}
        </button>

        {/* Export Single Slide */}
        <button
          onClick={onExportCurrentSlide}
          disabled={isExporting}
          className="h-8 px-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap flex-shrink-0"
          title="Export Active Slide"
        >
          <Download className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="whitespace-nowrap">Export</span>
        </button>

        {/* 1-Click Save Deck to Folder & ZIP */}
        <button
          onClick={onExportAllSlides}
          disabled={isExporting}
          className="h-8 px-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50 ring-1 ring-white/20 whitespace-nowrap flex-shrink-0"
          title="Download all slides in packaged ZIP"
        >
          {isExporting ? (
            <>
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></span>
              <span className="whitespace-nowrap">{exportProgress || 'Processing...'}</span>
            </>
          ) : (
            <>
              <Archive className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">Save Deck (ZIP)</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
