import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Outfit, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { profile } from "@/content/profile";
import { SiteShell } from "@/components/layout/SiteShell";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const name = profile.shortName;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("titleDefault", { name }),
      template: t("titleTemplate", { name }),
    },
    description: t("description", { name }),
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      siteName: t("siteName", { name }),
      title: t("titleDefault", { name }),
      description: t("description", { name }),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${outfit.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SiteShell>{children}</SiteShell>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
