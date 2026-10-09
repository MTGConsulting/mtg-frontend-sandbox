# Architecture improvement register

**Status: format ACCEPTED by the repository owner on 2026-10-08 through [ADR 0002](../decisions/0002-continuous-architecture-review.md).** Acceptance covers the workflow and format only; individual entries below remain proposals, observations, or open decisions until the owner decides them. The register is a record of observations and suggestions. **No entry authorizes implementation.** Implementation needs a separately assigned and approved task, and any cross-domain, identity, financial, or security architecture change needs explicit owner approval. Process rules are in the [architecture review standard](../standards/architecture-review.md); decisions belong in [decision records](../decisions/README.md), not here.

**Maintainer:** Cursor Agent (coordinator) maintains the register. Devin and Codex report observations in their handoffs and reviews; they do not edit the register. ChatGPT provides recommendations, which are recorded as proposals. Only the owner approves, rejects, or accepts anything. Weekly triage: Mondays 10:00 AM Central Time, initially manual; a skipped review is recorded as WARN in the change log.

**Terminology:** `GoIdentity` is the canonical name for the proposed shared identity platform (owner decision, ADR 0002). `DTAK Identity` is historical terminology and is preserved in older documents for traceability; see the mapping in the [architecture review standard](../standards/architecture-review.md). Neither name denotes an implemented service.

Historical context: this register records proposals and observations; the [system context](system-context.md), [domain boundaries](domain-boundaries.md), [API standards](api-standards.md), and [identity architecture](identity-architecture.md) remain the architecture references. They describe direction and constraints, not deployed services.

## Rules

1. **Append-only.** Never delete or rewrite an entry. Change status by adding a dated line to the entry's history. Supersede instead of replacing; keep rejected alternatives.
2. **One classification per entry**, so facts and opinions are never mixed:

| Classification | Meaning | Who may assert it |
| --- | --- | --- |
| `confirmed-fact` | Observed and backed by cited evidence that a reviewer can re-check | Any agent or human, with evidence |
| `proposed-improvement` | A suggestion. Not a decision. | Any agent or human (including owner-relayed ChatGPT review) |
| `unresolved-decision` | A question that needs an owner or ADR decision | Any agent or human |
| `rejected-alternative` | An option the owner rejected, kept with the reason | Owner decision only |

3. **Agents propose; the owner decides.** Only the owner (or a person the owner designates) may move an entry to `accepted`, `rejected`, or link it to an accepted ADR. Agents may not change their own approval, review, or enforcement requirements through this register.
4. **Evidence, not attachments.** Cite `path@<full-40-char-SHA>` (with a section or line range), a command and its exit code, or a review record under `docs/reviews/`. Never cite agent-session attachment URLs as evidence; session IDs may appear as provenance only.
5. **Sensitive data.** No credentials, tokens, personal data, customer or financial records, or partner contract terms. Use placeholders. Mark an entry `sensitivity: internal` if it must not be shared outside authorized reviewers.
6. **Status vocabulary:** `open`, `under-review`, `accepted` (with ADR link), `rejected`, `deferred`, `superseded` (with link), `closed-implemented` (with the approved task and reviewed SHA).
7. **Check for duplicates before adding.** Search the register (title keywords, affected domains, evidence paths, related D-ids) before creating an entry. If an entry covers the same topic, append evidence or a history line to it and add `Related` links instead of creating a new one. Every new entry records its duplicate check in the `Duplicate check` field.
8. **Proposals are not capabilities.** Every architecture item is `proposed` unless runtime evidence shows it is implemented. A documentation commit, an ADR, a register entry, a task record, or a handoff is **not** evidence that a proposed service exists. Evidence of an implemented capability requires the code or deployed system, its validation results, and an independent review of the exact commit. Only the static sandbox dashboard is implemented in this repository.
9. **Implementation authorization is fixed at No.** New entries always carry `Implementation authorized: No`, and no one edits that field to `Yes`. Authorization to implement is granted only by an owner-approved task record, never by the register.
10. **Owner approval gates.** Any entry that would change a cross-domain contract, shared identity (GoIdentity), financial authorization or MerryGO boundaries, or a security architecture control requires explicit owner approval before any implementation task is assigned. Agents mark such entries `Decision needed from: owner`.
11. **Record provenance exactly.** Each entry cites the exact repository, branch, and full 40-character commit SHA, states whether the working tree was clean, and cites evidence as `path@SHA#section`. If a value is unavailable, write `unavailable` and the reason; do not guess.

