"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/useMounted";

export function ThemeToggle() {
  const t = useTranslations("Nav");
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      className="inline-flex h-9 items-center rounded-md border border-border px-2.5 text-xs text-muted hover:text-foreground"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={t("theme")}
    >
      {isDark ? t("themeLight") : t("themeDark")}
    </button>
  );
}
