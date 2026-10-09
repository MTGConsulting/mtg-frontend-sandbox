# 0001 — Agent engineering authority policy

- Identifier: 0001
- Status: **historical, never accepted; superseded in part by [decision 0003](0003-multi-agent-operating-model.md)** (accepted 2026-10-08) **only where 0003 conflicts**. Preserved as the record of the owner's earlier positions. None of its provisions was ever in force.
- Date drafted: 2026-10-08 (owner-selected positions incorporated the same day)
- Approval evidence / date: none. Only the project owner or an authorized decision-maker can mark this accepted, and an agent may not.

> **Successor note (2026-10-08).** The owner accepted [decision 0003](0003-multi-agent-operating-model.md) as the successor operating model to this record. This record is preserved below as the historical record of the owner's earlier positions. 0003 supersedes only the conflicting authority provisions: position 2 as to Cursor's implementation authority (Level 1 becomes Level 2+ for the Lead and Level 2 for subagents, **after phased activation, which has not occurred**) and the Devin-only framing of Level 2. Positions 1 and 3 to 11 carry forward, with the clarifications in the disposition table in 0003. The body below is unedited and describes a proposal that was never in force.

## Context

Phase 1.3B asks Devin to implement CI and tests on an isolated branch. The current repository rules (`AGENTS.md`, [branching](../standards/branching.md)) require explicit owner approval for each commit and push and for dependency installs. The owner proposed standing, bounded authority for Devin and then selected the positions below. The full policy text is [agent-authority.md](../standards/agent-authority.md); this record holds the decision, rationale, and approval status.

## Owner-selected positions (incorporated)

1. **Devin:** Level 2 controlled autonomy for bounded, explicitly assigned tasks.
2. **Cursor Agent:** Level 1 implementation authority and Level 0 review authority.
3. **Codex:** Level 0 independent review authority.
4. **Devin branch authority:** may create, commit, and push only to its assigned task branch.
5. **CI workflow changes:** require explicit task authorization.
6. **Dependency changes:** allowed only within approved scope and must be reported.
7. **Draft pull requests:** creation requires separate approval initially.
8. **Protected-branch merges and production deployments:** require human approval.
9. **Shared identity, financial security, and cross-domain architecture changes:** require explicit approval.
10. **Level 2 expiry:** authority expires upon task completion or revocation.
11. **Self-modification:** agents may not modify their own approval, review, or security enforcement requirements.

## Options considered

1. **Keep per-task, per-action approval (current).** Safest, highest friction.
2. **Adopt the owner's original proposal unchanged.** Left "protected branches", "assigned feature branch", workflow files, reviewer independence, other agents, and expiry undefined.
3. **Adopt the policy with the owner-selected positions above (drafted).** Standing authority only for Devin, only on an assigned task branch, expiring with the task.

## Proposed approach and rationale

Option 3. It keeps the speed benefit for bounded Devin work while keeping every release, merge, deployment, identity, financial, and architecture boundary under human approval, and it closes the gaps found against current rules: expiry, workflow-file escalation, self-modification, and reviewer independence.

## Consequences if accepted

- `AGENTS.md` and `docs/standards/branching.md` must be amended so per-action commit and push approval no longer applies to Level 2 tasks on the assigned branch. The amendment is drafted there as pending text, not in force.
- Each task record names repository, task branch, base SHA, scope, dependency and CI permissions, completion criteria, and who may revoke.
- Authority ends at completion or revocation. Remediation and follow-on work need a renewed or new assignment unless the owner decides otherwise (open question 3).
- Each implementation commit receives independent review of its exact SHA. Draft pull requests need separate approval per task.
- Agents, including the author of this draft, cannot approve or alter the policy, reviews, or enforcement settings that govern them.

## Security implications

- Standing push authority is only as safe as the credential and branch scoping behind it. Remote branch protection, required checks, and agent token scope are **unverified**; acceptance does not make them so, and the policy must not be described as enforced until they are.
- Workflow files run with repository permissions; they are restricted unless the task explicitly authorizes them, and may not be used to change an agent's own enforcement requirements.
- Dependency additions follow the [security standard](../standards/security.md); inherited advisories stay separate from new findings.

## Reversal / migration

Superseding this record returns agents to per-action approval. Revocation of an individual Level 2 assignment is immediate. Existing commits on assigned branches remain subject to independent review and are not retroactively authorized by acceptance.

## Unresolved questions (owner)

Nine questions are listed in the policy under "Unresolved questions for the owner". The ones that affect acceptance most:

1. Persisting Level 0 review records, given that Level 0 forbids changes to tracked files.
2. Whether disposable detached worktrees count as permitted Level 0 actions.
3. Whether review-driven remediation needs a fresh assignment each time.
4. Whether verifying remote protections and agent token scope is a condition of acceptance or an accepted gap.

## Approval status

Pending owner decision. Nothing in this record or the policy is effective. The Phase 1.3B Devin session (`bd74ac7ce07c46aa835c8346d3448dd7`) operates under its own explicit task approvals (branch `devin/phase-1-3b-ci-regression-tests`, no pull request, no merge, no deployment), not under this proposal.
