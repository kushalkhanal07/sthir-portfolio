import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../data/projects';
import siteConfig from '../data/siteConfig';
import PageTransition from '../components/PageTransition';
import CaseStudy from '../components/CaseStudy';
import Footer from '../components/Footer';
import NotFound from './NotFound';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (project) document.title = `${project.title} — ${siteConfig.name}`;
  }, [project]);

  if (!project) return <NotFound />;

  return (
    <PageTransition className="page page--project">
      <CaseStudy project={project} key={project.slug} />
      <Footer />
    </PageTransition>
  );
}