## Entry format

```markdown
### AIR-NNNN — Short title
- Classification: confirmed-fact | proposed-improvement | unresolved-decision | rejected-alternative
- Status: open | under-review | accepted | rejected | deferred | superseded | closed-implemented
- Reported by: <agent or human>, <tool/version>, <session or task ID>, <YYYY-MM-DD>
- Repository / branch / commit: <owner/repo> @ <branch> @ <full 40-char SHA> (state whether working tree was clean)
- Domains / services affected: <GoIdentity | TikiGo | SendAmGo | SellaGO | GoHub | MerryGO | DameGo | engineering-process | none>
- Related: <AIR ids, D-ids, ADR ids, task ids>
- Evidence: <path@SHA#section or lines; command + exit code; review record>
- Observation: <what was seen, in facts>
- Impact / risk: <what happens if unaddressed>
- Recommendation (proposed only): <suggestion, or "none">
- Alternatives considered: <list, including rejected ones>
- Duplicate check: <terms and entries searched; result: none found | appended to AIR-NNNN>
- Decision needed from: <owner | none> — and what is being asked
- Implementation authorized: No (fixed default; never changed in the register)
- Sensitivity: public-safe | internal
- History:
  - <YYYY-MM-DD> <actor>: <change>
```

## Register index

| ID | Classification | Status | Title | Domains |
| --- | --- | --- | --- | --- |
| AIR-0001 | confirmed-fact | open | Agent artifacts have no shared accessible channel | engineering-process |
| AIR-0002 | proposed-improvement | open | Tiered artifact delivery with exact-SHA verification | engineering-process |
| AIR-0003 | confirmed-fact | open | Enforcement of agent boundaries is unverified | engineering-process |
| AIR-0004 | unresolved-decision | open | Shared identity name and provider are unresolved (name: GoIdentity per ADR 0002; provider unresolved) | GoIdentity, all apps |
| AIR-0005 | unresolved-decision | open | Dispatch ownership for food and parcel delivery is unresolved | DameGo, SendAmGo, GoHub |
| AIR-0006 | confirmed-fact | open | No CI workflow or automated tests at the reference commit | engineering-process |
| AIR-0007 | confirmed-fact | open | No verified delivery path for mandatory ChatGPT architecture review | engineering-process |
| AIR-0008 | confirmed-fact | open | Model availability and reasoning settings are tool-specific and unverified | engineering-process |
| AIR-0009 | unresolved-decision | open | Cursor Lead Agent would concentrate orchestration, implementation, register, and packet roles | engineering-process |

No `rejected-alternative` entries exist yet; none may be recorded without an owner decision.

## Entries

