"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { id: "top", key: "home" as const },
  { id: "projects", key: "projects" as const },
  { id: "experience", key: "experience" as const },
  { id: "about", key: "about" as const },
  { id: "contact", key: "contact" as const },
];

export function Header({ name }: { name: string }) {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const homeHref = (section: string) => `/${locale}/#${section}`;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
      />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href={homeHref("top")} className="font-display text-xl font-semibold tracking-tight transition-colors hover:text-signal">
          {name}
        </a>
        <nav
          className="hidden items-center gap-5 text-sm text-muted md:flex"
          aria-label={t("primaryNav")}
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={homeHref(link.id)}
              className="transition-colors hover:text-signal"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <span aria-hidden className="text-lg">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-2 border-t border-border px-4 py-3 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={homeHref(link.id)}
              className="py-1 text-sm"
              onClick={() => setOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
