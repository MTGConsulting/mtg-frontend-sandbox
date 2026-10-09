# Continuous architecture review standard

**Status: ACCEPTED by the repository owner on 2026-10-08 (Central Time) through [decision 0002](../decisions/0002-continuous-architecture-review.md).** The workflow is the operating process. It is consistent with, and does not override, [AGENTS.md](../../AGENTS.md), the [branching](branching.md) and [security](security.md) standards, and the [agent authority policy](agent-authority.md), which was accepted on 2026-10-08 under [decision 0003](../decisions/0003-multi-agent-operating-model.md) **but not activated** (decision 0001 is historical). Accepting this standard approves the workflow only: it does not accept any individual register entry, select an identity provider, authorize implementation, or approve any cross-domain, GoIdentity, financial, security, or production architecture change.

## Purpose and limits

Keep architecture learning from implementation and review visible, version-controlled, and reviewable by ChatGPT and other authorized reviewers. This standard governs **records and review**. It does not authorize implementation.

- Architecture suggestions, register entries, ChatGPT recommendations, and review summaries do **not** authorize implementation. Every register entry carries the fixed default `Implementation authorized: No`.
- Cross-domain, GoIdentity (identity), financial (including MerryGO boundaries), security, and production architecture changes require separate explicit owner approval before any implementation task is assigned.
- Independent Codex review of the exact implementation commit remains required before acceptance. Architecture review is additional to it, not a substitute.
- Accepted ADRs are the only approved decisions. Proposals, observations, and register entries stay classified as such. Historical decisions are preserved; superseded ones are linked, not edited away.
- **Proposals are not capabilities.** A documentation commit, ADR, register entry, task record, or handoff is not evidence that a proposed service, API, or integration exists. Evidence of an implemented capability needs the code or deployed system, validation results, and independent review of the exact commit. In this repository only the static sandbox dashboard is implemented.
- No credentials, personal data, customer or financial records, or partner contract terms in any record or review packet.

## Terminology

| Term | Status | Use |
| --- | --- | --- |
| GoIdentity | Canonical name for the **proposed** shared identity platform (owner decision, ADR 0002). Not an implemented service; no provider is selected. | Use in new documents and register entries |
| DTAK Identity | Historical terminology | Preserve where it appears in existing documents (for example `docs/architecture/identity-architecture.md` and the handoff, Section 7) for traceability. When citing those documents, quote the historical term and add "(now GoIdentity)". |

Existing documents are not rewritten by this standard. A separate, owner-approved change may add cross-references to them.

## Records

| Record | Location | Purpose |
| --- | --- | --- |
| Improvement register | [`docs/architecture/improvement-register.md`](../architecture/improvement-register.md) | Observations, proposals, unresolved decisions, rejected alternatives, and the cross-service dependency map |
| Decision records | `docs/decisions/NNNN-*.md` | Accepted or proposed decisions with approval evidence |
| Engineering reviews | `docs/reviews/` | Independent review of exact commits |
| Task records | `docs/tasks/` | Scope, evidence, handoff |
| Architecture milestone summaries | `docs/reviews/architecture/YYYY-MM-DD-<milestone>.md` | Concise milestone summaries for ChatGPT and owner review |

All records are version controlled, cite the exact repository, branch, and full commit SHA, and distinguish `confirmed-fact`, `proposed-improvement`, `unresolved-decision`, and `rejected-alternative`. Before adding a register entry, search for duplicates and update the existing entry when one exists.

## Review checkpoints

| ID | Trigger | Output | Owner decision? |
| --- | --- | --- | --- |
| C1 | Completion of each implementation task | Handoff "Architecture observations" block (IDs or "none observed") | No |
| C2 | Completion of each independent review | Reviewer's observations returned in the review output; the coordinator records them | No |
| C3 | Phase or milestone gate | One-page milestone summary in `docs/reviews/architecture/` | Yes, to accept the milestone |
| C4 | Any proposal touching a cross-domain contract, API standard, GoIdentity, financial authorization, a security control, or production architecture | Register entry plus decision-record draft | **Yes, always, before any implementation task** |
| C5 | Before an ADR moves to accepted | Summary of options and rejected alternatives | **Yes** |
| C6 | **Weekly** architecture-improvement triage, coordinated by Cursor, **Mondays at 10:00 AM Central Time, initially by manual initiation** | Triage summary of open entries, duplicates merged, owner questions listed | Owner sets priorities and decides statuses |

Cursor coordinates the weekly triage but cannot approve, reject, or accept anything. The schedule is operational: the owner initiates the triage manually for now, and Cursor has no scheduler of its own. **A skipped review is recorded as WARN** in the register change log with the date and reason; it is not silently omitted. Automation would need separate owner approval.

