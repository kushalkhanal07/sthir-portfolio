import { useEffect } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';
import { initSmoothScroll, destroySmoothScroll, ScrollTrigger } from '../lib/scroll';

/**
 * Mounts Lenis smooth scrolling (desktop + no reduced-motion) and keeps GSAP
 * ScrollTrigger measurements fresh once web fonts have loaded.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, [reduced]);

  useEffect(() => {
    let cancelled = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
