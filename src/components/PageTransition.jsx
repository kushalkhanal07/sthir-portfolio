import { motion } from 'motion/react';
import useReducedMotion from '../hooks/useReducedMotion';

const EASE = [0.76, 0, 0.24, 1];

/**
 * Wraps a page in enter/exit motion. Used with <AnimatePresence mode="wait">
 * in App.jsx so pages cross-fade with a short vertical drift.
 */
export default function PageTransition({ children, className = '' }) {
  const reduced = useReducedMotion();
  const variants = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
      };
  return (
    <motion.main
      id="main"
      className={className}
      tabIndex={-1}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: reduced ? 0.15 : 0.55, ease: EASE }}
    >
      {children}
    </motion.main>
  );
}
