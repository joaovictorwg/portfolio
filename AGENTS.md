<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cult UI

- Cult UI components are shadcn/ui registry items. Install them with
  `npx shadcn@latest add @cult-ui/<name>`; never recreate them by hand.
- Find component names and docs in https://www.cult-ui.com/llms.txt. Read a
  component's docs at https://www.cult-ui.com/docs/components/<name>.md before using it.
- Installed source lives in `components/ui/`. Edit it there; it is owned code,
  not a dependency.
- Components use Tailwind CSS v4 and shadcn theme tokens (`bg-background`,
  `text-foreground`, `ring-ring`). Style with tokens, not hardcoded colors.
- Animated components use `motion`. Respect `prefers-reduced-motion`.
