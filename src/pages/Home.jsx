import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import SelectedWork from '../components/SelectedWork';
import About from '../components/About';
import DesignProcess from '../components/DesignProcess';
import TypePlay from '../components/TypePlay';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import siteConfig from '../data/siteConfig';

export default function Home() {
  useEffect(() => {
    document.title = `${siteConfig.name} — Graphic Designer & UI/UX Designer`;
  }, []);

  return (
    <PageTransition className="page page--home">
      <Hero />
      <SelectedWork />
      <About />
      <DesignProcess />
      <TypePlay />
      <Contact />
      <Footer />
    </PageTransition>
  );
}
