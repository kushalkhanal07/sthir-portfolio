import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import siteConfig from '../data/siteConfig';
import useReducedMotion from '../hooks/useReducedMotion';
import { lockScroll } from '../lib/scroll';
import './Navbar.css';

function useKathmanduTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: siteConfig.timeZone,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

const EASE = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const time = useKathmanduTime();
  const reduced = useReducedMotion();

  // Close the menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash, location.key]);

  // Lock page scroll while the overlay is open
  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand" aria-label={`${siteConfig.name} — home`}>
            <span className="nav__mark" aria-hidden="true">
              <span className="nav__mark-dot" />
              {siteConfig.shortName}
            </span>
            <span className="nav__brand-name">{siteConfig.name}</span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            <ol>
              {siteConfig.nav.map((item, i) => (
                <li key={item.href}>
                  <Link to={item.href} className="nav__link">
                    <span className="nav__link-index">0{i + 1}</span>
                    <span className="nav__link-text">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="nav__meta" aria-label="Local time in Kathmandu">
            <span className="nav__time mono">
              KTM <time dateTime={time}>{time}</time>
            </span>
            {!isHome && (
              <Link to="/" className="nav__back mono">
                ← Index
              </Link>
            )}
          </div>

          <button
            type="button"
            className={`nav__toggle ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav__toggle-line" />
            <span className="nav__toggle-line" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduced ? 0.15 : 0.7, ease: EASE }}
          >
            <div className="menu__inner">
              <div className="menu__top mono">
                <span>Menu</span>
                <span>{siteConfig.location}</span>
              </div>

              <nav aria-label="Mobile">
                <ol className="menu__list">
                  {siteConfig.nav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '60%', opacity: 0 }}
                      transition={{ duration: reduced ? 0.1 : 0.7, ease: EASE, delay: reduced ? 0 : 0.25 + i * 0.07 }}
                    >
                      <Link to={item.href} className="menu__link display" onClick={() => setOpen(false)}>
                        <span className="menu__index mono">0{i + 1}</span>
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ol>
              </nav>

              <motion.div
                className="menu__bottom"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: reduced ? 0 : 0.55, duration: 0.5 }}
              >
                <a href={`mailto:${siteConfig.email}`} className="menu__email link-line">
                  {siteConfig.email}
                </a>
                <div className="menu__social">
                  {siteConfig.links.behance && (
                    <a href={siteConfig.links.behance} target="_blank" rel="noreferrer noopener">
                      Behance <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                  {siteConfig.links.linkedin && (
                    <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer noopener">
                      LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
