import DynamicIcon from './DynamicIcon';

export default function TrustPill({
  text = '4.9 ★ (50K+ Downloads)',
  icon = 'star',
  styleType = 'gold', // 'gold' | 'emerald' | 'indigo' | 'glass' | 'ruby'
  scale = 1,
  className = '',
}) {
  if (!text) return null;

  let styleClasses = 'bg-amber-500/10 border-amber-400/30 text-amber-300';
  let iconColor = '#fbbf24';

  if (styleType === 'emerald') {
    styleClasses = 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300';
    iconColor = '#34d399';
  } else if (styleType === 'indigo') {
    styleClasses = 'bg-indigo-500/10 border-indigo-400/30 text-indigo-300';
    iconColor = '#818cf8';
  } else if (styleType === 'glass') {
    styleClasses = 'bg-white/[0.06] backdrop-blur-md border-white/20 text-white';
    iconColor = '#ffffff';
  } else if (styleType === 'ruby') {
    styleClasses = 'bg-rose-500/10 border-rose-400/30 text-rose-300';
    iconColor = '#fb7185';
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm select-none transition-all ${styleClasses} ${className}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
      }}
    >
      <DynamicIcon name={icon} className="w-3.5 h-3.5 flex-shrink-0 animate-pulse" style={{ color: iconColor }} />
      <span className="truncate">{text}</span>
    </div>
  );
}
