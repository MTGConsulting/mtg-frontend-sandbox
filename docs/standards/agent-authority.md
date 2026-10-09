# Agent engineering authority policy

**Status: ACCEPTED governance policy (Revision 3) under [decision 0003](../decisions/0003-multi-agent-operating-model.md), approved by the repository owner on 2026-10-08 (Central Time). Operational activation has NOT occurred.** Decision 0003 is the successor to [decision 0001](../decisions/0001-agent-engineering-authority.md), which is preserved as history and superseded only where 0003 conflicts. [Decision 0002](../decisions/0002-continuous-architecture-review.md) remains accepted.

**Acceptance does not activate Level 2 or 2+ permissions, authorize GitHub writes, grant any agent permission, or approve any new Devin session.** Until the owner records activation (see "Activation gate"), the [branching](branching.md) and [security](security.md) standards and [`AGENTS.md`](../../AGENTS.md) continue to govern commits and pushes: every commit and every push needs explicit owner approval, and each agent acts only within the scope the owner approved for that task. Approval evidence belongs in the decision records, not here.

This policy does not authorize any action by itself. It defines the maximum standing authority the owner has approved in principle; each task still records its own assignment, and no authority exists without the owner's activation of it.

Companion standards, accepted under the same decision: [agent orchestration, validation, and model routing](agent-orchestration.md) and [artifact handoff](artifact-handoff.md). The [architecture review standard](architecture-review.md) governs improvement records and carries the ChatGPT cross-review gate.

## What is in force, accepted but not activated, and not granted

| Item | In force today | Accepted policy, not yet activated | Not granted |
| --- | --- | --- | --- |
| Commit and push by any agent | Per-action owner approval (`AGENTS.md`, [branching](branching.md)) | Level 2 / 2+ agents commit and push only to their assigned branch, after activation | All standing commit/push authority; all GitHub write authority |
| Devin | Acts only under the explicit approvals recorded in each task (Phase 1.3B: its branch, no PR, no merge, no deploy). Its push returned HTTP 403 | Level 2 | Standing authority; a working push path; any new Devin session |
| Cursor Lead Agent | Level 1 plus Level 0 review; per-action approval | Level 2+ and bounded implementation, after phased activation | Standing authority; delegation without per-task authorization |
| Cursor subagents | Not defined; delegation needs authorization (`AGENTS.md`) | Level 2 inside delegated scope, beginning with the orchestration pilot | Any authority |
| Codex | Independent review of the exact SHA | Level 0 (unchanged) | None needed |
| ChatGPT | Advisory ([ADR 0002](../decisions/0002-continuous-architecture-review.md)) | Advisory cross-review with risk-based acceptance gates (R1 to R3). **A FAIL or ESCALATE blocks implementation acceptance or protected-branch merge until owner disposition**, not publication to an assigned branch | A verified delivery path (E13) |
| Review gates, task-record and handoff requirements, model-routing verification, artifact verification, separation of duties, restrictions list | **In force as accepted policy** | — | — |
| Architecture improvement process | **Accepted** (ADR 0002) | Unchanged | None |
| Owner | Final authority | Unchanged | — |

Where this table says "in force", the rule constrains agents now (for example, Codex reviews the exact SHA, Cursor cannot approve its own implementation, and a ChatGPT FAIL or ESCALATE blocks acceptance). Where it says "not yet activated", no agent may act on it.

## Authority levels

| Level | Meaning |
| --- | --- |
| 0 — Independent review | Inspect, analyze, validate, and report. No changes to tracked files, branches, commits, or any remote. May create and remove disposable detached worktrees or temporary copies outside the active checkout and run existing validation commands there, but may not install dependencies into the active checkout or alter uncommitted work. Findings are returned as output; the coordinating agent or a human persists them (see "Independent review"). |
| 1 — Task-scoped, per-action approval | Edit only explicitly assigned files. Every commit and every push needs explicit owner approval; approval for one does not imply the other. This is the rule in force for all agents today. |
| 2 — Controlled engineering autonomy | Bounded autonomy on one assigned task branch, inside a task-level authority record, as defined below. |
| 2+ — Orchestration extension | Level 2 **plus** the ability to decompose the assigned task, delegate bounded subtasks, and integrate results into the task branch. It adds delegation and integration only. It adds no restricted operation, no wider scope, and no extra branch, and it is not a Level 3. |
| Advisory | No repository authority. Recommendations only (ChatGPT). |

