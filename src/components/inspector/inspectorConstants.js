import {
  Sparkles,
  Flame,
  Star,
  Shield,
  Terminal,
  Zap,
  Rocket,
  Award,
  Crown,
  Code,
  Globe,
  Cpu,
  Heart,
  Lock,
  CheckCircle2,
  TrendingUp,
  Layers,
  Smartphone,
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
  { id: 'linear', label: 'Linear Gradient', desc: 'Smooth directional wash' },
  { id: 'mesh_sunset', label: 'Sunset Glow', desc: 'Warm dual-tone ambience' },
  { id: 'cyber_rings', label: 'Concentric Rings', desc: 'Radar target circles' },
  { id: 'deep_void', label: 'Studio Vignette', desc: 'Deep minimal dropoff' },
  { id: 'split_horizon', label: 'Horizon Ray', desc: 'Cinematic horizontal beam' },
];

export const COLOR_PRESETS = [
  { name: 'Indigo Aura', bg: '#080a12', accent: '#6366f1' },
  { name: 'Emerald Mint', bg: '#050f0e', accent: '#10b981' },
  { name: 'Neon Violet', bg: '#0c0714', accent: '#a855f7' },
  { name: 'Sunset Amber', bg: '#100a06', accent: '#f97316' },
  { name: 'Electric Cyan', bg: '#060d14', accent: '#06b6d4' },
  { name: 'Slate Minimal', bg: '#0e1117', accent: '#94a3b8' },
  { name: 'Pure Obsidian', bg: '#000000', accent: '#38bdf8' },
  { name: 'Cyberpunk Rose', bg: '#0f050b', accent: '#f43f5e' },
  { name: 'Neon Lime', bg: '#080e05', accent: '#84cc16' },
  { name: 'Sapphire Deep', bg: '#030712', accent: '#3b82f6' },
  { name: 'Midnight Teal', bg: '#020f0f', accent: '#14b8a6' },
  { name: 'Luxury Gold', bg: '#100d04', accent: '#eab308' },
  { name: 'Lavender Mist', bg: '#0b0813', accent: '#c084fc' },
  { name: 'Ruby Crimson', bg: '#120407', accent: '#e11d48' },
  { name: 'Titanium Dark', bg: '#0a0a0c', accent: '#e2e8f0' },
  { name: 'Deep Space', bg: '#050510', accent: '#4f46e5' },
  { name: 'Matrix Forest', bg: '#040d06', accent: '#22c55e' },
  { name: 'Hot Coral', bg: '#120706', accent: '#fb7185' },
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
  { id: '400', label: 'Regular' },
  { id: '500', label: 'Medium' },
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
  { id: 'zap', label: 'Lightning', icon: Zap },
  { id: 'rocket', label: 'Rocket', icon: Rocket },
  { id: 'award', label: 'Award', icon: Award },
  { id: 'crown', label: 'Crown', icon: Crown },
  { id: 'code', label: 'Code', icon: Code },
  { id: 'globe', label: 'Globe', icon: Globe },
  { id: 'cpu', label: 'AI Engine', icon: Cpu },
  { id: 'heart', label: 'Loved', icon: Heart },
  { id: 'lock', label: 'Security', icon: Lock },
  { id: 'check', label: 'Verified', icon: CheckCircle2 },
  { id: 'trend', label: 'Growth', icon: TrendingUp },
  { id: 'layers', label: 'Architecture', icon: Layers },
  { id: 'phone', label: 'Mobile', icon: Smartphone },
];

export const EYEBROW_ICONS_MAP = Object.fromEntries(
  EYEBROW_ICONS.map((item) => [item.id, item.icon])
);
