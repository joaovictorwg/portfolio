"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent,
} from "react";

type Cluster = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  weight: number;
};

type Leaf = {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  color: string;
  zIndex: number;
  swayDelay: string;
  sways: boolean;
};

type LayerProfile = {
  id: string;
  share: number;
  seedOffset: number;
  sizeScale: number;
  opacityScale: number;
  clusterDrift: number;
};

type CanopyLayer = LayerProfile & { leaves: Leaf[] };

type TreeCanopyProps = {
  count?: number;
  seed?: number;
  className?: string;
  mode?: "crown" | "ambient";
  interactive?: boolean;
};

// Nine overlapping clusters form an irregular crown instead of a single
// ellipse. Lower centers keep the visible fringe leafy when the upper crown
// is cropped above the page.
const CLUSTERS: Cluster[] = [
  { x: 0.15, y: 0.55, rx: 0.19, ry: 0.3, weight: 0.95 },
  { x: 0.34, y: 0.48, rx: 0.22, ry: 0.3, weight: 1.15 },
  { x: 0.59, y: 0.5, rx: 0.23, ry: 0.29, weight: 1.2 },
  { x: 0.84, y: 0.57, rx: 0.18, ry: 0.29, weight: 0.95 },
  { x: 0.25, y: 0.7, rx: 0.2, ry: 0.24, weight: 1.05 },
  { x: 0.51, y: 0.68, rx: 0.24, ry: 0.25, weight: 1.3 },
  { x: 0.77, y: 0.72, rx: 0.2, ry: 0.23, weight: 1.0 },
  { x: 0.4, y: 0.84, rx: 0.2, ry: 0.16, weight: 0.82 },
  { x: 0.65, y: 0.83, rx: 0.19, ry: 0.17, weight: 0.84 },
];

const AMBIENT_CLUSTERS: Cluster[] = [
  { x: 0.035, y: 0.08, rx: 0.065, ry: 0.075, weight: 1.0 },
  { x: 0.965, y: 0.15, rx: 0.065, ry: 0.09, weight: 0.9 },
  { x: 0.04, y: 0.31, rx: 0.07, ry: 0.085, weight: 1.0 },
  { x: 0.96, y: 0.43, rx: 0.07, ry: 0.1, weight: 0.95 },
  { x: 0.035, y: 0.61, rx: 0.065, ry: 0.09, weight: 1.0 },
  { x: 0.965, y: 0.72, rx: 0.065, ry: 0.09, weight: 1.0 },
  { x: 0.05, y: 0.88, rx: 0.075, ry: 0.085, weight: 0.8 },
  { x: 0.95, y: 0.94, rx: 0.075, ry: 0.075, weight: 0.85 },
];

const SIDE_CLUSTERS: Cluster[] = [
  { x: 0.035, y: 0.1, rx: 0.06, ry: 0.12, weight: 0.9 },
  { x: 0.965, y: 0.18, rx: 0.06, ry: 0.13, weight: 1.0 },
  { x: 0.025, y: 0.34, rx: 0.055, ry: 0.12, weight: 1.0 },
  { x: 0.975, y: 0.42, rx: 0.055, ry: 0.14, weight: 0.95 },
  { x: 0.035, y: 0.59, rx: 0.06, ry: 0.14, weight: 1.0 },
  { x: 0.965, y: 0.69, rx: 0.06, ry: 0.14, weight: 1.05 },
  { x: 0.025, y: 0.86, rx: 0.055, ry: 0.12, weight: 0.85 },
  { x: 0.975, y: 0.94, rx: 0.055, ry: 0.11, weight: 0.9 },
];

const CROWN_LAYER_PROFILES: LayerProfile[] = [
  {
    id: "back",
    share: 0.32,
    seedOffset: 0,
    sizeScale: 1.2,
    opacityScale: 0.58,
    clusterDrift: 0.018,
  },
  {
    id: "middle",
    share: 0.37,
    seedOffset: 137,
    sizeScale: 1,
    opacityScale: 0.76,
    clusterDrift: 0.032,
  },
  {
    id: "front",
    share: 0.31,
    seedOffset: 593,
    sizeScale: 0.78,
    opacityScale: 0.95,
    clusterDrift: 0.046,
  },
];

