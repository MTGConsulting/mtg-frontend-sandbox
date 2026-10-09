# Task: Phase 1.3B-CI GitHub Actions annotation remediation

## Identity and status

- Phase / task ID: 1.3B-CI
- Status: in progress (isolated local remediation; not committed; not published)
- Owner / execution tool: Dieudonne / Cursor Lead
- Date: 2026-10-09
- Branch: `cursor/phase-1-3b-ci-annotations`
- Baseline ref and commit: published `devin/phase-1-3b-ci-regression-tests` @ `d045f53ea30874b974580b90e39480c68eef21db` (tree `57dedbcdab6ab57bae4fcf28e18ad841d95f4a97`)
- Initial working-tree state and changes to preserve: isolated recovery of the published remediation commit; active sandbox left on `test/cursor-agent-validation` @ `81e20a1c55b15a9533d271075c44893a5e5293e0`
- Instructions read: `AGENTS.md`, ADR 0003, agent-authority, branching, security, orchestration, artifact-handoff

## Task-level authority assignment

- None: per-action approval applies. Level 2/2+ is not activated.
- Assigned agent: Cursor Lead, attended isolated remediation, no publication in this step.
- Owned files: `.github/workflows/ci-regression.yml`, this task record.
- Exclusions: `app/`, tests, package files, lockfile, original Devin/Cursor commits, GitHub/Vercel settings.
- Risk class: R2. Cost not enforced. Execution attended and stoppable.

## Objective and authorized scope

Resolve the two GitHub Actions annotations from the successful Phase 1.3B run (Node.js 20 action runtime deprecation; Ubuntu latest brownout) without changing application behavior, expanding permissions, or adding deploy/cache/secret capabilities.

## Requirements, exclusions, and deliverables

- Pin `actions/checkout` and `actions/setup-node` to official v5 releases that declare `runs.using: node24`.
- Replace `runs-on: ubuntu-latest` with `ubuntu-24.04`.
- Preserve read-only permissions, `persist-credentials: false`, Node 24 application setup, triggers/job guards, 15-minute timeout, and `NEXT_TELEMETRY_DISABLED=1`.
- Do not add secrets, tokens, elevated permissions, cache uploads, or deployment steps.
- Do not modify application source, tests, or dependencies.

## Acceptance criteria

- [x] Both actions use verified immutable 40-character SHAs for official v5 releases with Node 24 action runtime.
- [x] Runner is explicitly `ubuntu-24.04`.
- [x] Workflow permissions remain `contents: read`.
- [x] Isolated static/local validation recorded.
- [ ] Independent Codex review of the exact commit (after owner-approved commit).
- [ ] Owner-authorized publication followed by a GitHub Actions run that no longer reports the two original annotations.

Local validation cannot prove the hosted annotations are gone.

## Ownership and coordination

| Role / actual agent | Owned files | Bounded task | Handoff / dependency |
| --- | --- | --- | --- |
| Coordinator / Cursor Lead | This task record | Isolated recovery and scope | Owner-approved 1.3B-CI |
| Implementer / Cursor Lead | Workflow, this record | Annotation remediation | Published SHA `d045f53` |
| Reviewer | Read-only | Not claimed independent | Later Codex of exact SHA |
| Validator / Cursor Lead | Isolated generated output | Static/local checks | Sequential in this environment |

Roles are sequential in one agent. No delegation.

## Implementation and decisions

### Action pins (verified 2026-10-09)

| Original | Selected release | Full SHA | Runtime | Verification |
| --- | --- | --- | --- | --- |
| `actions/checkout@11d5960a…` (v4.4.0, `node20`) | v5.1.0, published 2026-07-20 | `fbc6f3992d24b796d5a048ff273f7fcc4a7b6c09` | `runs.using: node24` in `action.yml` at that tag | Official API `refs/tags/v5` and `refs/tags/v5.1.0` both resolve to this commit; release https://github.com/actions/checkout/releases/tags/v5.1.0 |
| `actions/setup-node@49933ea5…` (v4.4.0, `node20`) | v5.0.0, published 2025-09-04 (latest v5) | `a0853c24544627f65ddf259abe73b1d18a591444` | `runs.using: node24` in `action.yml` at that tag | Official API `refs/tags/v5` and `refs/tags/v5.0.0` both resolve to this commit; release https://github.com/actions/setup-node/releases/tags/v5.0.0 |

Minimum Actions Runner for both v5 releases: **v2.327.1**. GitHub-hosted `ubuntu-24.04` images exceed that requirement and currently ship Node.js 22 and 24 toolcaches. Application `node-version: "24"` is unchanged.

v5 was preferred over current latest majors (`checkout@v7.0.1`, `setup-node@v7.1.0`) because it is the first major that satisfies the Node 24 action-runtime requirement.

### Breaking changes reviewed

- `checkout@v5.1.0` backports safer `pull_request_target` / `workflow_run` fork checkout (`allow-unsafe-pr-checkout`, default false). This workflow uses `pull_request`, `push`, and `workflow_dispatch` only.
- `setup-node@v5.0.0` enables automatic package-manager caching when `package.json` contains `packageManager`. This repository has no `packageManager` field. The workflow sets `package-manager-cache: false` so the previous no-cache behavior is explicit. That input disables cache; it does not add a cache step, upload, or extra permission.

### Runner

`ubuntu-latest` currently aliases Ubuntu 24.04 and is the source of the brownout annotation. Pinning `ubuntu-24.04` is the authorized replacement. Application runtime configuration is unchanged.

## Validation evidence

Isolated checkout on `cursor/phase-1-3b-ci-annotations` at parent `d045f53…`. Node v24.21.0, npm 11.19.0, `NEXT_TELEMETRY_DISABLED=1`.

| Command / check | Result and exit code | Evidence / limitation |
| --- | --- | --- |
| Official API tag/release SHA match | PASS | checkout v5/v5.1.0 → `fbc6f399…`; setup-node v5/v5.0.0 → `a0853c24…` |
| `action.yml` `runs.using` | PASS | both `node24` at the pinned tags |
| YAML parse | PASS | PyYAML `safe_load` |
| Permissions / no secrets / no deploy / no `cache: npm` | PASS | static text checks |
| `git diff --check` | PASS, 0 | no whitespace errors |
| Changed-file scope | PASS | workflow + this task record only |
| Ancestry | PASS | HEAD still `d045f53`; Devin commits unchanged |
| `npm ci` | PASS, 0 | 5 inherited highs; eslint deprecation |
| `npm run lint` | PASS, 0 | `--max-warnings=0` |
| `npm run typecheck` | PASS, 0 | `next typegen` + `tsc --noEmit` |
| `npm test` | PASS, 0 | 9/9 |
| Webpack build | not rerun | no `app/` or package change; prior SHA already built |
| Hosted annotation absence | NOT VERIFIED | requires a new GitHub Actions run after publication |

## Risks, blockers, and handoff

- Hosted annotation resolution is **not claimed** until a new GitHub Actions run on the published SHA confirms their absence.
- Five inherited high development advisories (`GHSA-vfj7-8cjw-p6xm`) remain.
- Workflow triggers still target `devin/phase-1-3b-ci-regression-tests` only.
- Codex/ChatGPT of this uncommitted diff have not run.
- Next: owner commit approval, then Codex of the exact SHA, then separate push authorization.

Proposed commit message:

`ci: pin Actions v5 Node 24 runtime and ubuntu-24.04`
