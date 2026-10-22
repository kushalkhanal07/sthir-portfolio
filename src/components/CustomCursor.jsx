import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';
import { useFinePointer } from '../hooks/useMediaQuery';
import './CustomCursor.css';

const TRAIL = 5;

/**
 * Desktop-only custom cursor: a dot, a lagging ring and a short trail.
 * Elements can request a cursor state with `data-cursor="view|link|drag"`.
 * Touch devices and reduced-motion users get the native cursor only.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const [label, setLabel] = useState('');
  const [mode, setMode] = useState('');

  useEffect(() => {
    if (!enabled) return undefined;
    document.body.classList.add('has-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    const trail = Array.from({ length: TRAIL }, () => ({ x: pos.x, y: pos.y }));
    let raf = 0;
    let visible = false;

    const render = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      let px = pos.x;
      let py = pos.y;
      trail.forEach((t, i) => {
        t.x += (px - t.x) * (0.35 - i * 0.04);
        t.y += (py - t.y) * (0.35 - i * 0.04);
        const el = trailRefs.current[i];
        if (el) el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) scale(${1 - i / (TRAIL + 1)})`;
        px = t.x;
        py = t.y;
      });
      raf = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        document.body.classList.add('cursor-visible');
      }
    };
    const onLeave = () => {
      visible = false;
      document.body.classList.remove('cursor-visible');
    };
    const onOver = (e) => {
      const target = e.target instanceof Element ? e.target.closest('[data-cursor]') : null;
      if (target) {
        const value = target.getAttribute('data-cursor') || 'link';
        setMode(value);
        setLabel(target.getAttribute('data-cursor-label') || (value === 'view' ? 'View' : value === 'drag' ? 'Drag' : ''));
        return;
      }
      const interactive = e.target instanceof Element ? e.target.closest('a, button, [role="button"], input, textarea, label') : null;
      setMode(interactive ? 'link' : '');
      setLabel('');
    };
    const onDown = () => document.body.classList.add('cursor-down');
    const onUp = () => document.body.classList.remove('cursor-down');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('has-cursor', 'cursor-visible', 'cursor-down');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`cursor ${mode ? `cursor--${mode}` : ''}`} aria-hidden="true">
      {Array.from({ length: TRAIL }, (_, i) => (
        <span
          key={i}
          className="cursor__trail"
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
        />
      ))}
      <span className="cursor__ring" ref={ringRef}>
        <span className="cursor__label">{label}</span>
      </span>
      <span className="cursor__dot" ref={dotRef} />
    </div>
  );
}
