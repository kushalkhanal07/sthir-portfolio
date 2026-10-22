import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { AppProvider } from './context/AppContext';
import SmoothScroll from './components/SmoothScroll';
import ScrollManager from './components/ScrollManager';
import Preloader, { shouldSkipPreloader } from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();
  const skipPreloader = shouldSkipPreloader();

  return (
    <AppProvider initialReady={skipPreloader}>
      <SmoothScroll />
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {!skipPreloader && <Preloader />}
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </AppProvider>
  );
}
