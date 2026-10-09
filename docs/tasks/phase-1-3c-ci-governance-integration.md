# Task: Phase 1.3C governance baseline and CI integration

## Identity and status

- Phase / task ID: 1.3C-B
- Status (current, 2026-10-09 Gate 4A preparation; this correction is **not committed**): Gates 1–4 are complete. Gate 5 protected-branch merge is **not authorized**.
- Historical status preserved from the text Codex reviewed in `d6ce121` (superseded; not current): Gate 1 **complete** at `7a935860f93e18169343fad14329475cb7f94da4`. The sentence "Gate 2 workflow-trigger change and this correction are prepared in the working tree and **not committed**" was true only before that commit. Gate 2 was later committed as `d6ce121`, published, and exercised by draft PR #3.
- Pre-commit status (preserved; superseded): in progress (Stage A prepared; **integration merge commit not created**; Gate 1 pending)
- Owner / execution tool: Dieudonne / Cursor Lead
- Date: 2026-10-09
- Branch: `cursor/phase-1-3c-ci-integration` @ `d6ce121556929b472df09a10fef1291ee91c4e29`, published (Gate 3). Historical note preserved: before Gate 3 this line said the branch was local only and not pushed.
- Baseline ref and commit: governance `8617f3074c20d4376657a7cd0c2bba3e138fe49d`; CI `fbe2eb563863e185946e70603255cbbd94ae0c17`; merge-base `64006e86c62726326439e0a095f6b2e386822c7e`
- Initial working-tree state (pre-commit record, preserved): active sandbox left on `test/cursor-agent-validation` @ `81e20a1c55b15a9533d271075c44893a5e5293e0` (clean). Isolated worktree held an uncommitted `--no-ff` merge. That merge was later committed as `7a93586`.
- Instructions read: `AGENTS.md`, ADR 0002, ADR 0003, branching, architecture-review, artifact-handoff, agent-authority, security, architecture, Phase 1.3B closure record

## Objective and authorized scope

Prepare Option A: a non-fast-forward merge of the validated Phase 1.3B CI history into a branch created from the accepted governance baseline, preserving both parents. Historical preparation record (preserved, superseded): this file was not yet part of a merge commit, and workflow-trigger refinement had not started. As written inside `d6ce121`, a later sentence said Gate 2 trigger preparation was still uncommitted in the working tree. That sentence is not current. Gate 1 is `7a93586`, Gate 2 is `d6ce121`, Gate 3 published that commit, and Gate 4 opened draft PR #3. Gate 5 is not approved.

## Task-level authority assignment

- None: per-action approval applies. Level 2/2+ is not activated.
- Task ID and objective: 1.3C-B — integrate reviewed CI history without rewriting either history.
- Repository and approved base commit SHA (full 40 characters): MTGConsulting/mtg-frontend-sandbox @ `8617f3074c20d4376657a7cd0c2bba3e138fe49d`
- Assigned agent, authority level, and permitted delegation: Cursor Lead, Level 1 attended; no delegation; no Devin session.
- Assigned branch: `cursor/phase-1-3c-ci-integration`. Owned for a later authorized commit: the seven CI-side files brought by the merge, then (Gate 2) `.github/workflows/ci-regression.yml` triggers only. This task record is separate and unstaged.
- Acceptance criteria: see below. Gate 1 is not complete until the owner approves the merge commit.
- Allowed dependency and testing operations: isolated `npm ci`, lint, typecheck, build, test, audit, `git diff --check`. No `npm audit fix`, no new dependencies.
- Task tier 2, risk class R2. Codex on each later commit SHA; ChatGPT R2 before protected-branch merge.
- Model and reasoning effort: not exposed.
- Cost not enforced. Attended.
- Restricted operations: no push, PR, protected merge, ruleset or Vercel change, Production deploy, history rewrite, application edits, AIR-0006 closure.
- Completion and authority-expiry: owner revokes; each gate expires when used and does not authorize the next.
- Enforcement prerequisites: not verified (E2 still absent on the governance baseline until a later workflow change and a successful hosted run).

## Business context and architecture constraints

The static sandbox is not the production SuperApp. This integration adds already-reviewed CI and offline dashboard tests to the governance history. It does not implement GoIdentity, MerryGO, financial, or cross-domain services. Proposals in architecture documents stay proposals.