### AIR-0001 — Agent artifacts have no shared accessible channel
- Classification: confirmed-fact
- Status: open
- Reported by: Cursor Agent, Cursor 3.24.9, Phase 1.3 session, 2026-10-08
- Repository / branch / commit: MTGConsulting/mtg-frontend-sandbox @ test/cursor-agent-validation @ 64006e86c62726326439e0a095f6b2e386822c7e (working tree had uncommitted documentation drafts)
- Domains / services affected: engineering-process
- Related: AIR-0002, AIR-0003
- Evidence: Devin Phase 1.3B final report reporting HTTP 403 on push and unpublished local commit (session bd74ac7ce07c46aa835c8346d3448dd7, provenance only); local download attempts of the three attachment URLs returned HTTP 401 on 2026-10-08; `git ls-remote origin 'refs/heads/devin/*'` listed no Devin branch (exit 0).
- Observation: The reviewer environment could not retrieve Devin's reported implementation commit because attachments require Devin authentication and the push was rejected.
- Impact / risk: Independent review of an exact commit is blocked or depends on manual transfer.
- Recommendation (proposed only): see AIR-0002.
- Alternatives considered: manual download by the owner (works, does not scale).
- Duplicate check: none found; register was empty at creation. Kept separate from AIR-0002 so the confirmed fact and the proposal are not mixed.
- Decision needed from: none for the observation itself.
- Implementation authorized: No
- Sensitivity: internal
- History:
  - 2026-10-08 Cursor Agent: opened.
  - 2026-10-08 Cursor Agent: the owner's later instruction to eliminate reliance on inaccessible session attachments is addressed by the proposed artifact handoff standard. The Phase 1.3B artifacts remain unretrieved; recovery is a separate owner decision (see ADR 0003, questions still open, item 4: the Phase 1.3B recovery route).
  - 2026-10-08 Cursor Agent: the owner accepted ADR 0003, which makes GitHub assigned task branches the preferred delivery mechanism. The Phase 1.3B artifacts remain unretrieved and the commit unpublished; the entry stays `open`. Status changes are the owner's.
  - 2026-10-09 Cursor Agent (Phase 1.3B-F, proposed until owner-approved commit): the exact Phase 1.3B/CI history was published to `devin/phase-1-3b-ci-regression-tests` and independently reviewed. Durable local bundle SHA-256 `5a8a921b4bcb202fa335129a4dc01661fcbe005841d026b085fa04139160887a` remains. Tier 2 private storage is still unprovisioned. Entry stays `open`.

### AIR-0002 — Tiered artifact delivery with exact-SHA verification
- Classification: proposed-improvement
- Status: open
- Reported by: Cursor Agent, Cursor 3.24.9, 2026-10-08
- Repository / branch / commit: MTGConsulting/mtg-frontend-sandbox @ test/cursor-agent-validation @ 64006e86c62726326439e0a095f6b2e386822c7e
- Domains / services affected: engineering-process
- Related: AIR-0001, AIR-0003
- Evidence: AIR-0001 evidence.
- Observation: A standard fallback is missing when GitHub publication fails.
- Impact / risk: Review stalls or relies on reconstruction, which must not substitute for the exact commit.
- Recommendation (proposed only): Tier 1 push the exact commit to the assigned task branch; Tier 2 a private shared store with write-only producer access; Tier 3 inline transfer through session events. Package: bundle, patch, SHA-256 manifest, validation report, handoff. Verify hashes, bundle contents, base, tree, and changed-file scope before any review. Keep artifact credentials separate from merge and deploy permissions.
- Alternatives considered: owner manual download; reconstruction from transcripts (rejected in principle by the review requirement for exact commits, pending owner confirmation).
- Duplicate check: none found; register was empty at creation. Related to AIR-0001 (the fact it responds to).
- Decision needed from: owner — tier choice, any storage provisioning, upload authorization, retention.
- Implementation authorized: No
- Sensitivity: internal
- History:
  - 2026-10-08 Cursor Agent: opened.
  - 2026-10-08 Cursor Agent: the proposed [artifact handoff standard](../standards/artifact-handoff.md) refines this entry. It keeps two tiers (GitHub branch preferred, private store fallback) and drops the inline-transfer tier, because transcripts and inline text cannot be verified as the exact commit. The entry remains `proposed-improvement`; nothing is provisioned.
  - 2026-10-08 Cursor Agent: the owner accepted ADR 0003 (GitHub assigned branches preferred; private storage a fallback proposal; nothing provisioned; no GitHub write authority inferred). The entry stays `proposed-improvement` and `open` for the fallback storage decision, which is the owner's.

