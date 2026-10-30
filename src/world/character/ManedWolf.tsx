"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type {
  CharacterHeadingRef,
  CharacterMotionRef,
} from "./types";

const COAT = "#c85b32";
const COAT_LIGHT = "#e0773f";
const COAT_SHADE = "#9e4029";
const MANE = "#282124";
const PAW = "#392a27";
const MUZZLE = "#5a3932";
const CREAM = "#ead4b2";
const EAR_INNER = "#b94c35";

const LEGS = [
  { x: -0.2, z: -0.48, phase: 0 },
  { x: 0.2, z: -0.48, phase: Math.PI },
  { x: -0.23, z: 0.52, phase: Math.PI },
  { x: 0.23, z: 0.52, phase: 0 },
] as const;

export function ManedWolf({
  motion,
  heading,
}: {
  motion: CharacterMotionRef;
  heading: CharacterHeadingRef;
}) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Group>(null);
  const ears = useRef<Array<THREE.Group | null>>([]);
  const upperLegs = useRef<Array<THREE.Group | null>>([]);
  const lowerLegs = useRef<Array<THREE.Group | null>>([]);
  const paws = useRef<Array<THREE.Group | null>>([]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const gait = motion.current;
    const moving = gait === "walking" || gait === "running";
    const airborne = gait === "jumping";
    const speed = gait === "running" ? 13 : 8;
    const stride = gait === "running" ? 0.66 : 0.43;
    const bob = moving ? (gait === "running" ? 0.055 : 0.028) : airborne ? 0 : 0.012;

    if (root.current) {
      const difference = Math.atan2(
        Math.sin(heading.current - root.current.rotation.y),
        Math.cos(heading.current - root.current.rotation.y),
      );
      root.current.rotation.y += difference * (1 - Math.exp(-9 * delta));
    }

    if (body.current) {
      const breathing = Math.sin(time * (moving ? 9 : 2.1)) * bob;
      body.current.position.y = breathing;
      body.current.rotation.x = airborne
        ? -0.07
        : moving
          ? Math.sin(time * speed) * 0.025
          : 0;
    }

    if (head.current) {
      const sniff = gait === "interacting" ? -0.28 : 0;
      const curiousTilt = gait === "interacting" ? Math.sin(time * 3.5) * 0.045 : 0;
      head.current.rotation.x = THREE.MathUtils.damp(
        head.current.rotation.x,
        sniff + (airborne ? -0.06 : moving ? Math.sin(time * speed) * 0.035 : 0),
        7,
        delta,
      );
      head.current.rotation.z = THREE.MathUtils.damp(
        head.current.rotation.z,
        curiousTilt,
        6,
        delta,
      );
    }

    if (tail.current) {
      const wag = gait === "interacting" ? 0.13 : moving ? 0.07 : 0.09;
      tail.current.rotation.x =
        0.38 + Math.sin(time * (moving ? speed * 0.55 : 2.4)) * wag;
      tail.current.rotation.y = Math.sin(time * (moving ? speed * 0.35 : 1.7)) * 0.12;
    }

    for (let index = 0; index < LEGS.length; index += 1) {
      const upper = upperLegs.current[index];
      const lower = lowerLegs.current[index];
      if (!upper || !lower) continue;

      const leg = LEGS[index];
      const phase = time * speed + leg.phase;
      upper.rotation.x = moving
        ? Math.sin(phase) * stride
        : airborne
          ? leg.z < 0
            ? -0.3
            : 0.38
          : Math.sin(time * 1.8 + leg.phase) * 0.012;
      lower.rotation.x = moving
        ? Math.max(0, Math.sin(phase + 0.8)) * (gait === "running" ? 0.82 : 0.56)
        : airborne
          ? 0.62
          : 0;

      const paw = paws.current[index];
      if (paw) {
        paw.rotation.x = moving
          ? Math.max(0, Math.sin(phase + 0.8)) * 0.32
          : airborne
            ? -0.18
            : 0;
      }
    }

    for (let index = 0; index < ears.current.length; index += 1) {
      const ear = ears.current[index];
      if (!ear) continue;
      ear.rotation.z = Math.sin(time * 2.2 + index * Math.PI) * 0.035;
    }
  });

  return (
      <group ref={root}>
        <group ref={body}>
          {/* Silhueta alta: tronco estreito e longo, sem volume de lobo genérico. */}
          <mesh castShadow position={[0, 0.57, 0.04]} scale={[0.245, 0.255, 0.9]}>
            <sphereGeometry args={[1, 9, 7]} />
            <meshStandardMaterial color={COAT} flatShading roughness={0.9} />
          </mesh>
          <mesh castShadow position={[0, 0.59, -0.44]} scale={[0.265, 0.29, 0.33]}>
            <sphereGeometry args={[1, 8, 6]} />
            <meshStandardMaterial color={COAT_LIGHT} flatShading roughness={0.9} />
          </mesh>
          <mesh castShadow position={[0, 0.53, 0.52]} scale={[0.28, 0.27, 0.34]}>
            <sphereGeometry args={[1, 8, 6]} />
            <meshStandardMaterial color={COAT_SHADE} flatShading roughness={0.92} />
          </mesh>

          {/* A crina forma uma faixa irregular contínua da nuca pelo dorso. */}
          <mesh castShadow position={[0, 0.82, -0.25]} rotation={[-0.04, 0, 0]} scale={[0.13, 0.15, 0.8]}>
            <sphereGeometry args={[1, 8, 5]} />
            <meshStandardMaterial color={MANE} flatShading roughness={1} />
          </mesh>
          {[
            { z: -0.72, y: 0.95, h: 0.34 },
            { z: -0.51, y: 0.96, h: 0.3 },
            { z: -0.29, y: 0.94, h: 0.25 },
            { z: -0.06, y: 0.91, h: 0.23 },
            { z: 0.17, y: 0.88, h: 0.2 },
          ].map((tuft) => (
            <mesh key={tuft.z} castShadow position={[0, tuft.y, tuft.z]} rotation={[0.08, 0, 0]}>
              <coneGeometry args={[0.13, tuft.h, 5]} />
              <meshStandardMaterial color={MANE} flatShading roughness={1} />
            </mesh>
          ))}

          {/* Garganta e peito em creme, visíveis entre as pernas dianteiras. */}
          <mesh castShadow position={[0, 0.48, -0.65]} scale={[0.15, 0.24, 0.11]}>
            <sphereGeometry args={[1, 7, 5]} />
            <meshStandardMaterial color={CREAM} flatShading roughness={0.95} />
          </mesh>

          {/* Pescoço alto que liga o dorso à cabeça alongada. */}
          <mesh castShadow position={[0, 0.76, -0.62]} rotation={[-0.18, 0, 0]} scale={[0.16, 0.32, 0.21]}>
            <sphereGeometry args={[1, 8, 6]} />
            <meshStandardMaterial color={COAT} flatShading roughness={0.9} />
          </mesh>

        <group ref={head} position={[0, 1.0, -0.76]}>
          <mesh castShadow scale={[0.215, 0.2, 0.25]}>
            <sphereGeometry args={[1, 8, 6]} />
            <meshStandardMaterial color={COAT_LIGHT} flatShading roughness={0.85} />
          </mesh>

          {/* Perfil de raposa-guará: ponte estreita e focinho longo, sem mandíbula pesada. */}
          <mesh castShadow position={[0, -0.045, -0.31]} rotation={[-Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.115, 0.62, 7]} />
            <meshStandardMaterial color={COAT} flatShading roughness={0.88} />
          </mesh>
          <mesh castShadow position={[0, -0.12, -0.34]} scale={[0.095, 0.045, 0.27]}>
            <sphereGeometry args={[1, 7, 5]} />
            <meshStandardMaterial color={CREAM} flatShading roughness={0.92} />
          </mesh>
          <mesh castShadow position={[0, -0.045, -0.62]} scale={[0.095, 0.07, 0.085]}>
            <sphereGeometry args={[1, 7, 5]} />
            <meshStandardMaterial color={MUZZLE} flatShading roughness={0.8} />
          </mesh>

          {[-1, 1].map((side, index) => (
            <group
              key={side}
              ref={(node) => {
                ears.current[index] = node;
              }}
              position={[side * 0.16, 0.18, 0.015]}
              rotation={[0, 0, side * -0.1]}
            >
              <mesh castShadow>
                <coneGeometry args={[0.12, 0.58, 5]} />
                <meshStandardMaterial color={COAT} flatShading roughness={0.9} />
              </mesh>
              <mesh position={[0, -0.025, -0.071]} scale={[0.58, 0.74, 0.35]}>
                <coneGeometry args={[0.09, 0.42, 5]} />
                <meshStandardMaterial color={EAR_INNER} flatShading roughness={0.9} />
              </mesh>
            </group>
          ))}

          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.195, 0.025, -0.105]}>
              <mesh castShadow scale={[0.035, 0.035, 0.025]}>
                <sphereGeometry args={[1, 7, 5]} />
                <meshStandardMaterial color="#392923" roughness={0.55} />
              </mesh>
              <mesh position={[side * 0.003, 0, -0.019]} scale={[0.014, 0.021, 0.012]}>
                <sphereGeometry args={[1, 6, 4]} />
                <meshStandardMaterial color="#171413" roughness={0.4} />
              </mesh>
              <mesh position={[-side * 0.009, 0.012, -0.028]} scale={[0.007, 0.007, 0.005]}>
                <sphereGeometry args={[1, 5, 4]} />
                <meshBasicMaterial color="#f4e3c7" />
              </mesh>
            </group>
          ))}
        </group>

        {/* Cauda volumosa e baixa, com a ponta escura característica do conceito. */}
        <group ref={tail} position={[0, 0.48, 0.79]}>
          <mesh castShadow position={[0, 0, 0.23]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.17, 0.48, 7]} />
            <meshStandardMaterial color={COAT_SHADE} flatShading roughness={0.95} />
          </mesh>
          <mesh castShadow position={[0, -0.015, 0.43]} scale={[0.17, 0.15, 0.31]}>
            <sphereGeometry args={[1, 7, 5]} />
            <meshStandardMaterial color={COAT} flatShading roughness={0.95} />
          </mesh>
          <mesh castShadow position={[0, -0.035, 0.69]} scale={[0.14, 0.125, 0.2]}>
            <sphereGeometry args={[1, 7, 5]} />
            <meshStandardMaterial color={MANE} flatShading roughness={1} />
          </mesh>
        </group>

        {/* Pernas altas e finas; a metade inferior e as patas são bem mais escuras. */}
        {LEGS.map((leg, index) => (
          <group
            key={`${leg.x}-${leg.z}`}
            position={[leg.x, 0.34, leg.z]}
            ref={(node) => {
              upperLegs.current[index] = node;
            }}
          >
            <mesh castShadow position={[0, -0.26, 0]}>
              <cylinderGeometry args={[0.062, 0.086, 0.52, 6]} />
              <meshStandardMaterial color={COAT_SHADE} flatShading roughness={0.95} />
            </mesh>
            {/* Mancha creme sutil na face interna das pernas. */}
            <mesh
              castShadow
              position={[-Math.sign(leg.x) * 0.08, -0.25, -0.015]}
              scale={[0.028, 0.14, 0.068]}
            >
              <sphereGeometry args={[1, 6, 5]} />
              <meshStandardMaterial color={CREAM} flatShading roughness={0.95} />
            </mesh>
            <group
              position={[0, -0.52, 0]}
              ref={(node) => {
                lowerLegs.current[index] = node;
              }}
            >
              <mesh castShadow position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.043, 0.058, 0.47, 6]} />
                <meshStandardMaterial color={PAW} flatShading roughness={0.95} />
              </mesh>
              <group
                ref={(node) => {
                  paws.current[index] = node;
                }}
                position={[0, -0.49, -0.045]}
              >
                <mesh castShadow scale={[0.085, 0.065, 0.135]}>
                  <sphereGeometry args={[1, 6, 5]} />
                  <meshStandardMaterial color={PAW} flatShading roughness={0.95} />
                </mesh>
              </group>
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}
