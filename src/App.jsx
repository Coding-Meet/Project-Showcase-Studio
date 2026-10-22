import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SlideManager from './components/SlideManager';
import EditorSidebar from './components/EditorSidebar';
import CanvasStage, { PRESETS } from './components/CanvasStage';
import projectsData from './data/projects.json';
import { captureNode, downloadDataUrl, saveDeckToDiskAndZip } from './utils/exportEngine';
import { CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'project_showcase_studio_state_v1';

export default function App() {
  const [projects] = useState(projectsData);
  const [selectedProjectId, setSelectedProjectId] = useState(
    projects[0]?.id || 'news_kotlin_multiplatform_app'
  );

  const activeProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0] || {};

  // Deck Slides (3 to 7 slides)
  const [slides, setSlides] = useState(() => {
    return [
      {
        id: 'slide-1',
        variant: 'hero_cover',
        title: activeProject.title || '',
        tagline: activeProject.shortDescription || '',
        imageSrc: null,
        hasFrame: false,
        deviceType: activeProject.platform?.includes('Desktop') ? 'desktop' : 'android',
      },
      {
        id: 'slide-2',
        variant: 'feature_deep_dive',
        title: 'Core Architecture & Capabilities',
        tagline: 'Built with scalable patterns and modern tooling.',
        features: (activeProject.features || []).slice(0, 3),
        imageSrc: null,
        hasFrame: false,
        deviceType: activeProject.platform?.includes('Desktop') ? 'desktop' : 'android',
      },
      {
        id: 'slide-3',
        variant: activeProject.platform?.includes('Desktop')
          ? 'desktop_dashboard'
          : 'dual_screen',
        title: activeProject.platform?.includes('Desktop')
          ? 'Intuitive Workspace Diagnostics'
          : 'Seamless User Journey & Experience',
        tagline: 'Engineered for smooth navigation and reactive state management.',
        features: (activeProject.features || []).slice(3, 6),
        imageSrc: null,
        secondaryImageSrc: null,
        hasFrame: false,
        deviceType: 'android',
      },
    ];
  });

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Global Deck Settings
  const [presetKey, setPresetKey] = useState('WEBSITE_HD');
  const [exportFormat, setExportFormat] = useState('png');
  const [isThumbnailPreview, setIsThumbnailPreview] = useState(false);

  // Styling & Sizing State
  const [textScale, setTextScale] = useState(1);
  const [deviceScale, setDeviceScale] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState('#080a12');
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [glowIntensity, setGlowIntensity] = useState(0.35);

  // Export Progress & Toast State
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const canvasRef = useRef(null);

  // Load project change handler
  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    const proj = projects.find((p) => p.id === projectId);
    if (!proj) return;

    // Reset default slides tailored to this project
    const isDesktop = proj.platform?.includes('Desktop');
    setSlides([
      {
        id: 'slide-1',
        variant: isDesktop ? 'desktop_dashboard' : 'hero_cover',
        title: proj.title,
        tagline: proj.shortDescription,
        imageSrc: null,
        hasFrame: false,
        deviceType: isDesktop ? 'desktop' : 'android',
      },
      {
        id: 'slide-2',
        variant: 'feature_deep_dive',
        title: 'Key System Features',
        tagline: 'High-performance components designed for reliability.',
        features: (proj.features || []).slice(0, 3),
        imageSrc: null,
        hasFrame: false,
        deviceType: isDesktop ? 'desktop' : 'android',
      },
      {
        id: 'slide-3',
        variant: isDesktop ? 'minimal_focus' : 'dual_screen',
        title: 'Modern Architecture',
        tagline: 'Optimized data flow with reactive state management.',
        features: (proj.features || []).slice(3, 6),
        imageSrc: null,
        secondaryImageSrc: null,
        hasFrame: false,
        deviceType: 'android',
      },
    ]);
    setActiveSlideIndex(0);
  };

  // Update active slide
  const handleUpdateSlide = (patch) => {
    setSlides((prev) => {
      const copy = [...prev];
      copy[activeSlideIndex] = { ...copy[activeSlideIndex], ...patch };
      return copy;
    });
  };

  // Slide Manager Actions
  const handleAddSlide = () => {
    if (slides.length >= 7) return;
    const newSlide = {
      id: `slide-${Date.now()}`,
      variant: 'feature_deep_dive',
      title: 'Advanced Feature Spotlight',
      tagline: 'Detailed perspective into workflow performance.',
      features: (activeProject.features || []).slice(
        slides.length * 2,
        slides.length * 2 + 3
      ),
      imageSrc: null,
      hasFrame: false,
      deviceType: activeProject.platform?.includes('Desktop') ? 'desktop' : 'android',
    };
    setSlides((prev) => [...prev, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const handleDeleteSlide = (index) => {
    if (slides.length <= 3) return; // Min 3 required
    const nextSlides = slides.filter((_, i) => i !== index);
    setSlides(nextSlides);
    setActiveSlideIndex(Math.max(0, index - 1));
  };

  const handleDuplicateSlide = (index) => {
    if (slides.length >= 7) return;
    const cloned = { ...slides[index], id: `slide-${Date.now()}` };
    const nextSlides = [...slides];
    nextSlides.splice(index + 1, 0, cloned);
    setSlides(nextSlides);
    setActiveSlideIndex(index + 1);
  };

  // 1. Single Slide Export
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

  // 2. Full Deck Export (Saves directly to disk + ZIP download)
  const handleExportAllSlides = async () => {
    try {
      setIsExporting(true);
      const originalSlideIndex = activeSlideIndex;
      const renderedSlides = [];

      for (let i = 0; i < slides.length; i++) {
        setExportProgress(`Rendering Slide ${i + 1} of ${slides.length}...`);
        setActiveSlideIndex(i);
        // Allow DOM to update
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
        textScale,
        deviceScale,
        slides,
      };

      const backendRes = await saveDeckToDiskAndZip({
        projectName: activeProject.id,
        config,
        renderedSlides,
      });

      // Restore active slide
      setActiveSlideIndex(originalSlideIndex);

      if (backendRes?.folderPath) {
        showToast(
          `Deck saved directly to: exports/${activeProject.id}/ and downloaded as ZIP!`
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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const currentSlide = slides[activeSlideIndex] || slides[0] || {};

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#08090d]">
      {/* Top Header */}
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
      />

      {/* Slide Navigation Tabs */}
      <SlideManager
        slides={slides}
        activeSlideIndex={activeSlideIndex}
        onSelectSlide={setActiveSlideIndex}
        onAddSlide={handleAddSlide}
        onDeleteSlide={handleDeleteSlide}
        onDuplicateSlide={handleDuplicateSlide}
      />

      {/* Main Workspace: Sidebar Editor + Live Canvas */}
      <div className="flex flex-1 overflow-hidden relative">
        <EditorSidebar
          slide={currentSlide}
          project={activeProject}
          onUpdateSlide={handleUpdateSlide}
          textScale={textScale}
          onChangeTextScale={setTextScale}
          deviceScale={deviceScale}
          onChangeDeviceScale={setDeviceScale}
          backgroundColor={backgroundColor}
          onChangeBackgroundColor={setBackgroundColor}
          accentColor={accentColor}
          onChangeAccentColor={setAccentColor}
          glowIntensity={glowIntensity}
          onChangeGlowIntensity={setGlowIntensity}
        />

        <CanvasStage
          ref={canvasRef}
          slide={currentSlide}
          project={activeProject}
          presetKey={presetKey}
          textScale={textScale}
          deviceScale={deviceScale}
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          glowIntensity={glowIntensity}
          isThumbnailPreview={isThumbnailPreview}
        />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
