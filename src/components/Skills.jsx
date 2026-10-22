import { useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import siteConfig from '../data/siteConfig';
import useReducedMotion from '../hooks/useReducedMotion';
import { Reveal } from './Reveal';

/**
 * Interactive, grouped skills. Implemented as an accessible tablist:
 * arrow keys move between groups, the active panel lists capabilities as tags.
 * No invented percentages or ratings — proficiency is implied by the groups.
 */
export default function Skills() {
  const groups = siteConfig.skillGroups;
  const [active, setActive] = useState(groups[0].id);
  const reduced = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef([]);

  const current = groups.find((g) => g.id === active) || groups[0];

  const onKeyDown = (e, i) => {
    const last = groups.length - 1;
    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(groups[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="skills" aria-labelledby="skills-title">
      <div className="skills__head">
        <h3 id="skills-title" className="label">
          Capabilities
        </h3>
        <p className="skills__note mono">Grouped, not graded</p>
      </div>

      <div className="skills__layout">
        <div className="skills__tabs" role="tablist" aria-orientation="vertical" aria-label="Skill groups">
          {groups.map((g, i) => {
            const selected = g.id === active;
            return (
              <button
                key={g.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${g.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${g.id}`}
                tabIndex={selected ? 0 : -1}
                className={`skills__tab ${selected ? 'is-active' : ''}`}
                onClick={() => setActive(g.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                onMouseEnter={() => setActive(g.id)}
              >
                <span className="skills__tab-index mono">{g.index}</span>
                <span className="skills__tab-label">{g.label}</span>
                <span className="skills__tab-count mono">{g.items.length}</span>
              </button>
            );
          })}
        </div>

        <div
          className="skills__panel"
          role="tabpanel"
          id={`${baseId}-panel-${current.id}`}
          aria-labelledby={`${baseId}-tab-${current.id}`}
          tabIndex={0}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="skills__blurb serif">{current.blurb}</p>
              <ul className="skills__tags">
                {current.items.map((item, i) => (
                  <motion.li
                    key={item}
                    className="skills__tag"
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: reduced ? 0 : 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Reveal className="skills__soft" amount={0.4}>
        <span className="label">Working style</span>
        <p>
          {siteConfig.softSkills.map((s, i) => (
            <span key={s}>
              {s}
              {i < siteConfig.softSkills.length - 1 && <span className="skills__sep" aria-hidden="true" />}
            </span>
          ))}
        </p>
      </Reveal>
    </div>
  );
}