A level is a ceiling, not a grant. An agent acts at a level only for the task and scope recorded in an owner-approved assignment. **Model choice, tool availability, or a larger context never expands a level.**

## Role matrix (accepted policy, not activated)

The roles and levels below are accepted governance policy. They do **not** grant operational permission. Level 2 and 2+ remain inactive until the owner records activation.

| Role | Accepted authority (not activated) | Responsibilities |
| --- | --- | --- |
| Cursor Lead Agent | Level 2+ | Orchestration, task decomposition, delegation, integration, bounded implementation, register maintenance, review packets |
| Cursor subagents | Level 2, within delegated scope | Parallel implementation, testing, remediation |
| Devin agents | Level 2 | Autonomous diagnostics, troubleshooting, implementation, remediation |
| Codex | Level 0 | Independent read-only technical review of an exact SHA |
| ChatGPT | Advisory | Cross-service architecture oversight and strategic recommendations |
| Owner | Final authority | Architecture decisions, security exceptions, budgets, protected-branch merges, production releases; also business and financial decisions |

Separation of duties: the agent or instance that implemented, tested, or remediated a change cannot be its independent reviewer. A Cursor Lead that implemented (or delegated implementation of) a change does not perform its Level 0 review, and **Cursor cannot independently approve its own implementation**: acceptance is the owner's, and independent review is Codex's or a human's. Cursor may prepare the ChatGPT packet for work it did, but must include Codex's findings verbatim and the exact SHA so the reviewer can check them (see the [architecture review amendment](architecture-review.md)).

## Task-level authority record

No Level 2 or 2+ authority exists without a recorded assignment in `docs/tasks/` (the [task template](../tasks/TEMPLATE.md) has the section). It must define:

1. Task ID and objective.
2. Repository and the approved base commit SHA (full 40 characters).
3. Assigned agent and permitted delegation (who, how many levels, which tools).
4. Assigned branch (`<agent>/<task-id>-<slug>`) and owned files or service boundaries, with exclusions.
5. Acceptance criteria.
6. Allowed dependency and testing operations.
7. Resource and cost limits: task window, cost ceiling (or "not enforced" where unverifiable), attempt limit, and remediation rounds (see "Pilot limits").
8. Restricted operations that stay off (the default is the restricted list below).
9. Completion and authority-expiry conditions, and who may revoke.
10. Task tier and risk class (see [orchestration](agent-orchestration.md)), and the required review depth.
11. Whether the run is attended, and for any unattended run, the owner's pilot approval and the verified controls (see "Activation gate").

**Delegated agents inherit the parent task's restrictions and may not expand them.** A delegate's authority is the intersection of its own ceiling and the parent's grant. Delegates may not delegate further unless the assignment says so, may not touch files outside their owned set, and may not commit to the task branch directly; they push to their assigned sub-branch and the Lead integrates.

## Level 2 scope

Within the assignment, on the assigned branch only, a Level 2 agent may:

- Inspect relevant source, documentation, logs, and non-secret configuration metadata.
- Reproduce defects in approved disposable environments.
- Implement the approved functionality and tests, and fix regressions.
- Run the approved lint, typecheck, build, and test commands.
- Install **development** dependencies the task names or clearly requires, and report each (name, exact version, dev or runtime, reason). Runtime dependencies and major framework upgrades remain restricted unless the task approves them.
- Commit, and push to the assigned branch, **once publication is operational** (see "Publication controls"). No force-push or history rewrite; no other branch.
- Produce an engineering handoff with evidence and exact commit identifiers.
- Remediate independent-review findings inside the remediation window.

Dependency work follows the [security standard](security.md): no forced audit fixes, no downgrades to silence findings, no suppressed advisories, a reproducible lockfile, and inherited findings reported separately from new ones.

