import { motion } from 'motion/react';
import useReducedMotion from '../hooks/useReducedMotion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Scroll-triggered reveal. Wraps children in a motion element that fades/rises
 * into view once. With reduced motion it renders statically.
 */
export function Reveal({ children, as = 'div', delay = 0, y = 28, once = true, amount = 0.25, className = '', ...rest }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Line-by-line text reveal. Each line is masked and slides up.
 * `lines` is an array of strings or React nodes.
 */
export function RevealLines({ lines, as = 'h2', className = '', lineClassName = '', delay = 0, stagger = 0.08, animate = true, inView = true, ...rest }) {
  const reduced = useReducedMotion();
  const Tag = as;
  const motionProps = (i) =>
    reduced
      ? {}
      : inView
        ? {
            initial: { y: '110%' },
            whileInView: { y: '0%' },
            viewport: { once: true, amount: 0.4 },
            transition: { duration: 1, ease: EASE, delay: delay + i * stagger },
          }
        : {
            initial: { y: '110%' },
            animate: { y: animate ? '0%' : '110%' },
            transition: { duration: 1, ease: EASE, delay: delay + i * stagger },
          };

  return (
    <Tag className={className} {...rest}>
      {lines.map((line, i) => (
        <span className="reveal-line" key={i} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}>
          <motion.span className={lineClassName} style={{ display: 'block', willChange: 'transform' }} {...motionProps(i)}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export default Reveal;
