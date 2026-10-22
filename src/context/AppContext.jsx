import { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext({ ready: true, setReady: () => {} });

/**
 * `ready` flips to true once the preloader has finished (or was skipped).
 * Sections that animate on first paint wait for it so the opening sequence
 * reads as one piece.
 */
export function AppProvider({ children, initialReady = false }) {
  const [ready, setReady] = useState(initialReady);
  const value = useMemo(() => ({ ready, setReady }), [ready]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
