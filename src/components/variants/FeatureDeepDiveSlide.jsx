import React from 'react';
import DeviceMockup from '../DeviceMockup';
import { CheckCircle2, Zap, Shield, Cpu, Activity } from 'lucide-react';

const FEATURE_ICONS = [Zap, Shield, Cpu, Activity, CheckCircle2];

export default function FeatureDeepDiveSlide({
  slideData,
  projectData,
  textScale = 1,
  deviceScale = 1,
  accentColor = '#6366f1',
}) {
  const title = slideData.title || 'Core Architecture & Features';
  const features = slideData.features && slideData.features.length > 0
    ? slideData.features
    : (projectData.features || []).slice(0, 3);

  const platforms = projectData.platform || ['Android'];

  return (
    <div className="w-full h-full flex items-center justify-between px-16 py-12 relative overflow-hidden z-10">
      {/* Left Mockup (46%) */}
      <div className="w-[45%] flex items-center justify-center relative z-10">
        <DeviceMockup
          imageSrc={slideData.imageSrc}
          hasFrame={slideData.hasFrame}
          deviceType={slideData.deviceType || (platforms.includes('Desktop') ? 'desktop' : 'android')}
          tilt={false}
          scale={deviceScale}
        />
      </div>

      {/* Right Feature Cards (52%) */}
      <div className="w-[52%] flex flex-col justify-center items-start z-10 space-y-4">
        {/* Section Title */}
        <h2
          className="font-extrabold tracking-tight text-white mb-2"
          style={{ fontSize: `${Math.round(36 * textScale)}px` }}
        >
          {title}
        </h2>

        {/* Floating Feature Cards */}
        <div className="w-full space-y-3">
          {features.slice(0, 3).map((feat, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              <div
                key={i}
                className="w-full p-4 rounded-xl glass-card border border-white/10 flex items-start gap-3.5 transition-all shadow-lg"
              >
                <div
                  className="p-2.5 rounded-lg flex-shrink-0 text-white"
                  style={{ backgroundColor: `${accentColor}25`, border: `1px solid ${accentColor}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color: accentColor }} />
                </div>
                <div>
                  <h4
                    className="font-bold text-white leading-snug"
                    style={{ fontSize: `${Math.round(16 * textScale)}px` }}
                  >
                    Feature #{i + 1}
                  </h4>
                  <p
                    className="text-slate-300 mt-1 leading-relaxed"
                    style={{ fontSize: `${Math.round(14 * textScale)}px` }}
                  >
                    {feat}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