### AIR-0003 — Enforcement of agent boundaries is unverified
- Classification: confirmed-fact
- Status: open
- Reported by: Cursor Agent, Cursor 3.24.9, 2026-10-08
- Repository / branch / commit: MTGConsulting/mtg-frontend-sandbox @ test/cursor-agent-validation @ 64006e86c62726326439e0a095f6b2e386822c7e
- Domains / services affected: engineering-process
- Related: AIR-0001
- Evidence: `docs/standards/branching.md@64006e86c62726326439e0a095f6b2e386822c7e` ("Remote protection settings have not been verified"); proposed `docs/standards/agent-authority.md` (uncommitted), Enforcement section.
- Observation: Remote branch protection, required checks, and agent token scope have not been verified.
- Impact / risk: Written rules rely on agent compliance and owner review.
- Recommendation (proposed only): owner-led verification before relying on enforcement.
- Alternatives considered: accept the gap explicitly.
- Duplicate check: none found; register was empty at creation.
- Decision needed from: owner — verify before acceptance of the authority policy, or accept the gap.
- Implementation authorized: No
- Sensitivity: internal
- History:
  - 2026-10-08 Cursor Agent: opened.
  - 2026-10-08 Cursor Agent: the proposed [authority policy Revision 2](../standards/agent-authority.md) lists thirteen enforcement prerequisites (E1 to E13) and ties activation of any commit/push authority to verified evidence. All remain unverified as of this date. See also AIR-0009.
  - 2026-10-08 Cursor Agent: the owner selected 3 attempts, 2 remediation rounds, a 4-hour window, and a $15 ceiling only where metering and enforcement are verifiable, and required that there be no unattended Level 2 or 2+ execution until controls are verified. None of these is technically enforced; E1 to E13 remain unverified.
  - 2026-10-08 Cursor Agent: the owner accepted ADR 0003 and its clarifications (cost ceiling not considered enforced without verified metering and enforcement; attended and stoppable execution; unattended = no authorized person actively able to observe and stop the task). Acceptance activates nothing. E1 to E13 remain unverified, so this entry stays `open`.

### AIR-0004 — Shared identity name and provider are unresolved
- Classification: unresolved-decision
- Status: open
- Reported by: Cursor Agent, Cursor 3.24.9, 2026-10-08
- Repository / branch / commit: MTGConsulting/mtg-frontend-sandbox @ test/cursor-agent-validation @ 64006e86c62726326439e0a095f6b2e386822c7e
- Domains / services affected: GoIdentity (working name; see below), all apps, MerryGO
- Related: D-07, D-08
- Evidence: `docs/architecture/identity-architecture.md@64006e86c62726326439e0a095f6b2e386822c7e` ("DTAK Identity is a working name only"; provider selection unresolved). The name GoIdentity does not appear in the repository at this commit.
- Observation: The repository describes the shared identity capability under the working name "DTAK Identity"; the owner now refers to it as GoIdentity. Mapping between the two names is not recorded. Provider candidates (Keycloak, Cognito, Auth0, Zitadel) are evaluation candidates only.
- Impact / risk: Documents and agents may use inconsistent names; no provider is approved.
- Recommendation (proposed only): owner records the canonical name; selection proceeds through an ADR.
- Alternatives considered: none recorded.
- Duplicate check: searched identity naming terms across `docs/` and `AGENTS.md`; no other entry covers it.
- Decision needed from: owner — provider-selection process (the canonical name was decided in ADR 0002). Identity trust changes require separate explicit owner approval.
- Implementation authorized: No
- Sensitivity: internal
- History:
  - 2026-10-08 Cursor Agent: opened.
  - 2026-10-08 Cursor Agent: owner selected `GoIdentity` as the canonical name for the proposed shared identity platform and `DTAK Identity` as historical terminology (recorded in proposed ADR 0002; not effective until accepted). The original observation above is preserved unchanged for traceability. Provider remains unresolved and nothing here implies GoIdentity exists as a service.
  - 2026-10-08 Cursor Agent: the owner accepted ADR 0002 on 2026-10-08, making GoIdentity the canonical name (DTAK Identity historical). The naming part of this entry is therefore decided; the entry stays `open` because provider selection and identity trust remain unresolved and need separate explicit owner approval.

