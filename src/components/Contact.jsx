import { useId, useState } from 'react';
import { ArrowUpRight, Check, CircleAlert, Send } from 'lucide-react';
import siteConfig from '../data/siteConfig';
import useMagnetic from '../hooks/useMagnetic';
import { Reveal, RevealLines } from './Reveal';
import './Contact.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please add your name.';
  if (!values.email.trim()) errors.email = 'Please add your email.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email doesn’t look right.';
  if (!values.message.trim()) errors.message = 'Tell me a little about the project.';
  else if (values.message.trim().length < 10) errors.message = 'A sentence or two helps — at least 10 characters.';
  return errors;
}

/**
 * Contact section + honest form.
 * With `siteConfig.contact.formEndpoint` set, the form POSTs JSON there.
 * Without it, the form composes a mailto: link and says so plainly.
 */
export default function Contact() {
  const id = useId();
  const { email, links, contactSection, contact } = siteConfig;
  const hasEndpoint = Boolean(contact.formEndpoint);
  const useGmail = contact.fallback === 'gmail';

  const [values, setValues] = useState({ name: '', email: '', message: '', company: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error
  const submitRef = useMagnetic(0.2);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) setErrors(validate({ ...values, [name]: value }));
  };
  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.company) return; // honeypot
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    if (!hasEndpoint) {
      const subject = encodeURIComponent(`${contact.subjectPrefix}${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name}\n${values.email}`);
      if (useGmail) {
        const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${subject}&body=${body}`;
        const win = window.open(url, '_blank', 'noopener,noreferrer');
        if (!win) window.location.href = `mailto:${email}?subject=${subject}&body=${body}`; // popup blocked
      } else {
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      }
      setStatus('mailto');
      return;
    }

    try {
      setStatus('sending');
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, message: values.message }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('sent');
      setValues({ name: '', email: '', message: '', company: '' });
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  const field = (name, label, type = 'text', extra = {}) => {
    const invalid = Boolean(touched[name] && errors[name]);
    const Tag = type === 'textarea' ? 'textarea' : 'input';
    return (
      <div className={`field ${invalid ? 'is-invalid' : ''}`}>
        <label htmlFor={`${id}-${name}`} className="field__label mono">
          {label}
        </label>
        <Tag
          id={`${id}-${name}`}
          name={name}
          type={type === 'textarea' ? undefined : type}
          value={values[name]}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-${name}-err` : undefined}
          className="field__input"
          autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : 'off'}
          {...extra}
        />
        <span className="field__line" aria-hidden="true" />
        {invalid && (
          <p id={`${id}-${name}-err`} className="field__error" role="alert">
            <CircleAlert size={14} aria-hidden="true" /> {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <section id="contact" className="contact theme-dark section on-dark" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-head">
          <span className="index">06 / Contact</span>
          <span className="title">Let’s make something</span>
        </div>

        <div className="contact__grid">
          <div className="contact__left">
            <RevealLines as="h2" id="contact-title" className="contact__headline display" lines={contactSection.headline.map((l, i) => (i === 1 ? <>{l.replace("LET'S", '')}<em className="serif-i">let’s</em></> : l))} />
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

          <Reveal className="contact__form-wrap" delay={0.2} amount={0.15}>
            <form className="contact__form" onSubmit={onSubmit} noValidate>
              <p className="contact__mode mono">
                {hasEndpoint
                  ? 'Sends directly from this page.'
                  : useGmail
                    ? 'Opens Gmail in a new tab with the message pre-filled — nothing is stored here.'
                    : 'Opens your email app with the message pre-filled — nothing is stored here.'}
              </p>

              {field('name', 'Your name')}
              {field('email', 'Email', 'email', { inputMode: 'email' })}
              {field('message', 'Project, idea or hello', 'textarea', { rows: 5 })}

              {/* Honeypot — hidden from people, tempting to bots */}
              <div className="field field--hp" aria-hidden="true">
                <label htmlFor={`${id}-company`}>Company</label>
                <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={onChange} />
              </div>

              <div className="contact__actions">
                <button type="submit" className="btn btn--ivory" ref={submitRef} disabled={status === 'sending'} data-cursor="link">
                  {status === 'sending' ? 'Sending…' : hasEndpoint ? 'Send message' : useGmail ? 'Open in Gmail' : 'Open in email app'}
                  <Send size={16} aria-hidden="true" />
                </button>

                <div className="contact__status" aria-live="polite">
                  {status === 'sent' && (
                    <span className="contact__status-ok">
                      <Check size={16} aria-hidden="true" /> Sent. I’ll reply soon.
                    </span>
                  )}
                  {status === 'mailto' && (
                    <span className="contact__status-ok">
                      <Check size={16} aria-hidden="true" /> {useGmail ? 'Gmail should have opened in a new tab.' : 'Your email app should have opened.'} If not, write to{' '}
                      <a href={`mailto:${email}`} className="link-line">
                        {email}
                      </a>
                      .
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="contact__status-err">
                      <CircleAlert size={16} aria-hidden="true" /> Couldn’t send. Please email{' '}
                      <a href={`mailto:${email}`} className="link-line">
                        {email}
                      </a>{' '}
                      directly.
                    </span>
                  )}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
