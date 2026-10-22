import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { Terminal, HardDrive, Cpu, ShieldCheck } from 'lucide-react';

export default function DesktopDashboardSlide({
  slideData,
  projectData,
  textScale = 1,
  deviceScale = 1,
  accentColor = '#6366f1',
}) {
  const title = slideData.title || projectData.title || 'Cross-Platform Desktop Analysis';
  const tagline = slideData.tagline || projectData.shortDescription || 'Comprehensive insights, workspace diagnostics, and clean workflow execution.';
  const features = slideData.features && slideData.features.length > 0
    ? slideData.features
    : (projectData.features || []).slice(0, 3);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-16 py-10 relative overflow-hidden z-10">
      {/* Top Header */}
      <div className="text-center max-w-3xl z-10 space-y-1.5">
        <h2
          className="font-extrabold text-white tracking-tight leading-tight"
          style={{ fontSize: `${Math.round(34 * textScale)}px` }}
        >
          {title}
        </h2>
        <p
          className="text-slate-300 font-normal leading-relaxed line-clamp-2"
          style={{ fontSize: `${Math.round(14 * textScale)}px` }}
        >
          {tagline}
        </p>
      </div>

      {/* Center Desktop Mockup */}
      <div className="w-full flex items-center justify-center my-2 relative z-10">
        <DeviceMockup
          imageSrc={slideData.imageSrc}
          hasFrame={slideData.hasFrame}
          deviceType="desktop"
          tilt={false}
          scale={deviceScale}
        />
      </div>

      {/* Bottom 3 Feature Pillars */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-4xl z-10">
        {features.slice(0, 3).map((feat, i) => (
          <div
            key={i}
            className="p-3 rounded-lg glass-card border border-white/10 flex items-center gap-2.5 text-left"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: accentColor }}
            ></div>
            <p
              className="text-slate-200 text-xs font-medium leading-snug line-clamp-2"
              style={{ fontSize: `${Math.round(12 * textScale)}px` }}
            >
              {feat}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
