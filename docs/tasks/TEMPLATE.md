# Task: <short title>

## Identity and status

- Phase / task ID:
- Status: planned | in progress | locally validated | accepted | blocked
- Owner / execution tool:
- Date:
- Branch:
- Baseline ref and commit:
- Initial working-tree state and changes to preserve:
- Instructions read: `AGENTS.md`, applicable Cursor rules and standards

## Objective and authorized scope

Describe the requested outcome, allowed files/actions, and explicit exclusions. Record commit/push/deployment authorization separately; default to no publication approval.

## Task-level authority assignment

**Required by [decision 0003](../decisions/0003-multi-agent-operating-model.md) (accepted 2026-10-08) for any Level 2 or 2+ assignment. No Level 2 or 2+ authority has been activated**, so until the owner records activation and the prerequisites in [agent-authority.md](../standards/agent-authority.md) are verified, write "None: per-action approval applies" and keep the default of no publication approval. A delegate inherits these restrictions and may not expand them.

- Task ID and objective:
- Repository and approved base commit SHA (full 40 characters):
- Assigned agent, authority level, and permitted delegation (agents, tools, depth):
- Assigned branch (`<agent>/<task-id>-<slug>`) and owned files or service boundaries (with exclusions):
- Acceptance criteria: (see below)
- Allowed dependency and testing operations:
- Task tier (1 / 2 / 3), risk class (R1 / R2 / R3), and required review depth:
- Model and reasoning effort selected (verified available in that tool), or "not exposed":
- Resource and cost limits (pilot limits, which apply only to approved pilots: 3 attempts each with a new hypothesis, 2 remediation rounds, 4-hour window, $15 USD ceiling that is not considered enforced unless provider metering and enforcement are verified; if not verified write "cost not enforced" and keep execution attended and stoppable):
- Attended or unattended (unattended = no authorized person actively able to observe and stop the task; it needs the verified controls and the owner's pilot approval, and none exist yet):
- Restricted operations (default: the list in the authority policy):
- Completion and authority-expiry conditions; who may revoke:
- Enforcement prerequisites verified for this task (E-ids with evidence), or "not verified":

## Business context and architecture constraints

Explain the business need and link applicable handoff sections, standards, and approved decisions. Distinguish proposals from approved implementation requirements.

## Requirements, exclusions, and deliverables

List functional/technical requirements, files to create or modify, and behavior/files that must remain unchanged. Identify any missing information that blocks completion.

## Acceptance criteria

- [ ] Concrete, observable outcome
- [ ] Existing behavior/content preserved
- [ ] Required validations completed with evidence
- [ ] Remaining risks and manual acceptance steps recorded

## Ownership and coordination

| Role / actual agent | Owned files | Bounded task | Handoff / dependency |
| --- | --- | --- | --- |
| Coordinator | | | |
| Implementer | | | |
| Reviewer | Read-only | | |
| Validator | Generated artifacts only | | |

State whether roles are sequential in one agent or delegated. For delegation, record authorization and non-overlapping ownership. Never claim an independent reviewer when the implementer performed the review.

## Implementation and decisions

List actual changes and explain meaningful tradeoffs. Keep planned work visibly separate from completed work.

## Validation evidence

| Command / check | Result and exit code | Evidence / limitation |
| --- | --- | --- |
| `npm run build` | Not run | |
| `npm run lint` | Not run | |
| `npm run typecheck` | Not run | |
| `git diff --check` | Not run | |
| Task-specific acceptance checks | Not run | |

Record the date and environment where relevant. Mark skipped/unavailable checks explicitly; do not convert them to PASS. Reference sanitized evidence only.

## Risks, blockers, and handoff

- New findings and severity/file location:
- Inherited risks:
- Pending manual/tool-specific verification:
- Approval still required:
- Suggested next action:
- Changed files:

## Provenance, architecture observations, and review status

Accepted workflow ([decision 0002](../decisions/0002-continuous-architecture-review.md); blocks defined in the [architecture review standard](../standards/architecture-review.md)). Use full SHAs and cite `path@SHA#section`. Do not cite session attachments as evidence.

- Provenance: repository, branch, base SHA, implementation SHA, tree SHA, working-tree state, publication state and verified remote SHA, artifact manifest SHA-256 if used:
- Architecture observations: AIR ids proposed or referenced (duplicate check performed) or "None observed"; dependency-map changes; unresolved decisions raised; capability status (proposed vs implemented-and-reviewed):
- Delegation evidence (actual tool calls or session IDs; "not started" where none):
- Independent Codex review of the exact SHA: not started | in progress | completed (record link). Remediation SHAs and their reviews:
- Architecture cross-review (if the risk class requires it; FAIL or ESCALATE blocks acceptance or protected-branch merge until owner disposition): not required | PENDING | verdict, packet SHA-256, relay source:
- Approvals still required (owner):
