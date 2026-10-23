/**
 * Dynamic Google Fonts Loader & Catalog
 * Supports loading ANY font from Google Fonts dynamically in real-time.
 */

// Curated list of 80+ popular designer Google Fonts organized by category
export const FONT_CATEGORIES = [
  'All',
  'Modern Sans',
  'Display & Bold',
  'Luxury Serif',
  'Tech & Code',
  'Futuristic',
  'Creative / Script',
];

export const POPULAR_GOOGLE_FONTS = [
  // Modern Sans
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans', category: 'Modern Sans', style: 'Geometric / Premium Clean' },
  { id: 'Inter', name: 'Inter', category: 'Modern Sans', style: 'Developer Tech / Highly Legible' },
  { id: 'Outfit', name: 'Outfit', category: 'Modern Sans', style: 'Modern Brand / Display' },
  { id: 'Poppins', name: 'Poppins', category: 'Modern Sans', style: 'Friendly Geometric Rounded' },
  { id: 'Montserrat', name: 'Montserrat', category: 'Modern Sans', style: 'Classic Architectural' },
  { id: 'Roboto', name: 'Roboto', category: 'Modern Sans', style: 'Standard Android Material' },
  { id: 'DM Sans', name: 'DM Sans', category: 'Modern Sans', style: 'Clean Modern Editorial' },
  { id: 'Manrope', name: 'Manrope', category: 'Modern Sans', style: 'Open-Source Semi-Condensed' },
  { id: 'Sora', name: 'Sora', category: 'Modern Sans', style: 'High Tech Aesthetics' },
  { id: 'Urbanist', name: 'Urbanist', category: 'Modern Sans', style: 'Clean Minimalist Sans' },
  { id: 'Figtree', name: 'Figtree', category: 'Modern Sans', style: 'Friendly Rounded UI' },
  { id: 'Nunito', name: 'Nunito', category: 'Modern Sans', style: 'Soft Rounded Curves' },
  { id: 'Rubik', name: 'Rubik', category: 'Modern Sans', style: 'Subtle Rounded Corners' },
  { id: 'Lexend', name: 'Lexend', category: 'Modern Sans', style: 'Optimized Reading Speed' },
  { id: 'Work Sans', name: 'Work Sans', category: 'Modern Sans', style: 'Workhorse Digital Sans' },
  { id: 'Raleway', name: 'Raleway', category: 'Modern Sans', style: 'Elegant Sans' },
  { id: 'Open Sans', name: 'Open Sans', category: 'Modern Sans', style: 'Neutral Friendly' },
  { id: 'Lato', name: 'Lato', category: 'Modern Sans', style: 'Warm Corporate Sans' },

  // Display & Bold
  { id: 'Cabinet Grotesk', name: 'Cabinet Grotesk', category: 'Display & Bold', style: 'Heavyweight Punchy' },
  { id: 'Space Grotesk', name: 'Space Grotesk', category: 'Display & Bold', style: 'Tech Brutalism' },
  { id: 'Bricolage Grotesque', name: 'Bricolage Grotesque', category: 'Display & Bold', style: 'Quirky Contemporary' },
  { id: 'Oswald', name: 'Oswald', category: 'Display & Bold', style: 'Condensed Heavy Headline' },
  { id: 'Bebas Neue', name: 'Bebas Neue', category: 'Display & Bold', style: 'Tall Condensed All-Caps' },
  { id: 'Anton', name: 'Anton', category: 'Display & Bold', style: 'Extra Impact Bold' },
  { id: 'Archivo Black', name: 'Archivo Black', category: 'Display & Bold', style: 'Super Heavy Grotesk' },
  { id: 'Syne', name: 'Syne', category: 'Display & Bold', style: 'Experimental Art Direction' },
  { id: 'Unbounded', name: 'Unbounded', category: 'Display & Bold', style: 'Ultra Wide Cyber Display' },
  { id: 'Righteous', name: 'Righteous', category: 'Display & Bold', style: 'Deco Futuristic Bold' },
  { id: 'Kanit', name: 'Kanit', category: 'Display & Bold', style: 'Sleek Modern Bold' },
  { id: 'Teko', name: 'Teko', category: 'Display & Bold', style: 'Tall Ultra-Condensed' },

  // Luxury & Editorial Serif
  { id: 'Playfair Display', name: 'Playfair Display', category: 'Luxury Serif', style: 'High Contrast Editorial' },
  { id: 'Merriweather', name: 'Merriweather', category: 'Luxury Serif', style: 'Pleasant Screen Serif' },
  { id: 'Lora', name: 'Lora', category: 'Luxury Serif', style: 'Contemporary Literary' },
  { id: 'Cinzel', name: 'Cinzel', category: 'Luxury Serif', style: 'Classical Roman Inscriptional' },
  { id: 'Cormorant Garamond', name: 'Cormorant Garamond', category: 'Luxury Serif', style: 'Graceful Traditional' },
  { id: 'Fraunces', name: 'Fraunces', category: 'Luxury Serif', style: 'Warm Wonky Display Serif' },
  { id: 'DM Serif Display', name: 'DM Serif Display', category: 'Luxury Serif', style: 'Poster Title Serif' },
  { id: 'Bodoni Moda', name: 'Bodoni Moda', category: 'Luxury Serif', style: 'Vogue Fashion Luxury' },
  { id: 'Prata', name: 'Prata', category: 'Luxury Serif', style: 'Teardrop Terminals Luxury' },
  { id: 'EB Garamond', name: 'EB Garamond', category: 'Luxury Serif', style: 'Timeless Book Antiqua' },

  // Tech & Monospace
  { id: 'JetBrains Mono', name: 'JetBrains Mono', category: 'Tech & Code', style: 'Developer Code IDE' },
  { id: 'Fira Code', name: 'Fira Code', category: 'Tech & Code', style: 'Coding Ligatures' },
  { id: 'Space Mono', name: 'Space Mono', category: 'Tech & Code', style: 'Cyberpunk Monospace' },
  { id: 'Roboto Mono', name: 'Roboto Mono', category: 'Tech & Code', style: 'Clean Technical Mono' },
  { id: 'Inconsolata', name: 'Inconsolata', category: 'Tech & Code', style: 'Programmer Precision' },
  { id: 'Source Code Pro', name: 'Source Code Pro', category: 'Tech & Code', style: 'Adobe Developer Mono' },
  { id: 'IBM Plex Mono', name: 'IBM Plex Mono', category: 'Tech & Code', style: 'Industrial Corporate Code' },
  { id: 'Share Tech Mono', name: 'Share Tech Mono', category: 'Tech & Code', style: 'Sci-Fi Terminal HUD' },

  // Futuristic & Cyber
  { id: 'Orbitron', name: 'Orbitron', category: 'Futuristic', style: 'Geometric Sci-Fi Space' },
  { id: 'Audiowide', name: 'Audiowide', category: 'Futuristic', style: 'Synthwave / Retro Cyber' },
  { id: 'Russo One', name: 'Russo One', category: 'Futuristic', style: 'Bold Impact Geometry' },
  { id: 'Rajdhani', name: 'Rajdhani', category: 'Futuristic', style: 'Squared Engineering UI' },
  { id: 'Michroma', name: 'Michroma', category: 'Futuristic', style: 'Spacecraft HUD Extended' },
  { id: 'Exo 2', name: 'Exo 2', category: 'Futuristic', style: 'Sleek Cybernetic Sans' },
  { id: 'Electrolize', name: 'Electrolize', category: 'Futuristic', style: 'Electric Circuit Sans' },
  { id: 'Oxanium', name: 'Oxanium', category: 'Futuristic', style: 'Angular Sci-Fi Esports' },

  // Creative / Script
  { id: 'Caveat', name: 'Caveat', category: 'Creative / Script', style: 'Casual Natural Handwriting' },
  { id: 'Pacifico', name: 'Pacifico', category: 'Creative / Script', style: 'Surf Culture Brush' },
  { id: 'Dancing Script', name: 'Dancing Script', category: 'Creative / Script', style: 'Lively Bouncing Cursive' },
  { id: 'Kalam', name: 'Kalam', category: 'Creative / Script', style: 'Organic Marker Script' },
  { id: 'Satisfy', name: 'Satisfy', category: 'Creative / Script', style: 'Smooth Brush Script' },
  { id: 'Great Vibes', name: 'Great Vibes', category: 'Creative / Script', style: 'Flowing Elegant Calligraphy' },
];

