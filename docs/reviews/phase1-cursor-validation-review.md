# Phase 1.2: Independent badge extraction review

- Date: 2026-10-08.
- Reviewer: Codex, separately reviewing the submitted implementation; no implementation edits made.
- Implementation owner: native Cursor Agent, according to the user-supplied completion report. Agent identity and rule activation were not independently observed in the UI.
- Repository/branch: `mtg-frontend-sandbox`, `test/cursor-agent-validation`.
- Baseline: HEAD `2ed4f62`; reviewed uncommitted grid diff and new badge file, including untracked content.
- Disposition: **PASS for code review and automated checks; WARN / Phase 1.2 acceptance pending real keyboard/zoom checks and Cursor UI rule activation evidence.**

## Scope and findings

No blocking code defects found in the two-file extraction.

| Area | Result | Evidence |
| --- | --- | --- |
| Scope and architecture | PASS | Only `app/components/integration-grid.tsx` and new `app/components/integration-status-badge.tsx` comprise the application change; no client boundary added |
| Type safety | PASS | Badge lines 3–16 use a readonly `IntegrationStatus` prop and exhaustive `Record<IntegrationStatus, ...>` style map |
| Data reuse | PASS | Badge imports existing labels/type; grid renders it for each record; `app/integrations.ts` unchanged |
| Presentation | PASS, source/static checks | Badge lines 22–24 preserve original classes, real text at `text-xs`, and `aria-hidden` on the decorative dot; complete Tailwind utility strings remain discoverable |
| Security/dependencies | PASS within diff scope | No network calls, secrets, dependencies, auth, database, or configuration changes introduced |
| Browser behavior | WARN, unverified | Keyboard focus, skip-link activation, narrow layouts, and zoom not exercised; equivalent source markup is not a browser test |
| Cursor rule activation | WARN, unverified | Implementer reported rules attached/read, but no observed native Cursor UI rule list/version for the execution was supplied |

The badge remains a static historical/demonstration label. No live integration or production-isolation validation is implied.

## Independent validation

Checks ran against a temporary copy of the working tree, including the new untracked component, using existing installed dependencies. Build and type generation ran sequentially. File hashes confirmed original source and guidance remained untouched during the read-only review; only documentation was updated afterward as requested.

| Command/check | Result |
| --- | --- |
| `NEXT_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/mtg-badge-review-qyym_b_k/xdg npm run build` | PASS, exit 0; static `/` prerendered |
| `npm run lint` | PASS, exit 0; zero warnings allowed |
| `NEXT_TELEMETRY_DISABLED=1 npm run typecheck` | PASS, exit 0 |
| `git diff --check` | PASS, exit 0 |
| Generated HTML | PASS; original four strings present, six articles, six status badges, six aria-hidden dots, derived 06/03/03 counts |
| Generated CSS | PASS; historical/demonstration color utilities present |
| Dependency and baseline files | PASS; package/lockfile, dataset, page, layout, and global CSS unchanged from HEAD |

Report clarification: “MTG CONSULTING” occurs twice in visible content (header and footer), as in the baseline; the implementer's “once each” wording is inaccurate, but this is not an application regression.

The implementer reported an initial build `EACCES` for Next.js configuration outside the sandbox, followed by a successful rerun with temporary `XDG_CONFIG_HOME`. The independent build used a temporary config directory and completed without that failure.

## Remaining acceptance and inherited risk

- Observe native Cursor rule activation and record its version for the execution. A prior launcher version or an agent claiming it read rules is not UI activation evidence.
- Perform browser keyboard/skip-link, narrow viewport, and zoom checks; record results or obtain explicit acceptance of the limitation. No Playwright/Puppeteer package or Chromium/Chrome executable was available in this review; nothing was installed.
- Keep Phase 1.2 pending these checks or explicit project-owner disposition. This review does not automatically start Devin work or authorize publication.
- The five inherited high-severity development lint-chain findings remain documented in the security standard. Dependencies are unchanged; no fresh audit was run and no current production-security guarantee is asserted.

Inspected files: `AGENTS.md`, task specification, review/architecture/security standards, both badge/grid components, existing dataset/page/layout/styles through diff and generated output, and package scripts/lockfile scope. No commit, push, merge, deployment, installation, or production action was performed. Changes after review are limited to this review record and the task's evidence/status update.


## Supplemental browser evidence — 2026-10-08

The user supplied Cursor browser DOM/style/accessibility measurements: skip-link focus visibility and click activation proxy PASS; 320px reflow and all six status labels PASS. Real Tab/Enter and actual browser zoom remain unverified. Main focus remains WARN (no tabindex; active element reported as body). At 160px, overflow was reported; no baseline browser comparison establishes its cause. Screenshots were not inspected.

Cursor terminal version was supplied as 3.23.23, commit 2dac2428994fe34f12658d9ecad1541b98db2c00, x64. Attached rules are indirect evidence; the active-rule UI display remains unobserved. These are supplied results, not independently repeated browser validation. See the [task evidence update](../tasks/phase1-cursor-validation.md) for full measurements, reverted dev side effects, and remaining acceptance. Code-review disposition remains PASS; full phase acceptance remains pending.
