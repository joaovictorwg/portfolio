"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { useLocale } from "next-intl";

type StackVineProps = {
  primary: string[];
  secondary: string[];
};

const ICONS: Record<string, ReactNode> = {
  TypeScript: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="currentColor" stroke="none">
        TS
      </text>
    </>
  ),
  React: (
    <>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </>
  ),
  "Node.js": (
    <>
      <path d="M12 2 21 7v10l-9 5-9-5V7z" />
      <path d="M9 15V9l3-2v8M12 11l3-2v6" />
    </>
  ),
  PostgreSQL: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  Fastify: (
    <path d="M13 2 4 14h6l-1 8 9-12h-6z" fill="currentColor" stroke="none" />
  ),
  "React Query": (
    <>
      <path d="M20 12a8 8 0 0 1-13.5 5.8" />
      <path d="M4 12a8 8 0 0 1 13.5-5.8" />
      <polyline points="18 2 18 6.5 13.5 6.5" />
      <polyline points="6 22 6 17.5 10.5 17.5" />
    </>
  ),
  Python: (
    <>
      <rect x="3.5" y="2.5" width="17" height="19" rx="3" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="currentColor" stroke="none">
        PY
      </text>
    </>
  ),
  FastAPI: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M13 6 7 13h4l-1 5 6-7h-4z" fill="currentColor" stroke="none" />
    </>
  ),
  Redis: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v4c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 13v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4" />
    </>
  ),
  Docker: (
    <>
      <rect x="3" y="10" width="5" height="5" />
      <rect x="9" y="10" width="5" height="5" />
      <rect x="15" y="10" width="5" height="5" />
      <rect x="9" y="5" width="5" height="5" />
      <path d="M2 18c4 4 18 4 20-2 2 0 3-1 3-1" />
    </>
  ),
};

function fallbackIcon(name: string) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fontWeight="700" fill="currentColor" stroke="none">
        {initials}
      </text>
    </>
  );
}

function TechIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" className="skills-band__icon" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name] ?? fallbackIcon(name)}
    </svg>
  );
}

function SkillItem({ name }: { name: string }) {
  return (
    <div className="skills-band__item" title={name}>
      <TechIcon name={name} />
      <span className="skills-band__item-label">{name}</span>
    </div>
  );
}

function MarqueeRow({ items }: { items: string[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="skills-marquee__viewport">
      <div className="skills-marquee__track">
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="skills-marquee__item"
            title={item}
            aria-hidden={index >= items.length ? true : undefined}
          >
            <span aria-hidden className="skills-marquee__mark">
              ✳
            </span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StackVine({ primary, secondary }: StackVineProps) {
  const reduceMotion = useReducedMotion();
  const locale = useLocale();

  return (
    <section
      className="skills-band border-2 border-ink bg-background shadow-[4px_4px_0_var(--foreground)]"
      aria-label="Technology stack"
    >
      <div className="skills-band__row">
        <a
          href={`/${locale}/about#technologies`}
          className="skills-band__label"
          title="Ver tecnologias"
        >
          Skills<span aria-hidden>→</span>
        </a>
        {primary.map((item) => <SkillItem key={item} name={item} />)}
      </div>

      <div className={reduceMotion ? "skills-marquee skills-marquee--static" : "skills-marquee"}>
        <MarqueeRow items={secondary} />
      </div>
    </section>
  );
}
