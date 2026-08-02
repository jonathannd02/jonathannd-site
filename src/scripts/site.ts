const hero = document.querySelector<HTMLElement>('[data-hero]');
const video = hero?.querySelector<HTMLVideoElement>('.hero__video');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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