A Level 2 agent must report evidence, root causes, alternatives considered, validation results, risks, and unresolved issues. Diagnostic work does not widen access: no reading of secrets, credential files, or environment dumps, and no changes to secrets, IAM, production, shared architecture, or security enforcement.

## Pilot limits

Owner-selected limits that **apply only to the approved pilots**. Future limits require a separate owner decision. The limits are not claimed to be technically enforced; each becomes a control only when the evidence in the last column is recorded.

| Control | Pilot value | On breach | Enforcement evidence |
| --- | --- | --- | --- |
| Diagnostic or fix attempts on one failure | 3, each with a **new recorded hypothesis** (an attempt without one does not count as progress) | Stop and escalate with the diagnosis | None; relies on agent compliance, the Lead, and owner observation |
| Independent-review remediation rounds | 2 | Stop and escalate | None |
| Task window | 4 hours | Authority expires | None verified (no token expiry or scheduler) |
| Task cost ceiling | $15 USD, **only where provider metering and enforcement can be verified** | Stop and report spend | **Unverified for every provider (E11).** Without verified metering and enforcement the ceiling is **not considered technically enforced**: record "not enforced", do not describe it as a control, and keep execution **attended and stoppable** (see "Activation gate") |

Escalate immediately, regardless of counters, when a fix needs changes outside scope, an architecture or service-ownership conflict appears, a security, financial, or identity boundary is touched, a destructive operation is needed, or spending would materially exceed the ceiling.

## Expiry, remediation, and revocation

Authority belongs to one assignment and **expires on the earliest of**: owner closure; a recorded final independent review disposition of PASS or accepted WARN with no remaining remediation; the end of the task window; exhaustion of the cost ceiling (where enforced) or of the remediation rounds; or revocation.

- **Implementation submission.** When the agent submits the exact final SHA for review, its authority **narrows to remediation only**: it may fix findings from that review of that SHA, nothing else.
- **Remediation window.** Within the task window and the remediation rounds, the agent may remediate verified findings and push the new commit to the same branch. Every remediation commit is a new SHA and requires a **new independent review of that exact SHA**. An earlier review does not carry over.
- **Revocation.** The owner may revoke in writing at any time. The agent stops pushing immediately, reports the branch head SHA, and does not undo or conceal work already pushed.
- **Follow-on work.** New scope, a new task, or work after expiry needs a new or renewed assignment. An agent may not extend, renew, or widen its own authority.

## Restricted operations

Explicit human approval, recorded in the task, is required before any agent:

- Creates a pull request (draft needs separate approval initially; marking ready or other PR actions also need approval) or merges into any protected branch. Because remote protection is unverified, treat `main`, every baseline or integration branch in [branching](branching.md), and any branch the agent was not assigned as protected.
- Deploys, mutates production, creates releases or tags, or alters repository settings, branch protection, environments, secrets, credentials, or access controls.
- Pushes to, merges into, or modifies any branch other than its assigned branch; force-pushes; or overwrites protected history.
- Introduces a major framework upgrade, or a runtime dependency the task did not approve.
- Changes approved architecture or decisions, including cross-domain architecture, domain ownership, API or event contracts, shared identity (GoIdentity) or its trust, financial security or authorization, or regulated financial workflows.
- Performs destructive database or infrastructure operations, or materially increases spend.
- Expands scope into unrelated services, repositories, or tasks.
- Changes CI workflow files, unless the task explicitly authorizes it (below).
- Modifies its own governance, review, or enforcement controls (below).

Approval to review, implement, commit, or push is not approval for any of these. Passing checks, a completed task record, a successful push, or an available tool is not approval or acceptance.

## Publication controls

The accepted policy is that the Cursor Lead, Cursor subagents, and Devin may commit and push to their specifically assigned development branches **once the owner records activation**. Activation requires the prerequisites below to be verified, with evidence recorded in a task record, and the owner's approval of the pilot assignment. Until then the in-force rule applies: no commit or push without explicit owner approval, and nothing here authorizes a GitHub write.

