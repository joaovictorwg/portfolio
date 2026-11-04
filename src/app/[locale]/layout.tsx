import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Space_Grotesk, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { profile } from "@/content/profile";
import { SiteShell } from "@/components/layout/SiteShell";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
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
