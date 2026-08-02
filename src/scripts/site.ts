const hero = document.querySelector<HTMLElement>('[data-hero]');
const video = hero?.querySelector<HTMLVideoElement>('.hero__video');
const ditherCanvas = hero?.querySelector<HTMLCanvasElement>('[data-dither]');
const ditherContext = ditherCanvas?.getContext('2d', { willReadFrequently: true });
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const bayerMatrix = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
] as const;

const ditherState = {
  x: 0.5,
  y: 0.5,
  pressure: 0,
  targetX: 0.5,
  targetY: 0.5,
  targetPressure: 0,
};

let ditherImage: ImageData | null = null;
let ditherWidth = 0;
let ditherHeight = 0;
let ditherFrame = 0;
let lastVideoTime = -1;
let lastDitherX = -1;
let lastDitherY = -1;

const resizeDither = (): void => {
  if (!hero || !ditherCanvas || !ditherContext) return;

  const bounds = hero.getBoundingClientRect();
  const width = Math.min(640, Math.max(320, Math.round(bounds.width / 2.5)));
  const height = Math.max(180, Math.round(width * (bounds.height / bounds.width)));

  if (width === ditherWidth && height === ditherHeight) return;

  ditherWidth = width;
  ditherHeight = height;
  ditherCanvas.width = width;
  ditherCanvas.height = height;
  ditherContext.imageSmoothingEnabled = false;
  ditherImage = ditherContext.createImageData(width, height);
};

const renderDither = (): void => {
  if (!hero || !video || !ditherCanvas || !ditherContext || reduceMotion.matches) return;

  ditherState.x += (ditherState.targetX - ditherState.x) * 0.12;
  ditherState.y += (ditherState.targetY - ditherState.y) * 0.12;
  ditherState.pressure += (ditherState.targetPressure - ditherState.pressure) * 0.12;

  const videoTime = video.currentTime;
  const pointerMoved = Math.abs(ditherState.x - lastDitherX) > 0.004 || Math.abs(ditherState.y - lastDitherY) > 0.004;

  if (ditherImage && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && (videoTime !== lastVideoTime || pointerMoved)) {
    try {
      ditherContext.drawImage(video, 0, 0, ditherWidth, ditherHeight);
      const source = ditherContext.getImageData(0, 0, ditherWidth, ditherHeight).data;
      const output = ditherImage.data;
      const phaseX = Math.floor(ditherState.x * 4) % 4;
      const phaseY = Math.floor(ditherState.y * 4) % 4;
      const radius = 0.2 + ditherState.pressure * 0.22;

      for (let y = 0; y < ditherHeight; y += 1) {
        for (let x = 0; x < ditherWidth; x += 1) {
          const offset = (y * ditherWidth + x) * 4;
          const red = source[offset];
          const green = source[offset + 1];
          const blue = source[offset + 2];
          const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
          const distance = Math.hypot(x / ditherWidth - ditherState.x, y / ditherHeight - ditherState.y);
          const pointerLift = ditherState.pressure * clamp(1 - distance / radius, 0, 1);
          const value = clamp((luminance - 0.42) * 1.45 + 0.5 + pointerLift * 0.18, 0, 1);
          const threshold = (bayerMatrix[((y + phaseY) % 4) * 4 + ((x + phaseX) % 4)] + 0.5) / 16;

          if (value > threshold) {
            const highlight = clamp((value - threshold) * 2.8, 0, 1);
            output[offset] = 226;
            output[offset + 1] = 187;
            output[offset + 2] = 114;
            output[offset + 3] = Math.round((0.08 + highlight * 0.22 + pointerLift * 0.3) * 255);
          } else {
            output[offset] = 0;
            output[offset + 1] = 0;
            output[offset + 2] = 0;
            output[offset + 3] = 0;
          }
        }
      }

      ditherContext.putImageData(ditherImage, 0, 0);
      ditherCanvas.style.setProperty('--dither-opacity', (0.22 + ditherState.pressure * 0.2).toFixed(3));
      ditherCanvas.style.setProperty('--dither-shift-x', `${((ditherState.x - 0.5) * 10).toFixed(2)}px`);
      ditherCanvas.style.setProperty('--dither-shift-y', `${((ditherState.y - 0.5) * 8).toFixed(2)}px`);
      hero.classList.add('has-dither');
      lastVideoTime = videoTime;
      lastDitherX = ditherState.x;
      lastDitherY = ditherState.y;
    } catch {
      hero.classList.remove('has-dither');
      return;
    }
  }

  ditherFrame = window.requestAnimationFrame(renderDither);
};

if (hero && ditherCanvas && ditherContext && !reduceMotion.matches) {
  resizeDither();
  ditherFrame = window.requestAnimationFrame(renderDither);

  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    ditherState.targetX = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
    ditherState.targetY = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
    ditherState.targetPressure = event.pointerType === 'touch' ? 0.7 : 1;
  }, { passive: true });

  hero.addEventListener('pointerleave', () => {
    ditherState.targetPressure = 0;
  });

  window.addEventListener('resize', resizeDither, { passive: true });
}

const completeHero = (): void => {
  hero?.classList.add('is-complete');
  video?.pause();
};

if (video) {
  video.addEventListener('ended', completeHero, { once: true });
  video.addEventListener('error', completeHero, { once: true });

  if (reduceMotion.matches) {
    completeHero();
  } else {
    void video.play().catch(completeHero);
  }
}

reduceMotion.addEventListener('change', (event) => {
  if (event.matches) {
    window.cancelAnimationFrame(ditherFrame);
    hero?.classList.remove('has-dither');
    completeHero();
  } else if (ditherCanvas && ditherContext) {
    resizeDither();
    ditherFrame = window.requestAnimationFrame(renderDither);
    void video?.play().catch(() => undefined);
  }
});

let pointerFrame = 0;

window.addEventListener(
  'pointermove',
  (event) => {
    if (pointerFrame) return;

    pointerFrame = window.requestAnimationFrame(() => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      document.documentElement.style.setProperty('--pointer-x', x.toFixed(3));
      document.documentElement.style.setProperty('--pointer-y', y.toFixed(3));
      pointerFrame = 0;
    });
  },
  { passive: true },
);

const revealSections = document.querySelectorAll<HTMLElement>('[data-reveal-section]');

if (reduceMotion.matches) {
  revealSections.forEach((section) => section.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealSections.forEach((section) => observer.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add('is-visible'));
}

const nodes = [...document.querySelectorAll<SVGCircleElement>('.atlas-node')];
const workItems = [...document.querySelectorAll<HTMLElement>('[data-work-item]')];

const setActiveCoordinate = (index: string | null): void => {
  nodes.forEach((node) => node.classList.toggle('is-active', node.dataset.node === index));
  workItems.forEach((item) => item.classList.toggle('is-active', item.dataset.workItem === index));
};

workItems.forEach((item) => {
  const index = item.dataset.workItem ?? null;
  item.addEventListener('pointerenter', () => setActiveCoordinate(index));
  item.addEventListener('focus', () => setActiveCoordinate(index));
  item.addEventListener('pointerleave', () => setActiveCoordinate(null));
  item.addEventListener('blur', () => setActiveCoordinate(null));
});
