type NetworkNode = {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  group: number;
};

type NetworkEdge = {
  from: NetworkNode;
  to: NetworkNode;
  opacity: number;
  curve: number;
};

// Seeded, hand-shaped positions keep the composition organic and stable.
const NODES: NetworkNode[] = [
  { id: 0, x: 112, y: 116, radius: 5, opacity: 0.68, group: 0 },
  { id: 1, x: 190, y: 78, radius: 3, opacity: 0.42, group: 0 },
  { id: 2, x: 270, y: 128, radius: 7, opacity: 0.76, group: 0 },
  { id: 3, x: 342, y: 82, radius: 3, opacity: 0.36, group: 0 },
  { id: 4, x: 418, y: 146, radius: 5, opacity: 0.62, group: 0 },
  { id: 5, x: 510, y: 104, radius: 3, opacity: 0.38, group: 0 },
  { id: 6, x: 586, y: 168, radius: 6, opacity: 0.68, group: 0 },
  { id: 7, x: 150, y: 238, radius: 3, opacity: 0.42, group: 1 },
  { id: 8, x: 232, y: 205, radius: 5, opacity: 0.58, group: 1 },
  { id: 9, x: 316, y: 264, radius: 4, opacity: 0.52, group: 1 },
  { id: 10, x: 390, y: 220, radius: 8, opacity: 0.82, group: 1 },
  { id: 11, x: 478, y: 276, radius: 4, opacity: 0.46, group: 1 },
  { id: 12, x: 560, y: 242, radius: 3, opacity: 0.36, group: 1 },
  { id: 13, x: 622, y: 312, radius: 6, opacity: 0.62, group: 1 },
  { id: 14, x: 92, y: 362, radius: 4, opacity: 0.46, group: 2 },
  { id: 15, x: 176, y: 326, radius: 7, opacity: 0.72, group: 2 },
  { id: 16, x: 258, y: 392, radius: 3, opacity: 0.38, group: 2 },
  { id: 17, x: 348, y: 344, radius: 5, opacity: 0.64, group: 2 },
  { id: 18, x: 432, y: 408, radius: 3, opacity: 0.42, group: 2 },
  { id: 19, x: 516, y: 354, radius: 6, opacity: 0.72, group: 2 },
  { id: 20, x: 604, y: 426, radius: 4, opacity: 0.48, group: 2 },
  { id: 21, x: 136, y: 502, radius: 6, opacity: 0.62, group: 3 },
  { id: 22, x: 224, y: 456, radius: 3, opacity: 0.4, group: 3 },
  { id: 23, x: 306, y: 532, radius: 5, opacity: 0.68, group: 3 },
  { id: 24, x: 394, y: 476, radius: 3, opacity: 0.38, group: 3 },
  { id: 25, x: 478, y: 544, radius: 7, opacity: 0.74, group: 3 },
  { id: 26, x: 566, y: 490, radius: 3, opacity: 0.44, group: 3 },
];

const EDGES: NetworkEdge[] = NODES.flatMap((node, index) => {
  const next = NODES[index + 1];
  const skip = NODES[index + 3];
  const edges: NetworkEdge[] = [];

  if (next && next.group === node.group) {
    edges.push({ from: node, to: next, opacity: 0.22, curve: index % 2 ? -12 : 12 });
  }
  if (skip && skip.group === node.group && index % 2 === 0) {
    edges.push({ from: node, to: skip, opacity: 0.12, curve: index % 3 ? 20 : -20 });
  }
  if (index < 20 && NODES[index + 7]) {
    edges.push({ from: node, to: NODES[index + 7], opacity: 0.1, curve: -16 });
  }

  return edges;
});

function edgePath(edge: NetworkEdge) {
  const { from, to, curve } = edge;
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2 + curve;
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}

const LEAVES = [
  { x: 166, y: 142, rotate: -28, scale: 0.8, tone: "signal" },
  { x: 452, y: 188, rotate: 32, scale: 0.62, tone: "accent" },
  { x: 282, y: 306, rotate: -48, scale: 0.72, tone: "signal" },
  { x: 548, y: 390, rotate: 26, scale: 0.8, tone: "accent" },
  { x: 188, y: 430, rotate: -18, scale: 0.58, tone: "signal" },
  { x: 436, y: 500, rotate: 42, scale: 0.66, tone: "signal" },
];

/** Static editorial network for the hero's right-hand visual field. */
export function SystemNetwork() {
  return (
    <div aria-hidden="true" className="system-network relative hidden min-h-[520px] lg:block">
      <svg viewBox="0 0 700 620" className="h-full w-full overflow-visible" fill="none">
        <g className="system-network__edges">
          {EDGES.map((edge, index) => (
            <path
              key={index}
              d={edgePath(edge)}
              stroke="var(--signal)"
              strokeOpacity={edge.opacity}
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))}
        </g>
        <g className="system-network__nodes">
          {NODES.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radius * 2.8}
                fill="var(--signal)"
                fillOpacity={node.opacity * 0.12}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radius}
                fill="var(--signal)"
                fillOpacity={node.opacity}
              />
            </g>
          ))}
        </g>
        <g className="system-network__leaves">
          {LEAVES.map((leaf, index) => (
            <g key={index} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotate}) scale(${leaf.scale})`}>
              <path
                d="M 0 0 C 0 -10, 6 -19, 19 -21 C 21 -10, 15 -1, 0 0 Z"
                className={leaf.tone === "signal" ? "fill-signal/45" : "fill-accent/35"}
              />
              <path
                d="M 1 -1 C 7 -8, 12 -14, 18 -20"
                stroke="var(--background)"
                strokeOpacity="0.65"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
