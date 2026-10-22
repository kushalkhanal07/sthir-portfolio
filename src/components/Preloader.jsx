import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import useReducedMotion from '../hooks/useReducedMotion';
import { lockScroll, ScrollTrigger } from '../lib/scroll';
import siteConfig from '../data/siteConfig';
import './Preloader.css';

const KEY = 'sp-preloaded';

/** Show the preloader once per browser session. */
export function shouldSkipPreloader() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

const EASE = [0.76, 0, 0.24, 1];

export default function Preloader() {
  const { setReady } = useApp();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0); // 0 intro, 1 exit

  useEffect(() => {
    lockScroll(true);
    const total = reduced ? 350 : 1500;
    const t1 = window.setTimeout(() => setPhase(1), reduced ? 100 : 1150);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* storage unavailable — fine */
      }
    }, total);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      lockScroll(false);
    };
  }, [reduced]);

  const handleExitComplete = () => {
    lockScroll(false);
    setReady(true);
    ScrollTrigger.refresh();
  };

  const name = siteConfig.name.toUpperCase();
  const words = name.split(' ');

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          className="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduced ? 0.2 : 0.9, ease: EASE }}
        >
          <div className="preloader__inner">
            <div className="preloader__meta mono" aria-hidden="true">
              <span>Portfolio — 2026</span>
              <span>{siteConfig.location}</span>
            </div>

            <h1 className="preloader__name display" aria-hidden="true">
              {words.map((word, wi) => (
                <span className="preloader__word" key={word}>
                  {word.split('').map((ch, i) => (
                    <motion.span
                      className="preloader__char"
                      key={`${wi}-${i}`}
                      initial={{ y: '110%', rotate: 6 }}
                      animate={{ y: phase === 0 ? '0%' : '-110%', rotate: 0 }}
                      transition={{
                        duration: reduced ? 0.2 : 0.75,
                        ease: EASE,
                        delay: reduced ? 0 : 0.08 + i * 0.035 + wi * 0.2,
                      }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <div className="preloader__bar" aria-hidden="true">
              <motion.span
                className="preloader__bar-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduced ? 0.2 : 1.1, ease: 'linear' }}
              />
            </div>

            <div className="preloader__roles mono" aria-hidden="true">
              {siteConfig.roles.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
          </div>
          <span className="visually-hidden">Loading</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
