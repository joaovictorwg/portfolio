import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getProjectSlugs } from "@/content/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const staticPaths = ["", "/about", "/experience", "/projects", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPaths = getProjectSlugs().map((slug) => `/projects/${slug}`);
  const paths = [...staticPaths, ...projectPaths];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [item, `${siteUrl}/${item}${path}`]),
        ),
      },
    })),
  );
}
