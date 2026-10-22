import React, { useId } from 'react';
import { Smartphone, Monitor, Tablet } from 'lucide-react';
import { getDeviceSpec } from '../data/deviceSpecs';
import { DEVICE_FINISHES } from './inspector/inspectorConstants';

export function normalizeImageSrc(src) {
  if (!src || typeof src !== 'string') return src;
  if (
    src.startsWith('data:') ||
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('blob:') ||
    src.startsWith('/')
  ) {
    return src;
  }
  // Local filesystem path or file:// URL
  if (
    src.startsWith('file://') ||
    src.startsWith('/Volumes') ||
    src.startsWith('/Users') ||
    src.startsWith('C:') ||
    src.includes(':\\')
  ) {
    return `http://localhost:3001/api/file?path=${encodeURIComponent(src.replace(/^file:\/\//, ''))}`;
  }
  return src;
}

export default function DeviceMockup({
  imageSrc,
  hasFrame = false,
  deviceType = 'google-pixel-9',
  deviceFinish = 'natural_titanium',
  frameGleam = true,
  deviceCornerRadius,
  tilt = false,
  tiltAngle = -8,
  pitchAngle = 4,
  perspective = 1200,
  shadowStyle = 'dramatic', // 'dramatic' | 'soft' | 'neon' | 'none'
  shadowIntensity = 0.8,
  screenReflection = true,
  accentColor = '#6366f1',
  scale = 1,
  offsetX = 0,
  offsetY = 0,
  className = '',
}) {
  const uniqueId = useId ? useId().replace(/[^a-zA-Z0-9_-]/g, '') : Math.random().toString(36).substring(7);
  const resolvedSrc = normalizeImageSrc(imageSrc);

  const finishObj =
    DEVICE_FINISHES.find((f) => f.id === deviceFinish) || DEVICE_FINISHES[0];


  if (!resolvedSrc) {
    const isDesktop = deviceType.includes('desktop');
    const isTablet = deviceType.includes('tablet') || deviceType.includes('ipad') || deviceType.includes('fold');
    return (
      <div
        className={`flex flex-col items-center justify-center border border-dashed border-white/20 rounded-2xl p-8 text-center text-slate-400 bg-white/[0.02] ${className}`}
        style={{
          transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`,
        }}
      >
        {isDesktop ? (
          <Monitor className="w-12 h-12 text-slate-500 mb-2.5 animate-pulse" />
        ) : isTablet ? (
          <Tablet className="w-12 h-12 text-slate-500 mb-2.5 animate-pulse" />
        ) : (
          <Smartphone className="w-12 h-12 text-slate-500 mb-2.5 animate-pulse" />
        )}
        <p className="font-semibold text-xs text-slate-300">No Screenshot Uploaded</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Upload in the sidebar inspector</p>
      </div>
    );
  }

  // Calculate Shadow CSS based on style and intensity
  let shadowCss = 'none';
  if (shadowStyle === 'dramatic') {
    shadowCss = `0 35px 70px -15px rgba(0, 0, 0, ${shadowIntensity}), 0 15px 30px -10px rgba(0, 0, 0, ${shadowIntensity * 0.8})`;
  } else if (shadowStyle === 'soft') {
    shadowCss = `0 25px 50px -12px rgba(0, 0, 0, ${shadowIntensity * 0.6})`;
  } else if (shadowStyle === 'neon') {
    shadowCss = `0 20px 60px -10px ${accentColor}${Math.round(shadowIntensity * 90).toString(16).padStart(2, '0')}, 0 10px 30px rgba(0, 0, 0, 0.9)`;
  }

  const transformStyle = {
    transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px) ${
      tilt ? `perspective(${perspective}px) rotateY(${tiltAngle}deg) rotateX(${pitchAngle}deg)` : ''
    }`,
    transformStyle: 'preserve-3d',
    transition: 'transform 0.25s ease',
  };

  // Reflection gloss overlay element
  const ReflectionOverlay = () =>
    screenReflection ? (
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 60%)',
        }}
      />
    ) : null;

  // 1. IMAGE ALREADY HAS A FRAME
  if (hasFrame) {
    const radius = deviceCornerRadius || 24;
    return (
      <div className={`relative inline-block ${className}`} style={transformStyle}>
        <div
          className="relative overflow-hidden ring-1 ring-white/10"
          style={{
            boxShadow: shadowCss,
            borderRadius: `${radius}px`,
            border: `2px solid ${finishObj.border}`,
          }}
        >
          <img
            src={resolvedSrc}
            alt="Device Screenshot"
            className="w-auto max-h-[520px] object-contain block select-none pointer-events-none"
            crossOrigin="anonymous"
          />
          <ReflectionOverlay />
          {frameGleam && (
            <div
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                boxShadow:
                  'inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.4), inset 1px 0 1px 0 rgba(255, 255, 255, 0.2)',
                borderRadius: `${radius}px`,
              }}
            />
          )}
        </div>
      </div>
    );
  }

  // 2. FRAMELESS CLEAN CARD
  if (deviceType === 'frameless') {
    const radius = deviceCornerRadius || 28;
    return (
      <div className={`relative inline-block ${className}`} style={transformStyle}>
        <div
          className="relative overflow-hidden bg-black"
          style={{
            boxShadow: shadowCss,
            borderRadius: `${radius}px`,
            border: `2.5px solid ${finishObj.border}`,
          }}
        >
          <img
            src={resolvedSrc}
            alt="Screenshot"
            className="w-auto max-h-[500px] object-cover block select-none pointer-events-none"
            crossOrigin="anonymous"
          />
          <ReflectionOverlay />
          {frameGleam && (
            <div
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                boxShadow:
                  'inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.45), inset 1px 0 1px 0 rgba(255, 255, 255, 0.25)',
                borderRadius: `${radius}px`,
              }}
            />
          )}
        </div>
      </div>
    );
  }

  // 3. AUTHENTIC VECTOR DEVICE SPEC FRAME
  const spec = getDeviceSpec(deviceType);
  const clipId = `screen-clip-${spec.id}-${uniqueId}`;
  const finishGradId = `finish-grad-${spec.id}-${uniqueId}`;
  const isDesktop = spec.kind === 'desktop';
  const isTablet = spec.kind === 'tablet' || spec.kind === 'foldable';
  const maxH = isDesktop ? 460 : isTablet ? 500 : 530;
  const aspect = spec.frameSize.width / spec.frameSize.height;
  const targetW = Math.round(maxH * aspect);
  const resolvedRadius = isDesktop ? 12 : deviceCornerRadius || 36;

  // Dynamically inject metallic titanium/aluminum chassis gradient into the device frame SVG
  let customizedBodySvg = spec.bodySvg;
  if (finishObj && !isDesktop) {
    customizedBodySvg = customizedBodySvg.replace(
      /fill="[^"]*"/,
      `fill="url(#${finishGradId})"`
    );
  }

  return (
    <div
      className={`relative ${isDesktop ? 'w-full max-w-[760px]' : 'inline-block'} ${className}`}
      style={transformStyle}
    >
      <div
        className={`relative overflow-hidden ${isDesktop ? 'w-full' : 'inline-block'}`}
        style={{
          boxShadow: shadowCss,
          borderRadius: `${resolvedRadius}px`,
        }}
      >
        <svg
          viewBox={`0 0 ${spec.frameSize.width} ${spec.frameSize.height}`}
          width={isDesktop ? '100%' : targetW}
          height={isDesktop ? undefined : maxH}
          style={{
            width: isDesktop ? '100%' : `${targetW}px`,
            height: isDesktop ? 'auto' : `${maxH}px`,
            maxHeight: `${maxH}px`,
            maxWidth: '100%',
            aspectRatio: `${spec.frameSize.width} / ${spec.frameSize.height}`,
            display: 'block',
          }}
          className="select-none pointer-events-none"
        >
          <defs>
            <clipPath id={clipId}>
              <path d={spec.screenPath} fillRule="nonzero" />
            </clipPath>

            {/* Specular Metallic Chassis Gradient */}
            <linearGradient
              id={finishGradId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={finishObj.border} />
              <stop offset="35%" stopColor={finishObj.chassisFill} />
              <stop offset="70%" stopColor={finishObj.bezelFill} />
              <stop offset="100%" stopColor={finishObj.border} />
            </linearGradient>
          </defs>

          {/* Device Frame Body (bezels, camera buttons, window bar) */}
          <g dangerouslySetInnerHTML={{ __html: customizedBodySvg }} />

          {/* Screenshot precisely placed at screenOffset and clipped to screenPath */}
          <g transform={`translate(${spec.screenOffset.x}, ${spec.screenOffset.y})`}>
            <g clipPath={`url(#${clipId})`}>
              <image
                href={resolvedSrc}
                xlinkHref={resolvedSrc}
                x="0"
                y="0"
                width={spec.portraitSize.width}
                height={spec.portraitSize.height}
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          </g>
        </svg>

        {/* Specular Rim Gleam */}
        {frameGleam && (
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              boxShadow: isDesktop
                ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)'
                : 'inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.45), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset -1px -1px 2px 0 rgba(0, 0, 0, 0.5)',
              borderRadius: `${resolvedRadius}px`,
            }}
          />
        )}

        <ReflectionOverlay />
      </div>
    </div>
  );
}
