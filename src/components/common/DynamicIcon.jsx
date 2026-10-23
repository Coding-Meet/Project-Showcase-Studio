import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * Universal Dynamic Icon Renderer for Lucide Icons
 * Accepts any icon name (e.g. 'sparkles', 'flame', 'terminal', 'cpu', 'check_circle_2', 'bar-chart-3', etc.)
 * Resolves to the correct Lucide icon component with safe fallback.
 */

// Custom manual aliases for legacy or hyphenated names
const ICON_ALIASES = {
  check: 'CheckCircle2',
  trend: 'TrendingUp',
  phone: 'Smartphone',
  lightning: 'Zap',
  star: 'Star',
  download: 'Download',
  users: 'Users',
  trophy: 'Trophy',
  bolt: 'Zap',
  github: 'Code',
};

function toPascal(str) {
  if (!str) return '';
  return str
    .replace(/[-_ ]+(\w)/g, (_, c) => c.toUpperCase())
    .replace(/^(\w)/, (_, c) => c.toUpperCase());
}

export default function DynamicIcon({ name, className = 'w-4 h-4', style = {}, fallback = LucideIcons.Sparkles }) {
  if (!name) {
    const FallbackComponent = fallback || LucideIcons.Sparkles;
    return <FallbackComponent className={className} style={style} />;
  }

  // 1. Check direct alias
  const aliasTarget = ICON_ALIASES[name.toLowerCase()];
  if (aliasTarget && LucideIcons[aliasTarget]) {
    const Component = LucideIcons[aliasTarget];
    return <Component className={className} style={style} />;
  }

  // 2. Try direct matching in LucideIcons (case-insensitive search)
  const pascalName = toPascal(name);
  if (LucideIcons[pascalName]) {
    const Component = LucideIcons[pascalName];
    return <Component className={className} style={style} />;
  }

  // 3. Fallback search among icon keys
  const lowerName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const matchedKey = Object.keys(LucideIcons).find(
    (k) => k.toLowerCase() === lowerName
  );

  if (matchedKey && LucideIcons[matchedKey]) {
    const Component = LucideIcons[matchedKey];
    return <Component className={className} style={style} />;
  }

  // 4. Ultimate safe fallback
  const FallbackComponent = fallback || LucideIcons.Sparkles;
  return <FallbackComponent className={className} style={style} />;
}
