# Phase 1.2: Native Cursor Agent badge validation

## Identity and execution boundary

- Status: IMPLEMENTED (user-reported native Cursor execution); independent code review and automated checks PASS; browser DOM checks reported PASS with warnings; real keyboard/zoom validation and observed Cursor rule activation pending.
- Implementation owner: Cursor's native Agent, not the Codex extension.
- Reviewer: Codex or an authorized independent human after implementation.
- Repository: `mtg-frontend-sandbox` in the existing WSL workspace.
- Approved branch: `test/cursor-agent-validation`; recheck before editing and stop on mismatch.
- Baseline: `2ed4f62`; preserve all uncommitted Phase 1.1 guidance.
- Source: [handoff Section 24](../context/project-handoff.md). Sections 22–24 distinguish Phase 1.1 rules preparation from Phase 1.2 implementation.

## Objective and business context

Validate that Cursor's native Agent can follow repository rules, implement a bounded component extraction, and report evidence without publishing changes. Create a reusable `IntegrationStatusBadge` for historical/demonstration status presentation.

## Scope and requirements

- Create `app/components/integration-status-badge.tsx` and integrate it into `app/components/integration-grid.tsx`.
- Reuse `IntegrationStatus` and status labels from `app/integrations.ts`; only adjust that file if necessary for this immediate integration and explain why.
- Accept a typed status prop. Centralize badge styling/status rendering, avoiding duplicate conditions in the grid.
- Preserve both status labels, all six cards, original visible content, dark theme, responsive behavior, focus/skip navigation, and readable label sizes. Decorative dots remain hidden from assistive technology; status must be available as text.
- Keep the component server-compatible; no client state or new dependency is needed.
- Follow [AGENTS.md](../../AGENTS.md), [architecture](../standards/architecture.md), and [security](../standards/security.md).

No unrelated refactoring, API/authentication/database work, secrets, dependency changes, production work, or other repository access. Explanation alone does not authorize expanding scope.

## Permissions

Cursor may inspect the repository, edit only the approved component integration files, run build/lint/type checks, and return a report. No commits, pushes, merges, deployments, installs, or publication actions are approved. Existing guidance documents must be preserved.

## Acceptance and evidence

- [ ] Cursor rule activation observed; record Cursor version and active rule names.
- [x] Component extracted with typed props and reused by all six cards.
- [x] Existing dataset, labels, counts, and four original text lines preserved.
- [x] No new dependency, secret, network call, or unrelated change.
- [x] `npm run build`, `npm run lint`, `npm run typecheck`: record exit codes.
- [ ] Keyboard focus/skip link, narrow layout, status text, and zoom preserved; record actual checks or limitations.
- [x] Independent code review completed; no code defects found. Browser/rule-activation acceptance remains open below.
- [x] Correct branch and no unauthorized publication actions (local branch checked; publication abstention reported by implementer and maintained by reviewer).

## Native Cursor execution prompt

```text
Execute docs/tasks/phase1-cursor-validation.md using Cursor's native Agent.
Read AGENTS.md, applicable .cursor/rules, and the task first.
Verify test/cursor-agent-validation and preserve all existing uncommitted work.
Implement only the typed IntegrationStatusBadge extraction and its immediate
integration. Do not commit, push, merge, deploy, install dependencies, or access
other repositories. Run build, lint, and TypeScript checks. Report changed files,
commands and exit codes, UI validation limits, risks, and Git status. Do not
claim that local tests verify external integrations or production isolation.
```

## Preparation evidence (before implementation)

2026-10-08: local capability discovery found a Cursor editor remote launcher, but no `cursor-agent` or `agent` executable on PATH and no callable native Cursor Agent tool. The editor launcher is not evidence that an Agent task ran. No software was installed and no Cursor implementation was substituted with Codex work.

All numbered handoff sections and the owner-supplied closing continuation after Section 24 are assembled; no source gaps remain. Rule metadata can be checked locally, but activation must be observed in Cursor. At preparation time no implementation had run; the subsequent execution and review are recorded below.

Completion report must identify owner/tool, repository/branch, created/modified files, functional changes, build/lint/type results, accessibility checks/limits, security findings, dependency/secret changes, working-tree state, outstanding issues, and confirmation that publication was not performed.

## Implementation and independent review — 2026-10-08

The user supplied a Cursor Agent completion report: created `app/components/integration-status-badge.tsx`, integrated it into the grid, retained the dataset, and performed no installation, publication, or Phase 1.1 documentation changes. Build, lint, and typecheck were reported PASS; an initial build configuration-write permission error was resolved using temporary `XDG_CONFIG_HOME`. Browser checks and UI-observed rule activation were explicitly not performed.