## Requirements, exclusions, and deliverables

Requirements: preserve both parent histories; do not overwrite accepted governance documents; leave `app/` unchanged; introduce only the seven CI-side files in the merge; keep five inherited high dev advisories OPEN—TRACKED.

Exclusions until later gates: workflow trigger edits, concurrency, commit, push, draft PR, protected merge.

## Acceptance criteria

- [x] Uncommitted merge of `fbe2eb5` into `8617f30` has zero textual conflicts.
- [x] Staged manifest is exactly the seven CI-side files.
- [x] `app/` and accepted governance paths are unchanged versus `8617f30`.
- [x] Isolated validation recorded below (not an independent review of a commit).
- [ ] Owner approves Gate 1 merge commit (not done). Historical checklist item, preserved. Gate 1 was later completed at `7a93586`.
- [ ] Stage B workflow refinement (not started). Historical checklist item, preserved. Gate 2 was later completed at `d6ce121`.
- [ ] AIR-0006 remains open until CI is validated on the governance baseline. Still true. Hosted CI on draft PR #3 does not close it.

## Ownership and coordination

| Role / actual agent | Owned files | Bounded task | Handoff / dependency |
| --- | --- | --- | --- |
| Coordinator | This task record | Stage A preparation | Cursor Lead, sequential |
| Implementer | Seven CI files via merge index only | Uncommitted merge | Same agent |
| Reviewer | Read-only | Not started for a commit SHA | Codex after Gate 1 commit |
| Validator | Generated `node_modules` / `.next` in the worktree | Commands below | Same agent |

Roles ran sequentially in one agent. No independent reviewer has reviewed a commit, because no merge commit exists.

## Implementation and decisions

Completed in the isolated worktree, not committed:

- `git merge --no-commit --no-ff fbe2eb563863e185946e70603255cbbd94ae0c17` onto `8617f3074c20d4376657a7cd0c2bba3e138fe49d`.
- Index tree (not a commit): `037355a539e56372aee3cf9772d968342356a1e5`.
- `package.json` change versus governance is only the `test` script and exact devDependency `tsx@4.20.5`. Next.js remains `16.4.0`. Webpack build script unchanged.

Semantic conflict Git does not flag: `.github/workflows/ci-regression.yml` still triggers only on `devin/phase-1-3b-ci-regression-tests`. Merging it as-is will not run CI for protected-baseline pull requests. Stage B addresses that after Gate 1. Concurrency was not added.

Planned, not done: merge commit; workflow-trigger commit; publication; protected merge.

## Validation evidence

Isolated worktree, 2026-10-09. Node v24.21.0, npm 11.19.0, `NEXT_TELEMETRY_DISABLED=1`. These results describe the **uncommitted** merge tree, not a reviewed SHA.

| Command / check | Result and exit code | Evidence / limitation |
| --- | --- | --- |
| `git diff --cached --check` | 0 | No whitespace errors |
| `npm ci` | 0 | 371 packages; reported 5 high severity |
| `npm run lint` | 0 | `eslint . --max-warnings=0` |
| `npm run typecheck` | 0 | `next typegen && tsc --noEmit` |
| `npm run build` | 0 | `next build --webpack`; static `/` |
| `npm test` | 0 | 9 pass, 0 fail |
| `npm audit` | 1 | 5 high, 0 critical; inherited dev chain |
| `npm audit --omit=dev` | 0 | 0 findings |
| Browser keyboard/focus/zoom | Not run | Accepted limitation from Phase 1.3B; not marked PASS |

