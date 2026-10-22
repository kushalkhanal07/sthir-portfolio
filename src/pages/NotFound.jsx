import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';
import siteConfig from '../data/siteConfig';

export default function NotFound() {
  useEffect(() => {
    document.title = `Not found — ${siteConfig.name}`;
  }, []);

  return (
    <PageTransition className="page page--404">
      <section className="container section" style={{ minHeight: '80svh', display: 'grid', alignContent: 'center', gap: 'var(--space-3)', paddingTop: 'calc(var(--nav-h) + var(--space-5))' }}>
        <span className="mono" style={{ color: 'var(--muted)' }}>
          Error 404
        </span>
        <h1 className="display" style={{ fontSize: 'var(--step-5)' }}>
          NOTHING <em className="serif-i" style={{ color: 'var(--orange)' }}>here.</em>
        </h1>
        <p className="lede">This frame is empty. The work is back on the index.</p>
        <Link to="/" className="btn" style={{ width: 'fit-content' }}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to index
        </Link>
      </section>
      <Footer />
    </PageTransition>
  );
}
