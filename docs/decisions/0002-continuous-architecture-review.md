# 0002 — Continuous architecture review workflow

- Identifier: 0002
- Status: **accepted** — by the repository owner, 2026-10-08 (Central Time); recorded below
- Date drafted: 2026-10-08
- Approval evidence / date: the owner's written decision, supplied in the Cursor session on 2026-10-08 and transcribed verbatim under "Recorded owner approval" by Cursor Agent at the owner's direction. The transcription is a record of the owner's approval, not an agent approval. The owner's approval text governs wherever a draft wording differs.
- Scope of acceptance: the operating workflow only. It does not accept any individual register entry, select an identity provider, authorize implementation, or approve any cross-domain, GoIdentity, financial, security, or production architecture change.

## Context

The multi-agent workflow (Cursor Agent, Devin, Codex) produces architectural observations during implementation and review, but they were not captured systematically. Agent-session attachments were inaccessible to the reviewer environment during Phase 1.3B, so evidence must live in version-controlled records or verified artifact packages. The owner wants ChatGPT to be able to review architecture progress continuously, with the owner keeping decision authority.

## Options considered

1. Do nothing; observations stay in chat sessions. Lowest effort; evidence is lost or inaccessible.
2. **Adopt with Cursor maintaining the register and Devin and Codex reporting through handoffs and reviews.** (Selected by the owner.)
3. Let every agent edit the register directly. Faster; weakens separation between record-keeping and the agent whose work is being described. (Not selected.)

## Rationale

Option 2 centralizes register maintenance with the coordinator, keeps Devin and Codex inside their authority levels (Level 2 file scope and Level 0 read-only), keeps ChatGPT advisory, and keeps every approval with the owner.

## Guardrails (apply regardless of the operating model)

- **Proposals are not capabilities.** Documentation commits, ADRs, register entries, and handoffs are not evidence that proposed services (including GoIdentity, TikiGo, SendAmGo, SellaGO, GoHub, MerryGO, or DameGo integrations) exist. Only the static sandbox dashboard is implemented in this repository.
- **No implementation authority.** Register entries carry the fixed default `Implementation authorized: No`. Implementation requires a separate owner-approved task.
- **Owner approval is required** for cross-domain, GoIdentity, financial, security, and production architecture changes.
- **Independent Codex review** of exact implementation commits stays required before acceptance.
- **Duplicate check** before adding any register entry; exact repository, branch, full commit SHA, and evidence references recorded where available.
- **Historical decisions preserved**; proposals kept distinct from accepted ADRs. Terminology: GoIdentity is canonical; DTAK Identity is historical and retained for traceability.
- No credentials or sensitive business data in records or review packets.

## Consequences

- The [architecture review standard](../standards/architecture-review.md) and [improvement register](../architecture/improvement-register.md) are the accepted operating process.
- Weekly triage is scheduled operationally for Mondays at 10:00 AM Central Time, initially by manual initiation. A skipped review is recorded as WARN.
- Devin and Codex report architectural observations in their handoffs and reviews; Cursor maintains the register.
- ChatGPT may access authorized read-only GitHub records and self-contained engineering handoff packets. The owner configures any access; this record creates none, and no access has been verified or changed.
- Records are visible to ChatGPT only after they are committed and pushed, which still requires the owner's separate approval.
- Edits that add the handoff blocks to the [agent authority policy](../standards/agent-authority.md) (itself still proposed under [decision 0001](0001-agent-engineering-authority.md)) and to the [task template](../tasks/TEMPLATE.md) are not made by this acceptance and need separate approval. *(Update 2026-10-08: the owner later accepted [decision 0003](0003-multi-agent-operating-model.md), under which the authority policy is accepted governance policy, not activated, and directed the task-template update, which has been made. This note is an annotation; the owner's recorded approval above is unchanged.)*

## Security and sensitivity

- No credentials, personal data, customer or financial records, or partner terms in registers or packets.
- ChatGPT read access is read-only and owner-authorized. The repository includes business-strategy material, so the path scope remains an open question.
- Register entries and ChatGPT recommendations grant no implementation authority.

## Reversal

Superseding or rejecting this record leaves the register as historical notes; entries are append-only and are never deleted. Terminology changes do not rewrite existing documents.

## Recorded owner approval

The following is the owner's decision as supplied, transcribed verbatim.

> **Decision 0002 — Continuous Architecture Review**
>
> **Status:** Accepted upon owner authorization and recording in the repository.
>
> I approve the continuous architecture review workflow described in `docs/standards/architecture-review.md` and `docs/architecture/improvement-register.md`.
>
> The approved operating model is:
>
> 1. GoIdentity is the canonical name for the proposed shared identity platform.
> 2. Cursor coordinates weekly architecture-improvement triage.
> 3. ChatGPT provides architecture recommendations; the owner retains decision authority.
> 4. Architecture milestone summaries are maintained in `docs/reviews/architecture/`.
> 5. ChatGPT may access authorized read-only GitHub records and self-contained engineering handoff packets.
> 6. Devin and Codex report architectural observations through their handoffs and reviews; Cursor maintains the improvement register.
>
> Weekly triage is scheduled operationally for Mondays at 10:00 AM Central Time, initially through manual initiation.
>
> Skipped reviews are recorded as WARN.
>
> Architecture improvements do not authorize implementation. Cross-domain, GoIdentity, financial, security, and production architecture changes require separate explicit approval.
>
> **Approved by:** Repository owner
> **Approval date:** October 8, 2026 (Central Time)

## Questions resolved by the approval

- Weekly triage timing and trigger: Mondays 10:00 AM Central Time, manual initiation.
- Skipped weeks: recorded as WARN.
- Canonical identity name: GoIdentity (DTAK Identity historical).
- Devin's register access: Devin reports through its handoff; Cursor maintains the register.
- ChatGPT access model: authorized read-only GitHub records plus self-contained handoff packets.

## Resolved questions

- Approval to edit the agent authority policy and task template to carry the handoff blocks. Original context: listed as an open owner question when this decision was accepted on 2026-10-08. Dated resolution (2026-10-08, later the same day): the owner later accepted [decision 0003](0003-multi-agent-operating-model.md) and directed the task-template amendment, which has been drafted in the working tree. This records that later authorization; it does not rewrite the original question, claim publication, or activate any permission.

## Questions still open

1. Which repository paths ChatGPT's read-only access should cover (the handoff contains business-strategy content).
2. Whether "(now GoIdentity)" cross-references may be added to existing architecture documents in a later approved change.
3. Whether to add a milestone-summary index once the first summary exists.
4. Whether "Central Time" should be recorded as a fixed IANA time zone (for example `America/Chicago`) so daylight-saving changes are unambiguous.
5. Approval to commit and push these records, which is also what makes them visible to ChatGPT.

## Related decisions (not part of this decision)

[Decision 0003](0003-multi-agent-operating-model.md) was accepted by the owner on 2026-10-08. It adds a risk-based ChatGPT cross-review gate and the consolidated agent operating model, and it preserves this decision as accepted. It does not alter the accepted text above. It activates no permission.