`braces` via [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), through `eslint-config-next@16.4.0` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch`. No new advisory beyond that inherited set. No `npm audit fix`.

## Risks, blockers, and handoff

- New findings: none in application or audit beyond the inherited five highs.
- Inherited risks: GHSA-vfj7-8cjw-p6xm OPEN—TRACKED; browser verification NOT VERIFIED; workflow triggers still Devin-branch-only until Stage B.
- Pending: Codex review cannot start until Gate 1 creates a SHA. ChatGPT R2 is before Gate 5, not this gate.
- Pre-commit handoff (preserved): approval then required was the Gate 1 merge commit. The suggested next action was owner approval of that commit. The task record was untracked at that time. Those statements describe the index before `7a93586`, not the current branch tip.

## Provenance, architecture observations, and review status

- Pre-commit provenance (preserved): MTGConsulting/mtg-frontend-sandbox; branch `cursor/phase-1-3c-ci-integration` local; HEAD was still `8617f3074c20d4376657a7cd0c2bba3e138fe49d`; MERGE_HEAD `fbe2eb563863e185946e70603255cbbd94ae0c17`; proposed first parent governance, second parent CI; index tree before the task record was staged `037355a539e56372aee3cf9772d968342356a1e5`; not published. That HEAD value is the first parent of the later merge commit, not the current tip.
- Proposed merge commit message:

```
merge: integrate Phase 1.3B CI history into the governance baseline

