/**
 * Centralized Top-Level Default Configuration for Showcase Studio Slides
 * Eliminates duplicate/conflicting default values across variant components.
 */

export const GLOBAL_CANVAS_DEFAULTS = {
  presetKey: 'WEBSITE_HD',
  exportFormat: 'png',
  backgroundColor: '#080a12',
  accentColor: '#6366f1',
  glowIntensity: 0.35,
  backgroundVariant: 'aurora',
  bgAlignment: 'behind_device',
  customBgImage: null,
  textureOverlay: 'dots',
  canvasRadius: 28,
};

export const COMMON_SLIDE_DEFAULTS = {
  textScale: 1,
  badgeSize: 12,
  featureSize: 12,
  techChipSize: 12,
  iconSize: 14,
  fontFamily: 'Plus Jakarta Sans',
  fontWeight: '800',
  titleGradient: 'metallic',
  titleColor: '#ffffff',
  titleGradientFrom: '#ffffff',
  titleGradientTo: '#818cf8',
  titleGradientAngle: 90,
  subtitleColor: '#cbd5e1',
  subtitleGradient: 'none',
  subtitleGradientFrom: '#cbd5e1',
  subtitleGradientTo: '#38bdf8',
  subtitleGradientAngle: 90,
  badgeColor: '#818cf8',
  featureColor: '#cbd5e1',
  eyebrowIcon: 'sparkles',
  eyebrowText: '',
  statusBadge: '',
  perspective: 1200,
  shadowStyle: 'dramatic',
  shadowIntensity: 0.8,
  screenReflection: true,
  deviceFinish: 'natural_titanium',
  frameGleam: true,
  deviceCornerRadius: 36,
  showStoreBadges: false,
  storeBadgeType: 'both',
  storeBadgeStyle: 'official',
  showTechIcons: true,
  techLogoVariant: 'icon',
  showMetricPill: false,
  metricText: '4.9 ★ Rating • 50K+ Downloads',
  metricIcon: 'star',
  metricStyle: 'gold',
  layoutAlign: 'left',
  layoutSplit: 48,
  autoScaleEnabled: true,
  autoScaleIntensity: 1.0,
  deviceAutoFit: true,
  offsetX: 0,
  offsetY: 0,
  rotation: 0,
};

export const VARIANT_SPECIFIC_DEFAULTS = {
  hero_cover: {
    titleSize: 52,
    subtitleSize: 18,
    deviceScale: 1,
    rotation: 0,
    tilt: true,
    tiltAngle: -8,
    pitchAngle: 4,
  },
  feature_deep_dive: {
    titleSize: 36,
    subtitleSize: 15,
    deviceScale: 1,
    rotation: 0,
    tilt: false,
    tiltAngle: 0,
    pitchAngle: 0,
  },
  dual_screen: {
    titleSize: 36,
    subtitleSize: 15,
    deviceScale: 0.9,
    rotation: -3,
    secondaryRotation: 3,
    tilt: false,
    tiltAngle: 0,
    pitchAngle: 0,
  },
  desktop_dashboard: {
    titleSize: 38,
    subtitleSize: 15,
    deviceScale: 1,
    tilt: false,
    tiltAngle: 0,
    pitchAngle: 0,
  },
  responsive_combo: {
    titleSize: 36,
    subtitleSize: 15,
    deviceScale: 1,
    tilt: false,
    tiltAngle: 0,
    pitchAngle: 0,
  },
  minimal_focus: {
    titleSize: 38,
    subtitleSize: 15,
    deviceScale: 1,
    tilt: false,
    tiltAngle: 0,
    pitchAngle: 0,
  },
};

/**
 * Returns a fully resolved slide object by applying:
 * 1. COMMON_SLIDE_DEFAULTS
 * 2. VARIANT_SPECIFIC_DEFAULTS for the slide's variant
 * 3. Any explicit slide properties saved on this specific slide
 */
export function resolveSlideProperties(slide = {}, project = {}) {
  const variant = slide.variant || 'hero_cover';
  const variantDefaults = VARIANT_SPECIFIC_DEFAULTS[variant] || VARIANT_SPECIFIC_DEFAULTS.hero_cover;

  return {
    ...COMMON_SLIDE_DEFAULTS,
    ...variantDefaults,
    ...slide,
    // Ensure titles/taglines fall back gracefully if empty
    title: slide.title !== undefined ? slide.title : (project.title || ''),
    tagline: slide.tagline !== undefined ? slide.tagline : (project.shortDescription || ''),
  };
}
