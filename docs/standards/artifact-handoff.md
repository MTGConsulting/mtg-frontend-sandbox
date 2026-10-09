# Artifact handoff and provenance standard

**Status: ACCEPTED governance policy (2026-10-08), under [decision 0003](../decisions/0003-multi-agent-operating-model.md), approved by the repository owner. Operational activation has NOT occurred.** GitHub assigned task branches are the preferred delivery mechanism; private shared artifact storage remains a **fallback proposal only**. No cloud storage is provisioned, and **no GitHub write authority is granted or may be inferred** from this document or the decision. No permission is granted by this document. The verification requirements (an implementation is handed off only after independent verification of the exact commit) bind agents now.

**Core rule:** an implementation is handed off only when the exact commit has been retrieved and its integrity verified by someone other than its producer. A transcript, a short SHA, an inaccessible attachment URL, a screenshot, or a reconstructed approximation is **not** proof of the original implementation and may never be reviewed in its place. Do not recreate an implementation from a transcript.

## Delivery tiers

| Tier | Channel | When |
| --- | --- | --- |
| 1 Preferred | The approved GitHub implementation branch containing the exact commit | Publication is operational (authority policy E1 to E9) and authorized for the task |
| 2 Fallback | Private shared artifact storage readable by authorized agents | Publication fails or is not permitted. The storage is **not provisioned**; provisioning, upload authorization, and retention are owner decisions |

Tier 2 is a transport for the same commit, not a different thing to review. If neither tier works, the status is **blocked**; stop and report. Do not review agent-reported evidence as if it were the commit.

## Standard package (Tier 2)

All files carry the task ID and implementation SHA in the name.

1. **Git bundle** of the exact commit and the history needed to verify it against the base (`git bundle create <name>.bundle <base-sha>..<impl-sha>` plus the ref, or the full branch when in doubt).
2. **Patch** generated from the commit (`git format-patch` or `git diff <base>..<impl>`), used only as a cross-check against the bundle.
3. **Manifest** (`manifest.json`):

```json
{
  "schema": 1,
  "task_id": "<task-id>",
  "repository": "<owner/repo>",
  "branch": "<assigned branch>",
  "base_sha": "<40 hex>",
  "implementation_sha": "<40 hex>",
  "tree_sha": "<40 hex>",
  "changed_paths": ["<path>", "..."],
  "producer": {"agent": "<name>", "tool": "<tool and version>", "session_id": "<provenance only>"},
  "model": "<identifier and reasoning effort, or not exposed>",
  "created_utc": "<ISO-8601>",
  "artifacts": {
    "bundle": {"file": "<name>", "sha256": "<64 hex>"},
    "patch": {"file": "<name>", "sha256": "<64 hex>"},
    "validation_report": {"file": "<name>", "sha256": "<64 hex>"},
    "handoff": {"file": "<name>", "sha256": "<64 hex>"}
  }
}
```

4. **Validation report**: each command, exit code, environment, date, and limitations. Unverified or skipped checks are marked, not converted to PASS.
5. **Engineering handoff**: scope, files changed, dependencies (name and exact version), risks, review instructions, and the provenance and architecture-observation blocks from the [architecture review standard](architecture-review.md).

The manifest's own SHA-256 is the **package identifier**. Its value is also written somewhere the producer cannot alone alter: the task record committed to the repository by Cursor or a human, and the owner-visible message that announced the package.

## Verification procedure (by a party other than the producer)

Run in a disposable location outside the active checkout, with network and hooks off for the Git commands and **no dependency install or build scripts** during static review.

1. **Retrieve** the files through an authorized channel. A failed retrieval ends the procedure as blocked. Record the attempt without credentials.
2. **Hash.** `sha256sum` each file and compare with the manifest, then compute the manifest's own hash and compare with the independently recorded identifier. Any mismatch is a FAIL for provenance.
3. **Bundle.** `git bundle verify` in a repository that contains the base. Fetch the bundle into a fresh bare repository (use alternates to the primary object store, read-only) and run `git fsck --strict`.
4. **Identity.** Confirm `implementation_sha` exists, equals the manifest value in full, and that `git rev-parse <sha>^{tree}` equals `tree_sha`. Confirm the first-parent chain reaches `base_sha`, and the base matches the verified baseline recorded in the task.
5. **Scope.** `git diff --name-status <base> <impl>` must equal `changed_paths` and stay inside the task's owned paths. Flag changes to workflow files, lockfiles, dependency files, or governance files that the task did not authorize.
6. **Patch cross-check.** `git patch-id` of the patch equals that of the commit diff, and the patch applies cleanly to the base in a throwaway worktree.
7. **Isolate.** Create a detached worktree at the exact SHA outside the active checkout, hooks disabled, never force. Review there. Preserve the active checkout and uncommitted work.
8. **Record** results, including the hash values and the verifier's identity, in a review record. Only then mark the implementation **handed off**.

## Access control, encryption, retention, and recovery (proposals for owner decision)

- **Access.** Private storage; no public links. The producer has write-once, no-overwrite, no-delete on its task prefix; reviewers have read-only; no agent holds merge, deploy, or repository-settings permission through this channel. Artifact credentials are separate from GitHub, merge, and deploy credentials, short-lived, and never placed in packages, logs, or reports.
- **Immutability.** Object versioning or retention lock so a published package cannot be silently replaced. Identifier: `<task-id>/<implementation-sha>/<manifest-sha256>`. A changed commit is a new package and a new review.
- **Encryption.** Encrypted in transit and at rest with provider-managed or owner-managed keys; the owner chooses. No secrets, credentials, personal data, customer or financial data, or partner terms in any package; scan before upload and report, without repeating values, if one is found.
- **Retention.** Proposal: keep packages until the task is accepted or closed plus a period the owner sets (a starting value is for the owner to choose; none is assumed here), then delete. The manifest and hashes are kept in the repository record permanently.
- **Recovery.** If an artifact is missing, corrupt, or hash-mismatched: do not reconstruct. Ask the original producer (reuse the existing session) to re-export the same commit, then verify again from step 1. If the commit no longer exists, record a provenance failure, treat the implementation as unreviewed, and escalate to the owner. A different commit is a different implementation.
- **Failure handling.** Publication 401 or 403, absent branch, hash mismatch, wrong base, extra changed paths, or an unverifiable bundle each end in **blocked** or **FAIL**, with the evidence and the next owner action. None is worked around.

## Separation from merge and deploy

Publishing or retrieving an artifact is not review, acceptance, a PR, a merge, or a deployment. Artifact credentials never carry those permissions. Independent Codex review of the exact SHA remains required, and ChatGPT architecture review follows by risk class.

## Open owner decisions

1. Whether to provision Tier 2 storage, and the provider, region, and cost.
2. Retention period and key ownership.
3. Whether the owner or an automated step performs retrieval for reviewers until a direct path exists.
4. Whether commit signing is required for agent identities (authority policy E9).
