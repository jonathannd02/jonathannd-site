const shell = document.querySelector<HTMLElement>('[data-site-shell]');
const intro = document.querySelector<HTMLElement>('[data-intro-screen]');
const video = intro?.querySelector<HTMLVideoElement>('.intro__video');
const colorRevealCanvas = intro?.querySelector<HTMLCanvasElement>('[data-color-reveal]');
const colorRevealContext = colorRevealCanvas?.getContext('2d', { alpha: true, desynchronized: true });
const skipIntro = document.querySelector<HTMLAnchorElement>('[data-skip-intro]');
const posts = document.querySelector<HTMLElement>('#posts');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const pointerState = {
  x: 0.5,
  y: 0.5,
  pressure: 0,
  targetX: 0.5,
  targetY: 0.5,
  targetPressure: 0,
};

let colorRevealWidth = 0;
let colorRevealHeight = 0;
let colorRevealFrame = 0;
let videoFrameCallback = 0;
let colorRevealActive = false;
let pointerInitialized = false;
let pointerFrame = 0;
let introCompleted = false;

const renderPointer = (): void => {
  pointerState.x += (pointerState.targetX - pointerState.x) * 0.18;
  pointerState.y += (pointerState.targetY - pointerState.y) * 0.18;
  pointerState.pressure += (pointerState.targetPressure - pointerState.pressure) * 0.18;
  document.documentElement.style.setProperty('--pointer-x', pointerState.x.toFixed(3));
  document.documentElement.style.setProperty('--pointer-y', pointerState.y.toFixed(3));

  const pointerMoving = Math.abs(pointerState.targetX - pointerState.x) > 0.001
    || Math.abs(pointerState.targetY - pointerState.y) > 0.001
    || Math.abs(pointerState.targetPressure - pointerState.pressure) > 0.001;

  if (pointerMoving) {
    pointerFrame = window.requestAnimationFrame(renderPointer);
  } else {
    pointerFrame = 0;
  }
};

const resizeColorReveal = (): void => {
  if (!intro || !colorRevealCanvas || !colorRevealContext) return;

  const bounds = intro.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
  const width = Math.min(960, Math.max(320, Math.round(bounds.width * pixelRatio)));
  const height = Math.max(180, Math.round(width * (bounds.height / bounds.width)));

  if (width === colorRevealWidth && height === colorRevealHeight) return;

  colorRevealWidth = width;
  colorRevealHeight = height;
  colorRevealCanvas.width = width;
  colorRevealCanvas.height = height;
  colorRevealContext.imageSmoothingEnabled = true;
};

const drawColorRevealFrame = (): void => {
  if (!video || !colorRevealCanvas || !colorRevealContext || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
  if (!video.videoWidth || !video.videoHeight) return;

  resizeColorReveal();
  if (!colorRevealWidth || !colorRevealHeight) return;

  const sourceRatio = video.videoWidth / video.videoHeight;
  const canvasRatio = colorRevealWidth / colorRevealHeight;
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = video.videoWidth;
  let sourceHeight = video.videoHeight;

  if (sourceRatio > canvasRatio) {
    sourceWidth = video.videoHeight * canvasRatio;
    sourceX = (video.videoWidth - sourceWidth) / 2;
  } else {
    sourceHeight = video.videoWidth / canvasRatio;
    sourceY = (video.videoHeight - sourceHeight) / 2;
  }

  colorRevealContext.clearRect(0, 0, colorRevealWidth, colorRevealHeight);
  colorRevealContext.drawImage(
    video,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    colorRevealWidth,
    colorRevealHeight,
  );
};

type VideoFrameSource = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: () => void) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

const renderColorRevealFallback = (): void => {
  colorRevealFrame = 0;
  if (!video || !colorRevealActive || video.paused || video.ended || introCompleted) return;

  drawColorRevealFrame();
  colorRevealFrame = window.requestAnimationFrame(renderColorRevealFallback);
};

