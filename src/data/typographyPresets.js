export const TEXT_GRADIENTS = {
  metallic: {
    id: 'metallic',
    label: 'Metallic Silver',
    className: 'bg-gradient-to-br from-white via-slate-100 to-slate-400',
    preview: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)',
  },
  cyber: {
    id: 'cyber',
    label: 'Cyber Violet',
    className: 'bg-gradient-to-r from-violet-200 via-fuchsia-300 to-indigo-400',
    preview: 'linear-gradient(90deg, #ddd6fe 0%, #f0abfc 50%, #818cf8 100%)',
  },
  sunset: {
    id: 'sunset',
    label: 'Sunset Gold',
    className: 'bg-gradient-to-r from-amber-200 via-orange-300 to-rose-400',
    preview: 'linear-gradient(90deg, #fde68a 0%, #fdba74 50%, #fb7185 100%)',
  },
  emerald: {
    id: 'emerald',
    label: 'Emerald Ice',
    className: 'bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-400',
    preview: 'linear-gradient(90deg, #a7f3d0 0%, #5eead4 50%, #22d3ee 100%)',
  },
  cyan: {
    id: 'cyan',
    label: 'Electric Cyan',
    className: 'bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400',
    preview: 'linear-gradient(90deg, #a5f3fc 0%, #7dd3fc 50%, #60a5fa 100%)',
  },
  gold: {
    id: 'gold',
    label: 'Luxury Gold',
    className: 'bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-500',
    preview: 'linear-gradient(90deg, #fef3c7 0%, #fde047 50%, #f59e0b 100%)',
  },
  rose: {
    id: 'rose',
    label: 'Neon Rose',
    className: 'bg-gradient-to-r from-rose-200 via-pink-300 to-rose-500',
    preview: 'linear-gradient(90deg, #fecdd3 0%, #f472b6 50%, #f43f5e 100%)',
  },
  ocean: {
    id: 'ocean',
    label: 'Deep Ocean',
    className: 'bg-gradient-to-r from-blue-200 via-indigo-300 to-cyan-400',
    preview: 'linear-gradient(90deg, #bfdbfe 0%, #a5b4fc 50%, #22d3ee 100%)',
  },
  custom: {
    id: 'custom',
    label: 'Custom Gradient',
    className: 'bg-clip-text text-transparent',
    preview: 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%)',
  },
  solid: {
    id: 'solid',
    label: 'Solid Color',
    className: 'solid',
    preview: '#ffffff',
  },
};

export const SOLID_COLOR_SWATCHES = [
  { name: 'Pure White', color: '#ffffff' },
  { name: 'Soft Platinum', color: '#f1f5f9' },
  { name: 'Light Slate', color: '#cbd5e1' },
  { name: 'Muted Slate', color: '#94a3b8' },
  { name: 'Cyber Cyan', color: '#38bdf8' },
  { name: 'Electric Violet', color: '#a855f7' },
  { name: 'Emerald Mint', color: '#34d399' },
  { name: 'Sunset Amber', color: '#fbbf24' },
  { name: 'Hot Rose', color: '#fb7185' },
  { name: 'Soft Gold', color: '#fde68a' },
  { name: 'Lavender', color: '#ddd6fe' },
];

/**
 * Resolves inline styles & classes for text gradients (presets or custom 2-color gradients)
 */
export function resolveTextGradientStyle({
  gradient,
  solidColor,
  customFrom,
  customTo,
  customAngle = 90,
}) {
  if (!gradient || gradient === 'solid' || gradient === 'none') {
    return {
      style: { color: solidColor || '#ffffff' },
      isGradient: false,
      className: '',
    };
  }

  if (gradient === 'custom') {
    const from = customFrom || '#ffffff';
    const to = customTo || '#818cf8';
    const angle = customAngle !== undefined ? customAngle : 90;
    const gradientCss = `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`;
    return {
      style: {
        backgroundImage: gradientCss,
        WebkitBackgroundImage: gradientCss,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      },
      isGradient: true,
      className: 'bg-clip-text text-transparent',
    };
  }

  const preset = TEXT_GRADIENTS[gradient];
  if (preset && preset.preview && preset.preview.startsWith('linear-gradient')) {
    return {
      style: {
        backgroundImage: preset.preview,
        WebkitBackgroundImage: preset.preview,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      },
      isGradient: true,
      className: `${preset.className || ''} bg-clip-text text-transparent`,
    };
  }

  return {
    style: { color: solidColor || '#ffffff' },
    isGradient: false,
    className: '',
  };
}
