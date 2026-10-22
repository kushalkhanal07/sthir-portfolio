import siteConfig from '../data/siteConfig';
import { Reveal } from './Reveal';

/** Compact professional timeline, driven by siteConfig.experience. */
export default function ExperienceTimeline() {
  return (
    <div className="timeline" aria-labelledby="timeline-title">
      <div className="timeline__head">
        <h3 id="timeline-title" className="label">
          Experience
        </h3>
        <p className="timeline__note mono">{siteConfig.yearsOfExperience} years</p>
      </div>

      <ol className="timeline__list">
        {siteConfig.experience.map((job, i) => (
          <Reveal as="li" key={job.company} className="timeline__item" delay={i * 0.08} amount={0.3}>
            <span className="timeline__dot" aria-hidden="true" />
            <div className="timeline__years display">{job.years}</div>
            <div className="timeline__body">
              <div className="timeline__role">
                <span className="timeline__role-title">{job.role}</span>
                <span className="timeline__company">
                  {job.company} <span className="mono timeline__type">· {job.type}</span>
                </span>
              </div>
              <time className="timeline__period mono">{job.period}</time>
              <ul className="timeline__points">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
        <Reveal as="li" className="timeline__item timeline__item--edu" delay={0.25} amount={0.3}>
          <span className="timeline__dot" aria-hidden="true" />
          <div className="timeline__years display">{siteConfig.education.year}</div>
          <div className="timeline__body">
            <div className="timeline__role">
              <span className="timeline__role-title">{siteConfig.education.degree}</span>
              <span className="timeline__company">{siteConfig.education.school}</span>
            </div>
            <span className="timeline__period mono">Education</span>
          </div>
        </Reveal>
      </ol>
    </div>
  );
}
