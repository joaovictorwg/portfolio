"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type NavKey = "home" | "projects" | "experience" | "about" | "contact";

type NavLink = {
  id: string;
  key: NavKey;
  /** Rota própria (página inteira); sem `path`, o link é âncora da home. */
  path?: string;
};

const links: NavLink[] = [
  { id: "top", key: "home" },
  { id: "projects", key: "projects", path: "/projects" },
  { id: "experience", key: "experience" },
  { id: "about", key: "about", path: "/about" },
  { id: "contact", key: "contact" },
];

export function Header({ name }: { name: string }) {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const hrefFor = (link: NavLink) =>
    link.path ? `/${locale}${link.path}` : `/${locale}/#${link.id}`;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
      />
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-4 px-8 py-3 md:px-12 lg:px-16 xl:px-20">
        <a href={`/${locale}/#top`} className="font-display text-xl font-semibold tracking-tight transition-colors hover:text-signal">
          {name}
        </a>
        <nav
          className="ml-10 hidden items-center gap-5 text-sm text-muted md:flex"
          aria-label={t("primaryNav")}
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={hrefFor(link)}
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
              href={hrefFor(link)}
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
