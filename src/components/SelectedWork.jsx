import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import projects from '../data/projects';
import siteConfig from '../data/siteConfig';
import useReducedMotion from '../hooks/useReducedMotion';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { gsap, ScrollTrigger } from '../lib/scroll';
import ProjectItem from './ProjectItem';
import { Reveal, RevealLines } from './Reveal';
import './SelectedWork.css';

/**
 * Selected Work — on desktop the gallery is pinned and scrolls horizontally
 * (GSAP ScrollTrigger). On touch / narrow / reduced-motion it is a vertical
 * editorial list. The DOM is identical in both cases.
 */
export default function SelectedWork() {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const horizontal = isDesktop && !reduced;

  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (!horizontal) return undefined;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return undefined;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const setters = itemRefs.current.filter(Boolean).map((el) => {
        const inner = el.querySelector('.work-item__media-inner');
        return inner ? gsap.quickSetter(inner, 'x', 'px') : null;
      });

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
            if (counterRef.current) {
              const idx = Math.min(projects.length, Math.max(1, Math.round(self.progress * (projects.length - 1)) + 1));
              counterRef.current.textContent = String(idx).padStart(2, '0');
            }
            // light parallax: media drifts against the direction of travel
            const vw = window.innerWidth;
            itemRefs.current.forEach((el, i) => {
              if (!el || !setters[i]) return;
              const r = el.getBoundingClientRect();
              const center = (r.left + r.width / 2 - vw / 2) / vw; // -1 … 1
              setters[i](center * -36);
            });
          },
        },
      });
    }, pin);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
      itemRefs.current.forEach((el) => {
        const inner = el?.querySelector('.work-item__media-inner');
        if (inner) inner.style.transform = '';
      });
    };
  }, [horizontal]);

  return (
    <section id="work" className={`work ${horizontal ? 'work--horizontal' : 'work--vertical'}`} aria-labelledby="work-title">
      <div className="container">
        <div className="section-head">
          <span className="index">02 / Selected Work</span>
          <span className="title">Five directions, one eye</span>
        </div>
        <div className="work__intro">
          <RevealLines
            as="h2"
            id="work-title"
            className="work__headline display"
            lines={[
              'WORK THAT',
              <>
                <em className="serif-i">moves</em> PEOPLE.
              </>,
            ]}
          />
          <Reveal as="p" className="work__lede" delay={0.15}>
            Identity systems, product interfaces and graphic campaigns. Concept studies are labelled — everything here is
            built to be replaced with shipped work as it becomes public.
          </Reveal>
        </div>
      </div>

      <div className="work__pin" ref={pinRef}>
        {horizontal && (
          <div className="work__hud mono" aria-hidden="true">
            <span className="work__hud-count">
              <span ref={counterRef}>01</span> / {String(projects.length).padStart(2, '0')}
            </span>
            <span className="work__hud-bar">
              <span ref={progressRef} />
            </span>
            <span className="work__hud-hint">Scroll to explore →</span>
          </div>
        )}

        <div className="work__track" ref={trackRef}>
          {projects.map((p, i) => (
            <ProjectItem
              key={p.slug}
              project={p}
              index={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
            />
          ))}

          <div className="work__end">
            <p className="work__end-title display">
              MORE ON
              <br />
              <em className="serif-i">Behance.</em>
            </p>
            <a href={siteConfig.links.behance} target="_blank" rel="noreferrer noopener" className="btn btn--ghost" data-cursor="link">
              Open profile <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
