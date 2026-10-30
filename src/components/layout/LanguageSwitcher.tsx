"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-md border border-border p-0.5 text-xs">
      <span className="sr-only">{t("language")}</span>
      {routing.locales.map((value) => (
        <button
          key={value}
          type="button"
          className={
            locale === value
              ? "rounded px-2 py-1 bg-accent text-accent-fg"
              : "rounded px-2 py-1 text-muted hover:text-foreground"
          }
          onClick={() => router.replace(pathname, { locale: value })}
          aria-pressed={locale === value}
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
