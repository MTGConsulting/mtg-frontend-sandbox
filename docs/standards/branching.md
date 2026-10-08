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
