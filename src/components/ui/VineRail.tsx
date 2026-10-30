"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** Width of the vine column, in px — content is padded to match. */
const COLUMN = 56;
const CENTER = 27;
const AMP = 13;
const WAVES = 1.6;

/**
 * Leaf path re-based so its stem attachment point sits at (0,0);
 * the tip points up-right, which keeps rotations intuitive.
 */
const LEAF_PATH = "M 0 0 C 0 -10, 6 -19, 19 -21 C 21 -10, 15 -1, 0 0 Z";
const LEAF_VEINS =
  "M 1 -1 C 7 -8, 12 -14, 18 -20 M 8 -9 L 7 -16 M 12 -13 L 18 -12";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type ItemMetrics = { top: number; height: number };
type Metrics = { height: number; items: ItemMetrics[] };

type LeafSpec = {
  x: number;
  y: number;
  rotate: number;
  size: number;
  fill: string;
  mirror: boolean;
};
type TendrilSpec = { x: number; y: number; mirror: boolean };
type GrapeSpec = { x: number; y: number; mirror: boolean };

type Placed =
  | { kind: "leaf"; y: number; spec: LeafSpec }
  | { kind: "tendril"; y: number; spec: TendrilSpec }
  | { kind: "grapes"; y: number; spec: GrapeSpec };

const TENDRIL_PATH =
  "M 0 0 c 8 -2, 13 -9, 9 -15 c -4 -6, -12 -4, -12 3 c 0 4, 3 7, 7 7";

function stemX(y: number, height: number) {
  return CENTER + AMP * Math.sin((y / Math.max(height, 1)) * Math.PI * 2 * WAVES);
}

function sampleStem(height: number, fn: (y: number) => number) {
  const step = Math.max(4, height / 110);
  const points: string[] = [];
  for (let y = 0; y <= height; y += step) {
    points.push(`${fn(y).toFixed(2)} ${y.toFixed(1)}`);
  }
  points.push(`${fn(height).toFixed(2)} ${height.toFixed(1)}`);
  return `M ${points.join(" L ")}`;
}

function buildGeometry(metrics: Metrics): Placed[] {
  const { height, items } = metrics;
  const placed: Placed[] = [];
  let leafCount = 0;

  const addLeaf = (y: number, size: number, fill: string, bias = -15) => {
    const right = leafCount % 2 === 0;
    placed.push({
      kind: "leaf",
      y,
      spec: {
        x: stemX(y, height),
        y,
        rotate: right ? bias : bias - 5,
        size,
        fill,
        mirror: !right,
      },
    });
    leafCount += 1;
  };

  // A sprout only if there is room above the first item.
  if (items.length > 0 && items[0].top > 28) {
    addLeaf(10, 0.7, "fill-signal/70", -20);
  }

  items.forEach((item, index) => {
    const top = item.top;
    const h = item.height;

    // Anchor leaf at the item's start.
    addLeaf(top + 14, 1.15, index === 0 ? "fill-signal" : "fill-accent", -18);

    if (h > 110) addLeaf(top + h * 0.35, 0.8, index % 2 ? "fill-signal/60" : "fill-accent/50", -10);
    if (h > 220) addLeaf(top + h * 0.62, 0.72, index % 2 ? "fill-accent/50" : "fill-signal/55", -20);
    if (h > 330) addLeaf(top + h * 0.85, 0.78, index % 2 ? "fill-signal/55" : "fill-accent/45", -12);

    const tendrilY = top + h * 0.48;
    placed.push({
      kind: "tendril",
      y: tendrilY,
      spec: { x: stemX(tendrilY, height), y: tendrilY, mirror: index % 2 === 0 },
    });

    const grapeY = top + h * (index % 2 === 1 ? 0.25 : 0.78);
    if (h > (index % 2 === 1 ? 120 : 250)) {
      placed.push({
        kind: "grapes",
        y: grapeY,
        spec: { x: stemX(grapeY, height), y: grapeY, mirror: index % 2 === 0 },
      });
    }
  });

  // Finishing leaf at the very bottom of the vine.
  if (height > 80) {
    addLeaf(height - 12, 0.75, "fill-signal/70", -22);
  }

  return placed.sort((a, b) => a.y - b.y);
}

/** Wraps a vine element and pops it in as the vine grows past its position. */
function Growing({
  grow,
  from,
  x,
  y,
  children,
}: {
  grow: MotionValue<number>;
  from: number;
  x: number;
  y: number;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const to = Math.min(from + 0.16, 1);
  const scale = useTransform(grow, [from, to], [0, 1]);
  const opacity = useTransform(grow, [from, to], [0, 1]);

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.g style={{ scale, opacity, transformOrigin: `${x}px ${y}px` }}>
      {children}
    </motion.g>
  );
}

