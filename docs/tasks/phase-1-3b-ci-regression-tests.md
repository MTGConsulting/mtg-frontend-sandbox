# Task: Phase 1.3B CI and dashboard regression tests

## Identity and status

- Phase / task ID: 1.3B
- Status: blocked (locally validated; remote publication denied)
- Owner / execution tool: Dieudonne / Devin
- Date: 2026-10-09
- Branch: `devin/phase-1-3b-ci-regression-tests`
- Baseline ref and commit: fetched `origin/test/cursor-agent-validation`, verified with `git rev-parse` as `64006e86c62726326439e0a095f6b2e386822c7e`; branch created from that exact SHA.
- Initial working-tree state and changes to preserve: clean fresh clone, no user edits.
- Instructions read: `AGENTS.md`, architecture/security/branching standards, task template; project handoff read as context. Phase 1.1-specific branch/native Cursor instructions are superseded by the owner's Phase 1.3B scope.

## Objective and authorized scope

Close G4/G5 with non-deploying CI and offline regression tests. Only workflows, test files, package scripts/devDependencies/lockfile, and this task record are authorized. Small commits and push only to the named branch are approved. No PR, merge, deployment, release, tags, settings, secrets, or environment configuration changes are authorized.

## Business context and architecture constraints

The [handoff](../context/project-handoff.md) describes a static sandbox, not a production SuperApp. Preserve [dashboard invariants](../standards/architecture.md), [security boundaries](../standards/security.md), and [branch isolation](../standards/branching.md). CI validates compilation and static content, never integration health.

## Requirements, exclusions, and deliverables

- Add branch-scoped pull-request/push triggers plus manual dispatch, read-only permissions, and checkout/setup-node only.
- Run install, lint, typecheck, existing Webpack build, and tests with Next telemetry disabled.
- Cover six records/cards, 06/03/03 counts, both status labels and hidden dots, original historical text/disclosure, and skip-link/main semantics.
- Preserve all `app/` files, framework/runtime versions, existing compiler configuration and other documentation.

## Acceptance criteria

- [x] CI and offline regression tests implemented within scope.
- [x] Existing content/source preserved and mutation failure demonstrated in a scratch copy.
- [x] Clean install, lint, typecheck, build, tests and audits recorded with real exit codes.
- [x] Diff reviewed; risks and external CI observation recorded.
- [ ] Named branch published and CI execution observed (push denied).

## Ownership and coordination

| Role / actual agent | Owned files | Bounded task | Handoff / dependency |
| --- | --- | --- | --- |
| Coordinator / Devin | This task record | Scope and evidence | Owner-approved scope |
| Implementer / Devin | Workflow, tests, package files | CI and offline tests | Existing application exports |
| Reviewer / Devin | Read-only | Diff/scope self-review | No independent review claimed |
| Validator / Devin | Ignored artifacts and scratch copy | Commands/mutation | Sequential build/type generation |

All roles are sequential in one agent; no delegation or browser-driven validation.

## Implementation and decisions

- Node 24 LTS satisfies `package.json`'s `>=20.9.0`; CI uses major 24 and checkout/setup-node major v4 tags. No caching/artifact uploads, credentials persisted, custom tokens, secrets, or deployment steps.
- GitHub `pull_request.branches` filters the target branch; only PRs targeting the named branch qualify, not main. Push is restricted to the named branch; the job guard also restricts manual execution to that ref.
- Use built-in `node:test`/strict assertions and existing React server rendering. Add only `tsx@4.20.5` as a devDependency to load existing TS/TSX without custom loaders or test configuration. Narrow HTML assertions check semantic tags/attributes and text, not styling snapshots; no DOM/browser test runtime is needed for static components.
- New locked dev-only transitives: `esbuild@0.25.12` with platform binaries at the same version, optional macOS `fsevents@2.3.3`. `get-tsconfig@4.14.3` and `resolve-pkg-maps@1.0.0` were already locked. npm normalized existing optional-package metadata (including libc fields); comparison confirmed no existing locked version changed. No runtime dependency, TypeScript/ESLint config or application changes.
- Initial test run (exit 1) accidentally matched numbered workflow steps as summary metrics. Corrected the test to select summary labels; all eight tests then passed.