A successful push is not acceptance, not review, and not authorization to merge or deploy. Do not describe this policy as enforced until the prerequisites are verified.

| ID | Prerequisite | Status |
| --- | --- | --- |
| E1 | Branch protection or rulesets on `main` and each baseline or integration branch (no direct push, no force-push, no deletion), including for agent identities | **Not verified** |
| E2 | Required CI checks for the task branch's target. At `64006e8` no CI or tests exist | **Not verified; absent** |
| E3 | Per-agent identity and token scope: least privilege, repository-limited, expiry, no admin or secrets scope | **Not verified.** Devin's push returned HTTP 403, so it is not operational |
| E4 | Workflow-file permission withheld from agent credentials unless a task authorizes it | **Not verified** |
| E5 | Review rules (CODEOWNERS or equivalent) covering governance paths: `AGENTS.md`, `.cursor/rules/`, `docs/standards/`, `docs/decisions/`, `.github/` | **Not verified; not configured** |
| E6 | Branch ownership and naming (`<agent>/<task-id>-<slug>`), with rulesets that confine each identity to its prefix | **Not verified** |
| E7 | Preview and production deployment isolation: agent branches cannot deploy production; previews have no production secrets | **Not verified** |
| E8 | Independent-review requirement enforced (required review or required check) before merge | **Not verified** |
| E9 | Distinct, attributable agent identities (author and committer trailers) so reviewer independence can be checked | **Not verified** |
| E10 | Delegation capability and integration available and tested for the specific tool (Cursor Task tool, Devin MCP), with recorded evidence | Devin MCP session search and creation worked earlier in this program (see [Phase 1.3A record](../tasks/phase-1-3a-baseline-reconciliation.md)); Cursor subagent delegation **not exercised for this program** |
| E11 | Cost and usage controls available for the cap | **Not verified** |
| E12 | Private artifact storage for the fallback tier | **Not provisioned** (owner decision) |
| E13 | A verified path for ChatGPT to receive review packets or read repository records | **Not verified** |

Verification is read-only and owner-led where credentials are involved. Agents do not print tokens, read credential files, or change GitHub or MCP permissions to satisfy a prerequisite.

## Activation gate

Accepting the policy and activating an agent are **separate steps**. Acceptance grants no permission and **grants no GitHub write authority**; none may be inferred from the decision.

**No unattended Level 2 or 2+ execution** until (a) the required enforcement controls below are verified with evidence in a task record and (b) the owner has approved the pilot assignment. **Unattended means execution without an authorized person actively able to observe and stop the task** (owner definition, decision 0003). Without enforcement, execution must remain attended and stoppable.

| Purpose | Required controls |
| --- | --- |
| Unattended commit and push to an assigned branch | E1, E3, E4, E5, E6, E7, E9, and E11 (without them the run stays attended and stoppable) |
| Merge and acceptance gating | E2, E8, and E13 for R2 and R3 |
| Orchestration pilot | E10 for each delegation path |
| Artifact fallback | E12 (only if the owner chooses to provision it; not provisioned) |

Until activation, attended work continues under the in-force per-action approval rule.

## CI and workflow files

Workflow files run with repository permissions, so changing them can widen an agent's effective authority.

- **CI workflow changes need explicit task authorization** naming triggers and permissions. Silence authorizes nothing.
- Authorized workflows use read-only repository permissions unless the owner approves more, contain no secrets, deployment, or publishing steps, and use only approved actions pinned to an approved version.
- A workflow may not alter an agent's own approval, review, or enforcement requirements.
- A workflow authored by an agent is independently reviewed before its results are relied on.

## Self-modification limits

Agents may not modify their own approval, review, or security enforcement requirements, directly or indirectly. That includes this policy and its companion standards, the decision records, `AGENTS.md`, Cursor rules, the branching and security standards, approval fields in task records governing the agent's task, required-check, review, branch-protection, environment, token, or permission configuration (including workflow `permissions`, CODEOWNERS, and rulesets), and review or approval records for the agent's own changes.

