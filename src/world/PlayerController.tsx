"use client";

import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CapsuleCollider,
  RigidBody,
  useRapier,
  type RapierRigidBody,
} from "@react-three/rapier";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ManedWolf } from "./character/ManedWolf";
import type { CharacterHeadingRef, CharacterMotionRef } from "./character/types";
import type { InteractableTarget } from "./map";

const SPEED = 7;
const RUN_SPEED = 10.5;
const JUMP_VELOCITY = 7.2;
const GROUND_RAY_LENGTH = 0.92;
const INTERACT_DISTANCE = 3.2;

export function PlayerController({
  interactables,
  onNearby,
  isInteracting,
}: {
  interactables: { position: [number, number, number]; target: InteractableTarget }[];
  onNearby: (target: InteractableTarget | null) => void;
  isInteracting: boolean;
}) {
  const body = useRef<RapierRigidBody>(null);
  const yaw = useRef(0);
  const holding = useRef(false);
  const jumpWasPressed = useRef(false);
  const motion = useRef<CharacterMotionRef["current"]>("idle");
  const heading = useRef<CharacterHeadingRef["current"]>(0);
  const [, get] = useKeyboardControls();
  const { gl } = useThree();
  const { world, rapier } = useRapier();
  const groundRay = useRef(
    new rapier.Ray({ x: 0, y: 0, z: 0 }, { x: 0, y: -1, z: 0 }),
  );
  const lastNearby = useRef<string | null>(null);

  useEffect(() => {
    const el = gl.domElement;
    const onDown = () => {
      holding.current = true;
    };
    const onUp = () => {
      holding.current = false;
    };
    const onMove = (event: MouseEvent) => {
      if (!holding.current) {
        return;
      }
      yaw.current -= event.movementX * 0.005;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
      }
    };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [gl]);

  useFrame((state) => {
    const rigid = body.current;
    if (!rigid) {
      return;
    }

    const { forward, back, left, right, run, jump } = get();
    const jumpJustPressed = jump && !jumpWasPressed.current;
    jumpWasPressed.current = jump;
    const front = new THREE.Vector3(0, 0, -1).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      yaw.current,
    );
    const side = new THREE.Vector3(1, 0, 0).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      yaw.current,
    );

    const wish = new THREE.Vector3();
    if (forward) wish.add(front);
    if (back) wish.sub(front);
    if (right) wish.add(side);
    if (left) wish.sub(side);
    if (isInteracting) {
      wish.set(0, 0, 0);
    }
    const moving = wish.lengthSq() > 0;
    if (wish.lengthSq() > 0) {
      wish.normalize().multiplyScalar(run ? RUN_SPEED : SPEED);
    }

    const vel = rigid.linvel();
    const translation = rigid.translation();
    // Preserve the last facing direction when input is released. This also
    // lets the wolf keep the direction it turned toward while backpedaling.
    if (moving) {
      heading.current = Math.atan2(-wish.x, -wish.z);
    }

    groundRay.current.origin.x = translation.x;
    groundRay.current.origin.y = translation.y;
    groundRay.current.origin.z = translation.z;
    const groundHit = world.castRayAndGetNormal(
      groundRay.current,
      GROUND_RAY_LENGTH,
      true,
      undefined,
      undefined,
      undefined,
      rigid,
    );
    const grounded = Boolean(
      groundHit && groundHit.normal.y > 0.55 && groundHit.timeOfImpact <= 0.88 && vel.y <= 0.15,
    );
    const didJump = jumpJustPressed && grounded && !isInteracting;
    const verticalVelocity = didJump ? JUMP_VELOCITY : vel.y;

    rigid.setLinvel({ x: wish.x, y: verticalVelocity, z: wish.z }, true);

    const playerPos = new THREE.Vector3(translation.x, translation.y, translation.z);

    motion.current = isInteracting
      ? "interacting"
      : didJump || !grounded
        ? "jumping"
        : moving
          ? run
            ? "running"
            : "walking"
          : "idle";

    const camOffset = new THREE.Vector3(0, 2.6, 6).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      yaw.current,
    );
    const camTarget = playerPos.clone().add(camOffset);
    state.camera.position.lerp(camTarget, 0.12);
    state.camera.lookAt(playerPos.x, playerPos.y + 1.1, playerPos.z);

    let closest: { dist: number; target: InteractableTarget } | null = null;
    for (const item of interactables) {
      const dist = playerPos.distanceTo(
        new THREE.Vector3(item.position[0], 1, item.position[2]),
      );
      if (dist < INTERACT_DISTANCE && (!closest || dist < closest.dist)) {
        closest = { dist, target: item.target };
      }
    }

    const key = closest ? `${closest.target.kind}:${closest.target.id}` : null;
    if (key !== lastNearby.current) {
      lastNearby.current = key;
      onNearby(closest?.target ?? null);
    }
  });

  return (
    <RigidBody
      ref={body}
      position={[0, 0.82, 12]}
      colliders={false}
      enabledRotations={[false, false, false]}
      canSleep={false}
    >
      <CapsuleCollider args={[0.48, 0.29]} />
      <ManedWolf motion={motion} heading={heading} />
    </RigidBody>
  );
}
