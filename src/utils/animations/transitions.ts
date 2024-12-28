export const defaultTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20
};

export const smoothTransition = {
  type: "tween",
  duration: 0.3,
  ease: "easeInOut"
};

export const staggerTransition = {
  staggerChildren: 0.1,
  delayChildren: 0.2
};