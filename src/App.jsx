import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SlideDock from './components/SlideDock';
import InspectorSidebar from './components/InspectorSidebar';
import CanvasStage from './components/CanvasStage';
import {
  captureNode,
  downloadDataUrl,
  saveDeckToDiskAndZip,
  getDataUrlByteSize,
  formatByteSize,
} from './utils/exportEngine';
import { resolveSlideProperties, GLOBAL_CANVAS_DEFAULTS } from './data/slideDefaults';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'showcase_studio_projects_cache_v2';

// Dynamically load all modular project decks at build-time
const deckFiles = import.meta.glob('./data/decks/*.json', { eager: true });
const parsedProjects = [];
const bundledProjectStore = {};

for (const [filePath, mod] of Object.entries(deckFiles)) {
  const data = mod.default || mod;
  const pid = data.id || filePath.split('/').pop().replace('.json', '');
  const fallbackTitle = pid
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  parsedProjects.push({
    id: pid,
    title: data.title || data.slides?.[0]?.title || fallbackTitle,
    shortDescription: data.shortDescription || (data.slides?.[0]?.tagline) || '',
    features: data.features || (data.slides?.[1]?.featureList) || [],
    technologies: data.technologies || (data.slides?.[0]?.technologies) || [],
    platform: data.platform || [],
    primaryColor: data.primaryColor || '#6366f1',
    secondaryColor: data.secondaryColor || '#38bdf8'
  });
  bundledProjectStore[pid] = data;
}

const defaultProjectId = parsedProjects[0]?.id || 'news_kotlin_multiplatform_app';

