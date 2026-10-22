import { useEffect, useRef } from 'react';
import useReducedMotion from './useReducedMotion';
import { useFinePointer } from './useMediaQuery';

/**
 * Magnetic hover: the element drifts toward the pointer while hovered.
 * Falls back to nothing on touch devices or when reduced motion is preferred —
 * the element then behaves like a normal button.
 *
 * Usage: const ref = useMagnetic(0.35); <button ref={ref} />
 */
export default function useMagnetic(strength = 0.3) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !fine) return undefined;

    let raf = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let active = false;

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      if (active || Math.abs(current.x) > 0.1 || Math.abs(current.y) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        el.style.transform = '';
        raf = 0;
      }
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      target = { x: dx * strength, y: dy * strength };
      active = true;
      start();
    };

    const onLeave = () => {
      target = { x: 0, y: 0 };
      active = false;
      start();
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [strength, reduced, fine]);

  return ref;
}