Codex independently inspected the actual working-tree changes and reran build, lint, and TypeScript validation in a temporary copy: all exited 0. Generated HTML checks confirmed the original content, six cards/badges/hidden dots, and derived counts. Application and dependency files were not changed by the reviewer. See the [independent review](../reviews/phase1-cursor-validation-review.md) for commands, findings, scope, and limitations.

**Current disposition: code review PASS; Phase 1.2 not fully accepted.** No blocking code defect was identified. Remaining evidence is native Cursor version/active rules and browser keyboard, skip-link, narrow-layout, and zoom validation. Record results or an explicit owner decision on these gaps before declaring the phase passed. Independent review is now complete; production actions and Devin execution are not authorized by this result.


## Browser and Cursor evidence update — 2026-10-08

Evidence below is supplied by the user from the Cursor session; Codex did not independently observe the UI or repeat browser checks. Scope of this update is acceptance documentation only; application and configuration files remain unchanged.

- Terminal-reported Cursor version: `3.23.23`, commit `2dac2428994fe34f12658d9ecad1541b98db2c00`, x64. This identifies the launcher version, not observed UI activation.
- Indirect context evidence: `00-workflow.mdc`, `20-security.mdc`, and `AGENTS.md` attached as always-applied; `10-architecture.mdc` and `30-task-records.mdc` attached when matching files were read. Cursor's rule/context display was not visible. Activation acceptance remains open; Codex has no callable desktop/UI inspection tool in this session.
- Browser used a development server on loopback `127.0.0.1:3100`, restarted with network permission after sandbox visibility failed. Server reported stopped afterward.

| Browser check | Reported result / limitation |
| --- | --- |
| Skip link first and only focusable element | PASS; no other links or buttons on the page |
| Skip link visible on focus | PASS; `focus-visible`, 2px accent outline, 130×48px accent background |
| Real Tab then Enter | NOT VERIFIED; synthetic events did not move focus or activate the link |
| Click activation proxy | PASS; `.click()` changed URL to `#main` and scrolled main to the top; does not establish keyboard activation |
| Focus on main | WARN; main has no `tabindex`, active element remained body. Reported keyboard starting-point behavior and subsequent Tab were not verified |
| 320px viewport | PASS; equal scroll/client widths, no clipped text, minimum 12px font, single column. Viewport simulation does not establish real browser zoom behavior |
| Cards/status text at 320px | PASS; six cards, three Historical record and three Demonstration only labels |
| 160px stress viewport | WARN; horizontal overflow, heading approximately 20px beyond right edge and demonstration badge approximately 1px beyond. Classes reported unchanged, but baseline was not tested; inherited cause is unconfirmed |

Measurements used DOM geometry, computed styles, and accessibility snapshot. Screenshots were not inspected and are not acceptance evidence.

Reported development side effects were reverted: Next.js appended its generated agent-rules block to `AGENTS.md`, and rewrote route imports in `next-env.d.ts` to `.next/dev/…`. Current local inspection confirms AGENTS.md has no generated marker and next-env.d.ts has no diff against HEAD. A future dev run may regenerate these changes. No `agentRules` configuration change was made.

**Disposition: code review and automated checks remain PASS; Phase 1.2 acceptance remains open.** Required evidence is the observed Cursor active-rule display and a real Tab → Enter check at actual 200% browser zoom. A `tabIndex={-1}` change to main is an optional separate scope decision, not part of this badge extraction. No implementation change, install, commit, push, merge, or deployment was performed during this evidence update.

## Phase 1.3A reconciliation — 2026-10-08

Commit `64006e8` now contains the Phase 1.1 guidance and the Phase 1.2 badge extraction; the "uncommitted" and `2ed4f62`-is-HEAD wording above describes earlier checkpoints. The commit also changes `app/page.tsx` (`tabIndex={-1}` and `focus:outline-none` on `<main>`), which the independent review did not cover because the page was unchanged when it ran. Full evidence and commands are in the [Phase 1.3A record](phase-1-3a-baseline-reconciliation.md).

Re-run results for the exact commit (Cursor Agent, temp copy, production build): build, lint, typecheck, and `git diff --check` PASS. Generated content preserved. Activating the skip link at DOM level now moves `document.activeElement` to `<main>`, which resolves the earlier "main focus" WARN. The 160px overflow also exists in parent `2ed4f62` with identical elements, so it is inherited, not a badge regression. Reflow at 640px and 320px is PASS by viewport emulation.

Still open: real Tab → Enter and actual 200% browser zoom (the embedded browser page never held keyboard focus, so key events did not reach it) and observed native Cursor active-rule display. **Disposition unchanged: Phase 1.2 code review and automated checks PASS; full acceptance pending the two manual checks or an explicit project-owner decision accepting the limitation.** The `main` focus change still needs independent review.
