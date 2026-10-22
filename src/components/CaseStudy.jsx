import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { getNextProject, getPrevProject } from '../data/projects';
import useReducedMotion from '../hooks/useReducedMotion';
import Media from './Media';
import { Reveal, RevealLines } from './Reveal';
import './CaseStudy.css';

const DEFAULT_LABELS = {
  overview: 'Overview',
  problem: 'Problem statement',
  goals: 'Project goals',
  research: 'Research & insights',
  flow: 'User flow & information architecture',
  wireframes: 'Wireframes & exploration',
  visual: 'Visual direction & design system',
  screens: 'Final screens & mockups',
  interaction: 'Interaction & responsive behaviour',
  reflection: 'Reflection & next steps',
};

function SectionHead({ index, label }) {
  return (
    <Reveal className="cs-section__head" amount={0.5}>
      <span className="cs-section__index mono">{index}</span>
      <h2 className="cs-section__title">{label}</h2>
    </Reveal>
  );
}

/**
 * Reusable case-study template. Only sections present in `project.caseStudy`
 * are rendered, so branding, product and lab projects share one layout.
 */
export default function CaseStudy({ project }) {
  const cs = project.caseStudy || {};
  const labels = { ...DEFAULT_LABELS, ...(cs.labels || {}) };
  const next = getNextProject(project.slug);
  const prev = getPrevProject(project.slug);
  const reduced = useReducedMotion();

  const coverRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ['start start', 'end start'] });
  const coverY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const coverScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  let n = 1;
  const idx = () => String(n++).padStart(2, '0');

  return (
    <article className="cs">
      {/* 01 — Cover */}
      <header className="cs-cover" ref={coverRef}>
        <motion.div className="cs-cover__media" style={reduced ? undefined : { y: coverY, scale: coverScale }}>
          <Media media={project.cover} caption={false} priority />
        </motion.div>
        <div className="cs-cover__scrim" aria-hidden="true" />
        <motion.div className="cs-cover__content container" style={reduced ? undefined : { y: titleY }}>
          <div className="cs-cover__top mono">
            <Link to="/#work" className="cs-cover__back">
              <ArrowLeft size={14} aria-hidden="true" /> All work
            </Link>
            <span>
              Project {project.number} — {project.category}
            </span>
          </div>
          <RevealLines as="h1" className="cs-cover__title display" lines={splitTitle(project.title)} inView={false} animate delay={0.2} />
          <p className="cs-cover__tagline serif">{project.tagline}</p>
          {project.concept && (
            <p className="cs-cover__concept mono">
              <span aria-hidden="true">◆</span> Concept study — visuals are illustrative
            </p>
          )}
        </motion.div>
      </header>

      {/* 02 — Overview with sticky metadata */}
      <section className="cs-section cs-overview container" aria-labelledby="cs-overview">
        <aside className="cs-meta">
          <dl className="cs-meta__list">
            <div>
              <dt className="label">Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt className="label">Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt className="label">Category</dt>
              <dd>{project.category}</dd>
            </div>
            {project.tools?.length > 0 && (
              <div>
                <dt className="label">Tools</dt>
                <dd>
                  <ul className="cs-meta__tools">
                    {project.tools.map((t) => (
                      <li key={t} className="mono">
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            <div>
              <dt className="label">Status</dt>
              <dd>{project.concept ? 'Concept / illustrative' : 'Shipped'}</dd>
            </div>
          </dl>
        </aside>
        <div className="cs-overview__body">
          <SectionHead index={idx()} label={labels.overview} />
          <Reveal as="p" className="cs-overview__text" id="cs-overview">
            {project.overview}
          </Reveal>
          {project.concept && project.conceptNote && (
            <Reveal as="p" className="cs-note" delay={0.05}>
              <strong>Note:</strong> {project.conceptNote}
            </Reveal>
          )}
        </div>
      </section>

      {/* 03 — Problem */}
      {cs.problem && (
        <section className="cs-section cs-problem container">
          <SectionHead index={idx()} label={labels.problem} />
          <Reveal as="p" className="cs-problem__text serif">
            {cs.problem}
          </Reveal>
        </section>
      )}

      {/* 04 — Goals */}
      {cs.goals && (
        <section className="cs-section cs-goals container">
          <SectionHead index={idx()} label={labels.goals} />
          <ol className="cs-goals__list">
            {cs.goals.map((g, i) => (
              <Reveal as="li" key={g} delay={i * 0.06} amount={0.4}>
                <span className="cs-goals__num display">{String(i + 1).padStart(2, '0')}</span>
                <span>{g}</span>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      {/* 05 — Research */}
      {cs.research && (
        <section className="cs-section cs-research container">
          <SectionHead index={idx()} label={labels.research} />
          {cs.research.intro && (
            <Reveal as="p" className="cs-intro">
              {cs.research.intro}
            </Reveal>
          )}
          <div className="cs-research__grid">
            {cs.research.insights?.map((ins, i) => (
              <Reveal key={ins.title} className="cs-insight" delay={i * 0.07} amount={0.3}>
                <span className="cs-insight__index mono">Insight {String(i + 1).padStart(2, '0')}</span>
                <h3 className="cs-insight__title">{ins.title}</h3>
                <p>{ins.text}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* 06 — Flow / IA */}
      {cs.flow && (
        <section className="cs-section cs-flow container">
          <SectionHead index={idx()} label={labels.flow} />
          <div className="cs-flow__grid">
            <div>
              {cs.flow.intro && (
                <Reveal as="p" className="cs-intro">
                  {cs.flow.intro}
                </Reveal>
              )}
              <ol className="cs-flow__steps">
                {cs.flow.steps?.map((s, i) => (
                  <Reveal as="li" key={s} delay={i * 0.05} amount={0.4}>
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                    {s}
                  </Reveal>
                ))}
              </ol>
            </div>
            {cs.flow.media && (
              <Reveal className="cs-flow__media" amount={0.2}>
                <Media media={cs.flow.media} />
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* 07 — Wireframes */}
      {cs.wireframes && (
        <section className="cs-section cs-wire container">
          <SectionHead index={idx()} label={labels.wireframes} />
          {cs.wireframes.intro && (
            <Reveal as="p" className="cs-intro">
              {cs.wireframes.intro}
            </Reveal>
          )}
          <Gallery items={cs.wireframes.media} />
        </section>
      )}

      {/* 08 — Visual direction */}
      {cs.visual && (
        <section className="cs-section cs-visual container">
          <SectionHead index={idx()} label={labels.visual} />
          {cs.visual.intro && (
            <Reveal as="p" className="cs-intro">
              {cs.visual.intro}
            </Reveal>
          )}
          <div className="cs-visual__grid">
            {cs.visual.colors && (
              <Reveal className="cs-visual__colors" amount={0.3}>
                <span className="label">Colour roles</span>
                <ul>
                  {cs.visual.colors.map((c) => (
                    <li key={c.hex} className="cs-swatch">
                      <span className="cs-swatch__chip" style={{ background: c.hex }} aria-hidden="true" />
                      <span className="cs-swatch__name">{c.name}</span>
                      <span className="cs-swatch__role">{c.role}</span>
                      <span className="cs-swatch__hex mono">{c.hex}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {cs.visual.type && (
              <Reveal className="cs-visual__type" amount={0.3} delay={0.1}>
                <span className="label">Type roles</span>
                <ul>
                  {cs.visual.type.map((t) => (
                    <li key={t.family} className="cs-type">
                      <span className="cs-type__sample" style={{ fontFamily: `'${t.family}', sans-serif` }}>
                        {t.sample}
                      </span>
                      <span className="cs-type__family">{t.family}</span>
                      <span className="cs-type__role">{t.role}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
          {cs.visual.media && (
            <Reveal className="cs-visual__media" amount={0.2}>
              <Media media={cs.visual.media} />
            </Reveal>
          )}
        </section>
      )}

      {/* 09 — Final screens */}
      {cs.screens && (
        <section className="cs-section cs-screens container">
          <SectionHead index={idx()} label={labels.screens} />
          {cs.screens.intro && (
            <Reveal as="p" className="cs-intro">
              {cs.screens.intro}
            </Reveal>
          )}
          <Gallery items={cs.screens.media} editorial />
        </section>
      )}

      {/* 10 — Interaction & responsive */}
      {cs.interaction && (
        <section className="cs-section cs-interaction container">
          <SectionHead index={idx()} label={labels.interaction} />
          <div className="cs-interaction__grid">
            <div>
              {cs.interaction.intro && (
                <Reveal as="p" className="cs-intro">
                  {cs.interaction.intro}
                </Reveal>
              )}
              <ul className="cs-interaction__points">
                {cs.interaction.points?.map((p, i) => (
                  <Reveal as="li" key={p} delay={i * 0.05} amount={0.4}>
                    {p}
                  </Reveal>
                ))}
              </ul>
            </div>
            {cs.interaction.media && (
              <Reveal className="cs-interaction__media" amount={0.2}>
                <Media media={cs.interaction.media} />
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* 11 — Reflection */}
      {cs.reflection && (
        <section className="cs-section cs-reflection container">
          <SectionHead index={idx()} label={labels.reflection} />
          <div className="cs-reflection__grid">
            <Reveal as="p" className="cs-reflection__text serif">
              {cs.reflection.text}
            </Reveal>
            {cs.reflection.next && (
              <Reveal className="cs-reflection__next" delay={0.1}>
                <span className="label">Potential next steps</span>
                <ul>
                  {cs.reflection.next.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Next / previous navigation */}
      <nav className="cs-next theme-dark on-dark" aria-label="Project navigation">
        <div className="container cs-next__inner">
          <Link to={`/work/${prev.slug}`} className="cs-next__prev mono">
            <ArrowLeft size={14} aria-hidden="true" /> Previous — {prev.shortTitle}
          </Link>
          <Link to={`/work/${next.slug}`} className="cs-next__link" data-cursor="view" data-cursor-label="Next">
            <span className="cs-next__label mono">Next project — {next.number}</span>
            <span className="cs-next__title display">
              {next.title} <ArrowRight className="cs-next__arrow" size={40} aria-hidden="true" />
            </span>
            <span className="cs-next__thumb" aria-hidden="true">
              <Media media={next.thumb} caption={false} />
            </span>
          </Link>
          <Link to="/#work" className="cs-next__all mono">
            All work <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </article>
  );
}

function splitTitle(title) {
  const words = title.split(' ');
  if (words.length <= 2) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

/** Image gallery with varied widths for an editorial rhythm. */
function Gallery({ items = [], editorial = false }) {
  return (
    <div className={`cs-gallery ${editorial ? 'cs-gallery--editorial' : ''}`}>
      {items.map((m, i) => (
        <Reveal key={i} className={`cs-gallery__item cs-gallery__item--${i % 5}`} delay={(i % 2) * 0.08} amount={0.15}>
          <Media media={m} />
        </Reveal>
      ))}
    </div>
  );
}
