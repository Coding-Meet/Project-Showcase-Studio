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

export const DEVICE_FINISHES = [
  {
    id: 'natural_titanium',
    name: 'Natural Titanium',
    chassisFill: '#827e78',
    bezelFill: '#4c4945',
    gradient: 'linear-gradient(135deg, #a39f98 0%, #5e5a55 100%)',
    border: '#9a968f',
  },
  {
    id: 'desert_titanium',
    name: 'Desert Titanium',
    chassisFill: '#ba9f86',
    bezelFill: '#6e5a48',
    gradient: 'linear-gradient(135deg, #dfc6ae 0%, #7d6550 100%)',
    border: '#cca88a',
  },
  {
    id: 'white_titanium',
    name: 'White Titanium',
    chassisFill: '#e2e4e8',
    bezelFill: '#8d9299',
    gradient: 'linear-gradient(135deg, #ffffff 0%, #9ba0a6 100%)',
    border: '#ffffff',
  },
  {
    id: 'black_titanium',
    name: 'Black Titanium',
    chassisFill: '#1f2024',
    bezelFill: '#0d0d0f',
    gradient: 'linear-gradient(135deg, #3d3e42 0%, #0d0e10 100%)',
    border: '#45474c',
  },
  {
    id: 'space_gray',
    name: 'Space Gray',
    chassisFill: '#5a5b61',
    bezelFill: '#2b2c30',
    gradient: 'linear-gradient(135deg, #787980 0%, #292a2d 100%)',
    border: '#8a8b92',
  },
  {
    id: 'silver_aluminum',
    name: 'Silver Aluminum',
    chassisFill: '#e8eaed',
    bezelFill: '#a6abb0',
    gradient: 'linear-gradient(135deg, #ffffff 0%, #b8bcc2 100%)',
    border: '#f1f3f4',
  },
  {
    id: 'midnight_navy',
    name: 'Midnight Navy',
    chassisFill: '#1e293b',
    bezelFill: '#0f172a',
    gradient: 'linear-gradient(135deg, #334155 0%, #090d16 100%)',
    border: '#38bdf8',
  },
  {
    id: 'emerald_green',
    name: 'Alpine Emerald',
    chassisFill: '#143827',
    bezelFill: '#081a11',
    gradient: 'linear-gradient(135deg, #1f573d 0%, #07170f 100%)',
    border: '#34d399',
  },
  {
    id: 'cosmic_orange',
    name: 'Cosmic Orange',
    chassisFill: '#ea580c',
    bezelFill: '#7c2d12',
    gradient: 'linear-gradient(135deg, #fb923c 0%, #9a3412 100%)',
    border: '#fdba74',
  },
  {
    id: 'rose_gold',
    name: 'Rose Gold',
    chassisFill: '#d48c8c',
    bezelFill: '#6e3838',
    gradient: 'linear-gradient(135deg, #f7b2b2 0%, #7d3f3f 100%)',
    border: '#ffe4e6',
  },
];

export const STORE_BADGE_OPTIONS = [
  { id: 'none', label: 'Hidden' },
  { id: 'both', label: 'App Store & Google Play' },
  { id: 'app_store', label: 'App Store Only' },
  { id: 'google_play', label: 'Google Play Only' },
];

export const STORE_BADGE_STYLES = [
  { id: 'official', label: 'Official Black' },
  { id: 'glass', label: 'Glassmorphism' },
];

export const METRIC_ICONS_LIST = [
  { id: 'star', label: 'Star Rating' },
  { id: 'download', label: 'Downloads' },
  { id: 'users', label: 'Active Users' },
  { id: 'github', label: 'GitHub Stars' },
  { id: 'shield', label: 'Enterprise Security' },
  { id: 'trophy', label: 'Award / Featured' },
  { id: 'bolt', label: 'High Performance' },
];

export const METRIC_STYLES = [
  { id: 'gold', label: 'Luxury Gold' },
  { id: 'emerald', label: 'Mint Emerald' },
  { id: 'indigo', label: 'Electric Indigo' },
  { id: 'glass', label: 'Frosted Glass' },
  { id: 'ruby', label: 'Ruby Red' },
];

