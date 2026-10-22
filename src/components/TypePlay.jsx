import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';
import { Reveal } from './Reveal';
import './TypePlay.css';

const WORD = 'PLAYGROUND';

/**
 * Interactive typography experiment. Each letter's weight and vertical
 * stretch responds to pointer distance (mouse or touch). Click / tap a letter
 * to flip it into the italic serif. Reduced motion → static composition.
 */
export default function TypePlay() {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const letterRefs = useRef([]);
  const [serif, setSerif] = useState(() => new Set());

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reduced) return undefined;

    let raf = 0;
    let pointer = null;
    const state = letterRefs.current.map(() => ({ w: 500, s: 1 }));

    const tick = () => {
      let settled = true;
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        let targetW = 500;
        let targetS = 1;
        if (pointer) {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(pointer.x - cx, pointer.y - cy);
          const radius = Math.max(220, r.width * 3);
          const t = Math.max(0, 1 - d / radius);
          targetW = 400 + t * 300;
          targetS = 1 + t * 0.32;
        }
        const st = state[i];
        st.w += (targetW - st.w) * 0.14;
        st.s += (targetS - st.s) * 0.14;
        if (Math.abs(targetW - st.w) > 0.5 || Math.abs(targetS - st.s) > 0.002) settled = false;
        el.style.fontWeight = String(Math.round(st.w));
        el.style.transform = `scaleY(${st.s.toFixed(3)})`;
      });
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      pointer = { x: e.clientX, y: e.clientY };
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };

    wrap.addEventListener('pointermove', onMove, { passive: true });
    wrap.addEventListener('pointerleave', onLeave);
    wrap.addEventListener('pointercancel', onLeave);
    return () => {
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      wrap.removeEventListener('pointercancel', onLeave);
      cancelAnimationFrame(raf);
      letterRefs.current.forEach((el) => {
        if (el) {
          el.style.fontWeight = '';
          el.style.transform = '';
        }
      });
    };
  }, [reduced]);

  const toggle = (i) => {
    setSerif((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="typeplay" aria-labelledby="typeplay-title">
      <div className="container">
        <div className="section-head">
          <span className="index">05 / Visual Lab</span>
          <span className="title" id="typeplay-title">
            A live typographic experiment
          </span>
        </div>
      </div>

      <Reveal className="typeplay__stage" amount={0.3}>
        <div className="typeplay__wrap" ref={wrapRef}>
          <p className="typeplay__hint mono" aria-hidden="true">
            Move across · tap a letter
          </p>
          <div className="typeplay__word" role="group" aria-label={`Interactive letters spelling ${WORD}`}>
            {WORD.split('').map((ch, i) => (
              <button
                key={i}
                type="button"
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                className={`typeplay__letter ${serif.has(i) ? 'is-serif' : ''}`}
                onClick={() => toggle(i)}
                aria-pressed={serif.has(i)}
                aria-label={`Letter ${ch}, ${serif.has(i) ? 'serif' : 'grotesk'} style`}
              >
                {serif.has(i) ? ch.toLowerCase() : ch}
              </button>
            ))}
          </div>
          <div className="typeplay__meta mono" aria-hidden="true">
            <span>Space Grotesk 300–700</span>
            <span>Instrument Serif Italic</span>
            <span>wght × scaleY</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
