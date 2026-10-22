/**
 * Extracts dominant vibrant color from an image data URL or image element
 */
export async function extractDominantColor(imageSrc) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const sampleSize = 64;
        canvas.width = sampleSize;
        canvas.height = sampleSize;

        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        const imgData = ctx.getImageData(0, 0, sampleSize, sampleSize).data;

        let bestColor = null;
        let maxScore = -1;

        // Sample pixels with a step
        for (let i = 0; i < imgData.length; i += 16) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];

          if (a < 128) continue; // Ignore transparent

          // Calculate brightness
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          if (brightness < 40 || brightness > 230) continue; // Skip near black and near white

          // Calculate saturation / color variance
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;

          // Score based on saturation and vibrancy
          const score = saturation * 100 + (max - min);

          if (score > maxScore) {
            maxScore = score;
            bestColor = rgbToHex(r, g, b);
          }
        }

        resolve(bestColor || '#6366f1'); // Default to indigo if no vibrant color found
      } catch (e) {
        resolve('#6366f1');
      }
    };

    img.onerror = () => {
      resolve('#6366f1');
    };
  });
}

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}
