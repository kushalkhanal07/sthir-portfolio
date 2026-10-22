import { useEffect, useState } from 'react';

/** Generic matchMedia hook. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Desktop = wide viewport AND a fine pointer (mouse / trackpad). */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px) and (pointer: fine)');
}

/** Fine pointer only (used for cursor + magnetic effects). */
export function useFinePointer() {
  return useMediaQuery('(pointer: fine) and (hover: hover)');
}

export default useMediaQuery;
