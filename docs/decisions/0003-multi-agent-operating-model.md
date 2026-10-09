# 0003 — Multi-agent engineering operating model

- Identifier: 0003
- Status: **accepted** as governance policy — by the repository owner, 2026-10-08 (Central Time), with five clarifications. **Acceptance does not activate any permission.** Level 2 and 2+ permissions, GitHub writes, agent permissions, and new Devin sessions are **not** granted or approved by this record.
- Date drafted: 2026-10-08 (owner decisions incorporated the same day)
- Approval evidence / date: the owner's written decision, supplied in the Cursor session on 2026-10-08 and transcribed verbatim under "Recorded owner approval" by Cursor Agent at the owner's direction. The transcription is a record of the owner's approval, not an agent approval. The owner's text governs wherever a draft wording differs.
- Relationship to other records:
  - **Successor to [decision 0001](0001-agent-engineering-authority.md).** 0001 is preserved as the historical record of the owner's earlier positions. 0003 supersedes **only the conflicting authority provisions** listed in the table below. 0001 was never accepted, so none of its provisions was ever in force.
  - **[Decision 0002](0002-continuous-architecture-review.md) stays accepted and unaltered.** The improvement register, weekly triage, handoff reporting, ChatGPT's advisory role, and the owner's approval gates continue.

## Context

The owner wants a collaborative, increasingly autonomous engineering environment: Cursor orchestrates and shares work with its subagents and Devin; Devin specializes in autonomous diagnosis, implementation, and remediation; Codex independently validates exact commits; ChatGPT reviews architectural alignment across the MTG CONSULTING ecosystem; GitHub provides version control, CI, and protected gates; and the owner keeps authority over architecture, security exceptions, protected-branch integration, and production releases. The aim is fewer repetitive approvals for routine engineering without letting agents introduce unapproved architecture.

Evidence from Phase 1.3B that shapes the proposal (AIR-0001, AIR-0003, AIR-0006 in the [improvement register](../architecture/improvement-register.md)): Devin's implementation was reported as an unpublished local commit after a push returned HTTP 403, its attachments were inaccessible, no independent review has occurred, and remote protection, required checks, and agent token scope are unverified. No CI or tests exist at the reference commit `64006e86c62726326439e0a095f6b2e386822c7e`.

## Owner-selected direction (accepted)

1. Adopt this record as the successor operating model to ADR 0001, preserving 0001's historical record and superseding only conflicting authority provisions.
2. Preserve ADR 0002 as accepted.
3. **Cursor Lead:** Level 2+ orchestration and bounded implementation, after phased activation. Level 2+ means Level 2 plus delegation and integration, nothing more.
4. **Cursor subagents:** Level 2, beginning with the orchestration pilot.
5. **Devin:** Level 2 autonomous diagnostics, implementation, and remediation.
6. **Codex:** Level 0 independent technical review.
7. **ChatGPT:** advisory architecture cross-review with risk-based acceptance gates.
8. **Owner:** final authority for architecture decisions, security exceptions, budgets, protected-branch merges, and production releases (see clarification 5).

### Pilot limits (apply only to the approved pilots)

| Limit | Value | Enforcement status |
| --- | --- | --- |
| Diagnostic or fix attempts on one failure | 3, each with a new recorded hypothesis | Not technically enforced; relies on the agent, the Lead, and owner observation |
| Independent-review remediation rounds | 2 | Not technically enforced |
| Task window | 4 hours | Not technically enforced; no token expiry or scheduler is verified |
| Task cost ceiling | $15 USD, **only where provider metering and enforcement can be verified** | **Unverified for every provider.** Without verified metering and enforcement the ceiling is not a technical control: execution must remain **attended and stoppable**, and the ceiling is recorded as "not enforced" |

These limits are not claimed to be technically enforced. They become controls only when the corresponding evidence is recorded (authority policy E11 for cost). **They apply only to the approved pilots; future limits require a separate owner decision.**

### Review gates

- **R1:** concise architecture-impact screening.
- **R2:** full ChatGPT architecture review **before acceptance or merge**.
- **R3:** ChatGPT design review **before implementation**, and again after Codex review.
- A ChatGPT **FAIL or ESCALATE blocks implementation acceptance or protected-branch merge** until owner disposition. Neither blocks publication to an assigned development branch.
- Codex reviews the **exact final implementation SHA**.
- **Cursor cannot independently approve its own implementation.** Cursor-authored work, including delegated work, is reviewed by Codex or a human, and acceptance is the owner's.

### Artifact delivery

GitHub assigned task branches are the preferred delivery mechanism. Private shared artifact storage remains a **fallback proposal**; nothing is provisioned. **This decision grants no GitHub write authority and none may be inferred from it.** Publication stays subject to the in-force per-action approval until the activation conditions below are met.

### Model routing