const scheduleColorRevealFrame = (): void => {
  if (!video || !colorRevealActive || reduceMotion.matches || introCompleted) return;

  const frameVideo = video as VideoFrameSource;
  if (typeof frameVideo.requestVideoFrameCallback === 'function') {
    videoFrameCallback = frameVideo.requestVideoFrameCallback(() => {
      videoFrameCallback = 0;
      if (!colorRevealActive || introCompleted) return;
      drawColorRevealFrame();
      scheduleColorRevealFrame();
    });
  } else if (!colorRevealFrame) {
    colorRevealFrame = window.requestAnimationFrame(renderColorRevealFallback);
  }
};

const stopColorReveal = (): void => {
  colorRevealActive = false;
  window.cancelAnimationFrame(colorRevealFrame);
  colorRevealFrame = 0;

  const frameVideo = video as VideoFrameSource | undefined;
  if (frameVideo?.cancelVideoFrameCallback && videoFrameCallback) {
    frameVideo.cancelVideoFrameCallback(videoFrameCallback);
  }
  videoFrameCallback = 0;
};

const startColorReveal = (): void => {
  if (!intro || !video || !colorRevealCanvas || !colorRevealContext || reduceMotion.matches || introCompleted) return;

  resizeColorReveal();
  colorRevealActive = true;
  drawColorRevealFrame();
  scheduleColorRevealFrame();
};

const startPointerInteraction = (): void => {
  if (!intro || reduceMotion.matches || introCompleted) return;

  if (!pointerInitialized) {
    intro.addEventListener('pointermove', (event) => {
      const bounds = intro.getBoundingClientRect();
      pointerState.targetX = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
      pointerState.targetY = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
      pointerState.targetPressure = event.pointerType === 'touch' ? 0.7 : 1;
      intro.classList.add('has-pointer');
      document.documentElement.style.setProperty('--pointer-glow-opacity', '0.1');
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointer);
    }, { passive: true });

    intro.addEventListener('pointerleave', () => {
      pointerState.targetPressure = 0;
      pointerState.targetX = 0.5;
      pointerState.targetY = 0.5;
      intro.classList.remove('has-pointer');
      document.documentElement.style.setProperty('--pointer-glow-opacity', '0');
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointer);
    });

    window.addEventListener('resize', resizeColorReveal, { passive: true });
    pointerInitialized = true;
  }

  resizeColorReveal();
};

const revealBlog = (): void => {
  if (introCompleted) return;

  introCompleted = true;
  stopColorReveal();
  window.cancelAnimationFrame(pointerFrame);
  pointerFrame = 0;
  video?.pause();
  shell?.classList.add('intro-complete');
  document.documentElement.classList.remove('intro-active');

  window.setTimeout(() => {
    posts?.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }, reduceMotion.matches ? 0 : 360);
};

const holdIntro = (): void => {
  stopColorReveal();
  video?.pause();
  drawColorRevealFrame();
};

intro?.addEventListener('click', revealBlog);

const startIntro = (): void => {
  if (!shell || !intro || !video || reduceMotion.matches || introCompleted) return;

  shell.classList.add('has-intro');
  document.documentElement.classList.add('intro-active');
  startPointerInteraction();
  void video.play().then(startColorReveal).catch(holdIntro);
};

skipIntro?.addEventListener('click', (event) => {
  event.preventDefault();
  revealBlog();
});

if (video) {
  video.addEventListener('loadeddata', () => {
    resizeColorReveal();
    drawColorRevealFrame();
  });
  video.addEventListener('ended', holdIntro, { once: true });
  video.addEventListener('error', revealBlog, { once: true });
}

if (reduceMotion.matches) {
  revealBlog();
} else {
  startIntro();
}

reduceMotion.addEventListener('change', (event) => {
  if (event.matches) {
    revealBlog();
  } else if (!introCompleted) {
    startIntro();
  }
});