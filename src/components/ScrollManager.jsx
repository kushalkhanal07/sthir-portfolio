import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollTo, ScrollTrigger } from '../lib/scroll';

/**
 * Handles scroll position on navigation:
 *  - new pathname → jump to top
 *  - hash present  → smooth-scroll to that section (after the page has painted)
 */
export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;
    if (!hash) {
      scrollTo(0, { immediate: true });
      return undefined;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer = 0;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        ScrollTrigger.refresh();
        scrollTo(el, { offset: 0 });
        return;
      }
      if (tries++ < 20) timer = window.setTimeout(attempt, 60);
    };
    timer = window.setTimeout(attempt, 420); // allow the page transition to finish
    return () => window.clearTimeout(timer);
  }, [location.key, location.hash, location.pathname]);

  return null;
}
