"use client";

import { RigidBody } from "@react-three/rapier";
import { Text } from "@react-three/drei";
import { PlayerController } from "./PlayerController";
import { WORLD_MAP, type InteractableTarget } from "./map";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { concepts } from "@/content/concepts";
import { localize } from "@/lib/localize";

/** Textos vindos do next-intl: o Canvas não herda o contexto do provider. */
export type WorldLabels = {
  start: string;
  concepts: Record<string, string>;
};

type InteractableItem = {
  position: [number, number, number];
  target: InteractableTarget;
  color: string;
  label: string;
};

/** Espalha `count` itens centrados na origem, com `spacing` entre vizinhos. */
function spread(index: number, count: number, spacing: number) {
  return (index - (count - 1) / 2) * spacing;
}

function buildInteractables(locale: string, labels: WorldLabels): InteractableItem[] {
  return [
    {
      position: [...WORLD_MAP.start.position],
      target: { id: "hub", kind: "start" },
      color: WORLD_MAP.start.color,
      label: labels.start,
    },
    ...projects.map((project, index) => ({
      position: [-12, 0, spread(index, projects.length, 3.2)] as [number, number, number],
      target: { id: project.id, kind: "project" as const },
      color: WORLD_MAP.projects.color,
      label: localize(project.title, locale),
    })),
    ...experience.map((job, index) => ({
      position: [12, 0, spread(index, experience.length, 3.2)] as [number, number, number],
      target: { id: job.id, kind: "experience" as const },
      color: WORLD_MAP.experience.color,
      label: localize(job.company, locale),
    })),
    ...concepts.map((concept, index) => ({
      position: [spread(index, concepts.length, 4.8), 0, -12] as [number, number, number],
      target: { id: concept.id, kind: "concept" as const },
      color: WORLD_MAP.concepts.color,
      label: labels.concepts[concept.id] ?? concept.id,
    })),
  ];
}

export function WorldScene({
  onNearby,
  locale,
  labels,
  isInteracting,
}: {
  onNearby: (target: InteractableTarget | null) => void;
  locale: string;
  labels: WorldLabels;
  isInteracting: boolean;
}) {
  const interactables = buildInteractables(locale, labels);

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight
        castShadow
        position={[12, 18, 8]}
        intensity={1.15}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight args={["#c9d6c4", "#1a1c16", 0.35]} />

      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.05, 0]}>
          <planeGeometry args={[48, 48]} />
          <meshStandardMaterial color="#141612" />
        </mesh>
      </RigidBody>

      <ZoneFloor position={WORLD_MAP.projects.position} color="#1c2a24" />
      <ZoneFloor position={WORLD_MAP.experience.position} color="#1a1e32" />
      <ZoneFloor position={WORLD_MAP.concepts.position} color="#2a1818" />
      <ZoneFloor position={WORLD_MAP.start.position} color="#2a2314" />

      <Path />

      <Boundary />

      {interactables.map((item) => (
        <Building key={`${item.target.kind}-${item.target.id}`} {...item} />
      ))}

      <PlayerController
        interactables={interactables.map((item) => ({
          position: item.position,
          target: item.target,
        }))}
        onNearby={onNearby}
        isInteracting={isInteracting}
      />
    </>
  );
}

function ZoneFloor({
  position,
  color,
}: {
  position: readonly [number, number, number];
  color: string;
}) {
  return (
    <mesh position={[position[0], 0.02, position[2]]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[4.2, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Boundary() {
  const walls: [number, number, number, number, number, number][] = [
    [0, 1, -24, 48, 2, 1],
    [0, 1, 24, 48, 2, 1],
    [-24, 1, 0, 1, 2, 48],
    [24, 1, 0, 1, 2, 48],
  ];
  return (
    <>
      {walls.map(([x, y, z, w, h, d]) => (
        <RigidBody key={`${x}-${z}`} type="fixed" colliders="cuboid" position={[x, y, z]}>
          <mesh>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color="#10110f" />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}

function Path() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} receiveShadow>
      <planeGeometry args={[2.2, 28]} />
      <meshStandardMaterial color="#1e1f1a" />
    </mesh>
  );
}

function Building({
  position,
  color,
  label,
}: {
  position: [number, number, number];
  color: string;
  label: string;
}) {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid" position={[0, 1.1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 2.2, 2.2]} />
          <meshStandardMaterial color={color} roughness={0.45} metalness={0.12} />
        </mesh>
      </RigidBody>
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.28}
        color="#f2efe6"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}
