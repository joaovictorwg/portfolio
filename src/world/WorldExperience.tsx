"use client";

import { KeyboardControls, type KeyboardControlsEntry } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { InteractionPanel } from "./FallbackMap";
import type { InteractableTarget } from "./map";
import { WorldScene, type WorldLabels } from "./WorldScene";

const keyMap: KeyboardControlsEntry<string>[] = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "back", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["ShiftLeft", "ShiftRight"] },
  { name: "jump", keys: ["Space"] },
  { name: "interact", keys: ["KeyE"] },
];

export function WorldExperience({
  onExit,
  onFallback,
}: {
  onExit: () => void;
  onFallback: () => void;
}) {
  const t = useTranslations("World");
  const locale = useLocale();
  const [nearby, setNearby] = useState<InteractableTarget | null>(null);
  const [open, setOpen] = useState<InteractableTarget | null>(null);

  const labels: WorldLabels = {
    start: t("zoneStart"),
    concepts: { queue: t("conceptQueue"), stack: t("conceptStack") },
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code === "KeyE" && nearby) {
        setOpen(nearby);
      }
      if (event.code === "Escape") {
        setOpen(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nearby]);

  return (
    <div className="relative h-[calc(100vh-8rem)] min-h-[28rem] overflow-hidden rounded-none border-y border-border bg-black">
      <KeyboardControls map={keyMap}>
        <Canvas
          shadows
          camera={{ position: [0, 4, 16], fov: 50 }}
          onCreated={({ gl }) => {
            const context = gl.getContext();
            if (!context) {
              onFallback();
            }
          }}
        >
          <color attach="background" args={["#0a0d0c"]} />
          <Suspense fallback={null}>
            <Physics gravity={[0, -18, 0]}>
              <WorldScene
                onNearby={setNearby}
                locale={locale}
                labels={labels}
                isInteracting={open !== null}
              />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>

      <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-between px-4">
        <p className="rounded-full bg-background/80 px-3 py-1 font-mono text-xs">
          {t("controlsTitle")}: {t("controlsShort")}
        </p>
        <button
          type="button"
          className="pointer-events-auto rounded-full border border-border bg-background/80 px-3 py-1 text-xs"
          onClick={onExit}
        >
          {t("exit")}
        </button>
      </div>

      {nearby && !open ? (
        <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-2 font-mono text-sm text-accent-fg">
          [ E ] {t("interact")}
        </p>
      ) : null}

      {open ? (
        <InteractionPanel target={open} onClose={() => setOpen(null)} />
      ) : null}
    </div>
  );
}
