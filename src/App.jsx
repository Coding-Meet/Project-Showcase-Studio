import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SlideDock from './components/SlideDock';
import InspectorSidebar from './components/InspectorSidebar';
import CanvasStage from './components/CanvasStage';
import projectsData from './data/projects.json';
import { captureNode, downloadDataUrl, saveDeckToDiskAndZip } from './utils/exportEngine';
import { resolveSlideProperties, GLOBAL_CANVAS_DEFAULTS } from './data/slideDefaults';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'showcase_studio_projects_cache_v2';

export default function App() {
  const [projects] = useState(projectsData);
  const [selectedProjectId, setSelectedProjectId] = useState(
    projects[0]?.id || 'news_kotlin_multiplatform_app'
  );

  const activeProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0] || {};

  // Per-Project Cache Store
  const [projectStore, setProjectStore] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Helper to create initial default slides for a project
  const createDefaultSlides = (proj) => {
    const isDesktop = proj.platform?.includes('Desktop');
    return [
      {
        id: 'slide-1',
        variant: isDesktop ? 'desktop_dashboard' : 'hero_cover',
        title: proj.title || '',
        tagline: proj.shortDescription || '',
        imageSrc: null,
        hasFrame: false,
        deviceType: isDesktop ? 'desktop' : 'android',
      },
      {
        id: 'slide-2',
        variant: 'feature_deep_dive',
        title: 'Core Architecture & Capabilities',
        tagline: 'Built with scalable patterns and modern tooling.',
        features: (proj.features || []).slice(0, 3),
        imageSrc: null,
        hasFrame: false,
        deviceType: isDesktop ? 'desktop' : 'android',
      },
      {
        id: 'slide-3',
        variant: isDesktop ? 'minimal_focus' : 'dual_screen',
        title: isDesktop
          ? 'Intuitive Workspace Diagnostics'
          : 'Seamless User Journey & Experience',
        tagline: 'Engineered for smooth navigation and reactive state management.',
        features: (proj.features || []).slice(3, 6),
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
  const [isThumbnailPreview, setIsThumbnailPreview] = useState(false);

  // Global Canvas Atmosphere & Lighting Settings
  const [backgroundColor, setBackgroundColor] = useState(initialData.backgroundColor || GLOBAL_CANVAS_DEFAULTS.backgroundColor);
  const [accentColor, setAccentColor] = useState(initialData.accentColor || GLOBAL_CANVAS_DEFAULTS.accentColor);
  const [glowIntensity, setGlowIntensity] = useState(initialData.glowIntensity ?? GLOBAL_CANVAS_DEFAULTS.glowIntensity);
  const [backgroundVariant, setBackgroundVariant] = useState(initialData.backgroundVariant || GLOBAL_CANVAS_DEFAULTS.backgroundVariant);
  const [bgAlignment, setBgAlignment] = useState(initialData.bgAlignment || GLOBAL_CANVAS_DEFAULTS.bgAlignment);
  const [customBgImage, setCustomBgImage] = useState(initialData.customBgImage || GLOBAL_CANVAS_DEFAULTS.customBgImage);
  const [textureOverlay, setTextureOverlay] = useState(initialData.textureOverlay || GLOBAL_CANVAS_DEFAULTS.textureOverlay);
  const [canvasRadius, setCanvasRadius] = useState(initialData.canvasRadius || GLOBAL_CANVAS_DEFAULTS.canvasRadius);

  // Export Progress & Toast State
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [isDiskSaved, setIsDiskSaved] = useState(true);

  const canvasRef = useRef(null);
  const isFirstSync = useRef(true);

  // Helper to apply stored settings to active state
  const applyProjectSnapshot = (saved, fallbackProject) => {
    if (saved) {
      if (saved.slides) setSlides(saved.slides);
      if (saved.presetKey) setPresetKey(saved.presetKey);
      if (saved.exportFormat) setExportFormat(saved.exportFormat);
      if (saved.backgroundColor) setBackgroundColor(saved.backgroundColor);
      if (saved.accentColor) setAccentColor(saved.accentColor);
      if (saved.glowIntensity !== undefined) setGlowIntensity(saved.glowIntensity);
      if (saved.backgroundVariant) setBackgroundVariant(saved.backgroundVariant);
      if (saved.bgAlignment) setBgAlignment(saved.bgAlignment);
      if (saved.customBgImage !== undefined) setCustomBgImage(saved.customBgImage);
      if (saved.textureOverlay) setTextureOverlay(saved.textureOverlay);
      if (saved.canvasRadius !== undefined) setCanvasRadius(saved.canvasRadius);
    } else if (fallbackProject) {
      setSlides(createDefaultSlides(fallbackProject));
      setBackgroundColor(GLOBAL_CANVAS_DEFAULTS.backgroundColor);
      setAccentColor(GLOBAL_CANVAS_DEFAULTS.accentColor);
    }
  };

  // Initial mount: load permanent store from disk & merge with localStorage
  useEffect(() => {
    async function loadDiskStore() {
      try {
        const res = await fetch('http://localhost:3001/api/project-store');
        if (res.ok) {
          const diskStore = await res.json();
          if (diskStore && typeof diskStore === 'object' && Object.keys(diskStore).length > 0) {
            setProjectStore((localStore) => {
              const merged = { ...diskStore, ...localStore };
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
              } catch (e) {}
              return merged;
            });
          }
        }
      } catch (err) {
        console.warn('Project store fetch from disk not available:', err);
      }
    }
    loadDiskStore();
  }, []);

  // Debounced auto-save to backend disk storage
  useEffect(() => {
    if (isFirstSync.current) {
      isFirstSync.current = false;
      return;
    }

    setIsDiskSaved(false);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch('http://localhost:3001/api/project-store', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectStore }),
        });
        if (res.ok) {
          setIsDiskSaved(true);
        }
      } catch (e) {
        // network or server offline
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [projectStore]);

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
    canvasRadius,
  ]);

  // SMART PROJECT SWITCHER: Preserves settings per project
  const handleSelectProject = (newProjectId) => {
    if (newProjectId === selectedProjectId) return;

    const nextProject = projects.find((p) => p.id === newProjectId);
    if (!nextProject) return;

    const saved = projectStore[newProjectId];
    applyProjectSnapshot(saved, nextProject);

    setSelectedProjectId(newProjectId);
    setActiveSlideIndex(0);
  };

  // UPDATE ONLY THE CURRENT ACTIVE SLIDE
  const handleUpdateSlide = (patch) => {
    setSlides((prev) => {
      const copy = [...prev];
      copy[activeSlideIndex] = { ...copy[activeSlideIndex], ...patch };
      return copy;
    });
  };

  const handleAddSlide = () => {
    if (slides.length >= 20) return;
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
    const nextSlides = slides.filter((_, i) => i !== index);
    setSlides(nextSlides);
    setActiveSlideIndex(Math.max(0, index - 1));
  };

  const handleDuplicateSlide = (index) => {
    if (slides.length >= 20) return;
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

      const dataUrl = await captureNode(target, exportFormat);
      const cleanTitle = (slides[activeSlideIndex]?.title || 'showcase_slide')
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '_');

      downloadDataUrl(
        dataUrl,
        `${activeProject.id}_slide_${activeSlideIndex + 1}_${cleanTitle}.${exportFormat}`
      );

      showToast(`Slide ${activeSlideIndex + 1} exported successfully!`);
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
          const dataUrl = await captureNode(target, exportFormat);
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
        backgroundColor,
        accentColor,
        backgroundVariant,
        bgAlignment,
        customBgImage,
        textureOverlay,
        canvasRadius,
        slides,
      };

      const backendRes = await saveDeckToDiskAndZip({
        projectName: activeProject.id,
        config,
        renderedSlides,
      });

      setActiveSlideIndex(originalSlideIndex);

      if (backendRes?.folderPath) {
        showToast(
          `Deck saved to: exports/${activeProject.id}/ and downloaded as ZIP!`
        );
      } else {
        showToast(`Deck exported as ZIP successfully!`);
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
        showToast('All customizations saved permanently to src/data/projectStore.json!');
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
        onSelectPreset={setPresetKey}
        isThumbnailPreview={isThumbnailPreview}
        onToggleThumbnailPreview={() => setIsThumbnailPreview(!isThumbnailPreview)}
        exportFormat={exportFormat}
        onSelectExportFormat={setExportFormat}
        onExportCurrentSlide={handleExportCurrentSlide}
        onExportAllSlides={handleExportAllSlides}
        isExporting={isExporting}
        exportProgress={exportProgress}
        isDiskSaved={isDiskSaved}
        onSaveToDisk={handleSaveToDisk}
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
            canvasRadius={canvasRadius}
            isThumbnailPreview={isThumbnailPreview}
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
          onChangeBackgroundColor={setBackgroundColor}
          accentColor={accentColor}
          onChangeAccentColor={setAccentColor}
          glowIntensity={glowIntensity}
          onChangeGlowIntensity={setGlowIntensity}
          backgroundVariant={backgroundVariant}
          onChangeBackgroundVariant={setBackgroundVariant}
          bgAlignment={bgAlignment}
          onChangeBgAlignment={setBgAlignment}
          customBgImage={customBgImage}
          onChangeCustomBgImage={setCustomBgImage}
          textureOverlay={textureOverlay}
          onChangeTextureOverlay={setTextureOverlay}
          canvasRadius={canvasRadius}
          onChangeCanvasRadius={setCanvasRadius}
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