## Agent responsibilities

| Actor | Responsibility | Write path |
| --- | --- | --- |
| Cursor Agent (coordinator, Level 1) | **Maintains the improvement register**: checks for duplicates, records observations from handoffs and reviews as `proposed` entries, keeps the dependency map current, **coordinates the weekly triage**, drafts milestone summaries. Never sets a status to accepted or rejected and never changes `Implementation authorized`. | Documentation only; commit and push need approval per action |
| Devin (Level 2, when assigned) | **Reports architectural observations in its engineering handoff** (Architecture observations block). Does not edit the register. | Assigned task branch only |
| Codex (Level 0) | **Reports architectural observations in its review output**. Does not write the register. | None; output returned to Cursor |
| ChatGPT (external advisory reviewer) | **Provides architecture recommendations** from authorized read-only GitHub records and self-contained engineering handoff packets. Has no repository authority and no approval authority. Recommendations enter the register as `proposed-improvement`, source "ChatGPT review (owner-relayed)". | None |
| Owner | **Retains all approval authority**: statuses, ADR acceptance, cross-domain, identity, financial, and security architecture changes, and what is shared externally | All approvals |

No agent may approve its own suggestion, change its own approval, review, or enforcement requirements, or treat a register entry as a task assignment.

## Handoff blocks for engineering handoffs and reviews

These blocks are part of the accepted workflow: Devin and Codex report architectural observations through their handoffs and reviews using them. The [task template](../tasks/TEMPLATE.md) now carries them (owner-directed edit, 2026-10-08), and the [agent authority policy](agent-authority.md) (accepted under decision 0003, not activated) lists provenance and review status in its reporting section.

```markdown
## Provenance
- Repository: <owner/repo>
- Branch: <branch>
- Base SHA (full): <40 characters>
- Implementation SHA (full): <40 characters>
- Tree SHA (full): <40 characters>
- Working tree state when recorded: <clean | uncommitted changes listed>
- Publication: <published to remote | not published (reason)>; remote SHA verified: <yes/no and the value>
- Fallback artifact manifest SHA-256 (if used): <value>
- Evidence references: <path@SHA#section, command + exit code, review record>

## Architecture observations
- <AIR-NNNN proposed or referenced, classification, one line each; duplicate check performed> — or — "None observed"
- Cross-service dependencies discovered or changed: <D-NN or none>
- Unresolved decisions raised: <list or none>
- Capability status: <proposed | implemented-and-reviewed (cite evidence)>

## Review and approvals
- Independent Codex review of the exact SHA: <not started | in progress | completed (record link)>
- Approvals still required: <list; owner approval for cross-domain, identity, financial, or security changes>
```

## Milestone architecture-review summary (at most one page)

Stored at `docs/reviews/architecture/YYYY-MM-DD-<milestone>.md`.

```markdown
# Architecture review summary — <milestone> — <YYYY-MM-DD>
- Repository / branch / commit (full SHA): <value>; working tree clean: <yes/no>
- Confirmed facts since the last summary: <bullets with path@SHA evidence>
- Proposed improvements: <AIR ids, one line each>
- Unresolved decisions needing the owner: <AIR/ADR ids and the question>
- Rejected alternatives recorded: <AIR ids or none>
- Cross-service dependency changes: <D-ids or none>
- Proposed vs. implemented: <what is implemented (with evidence) and what remains proposed>
- Implementation and review state: <implementation SHA, Codex review status>
- Risks and unverified items: <list>
- Sensitive-data check: <confirmed none | exceptions>
```

## Making records reviewable by ChatGPT without agent attachments

Agent-session attachments, session URLs, and chat transcripts are **never** the evidence of record, because they are inaccessible outside their tool.

1. **Authorized read-only GitHub access.** ChatGPT may review records published to GitHub through read-only access that the owner authorizes. The owner configures that access; this standard does not create it, and no access was verified or changed in preparing it. Read-only means no write, push, or workflow permissions and no secrets. ChatGPT sees only what has been committed and pushed, and each citation names a commit SHA. The repository contains business-strategy material (for example the handoff), so the owner should decide which paths are in scope.
2. **Self-contained review packets.** At each milestone Cursor produces a self-contained markdown summary (above) that cites SHAs and paths, small enough for the owner to paste or upload. The owner decides what is shared externally.
3. **Fallback artifact packages.** If a commit cannot be published, the producer delivers a standardized package (bundle, patch, SHA-256 manifest, validation report, handoff), verified before any review.

ChatGPT's recommendations come back through the owner and become register entries. They are advisory; the owner decides.

## Owner approval vs. existing authority

