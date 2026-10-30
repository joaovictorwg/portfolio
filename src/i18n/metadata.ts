import type { Metadata } from "next";
import { routing } from "./routing";

/**
 * `alternates` precisa do caminho completo da rota. Um layout não tem acesso ao
 * pathname, então cada página declara o seu — se um `alternates` genérico viesse
 * do layout, todas as rotas herdariam o canonical da home e seriam tratadas como
 * duplicatas.
 */
export function buildAlternates(
  locale: string,
  path = "",
): NonNullable<Metadata["alternates"]> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    canonical: `${base}/${locale}${path}`,
    languages: Object.fromEntries(
      routing.locales.map((item) => [item, `${base}/${item}${path}`]),
    ),
  };
}
