import { toPng, toJpeg, toBlob } from 'html-to-image';
import JSZip from 'jszip';

/**
 * Capture high-resolution image of a DOM node
 */
export async function captureNode(node, format = 'png', targetWidth = 1920, targetHeight = 1080) {
  if (!node) throw new Error('Target node not found');

  // Compute scale multiplier for ultra-sharp 100% crisp pixel precision
  const pixelRatio = 3; // 3x Ultra-Sharp Retina scale

  const options = {
    quality: 1.0, // 100% full uncompressed maximum quality
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

  if (format === 'jpg') {
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