const AMBIENT_LAYER_PROFILES: LayerProfile[] = [
  {
    id: "back",
    share: 0.32,
    seedOffset: 41,
    sizeScale: 1.12,
    opacityScale: 0.38,
    clusterDrift: 0.012,
  },
  {
    id: "middle",
    share: 0.37,
    seedOffset: 271,
    sizeScale: 0.9,
    opacityScale: 0.48,
    clusterDrift: 0.024,
  },
  {
    id: "front",
    share: 0.31,
    seedOffset: 809,
    sizeScale: 0.72,
    opacityScale: 0.58,
    clusterDrift: 0.035,
  },
];

const SIDE_LAYER_PROFILES: LayerProfile[] = [
  {
    id: "back",
    share: 0.32,
    seedOffset: 71,
    sizeScale: 1.12,
    opacityScale: 0.34,
    clusterDrift: 0.012,
  },
  {
    id: "middle",
    share: 0.37,
    seedOffset: 317,
    sizeScale: 0.96,
    opacityScale: 0.48,
    clusterDrift: 0.02,
  },
  {
    id: "front",
    share: 0.31,
    seedOffset: 929,
    sizeScale: 0.8,
    opacityScale: 0.62,
    clusterDrift: 0.028,
  },
];

const LEAF_COLORS = [
  "var(--signal)",
  "var(--accent)",
  "var(--signal)",
  "var(--wood)",
  "var(--accent)",
  "var(--signal)",
];

const subscribeToMount = () => () => {};
const getClientMountSnapshot = () => true;
const getServerMountSnapshot = () => false;

function createRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomBetween(random: () => number, min: number, max: number) {
  return min + random() * (max - min);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function generateLeaves(
  count: number,
  seed: number,
  profile: LayerProfile,
  depth: number,
  clusters: Cluster[],
): Leaf[] {
  const random = createRandom(seed);
  const clusterRandom = createRandom(seed ^ 0xa511e9b3);
  const variedClusters = clusters.map((cluster) => ({
    ...cluster,
    x: clamp(
      cluster.x +
        randomBetween(
          clusterRandom,
          -profile.clusterDrift,
          profile.clusterDrift,
        ),
      0.04,
      0.96,
    ),
    y: clamp(
      cluster.y +
        randomBetween(
          clusterRandom,
          -profile.clusterDrift,
          profile.clusterDrift,
        ),
      0.3,
      0.92,
    ),
    rx: cluster.rx * randomBetween(clusterRandom, 0.92, 1.08),
    ry: cluster.ry * randomBetween(clusterRandom, 0.92, 1.08),
  }));
  const totalWeight = variedClusters.reduce(
    (sum, cluster) => sum + cluster.weight,
    0,
  );
  const leaves: Leaf[] = [];
  const maxAttempts = count * 30;

  for (
    let attempt = 0;
    attempt < maxAttempts && leaves.length < count;
    attempt++
  ) {
    let selection = random() * totalWeight;
    let cluster = variedClusters[0];

    for (const candidate of variedClusters) {
      selection -= candidate.weight;
      if (selection <= 0) {
        cluster = candidate;
        break;
      }
    }

    const angle = random() * Math.PI * 2;
    const radius = Math.sqrt(random());
    const x = cluster.x + Math.cos(angle) * radius * cluster.rx;
    const y = cluster.y + Math.sin(angle) * radius * cluster.ry;

    if (x < 0.015 || x > 0.985 || y < 0.015 || y > 0.985) continue;

    const id = leaves.length;
    leaves.push({
      id,
      x,
      y,
      size: randomBetween(random, 0.62, 1.32) * profile.sizeScale,
      rotation: randomBetween(random, -180, 180),
      opacity: randomBetween(random, 0.34, 0.68) * profile.opacityScale,
      color: LEAF_COLORS[Math.floor(random() * LEAF_COLORS.length)],
      zIndex: depth * 1000 + Math.round(y * 1000),
      swayDelay: `${randomBetween(random, -6, 0).toFixed(1)}s`,
      sways: random() < 0.22,
    });
  }

  return leaves;
}

function generateLayers(
  count: number,
  seed: number,
  mode: "crown" | "ambient",
): CanopyLayer[] {
  const profiles =
    mode === "crown"
      ? CROWN_LAYER_PROFILES
      : mode === "ambient"
        ? SIDE_LAYER_PROFILES
        : AMBIENT_LAYER_PROFILES;
  const clusters =
    mode === "crown"
      ? CLUSTERS
      : mode === "ambient"
        ? SIDE_CLUSTERS
        : AMBIENT_CLUSTERS;
  let assigned = 0;

  return profiles.map((profile, index) => {
    const layerCount =
      index === profiles.length - 1
        ? count - assigned
        : Math.floor(count * profile.share);
    assigned += layerCount;

    return {
      ...profile,
      leaves: generateLeaves(
        layerCount,
        seed + profile.seedOffset,
        profile,
        index,
        clusters,
      ),
    };
  });
}

export function TreeCanopy({
  count,
  seed = 42,
  className = "",
  mode = "crown",
  interactive,
}: TreeCanopyProps) {
  const canopyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const activeLeavesRef = useRef(new Set<HTMLElement>());
  const mounted = useSyncExternalStore(
    subscribeToMount,
    getClientMountSnapshot,
    getServerMountSnapshot,
  );
  const leafCount =
    count ?? (mode === "crown" ? 600 : mode === "ambient" ? 300 : 60);
  const isInteractive = interactive ?? mode !== "ambient";
  const layers = useMemo(
    () => generateLayers(leafCount, seed, mode),
    [leafCount, seed, mode],
  );

  const resetWind = useCallback(() => {
    activeLeavesRef.current.forEach((leaf) =>
      leaf.style.setProperty("--wind-angle", "0deg"),
    );
    activeLeavesRef.current.clear();
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!isInteractive) return;
      if (event.pointerType !== "mouse") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const canopy = canopyRef.current;
      if (!canopy) return;

      const rect = canopy.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        const influenceRadius = 145;
        const maxAngle = 12;
        const previous = activeLeavesRef.current;
        const next = new Set<HTMLElement>();

        canopy
          .querySelectorAll<HTMLElement>(".tree-canopy__leaf")
          .forEach((leaf) => {
            const x = Number(leaf.dataset.x) * rect.width;
            const y = Number(leaf.dataset.y) * rect.height;
            const dx = x - pointerX;
            const dy = y - pointerY;
            const distance = Math.hypot(dx, dy);

            if (distance >= influenceRadius) {
              if (previous.has(leaf))
                leaf.style.setProperty("--wind-angle", "0deg");
              return;
            }

            const influence = 1 - distance / influenceRadius;
            const direction = dx === 0 ? 1 : Math.sign(dx);
            const angle = direction * maxAngle * influence * influence;
            leaf.style.setProperty("--wind-angle", `${angle.toFixed(2)}deg`);
            next.add(leaf);
          });

        activeLeavesRef.current = next;
        frameRef.current = null;
      });
    },
    [isInteractive],
  );

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      activeLeavesRef.current.clear();
    },
    [],
  );

  return (
    <div
      ref={canopyRef}
      className={`tree-canopy ${mode === "ambient" ? "tree-canopy--ambient" : ""} ${mode === "ambient" ? "tree-canopy--sides" : ""} ${className}`.trim()}
      onPointerMove={isInteractive ? handlePointerMove : undefined}
      onPointerLeave={isInteractive ? resetWind : undefined}
      aria-hidden="true"
    >
      {mounted
        ? layers.map((layer, layerIndex) => (
            <span
              key={layer.id}
              className="tree-canopy__layer"
              style={{ zIndex: layerIndex }}
            >
              {layer.leaves.map((leaf) => {
                const style = {
                  left: `${leaf.x * 100}%`,
                  top: `${leaf.y * 100}%`,
                  zIndex: Math.round(leaf.y * 1000),
                  "--leaf-size": leaf.size,
                  "--base-rotation": `${leaf.rotation.toFixed(1)}deg`,
                  "--leaf-opacity": leaf.opacity,
                  "--leaf-color": leaf.color,
                  "--wind-angle": "0deg",
                  "--sway-delay": leaf.swayDelay,
                } as CSSProperties;

                return (
                  <span
                    key={`${layer.id}-${leaf.id}`}
                    className={`tree-canopy__leaf ${mode === "crown" && leaf.sways ? "tree-canopy__leaf--sway" : ""}`}
                    data-x={leaf.x}
                    data-y={leaf.y}
                    style={style}
                  >
                    <svg
                      viewBox="0 0 28 28"
                      className="tree-canopy__shape"
                      fill="none"
                    >
                      <path
                        d="M 4 24 C 4 14, 10 5, 23 3 C 25 14, 19 23, 4 24 Z"
                        fill="var(--leaf-color)"
                      />
                      {mode !== "ambient" ? (
                        <path
                          d="M 5 23 C 11 16, 16 10, 22 4 M 12 15 L 11 8 M 16 11 L 22 12"
                          stroke="var(--background)"
                          strokeOpacity="0.55"
                          strokeWidth="1.15"
                          strokeLinecap="round"
                        />
                      ) : null}
                    </svg>
                  </span>
                );
              })}
            </span>
          ))
        : null}
    </div>
  );
}
