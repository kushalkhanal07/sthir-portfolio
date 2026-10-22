import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let tickerFn = null;

/**
 * Create the Lenis smooth-scroll instance and wire it to GSAP's ticker so
 * ScrollTrigger stays in sync. Called once from <SmoothScroll />.
 */
export function initSmoothScroll() {
  if (lenis) return lenis;
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  tickerFn = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function destroySmoothScroll() {
  if (!lenis) return;
  if (tickerFn) gsap.ticker.remove(tickerFn);
  lenis.destroy();
  lenis = null;
  tickerFn = null;
}

export function getLenis() {
  return lenis;
}

/**
 * Scroll to a target (selector, element or number). Works with or without Lenis.
 */
export function scrollTo(target, { immediate = false, offset = 0 } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset, duration: immediate ? 0 : 1.2 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
}

export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.classList.toggle('is-locked', locked);
}

export { gsap, ScrollTrigger };
