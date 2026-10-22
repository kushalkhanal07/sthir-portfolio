import { ArrowUpRight } from 'lucide-react';
import siteConfig from '../data/siteConfig';
import { Reveal, RevealLines } from './Reveal';
import './Contact.css';

/**
 * Contact section — a bold editorial close with direct links.
 * There is no form: visitors email directly, so nothing is faked or stored.
 */
export default function Contact() {
  const { email, links, contactSection } = siteConfig;

  return (
    <section id="contact" className="contact theme-dark section on-dark" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-head">
          <span className="index">06 / Contact</span>
          <span className="title">Let’s make something</span>
        </div>

        <div className="contact__grid">
          <div className="contact__left">
            <RevealLines
              as="h2"
              id="contact-title"
              className="contact__headline display"
              lines={contactSection.headline.map((l, i) =>
                i === 1 ? (
                  <>
                    {l.replace("LET'S", '')}
                    <em className="serif-i">let’s</em>
                  </>
                ) : (
                  l
                )
              )}
            />
          </div>

          <div className="contact__right">
            <Reveal as="p" className="contact__support" delay={0.1}>
              {contactSection.supporting}
            </Reveal>

            <Reveal className="contact__links" delay={0.15}>
              <a href={`mailto:${email}`} className="contact__email" data-cursor="link">
                <span className="contact__email-text">{email}</span>
                <ArrowUpRight size={28} aria-hidden="true" />
              </a>
              <ul className="contact__social">
                {links.behance && (
                  <li>
                    <a href={links.behance} target="_blank" rel="noreferrer noopener" className="link-line">
                      Behance
                    </a>
                  </li>
                )}
                {links.linkedin && (
                  <li>
                    <a href={links.linkedin} target="_blank" rel="noreferrer noopener" className="link-line">
                      LinkedIn
                    </a>
                  </li>
                )}
                <li>
                  <span className="mono contact__loc">{siteConfig.location}</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
