"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { detectWorldCapability } from "@/world/capability";
import { useMounted } from "@/lib/useMounted";
import { FallbackMap } from "@/world/FallbackMap";
import { Link } from "@/i18n/navigation";

const WorldExperience = dynamic(
  () =>
    import("@/world/WorldExperience").then((mod) => ({
      default: mod.WorldExperience,
    })),
  {
    ssr: false,
    loading: () => <WorldLoading />,
  },
);

function WorldLoading() {
  const t = useTranslations("World");
  return (
    <div className="flex min-h-[70vh] items-center justify-center text-sm text-muted">
      {t("loading")}
    </div>
  );
}

type Mode = "intro" | "3d" | "map";

export function WorldEntry() {
  const t = useTranslations("World");
  const [mode, setMode] = useState<Mode>("intro");

  const mounted = useMounted();

  // `null` no servidor e durante a hidratação; só mede o ambiente depois,
  // para o botão de retry não divergir do HTML gerado.
  const capability = useMemo(
    () => (mounted ? detectWorldCapability() : null),
    [mounted],
  );

  if (mode === "3d") {
    return (
      <div className="relative min-h-[calc(100vh-8rem)]">
        <WorldExperience
          onExit={() => setMode("intro")}
          onFallback={() => setMode("map")}
        />
      </div>
    );
  }

  if (mode === "map") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <button
          type="button"
          className="text-sm text-muted hover:text-foreground"
          onClick={() => setMode("intro")}
        >
          ← {t("exit")}
        </button>
        <h1 className="mt-6 text-3xl tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-muted">{t("fallbackBody")}</p>
        <FallbackMap />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
        {t("kicker")}
      </p>
      <h1 className="mt-3 text-4xl tracking-tight">{t("title")}</h1>
      <p className="mt-4 leading-relaxed text-muted">{t("intro")}</p>
      <ul className="mt-8 space-y-1 font-mono text-sm text-muted">
        <li>{t("controlsMove")}</li>
        <li>{t("controlsRun")}</li>
        <li>{t("controlsJump")}</li>
        <li>{t("controlsLook")}</li>
        <li>{t("controlsInteract")}</li>
        <li>{t("controlsEsc")}</li>
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-full bg-accent px-4 py-2 text-sm text-accent-fg"
          onClick={() => {
            const next = detectWorldCapability();
            setMode(next.ok ? "3d" : "map");
          }}
        >
          {t("enter")}
        </button>
        <button
          type="button"
          className="rounded-full border border-border px-4 py-2 text-sm"
          onClick={() => setMode("map")}
        >
          {t("useMap")}
        </button>
        {capability && !capability.ok ? (
          <button
            type="button"
            className="px-2 py-2 text-sm text-muted hover:text-foreground"
            onClick={() => setMode("3d")}
          >
            {t("retry3d")}
          </button>
        ) : null}
        <Link href="/" className="px-2 py-2 text-sm text-muted hover:text-foreground">
          {t("exit")}
        </Link>
      </div>
    </div>
  );
}