Preserve both parent histories so the reviewed CI commits remain reachable.
Workflow trigger redesign stays a separate commit.
```

- Staged manifest versus `8617f30`:
  - A `.github/workflows/ci-regression.yml`
  - A `docs/tasks/phase-1-3b-ci-annotation-remediation.md`
  - A `docs/tasks/phase-1-3b-ci-regression-tests.md`
  - A `docs/tasks/phase-1-3b-r-bounded-remediation.md`
  - M `package-lock.json`
  - M `package.json`
  - A `tests/dashboard.test.tsx`
- Architecture observations: AIR-0006 remains open (CI not yet on the governance baseline). No new AIR. No capability beyond the static dashboard plus offline tests. Duplicate check: AIR-0006 already covers missing CI on the governance line.
- Delegation evidence: not started.
- Pre-commit review status (preserved): independent Codex review had not started because no commit SHA existed yet. Architecture cross-review remained PENDING until before protected-branch integration. Approvals then still required were Gate 1 and, separately, Gates 2–5.

## Post-merge update (2026-10-09, historical text inside `d6ce121`)

This section is **not** the current state. It is the narrative committed in `d6ce121` before Gate 3 publication and Gate 4 hosted CI. The pre-commit sentences above it were accurate only before the merge commit. The Gate 4A section below is the current status.

- Gate 1 **completed**. Merge commit: `7a935860f93e18169343fad14329475cb7f94da4`. Tree: `40e7c7616c011bfe564c65c5a45a2a037d9c371f`.
- Verified parents, in order: `8617f3074c20d4376657a7cd0c2bba3e138fe49d` (governance) and `fbe2eb563863e185946e70603255cbbd94ae0c17` (validated CI). Neither parent was rewritten.
- Diff versus the first parent at that commit: the seven CI-side files plus this task record.
- Independent Codex review of `7a93586` (session `01a11f73-cff7-7a42-a392-49fc758542a4`): **WARN**. Structural checks passed. The WARN was stale pre-commit wording in this file (then at lines 6, 16, 102, and 106) that still described an uncommitted merge. Historical note inside `d6ce121`: "This correction is not yet committed, so Codex has not reviewed it." That note described the Gate 2 working tree before commit `d6ce121`. Codex later reviewed `d6ce121` and returned WARN again because Gate 2 was still described as uncommitted. This Gate 4A edit labels that wording historical. It is not itself committed, so Codex has not reviewed this edit.
- Gate 2 **preparation** (historical, as written in `d6ce121`; the working tree is no longer uncommitted): `.github/workflows/ci-regression.yml` trigger and job `if` only. Same-repository pull requests targeting `main`, `test/cursor-agent-validation`, `test/v0-integration`, and `v0/integration-dashboard`; push and `workflow_dispatch` only on those four refs. No concurrency. Pins, Node 24, `ubuntu-24.04`, `contents: read`, `persist-credentials: false`, and non-deploying steps unchanged. The sentence that this was "not a hosted-trigger proof" was true at commit time. Hosted proof came later on draft PR #3; see the Gate 4A section.
- AIR-0006 remains **open**. Level 2/2+ remains inactive. Five inherited high dev advisories remain OPEN—TRACKED. These three statements remain current.
- Historical authorization note inside `d6ce121` (superseded for Gates 2–4): "Not authorized by this preparation: Gate 2 commit, push, pull request, protected-branch merge, ruleset or Vercel changes." Gates 2, 3, and 4 were later authorized and completed. Gate 5 and ruleset or Vercel changes remain unauthorized.
- Historical approval note inside `d6ce121` (superseded for Gates 2–4): "Approvals still required: Gate 2 commit, then separately Gates 3–5. ChatGPT R2 remains PENDING before Gate 5." Gate 2, publication, and the draft PR are done. ChatGPT R2 was later owner-relayed as WARN. Gate 5 is still required and is not approved.

## Gate 4A current status (2026-10-09)

This section is the current status. It is uncommitted. It does not approve Gate 5.

| Gate | State |
| --- | --- |
| Historical preparation | Preserved above. The uncommitted merge and the "Gate 2 not committed" sentences are historical. |
| Gate 1 merge | **Complete.** `7a935860f93e18169343fad14329475cb7f94da4`. Parents `8617f3074c20d4376657a7cd0c2bba3e138fe49d` and `fbe2eb563863e185946e70603255cbbd94ae0c17`. Tree at that commit `40e7c7616c011bfe564c65c5a45a2a037d9c371f`. |
| Gate 2 workflow commit | **Complete.** `d6ce121556929b472df09a10fef1291ee91c4e29`. Tree `afb7b3edfb00ff8f7ff1ede6744fe1c1d370af44`. Parent `7a93586`. |
| Gate 3 publication | **Complete.** `cursor/phase-1-3c-ci-integration` points at `d6ce121`. |
| Gate 4 draft PR and hosted CI | **Complete.** Draft PR [https://github.com/MTGConsulting/mtg-frontend-sandbox/pull/3](https://github.com/MTGConsulting/mtg-frontend-sandbox/pull/3). Base `test/cursor-agent-validation` @ `8617f30`. Not merged. |
| Gate 5 protected-branch merge | **Not authorized.** |

### Hosted CI evidence

Workflow run [37897731007](https://github.com/MTGConsulting/mtg-frontend-sandbox/actions/runs/37897731007):

- Event: `pull_request`.
- Head commit: `d6ce121556929b472df09a10fef1291ee91c4e29`.
- Runner: `ubuntu-24.04`.
- Job `checks` (`113712838462`): SUCCESS. The job executed; it was not skipped.
- Steps succeeded: checkout (pinned Actions v5), Node.js 24 setup, `npm ci`, lint, typecheck, Webpack build, test.
- Tests: 9 passed, 0 failed, 0 skipped.
- Check Run `113712838462` annotation count: 0.
- The workflow does not deploy or publish artifacts.

This run validates CI on the draft integration PR. It does **not** mean CI is integrated into `test/cursor-agent-validation`.

### Vercel evidence

- Preview deployment `6955107642` for commit `d6ce121556929b472df09a10fef1291ee91c4e29`: environment Preview, status success. URL: `https://mtg-frontend-sandbox-ajd2rwwkl-dntakwih-7387.vercel.app`.
- Production remains the reported deployment of `main` @ `71e890656b6c9a4874600e62379a4f50b2a23f35` (deployment `6931327192`, 2026-10-08).
- That is observed GitHub deployment history. Vercel project configuration was not independently inspected. No Production deployment is authorized.

### Residual risks (unchanged)

- Five inherited high-severity development advisories for [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): **OPEN—TRACKED**. Not resolved.
- AIR-0006: **OPEN** until CI is integrated into the accepted governance baseline.
- Browser keyboard, focus, and zoom: **NOT VERIFIED**. Accepted limitation from Phase 1.3B. Not marked PASS.
- Codex review of `d6ce121` (session `01a11f7b-64aa-7082-8200-1d391530de61`): **WARN**. The workflow structure passed. The WARN was stale "not committed" wording, which this section now labels historical. Codex has not reviewed this uncommitted Gate 4A edit.
- ChatGPT R2: **WARN**, owner-relayed, not independently retrieved. Packet SHA-256 `6a61e63521e043824c6e3e2af1ced599d5bbbfe3654f5dd844c092372fbeaa7a`.
- Level 2/2+ authority: **INACTIVE**.
- Protected-branch merge: **NOT AUTHORIZED**.
- No GoIdentity, MerryGO, financial, or other SuperApp service is implemented. The static dashboard plus offline regression tests and this CI workflow are the implemented scope.

Gate 4A documentation commit and push are not authorized by preparing this section.
