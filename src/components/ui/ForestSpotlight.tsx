"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

export function ForestSpotlight({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, {
    stiffness: 75,
    damping: 24,
    mass: 0.8,
  });
  const pointerY = useSpring(rawPointerY, {
    stiffness: 75,
    damping: 24,
    mass: 0.8,
  });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    rawPointerX.set(event.clientX - rect.left - rect.width / 2);
    rawPointerY.set(event.clientY - rect.top - rect.height / 2);
  }

  function returnToCenter() {
    rawPointerX.set(0);
    rawPointerY.set(0);
  }

  return (
    <div
      className="relative isolate"
      onPointerMove={handlePointerMove}
      onPointerLeave={returnToCenter}
    >
      <motion.div
        aria-hidden="true"
        className="forest-cursor-glow pointer-events-none absolute left-1/2 top-1/2 z-0 h-80 w-80 rounded-full"
        style={{ x: pointerX, y: pointerY }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
