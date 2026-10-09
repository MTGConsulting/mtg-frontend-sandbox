# Agent orchestration, validation, and model routing standard

**Status: ACCEPTED governance policy (2026-10-08), under [decision 0003](../decisions/0003-multi-agent-operating-model.md), approved by the repository owner. Operational activation has NOT occurred.** It describes how work is shared, validated, reviewed, and routed. It grants no permission: no Level 2 or 2+ authority is active, no GitHub write is authorized, and no new Devin session is approved. **No unattended Level 2 or 2+ execution occurs until the enforcement controls in the [agent authority policy](agent-authority.md) are verified and the owner approves the pilot assignment.** "Unattended" means execution without an authorized person actively able to observe and stop the task. Until activation, every task follows the in-force rules in [`AGENTS.md`](../../AGENTS.md), including per-action commit and push approval. Sections that describe delegation, the autonomous loop, and orchestration describe what an activated assignment would do; the review gates, the verification and recording requirements, and the model-routing procedure bind agents now.

This standard owns the delegation, validation-loop, review-pipeline, and model-routing rules. Authority, restrictions, and expiry live in the authority policy; artifact delivery lives in the [artifact handoff standard](artifact-handoff.md); improvement records live in the accepted [architecture review standard](architecture-review.md). Rules are stated once and linked.

## 1. Orchestration model

Cursor is the primary orchestrator. Within an approved assignment the Cursor Lead Agent (Level 2+) may:

- Decompose the task into bounded subtasks, each with a named owner, owned paths, and dependencies.
- Assign compatible subtasks to Cursor subagents (Level 2) and specialist subtasks to Devin (Level 2) through the supported MCP integration.
- Run concurrent work in isolated worktrees or separate checkouts.
- Track ownership, progress, dependencies, and deliverables in the task record.
- Integrate independently produced changes into the task branch.
- Reuse existing Devin sessions instead of creating duplicates.
- Escalate blocked work and architectural conflicts to the owner.

### 1.1 Delegation preconditions

Before delegating, the Lead verifies and records, for the specific agent and tool:

1. The assignment permits delegation to that agent (task-level authority, item 3).
2. The capability exists now: the tool is listed and reachable, the target model or agent type is available, and, for Devin, repository access for the intended branch is operational. A reachable MCP tool is not proof of repository write access.
3. The delegate's scope is a subset of the parent's: files, branch, dependency and test operations, restricted operations, cost ceiling, window.
4. No other active delegate owns an overlapping path. For Devin, search existing sessions for the task ID and reuse a matching session (`devin_session_search`, then message that session); create a new one only when none exists and the assignment allows it.

### 1.2 Evidence of delegation

Do not claim parallel execution or delegation unless supported by actual tool evidence. The task record names each delegate, the tool call or session ID, start time, and returned result. A subagent that was not launched, or a Devin session that was only drafted, is recorded as "not started". Self-review is never recorded as independent review.

### 1.3 Ownership, branches, and integration

- **Ownership map.** One owner per file or service boundary. Shared files (`package.json`, the lockfile, `docs/architecture/improvement-register.md`, anything generated) are owned by exactly one agent, or changes to them are serialized by the Lead. Builds and type generation that share `.next` run sequentially.
- **Branches.** The Lead works on `cursor/<task-id>-<slug>`. Each delegate works on its own sub-branch (`cursor/<task-id>-<subtask>` or `devin/<task-id>-<slug>`) and its own worktree outside the active checkout, for example `../mtg-worktrees/<task-id>/<subtask>`. Worktrees are created and removed without force; the active checkout and uncommitted work are never discarded.
- **Integration plan.** Before concurrent work starts, the Lead records how sub-branches merge (order, conflict owner, post-merge validation). The Lead integrates by merge or fast-forward into the task branch. No rebase or rewrite of pushed history. Overlapping ownership without a plan is not allowed.
- **Inheritance.** Delegates inherit the parent's restrictions and may not expand them. Delegates do not delegate further unless the assignment says so.
- **Escalation.** Escalate to the owner for out-of-scope changes, ownership conflicts between agents, an architecture or service-boundary conflict, any security, financial, or identity boundary, destructive operations, and material cost increases.

## 2. Autonomous development, validation, and remediation loop

Routine development and testing do not need repeated owner approval once the assignment is authorized, within the limits below.

1. **Implement** the approved change in scope.
2. **Validate** with the applicable suite (`npm run lint`, `typecheck`, `build`, and any tests the task adds). Record command, exit code, and environment. Do not run builds and type generation concurrently.
3. **Diagnose** failures: root cause with evidence, alternatives, and a recorded hypothesis.
4. **Fix** within scope.
5. **Repeat** validation until the acceptance criteria pass or an escalation threshold is reached.
6. **Commit** to the assigned branch when publication is operational and authorized.
7. **Submit the exact final SHA** (full 40 characters, with tree SHA) for independent review, as a published branch commit or a verified [artifact package](artifact-handoff.md).
8. **Remediate** findings inside the remediation window and rounds. Each remediation is a new SHA.
9. **Re-review** the new SHA.

Pilot limits (3 attempts each with a new hypothesis, 2 remediation rounds, 4-hour window, $15 ceiling only where metering and enforcement are verified) are in the authority policy ("Pilot limits"). They are not claimed to be technically enforced. On a breach the agent stops, records the diagnosis, and escalates; it does not continue "one more try".

## 3. Review pipeline

Review depth is set by the **highest** of the task tier (section 4) and these impact flags: shared service, integration, API or event contract, cross-domain data, GoIdentity, financial or MerryGO, security control, production. The Lead classifies the task in the assignment. Only the owner may lower a class; an agent may raise it.