### AIR-0005 — Dispatch ownership for food and parcel delivery is unresolved
- Classification: unresolved-decision
- Status: open
- Reported by: Cursor Agent, Cursor 3.24.9, 2026-10-08
- Repository / branch / commit: MTGConsulting/mtg-frontend-sandbox @ test/cursor-agent-validation @ 64006e86c62726326439e0a095f6b2e386822c7e
- Domains / services affected: DameGo, SendAmGo, GoHub
- Related: D-03, D-05, D-06
- Evidence: `docs/architecture/domain-boundaries.md@64006e86c62726326439e0a095f6b2e386822c7e` ("Shared dispatch ownership, data retention, and contract details require future decisions"); `docs/context/project-handoff.md@64006e86c62726326439e0a095f6b2e386822c7e` Section 5 table lists DameGo food delivery to a "local dispatch capability".
- Observation: The destination of DameGo delivery requests is a capability, not a named owning domain.
- Impact / risk: A cross-domain contract cannot be defined until ownership is decided.
- Recommendation (proposed only): none; this is a decision for the owner.
- Alternatives considered: none recorded.
- Duplicate check: none found; register was empty at creation.
- Decision needed from: owner — dispatch ownership. Cross-domain architecture changes require explicit approval.
- Implementation authorized: No
- Sensitivity: internal
- History:
  - 2026-10-08 Cursor Agent: opened.

### AIR-0006 — No CI workflow or automated tests at the reference commit
- Classification: confirmed-fact
- Status: open
- Reported by: Cursor Agent, Cursor 3.24.9, 2026-10-08 (corroborated by the Devin readiness assessment, gaps G4 and G5)
- Repository / branch / commit: MTGConsulting/mtg-frontend-sandbox @ test/cursor-agent-validation @ 64006e86c62726326439e0a095f6b2e386822c7e
- Domains / services affected: engineering-process
- Related: Phase 1.3B task (assigned; the reported result is unpublished and unreviewed)
- Evidence: `git ls-tree -r --name-only 64006e86c62726326439e0a095f6b2e386822c7e` listed no `.github/` path and no test or spec files (exit 0); `package.json` scripts at that commit are `dev`, `build`, `lint`, `start`, `typecheck` with no test script.
- Observation: The reference commit has no tracked CI workflow or automated tests.
- Impact / risk: Validation is manual and not repeatable per commit.
- Recommendation (proposed only): addressed by the assigned Phase 1.3B task, subject to independent review of the exact commit.
- Alternatives considered: none recorded.
- Duplicate check: none found; register was empty at creation.
- Decision needed from: none until the reviewed commit exists.
- Implementation authorized: No (the Phase 1.3B task has its own approvals; this entry grants none)
- Sensitivity: public-safe
- History:
  - 2026-10-08 Cursor Agent: opened.
  - 2026-10-09 Cursor Agent (Phase 1.3B-F, proposed until owner-approved commit): CI and dashboard regression tests exist at `fbe2eb563863e185946e70603255cbbd94ae0c17` on `devin/phase-1-3b-ci-regression-tests`. GitHub Actions run 37891845102 succeeded (9/9 tests). The reference commit `64006e8` still has no CI. This line is not on `test/cursor-agent-validation` @ `81e20a1` or on `main`. The Related field above is left as originally written (historical: unpublished/unreviewed at opening). Entry stays `open`; do not treat hosted CI as governance-baseline coverage.
  - 2026-10-09 Owner (Dieudonne), recorded by Cursor Agent: accepted the successful CI implementation on `devin/phase-1-3b-ci-regression-tests` for Phase 1.3B closure. Entry stays `open` until that CI is integrated with governance `81e20a1` / `test/cursor-agent-validation`. Integration is not authorized by this disposition.
  - 2026-10-09 Cursor Agent: Phase 1.3B recorded ACCEPTED WITH RESIDUAL RISKS after Codex re-review `01a11f50-9e2e-77f0-b8d4-c90870688c77` (WARN, no substantive finding). Closure documentation is not committed (Gate C). This entry remains `open`.
  - 2026-10-09 Owner (Dieudonne), recorded by Cursor Agent (ChatGPT architecture-review alignment): owner dispositions approved; technical CI completion accepted on the development branch; AIR-0006 stays `open` until governance-baseline integration. Publication of closure records is not authorized. Do not treat the prior residual-risk acceptance line as Gate C, Gate D, or a protected-branch merge.