Tier 1 an efficient verified model; Tier 2 a strong coding and reasoning model; Tier 3 the strongest verified reasoning model available in the relevant tool. No specific model, including Astra, is hard-coded or assumed available. Model escalation never expands permissions.

### Activation

Policy acceptance is separate from operational activation. **No unattended Level 2 or 2+ execution** until the required enforcement controls are verified (authority policy, "Activation gate") **and** the owner has approved the pilot assignment. **Unattended means execution without an authorized person actively able to observe and stop the task.**

### Phase 1.3B

The existing Devin session (`devin-bd74ac7ce07c46aa835c8346d3448dd7`) and its reported commit (`4a6e7a1ad8a3bcd1325c454fd028c5f250c71477`, over verified base `64006e86c62726326439e0a095f6b2e386822c7e`) are preserved. The commit is **agent-reported and unpublished; it is not independently verified**. It is not recreated or reconstructed, and no new session is created. Phase 1.3B continues under its own explicit approvals, not under this record, and it is not a pilot unless the owner designates it. Recovery and publication are separate owner decisions.

## What this record supersedes in ADR 0001

| ADR 0001 position | Disposition under 0003 |
| --- | --- |
| 1 Devin Level 2 for bounded, assigned tasks | Carried forward unchanged |
| 2 Cursor Agent Level 1 implementation, Level 0 review | **Superseded as to implementation authority**: Cursor Lead becomes Level 2+ and subagents Level 2, after phased activation. Level 0 review is retained, subject to "the author cannot review" |
| 3 Codex Level 0 | Carried forward |
| 4 Devin pushes only to its assigned branch | Carried forward, and extended so every agent pushes only to its own assigned branch |
| 5 CI workflow changes need explicit task authorization | Carried forward |
| 6 Dependency changes within approved scope, reported | Carried forward |
| 7 Draft PRs need separate approval initially | Carried forward |
| 8 Protected merges and production deployments need human approval | Carried forward; the owner is the final authority for protected-branch integration and production releases |
| 9 Identity, financial, cross-domain changes need explicit approval | Carried forward; security and production architecture are added, matching accepted ADR 0002 |
| 10 Level 2 expires at completion or revocation | Carried forward; "completion" is clarified as the earliest of the listed expiry conditions, and authority narrows to remediation-only after the final SHA is submitted |
| 11 No self-modification of approval, review, or enforcement | Carried forward |

## Options considered

1. **Keep per-action approval for everyone.** Safest, highest friction; the current state.
2. **Devin-only Level 2 (decision 0001).** Leaves Cursor, which already coordinates, unable to share work or integrate without approvals.
3. **Adopt the consolidated structure, activated in phases behind verified enforcement (selected direction).**
4. **Adopt it and activate on acceptance.** Rejected: acceptance would grant permissions that no technical control currently bounds.

## Rationale

Standing authority is only as safe as the controls behind it. Making acceptance and activation separate steps, tying activation to recorded evidence, and keeping the owner as the only source of acceptance, merge, release, and architecture approval delivers the speed benefit without removing any gate.

## Consequences

- `AGENTS.md`, `docs/standards/branching.md`, `.cursor/rules/`, and the task template carry the rules. The Cursor rules would need an owner-approved update; they are unchanged.
- Each substantive assignment includes the task-level authority section in the template, including the pilot limits.
- Review gains the risk-based ChatGPT gate; Codex review of the exact SHA stays mandatory.
- Cursor concentrates roles (orchestrator, implementer, register maintainer, packet author). Mitigations: it never reviews or approves work it implemented or delegated, Codex findings are copied verbatim, every packet carries the exact SHA, and the owner decides acceptance (AIR-0009).

## Security implications

- **Credentials.** Push authority is only as safe as the token and ruleset behind it, and both are unverified. This record reads, prints, and changes no credential, permission, or MCP configuration.
- **Delegation** widens the number of actors, not authority: delegates inherit restrictions, use sub-branches and isolated worktrees, and the Lead integrates.
- **Workflow files and governance paths** can widen authority; they are restricted, and CODEOWNERS or equivalent review for them is unmet (E5).
- **Cost.** Autonomy needs a cap, but the cap is only a control where metering and enforcement are verified (E11).
- **ChatGPT packets** can carry business-sensitive content; the owner decides what is shared, and packets contain no credentials, personal data, customer or financial records, or partner terms.
- **Models.** A stronger model is not more trusted, and permissions are unaffected.

## Reversal / migration

Superseding this record returns agents to the in-force rules. An individual assignment can be revoked immediately in writing. Commits already pushed remain subject to independent review and are not retroactively authorized.

## Phased activation: prerequisites and outstanding evidence gaps

Acceptance of this record does not activate any phase. Each phase needs the owner's sign-off in a task record, and the prerequisite evidence recorded, before it begins. E-numbers are defined in the [authority policy](../standards/agent-authority.md). **All evidence below is currently outstanding.** The pilot limits apply only to the pilots approved in those sign-offs.

