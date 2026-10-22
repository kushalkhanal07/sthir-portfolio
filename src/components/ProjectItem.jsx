import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Media from './Media';

/**
 * One entry in the Selected Work gallery. Sizes vary per project
 * (`size: 'wide' | 'tall' | 'square'`) to avoid a uniform card grid.
 */
const ProjectItem = forwardRef(function ProjectItem({ project, index }, ref) {
  const href = `/work/${project.slug}`;
  return (
    <article className={`work-item work-item--${project.size || 'wide'} work-item--${project.accent}`} ref={ref} style={{ '--i': index }}>
      <Link to={href} className="work-item__media" data-cursor="view" aria-label={`View case study: ${project.title}`}>
        <div className="work-item__media-inner">
          <Media media={project.thumb} caption={false} />
        </div>
        <span className="work-item__tag" aria-hidden="true">
          <span className="work-item__num">{project.number}</span>
          <span className="work-item__cat">{project.category}</span>
        </span>
        {project.concept && (
          <span className="work-item__concept mono" aria-hidden="true">
            Concept
          </span>
        )}
      </Link>

      <div className="work-item__body">
        <h3 className="work-item__title">
          <Link to={href} className="work-item__title-link">
            <span>{project.title}</span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </h3>
        <p className="work-item__tagline">{project.tagline}</p>
        <dl className="work-item__meta mono">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
});

export default ProjectItem;
