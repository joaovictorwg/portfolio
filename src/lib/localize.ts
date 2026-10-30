import { routing, type AppLocale } from "@/i18n/routing";
import type { Localized } from "@/content/types";

/** Normaliza qualquer entrada para um locale suportado, com fallback no padrão. */
export function resolveLocale(locale: string | undefined): AppLocale {
  if (locale && (routing.locales as readonly string[]).includes(locale)) {
    return locale as AppLocale;
  }
  return routing.defaultLocale;
}

export function localize<T>(value: Localized<T>, locale: string): T {
  return value[resolveLocale(locale)];
}
