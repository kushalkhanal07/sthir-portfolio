import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import siteConfig from '../data/siteConfig';
import useReducedMotion from '../hooks/useReducedMotion';
import { Reveal, RevealLines } from './Reveal';
import './DesignProcess.css';

/**
 * Four-step process as a connected sequence. A vertical line draws as you
 * scroll (scroll-linked, not time-based) and each step expands to show
 * how the stage actually works and what it produces.
 */
export default function DesignProcess() {
  const steps = siteConfig.process;
  const [open, setOpen] = useState(steps[0].index);
  const reduced = useReducedMotion();
  const listRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 70%', 'end 60%'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="process section" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head">
          <span className="index">04 / Process</span>
          <span className="title">How the work gets made</span>
        </div>

        <div className="process__grid">
          <div className="process__intro">
            <RevealLines
              as="h2"
              id="process-title"
              className="process__headline display"
              lines={[
                'FOUR',
                'STEPS,',
                <>
                  <em className="serif-i">many</em> LOOPS.
                </>,
              ]}
            />
            <Reveal as="p" className="process__lede" delay={0.1}>
              The sequence is simple. The discipline is in going back a step when the work tells you to — and in keeping
              the people who build it in the room from the start.
            </Reveal>
            <Reveal className="process__legend mono" delay={0.2} aria-hidden="true">
              <span>
                <i className="process__legend-dot process__legend-dot--orange" /> Current stage
              </span>
              <span>
                <i className="process__legend-dot" /> Output
              </span>
            </Reveal>
          </div>

          <ol className="process__list" ref={listRef}>
            <span className="process__rail" aria-hidden="true">
              <motion.span className="process__rail-fill" style={reduced ? { scaleY: 1 } : { scaleY }} />
            </span>

            {steps.map((step) => {
              const expanded = open === step.index;
              const panelId = `process-panel-${step.index}`;
              return (
                <li key={step.index} className={`process__step ${expanded ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="process__trigger"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : step.index)}
                  >
                    <span className="process__node" aria-hidden="true" />
                    <span className="process__index display">{step.index}</span>
                    <span className="process__title display">{step.title}</span>
                    <span className="process__summary">{step.summary}</span>
                    <span className="process__icon" aria-hidden="true">
                      <Plus size={18} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        id={panelId}
                        className="process__panel"
                        key="panel"
                        initial={reduced ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduced ? { height: 0, opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="process__panel-inner">
                          <p className="process__detail">{step.detail}</p>
                          <ul className="process__artifacts" aria-label={`Outputs of ${step.title}`}>
                            {step.artifacts.map((a) => (
                              <li key={a} className="mono">
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
