# Task: Phase 1.3B-R bounded CI and regression remediation

## Identity and status

- Phase / task ID: 1.3B-R
- Status: in progress (isolated local remediation; not published)
- Owner / execution tool: Dieudonne / Cursor Lead
- Date: 2026-10-09
- Branch: `cursor/phase-1-3b-remediation`
- Baseline ref and commit: exact Devin implementation `4a6e7a1ad8a3bcd1325c454fd028c5f250c71477` (tree `5ae14633ce4848a07f5b87ba5423e088d42d749c`); original base `64006e86c62726326439e0a095f6b2e386822c7e`. Published governance `81e20a1c55b15a9533d271075c44893a5e5293e0` was not incorporated.
- Initial working-tree state and changes to preserve: isolated recovery of the original two-commit chain; active sandbox checkout left on `test/cursor-agent-validation`.
- Instructions read: `AGENTS.md`, architecture/security/branching standards, agent-authority/orchestration/artifact-handoff/architecture-review, ADR 0002/0003, Phase 1.3A/1.3B records.

## Task-level authority assignment

- None: per-action approval applies. Level 2/2+ is not activated.
- Assigned agent: Cursor Lead, attended isolated remediation, no publication.
- Owned files: `.github/workflows/ci-regression.yml`, `tests/dashboard.test.tsx`, this task record.
- Exclusions: `app/`, package files, lockfile, original Devin commits, governance baseline files.
- Risk class: R2. Cost not enforced. Execution attended and stoppable.
- Restricted operations: no commit/push unless separately approved; no PR, merge, deploy, new Devin session, Level 2 activation, or GitHub/Vercel settings changes.

## Objective and authorized scope

Remediate Codex findings R1–R3 on the recovered Phase 1.3B implementation without changing application behavior, dependencies, or the original Git history.

## Requirements, exclusions, and deliverables

- R1: replace mutable `actions/checkout@v4` and `actions/setup-node@v4` with verified full-length SHAs for the current official v4 releases. Preserve permissions, `persist-credentials: false`, timeout, telemetry, triggers, and Node 24.
- R2: assert each rendered card's name together with its matching badge label and hidden decorative dot.
- R3: assert `integrationCounts` is computed from `integrations` in source, not hardcoded numeric literals.
- Do not change `app/` files, runtime dependencies, or rebase/amend/cherry-pick the original two commits.

## Acceptance criteria

- [x] Workflow actions pinned to verified v4 SHAs.
- [x] Card tests require badge-to-card association and one hidden dot per card.
- [x] Count tests fail if `integrationCounts` is replaced with numeric literals.
- [x] Isolated lint, typecheck, build, and tests recorded with real exit codes.
- [x] No tracked application files changed.
- [x] No publication.

## Ownership and coordination

| Role / actual agent | Owned files | Bounded task | Handoff / dependency |
| --- | --- | --- | --- |
| Coordinator / Cursor Lead | This task record | Isolated recovery and scope | Owner-approved 1.3B-R |
| Implementer / Cursor Lead | Workflow, tests, this record | R1–R3 | Verified commit `4a6e7a1` |
| Reviewer | Read-only | Not claimed independent | Later Codex review of exact SHA |
| Validator / Cursor Lead | Isolated generated output | Local checks | Sequential in this environment |

Roles are sequential in one agent. No delegation.

## Implementation and decisions

### R1 action pins (verified 2026-10-09)

| Original tag | Release | Full SHA | Verification source |
| --- | --- | --- | --- |
| `actions/checkout@v4` | v4.4.0, published 2026-07-20 | `11d5960a326750d5838078e36cf38b85af677262` | Official GitHub API `refs/tags/v4` and `releases/tags/v4.4.0`; both resolve to this commit |
| `actions/setup-node@v4` | v4.4.0, published 2025-04-14 | `49933ea5288caeca8642d1e84afbd3f7d6820020` | Official GitHub API `refs/tags/v4` and `releases/tags/v4.4.0`; both resolve to this commit |

Latest upstream majors (`actions/checkout@v7.0.1`, `actions/setup-node@v7.1.0`) were not used, to preserve intended v4 compatibility. `checkout@v4.4.0` documents a breaking change for `pull_request_target` / `workflow_run` fork checkouts; this workflow does not use those events.

### R2 / R3

Card markup now requires the heading, status label from `integrationStatusLabels[status]`, and exactly one empty `aria-hidden` decorative span per article. `integrationCounts` source is read from `app/integrations.ts` and must use `integrations.length` / `.filter` with no decimal literals.

## Validation evidence

Isolated checkout on `cursor/phase-1-3b-remediation` at parent `4a6e7a1…`. Node v24.21.0, npm 11.19.0, `NEXT_TELEMETRY_DISABLED=1`.

| Command | Exit | Notes |
| --- | --- | --- |
| `npm ci` | 0 | 370 packages; inherited 5 high; eslint 9.39.5 deprecation |
| `npm run lint` | 0 | `--max-warnings=0` |
| `npm run typecheck` | 0 | `next typegen` + `tsc --noEmit` |
| `npm run build` | 0 | Next.js 16.4.0 webpack; static `/` and `/_not-found` |
| `npm test` | 0 | 9/9 pass, 0 fail, 0 skip |

`git diff --check` clean. Tracked `app/`, `package.json`, and `package-lock.json` unchanged versus `4a6e7a1`. Generated `node_modules` and `.next` exist only in the disposable environment.

## Risks, blockers, and handoff

- R4 inherited development advisories remain open; no dependency change was authorized.
- R5 historical CI observation remains unverified; this branch is unpublished.
- Original Devin history is preserved as first-parent ancestors.
- Next: owner approval to commit on `cursor/phase-1-3b-remediation`, then independent Codex review of that SHA. No push.
