import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export default function DeviceMockup({
  imageSrc,
  hasFrame = false,
  deviceType = 'android', // 'android' | 'iphone' | 'desktop'
  tilt = false,
  tiltAngle = -8,
  scale = 1,
  className = '',
}) {
  if (!imageSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-2xl p-8 text-center text-slate-400 bg-white/[0.02] ${className}`}
        style={{ transform: `scale(${scale})` }}
      >
        {deviceType === 'desktop' ? (
          <Monitor className="w-12 h-12 text-slate-500 mb-3 animate-pulse" />
        ) : (
          <Smartphone className="w-12 h-12 text-slate-500 mb-3 animate-pulse" />
        )}
        <p className="font-semibold text-sm text-slate-300">No Screenshot Uploaded</p>
        <p className="text-xs text-slate-500 mt-1">Upload in the sidebar editor</p>
      </div>
    );
  }

  const transformStyle = {
    transform: `scale(${scale}) ${
      tilt ? `perspective(1200px) rotateY(${tiltAngle}deg) rotateX(4deg)` : ''
    }`,
    transformStyle: 'preserve-3d',
    transition: 'transform 0.3s ease',
  };

  // 1. IMAGE ALREADY HAS A FRAME
  if (hasFrame) {
    return (
      <div className={`relative inline-block ${className}`} style={transformStyle}>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/80 ring-1 ring-white/10">
          <img
            src={imageSrc}
            alt="Device Screenshot"
            className="w-auto max-h-[520px] object-contain block select-none pointer-events-none"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    );
  }

  // 2. RAW SCREENSHOT: WRAP IN FRAME
  if (deviceType === 'desktop') {
    return (
      <div className={`relative inline-block w-full max-w-[680px] ${className}`} style={transformStyle}>
        {/* Browser / Laptop Frame */}
        <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/90 border border-white/10 bg-[#161b26]">
          {/* Window Header Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0f141f] border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block"></span>
            </div>
            <div className="w-1/2 max-w-[240px] h-4 rounded bg-white/5 flex items-center justify-center text-[9px] text-slate-400 font-mono truncate px-2">
              app.localhost
            </div>
            <div className="w-10"></div>
          </div>
          {/* Screen Content */}
          <div className="relative bg-black max-h-[420px] overflow-hidden flex items-center justify-center">
            <img
              src={imageSrc}
              alt="Desktop Screenshot"
              className="w-full h-auto object-cover max-h-[420px] select-none pointer-events-none"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>
    );
  }

  // 3. IPHONE 16 PRO FRAME
  if (deviceType === 'iphone') {
    return (
      <div className={`relative inline-block ${className}`} style={transformStyle}>
        <div className="relative rounded-[46px] p-2.5 bg-gradient-to-b from-[#3a3a40] via-[#222228] to-[#121216] shadow-2xl shadow-black/90 ring-1 ring-white/20">
          {/* Inner bezel */}
          <div className="relative rounded-[38px] overflow-hidden bg-black max-h-[520px]">
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20 flex items-center justify-end pr-2 gap-1.5 ring-1 ring-white/10">
              <span className="w-2 h-2 rounded-full bg-[#0a1020] border border-white/10"></span>
            </div>
            {/* Screenshot */}
            <img
              src={imageSrc}
              alt="iPhone Screenshot"
              className="w-auto max-h-[500px] object-cover block select-none pointer-events-none"
              crossOrigin="anonymous"
            />
            {/* Home indicator bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-20"></div>
          </div>
        </div>
      </div>
    );
  }

  // 4. ANDROID (PIXEL STYLE) FRAME (Default)
  return (
    <div className={`relative inline-block ${className}`} style={transformStyle}>
      <div className="relative rounded-[40px] p-2 bg-gradient-to-b from-[#2a2d36] to-[#101217] shadow-2xl shadow-black/90 ring-1 ring-white/15">
        <div className="relative rounded-[32px] overflow-hidden bg-black max-h-[520px]">
          {/* Punch Hole Camera */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-20 ring-1 ring-white/10 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d1424]"></span>
          </div>
          {/* Screenshot */}
          <img
            src={imageSrc}
            alt="Android Screenshot"
            className="w-auto max-h-[500px] object-cover block select-none pointer-events-none"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </div>
  );
}
