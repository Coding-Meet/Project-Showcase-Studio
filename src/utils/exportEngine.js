import { toPng, toJpeg, toBlob } from 'html-to-image';
import JSZip from 'jszip';

/**
 * Capture high-resolution image of a DOM node
 */
export async function captureNode(
  node,
  format = 'png',
  targetWidth = 1920,
  targetHeight = 1080,
  customOptions = {}
) {
  if (!node) throw new Error('Target node not found');

  // User-customizable resolution scale multiplier (1x = 1080p, 2x = 4K, 3x = 6K, 4x = 8K)
  const pixelRatio = customOptions.pixelRatio || customOptions.scale || 2;
  const quality = customOptions.quality !== undefined ? customOptions.quality : 1.0;

  const options = {
    quality: Math.min(1.0, Math.max(0.1, quality)),
    pixelRatio: pixelRatio,
    backgroundColor: null,
    cacheBust: true,
    style: {
      transform: 'none',
      transformOrigin: 'top left',
      imageRendering: 'high-quality',
      WebkitFontSmoothing: 'antialiased',
    },
  };

  // Ensure all dynamic Google Fonts are loaded and rendered
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  } catch (e) {}

  if (format === 'jpg' || format === 'jpeg') {
    return await toJpeg(node, options);
  }
  return await toPng(node, options);
}

/**
 * Save project deck directly to backend disk AND trigger client ZIP download
 */
export async function saveDeckToDiskAndZip({
  projectName,
  config,
  renderedSlides, // Array of { title, dataUrl, format }
}) {
  const projectSlug = (projectName || 'showcase_deck')
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '_');

  // 1. Try sending to local Node.js backend
  let backendResult = null;
  try {
    const res = await fetch('http://localhost:3001/api/save-exports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectName,
        config,
        slides: renderedSlides,
      }),
    });
    if (res.ok) {
      backendResult = await res.json();
    }
  } catch (err) {
    console.warn('Backend server not reachable, falling back to browser ZIP download.');
  }

  // 2. Client-side JSZip download
  const zip = new JSZip();
  zip.file('project_config.json', JSON.stringify(config, null, 2));

  renderedSlides.forEach((slide, index) => {
    if (slide.dataUrl) {
      const ext = slide.format || 'png';
      const base64Data = slide.dataUrl.replace(/^data:image\/\w+;base64,/, '');
      const cleanTitle = (slide.title || `slide_${index + 1}`)
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '_');
      zip.file(`slide_${index + 1}_${cleanTitle}.${ext}`, base64Data, { base64: true });
    }
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = `${projectSlug}_showcase_deck.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);

  return backendResult;
}

/**
 * Trigger download of a single dataUrl
 */
export function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Accurately calculate byte size from base64 dataUrl
 */
export function getDataUrlByteSize(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string') return 0;
  const commaIdx = dataUrl.indexOf(',');
  const base64Str = commaIdx !== -1 ? dataUrl.slice(commaIdx + 1) : dataUrl;
  return Math.round(base64Str.length * 0.75);
}

/**
 * Format raw bytes into human-readable KB or MB
 */
export function formatByteSize(bytes) {
  if (!bytes || bytes <= 0) return '0 KB';
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.round(bytes / 1024)} KB`;
}

/**
 * Real-time estimation of exported image file size based on dimensions, format, and quality
 */
export function estimateImageFileSize(width, height, format = 'png', quality = 1.0) {
  const totalPixels = width * height;
  let bytes = 0;

  if (format === 'png') {
    // PNG lossless compression with dark background: ~0.35 bytes/pixel
    bytes = totalPixels * 0.35;
  } else if (format === 'jpg' || format === 'jpeg') {
    // JPEG compression varies with quality exponent
    const qFactor = Math.pow(Math.min(1.0, Math.max(0.2, quality)), 2.2);
    bytes = totalPixels * 0.22 * qFactor;
  } else if (format === 'webp') {
    // WebP has higher efficiency
    const qFactor = Math.pow(Math.min(1.0, Math.max(0.2, quality)), 2.0);
    bytes = totalPixels * 0.14 * qFactor;
  }

  return formatByteSize(bytes);
}
