"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

const spring = { stiffness: 180, damping: 22, mass: 0.45 };

export function InteractiveTilt({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    rotateX.set(-y * 5);
    rotateY.set(x * 6);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.article
      className={className}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1000 }
      }
      whileHover={reduceMotion ? undefined : { y: -5 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      {children}
    </motion.article>
  );
}