## Validation evidence

| Command / check | Result and exit code | Evidence / limitation |
| --- | --- | --- |
| `node --version`, `npm --version` | PASS, 0 each | Ubuntu; Node v24.19.0, npm 10.8.3; existing nvm runtime activated. All npm validation used `NEXT_TELEMETRY_DISABLED=1`. |
| `npm install --save-dev --save-exact tsx@4.20.5` | PASS, 0 | Generated lockfile; five high audit findings; inherited ESLint deprecation warning. |
| `npm ci` | PASS, 0 | Clean reproducible installation from updated lockfile. |
| `npm run lint` | PASS, 0 | Zero warnings; rerun after final test correction. |
| `npm run typecheck` | PASS, 0 | Existing Next type generation and strict tsc; rerun after correction. |
| `npm run build` | PASS, 0 | Existing `next build --webpack`; static `/` and `/_not-found` generated. |
| `npm test` | PASS, 0 (final) | 8/8 offline tests; initial test-authoring failure described above. |
| Scratch-copy `npm test`: original / mutated / restored | PASS, 0 / expected FAIL, 1 / PASS, 0 | Only scratch `app/integrations.ts`: `Historical record` → `Mutation only`; historical badge assertion failed (7 pass, 1 fail), restored (8 pass). Local, uncommitted check; tracked application never edited. |
| `npm audit` | WARN, 1 | Five inherited high development findings; GHSA-vfj7-8cjw-p6xm. No fixes or suppression. |
| `npm audit --omit=dev` | PASS, 0 | Zero production findings at this check, not a future security guarantee. |
| `git diff --check` | PASS, 0 | No whitespace errors. |
| `git diff --exit-code 64006e86c62726326439e0a095f6b2e386822c7e -- app next.config.ts tsconfig.json eslint.config.mjs AGENTS.md .cursor` | PASS, 0 | Excluded source/config/guidance unchanged. |
| Python YAML/lock inspection | PASS, 0 | Filters/actions/permissions/ordered commands valid; existing versions unchanged and all new packages dev-only. Not GitHub execution. |
| `git push origin HEAD:refs/heads/devin/phase-1-3b-ci-regression-tests` | BLOCKED, 128 | Git proxy returned HTTP 403. No remote update succeeded. |
| Actions API GET with named-branch filter | 0; no runs observed | `total_count: 0`; both before and after the failed push. |
| `git ls-remote --heads origin main test/cursor-agent-validation devin/phase-1-3b-ci-regression-tests` | PASS, 0 | main/reference SHA unchanged from clone; named remote branch absent. |

## Risks, blockers, and handoff

- New findings: no additional audit findings from the test toolchain. Inherited high findings: `eslint-config-next@16.4.0` → `@next/eslint-plugin-next@16.4.0` → `fast-glob@3.3.1` → `micromatch@4.0.8` → `braces@3.0.3` (GHSA-vfj7-8cjw-p6xm). npm's suggested breaking downgrade was not run. Install also warned that inherited `eslint@9.39.5` is unsupported.
- Publication blocker: GitHub integration is installed, but this repository is absent from its accessible-repository list and the Git proxy denied the push. Owner must grant repository write access; no settings or credential changes were made by Devin.
- Pending external verification: no GitHub Actions run observed, and CI is not claimed green. No PR opened, merge or deployment performed; only the named branch was attempted, and nothing was successfully pushed.
- Limitations: static HTML checks do not prove CSS visibility, browser focus behavior, live integrations or deployment status. No independent reviewer ran.
- Approval still required: independent owner/reviewer acceptance; PR/merge/deployment remain unauthorized.
- Suggested next action: grant repository access and publish only the named branch, then inspect its CI run. No further phase is part of this task.
- Changed files (name-status): A `.github/workflows/ci-regression.yml`; M `package.json`; M `package-lock.json`; A `tests/dashboard.test.tsx`; A `docs/tasks/phase-1-3b-ci-regression-tests.md`. Only allowed files; no `app/` changes. Final committed range confirmation is included in the delivery report.
