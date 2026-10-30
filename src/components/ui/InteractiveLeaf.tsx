"use client";

import { motion, useReducedMotion } from "motion/react";

export function InteractiveLeaf({
  className = "",
  tone = "signal",
  direction = "right",
}: {
  className?: string;
  tone?: "signal" | "accent";
  direction?: "left" | "right";
}) {
  const reduceMotion = useReducedMotion();
  const angle = direction === "right" ? 14 : -14;

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      className={`cursor-pointer overflow-visible ${className}`}
      style={{ transformOrigin: "50% 75%" }}
      whileHover={reduceMotion ? undefined : { rotate: angle, scale: 1.16, y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 1.05 }}
      transition={{ type: "spring", stiffness: 260, damping: 13 }}
      fill="none"
    >
      <path
        d="M 4 24 C 4 14, 10 5, 23 3 C 25 14, 19 23, 4 24 Z"
        className={tone === "signal" ? "fill-signal" : "fill-accent"}
      />
      <path
        d="M 5 23 C 11 16, 16 10, 22 4 M 12 15 L 11 8 M 16 11 L 22 12"
        stroke="var(--background)"
        strokeOpacity="0.8"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
