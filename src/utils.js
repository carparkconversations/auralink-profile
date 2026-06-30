// Pure utility functions and Framer Motion variants (no JSX — safe in .js)

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const fadeUp = {
  hidden:  { opacity: 0, y: 36, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const slideLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const slideRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
