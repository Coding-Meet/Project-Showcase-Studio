import {
  Sparkles,
  Flame,
  Star,
  Shield,
  Terminal,
} from 'lucide-react';

export const VARIANTS = [
  { id: 'hero_cover', label: 'Hero Cover', desc: 'Cover slide with 3D device' },
  { id: 'feature_deep_dive', label: 'Feature Deep-Dive', desc: 'Device + 3 floating cards' },
  { id: 'dual_screen', label: 'Dual Screen Flow', desc: '2 phones side-by-side' },
  { id: 'desktop_dashboard', label: 'Desktop Dashboard', desc: 'MacBook/Web screen' },
  { id: 'responsive_combo', label: 'Responsive Combo', desc: 'Desktop + mobile overlay' },
  { id: 'minimal_focus', label: 'Minimal Focus', desc: 'Large centered showcase' },
];

export const BG_VARIANTS = [
  { id: 'aurora', label: 'Aurora Mesh', desc: 'Soft ambient glow' },
  { id: 'spotlight', label: 'Spotlight Cone', desc: 'Aceternity diagonal ray' },
  { id: 'radial', label: 'Studio Radial', desc: 'Apple center backlight' },
  { id: 'grid', label: 'Cyber Grid', desc: 'Developer tech matrix' },
  { id: 'linear', label: 'Linear Gradient', desc: 'Smooth diagonal wash' },
];

export const COLOR_PRESETS = [
  { name: 'Indigo', bg: '#080a12', accent: '#6366f1' },
  { name: 'Emerald', bg: '#050f0e', accent: '#10b981' },
  { name: 'Violet', bg: '#0c0714', accent: '#a855f7' },
  { name: 'Orange', bg: '#100a06', accent: '#f97316' },
  { name: 'Cyan', bg: '#060d14', accent: '#06b6d4' },
  { name: 'Slate', bg: '#0e1117', accent: '#94a3b8' },
  { name: 'Obsidian', bg: '#000000', accent: '#38bdf8' },
];

export const FONTS = [
  { id: 'Plus Jakarta Sans', label: 'Jakarta Sans (Modern Clean)' },
  { id: 'Outfit', label: 'Outfit (Geometric Display)' },
  { id: 'Inter', label: 'Inter (Developer Tech)' },
  { id: 'Cabinet Grotesk', label: 'Cabinet (Heavy Bold)' },
  { id: 'Space Grotesk', label: 'Space (Cyberpunk)' },
  { id: 'Poppins', label: 'Poppins (Friendly Rounded)' },
  { id: 'JetBrains Mono', label: 'JetBrains (Developer Code)' },
];

export const WEIGHTS = [
  { id: '600', label: 'SemiBold' },
  { id: '700', label: 'Bold' },
  { id: '800', label: 'ExtraBold' },
  { id: '900', label: 'Black' },
];

export const EYEBROW_ICONS = [
  { id: 'sparkles', label: 'Sparkles', icon: Sparkles },
  { id: 'flame', label: 'Flame', icon: Flame },
  { id: 'star', label: 'Star', icon: Star },
  { id: 'shield', label: 'Shield', icon: Shield },
  { id: 'terminal', label: 'Terminal', icon: Terminal },
];