| Class | Triggers | Independent technical review | Architecture review |
| --- | --- | --- | --- |
| R1 Routine | Tier 1 and no impact flag | Codex on the exact SHA | Concise architecture-impact screening written by the Lead in the handoff (observations block, domains touched or "none") |
| R2 Shared service or integration | Tier 2 with a shared-service, integration, or contract flag | Codex on the exact SHA | **Full ChatGPT architecture review before acceptance or merge**, after the Codex review |
| R3 Architecture-critical | Tier 3, or any GoIdentity, MerryGO financial, distributed-transaction, shared data ownership, or critical security flag | Codex on the exact SHA | ChatGPT review of the **design before implementation**, and again after Codex review. Owner approval is required before implementation of cross-domain, GoIdentity, financial, security, or production changes |

Rules:

- **Order.** Codex technical review first, then Cursor prepares the self-contained architecture packet (format in the [architecture review standard](architecture-review.md), amendment under decision 0003), then ChatGPT reviews. The owner relays packets and returns the verdict until a direct, verified path exists.
- **Codex.** Level 0, read-only, exact SHA, isolated detached worktree when needed, active checkout preserved. Verify Git object integrity and provenance first. Review correctness, regressions, security, dependencies, tests, and applicable standards. Report PASS, WARN, or FAIL with file and line references, and mark each claim **verified**, **agent-reported**, or **historical**. Codex does not edit tracked files and does not review its own work. The native Codex CLI is the preferred interface while the Cursor sidebar compatibility issue remains unresolved (finding recorded in the Phase 1.3 session; not a repository fact).
- **ChatGPT.** Returns PASS, WARN, FAIL, or ESCALATE per domain. It is advisory: a PASS authorizes nothing, a **FAIL or ESCALATE blocks implementation acceptance or protected-branch merge** until owner disposition, and neither blocks publication to an assigned development branch. Do not record that ChatGPT reviewed a packet unless the actual packet and context were made accessible; record the packet's SHA-256 and who relayed it.
- **Persistence.** Cursor or an authorized human commits Codex and ChatGPT outputs verbatim (not paraphrased) under `docs/reviews/` and `docs/reviews/architecture/`. Any remediation commit repeats Codex review of the new SHA, and ChatGPT review where the class requires it and the change touches reviewed concerns.
- **Acceptance.** Only the owner accepts a task. Cursor cannot independently approve its own implementation, or work it delegated. A green build, a pushed branch, or any review verdict is not acceptance.

## 4. Task tiers and model routing

| Tier | Work | Default routing | Review class floor |
| --- | --- | --- | --- |
| 1 Routine | Documentation, simple UI edits, isolated bug fixes, ordinary tests | An efficient verified model at default reasoning | R1 |
| 2 Specialist | Complex troubleshooting, CI/CD, integrations, performance, multi-file implementation | A strong verified coding and reasoning model at high reasoning | R1, or R2 with a shared-service or integration flag |
| 3 Architecture-critical | Cross-service design, GoIdentity trust, MerryGO financial boundaries, shared data ownership, distributed transactions, critical security | The strongest reasoning model **verified available in that tool**, at its highest verified setting; no specific model is assumed | R3 |

Procedure before assigning a model:

1. **Verify availability in the relevant tool**, not by assumption. Cursor's Task tool, Devin, and the Codex CLI each expose their own models. Do not assume Codex, Cursor, or Devin can use ChatGPT's model options. No model name is hard-coded in this standard, and none is assumed available until the tool lists it.
2. Confirm the exact model identifier and the reasoning settings that tool supports.
3. Weigh cost and latency against the task's cost ceiling.
4. **Record the model and reasoning effort** in the handoff when the tool shows them. If a tool does not expose them, write "not exposed".
5. **Escalate** to the next tier's routing after repeated unsuccessful attempts (the retry threshold) or increased risk. Escalation raises the model, not the permissions.
6. In Cursor, subagents inherit the Lead's model unless the assignment explicitly names another; the platform only permits non-default models on an explicit owner instruction. A model named in an owner-approved assignment counts as that instruction.

**Model selection never expands an agent's permissions.** A stronger model does not unlock restricted operations, and a cheaper model does not relax review depth.

## 5. Standing architecture guardrails for all agents

Agents check these during implementation and screening. They restate existing references and do not create new rules; see [domain boundaries](../architecture/domain-boundaries.md), [identity architecture](../architecture/identity-architecture.md), and [API standards](../architecture/api-standards.md).

- GoIdentity is the canonical name of the **proposed** shared identity platform; DTAK Identity is historical. Neither is implemented.
- No automatic identity merging from phone, name, or device alone; explicit account linking only.
- No direct cross-domain database writes; operation-specific authorization and auditable transitions.
- Explicit API and event contracts, with ownership, versioning, and idempotency.
- MerryGO keeps separate financial data and security controls; no automatic financial verification from courier or marketplace verification.
- No silent change to dispatch ownership, booking inventory, or custody rules; dispatch ownership is an open owner decision (AIR-0005).
- Distinguish approved architecture from proposals and unimplemented capabilities. An improvement idea goes into the register through the accepted process, never into a silent design change, and never implies authorization.

## 6. Unresolved questions

Resolved by the owner's acceptance of decision 0003: Cursor subagents begin at the orchestration pilot (Level 2); the pilot limits apply only to approved pilots and future limits need a separate decision; FAIL and ESCALATE gate acceptance and protected-branch merge, not branch publication; the definition of "unattended".

Still open:

1. Whether Devin sessions spawned by Cursor count against the owner's Devin budget separately from owner-created sessions, and how Devin spend is metered in USD (unverified; see authority policy E11).
2. Whether any class may skip the ChatGPT screening for documentation-only changes (proposed: no change to the routine rule).
