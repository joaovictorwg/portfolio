"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

/** Single block that fades/slides in when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its `RevealItem` children on scroll. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  amount = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Child of a `RevealGroup`; also works standalone. */
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
