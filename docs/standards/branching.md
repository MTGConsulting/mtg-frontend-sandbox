# Branching and approval standard

## Baselines

- `main`: protected by this workflow; do not edit it or treat it as a scratch branch. Remote protection settings have not been verified.
- `test/v0-integration`: original Next.js integration scaffold baseline.
- `v0/integration-dashboard`: validated Phase 0 dashboard baseline, including accuracy/accessibility improvements at `2ed4f62`.
- `test/cursor-agent-validation`: Phase 1.1 guidance and Cursor Agent validation work, starting from the same tree as `2ed4f62`.

These are workflow roles, not evidence of deployment isolation. Local remote-tracking refs may be stale; report the exact ref/commit compared and whether a fetch was performed.

## Work sequence

1. Confirm branch, HEAD, working-tree changes, and relevant instructions before editing. Record the baseline in the task.
2. Work on the task branch. If it differs from the requested branch, inspect existing work first. Never switch in a way that discards or mixes unrelated changes; resolve unclear ownership before writing.
3. Preserve user edits and unrelated files. Do not reset, clean, force checkout, rebase, or rewrite history to simplify the task.
4. When branch creation is authorized, create it from the named baseline, not an assumed latest branch. Record intentional divergence.
5. Review the diff, validate, and update the task evidence. Keep generated artifacts and secrets out of version control.
6. Provide a reviewable result before requesting any necessary publication approval. Do not create commits or push without explicit user approval; approval for one does not imply the other. Merge, deployment, and production mutations require separate authorization.

No agent may approve another agent's publication action on the user's behalf. Do not infer permission from successful checks, a completed task record, or an available integration tool. Use [task records](../tasks/TEMPLATE.md) to preserve decisions and pending approvals across handoffs.

## Accepted amendment — not activated

The rules above remain authoritative **until the owner records activation**. The owner accepted [decision 0003](../decisions/0003-multi-agent-operating-model.md) on 2026-10-08 (successor to [decision 0001](../decisions/0001-agent-engineering-authority.md), superseding only its conflicting authority provisions). That acceptance **does not activate Level 2 or 2+ permissions, authorize GitHub writes, grant agent permissions, or approve new Devin sessions**, and it does not change work step 6: every commit and every push still needs explicit owner approval. Once the owner records activation, and the enforcement prerequisites in the [agent authority standard](agent-authority.md) are verified with evidence, that standard applies these changes for Level 2 and 2+ assignments only:

- Work step 6 no longer requires per-action approval for commits and pushes by **the Cursor Lead (Level 2+), Cursor subagents, or Devin (Level 2) to the single branch assigned in a recorded task assignment** (base SHA, owned files, window, and cost ceiling named). Subagents push to their own sub-branches and the Lead integrates. Codex stays at Level 0 (independent review) and ChatGPT advisory.
- Branch names follow `<agent>/<task-id>-<slug>`. Authority expires at the earliest of owner closure, a recorded final review disposition, the window end, cost-ceiling or remediation-round exhaustion, or revocation, and narrows to remediation-only once the final SHA is submitted for review.
- Pushes to any other branch, draft or other pull requests (draft PRs need separate approval initially), merges into protected branches, releases, tags, deployments, production mutations, CI workflow changes not explicitly authorized by the task, and shared identity, financial security, cross-domain, or production architecture changes still require separate explicit human approval.
- Agents still do not force-push, rewrite history, or switch branches in ways that discard work. Agents may not approve their own changes or modify their own approval, review, or security enforcement requirements. A successful push is not acceptance.
- Every implementation commit requires independent review of its exact SHA (isolated worktree when the implementer used a separate checkout); remediation commits need renewed review. A ChatGPT FAIL or ESCALATE blocks implementation acceptance or protected-branch merge until owner disposition, not publication to the assigned branch. Cursor cannot independently approve its own implementation.
- **No unattended** Level 2 or 2+ execution (execution without an authorized person actively able to observe and stop the task) until the controls are verified and the owner approves the pilot assignment. Pilot limits apply only to approved pilots.
