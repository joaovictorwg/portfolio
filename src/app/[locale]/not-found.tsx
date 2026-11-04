import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("Nav");

  return (
    <div className="w-full px-4 py-24 md:px-6">
      <h1 className="text-3xl tracking-tight">404</h1>
      <p className="mt-3 text-muted">{t("home")}</p>
      <Link href="/" className="mt-6 inline-block text-accent">
        {t("home")}
      </Link>
    </div>
  );
}