| Phase | What happens | Prerequisites | Outstanding evidence gap |
| --- | --- | --- | --- |
| 0 Decide | **Done 2026-10-08:** the owner accepted 0003 with clarifications and recorded the 0001 supersession. No permission is activated | None technical | None |
| 1 Verify | Owner-led read-only verification of the enforcement controls | Unattended runs: E1, E3, E4, E5, E6, E7, E9, E11. Merge and acceptance gates: E2, E8, E13. Fallback only: E12 | Nothing verified. No CI exists (E2). Devin push returned 403 (E3). No CODEOWNERS (E5). No metering evidence (E11). No verified ChatGPT path (E13) |
| 2 Devin pilot | One task, Level 2, one assigned branch, pilot limits, Codex review of the exact SHA | Phase 1 complete for unattended; pilot assignment approved by the owner | A working publish path; a CI check to run |
| 3 Cursor Lead pilot | One Tier 1 task, Level 2+, **no subagents** | Same as Phase 2 | Cursor's own git credential scope is unverified |
| 4 Orchestration pilot | Tier 2 task with **Cursor subagents (Level 2)** and a Devin session; ownership map and integration plan | E10 for both delegation paths | Cursor subagent delegation has not been exercised for this program |
| 5 Cross-review gate | R2 task through the ChatGPT packet path; R3 only after the owner approves the Tier 3 process | E13 | No ChatGPT review has occurred |
| 6 Review | Owner reviews incidents, spend, escalations, and relaxation requests (for example draft PRs) | Pilot records | — |

Attended work continues in the meantime under the in-force per-action approval rule; this record changes nothing about it.

## Owner clarifications on acceptance (2026-10-08)

1. The $15 pilot ceiling is not considered technically enforced unless provider metering and enforcement are verified. Without enforcement, execution must remain attended and stoppable.
2. ChatGPT ESCALATE and FAIL both block implementation acceptance or protected-branch merge until owner disposition.
3. Unattended means execution without an authorized person actively able to observe and stop the task.
4. Pilot limits apply only to the approved pilots. Future limits require a separate decision.
5. Owner authority explicitly includes architecture decisions, security exceptions, budgets, protected-branch merges, and production releases.

## Explicit non-grants

Acceptance does **not** activate Level 2 or 2+ permissions, authorize GitHub writes, grant any agent permission, or approve any new Devin session. In-force per-action approval for every commit and push continues until the owner records activation. Phase 1.3B stays under its own approvals.

## Questions resolved by the owner's approval

Authorization to accept and the 0001 supersession; cost ceiling handling where metering is unverifiable (attended and stoppable); ESCALATE handled like FAIL; the definition of unattended; pilot limits scoped to approved pilots; budgets within owner authority.

## Questions still open (owner)

1. Who verifies E1 to E13 and how often (proposed: the owner, recorded in a task record, repeated when permissions change).
2. Which Tier 3 model and setting to use once verified; nothing is assumed.
3. Whether to ever provision the artifact fallback storage, and its retention and key ownership.
4. The Phase 1.3B recovery route.
5. Whether the separation-of-duties mitigations stated in the Consequences are sufficient, or need an additional independent check (AIR-0009 stays open until the owner decides).
6. Authorization to commit and push these records (separate; not given).

## Recorded owner approval

The following is the owner's decision as supplied, transcribed verbatim.

> I approve ADR 0003 — Multi-Agent Engineering Operating Model, with the following clarifications:
>
> 1. The $15 pilot ceiling is not considered technically enforced unless provider metering and enforcement are verified. Without enforcement, execution must remain attended and stoppable.
> 2. ChatGPT ESCALATE and FAIL both block implementation acceptance or protected-branch merge until owner disposition.
> 3. Unattended means execution without an authorized person actively able to observe and stop the task.
> 4. Pilot limits apply only to the approved pilots. Future limits require a separate decision.
> 5. Owner authority explicitly includes architecture decisions, security exceptions, budgets, protected-branch merges and production releases.
>
> ADR 0003 may be recorded as accepted governance policy.
>
> This acceptance does not activate Level 2/2+ permissions, authorize GitHub writes, grant agent permissions, or approve new Devin sessions.
>
> Preserve ADR 0002 as accepted and ADR 0001 as historical, superseded only where ADR 0003 conflicts.
>
> Update the governance documents accordingly.
>
> Do not commit, push, merge or deploy until I separately authorize publication.
>
> Do not modify application code, dependencies, CI workflows, infrastructure or credentials.
>
> Return the exact files changed and remaining operational activation blockers.

Approved by: repository owner. Approval date: October 8, 2026 (Central Time). The earlier approval-ready draft text was replaced by this recorded text.

## Approval status

Accepted as governance policy on 2026-10-08. Operational activation is separate and has not occurred.