function VineLeaf({
  spec,
  grow,
  from,
  index,
}: {
  spec: LeafSpec;
  grow: MotionValue<number>;
  from: number;
  index: number;
}) {
  const transform = `translate(${spec.x} ${spec.y}) rotate(${spec.rotate}) scale(${
    spec.mirror ? -spec.size : spec.size
  } ${spec.size})`;
  const sway = {
    animationDelay: `${-((index * 1.7) % 5).toFixed(1)}s`,
    animationDuration: `${(4.4 + (index % 5) * 0.8).toFixed(1)}s`,
  };

  return (
    <Growing grow={grow} from={from} x={spec.x} y={spec.y}>
      <g transform={transform}>
        <g className="vine-leaf">
          <g className="vine-sway" style={sway}>
            <path d={LEAF_PATH} className={spec.fill} />
            <path
              d={LEAF_VEINS}
              fill="none"
              stroke="var(--background)"
              strokeOpacity="0.75"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </Growing>
  );
}

function VineTendril({
  spec,
  grow,
  from,
}: {
  spec: TendrilSpec;
  grow: MotionValue<number>;
  from: number;
}) {
  const transform = spec.mirror
    ? `translate(${spec.x} ${spec.y}) scale(-1 1)`
    : `translate(${spec.x} ${spec.y})`;

  return (
    <Growing grow={grow} from={from} x={spec.x} y={spec.y}>
      <g transform={transform}>
        <path
          d={TENDRIL_PATH}
          fill="none"
          stroke="var(--signal)"
          strokeOpacity="0.55"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
    </Growing>
  );
}

function VineGrapes({
  spec,
  grow,
  from,
  index,
}: {
  spec: GrapeSpec;
  grow: MotionValue<number>;
  from: number;
  index: number;
}) {
  const transform = `translate(${spec.x} ${spec.y}) scale(${spec.mirror ? -1 : 1} 1)`;
  const sway = {
    animationDelay: `${-((index * 2.3) % 6).toFixed(1)}s`,
  };

  return (
    <Growing grow={grow} from={from} x={spec.x} y={spec.y}>
      <g transform={transform} className="vine-leaf">
        <g className="vine-dangle" style={sway}>
          <circle cx={5} cy={4} r={3.1} className="fill-accent/70" />
          <circle cx={11.5} cy={6} r={2.7} className="fill-accent/55" />
          <circle cx={7.5} cy={10} r={2.9} className="fill-accent/60" />
          <circle cx={13} cy={11.5} r={2.3} className="fill-accent/45" />
        </g>
      </g>
    </Growing>
  );
}

function VineSvg({
  metrics,
  grow,
}: {
  metrics: Metrics;
  grow: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const geometry = useMemo(() => buildGeometry(metrics), [metrics]);
  const height = metrics.height;

  if (height === 0) return null;

  const mainStem = sampleStem(height, (y) => stemX(y, height));
  const strand = sampleStem(
    height,
    (y) =>
      CENTER +
      AMP * 0.55 * Math.sin((y / height) * Math.PI * 2 * WAVES + Math.PI / 2),
  );
  const pathStyle = reduceMotion ? undefined : { pathLength: grow };

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
      width={COLUMN}
      height={height}
      viewBox={`0 0 ${COLUMN} ${height}`}
      fill="none"
    >
      <motion.path
        d={mainStem}
        style={pathStyle}
        stroke="var(--signal)"
        strokeOpacity="0.8"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <motion.path
        d={strand}
        style={pathStyle}
        stroke="var(--accent)"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {geometry.map((element, index) => {
        const from = Math.min((element.y / height) * 0.86, 0.96);
        const key = `${element.kind}-${index}`;
        if (element.kind === "leaf") {
          return (
            <VineLeaf key={key} spec={element.spec} grow={grow} from={from} index={index} />
          );
        }
        if (element.kind === "tendril") {
          return <VineTendril key={key} spec={element.spec} grow={grow} from={from} />;
        }
        return (
          <VineGrapes key={key} spec={element.spec} grow={grow} from={from} index={index} />
        );
      })}
    </svg>
  );
}

/**
 * Wraps a list (mark items with `data-vine-item`) and draws a living vine
 * beside it: the stem grows as you scroll, leaves pop in along the way,
 * and every leaf can be nudged with the cursor.
 *
 * Measurement and scroll tracking live here (not in a child) so the ref is
 * guaranteed to be attached before the effects run.
 */
export function VineRail({
  children,
  className = "",
  contentClassName = "pl-14 md:pl-16",
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.85", "end 0.65"],
  });
  const grow = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    function measure() {
      const wrapElement = wrapRef.current;
      if (!wrapElement) return;
      const wrapRect = wrapElement.getBoundingClientRect();
      const items = Array.from(
        wrapElement.querySelectorAll<HTMLElement>("[data-vine-item]"),
      ).map((element) => {
        const rect = element.getBoundingClientRect();
        return { top: rect.top - wrapRect.top, height: rect.height };
      });
      setMetrics({ height: wrapRect.height, items });
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [wrapRef]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {metrics ? <VineSvg metrics={metrics} grow={grow} /> : null}
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
