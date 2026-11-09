"use client";

import { useEffect } from "react";

function scrollToHash() {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const visible = rect.top >= 0 && rect.top < window.innerHeight;
  if (!visible) {
    // Instant para não ser cancelado pelo reset de scroll da hidratação.
    target.scrollIntoView({ behavior: "instant", block: "start" });
  }
}

/**
 * O App Router zera o scroll durante a hidratação, então uma URL como
 * `/about#technologies` chegava no topo da página. Este componente volta
 * para a âncora depois da hidratação, tentando algumas vezes enquanto o
 * alvo não estiver visível.
 */
export function ScrollToHash() {
  useEffect(() => {
    const timers = [0, 200, 600].map((delay) => window.setTimeout(scrollToHash, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return null;
}
