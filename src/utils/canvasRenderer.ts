import { ContentPiece } from '../types/content';
import { BRAND_LOGOS, BRAND_TAGLINE } from '../data/brandAssets';

// Cache for preloaded HTMLImageElements to prevent re-fetching on redraw
const imageCache: Record<string, HTMLImageElement> = {};

function loadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache[src] && imageCache[src].complete && imageCache[src].naturalWidth > 0) {
    return Promise.resolve(imageCache[src]);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache[src] = img;
      resolve(img);
    };
    img.onerror = () => {
      // Return a graceful fallback image if fetch fails
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 4
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
      lineCount++;
      if (lineCount >= maxLines - 1 && n < words.length - 1) {
        // Truncate remaining
        line = words.slice(n).join(' ');
        if (ctx.measureText(line + '...').width > maxWidth) {
          while (line.length > 0 && ctx.measureText(line + '...').width > maxWidth) {
            line = line.substring(0, line.length - 1);
          }
          line = line.trim() + '...';
        }
        ctx.fillText(line, x, currentY);
        return currentY + lineHeight;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY + lineHeight;
}

export async function renderPieceToCanvas(
  canvas: HTMLCanvasElement,
  piece: ContentPiece,
  slideIndex = 0
): Promise<void> {
  const isStory = piece.format === 'story';
  const width = 1080;
  const height = isStory ? 1920 : 1350;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Draw Base Background (Dark green / Slate luxury default)
  ctx.fillStyle = '#051209';
  ctx.fillRect(0, 0, width, height);

  // 2. Load & Draw Photo
  const photoUrl = piece.imageUrl;
  try {
    const bgImg = await loadImage(photoUrl);
    // Draw cover
    const hRatio = width / bgImg.naturalWidth;
    const vRatio = height / bgImg.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (width - bgImg.naturalWidth * ratio) / 2;
    const centerShiftY = (height - bgImg.naturalHeight * ratio) / 2;

    ctx.drawImage(
      bgImg,
      0,
      0,
      bgImg.naturalWidth,
      bgImg.naturalHeight,
      centerShiftX,
      centerShiftY,
      bgImg.naturalWidth * ratio,
      bgImg.naturalHeight * ratio
    );
  } catch (_e) {
    // Elegant fallback gradient if image not yet loaded
    const fallbackGrad = ctx.createLinearGradient(0, 0, width, height);
    fallbackGrad.addColorStop(0, '#004719');
    fallbackGrad.addColorStop(0.5, '#087B18');
    fallbackGrad.addColorStop(1, '#021808');
    ctx.fillStyle = fallbackGrad;
    ctx.fillRect(0, 0, width, height);
  }

  // 3. Cinematic Vignette & Readability Scrims
  // Top Scrim for Logo
  const topScrim = ctx.createLinearGradient(0, 0, 0, isStory ? 480 : 380);
  topScrim.addColorStop(0, 'rgba(0, 20, 7, 0.85)');
  topScrim.addColorStop(0.6, 'rgba(0, 20, 7, 0.45)');
  topScrim.addColorStop(1, 'rgba(0, 20, 7, 0)');
  ctx.fillStyle = topScrim;
  ctx.fillRect(0, 0, width, isStory ? 480 : 380);

  // Bottom Scrim for Editorial Typography
  const bottomHeight = isStory ? 950 : 800;
  const bottomScrim = ctx.createLinearGradient(0, height - bottomHeight, 0, height);
  bottomScrim.addColorStop(0, 'rgba(0, 15, 5, 0)');
  bottomScrim.addColorStop(0.3, 'rgba(0, 25, 8, 0.7)');
  bottomScrim.addColorStop(0.7, 'rgba(0, 20, 6, 0.94)');
  bottomScrim.addColorStop(1, 'rgba(0, 12, 4, 0.98)');
  ctx.fillStyle = bottomScrim;
  ctx.fillRect(0, height - bottomHeight, width, bottomHeight);

  // 4. Subtle Ambient Brand Glow (Green #42D900 / #C9FF24)
  const glowGrad = ctx.createRadialGradient(width - 150, height - 200, 10, width - 150, height - 200, 450);
  glowGrad.addColorStop(0, 'rgba(66, 217, 0, 0.12)');
  glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // 5. Draw Official Brand Logo (Never redrawn, strictly independent overlay with breathing margins)
  const logoConfig = BRAND_LOGOS.find((l) => l.id === piece.logoVariant) || BRAND_LOGOS[0];
  try {
    const logoImg = await loadImage(logoConfig.src);
    let logoW = 160;
    let logoH = 160;
    let logoX = 80;
    let logoY = 80;

    if (piece.logoVariant === 'keyvisual') {
      logoW = 340;
      logoH = (logoImg.naturalHeight / logoImg.naturalWidth) * logoW;
    } else if (piece.logoVariant === 'modern') {
      logoW = 190;
      logoH = (logoImg.naturalHeight / logoImg.naturalWidth) * logoW;
    } else {
      logoW = 160;
      logoH = (logoImg.naturalHeight / logoImg.naturalWidth) * logoW;
    }

    if (piece.logoPosition === 'top-right') {
      logoX = width - logoW - 80;
      logoY = 80;
    } else if (piece.logoPosition === 'top-center') {
      logoX = (width - logoW) / 2;
      logoY = isStory ? 140 : 80;
    } else if (piece.logoPosition === 'bottom-center') {
      logoX = (width - logoW) / 2;
      logoY = height - logoH - 120;
    } else if (piece.logoPosition === 'bottom-right') {
      logoX = width - logoW - 80;
      logoY = height - logoH - 120;
    } else {
      // default top-left
      logoX = 80;
      logoY = 80;
    }

    // Logo drop shadow for depth over complex backgrounds
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6;
    ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);
    ctx.restore();
  } catch (err) {
    console.warn('Could not draw official logo on canvas:', err);
  }

  // 6. Draw Category Kicker & Unboxed Metadata (Zero-pill discipline)
  const paddingX = 84;
  let textStartY = height - (isStory ? 680 : 540);

  // If carousel and looking at a specific slide
  const currentSlide = piece.carouselSlides && piece.carouselSlides[slideIndex]
    ? piece.carouselSlides[slideIndex]
    : null;

  const displayTitle = currentSlide ? currentSlide.title : piece.title;
  const displaySubtitle = currentSlide ? currentSlide.body : piece.subtitle;

  // Category Kicker
  ctx.fillStyle = '#C9FF24';
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  const kicker = `${piece.categoryTitle}  ·  ${piece.badgeText || 'CHAVES DO BICO'}`;
  ctx.fillText(kicker.toUpperCase(), paddingX, textStartY);
  textStartY += 48;

  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 62px "Plus Jakarta Sans", sans-serif';
  textStartY = wrapText(ctx, displayTitle, paddingX, textStartY, width - paddingX * 2, 74, 3);
  textStartY += 12;

  // Subtitle / Body
  ctx.fillStyle = 'rgba(240, 246, 242, 0.9)';
  ctx.font = '400 32px "Plus Jakarta Sans", sans-serif';
  textStartY = wrapText(ctx, displaySubtitle, paddingX, textStartY, width - paddingX * 2, 46, 3);

  // 7. Carousel Indicator or Interactive Stories Prompt
  if (piece.format === 'carousel' && piece.carouselSlides && piece.carouselSlides.length > 0) {
    const totalSlides = piece.carouselSlides.length;
    const currentNum = slideIndex + 1;

    // Slide Counter Indicator (e.g. 01 / 04)
    ctx.fillStyle = '#C9FF24';
    ctx.font = '700 24px "JetBrains Mono", monospace';
    const slideCounter = `0${currentNum} / 0${totalSlides}`;
    ctx.fillText(slideCounter, width - paddingX - 140, height - 120);

    // Call to action
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Arraste para o lado ›', paddingX, height - 120);
  } else if (piece.format === 'story') {
    // Story interaction affordance (e.g. sticker box / poll mock area)
    const boxY = height - 320;
    const boxW = width - paddingX * 2;
    const boxH = 130;

    // Glassmorphic sticker card
    ctx.save();
    ctx.fillStyle = 'rgba(0, 30, 10, 0.65)';
    ctx.strokeStyle = 'rgba(201, 255, 36, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(paddingX, boxY, boxW, boxH, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#C9FF24';
    ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(piece.badgeText || 'INTERAÇÃO', paddingX + 30, boxY + 45);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(piece.body || 'Toque e participe da nossa enquete oficial!', paddingX + 30, boxY + 88);
    ctx.restore();
  }

  // 8. Official Brand Footer Bar & Tagline
  const footerY = height - 60;
  ctx.strokeStyle = 'rgba(66, 217, 0, 0.3)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(paddingX, footerY - 24);
  ctx.lineTo(width - paddingX, footerY - 24);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CHAVES DO BICO · AUGUSTINÓPOLIS - TO', paddingX, footerY + 8);

  // Official Tagline
  ctx.textAlign = 'right';
  ctx.fillStyle = '#C9FF24';
  ctx.font = 'italic 500 21px "Playfair Display", Georgia, serif';
  ctx.fillText(`"${BRAND_TAGLINE}"`, width - paddingX, footerY + 8);
  ctx.textAlign = 'left';
}

export async function exportPieceAsDataUrl(
  piece: ContentPiece,
  slideIndex = 0
): Promise<string> {
  const canvas = document.createElement('canvas');
  await renderPieceToCanvas(canvas, piece, slideIndex);
  return canvas.toDataURL('image/png', 1.0);
}

export async function exportPieceAsBlob(
  piece: ContentPiece,
  slideIndex = 0
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  await renderPieceToCanvas(canvas, piece, slideIndex);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to generate PNG blob'));
      },
      'image/png',
      1.0
    );
  });
}