### AIR-0007 — No verified delivery path for mandatory ChatGPT architecture review
- Classification: confirmed-fact
- Status: open
- Reported by: Cursor Agent, Cursor 3.24.9, operating-model consolidation task, 2026-10-08
- Repository / branch / commit: MTGConsulting/mtg-frontend-sandbox @ test/cursor-agent-validation @ 64006e86c62726326439e0a095f6b2e386822c7e (working tree had uncommitted documentation drafts)
- Domains / services affected: engineering-process (all domains reviewed)
- Related: AIR-0001, AIR-0002, ADR 0002, ADR 0003 (accepted, not activated)
- Evidence: `docs/decisions/0002-continuous-architecture-review.md` (Consequences: access is owner-configured and "no access has been verified or changed"); `git status --short` on 2026-10-08 showed the register, standards, and ADRs as modified or untracked, i.e. not committed or pushed (exit 0). No ChatGPT review has occurred for any packet.
- Observation: The proposed risk-based ChatGPT cross-review depends on ChatGPT receiving a self-contained packet or reading published records. Neither path has been verified, and the records exist only in the local working tree.
- Impact / risk: A review gate that nothing can satisfy would either block all work or be satisfied by a claimed review that did not happen.
- Recommendation (proposed only): Owner-relayed packets with a recorded SHA-256 and verdict until a direct path is verified; gate owner acceptance, not publication of a branch. Never record a ChatGPT review without the actual packet.
- Alternatives considered: Gate publication on the review (rejected in draft: too slow); skip review until access exists (leaves cross-service drift unchecked).
- Duplicate check: searched `ChatGPT`, `packet`, `read-only` in the register and standards; related to AIR-0001/AIR-0002 (artifact channel) but distinct (review input, not implementation artifact); no existing entry covers it.
- Decision needed from: owner — packet path, which repository paths ChatGPT may read, and the gate rule.
- Implementation authorized: No (fixed default; never changed in the register)
- Sensitivity: internal
- History:
  - 2026-10-08 Cursor Agent: opened.
  - 2026-10-08 Cursor Agent: the owner's direction fixes the gate rule (a ChatGPT FAIL blocks acceptance or merge, not publication to an assigned branch). The delivery path (E13) remains unverified; no ChatGPT review has occurred.
  - 2026-10-08 Cursor Agent: the owner accepted ADR 0003 with the clarification that a ChatGPT FAIL or ESCALATE blocks implementation acceptance or protected-branch merge until owner disposition. The delivery path (E13) is still unverified, so any required review is `PENDING`.
  - 2026-10-09 Cursor Agent (Phase 1.3B-F, proposed until owner-approved commit): owner-relayed ChatGPT R2 packets for Phase 1.3B-R and PR #1 returned WARN (no blocking architectural finding). Direct read-only GitHub access (E13) remains unverified. Entry stays `open`.
  - 2026-10-09 Owner (Dieudonne), recorded by Cursor Agent: accepted reconstructed ChatGPT (and Codex) review outcomes as historical evidence for Phase 1.3B. Missing original review artifacts and packet hashes remain documented limitations. Direct path E13 remains unverified. Entry stays `open`.