Only the owner or a person the owner designates may change these. An agent asked to draft such a change produces a proposal that stays inactive until the owner approves it. The drafting agent does not approve it.

## Independent review

Every implementation needs independent review of the **exact implementation SHA** by Codex (Level 0) or an authorized human, and, by risk class, architecture cross-review (see [orchestration](agent-orchestration.md)).

- The reviewer is not the author, tester, or remediator of the change, and is not the same agent instance.
- A ChatGPT **FAIL or ESCALATE blocks implementation acceptance or protected-branch merge** until owner disposition. Neither blocks publication to an assigned development branch.
- Review runs in an isolated detached worktree outside the active checkout when the implementer used a separate checkout. The active checkout and uncommitted work are preserved.
- Codex does not modify tracked files or grant approval. Cursor or an authorized human persists the review findings, verbatim, in `docs/reviews/`.
- Output records the SHA, tools and versions, findings by severity with file and line references, commands and results, limitations, and which evidence was **verified by the reviewer** versus **reported by an agent or historical**.
- A remediation commit needs a new review of the updated SHA.

## Enforcement

Written instructions are not security enforcement. The owner should configure GitHub rulesets, required checks, review rules, and environment permissions (E1 to E9). Report enforcement status honestly; remote protection, required checks, and agent token scope are **unverified** for this repository, so restrictions currently rely on agent compliance and owner review.

## Reporting

Each task reports repository and branch; starting and final full SHAs; files changed; dependencies added or updated with exact versions; validation commands, exit codes, and results; security findings (inherited separate from new); limitations; independent and architecture review status; the model and reasoning effort used when the tool exposes it; spend against the cap; outstanding approvals; and whether the authority has expired. No agent may represent unverified work as complete or approve its own changes.

## Accepted provisions, unverified enforcement, and remaining owner decisions

Resolved by the owner's acceptance of decision 0003 (2026-10-08): enforcement before acceptance (acceptance is separate from activation); remediation after review (2 rounds within the 4-hour pilot window, **applying only to approved pilots**, with future limits needing a separate decision); the cost ceiling where metering is unverifiable (not enforced; attended and stoppable); the definition of "unattended"; ESCALATE handled like FAIL; budgets within owner authority; Cursor cannot independently approve its own implementation. Authorship: this text was drafted by an agent; the owner recorded the acceptance of decision 0003.

### Accepted governance policy (not awaiting confirmation)

These rules bind agents now as policy. They do **not** activate Level 2 or 2+ permissions, authorize GitHub writes, or grant any operational authority.

- **Persisting Level 0 review records.** Codex returns output; Cursor or an authorized human commits it verbatim in `docs/reviews/`. Codex has no write path of its own.
- **Disposable worktrees at Level 0.** Permitted, without force, outside the active checkout, without altering uncommitted work.
- **Task completion and expiry.** Authority expires on the earliest of the conditions in "Expiry, remediation, and revocation".
- **Branch naming.** Assigned branches use `<agent>/<task-id>-<slug>`, recorded in the task assignment.
- **Dependency scope.** Development dependencies the task names or clearly requires, reported with name, exact version, and reason; runtime dependencies and major framework upgrades remain restricted unless the task approves them.

### Operational permissions not yet activated

Level 2 and 2+ commit, push, delegation, and autonomous execution remain inactive. Per-action owner approval for every commit and push still applies. See "Activation gate".

### Enforcement controls not yet verified

E1 to E13 remain unverified. Restrictions currently rely on agent compliance and owner review. See "Enforcement" and "Publication controls".

### Decisions genuinely awaiting owner approval

1. Whether to add a narrow Level 0 write exception for `docs/reviews/` (the persistence path above stands until then).
2. Whether a count or size limit should apply to development-dependency changes beyond the per-task scope already required.
3. Draft pull requests: what ends "initially".
4. Cursor Lead separation of duties: whether the mitigations in decision 0003 are sufficient, or an additional independent check is needed (AIR-0009).
5. Who verifies E1 to E13, and how often.
6. Post-pilot limit values. The 3-attempt, 2-round, 4-hour, and $15 figures apply only to approved pilots.
