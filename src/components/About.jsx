import siteConfig from '../data/siteConfig';
import { Reveal, RevealLines } from './Reveal';
import ExperienceTimeline from './ExperienceTimeline';
import Skills from './Skills';
import Artwork from './Artwork';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about section" aria-labelledby="about-title">
      <div className="container">
        <div className="section-head">
          <span className="index">03 / About</span>
          <span className="title">Multidisciplinary by design</span>
        </div>

        <RevealLines
          as="h2"
          id="about-title"
          className="about__headline display"
          lines={[
            'THINKING IN SYSTEMS.',
            <>
              DESIGNING WITH <em className="serif-i">feeling.</em>
            </>,
          ]}
        />

        <div className="about__grid">
          <Reveal className="about__portrait" amount={0.2}>
            <div className="about__portrait-frame media-frame">
              {siteConfig.portrait ? (
                <img src={siteConfig.portrait} alt={`${siteConfig.name}, portrait`} loading="lazy" decoding="async" />
              ) : (
                <Artwork variant="shapes" props={{ scheme: 'ink' }} title="Abstract composition standing in for a portrait" />
              )}
            </div>
            <p className="about__portrait-caption mono">
              {siteConfig.name} — {siteConfig.location}
            </p>
          </Reveal>

          <div className="about__text">
            <Reveal as="p" className="about__lede serif">
              I’m a multidisciplinary designer who moves between graphic design, digital interfaces and visual storytelling —
              with enough frontend knowledge to know what happens after the hand-off.
            </Reveal>
            <Reveal as="p" delay={0.05}>
              {siteConfig.summary}
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Starting out as a frontend intern taught me how designs become code: what a grid costs, why a type scale
              matters, and where interactions get expensive. That understanding shapes how I work with developers and
              product teams today — specs are clearer, conversations are shorter, and the design that ships is the design
              that was intended.
            </Reveal>
            <Reveal as="p" delay={0.15}>
              Visual craft and usability are not opposites. A brand system should feel as considered as a checkout flow,
              and a checkout flow should have as much character as a poster.
            </Reveal>
          </div>
        </div>

        <ExperienceTimeline />
        <Skills />
      </div>
    </section>
  );
}
