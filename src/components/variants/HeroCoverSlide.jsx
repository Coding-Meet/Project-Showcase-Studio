import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { Sparkles, Layers } from 'lucide-react';

export default function HeroCoverSlide({
  slideData,
  projectData,
  textScale = 1,
  deviceScale = 1,
  accentColor = '#6366f1',
}) {
  const title = slideData.title || projectData.title || 'App Showcase';
  const tagline = slideData.tagline || projectData.shortDescription || 'Next-Generation Application Experience';
  const technologies = projectData.technologies || ['Kotlin', 'Compose', 'MVI'];
  const platforms = projectData.platform || ['Android'];

  return (
    <div className="w-full h-full flex items-center justify-between px-16 py-12 relative overflow-hidden z-10">
      {/* Left Content (45%) */}
      <div className="w-[48%] flex flex-col justify-center items-start z-10 space-y-6">
        {/* Category / Platform Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider glass-card text-white/90">
          <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span>{platforms.join(' • ')}</span>
        </div>

        {/* Big Bold Title */}
        <h1
          className="font-extrabold tracking-tight text-white leading-[1.1]"
          style={{ fontSize: `${Math.round(48 * textScale)}px` }}
        >
          {title}
        </h1>

        {/* Tagline / Subtitle */}
        <p
          className="text-slate-300 font-normal leading-relaxed max-w-[540px]"
          style={{ fontSize: `${Math.round(18 * textScale)}px` }}
        >
          {tagline}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {technologies.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-lg text-xs font-medium glass-card text-slate-200 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Right Mockup (52%) */}
      <div className="w-[50%] flex items-center justify-center relative z-10">
        <DeviceMockup
          imageSrc={slideData.imageSrc}
          hasFrame={slideData.hasFrame}
          deviceType={slideData.deviceType || (platforms.includes('Desktop') ? 'desktop' : 'android')}
          tilt={true}
          tiltAngle={-8}
          scale={deviceScale}
        />
      </div>
    </div>
  );
}
