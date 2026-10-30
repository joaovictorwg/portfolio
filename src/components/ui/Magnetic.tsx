"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

/**
 * Wraps a CTA so it leans slightly toward the cursor, like a leaf in the wind.
 * Purely decorative: children keep their own semantics and hit area.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  max = 12,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  max?: number;
}) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.5 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - rect.left - rect.width / 2) * strength;
    const dy = (event.clientY - rect.top - rect.height / 2) * strength;
    x.set(Math.max(-max, Math.min(max, dx)));
    y.set(Math.max(-max, Math.min(max, dy)));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      style={reduceMotion ? undefined : { x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.div>
  );
}