### AIR-0008 — Model availability and reasoning settings are tool-specific and unverified
- Classification: confirmed-fact
- Status: open
- Reported by: Cursor Agent, Cursor 3.24.9, operating-model consolidation task, 2026-10-08
- Repository / branch / commit: MTGConsulting/mtg-frontend-sandbox @ test/cursor-agent-validation @ 64006e86c62726326439e0a095f6b2e386822c7e (working tree had uncommitted documentation drafts)
- Domains / services affected: engineering-process
- Related: ADR 0003 (accepted, not activated), agent-orchestration standard (accepted, not activated)
- Evidence: Cursor's subagent model list as presented to the agent on 2026-10-08 (no model named Astra; non-default models only on explicit user instruction). Devin MCP tool names were listed; their input schemas for model selection were not inspected. The Codex CLI's models were not inspected.
- Observation: Model options differ per tool. Whether an "Astra" option or any highest reasoning setting exists in Devin or Codex is unverified, and ChatGPT's own options do not carry into other tools.
- Impact / risk: A routing rule that names an unavailable model fails at assignment time, or an agent substitutes one silently.
- Recommendation (proposed only): Verify each tool's actual model identifiers and reasoning settings at assignment time and record them; treat "not exposed" as a valid recorded value; never use model choice to widen permissions.
- Alternatives considered: Hard-coding model names in standards (rejected: they go stale).
- Duplicate check: searched `model`, `Astra`, `reasoning` in the register and decision records; none found.
- Decision needed from: owner — which Tier 3 model and setting to prefer once verified.
- Implementation authorized: No (fixed default; never changed in the register)
- Sensitivity: internal
- History:
  - 2026-10-08 Cursor Agent: opened.
  - 2026-10-08 Cursor Agent: the owner's direction says not to hard-code Astra or assume its availability. The standards now name no model. The entry's mentions of "Astra" record only that it was not listed in the tool inspected.
  - 2026-10-08 Cursor Agent: the owner accepted ADR 0003, whose model-routing rules (verified tiers, no hard-coded model, escalation never expands permissions) now stand. The entry stays `open`: availability in Devin and Codex is still uninspected.

### AIR-0009 — Cursor Lead Agent would concentrate orchestration, implementation, register, and packet roles
- Classification: unresolved-decision
- Status: open
- Reported by: Cursor Agent, Cursor 3.24.9, operating-model consolidation task, 2026-10-08
- Repository / branch / commit: MTGConsulting/mtg-frontend-sandbox @ test/cursor-agent-validation @ 64006e86c62726326439e0a095f6b2e386822c7e (working tree had uncommitted documentation drafts)
- Domains / services affected: engineering-process
- Related: ADR 0003 (accepted, not activated), AIR-0003
- Evidence: `docs/standards/agent-authority.md` (proposed Revision 2, role matrix and separation-of-duties paragraph, uncommitted).
- Observation: Under the proposed Level 2+ the same agent could delegate, implement, integrate, maintain the register, and write the packet that ChatGPT reviews.
- Impact / risk: Weaker independence if Codex findings or diffs are summarized by the author instead of copied.
- Recommendation (proposed only): Proposed mitigations: Lead never reviews its own or delegated work; Codex findings are copied verbatim; every packet carries the exact SHA; the owner decides acceptance. Owner to confirm sufficiency.
- Alternatives considered: Split packet authorship to a different agent (adds cost); owner writes every packet (does not scale).
- Duplicate check: searched `Level 2+`, `packet`, `independence` in the register; no existing entry.
- Decision needed from: owner — confirm the mitigations or name an additional independent check.
- Implementation authorized: No (fixed default; never changed in the register)
- Sensitivity: internal
- History:
  - 2026-10-08 Cursor Agent: opened.
  - 2026-10-08 Cursor Agent: the owner's direction adds that Cursor cannot independently approve its own implementation. The entry stays open pending the owner's view on whether the remaining mitigations suffice.
  - 2026-10-08 Cursor Agent: the owner accepted ADR 0003, whose Consequences state the separation-of-duties mitigations. The owner has not said whether they are sufficient or whether an additional independent check is needed, so the entry stays `open`.

## Cross-service dependency map

Source: [handoff Section 5](../context/project-handoff.md) (confirmed direction; detailed workflows proposed) and [domain boundaries](domain-boundaries.md). None of these dependencies has an implemented API, store, or runtime service in this repository. `GoIdentity` is the owner-selected canonical name for the proposed shared identity platform (historical name: DTAK Identity; see AIR-0004). **Capability status** is `proposed, not implemented` for every row: the existence of this table, of an ADR, or of a documentation commit is not evidence that any listed service, API, or integration exists.

