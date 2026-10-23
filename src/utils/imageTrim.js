/**
 * Auto-trim empty transparent padding from around a PNG / WebP screenshot.
 * Scans alpha channels to find the tight bounding box of visible device pixels.
 */
export function trimTransparentCanvas(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  let top = 0;
  let bottom = canvas.height;
  let left = 0;
  let right = canvas.width;

  // Find first non-transparent row from top
  topLoop: for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      if (data[(y * canvas.width + x) * 4 + 3] > 12) {
        top = y;
        break topLoop;
      }
    }
  }

  // Find last non-transparent row from bottom
  bottomLoop: for (let y = canvas.height - 1; y >= 0; y--) {
    for (let x = 0; x < canvas.width; x++) {
      if (data[(y * canvas.width + x) * 4 + 3] > 12) {
        bottom = y + 1;
        break bottomLoop;
      }
    }
  }

  // Find first non-transparent column from left
  leftLoop: for (let x = 0; x < canvas.width; x++) {
    for (let y = top; y < bottom; y++) {
      if (data[(y * canvas.width + x) * 4 + 3] > 12) {
        left = x;
        break leftLoop;
      }
    }
  }

  // Find last non-transparent column from right
  rightLoop: for (let x = canvas.width - 1; x >= 0; x--) {
    for (let y = top; y < bottom; y++) {
      if (data[(y * canvas.width + x) * 4 + 3] > 12) {
        right = x + 1;
        break rightLoop;
      }
    }
  }

  const trimWidth = right - left;
  const trimHeight = bottom - top;

  if (trimWidth <= 0 || trimHeight <= 0) return null;
  // If already perfectly tight, no need to re-encode
  if (trimWidth === canvas.width && trimHeight === canvas.height) return null;

  const trimmedCanvas = document.createElement('canvas');
  trimmedCanvas.width = trimWidth;
  trimmedCanvas.height = trimHeight;
  const trimCtx = trimmedCanvas.getContext('2d');
  trimCtx.drawImage(canvas, left, top, trimWidth, trimHeight, 0, 0, trimWidth, trimHeight);

  return trimmedCanvas.toDataURL('image/png');
}

export function autoTrimImage(src) {
  return new Promise((resolve) => {
    if (!src || typeof src !== 'string') return resolve(src);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const trimmed = trimTransparentCanvas(img);
        resolve(trimmed || src);
      } catch (err) {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}