const loadedFontsSet = new Set();

/**
 * Dynamically loads a Google Font by injecting a stylesheet link into document.head
 */
export function loadGoogleFont(fontName) {
  if (!fontName || typeof fontName !== 'string') return;
  const cleanName = fontName.trim();
  if (!cleanName) return;

  const fontKey = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  if (loadedFontsSet.has(fontKey)) return;

  const existingLink = document.getElementById(`google-font-${fontKey}`);
  if (existingLink) {
    loadedFontsSet.add(fontKey);
    return;
  }

  try {
    const encodedName = cleanName.replace(/\s+/g, '+');
    const link = document.createElement('link');
    link.id = `google-font-${fontKey}`;
    link.rel = 'stylesheet';
    // Load common weights 400, 500, 600, 700, 800, 900
    link.href = `https://fonts.googleapis.com/css2?family=${encodedName}:wght@300;400;500;600;700;800;900&display=swap`;
    
    // Fallback if weighted URL fails
    link.onerror = () => {
      console.warn(`Weight range load failed for ${cleanName}, trying regular fallback`);
      link.href = `https://fonts.googleapis.com/css2?family=${encodedName}&display=swap`;
    };

    document.head.appendChild(link);
    loadedFontsSet.add(fontKey);
  } catch (err) {
    console.error('Failed to load Google Font:', fontName, err);
  }
}
