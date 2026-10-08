# Architecture standard

## Current application

This is a static Next.js App Router dashboard using React, strict TypeScript, and Tailwind CSS v4. `package.json` and `package-lock.json` define the actual tool versions. The dashboard displays historical and demonstration records; it has no integration health checks or backend.

| File | Responsibility |
| --- | --- |
| `app/layout.tsx` | Document language, global CSS, metadata |
| `app/page.tsx` | Dashboard composition, historical text, derived summary metrics |
| `app/components/integration-grid.tsx` | Present the integration cards |
| `app/integrations.ts` | Typed records, status labels, derived counts, count formatting |
| `app/globals.css` | Tailwind import, shared dark theme tokens, base/focus styling |

## Change rules

- Prefer Server Components for static UI. Add `use client` only when state, event handlers, or browser APIs require it; keep that boundary narrow.
- Keep one readonly typed integration dataset. Status labels and count calculations must use that source; do not maintain parallel verification booleans or hardcoded summary counts.
- Keep data independent of rendering components. Extract reusable components when responsibilities warrant it, without adding layers for their own sake.
- Retain strict TypeScript. Avoid `any`, unchecked casts, and suppression comments that hide a design error.
- Use the existing Tailwind v4 `@theme` tokens and PostCSS setup. Keep conditional utility classes as complete strings so they are discoverable.
- Preserve readable JSX, stable list keys, semantic sections/headings, text status labels, skip navigation, and visible focus. Small labels should be at least `text-xs` (0.75rem). Let labels wrap as needed.
- Maintain single-column mobile layout and existing wider grid breakpoints. For UI changes, check narrow screens and zoom as well as desktop; report when browser validation is unavailable.
- Keep the existing Webpack build and TypeScript compiler-API configuration. They address recorded environment limitations; changing them requires validation, not disabling type checking.
- No new runtime service, authentication, database, API, or dependency is needed for Phase 1.1.

## Dashboard invariants

Preserve GitHub, Vercel, Cursor, Codex, Devin, and Figma cards, the dark theme, and these exact visible strings:

- `MTG CONSULTING`
- `Frontend Integration Sandbox`
- `GitHub + Vercel + Cursor + v0`
- `Cursor + GitHub + Vercel integration verified — Test 2`

The final string is historical text and must remain explicitly labeled as such. Historical records and demonstration entries must not imply current monitoring, successful deployments, or a protected production environment. Summary counts must follow the dataset; the current baseline yields six total, three historical, and three demonstration entries.

## Validation

Run `npm run build`, `npm run lint`, and `npm run typecheck`. Check generated HTML when content preservation is at issue. A build proves compilation and prerendering, not external integration behavior or browser accessibility. Follow [security](security.md) and [branching](branching.md) standards for related changes.