export default function App() {
  const [projects] = useState(parsedProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(defaultProjectId);

  const activeProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0] || {};

  // Per-Project Cache Store - initialized with bundled decks and merged with localStorage
  const [projectStore, setProjectStore] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...bundledProjectStore, ...JSON.parse(saved) };
      }
    } catch (e) {}
    return bundledProjectStore;
  });

  // Helper to create initial default slides for a project
  const createDefaultSlides = (proj) => {
    const isDesktop = proj.platform?.includes('Desktop') && !proj.platform?.includes('Android');
    const prim = proj.primaryColor || '#6366f1';
    const sec = proj.secondaryColor || '#38bdf8';
    return [
      {
        id: 'slide-1',
        variant: isDesktop ? 'desktop_dashboard' : 'hero_cover',
        title: proj.title || '',
        tagline: proj.shortDescription || '',
        titleColor: '#ffffff',
        titleGradient: 'custom',
        titleGradientFrom: '#ffffff',
        titleGradientTo: prim,
        subtitleGradientTo: sec,
        accentColor: prim,
        badgeColor: prim,
        eyebrowText: proj.platform?.includes('iOS') ? 'Kotlin Multiplatform' : 'Android Engineering',
        eyebrowIcon: 'sparkles',
        statusBadge: '⭐ Production Ready • Clean MVVM',
        technologies: (proj.technologies || []).slice(0, 6),
        techLogoVariant: 'icon',
        showTechIcons: true,
        showStoreBadges: !isDesktop,
        storeBadgeType: proj.platform?.includes('iOS') ? 'both' : 'google_play',
        imageSrc: null,
        hasFrame: false,
        deviceType: isDesktop ? 'desktop' : 'android',
      },
      {
        id: 'slide-2',
        variant: 'feature_deep_dive',
        title: 'Core Architecture & Capabilities',
        tagline: 'Built with scalable patterns and modern tooling.',
        titleColor: '#ffffff',
        titleGradientTo: prim,
        subtitleGradientTo: sec,
        accentColor: prim,
        badgeColor: prim,
        features: (proj.features || []).slice(0, 3),
        technologies: (proj.technologies || []).slice(0, 6),
        showTechIcons: true,
        imageSrc: null,
        hasFrame: false,
        deviceType: isDesktop ? 'desktop' : 'android',
      },
      {
        id: 'slide-3',
        variant: isDesktop ? 'minimal_focus' : (proj.platform?.length > 1 ? 'responsive_combo' : 'dual_screen'),
        title: isDesktop
          ? 'Intuitive Workspace Diagnostics'
          : 'Seamless User Journey & Experience',
        tagline: 'Engineered for smooth navigation and reactive state management.',
        titleColor: '#ffffff',
        titleGradientTo: prim,
        subtitleGradientTo: sec,
        accentColor: prim,
        badgeColor: prim,
        platforms: proj.platform || ['Android'],
        features: (proj.features || []).slice(3, 6),
        technologies: (proj.technologies || []).slice(0, 6),
        showTechIcons: true,
        imageSrc: null,
        secondaryImageSrc: null,
        hasFrame: false,
        deviceType: 'android',
      },
    ];
  };

  // Active Project State (Loaded from store if exists, otherwise defaults)
  const initialData = projectStore[selectedProjectId] || {};

  const [slides, setSlides] = useState(() => initialData.slides || createDefaultSlides(activeProject));
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Global Presets & Formats
  const [presetKey, setPresetKey] = useState(initialData.presetKey || GLOBAL_CANVAS_DEFAULTS.presetKey);
  const [exportFormat, setExportFormat] = useState(initialData.exportFormat || GLOBAL_CANVAS_DEFAULTS.exportFormat);
  const [exportScale, setExportScale] = useState(initialData.exportScale || 2);
  const [exportQuality, setExportQuality] = useState(initialData.exportQuality !== undefined ? initialData.exportQuality : 1.0);
  const [isThumbnailPreview, setIsThumbnailPreview] = useState(false);
  const [showCenterGuides, setShowCenterGuides] = useState(false);

  // Global Canvas Atmosphere & Lighting Settings
  const [backgroundColor, setBackgroundColor] = useState(initialData.backgroundColor || GLOBAL_CANVAS_DEFAULTS.backgroundColor);
  const [accentColor, setAccentColor] = useState(initialData.accentColor || GLOBAL_CANVAS_DEFAULTS.accentColor);
  const [glowIntensity, setGlowIntensity] = useState(initialData.glowIntensity ?? GLOBAL_CANVAS_DEFAULTS.glowIntensity);
  const [backgroundVariant, setBackgroundVariant] = useState(initialData.backgroundVariant || GLOBAL_CANVAS_DEFAULTS.backgroundVariant);
  const [bgAlignment, setBgAlignment] = useState(initialData.bgAlignment || GLOBAL_CANVAS_DEFAULTS.bgAlignment);
  const [customBgImage, setCustomBgImage] = useState(initialData.customBgImage || GLOBAL_CANVAS_DEFAULTS.customBgImage);
  const [textureOverlay, setTextureOverlay] = useState(initialData.textureOverlay || GLOBAL_CANVAS_DEFAULTS.textureOverlay);
  const [textureOpacity, setTextureOpacity] = useState(initialData.textureOpacity ?? GLOBAL_CANVAS_DEFAULTS.textureOpacity);
  const [canvasRadius, setCanvasRadius] = useState(initialData.canvasRadius || GLOBAL_CANVAS_DEFAULTS.canvasRadius);

  // Export Progress & Toast State
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [isDiskSaved, setIsDiskSaved] = useState(true);

  const canvasRef = useRef(null);
  const isFirstSync = useRef(true);
  const userHasModified = useRef(false);

  // Helper to apply stored settings to active state
  const applyProjectSnapshot = (saved, fallbackProject) => {
    userHasModified.current = false;
    if (saved) {
      if (saved.slides) setSlides(saved.slides);
      if (saved.presetKey) setPresetKey(saved.presetKey);
      if (saved.exportFormat) setExportFormat(saved.exportFormat);
      if (saved.exportScale) setExportScale(saved.exportScale);
      if (saved.exportQuality !== undefined) setExportQuality(saved.exportQuality);
      if (saved.backgroundColor) setBackgroundColor(saved.backgroundColor);
      if (saved.accentColor) setAccentColor(saved.accentColor);
      if (saved.glowIntensity !== undefined) setGlowIntensity(saved.glowIntensity);
      if (saved.backgroundVariant) setBackgroundVariant(saved.backgroundVariant);
      if (saved.bgAlignment) setBgAlignment(saved.bgAlignment);
      if (saved.customBgImage !== undefined) setCustomBgImage(saved.customBgImage);
      if (saved.textureOverlay) setTextureOverlay(saved.textureOverlay);
      if (saved.textureOpacity !== undefined) setTextureOpacity(saved.textureOpacity);
      if (saved.canvasRadius !== undefined) setCanvasRadius(saved.canvasRadius);
    } else if (fallbackProject) {
      setSlides(createDefaultSlides(fallbackProject));
      setBackgroundColor(GLOBAL_CANVAS_DEFAULTS.backgroundColor);
      setAccentColor(GLOBAL_CANVAS_DEFAULTS.accentColor);
    }
  };

  // Helper to wrap canvas property setters so they mark user modification
  const modifyCanvas = (setter) => (val) => {
    userHasModified.current = true;
    setter(val);
  };

  // Initial mount: load permanent store from disk (Disk is the single source of truth)
  useEffect(() => {
    async function loadDiskStore() {
      try {
        const res = await fetch('http://localhost:3001/api/project-store');
        if (res.ok) {
          const diskStore = await res.json();
          if (diskStore && typeof diskStore === 'object' && Object.keys(diskStore).length > 0) {
            setProjectStore(diskStore);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(diskStore));
            } catch (e) {}

            // Immediately apply the disk file to active project state
            if (diskStore[selectedProjectId]) {
              applyProjectSnapshot(diskStore[selectedProjectId], activeProject);
            }
          }
        }
      } catch (err) {
        console.warn('Project store fetch from disk not available:', err);
      }
    }
    loadDiskStore();
  }, []);

  // Auto-reload from disk when returning to the browser window from external editor
  useEffect(() => {
    const onWindowFocus = async () => {
      // Only auto-reload if the user hasn't made unsaved edits inside the browser
      if (!userHasModified.current) {
        try {
          const res = await fetch(`http://localhost:3001/api/project-store/${selectedProjectId}`);
          if (res.ok) {
            const diskDeck = await res.json();
            applyProjectSnapshot(diskDeck, activeProject);
          }
        } catch (e) {}
      }
    };
    window.addEventListener('focus', onWindowFocus);
    return () => window.removeEventListener('focus', onWindowFocus);
  }, [selectedProjectId, activeProject]);

  // Debounced auto-save to backend disk storage: ONLY when user has modified in browser
  useEffect(() => {
    if (isFirstSync.current) {
      isFirstSync.current = false;
      return;
    }

    if (!userHasModified.current) {
      // Do NOT overwrite external file edits if user didn't make edits in the browser!
      return;
    }

    setIsDiskSaved(false);
    const timer = setTimeout(async () => {
      try {
        const currentProjectSnapshot = projectStore[selectedProjectId];
        if (!currentProjectSnapshot) return;

        // Save ONLY the active project to its own file in src/data/decks/<projectId>.json
        const res = await fetch(`http://localhost:3001/api/project-store/${selectedProjectId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentProjectSnapshot),
        });
        if (res.ok) {
          setIsDiskSaved(true);
          userHasModified.current = false;
        }
      } catch (e) {
        // network or server offline
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [projectStore, selectedProjectId]);

  // Auto-sync active state to per-project cache (localStorage + reactive state)
  useEffect(() => {
    const currentProjectSnapshot = {
      slides,
      presetKey,
      exportFormat,
      backgroundColor,
      accentColor,
      glowIntensity,
      backgroundVariant,
      bgAlignment,
      customBgImage,
      textureOverlay,
      textureOpacity,
      canvasRadius,
    };

    setProjectStore((prev) => {
      const updated = { ...prev, [selectedProjectId]: currentProjectSnapshot };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, [
    selectedProjectId,
    slides,
    presetKey,
    exportFormat,
    backgroundColor,
    accentColor,
    glowIntensity,
    backgroundVariant,
    bgAlignment,
    customBgImage,
    textureOverlay,
    textureOpacity,
    canvasRadius,
  ]);

  // SMART PROJECT SWITCHER: Loads fresh from disk on project selection
  const handleSelectProject = async (newProjectId) => {
    if (newProjectId === selectedProjectId) return;

    const nextProject = projects.find((p) => p.id === newProjectId);
    if (!nextProject) return;

    setSelectedProjectId(newProjectId);
    setActiveSlideIndex(0);

    // Fetch fresh directly from disk file
    try {
      const res = await fetch(`http://localhost:3001/api/project-store/${newProjectId}`);
      if (res.ok) {
        const diskDeck = await res.json();
        applyProjectSnapshot(diskDeck, nextProject);
        return;
      }
    } catch (e) {}

    const saved = projectStore[newProjectId];
    applyProjectSnapshot(saved, nextProject);
  };

  // Manual Reload from disk (discards any unsaved in-browser state and pulls fresh file)
  const handleReloadFromDisk = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/project-store/${selectedProjectId}`);
      if (res.ok) {
        const diskDeck = await res.json();
        applyProjectSnapshot(diskDeck, activeProject);
        userHasModified.current = false;
        setIsDiskSaved(true);
        showToast(`Reloaded ${activeProject.title || selectedProjectId} directly from disk!`);
      } else {
        showToast(`Could not load ${selectedProjectId}.json from disk`);
      }
    } catch (e) {
      showToast('Error reloading from disk: ' + e.message);
    }
  };

  // UPDATE ONLY THE CURRENT ACTIVE SLIDE
  const handleUpdateSlide = (patch) => {
    userHasModified.current = true;
    setSlides((prev) => {
      const copy = [...prev];
      copy[activeSlideIndex] = { ...copy[activeSlideIndex], ...patch };
      return copy;
    });
  };

  const handleAddSlide = () => {
    if (slides.length >= 20) return;
    userHasModified.current = true;
    const newSlide = {
      id: `slide-${Date.now()}`,
      variant: 'feature_deep_dive',
      title: 'Advanced Feature Spotlight',
      tagline: 'Detailed perspective into workflow performance.',
      features: (activeProject.features || []).slice(
        (slides.length % 5) * 2,
        (slides.length % 5) * 2 + 3
      ),
      imageSrc: null,
      hasFrame: false,
      deviceType: activeProject.platform?.includes('Desktop') ? 'desktop' : 'android',
    };
    setSlides((prev) => [...prev, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const handleDeleteSlide = (index) => {
    if (slides.length <= 3) return;
    userHasModified.current = true;
    const nextSlides = slides.filter((_, i) => i !== index);
    setSlides(nextSlides);
    setActiveSlideIndex(Math.max(0, index - 1));
  };

  const handleDuplicateSlide = (index) => {
    if (slides.length >= 20) return;
    userHasModified.current = true;
    const cloned = { ...slides[index], id: `slide-${Date.now()}` };
    const nextSlides = [...slides];
    nextSlides.splice(index + 1, 0, cloned);
    setSlides(nextSlides);
    setActiveSlideIndex(index + 1);
  };

  const handleExportCurrentSlide = async () => {
    try {
      setIsExporting(true);
      setExportProgress('Rendering Slide...');
      const target = document.getElementById('showcase-canvas-target');
      if (!target) return;

      const dataUrl = await captureNode(target, exportFormat, undefined, undefined, {
        pixelRatio: exportScale,
        quality: exportQuality,
      });
      const cleanTitle = (slides[activeSlideIndex]?.title || 'showcase_slide')
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '_');

      downloadDataUrl(
        dataUrl,
        `${activeProject.id}_slide_${activeSlideIndex + 1}_${cleanTitle}.${exportFormat}`
      );

      const actualBytes = getDataUrlByteSize(dataUrl);
      const actualSizeStr = formatByteSize(actualBytes);
      showToast(
        `Slide ${activeSlideIndex + 1} exported! (${actualSizeStr} • ${exportScale}x • ${exportFormat.toUpperCase()})`
      );
    } catch (err) {
      console.error(err);
      alert('Export failed: ' + err.message);
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const handleExportAllSlides = async () => {
    try {
      setIsExporting(true);
      const originalSlideIndex = activeSlideIndex;
      const renderedSlides = [];

      for (let i = 0; i < slides.length; i++) {
        setExportProgress(`Rendering Slide ${i + 1} of ${slides.length}...`);
        setActiveSlideIndex(i);
        await new Promise((r) => setTimeout(r, 300));

        const target = document.getElementById('showcase-canvas-target');
        if (target) {
          const dataUrl = await captureNode(target, exportFormat, undefined, undefined, {
            pixelRatio: exportScale,
            quality: exportQuality,
          });
          renderedSlides.push({
            title: slides[i].title || `slide_${i + 1}`,
            dataUrl,
            format: exportFormat,
          });
        }
      }

      setExportProgress('Packaging Deck & Saving to Folder...');
      const config = {
        projectId: activeProject.id,
        title: activeProject.title,
        platformPreset: presetKey,
        exportFormat,
        exportScale,
        exportQuality,
        backgroundColor,
        accentColor,
        backgroundVariant,
        bgAlignment,
        customBgImage,
        textureOverlay,
        textureOpacity,
        canvasRadius,
        slides,
      };

      const backendRes = await saveDeckToDiskAndZip({
        projectName: activeProject.id,
        config,
        renderedSlides,
      });

      setActiveSlideIndex(originalSlideIndex);

      let totalDeckBytes = 0;
      renderedSlides.forEach((s) => {
        if (s.dataUrl) totalDeckBytes += getDataUrlByteSize(s.dataUrl);
      });
      const deckSizeStr = formatByteSize(totalDeckBytes);

      if (backendRes?.folderPath) {
        showToast(
          `Deck saved! (${renderedSlides.length} slides • ${deckSizeStr}) in exports/${activeProject.id}/ and ZIP!`
        );
      } else {
        showToast(`Deck exported as ZIP! (${renderedSlides.length} slides • ${deckSizeStr})`);
      }
    } catch (err) {
      console.error('Batch export failed:', err);
      alert('Batch export failed: ' + err.message);
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const handleSaveToDisk = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/project-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectStore }),
      });
      if (res.ok) {
        setIsDiskSaved(true);
        showToast('All customizations saved permanently to individual files in src/data/decks/!');
      } else {
        const err = await res.json();
        alert('Failed to save to disk: ' + (err.error || 'Unknown error'));
      }
    } catch (e) {
      console.error(e);
      alert('Backend server not responding on port 3001: ' + e.message);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Get active slide and resolve all its properties using centralized top-level defaults
  const currentSlide = slides[activeSlideIndex] || slides[0] || {};
  const resolvedCurrentSlide = resolveSlideProperties(currentSlide, activeProject);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#07090e]">
      {/* Sleek Minimalist Header */}
      <Header
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={handleSelectProject}
        presetKey={presetKey}
        onSelectPreset={modifyCanvas(setPresetKey)}
        isThumbnailPreview={isThumbnailPreview}
        onToggleThumbnailPreview={() => setIsThumbnailPreview(!isThumbnailPreview)}
        showCenterGuides={showCenterGuides}
        onToggleCenterGuides={() => setShowCenterGuides(!showCenterGuides)}
        exportFormat={exportFormat}
        onSelectExportFormat={modifyCanvas(setExportFormat)}
        exportScale={exportScale}
        onSelectExportScale={modifyCanvas(setExportScale)}
        exportQuality={exportQuality}
        onSelectExportQuality={modifyCanvas(setExportQuality)}
        onExportCurrentSlide={handleExportCurrentSlide}
        onExportAllSlides={handleExportAllSlides}
        isExporting={isExporting}
        exportProgress={exportProgress}
        isDiskSaved={isDiskSaved}
        onSaveToDisk={handleSaveToDisk}
        onReloadFromDisk={handleReloadFromDisk}
      />

      {/* Main Studio Workspace: Canvas (Hero) + Right Categorized Inspector */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Canvas Stage */}
        <div className="flex-1 h-full flex flex-col relative overflow-hidden">
          <CanvasStage
            ref={canvasRef}
            slide={resolvedCurrentSlide}
            project={activeProject}
            presetKey={presetKey}
            backgroundColor={backgroundColor}
            accentColor={accentColor}
            glowIntensity={glowIntensity}
            backgroundVariant={backgroundVariant}
            bgAlignment={bgAlignment}
            customBgImage={customBgImage}
            textureOverlay={textureOverlay}
            textureOpacity={textureOpacity}
            canvasRadius={canvasRadius}
            isThumbnailPreview={isThumbnailPreview}
            showCenterGuides={showCenterGuides && !isExporting}
          />

          {/* Floating Bottom Slide Dock */}
          <SlideDock
            slides={slides}
            activeSlideIndex={activeSlideIndex}
            onSelectSlide={setActiveSlideIndex}
            onAddSlide={handleAddSlide}
            onDeleteSlide={handleDeleteSlide}
            onDuplicateSlide={handleDuplicateSlide}
          />
        </div>

        {/* Categorized Inspector Sidebar - Directly controls the selected slide */}
        <InspectorSidebar
          slide={resolvedCurrentSlide}
          project={activeProject}
          onUpdateSlide={handleUpdateSlide}
          backgroundColor={backgroundColor}
          onChangeBackgroundColor={modifyCanvas(setBackgroundColor)}
          accentColor={accentColor}
          onChangeAccentColor={modifyCanvas(setAccentColor)}
          glowIntensity={glowIntensity}
          onChangeGlowIntensity={modifyCanvas(setGlowIntensity)}
          backgroundVariant={backgroundVariant}
          onChangeBackgroundVariant={modifyCanvas(setBackgroundVariant)}
          bgAlignment={bgAlignment}
          onChangeBgAlignment={modifyCanvas(setBgAlignment)}
          customBgImage={customBgImage}
          onChangeCustomBgImage={modifyCanvas(setCustomBgImage)}
          textureOverlay={textureOverlay}
          onChangeTextureOverlay={modifyCanvas(setTextureOverlay)}
          textureOpacity={textureOpacity}
          onChangeTextureOpacity={modifyCanvas(setTextureOpacity)}
          canvasRadius={canvasRadius}
          onChangeCanvasRadius={modifyCanvas(setCanvasRadius)}
          exportScale={exportScale}
          onChangeExportScale={modifyCanvas(setExportScale)}
          exportQuality={exportQuality}
          onChangeExportQuality={modifyCanvas(setExportQuality)}
          exportFormat={exportFormat}
          onChangeExportFormat={modifyCanvas(setExportFormat)}
          presetKey={presetKey}
          showCenterGuides={showCenterGuides}
          onToggleCenterGuides={() => setShowCenterGuides(!showCenterGuides)}
        />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-2xl flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