| Fits existing authority (no new approval) | Needs owner approval |
| --- | --- |
| Agents reporting observations in their handoff or review output | Committing and pushing the register, standard, and ADR 0002 (needed for ChatGPT to see them) |
| Cursor recording register entries as `proposed`, after a duplicate check | Cross-domain, GoIdentity, financial, security, or production architecture changes, and any ADR acceptance beyond 0002 |
| Citing exact SHAs and evidence in handoffs | Editing the authority policy and task template to carry the handoff blocks |
| Keeping the dependency map current as documentation | Configuring ChatGPT's read-only GitHub access (an owner action) |
| | Choosing which paths ChatGPT may read |
| | Sharing any packet with ChatGPT or another external service |
| | Any terminology cross-reference edits to existing architecture documents |

## Amendment under decision 0003 — ChatGPT architecture cross-review gate (accepted 2026-10-08)

**Status: ACCEPTED by the owner on 2026-10-08 through [decision 0003](../decisions/0003-multi-agent-operating-model.md).** The accepted ADR 0002 text above is unchanged: ChatGPT stays advisory, and the owner decides. The following applies to implementation tasks. It activates no permission, and it cannot be satisfied until a delivery path exists ([AIR-0007](../architecture/improvement-register.md), authority policy E13); until then a required review is recorded `PENDING`. Risk classes R1 to R3 and the order of reviews are defined once in the [orchestration standard](agent-orchestration.md), section 3.

- **Gate.** After the Codex review of the exact SHA, Cursor prepares an architecture packet. R1: the Lead's concise architecture-impact screening in the handoff is enough. R2: full ChatGPT architecture review **before acceptance or merge**. R3: ChatGPT reviews the design **before implementation** and again after the Codex review. A missing review is recorded `PENDING`; the task cannot be recommended for owner acceptance, and nothing may be described as architecture-reviewed.
- **Verdicts.** ChatGPT returns PASS, WARN, FAIL, or ESCALATE per applicable domain. A **FAIL or ESCALATE blocks implementation acceptance or protected-branch merge** until a recorded owner disposition. Neither blocks publication to an assigned development branch. A PASS authorizes nothing: no implementation, merge, or deployment. Cursor cannot independently approve its own implementation.
- **Honesty.** Record that ChatGPT reviewed a packet only if the actual packet and context were made accessible to it. Record the packet's SHA-256 and who relayed it ([AIR-0007](../architecture/improvement-register.md): no verified delivery path yet).
- **Persistence.** Cursor or a human commits the packet and the verdict verbatim in `docs/reviews/architecture/`, citing the implementation SHA and the Codex review record. Observations enter the register as proposals.

Packet template (self-contained, no credentials, personal data, customer or financial records, or partner terms):

```markdown
# Architecture review packet — <task-id> — <YYYY-MM-DD>
- Provenance block (repository, branch, base, implementation, and tree SHAs, publication state)
- Risk class and why (tier, impact flags); model and reasoning effort used, or "not exposed"
- Summary of the change, files changed, and what is explicitly out of scope
- Codex review: verdict and findings, copied verbatim, with the review record path and the SHA it reviewed
- Proposed vs. implemented: what exists (with evidence) and what remains a proposal
- Domain checklist, each PASS | WARN | FAIL | ESCALATE | N/A with one line of reason:
  identity (GoIdentity; no automatic merging); TikiGo (routes, reservations, seat inventory); SendAmGo (shipment lifecycle, dispatch);
  SellaGO (marketplace, fulfillment); GoHub (custody, handoffs); DameGo (food ordering, local delivery);
  MerryGO (financial isolation, savings, KYC, transaction security); shared APIs, events, contracts, versioning, idempotency;
  scalability, reliability, observability, operational cost; simplification and platform reuse
- Related register entries and dependency-map IDs
- Questions for the reviewer
```

## Open questions for the owner

Resolved by decisions 0002 and 0003: the authority policy and task template now carry the handoff blocks; ChatGPT FAIL and ESCALATE gate acceptance and protected-branch merge, not branch publication; weekly trigger and day (Mondays 10:00 AM Central Time, manual initiation), skipped weeks (WARN), GoIdentity as canonical name, Devin reporting through handoffs.

1. Which repository paths should ChatGPT's read-only access cover (the handoff contains business-strategy content)?
2. May Cursor add "(now GoIdentity)" cross-references to `identity-architecture.md` and the handoff in a later, separately approved change?
3. Do you want a milestone-summary index file in `docs/reviews/architecture/` once the first summary exists?
4. Should "Central Time" be recorded as a fixed IANA zone (for example `America/Chicago`) so daylight-saving changes are unambiguous?
