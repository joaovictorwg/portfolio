import { getTranslations } from "next-intl/server";
import { InteractiveLeaf } from "@/components/ui/InteractiveLeaf";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-2 px-8 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-12 lg:px-16 xl:px-20">
        <p>{t("rights")}</p>
        <span className="vine-sway self-start md:self-auto" aria-hidden="true">
          <InteractiveLeaf className="h-5 w-5" tone="signal" direction="right" />
        </span>
      </div>
    </footer>
  );
}
