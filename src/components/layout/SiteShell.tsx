import { getTranslations } from "next-intl/server";
import { profile } from "@/content/profile";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SkipLink } from "./SkipLink";
import { AmbientFoliage } from "@/components/ui/AmbientFoliage";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("Nav");

  return (
    <div className="relative isolate flex min-h-full flex-col">
      <AmbientFoliage />
      <SkipLink label={t("skip")} />
      <Header name={profile.shortName} />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
