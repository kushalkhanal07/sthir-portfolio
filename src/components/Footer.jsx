import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import siteConfig from '../data/siteConfig';
import useReducedMotion from '../hooks/useReducedMotion';
import { scrollTo } from '../lib/scroll';
import './Footer.css';

/** Animated signature: a single stroke that draws itself when scrolled into view. */
function Signature() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  return (
    <svg ref={ref} className="footer__sig" viewBox="0 0 260 90" aria-hidden="true" focusable="false">
      <motion.path
        d="M14 62 C 30 20, 56 14, 62 34 C 68 56, 40 74, 30 60 C 22 48, 60 40, 84 44 C 108 48, 96 70, 118 60 C 134 52, 128 36, 146 40 C 166 44, 150 70, 176 62 C 198 54, 184 38, 204 42 C 224 46, 214 66, 246 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx="252"
        cy="48"
        r="3"
        fill="var(--orange)"
        initial={reduced ? { scale: 1 } : { scale: 0 }}
        animate={inView ? { scale: 1 } : undefined}
        transition={{ delay: 2, duration: 0.4 }}
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer theme-dark on-dark" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Signature />
          <p className="footer__name display">{siteConfig.name}</p>
          <p className="footer__role mono">{siteConfig.role}</p>
        </div>

        <div className="footer__cols">
          <div>
            <span className="label">Based in</span>
            <p>{siteConfig.location}</p>
            <p className="mono footer__coords">{siteConfig.coordinates}</p>
          </div>
          <div>
            <span className="label">Elsewhere</span>
            <ul>
              {siteConfig.links.behance && (
                <li>
                  <a href={siteConfig.links.behance} target="_blank" rel="noreferrer noopener" className="link-line">
                    Behance
                  </a>
                </li>
              )}
              {siteConfig.links.linkedin && (
                <li>
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer noopener" className="link-line">
                    LinkedIn
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${siteConfig.email}`} className="link-line">
                  Email
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="label">Index</span>
            <ul>
              {siteConfig.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-line">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="mono">© {year} {siteConfig.name}. Kathmandu, Nepal.</span>
          <span className="mono footer__note">Type: Space Grotesk · Instrument Serif · JetBrains Mono</span>
          <button type="button" className="footer__top mono" onClick={() => scrollTo(0)} aria-label="Back to top">
            Top <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
