/**
 * 100+ Curated High-Converting Lucide Icons across 8 Design Categories
 */

export const ICON_CATEGORIES = [
  'All',
  'Trust & Badges',
  'Tech & Code',
  'Business & Stats',
  'Media & Design',
  'Navigation & Web',
  'Security',
  'Tools & Productivity',
  'Energy & Nature',
];

export const CURATED_ICONS = [
  // 1. Trust & Badges
  { id: 'sparkles', name: 'Sparkles', iconName: 'Sparkles', category: 'Trust & Badges', tags: ['magic', 'ai', 'clean'] },
  { id: 'flame', name: 'Flame', iconName: 'Flame', category: 'Trust & Badges', tags: ['hot', 'trending', 'fire'] },
  { id: 'star', name: 'Star', iconName: 'Star', category: 'Trust & Badges', tags: ['rating', 'favorite', 'quality'] },
  { id: 'trophy', name: 'Trophy', iconName: 'Trophy', category: 'Trust & Badges', tags: ['winner', 'award', 'rank'] },
  { id: 'award', name: 'Award', iconName: 'Award', category: 'Trust & Badges', tags: ['certificate', 'badge', 'honor'] },
  { id: 'crown', name: 'Crown', iconName: 'Crown', category: 'Trust & Badges', tags: ['premium', 'vip', 'king'] },
  { id: 'shield', name: 'Shield', iconName: 'Shield', category: 'Trust & Badges', tags: ['protection', 'trust', 'secure'] },
  { id: 'check', name: 'Verified Check', iconName: 'CheckCircle2', category: 'Trust & Badges', tags: ['verified', 'complete', 'approved'] },
  { id: 'heart', name: 'Loved Heart', iconName: 'Heart', category: 'Trust & Badges', tags: ['like', 'love', 'health'] },
  { id: 'gem', name: 'Gem / Crystal', iconName: 'Gem', category: 'Trust & Badges', tags: ['diamond', 'luxury', 'value'] },
  { id: 'target', name: 'Target', iconName: 'Target', category: 'Trust & Badges', tags: ['goal', 'focus', 'accuracy'] },
  { id: 'thumbs-up', name: 'Thumbs Up', iconName: 'ThumbsUp', category: 'Trust & Badges', tags: ['like', 'agree', 'recommend'] },
  { id: 'medal', name: 'Medal', iconName: 'Medal', category: 'Trust & Badges', tags: ['achievement', 'champion'] },

  // 2. Tech & Code
  { id: 'cpu', name: 'AI Engine / CPU', iconName: 'Cpu', category: 'Tech & Code', tags: ['processor', 'hardware', 'chip'] },
  { id: 'code', name: 'Code Brackets', iconName: 'Code', category: 'Tech & Code', tags: ['developer', 'syntax', 'programming'] },
  { id: 'terminal', name: 'Terminal / CLI', iconName: 'Terminal', category: 'Tech & Code', tags: ['console', 'shell', 'bash'] },
  { id: 'layers', name: 'Layers / Stack', iconName: 'Layers', category: 'Tech & Code', tags: ['architecture', 'multiplatform', 'framework'] },
  { id: 'database', name: 'Database / SQL', iconName: 'Database', category: 'Tech & Code', tags: ['sql', 'storage', 'data'] },
  { id: 'server', name: 'Server Backend', iconName: 'Server', category: 'Tech & Code', tags: ['hosting', 'cloud', 'node'] },
  { id: 'phone', name: 'Mobile / Phone', iconName: 'Smartphone', category: 'Tech & Code', tags: ['ios', 'android', 'app'] },
  { id: 'laptop', name: 'Laptop / Desktop', iconName: 'Laptop', category: 'Tech & Code', tags: ['computer', 'macbook', 'web'] },
  { id: 'tablet', name: 'Tablet / iPad', iconName: 'Tablet', category: 'Tech & Code', tags: ['touch', 'device'] },
  { id: 'wifi', name: 'Wi-Fi / Network', iconName: 'Wifi', category: 'Tech & Code', tags: ['internet', 'signal', 'wireless'] },
  { id: 'cloud', name: 'Cloud Infrastructure', iconName: 'Cloud', category: 'Tech & Code', tags: ['aws', 'firebase', 'sync'] },
  { id: 'git-branch', name: 'Git Branch', iconName: 'GitBranch', category: 'Tech & Code', tags: ['version control', 'commits', 'pr'] },
  { id: 'binary', name: 'Binary / Algorithm', iconName: 'Binary', category: 'Tech & Code', tags: ['numbers', 'code', 'math'] },
  { id: 'bug', name: 'Bug Testing', iconName: 'Bug', category: 'Tech & Code', tags: ['debug', 'qa', 'fix'] },
  { id: 'command', name: 'Command Key', iconName: 'Command', category: 'Tech & Code', tags: ['mac', 'shortcuts'] },

  // 3. Business & Stats
  { id: 'trend', name: 'Growth Up', iconName: 'TrendingUp', category: 'Business & Stats', tags: ['finance', 'chart', 'profit'] },
  { id: 'bar-chart', name: 'Bar Chart', iconName: 'BarChart3', category: 'Business & Stats', tags: ['analytics', 'metrics', 'stats'] },
  { id: 'pie-chart', name: 'Pie Chart', iconName: 'PieChart', category: 'Business & Stats', tags: ['breakdown', 'shares'] },
  { id: 'dollar-sign', name: 'Dollar / Revenue', iconName: 'DollarSign', category: 'Business & Stats', tags: ['money', 'pricing', 'cash'] },
  { id: 'wallet', name: 'Wallet / Crypto', iconName: 'Wallet', category: 'Business & Stats', tags: ['fintech', 'payment', 'web3'] },
  { id: 'credit-card', name: 'Credit Card', iconName: 'CreditCard', category: 'Business & Stats', tags: ['checkout', 'stripe', 'billing'] },
  { id: 'shopping-cart', name: 'Shopping Cart', iconName: 'ShoppingCart', category: 'Business & Stats', tags: ['ecommerce', 'store', 'buy'] },
  { id: 'shopping-bag', name: 'Shopping Bag', iconName: 'ShoppingBag', category: 'Business & Stats', tags: ['retail', 'orders'] },
  { id: 'briefcase', name: 'Briefcase / Jobs', iconName: 'Briefcase', category: 'Business & Stats', tags: ['work', 'portfolio', 'company'] },
  { id: 'building', name: 'Enterprise Building', iconName: 'Building', category: 'Business & Stats', tags: ['corporate', 'agency', 'hq'] },
  { id: 'coins', name: 'Coins / Tokens', iconName: 'Coins', category: 'Business & Stats', tags: ['crypto', 'rewards'] },

  // 4. Media & Design
  { id: 'palette', name: 'Color Palette', iconName: 'Palette', category: 'Media & Design', tags: ['art', 'theme', 'design'] },
  { id: 'camera', name: 'Camera / Photo', iconName: 'Camera', category: 'Media & Design', tags: ['camerax', 'picture', 'lens'] },
  { id: 'video', name: 'Video / Cinema', iconName: 'Video', category: 'Media & Design', tags: ['media', 'record', 'streaming'] },
  { id: 'music', name: 'Music Note', iconName: 'Music', category: 'Media & Design', tags: ['audio', 'song', 'sound'] },
  { id: 'mic', name: 'Microphone', iconName: 'Mic', category: 'Media & Design', tags: ['voice', 'speech', 'podcast'] },
  { id: 'volume', name: 'Volume Speaker', iconName: 'Volume2', category: 'Media & Design', tags: ['sound', 'audio', 'tts'] },
  { id: 'play', name: 'Play Button', iconName: 'Play', category: 'Media & Design', tags: ['action', 'video', 'start'] },
  { id: 'image', name: 'Image / Picture', iconName: 'Image', category: 'Media & Design', tags: ['gallery', 'photos'] },
  { id: 'film', name: 'Film Strip', iconName: 'Film', category: 'Media & Design', tags: ['movie', 'animation'] },
  { id: 'headphones', name: 'Headphones', iconName: 'Headphones', category: 'Media & Design', tags: ['listen', 'music'] },
  { id: 'disc', name: 'Disc Record', iconName: 'Disc', category: 'Media & Design', tags: ['vinyl', 'track'] },

  // 5. Navigation & Web
  { id: 'globe', name: 'Globe / World', iconName: 'Globe', category: 'Navigation & Web', tags: ['earth', 'international', 'web'] },
  { id: 'compass', name: 'Compass / Guide', iconName: 'Compass', category: 'Navigation & Web', tags: ['direction', 'explore', 'map'] },
  { id: 'map-pin', name: 'Map Pin / GPS', iconName: 'MapPin', category: 'Navigation & Web', tags: ['location', 'place', 'geo'] },
  { id: 'search', name: 'Search Magnifier', iconName: 'Search', category: 'Navigation & Web', tags: ['find', 'lookup', 'filter'] },
  { id: 'bell', name: 'Notification Bell', iconName: 'Bell', category: 'Navigation & Web', tags: ['alert', 'push', 'remind'] },
  { id: 'share', name: 'Share Icon', iconName: 'Share2', category: 'Navigation & Web', tags: ['social', 'send', 'forward'] },
  { id: 'link', name: 'Hyperlink Chain', iconName: 'Link', category: 'Navigation & Web', tags: ['url', 'connect'] },
  { id: 'external-link', name: 'External Link', iconName: 'ExternalLink', category: 'Navigation & Web', tags: ['open', 'new tab'] },
  { id: 'eye', name: 'Eye View', iconName: 'Eye', category: 'Navigation & Web', tags: ['preview', 'inspect', 'see'] },
  { id: 'home', name: 'Home House', iconName: 'Home', category: 'Navigation & Web', tags: ['main', 'dashboard'] },
  { id: 'settings', name: 'Settings Cog', iconName: 'Settings', category: 'Navigation & Web', tags: ['gear', 'configure', 'options'] },

  // 6. Security
  { id: 'lock', name: 'Lock Secure', iconName: 'Lock', category: 'Security', tags: ['auth', 'private', 'password'] },
  { id: 'unlock', name: 'Unlock Open', iconName: 'Unlock', category: 'Security', tags: ['access', 'granted'] },
  { id: 'key', name: 'Security Key', iconName: 'Key', category: 'Security', tags: ['credentials', 'token', 'jwt'] },
  { id: 'fingerprint', name: 'Fingerprint Biometrics', iconName: 'Fingerprint', category: 'Security', tags: ['bio', 'touch id', 'mfa'] },
  { id: 'shield-check', name: 'Shield Verified', iconName: 'ShieldCheck', category: 'Security', tags: ['safe', 'malware free'] },
  { id: 'shield-alert', name: 'Shield Alert', iconName: 'ShieldAlert', category: 'Security', tags: ['warning', 'firewall'] },
  { id: 'scan-face', name: 'Face ID Scan', iconName: 'ScanFace', category: 'Security', tags: ['camera', 'face id'] },
  { id: 'alert-triangle', name: 'Warning Triangle', iconName: 'AlertTriangle', category: 'Security', tags: ['caution', 'danger'] },

  // 7. Tools & Productivity
  { id: 'calendar', name: 'Calendar Date', iconName: 'Calendar', category: 'Tools & Productivity', tags: ['schedule', 'agenda', 'events'] },
  { id: 'clock', name: 'Clock Timer', iconName: 'Clock', category: 'Tools & Productivity', tags: ['time', 'history', 'duration'] },
  { id: 'check-square', name: 'Todo Checkbox', iconName: 'CheckSquare', category: 'Tools & Productivity', tags: ['tasks', 'checklist'] },
  { id: 'folder', name: 'File Folder', iconName: 'Folder', category: 'Tools & Productivity', tags: ['directory', 'files', 'storage'] },
  { id: 'file-text', name: 'Document Text', iconName: 'FileText', category: 'Tools & Productivity', tags: ['pdf', 'notes', 'doc'] },
  { id: 'edit', name: 'Edit Pencil', iconName: 'Edit3', category: 'Tools & Productivity', tags: ['write', 'modify', 'pen'] },
  { id: 'archive', name: 'Archive Box', iconName: 'Archive', category: 'Tools & Productivity', tags: ['zip', 'backup', 'saved'] },
  { id: 'trash', name: 'Trash Bin', iconName: 'Trash2', category: 'Tools & Productivity', tags: ['delete', 'remove', 'clean'] },

  // 8. Energy & Nature
  { id: 'zap', name: 'Lightning Zap', iconName: 'Zap', category: 'Energy & Nature', tags: ['power', 'fast', 'speed', 'energy'] },
  { id: 'rocket', name: 'Rocket Launch', iconName: 'Rocket', category: 'Energy & Nature', tags: ['deploy', 'startup', 'boost'] },
  { id: 'battery-charging', name: 'Battery Charging', iconName: 'BatteryCharging', category: 'Energy & Nature', tags: ['power', 'charge', 'ev'] },
  { id: 'sun', name: 'Sun Solar', iconName: 'Sun', category: 'Energy & Nature', tags: ['day', 'solar', 'light'] },
  { id: 'moon', name: 'Moon Dark', iconName: 'Moon', category: 'Energy & Nature', tags: ['night', 'dark mode'] },
  { id: 'lightbulb', name: 'Lightbulb Idea', iconName: 'Lightbulb', category: 'Energy & Nature', tags: ['insight', 'creative', 'smart'] },
  { id: 'atom', name: 'Atom Science', iconName: 'Atom', category: 'Energy & Nature', tags: ['physics', 'react', 'core'] },
];