| ID | From | To | Dependency | Classification | Capability status | Contract status | Open decisions |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D-01 | SellaGO | SendAmGo | Product fulfillment requests | confirmed direction | proposed, not implemented | none | contract, authorization |
| D-02 | SellaGO | GoHub | Customer collection | confirmed direction | proposed, not implemented | none | contract, custody evidence |
| D-03 | DameGo | local dispatch capability | Food delivery requests | confirmed direction | proposed, not implemented | none | dispatch ownership (AIR-0005) |
| D-04 | TikiGo | SendAmGo | Approved intercity parcel capacity | confirmed direction | proposed, not implemented | none | operator integration unresolved |
| D-05 | SendAmGo | GoHub | Parcel handovers | confirmed direction | proposed, not implemented | none | custody records, dispatch ownership |
| D-06 | GoHub | SendAmGo | Final-mile delivery requests | confirmed direction | proposed, not implemented | none | dispatch ownership |
| D-07 | all participating apps | GoIdentity (canonical name; DTAK Identity is historical) | Authentication | confirmed direction | proposed, not implemented | none | provider selection (AIR-0004); name decided as GoIdentity; no identity service is implemented or authorized |
| D-08 | MerryGO | GoIdentity | Authorized identity federation | confirmed direction | proposed, not implemented | none | federation scope |
| D-09 | participating apps | approved payment providers | Payment processing | confirmed direction | proposed, not implemented | none | provider selection |

Standing constraints that every dependency must respect (from the handoff and domain boundaries): no direct cross-domain database writes; explicit per-operation authorization; idempotent and auditable transactions; reconciliation for cross-domain transactions; shared identity grants no cross-application access; a verification in one app (for example a SendAmGo courier) never implies financial verification in MerryGO.

Add a row when an agent discovers a dependency not listed. A new or changed cross-domain dependency is a proposal and requires owner approval before any implementation.

## Change log

- 2026-10-08 Cursor Agent: created the proposed format and six seed entries from evidence available in the reference commit and the Phase 1.3 session. No entry authorizes implementation.
- 2026-10-08 Cursor Agent: applied owner-selected positions for proposed ADR 0002 (canonical name GoIdentity, Cursor maintains the register, Devin/Codex report via handoffs and reviews, weekly Cursor triage, summaries under `docs/reviews/architecture/`, ChatGPT read-only access and review packets). Added rules 7–11, a duplicate-check field, and a capability-status column. Updated AIR-0004 by history line only. No new entries were added: the duplicate check found these topics already covered by AIR-0001 to AIR-0006.
- 2026-10-08 Cursor Agent: recorded the owner's acceptance of ADR 0002 (transcribed verbatim in the ADR). Register format and workflow are accepted; entries remain as classified. Schedule: Mondays 10:00 AM Central Time, manual initiation; skipped reviews are recorded here as WARN. No WARN has occurred (first scheduled triage: the next Monday after this date). No new entries were added.
- 2026-10-08 Cursor Agent: added AIR-0007 to AIR-0009 and history lines on AIR-0001 to AIR-0003 while consolidating the proposed operating model (ADR 0003). Duplicate checks recorded in each entry. No entry authorizes implementation, and none was accepted or rejected.
- 2026-10-08 Cursor Agent: recorded owner-selected ADR 0003 direction (pilot limits, review gates, activation gate) as history lines on AIR-0003, AIR-0007, AIR-0008, and AIR-0009. No entry was added, accepted, or rejected, and none authorizes implementation.
- 2026-10-08 Cursor Agent: recorded the owner's acceptance of ADR 0003 (with five clarifications, transcribed in the ADR) as history lines on AIR-0001, AIR-0002, AIR-0003, AIR-0007, and AIR-0009. No entry was added, accepted, rejected, or closed, none authorizes implementation, and no permission was activated.
- 2026-10-08 Cursor Agent: Codex review findings F3 and F4 remediated (owner-authorized documentation-only): AIR-0001 history now cites ADR 0003 item 4 for Phase 1.3B recovery; D-07 open decisions now record GoIdentity as the accepted canonical name, DTAK Identity as historical, provider selection unresolved, and no identity service implemented or authorized. No entry was added, accepted, or closed.
