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
