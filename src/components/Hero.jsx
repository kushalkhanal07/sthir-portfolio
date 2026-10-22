import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import siteConfig from '../data/siteConfig';
import { useApp } from '../context/AppContext';
import useReducedMotion from '../hooks/useReducedMotion';
import useMagnetic from '../hooks/useMagnetic';
import { useFinePointer } from '../hooks/useMediaQuery';
import { RevealLines } from './Reveal';
import './Hero.css';

const EASE = [0.22, 1, 0.36, 1];

function MagneticLink({ to, className, children, ...rest }) {
  const ref = useMagnetic(0.28);
  return (
    <Link to={to} className={className} ref={ref} {...rest}>
      {children}
    </Link>
  );
}

export default function Hero() {
  const { ready } = useApp();
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const sectionRef = useRef(null);
  const coordsRef = useRef(null);

  // Pointer-driven values (normalised -1 … 1)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const rotateY = useTransform(sx, [-1, 1], [-18, 18]);
  const rotateX = useTransform(sy, [-1, 1], [14, -14]);
  const skew = useTransform(sx, [-1, 1], [-6, 6]);
  const discX = useTransform(sx, [-1, 1], [-28, 28]);
  const discY = useTransform(sy, [-1, 1], [-20, 20]);
  const barX = useTransform(sx, [-1, 1], [16, -16]);
  const barY = useTransform(sy, [-1, 1], [12, -12]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !fine || reduced) return undefined;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      mx.set(Math.max(-1, Math.min(1, nx)));
      my.set(Math.max(-1, Math.min(1, ny)));
      if (coordsRef.current) {
        coordsRef.current.textContent = `X ${Math.round(e.clientX - r.left)
          .toString()
          .padStart(4, '0')}  Y ${Math.round(e.clientY - r.top)
          .toString()
          .padStart(4, '0')}`;
      }
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [fine, reduced, mx, my]);

  const { hero, availability } = siteConfig;
  const lines = [
    hero.headline[0],
    hero.headline[1],
    hero.headline[2],
    <>
      {hero.headline[3].replace(/feel\.?/i, '').trim()} <em className="serif-i hero__feel">feel.</em>
    </>,
  ];

  const fade = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: ready ? 1 : 0, y: ready ? 0 : 18 },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  return (
    <section className="hero" ref={sectionRef} aria-labelledby="hero-title">
      {/* Technical chrome — like a design canvas */}
      <div className="hero__chrome" aria-hidden="true">
        <span className="hero__ruler hero__ruler--top" />
        <span className="hero__ruler hero__ruler--left" />
        <span className="crosshair hero__cross hero__cross--tl" />
        <span className="crosshair hero__cross hero__cross--br" />
        <span className="hero__coords mono" ref={coordsRef}>
          X 0000 Y 0000
        </span>
        <span className="hero__frame-label mono">Frame 01 / Hero — 1440 × 900</span>
      </div>

      <motion.span className="hero__vertical-wrap" {...fade(1.1)} aria-hidden="true">
        <span className="hero__vertical mono">{hero.verticalLabel}</span>
      </motion.span>

      <div className="hero__grid">
        <motion.div className="hero__top mono" {...fade(0.2)}>
          <span className={`hero__avail hero__avail--${availability.status}`}>
            <span className="hero__avail-dot" aria-hidden="true" />
            {availability.label}
            <span className="hero__avail-note"> · {availability.note}</span>
          </span>
          <span className="hero__loc">
            {siteConfig.location} <span className="hero__coords-static">{siteConfig.coordinates}</span>
          </span>
        </motion.div>

        <RevealLines
          as="h1"
          id="hero-title"
          className="hero__title display"
          lineClassName="hero__line"
          lines={lines}
          inView={false}
          animate={ready}
          delay={0.15}
          stagger={0.11}
        />

        {/* Abstract composition */}
        <div className="hero__object" aria-hidden="true">
          <motion.span className="hero__disc" style={reduced ? undefined : { x: discX, y: discY }} />
          <motion.span className="hero__bar" style={reduced ? undefined : { x: barX, y: barY }} />
          <span className="hero__halftone halftone" />
          <span className="hero__ring anim-spin-slow">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="hero-ring-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text className="hero__ring-text">
                <textPath href="#hero-ring-path">
                  STHIR POKHREL · GRAPHIC DESIGN · UI/UX · KATHMANDU · VISUAL DESIGN ·
                </textPath>
              </text>
            </svg>
          </span>
          <motion.span
            className="hero__glyph display"
            style={reduced ? undefined : { rotateX, rotateY, skewX: skew }}
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            animate={reduced ? undefined : { opacity: ready ? 1 : 0, scale: ready ? 1 : 0.9 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
          >
            S
          </motion.span>
        </div>

        <motion.p className="hero__intro" {...fade(0.75)}>
          {hero.intro}
        </motion.p>

        <motion.div className="hero__ctas" {...fade(0.9)}>
          <MagneticLink to={`/${hero.primaryCta.href}`} className="btn" data-cursor="link">
            {hero.primaryCta.label} <ArrowDown size={16} aria-hidden="true" />
          </MagneticLink>
          <MagneticLink to={`/${hero.secondaryCta.href}`} className="btn btn--ghost" data-cursor="link">
            {hero.secondaryCta.label} <ArrowUpRight size={16} aria-hidden="true" />
          </MagneticLink>
        </motion.div>

        <motion.div className="hero__scroll mono" {...fade(1.2)} aria-hidden="true">
          <span className="hero__scroll-line">
            <span />
          </span>
          Scroll
        </motion.div>
      </div>

      <motion.div className="hero__marquee marquee" {...fade(1.1)} aria-hidden="true">
        <div className="marquee__track display">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="hero__marquee-group">
              <span>Graphic Design</span>
              <span className="hero__marquee-dot" />
              <span>UI / UX</span>
              <span className="hero__marquee-dot" />
              <span>Visual Identity</span>
              <span className="hero__marquee-dot" />
              <span className="serif-i">Kathmandu, Nepal</span>
              <span className="hero__marquee-dot" />
              <span>Digital Experiences</span>
              <span className="hero__marquee-dot" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
