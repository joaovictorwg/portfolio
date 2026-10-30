import type { CSSProperties } from "react";

const LEAF_PATH = "M 4 24 C 4 14, 10 5, 23 3 C 25 14, 19 23, 4 24 Z";
const LEAF_VEINS =
  "M 5 23 C 11 16, 16 10, 22 4 M 12 15 L 11 8 M 16 11 L 22 12";

const FALLING = [
  { left: 3, size: 12, duration: 25, delay: -4, drift: 26, spin: 340, op: 0.34, tone: "accent" },
  { left: 8, size: 14, duration: 22, delay: -16, drift: -22, spin: -320, op: 0.38, tone: "signal" },
  { left: 92, size: 11, duration: 24, delay: -8, drift: 24, spin: 300, op: 0.32, tone: "accent" },
  { left: 97, size: 16, duration: 18, delay: -20, drift: -30, spin: -340, op: 0.44, tone: "signal" },
  { left: 2, size: 15, duration: 19, delay: -2, drift: 30, spin: 300, op: 0.45, tone: "signal" },
  { left: 98, size: 16, duration: 21, delay: -12, drift: -20, spin: -280, op: 0.4, tone: "signal" },
  { left: 6, size: 11, duration: 23, delay: -9, drift: -24, spin: -260, op: 0.36, tone: "accent" },
  { left: 94, size: 10, duration: 27, delay: -18, drift: 24, spin: 320, op: 0.3, tone: "accent" },
] as const;

/** Just the drifting leaves — the ambient layer carries the rest of the foliage. */
export function PageTree() {
  return (
    <div
      aria-hidden="true"
      className="page-tree pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {FALLING.map((leaf, index) => {
        const style = {
          left: `${leaf.left}%`,
          width: leaf.size,
          height: leaf.size,
          "--leaf-dur": `${leaf.duration}s`,
          "--leaf-delay": `${leaf.delay}s`,
          "--leaf-drift": `${leaf.drift}px`,
          "--leaf-spin": `${leaf.spin}deg`,
          "--leaf-op": `${leaf.op}`,
        } as CSSProperties;

        return (
          <span key={index} className="falling-leaf" style={style}>
            <svg viewBox="0 0 28 28" className="h-full w-full">
              <path
                d={LEAF_PATH}
                className={leaf.tone === "signal" ? "fill-signal/45" : "fill-accent/35"}
              />
              <path
                d={LEAF_VEINS}
                stroke="var(--background)"
                strokeOpacity="0.7"
                strokeWidth="1.25"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
