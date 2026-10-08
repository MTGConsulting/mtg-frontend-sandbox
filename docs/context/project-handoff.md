# MTG CONSULTING — Engineering Project Handoff

**Document:** `docs/context/project-handoff.md`
**Date:** October 8, 2026
**Project:** MTG CONSULTING SuperApp Ecosystem
**Environment:** Ubuntu WSL2
**Repository:** `/home/camerudeboy/projects/MTGCONSULTING/mtg-frontend-sandbox`
**Expected branch:** `test/cursor-agent-validation`
**Current phase:** Phase 1 — Shared Architecture and Multi-Agent Engineering
**Status:** Engineering handoff; architecture decisions subject to validation

---

> Assembly status (2026-10-08): Sections 1–26 assembled in numerical order from the supplied excerpts and follow-up. Section 19 now includes the supplied continuation, with duplicate limitations removed. The closing Phase 1 continuation after Section 24 has been replaced with the project owner’s supplied text. No source gaps remain; production architecture decisions remain subject to approval.
>
> Evidence reconciliation: CONFIRMED labels in the supplied text retain their stated provenance, including user-reported evidence. Local inspection established dashboard corrections at commit `2ed4f62`, now HEAD on `test/cursor-agent-validation`; this resolves the historical uncertainty in Section 14 without rewriting it. Phase 1.1 rules and standards exist as uncommitted work. Rule activation in Cursor, native Cursor Agent implementation, and independent review remain unverified.
>
> Repository mapping: retain the existing numbered `.cursor/rules/*.mdc` files rather than duplicating the proposed rule names in Section 22. `docs/tasks/task-template.md` points to the existing canonical template; `docs/tasks/phase1-cursor-validation.md` specifies the native Cursor badge task. The earlier `phase-1-1-cursor-agent-validation.md` records rules setup, not completed Phase 1.2 implementation. Architecture documents distinguish future platform proposals from the implemented static sandbox. Sections 13–18 and 25–26 are preserved as supplied.
>
> Permission clarification: historical commits, connections, and previews are evidence only, not authorization to publish changes. Current work excludes forced audit fixes, commits, pushes, merges, and deployments. Do not run the sample `git remote -v` command if URLs could disclose credentials; inspect only sanitized host/repository identity when needed.

# PART I — BUSINESS CONTEXT

## 1. Purpose and Engineering Agent Instructions

This document preserves the MTG CONSULTING business vision, architectural strategy, technical decisions, Phase 0 validation evidence, and Phase 1 engineering objectives.

It provides a common source of context for Cursor Agent, Codex, Devin, and other authorized engineering agents.

The agent must:

1. Continue from the established Phase 0 baseline rather than rebuilding the environment.
2. Preserve the finalized application portfolio and business objectives.
3. Distinguish confirmed facts, proposals, and unknowns.
4. Inspect existing repository files before modifying them.
5. Follow approved Git branch boundaries.
6. Avoid duplicating functionality already implemented in existing applications.
7. Reuse approved architecture and infrastructure where appropriate.
8. Avoid introducing secrets or exposing sensitive configuration.
9. Never commit, push, merge, deploy, or modify production without authorization.
10. Provide evidence for validation and completion claims.

### Evidence classification

- **CONFIRMED:** Explicitly agreed business decisions or user-reported implementation and validation results.
- **PROPOSED:** Recommended architecture or implementation requiring approval.
- **UNKNOWN:** Unverified implementation details, unresolved decisions, or unavailable evidence.

The current frontend sandbox is an engineering validation environment, not the production SuperApp.

---

## 2. Business Vision and Objectives

**Status: CONFIRMED**

MTG CONSULTING is building a connected ecosystem of digital applications initially targeting Cameroon.

The business strategy is to establish reusable digital infrastructure supporting transportation, commerce, logistics, fulfillment, food delivery, and financial services.

The long-term vision includes expansion across Central and West Africa after establishing viable operations in Cameroon.

### Business objectives

- Digitize intercity transportation booking and ticketing.
- Reduce physical ticketing queues.
- Improve access to transportation information.
- Enable local parcel pickup and delivery.
- Create additional earning opportunities for drivers and riders.
- Improve parcel transportation between cities.
- Support merchants through digital commerce.
- Establish pickup and drop-off hubs.
- Address inconsistent physical addressing.
- Support food ordering and delivery.
- Preserve and expand MerryGO's financial contribution services.
- Build reusable customer, technology, and operational infrastructure.

### Long-term logistics objective

Develop a reliable nationwide delivery network capable of supporting next-day delivery between eligible locations.

This is a strategic target, not a currently implemented service-level commitment.

---

## 3. Finalized Application Portfolio

**Status: CONFIRMED**

| Application | Business domain |
|---|---|
| MTG CONSULTING | Parent organization and shared technology governance |
| TikiGo | Intercity bus booking and ticketing |
| SendAmGo | Parcel shipping, pickup, and delivery |
| SellaGO | Marketplace and merchant commerce |
| GoHub | Logistics hubs, pickup/drop-off, and fulfillment |
| MerryGO | Financial contributions, Njangi, and savings |
| DameGo | Food ordering and delivery |

These names supersede earlier proposals.

Do not substitute ParkaGo, PickAmGo, WakaGo, SabiGroup, or other exploratory names for the finalized portfolio.

### Application strategy

Each application should have:

- Its own brand and user experience.
- Clearly defined business responsibilities.
- Application-specific authorization.
- Domain-controlled business data.
- Defined APIs for external integration.
- Independent deployment capabilities where practical.

Shared infrastructure must not create unrestricted cross-application access.

---

## 4. Original Logistics and Market-Entry Strategy

**Status: CONFIRMED strategic direction**

The original logistics strategy developed in three stages.

### Stage 1 — TikiGo

Build relationships with existing bus operators and transportation agencies.

Objectives:

- Establish route and operator directories.
- Provide departure schedules.
- Support digital seat reservations.
- Enable ticket purchases.
- Reduce physical queues.
- Improve transportation visibility.
- Collect operational route and demand data.
- Introduce safety and service feedback capabilities.

Operator integration methods remain unresolved.

### Stage 2 — SendAmGo

Establish a verified pickup and delivery network.

Potential participants include:

- Motorcycle riders.
- Taxi drivers.
- Independent couriers.
- Transportation partners.
- Dedicated delivery personnel as demand grows.

Core capabilities:

- Pickup requests.
- Courier verification.
- Assignment and dispatch.
- Shipment tracking.
- Delivery confirmation.
- Partner earnings and settlement records.
- Customer notifications.

Manual dispatch may be appropriate during early operations.

### Stage 3 — GoHub

Create a physical network of pickup, drop-off, and distribution points.

Core capabilities:

- Parcel acceptance.
- Package identification.
- Secure storage.
- Intercity transfers.
- Customer collection.
- Courier handovers.
- Chain-of-custody tracking.
- Last-mile delivery coordination.

### Strategic relationship

TikiGo creates transportation relationships and route intelligence.

SendAmGo coordinates shipments and local pickup/delivery.

GoHub provides physical logistics infrastructure.

Together, these capabilities can support broader commerce and delivery services.

---

## 5. Cross-Application Integration Strategy

**Status: CONFIRMED direction; detailed workflows PROPOSED**

The applications should operate independently while exchanging authorized business information through defined APIs and events.

| Origin | Integration | Destination |
|---|---|---|
| SellaGO | Product fulfillment | SendAmGo |
| SellaGO | Customer collection | GoHub |
| DameGo | Food delivery | Local dispatch capability |
| TikiGo | Approved intercity parcel capacity | SendAmGo |
| SendAmGo | Parcel handovers | GoHub |
| GoHub | Final-mile delivery requests | SendAmGo |
| Participating apps | Authentication | Shared identity |
| Participating apps | Payment processing | Approved payment providers |
| MerryGO | Authorized identity federation | Shared identity |

### Example commerce workflow

1. Customer places an order through SellaGO.
2. SellaGO validates and records the transaction.
3. Payment is processed according to the approved payment workflow.
4. SellaGO requests fulfillment through SendAmGo.
5. SendAmGo creates a shipment and tracking identifier.
6. Dispatch assigns an eligible delivery partner.
7. Shipment events update authorized consumers.
8. GoHub participates if required.
9. Proof of delivery closes the shipment.

### Integration safeguards

- No direct cross-domain database writes.
- Explicit authorization for each operation.
- Idempotent transaction handling.
- Auditable state changes.
- Retry and reconciliation mechanisms.
- Controlled handling of failed payments and deliveries.
- No assumption that every order requires a hub.

---

# PART II — SHARED PLATFORM ARCHITECTURE

## 6. Architecture Principles

**Status: CONFIRMED direction**

The architecture must be:

- API-first.
- Modular.
- Domain-oriented.
- Secure by design.
- Cloud-ready.
- Incrementally deployable.
- Maintainable.
- Compatible with existing applications.

### Primary architectural principle

Applications must communicate through authorized service contracts rather than directly accessing each other's databases.

Shared services should be introduced where they provide measurable reuse, operational efficiency, or consistent security.

A separate microservice is not required for every logical domain.

### Proposed architecture

```text
MTG CONSULTING
|
+-- Shared Platform Capabilities
|   +-- Identity and Account Linking
|   +-- API Governance
|   +-- Notifications
|   +-- Payment Integrations
|   +-- Observability
|   +-- Engineering Standards
|
+-- Product Domains
|   +-- TikiGo
|   +-- SendAmGo
|   +-- SellaGO
|   +-- GoHub
|   +-- DameGo
|   +-- MerryGO
|
+-- Infrastructure
    +-- Source Control and CI/CD
    +-- Secrets Management
    +-- Deployment Environments
    +-- Logging and Monitoring
    +-- Backup and Recovery
```

This is a conceptual architecture, not a deployed infrastructure inventory.

---

## 7. Shared Identity and Authorization

**Status: CONFIRMED requirements; provider UNKNOWN**

The shared identity capability was previously discussed under the working name **DTAK Identity**.

The final identity service name and technology have not been approved.

### Requirements

- Immutable global user identifiers.
- Verified phone and email identifiers.
- Explicit account linking.
- Application-specific profiles.
- Separate customer, rider, merchant, and administrative roles.
- Organization-scoped authorization.
- Central security controls.
- Session revocation.
- Application-specific suspension.
- Consent-based cross-brand data sharing.
- Financial-service-specific verification.

### Identity conflict matrix

| Conflict | Required solution |
|---|---|
| Same phone number across applications | Verified account linking |
| Customer changes phone number | Preserve immutable user ID |
| Two people share a phone | Maintain separate identities |
| User is customer and rider | Separate roles and verification |
| User belongs to multiple merchants | Organization-scoped authorization |
| Account suspended in one application | Application-scoped suspension where appropriate |
| Identity compromised | Central session revocation |
| Applications collect different personal data | Application-specific consent and boundaries |
| MerryGO requires stronger verification | KYC and step-up authentication |

**Non-negotiable rule:** Never automatically merge identities solely because a name, phone number, or device matches.

### Identity provider evaluation

**Status: PROPOSED**

Evaluate standards-compliant identity providers:

- Keycloak.
- Amazon Cognito.
- Auth0.
- Zitadel.

The MVP should avoid implementing a custom authentication server without a compelling technical justification.

Provider selection remains unresolved.

---

## 8. API Architecture and Integration Standards

**Status: CONFIRMED API-first direction; implementation PROPOSED**

REST and GraphQL were considered.

The proposed default is REST with OpenAPI contracts for transactional workflows.

GraphQL may be adopted where specific application requirements justify it.

### Logical API domains

| Domain | Responsibilities |
|---|---|
| Identity | Authentication and account federation |
| Customer | Profiles and authorized account relationships |
| Booking | Bus routes, schedules, seat inventory, reservations |
| Commerce | Products, merchants, carts, orders |
| Food | Restaurants, menus, orders |
| Shipping | Quotes, shipments, tracking |
| Dispatch | Courier assignment and delivery execution |
| Hub | Hub locations, inventory, handovers |
| Payments | Payment processing, callbacks, refunds |
| Notifications | SMS, email, push |
| Financial Integration | Approved MerryGO operations |

### Required API standards

- Versioned contracts.
- Authentication and authorization.
- Explicit domain ownership.
- Idempotency.
- Request validation.
- Consistent error responses.
- Pagination and filtering.
- Correlation IDs.
- Audit logging.
- Rate limiting.
- Retry and timeout policies.
- Webhook signature verification.
- Replay protection.
- Backward compatibility.
- Contract testing.

### Integration patterns

| Pattern | Intended use |
|---|---|
| REST | Immediate transactional operations |
| Asynchronous events | Business state changes |
| Webhooks | External provider notifications |
| Scheduled synchronization | Legacy partner data exchange |
| Identity federation | Cross-application authentication |

The implementation should avoid unnecessary infrastructure complexity during the MVP.

---

## 9. Logistics Orchestration

**Status: PROPOSED architecture**

The logistics capability should coordinate physical fulfillment without owning unrelated commercial transactions.

### Responsibilities

- Shipment creation.
- Delivery quotations.
- Pickup assignment.
- Courier dispatch.
- Transport-leg coordination.
- Hub transfers.
- Tracking.
- Proof of delivery.
- Returns.
- Failed delivery handling.
- Dispute records.

### Proposed shipment lifecycle

```text
CREATED
  |
CONFIRMED
  |
PICKUP_ASSIGNED
  |
PICKED_UP
  |
IN_TRANSIT
  |
AT_HUB (optional)
  |
OUT_FOR_DELIVERY
  |
DELIVERED
```

Additional states must support cancellations, failed deliveries, returns, loss, and disputes.

### Chain of custody

Every custody transfer should identify:

- Shipment.
- Sending actor.
- Receiving actor.
- Location.
- Timestamp.
- Verification method.
- Supporting evidence.

### Operational considerations

The architecture must account for:

- Inconsistent street addressing.
- Shared and reassigned telephone numbers.
- Intermittent internet connectivity.
- Low-bandwidth devices.
- SMS fallback.
- Manual dispatch and exception handling.
- Driver verification.
- Liability and parcel disputes.

These considerations require operational validation.

---

## 10. Payments and MerryGO Financial Security

**Status: CONFIRMED financial separation; payment architecture PROPOSED; provider selection UNKNOWN**

### 10.1 Payment Integration Strategy

MTG CONSULTING requires a consistent approach to payment processing across participating applications while preserving each application's business ownership.

Potential payment use cases include:

- TikiGo ticket purchases and refunds.
- SendAmGo delivery charges.
- SellaGO marketplace purchases and merchant settlements.
- DameGo food orders and delivery payments.
- GoHub fulfillment and collection fees.
- MerryGO financial contributions and related transactions.

A shared payment integration capability may reduce duplicated provider integrations, but it must not create unrestricted access to financial records.

### 10.2 Proposed Payment Architecture

The payment integration layer should support:

1. Payment initiation.
2. Provider-specific payment adapters.
3. Payment confirmation.
4. Signed webhook processing.
5. Transaction idempotency.
6. Refund initiation and tracking.
7. Payment reconciliation.
8. Merchant settlements.
9. Courier payouts.
10. Audit logging.
11. Failed-payment recovery.
12. Duplicate callback protection.

Payment operations should use stable transaction identifiers and explicit authorization.

**PROPOSED:** Evaluate local mobile-money providers and card-payment services appropriate for Cameroon.

**UNKNOWN:** Approved providers, transaction fees, settlement arrangements, merchant-of-record responsibilities, and regulatory obligations.

### 10.3 MerryGO Financial Security Boundary

**Status: CONFIRMED architectural requirement**

MerryGO is an existing financial-domain application and must remain separately controlled.

The shared identity system may authenticate a MerryGO customer, but authentication alone must not authorize access to financial data or operations.

MerryGO must retain separate control over:

- Financial customer records.
- Njangi and contribution groups.
- Savings and contribution balances.
- Financial transactions.
- Financial authorization.
- Audit records.
- Financial verification requirements.

### 10.4 Additional Security Requirements

The target architecture must account for:

- Financial-service-specific KYC where legally required.
- Step-up authentication for sensitive operations.
- Strong encryption.
- Least-privilege authorization.
- Explicit customer consent.
- Financial transaction audit trails.
- Secure payment-provider integration.
- Independent financial data ownership.
- Controlled account linking.
- Session and credential compromise response.

A customer verified as a courier in SendAmGo must not automatically be treated as financially verified in MerryGO.

Similarly, a customer authorized to purchase a TikiGo ticket must not automatically be authorized to access MerryGO financial records.

### 10.5 Cross-Application Financial Integration

**Status: PROPOSED**

Future integrations may permit authorized payment or financial-service interactions between MerryGO and other MTG CONSULTING applications.

However:

- No unrestricted financial database access is permitted.
- Cross-brand financial access requires explicit authorization.
- Consent must be recorded where applicable.
- Regulatory requirements must be evaluated.
- Financial operations must remain auditable.
- The platform must not assume MerryGO is a universal wallet.

**UNKNOWN:** Whether MerryGO will eventually provide payment services to other applications.

This must remain a business and regulatory decision rather than an assumption made by engineering agents.

---

## 11. Existing MerryGO Architecture and Reuse Strategy

**Status: CONFIRMED existing application context; implementation details UNKNOWN until repository inspection**

### 11.1 Existing Repositories

MerryGO predates the MTG CONSULTING shared-platform initiative.

Previously identified GitHub repositories:

```text
https://github.com/MTGConsulting/merrygo.git
https://github.com/MTGConsulting/merrygo_app.git
https://github.com/MTGConsulting/merrygo_api.git
```

Earlier discussions identified Django and Flutter components.

The engineering agent must inspect the current repositories before treating their framework versions, code structure, or deployment configuration as verified.

### 11.2 Reuse Strategy

The agreed strategy is to evaluate existing MerryGO capabilities before building replacement services.

This applies particularly to:

- Authentication.
- Customer identity models.
- Financial workflows.
- Database schemas.
- API conventions.
- Docker configuration.
- Deployment automation.
- Security controls.
- Frontend architecture.

### 11.3 Required Architecture Audit

| Area | Engineering assessment |
|---|---|
| Authentication | Login, registration, tokens, account linking |
| Database | Schemas, relationships, migrations, ownership |
| Financial workflows | Njangi groups, contributions, balances, transaction handling |
| API architecture | REST/GraphQL, contracts, validation, authorization |
| Infrastructure | Docker, deployment, configuration, environments |
| Security | Encryption, secrets, access controls, audit logs |
| Frontend | Flutter application structure and reusable components |
| CI/CD | Existing pipelines, automated tests, deployment controls |

### 11.4 Repository Relationship Questions

**UNKNOWN:**

- Which Flutter repository is the authoritative MerryGO application?
- What responsibilities distinguish `merrygo` and `merrygo_app`?
- Which authentication provider is currently used?
- How are users identified across the application and API?
- Which financial operations are already implemented?
- Which databases and infrastructure are currently deployed?
- Which components can safely participate in shared identity federation?
- Which existing APIs can be reused without compromising financial boundaries?

These questions must be answered through repository inspection and documented findings.

### 11.5 Engineering Constraints

The frontend sandbox must not modify MerryGO source code.

MerryGO architecture assessment should initially be read-only.

Do not migrate databases, change authentication, rotate credentials, or alter financial business logic without a separately approved task.

### 11.6 Required Deliverable

**PROPOSED:**

```text
docs/architecture/merrygo-reuse-assessment.md
```

The assessment should identify:

- Existing capabilities.
- Reusable components.
- Integration constraints.
- Security gaps.
- Technical debt.
- Required architectural adaptations.
- Recommended next steps.

---

## 12. Engineering Toolchain and Integration Strategy

**Status: CONFIRMED toolchain direction; some agent workflows remain unvalidated**

### 12.1 Development Philosophy

MTG CONSULTING will use AI-assisted engineering to accelerate implementation while preserving human oversight and reviewable source control.

Cursor is the primary development environment.

GitHub is the canonical source-control platform.

The intended workflow combines specialized tools rather than requiring one agent to perform every task.

### 12.2 Platform Responsibilities

| Platform | Primary responsibility |
|---|---|
| ChatGPT | Business analysis, architecture, requirements, specifications |
| Cursor Agent | Interactive development, refactoring, debugging |
| Codex | Complex implementation, validation, independent code review |
| Devin | Autonomous engineering and delegated tasks |
| Figma | Design systems, components, prototypes |
| v0 | Frontend generation and UI iteration |
| GitHub | Source control, branches, pull requests, CI/CD |
| Vercel | Frontend previews and deployment |

### 12.3 Proposed Engineering Workflow

```text
Business Objective
        |
Requirements and Architecture
        |
Task Specification
        |
Figma / v0 / Engineering Agent
        |
Isolated Git Branch
        |
Cursor Agent or Devin
        |
Build / Lint / TypeScript / Tests
        |
Independent Codex Review
        |
GitHub Pull Request
        |
Vercel Preview Validation
        |
Human Approval
        |
Controlled Merge and Deployment
```

### 12.4 Multi-Agent Coordination

Engineering agents must:

- Read the same approved project context.
- Follow shared engineering rules.
- Use explicit task specifications.
- Respect branch boundaries.
- Avoid conflicting concurrent changes.
- Report implementation evidence.
- Request approval for high-impact operations.

The primary implementation agent should not be the only reviewer of its own changes.

### 12.5 Configuration Strategy

**CONFIRMED direction:**

Use shared engineering standards across repositories while preserving application-specific configuration.

Global development tools should not require separate installation for every application repository.

Repository-specific instructions may be stored in:

```text
AGENTS.md
.cursor/rules/
docs/tasks/
docs/architecture/
docs/decisions/
```

Global MCP configurations and local credentials must not be committed into application repositories.

### 12.6 Existing Integration Evidence

Phase 0 demonstrated:

- Cursor working against a WSL repository.
- Codex CLI and sidebar operation.
- GitHub branch synchronization.
- v0-generated frontend code.
- Vercel preview deployments.
- Build, lint, and TypeScript validation.

Devin and Figma were connected but their full engineering workflows remain Phase 1 validation objectives.

---

## 13. Local Development Environment

**Status: CONFIRMED through user-provided terminal evidence**

The Phase 0 development environment was established in Ubuntu WSL2, with the project stored in the Linux filesystem rather than under `/mnt/c`.

### Environment baseline

| Component | Validated configuration |
|---|---|
| Operating system | Ubuntu 20.04 LTS |
| Development environment | Windows Subsystem for Linux (WSL2) |
| IDE | Cursor connected to WSL |
| Node.js | v24.21.0 |
| npm | v11.19.0 |
| Node version manager | nvm v0.40.3 |
| Git | Upgraded from v2.25.1 to v2.50.1 |
| Docker | v29.8.2 reported |
| Codex CLI | v0.161.0 reported |
| Git hosting | GitHub |
| Deployment platform | Vercel |
| Frontend framework | Next.js 16.4.0 |
| Language | TypeScript |
| Styling | Tailwind CSS |

The agent must verify current versions before relying on them because local tooling may have changed.

### Repository location

```text
/home/camerudeboy/projects/MTGCONSULTING/mtg-frontend-sandbox
```

### GitHub repository

```text
https://github.com/MTGConsulting/mtg-frontend-sandbox.git
```

### Expected Phase 1 branch

```text
test/cursor-agent-validation
```

The branch was created from `v0/integration-dashboard` after confirming that the working tree was clean.

**Important:** Branch creation was confirmed, but the current branch, commit, and working-tree state must be rechecked before any new changes.

### Environment isolation

The Linux repository is the intended development workspace.

Avoid maintaining parallel working copies under Windows and WSL unless explicitly required.

Global Cursor configuration, repository-level Cursor rules, Codex configuration, and Git configuration are separate concerns.

Do not copy authentication tokens or secrets between Windows and WSL without an approved need and secure procedure.

---

## 14. Phase 0 Git Baseline and Branch History

**Status: CONFIRMED from reported Git outputs**

The following branches were involved in Phase 0:

| Branch | Purpose |
|---|---|
| `main` | Existing baseline and production deployment reference |
| `test/v0-integration` | Next.js scaffold and initial integration testing |
| `v0/integration-dashboard` | v0-generated dashboard and subsequent improvements |
| `test/cursor-agent-validation` | Phase 1 Cursor Agent validation |

### Recorded commits

| Commit | Description |
|---|---|
| `71e8906` | Validate Cursor → GitHub → Vercel deployment |
| `3c0d6c6` | Scaffold Next.js frontend integration sandbox |
| `4d693de` | Build responsive dark integration dashboard |

The dashboard branch subsequently received corrections addressing misleading verification claims, duplicated counts, and small labels.

The latest commit containing those corrections has not been independently established in this handoff.

### Branch governance

**CONFIRMED requirement:**

- Do not modify `main` during Phase 1 validation.
- Do not merge test branches into production without approval.
- Preserve the Phase 0 baseline.
- Keep agent-generated work isolated.
- Do not force-push or rewrite shared history without authorization.

### Initial verification commands

```bash
cd /home/camerudeboy/projects/MTGCONSULTING/mtg-frontend-sandbox

pwd
git branch --show-current
git status --short --branch
git log -5 --oneline
git remote -v
```

Expected branch:

```text
test/cursor-agent-validation
```

If the branch differs, stop and report the discrepancy before making changes.

Do not discard uncommitted work.

---

## 15. Phase 0 Frontend Baseline

**Status: CONFIRMED from implementation reports and screenshots**

The original repository contained a minimal static HTML integration test page.

During Phase 0, Codex migrated the application to Next.js while preserving the original visible content.

### Original application

```text
index.html
README.md
.gitignore
```

### Next.js scaffold

The following files were created during the migration:

```text
app/
  globals.css
  layout.tsx
  page.tsx

eslint.config.mjs
next.config.ts
next-env.d.ts
package.json
package-lock.json
postcss.config.mjs
tsconfig.json
```

The original `index.html` was removed after its visible content was migrated.

The existing README and Git configuration were preserved.

### Dashboard enhancements

The v0-generated dashboard introduced:

- A responsive dark interface.
- Six integration cards.
- Historical integration information.
- Demonstration-only status labels.
- A suggested engineering review workflow.
- Responsive layouts for mobile, tablet, and desktop.
- Accessible page structure and a skip-navigation link.

The subsequent improvement task introduced a typed integration dataset and revised status labels.

Reported relevant files include:

```text
app/integrations.ts
app/components/integration-grid.tsx
app/page.tsx
app/globals.css
app/layout.tsx
```

These paths should be verified against the current branch.

### Original content preservation

The migration and dashboard work were required to preserve the original integration test content, including the original verification text:

```text
Cursor + GitHub + Vercel integration verified — Test 2
```

This text represents a historical test record.

It must not be interpreted as a live verification result.

### Current dashboard behavior

The dashboard is a demonstration interface.

It does not currently provide verified real-time monitoring of:

- GitHub connections.
- Vercel deployment health.
- Cursor Agent activity.
- Codex activity.
- Devin execution.
- Figma integrations.

Do not display static values as current operational status.

---

## 16. Phase 0 Validation Evidence

**Status: CONFIRMED user-reported results**

### 16.1 Build and code validation

The following validations were reported as successful:

| Validation | Result |
|---|---|
| Next.js production build | PASS |
| TypeScript checks | PASS |
| ESLint | PASS |
| Tailwind compilation | PASS |
| Original content preservation | PASS |
| Generated HTML checks | PASS |

Initial local build issues involved Turbopack sandbox restrictions and TypeScript CLI configuration.

The implementation was adjusted to use a compatible Webpack build and TypeScript configuration.

These adjustments were reported to resolve the local validation failures.

### 16.2 GitHub integration

The following workflow was demonstrated:

1. Create or modify files locally.
2. Commit changes on a test branch.
3. Push the branch to GitHub.
4. Fetch and inspect remote branches.
5. Compare generated changes.
6. Preserve the production branch.

The `test/v0-integration` branch was pushed successfully.

The v0-generated dashboard branch was also confirmed on GitHub.

### 16.3 Vercel deployment

The initial Next.js deployment failed despite successful compilation.

The reported error was:

```text
Error: No Output Directory named "public" found
after the Build completed.
```

The failure was associated with an incompatible output-directory configuration inherited from the earlier static-site deployment.

After correcting the Vercel framework/output configuration, the Next.js deployment was reported as successful.

Subsequent screenshots showed a successful Preview deployment of the generated dashboard.

**CONFIRMED:** Preview deployment functionality was demonstrated.

**NOT CONFIRMED:** Production deployment of the final dashboard or approval to replace the existing production baseline.

### 16.4 v0 integration

v0 was used to:

- Import the existing GitHub repository.
- Generate the responsive dashboard.
- Work from the existing Next.js application.
- Create a separate feature branch.
- Commit and push generated changes.
- Preview the resulting interface.

The generated branch was:

```text
v0/integration-dashboard
```

This established evidence that v0-generated frontend changes could be synchronized to GitHub and deployed through the Vercel preview workflow.

### 16.5 Cursor and Codex

Codex was used for:

- Repository inspection.
- Next.js scaffolding.
- Build troubleshooting.
- TypeScript validation.
- Security dependency analysis.
- Independent dashboard code review.
- Recommended implementation corrections.

Cursor was primarily used as:

- The WSL-connected IDE.
- The source-code editor.
- The integrated terminal.
- The environment hosting the Codex extension.

**Important distinction:** Phase 0 did not fully validate Cursor's native Agent as an independent implementation agent.

This is a Phase 1 objective.

### 16.6 Devin and Figma

Devin and Figma were shown as connected tools within the development environment.

However:

- Devin was not validated through a complete delegated engineering task.
- Figma was not validated through a complete design-to-code workflow.

A successful connection does not prove end-to-end engineering functionality.

Both remain Phase 1 validation targets.

---

## 17. Phase 0 Accessibility and Responsive Testing

**Status: CONFIRMED through screenshots and user-reported manual checks**

### Responsive testing

The dashboard was visually inspected at several simulated viewport sizes.

| Viewport | Reported result |
|---|---|
| 360px mobile | PASS |
| 375px mobile | PASS |
| 412px mobile | PASS |
| 427px mobile | PASS |
| 768px tablet | PASS |
| 1032px tablet | PASS |
| 1280px desktop | PASS |

Observed behavior included:

- Single-column mobile layout.
- Multi-column tablet layout.
- Wider desktop layouts.
- Wrapping status labels.
- Readable card content.
- Responsive summary sections.

### Zoom testing

The user tested browser zoom at 200%.

The development workstation was reported as using:

```text
Display resolution: 4096 × 2160
Windows scaling: 150%
```

Browser zoom and Windows display scaling were treated as separate settings.

The user confirmed that the final horizontal overflow and zoom checks could be marked as passed.

### Keyboard testing

The following were tested:

- Visible keyboard focus.
- Skip-to-content link.
- Activating the skip link using Enter.
- Keyboard-only navigation.
- Absence of blocking keyboard-navigation behavior.

The user confirmed the remaining keyboard checks as passed.

### Accessibility conclusion

**Phase 0 accessibility smoke testing: PASS, based on user-reported manual validation.**

This does not constitute a comprehensive WCAG conformance audit.

Future production applications should receive automated and manual accessibility testing.

---

## 18. Phase 0 Security Findings

**Status: CONFIRMED from npm audit reports**

The production dependency audit returned:

```text
npm audit --omit=dev
found 0 vulnerabilities
```

The complete dependency audit reported five high-severity findings associated with a development dependency chain involving:

```text
braces
micromatch
fast-glob
@next/eslint-plugin-next
eslint-config-next
```

The findings were traced to the reported `braces` stack-exhaustion vulnerability.

At the time of the investigation:

- No compatible fix was identified.
- A forced dependency downgrade was not approved.
- No vulnerability suppression was introduced.
- Build, lint, and TypeScript checks passed.
- The affected packages were associated with development lint tooling.

### Security disposition

**Known inherited development-dependency risk — OPEN.**

The issue did not block the Phase 0 engineering smoke-test sign-off.

It must remain documented and be reassessed against current upstream advisories before production promotion.

Do not automatically execute:

```text
npm audit fix --force
```

without reviewing dependency compatibility and regression risk.

---

## 19. Phase 0 Completion Statement

**Status: CONFIRMED user-approved sign-off**

Phase 0 is considered complete for the purpose of establishing the frontend engineering integration baseline.

Validated capabilities include:

- WSL development environment.
- GitHub source control.
- Next.js frontend scaffolding.
- Codex-assisted implementation.
- v0-generated UI.
- GitHub synchronization.
- Vercel Preview deployment.
- Build and type validation.
- Responsive and accessibility smoke testing.

### Explicit limitations

Phase 0 did not establish:

- Production SuperApp architecture.
- Production shared identity.
- Operational logistics services.
- Live application integration monitoring.
- Production payment processing.
- Full Devin engineering validation.
- Full Cursor Agent validation.
- Full Figma design handoff.
- Comprehensive security certification.
- Production readiness for all six applications.
- Approval to merge the dashboard into `main`.

### 19.1 Outstanding Security Item

The inherited development-only lint dependency vulnerability remains unresolved.

The previously reported audit results were:

```text
npm audit --omit=dev
found 0 vulnerabilities
```

The full audit reported five high-severity findings associated with the development lint dependency chain involving `braces`, `micromatch`, `fast-glob`, `@next/eslint-plugin-next`, and `eslint-config-next`.

No compatible, non-breaking fix was identified during Phase 0.

The finding must remain documented and be reassessed against current upstream advisories before production promotion.

### 19.2 Phase 0 Sign-Off

**Phase 0: COMPLETE for engineering integration validation.**

The user approved completion after:

- Next.js build validation.
- TypeScript and lint validation.
- GitHub synchronization.
- v0-generated dashboard implementation.
- Vercel preview deployment.
- Mobile and tablet responsiveness testing.
- Desktop layout testing.
- 200% browser zoom testing.
- Horizontal overflow verification.
- Keyboard navigation and skip-link testing.

These results establish an engineering baseline.

They do not constitute production certification.

### 19.3 Transition to Phase 1

Phase 1 must continue from the validated Phase 0 repository and toolchain.

Do not recreate the sandbox or replace the existing dashboard without an approved objective.

Preserve the production `main` branch and maintain isolated test branches.

---

# PART IV — PHASE 1 ENGINEERING OBJECTIVES

## 20. Phase 1 Mission

**Status: CONFIRMED strategic objective**

Phase 1 establishes the reusable engineering and architecture foundation for the MTG CONSULTING SuperApp ecosystem.

The phase must accomplish two complementary objectives:

1. Establish a rules-driven, multi-agent engineering workflow.
2. Define the shared architecture required for the six applications to operate as an integrated ecosystem.

### 20.1 Engineering Objectives

- Standardize agent instructions.
- Define reusable task specifications.
- Validate Cursor Agent independently.
- Validate Devin autonomous execution.
- Establish Codex independent review.
- Validate Figma-to-v0 design handoff.
- Establish GitHub governance.
- Introduce repeatable CI/CD checks.
- Document engineering acceptance criteria.
- Preserve Phase 0 validation evidence.

### 20.2 Architecture Objectives

- Define shared identity requirements.
- Establish account-linking rules.
- Define API contracts and governance.
- Establish domain ownership.
- Design logistics orchestration.
- Define GoHub handover architecture.
- Establish payment integration boundaries.
- Preserve MerryGO's financial security boundary.
- Assess reusable MerryGO architecture.
- Define initial infrastructure standards.
- Identify the first MVP and its dependencies.

### 20.3 Phase Boundaries

Phase 1 does not authorize:

- Building all six production applications.
- Replacing existing MerryGO implementations.
- Deploying a production identity service.
- Implementing production payment processing.
- Creating operational logistics infrastructure.
- Migrating financial databases.
- Merging test work into `main` without approval.

### 20.4 Phase 1 Success Criteria

Phase 1 should be considered complete only when:

1. Shared engineering rules are established.
2. Cursor Agent completes a bounded implementation.
3. Devin completes a separately scoped validation task.
4. Codex independently reviews another agent's implementation.
5. Figma-to-v0 design handoff is demonstrated.
6. GitHub review and CI controls are validated.
7. The multi-agent workflow is documented.
8. Identity, API, logistics, and domain-boundary decisions are recorded.
9. Existing MerryGO assets are assessed sufficiently to inform integration decisions.
10. An initial MVP scope and architecture are approved.

---

## 21. Phase 1 Workstreams

**Status: CONFIRMED roadmap; individual deliverables pending**

### 21.1 Engineering Workstreams

| Workstream | Objective | Deliverable |
|---|---|---|
| 1.1 — Rules-driven engineering | Shared instructions and objectives | `AGENTS.md`, Cursor rules, task templates |
| 1.2 — Cursor Agent validation | Independent implementation | Tested component and validation report |
| 1.3 — Devin validation | Autonomous engineering assessment and implementation | Reviewed engineering output |
| 1.4 — Codex integration | Independent code review | Review findings and validation evidence |
| 1.5 — Figma + v0 | Design-to-code validation | Reusable component workflow |
| 1.6 — GitHub governance | Branch and quality controls | PR templates, CI checks, approval requirements |
| 1.7 — Multi-agent validation | End-to-end workflow | Tested engineering process |
| 1.8 — Engineering playbook | Organization-wide standards | Reusable development documentation |

### 21.2 Parallel Architecture Workstreams

| Workstream | Required deliverable |
|---|---|
| Product capability mapping | Application responsibilities and ownership |
| Shared identity | Global identifiers, account linking, roles, verification |
| API governance | Contract standards, versioning, authorization |
| Logistics orchestration | Shipment lifecycle, dispatch, transport legs |
| GoHub integration | Handover, custody, collection workflows |
| Payment architecture | Provider adapters, reconciliation, refunds |
| MerryGO integration | Reuse assessment and financial boundaries |
| Infrastructure | Environments, deployment, secrets, monitoring |
| Security | Access controls, encryption, audit requirements |
| MVP prioritization | Approved first product and initial operating scope |

### 21.3 Recommended Execution Order

**First — Engineering foundation**

Complete Phase 1.1:

- Inspect the current repository.
- Establish `AGENTS.md`.
- Establish Cursor project rules.
- Create reusable task specifications.
- Verify branch restrictions.
- Validate existing build and test commands.

**Second — Agent validation**

Complete Phase 1.2 and 1.3:

- Cursor Agent implementation.
- Independent Codex review.
- Devin repository assessment.
- Separately approved Devin implementation.

**Third — Design and delivery workflow**

Complete Phase 1.5 through 1.7:

- Figma design handoff.
- v0 frontend generation.
- GitHub review workflow.
- CI validation.
- Vercel preview.
- Multi-agent end-to-end test.

**Fourth — Architecture decisions**

Complete the required identity, API, logistics, payment, MerryGO, and infrastructure assessments.

These architecture workstreams may proceed in parallel with agent validation where they do not create conflicting changes.

**Fifth — MVP authorization**

Do not begin production MVP implementation until the initial product scope, required integrations, and major architecture decisions are approved.

### 21.4 Phase 1 Reporting

Each completed workstream must produce:

- Objective.
- Assigned owner or agent.
- Repository and branch.
- Work performed.
- Files created or modified.
- Validation evidence.
- Risks and unresolved issues.
- Approval requirements.
- Completion status.

### 21.5 Phase 1 Current Status

**CONFIRMED:**

- Phase 0 integration testing was signed off.
- The WSL repository and development toolchain were established.
- `test/cursor-agent-validation` was created.
- The rules-driven engineering approach was agreed.

**PROPOSED:**

- Shared instruction-file structure.
- Detailed API and logistics architecture.
- Multi-agent task ownership standards.
- CI/CD governance improvements.

**UNKNOWN / REQUIRES VERIFICATION:**

- Whether all Phase 1 rules files currently exist.
- Whether the Cursor Agent validation task has executed.
- Whether Devin has completed any Phase 1 work.
- Whether Figma design handoff has been validated.
- Whether an MVP product has been approved.
- Whether the identity provider and hosting architecture have been selected.

---

## 22. Phase 1.1 — Rules-Driven Engineering

**Status: CONFIRMED requirement; implementation pending verification**

### 22.1 Objective

Establish a reusable engineering instruction system that allows Cursor Agent, Codex, Devin, and other authorized engineering agents to work from consistent requirements.

The system must separate:

- **Business context:** Why MTG CONSULTING is building the applications.
- **Architecture decisions:** How systems and services should interact.
- **Engineering rules:** Standards that agents must follow.
- **Task objectives:** Specific work assigned to an agent.
- **Acceptance criteria:** Conditions required for successful completion.
- **Execution permissions:** Actions an agent may perform.
- **Validation evidence:** Proof that implementation requirements were satisfied.

The objective is to prevent agents from independently inventing conflicting architecture, duplicating work, or modifying production systems without authorization.

### 22.2 Proposed Repository Structure

The following structure should be established within the existing sandbox repository.

```text
mtg-frontend-sandbox/
│
├── AGENTS.md
│
├── .cursor/
│   └── rules/
│       ├── architecture.mdc
│       ├── engineering.mdc
│       └── security.mdc
│
├── docs/
│   ├── context/
│   │   └── project-handoff.md
│   │
│   ├── architecture/
│   │   ├── system-context.md
│   │   ├── domain-boundaries.md
│   │   ├── api-standards.md
│   │   └── identity-architecture.md
│   │
│   ├── tasks/
│   │   ├── task-template.md
│   │   └── phase1-cursor-validation.md
│   │
│   ├── decisions/
│   │   └── README.md
│   │
│   └── reviews/
│       └── README.md
│
├── app/
├── package.json
├── README.md
└── .gitignore
```

**Important:** This is the target structure, not a verified inventory of existing files.

Before creating files, the agent must inspect the repository and preserve any existing content.

### 22.3 AGENTS.md

**Status: PROPOSED implementation**

`AGENTS.md` should contain repository-level engineering instructions that compatible agents can consume.

It should establish:

1. Project identity and purpose.
2. Repository scope.
3. Approved architecture.
4. Branching constraints.
5. Security requirements.
6. Coding standards.
7. Testing requirements.
8. Documentation expectations.
9. Change-control requirements.
10. Agent reporting obligations.

#### Required baseline rules

- Preserve existing application behavior unless the task authorizes changes.
- Follow the architecture documented in the project handoff.
- Do not introduce secrets into source control.
- Do not access unrelated repositories without authorization.
- Do not modify production environments.
- Do not commit, push, merge, or deploy without approval.
- Avoid unnecessary dependencies.
- Follow existing code conventions.
- Use the active approved branch.
- Report all files changed.
- Run relevant validation checks.
- Document unresolved findings.

`AGENTS.md` should not duplicate the complete business handoff.

Instead, it should reference:

```text
docs/context/project-handoff.md
```

### 22.4 Cursor Project Rules

**Status: PROPOSED implementation**

Cursor-specific instructions should be maintained under:

```text
.cursor/rules/
```

Recommended responsibilities:

| Rule | Responsibility |
|---|---|
| `architecture.mdc` | Architectural boundaries and design principles |
| `engineering.mdc` | Coding, testing, documentation, and implementation standards |
| `security.mdc` | Secrets, authorization, data protection, and change restrictions |

Cursor rules should use the rule metadata and activation behavior supported by the installed Cursor version.

Rules must not conflict with `AGENTS.md`.

### 22.5 Organization-Wide Versus Repository Rules

**Status: CONFIRMED architectural direction**

MTG CONSULTING will operate multiple repositories.

The engineering standard must distinguish between global and repository-specific requirements.

#### Organization-wide standards

Examples:

- Secrets handling.
- Git governance.
- Review requirements.
- Agent permissions.
- Security principles.
- Documentation standards.
- Validation evidence.

#### Repository-specific standards

Examples:

- Next.js frontend conventions.
- Django API conventions.
- Flutter application architecture.
- Database migration procedures.
- Product-specific authorization.
- Domain-specific business rules.

A MerryGO Django API must not automatically inherit Next.js-specific rules from the frontend sandbox.

Shared standards should be distributed through an approved template or versioned configuration mechanism.

The implementation mechanism remains to be selected.

### 22.6 Task Specification Template

**Status: PROPOSED**

Create:

```text
docs/tasks/task-template.md
```

Every engineering task should contain:

```markdown
# Engineering Task

## Objective
Describe the required outcome.

## Business Context
Explain why the change is needed.

## Repository and Branch
Identify the approved working location.

## Scope
Define what may be changed.

## Out of Scope
Define what must remain unchanged.

## Requirements
List functional and technical requirements.

## Architecture Constraints
Reference applicable decisions and standards.

## Acceptance Criteria
Define measurable completion conditions.

## Validation
Specify required tests and checks.

## Deliverables
List required files and documentation.

## Permissions
Define whether commits, pushes, merges,
deployments, or external actions are allowed.

## Risks and Unknowns
Record unresolved issues.

## Completion Report
Summarize implementation and evidence.
```

### 22.7 Architecture Decision Records

**Status: PROPOSED**

Architectural decisions should be recorded separately from task instructions.

Each decision record should include:

- Decision identifier.
- Title.
- Status.
- Business context.
- Technical context.
- Options considered.
- Selected approach.
- Rationale.
- Consequences.
- Security implications.
- Reversal or migration considerations.

Proposed initial decision topics:

1. Shared identity architecture.
2. REST versus GraphQL API strategy.
3. Modular backend versus microservices.
4. Domain data ownership.
5. Logistics orchestration.
6. Event processing.
7. Payment provider integration.
8. MerryGO identity federation.
9. Cloud hosting.
10. Mobile application framework.

**Do not mark an architecture decision as approved solely because it appears in this list.**

### 22.8 Phase 1.1 Acceptance Criteria

Phase 1.1 is complete when:

- `AGENTS.md` exists and accurately references the project.
- Cursor project rules are valid and recognized.
- The task specification template exists.
- The project handoff is complete.
- Rules do not conflict.
- No credentials or secrets are committed.
- The active branch is correct.
- Existing application behavior is preserved.
- Build, lint, and TypeScript checks pass.
- Changes are reviewed before commit or push.

**Current disposition: PENDING IMPLEMENTATION VERIFICATION.**

---

## 23. Multi-Agent Engineering Responsibility Model

**Status: CONFIRMED toolchain direction; operational allocation PROPOSED**

### 23.1 Objective

Establish a coordinated development process that uses the strengths of Cursor, Codex, Devin, v0, and Figma without unnecessary duplication.

Phase 0 relied primarily on Codex for implementation and review.

Phase 1 must validate the other engineering agents independently.

### 23.2 Agent Responsibilities

| Platform | Primary responsibility |
|---|---|
| ChatGPT | Business strategy, architecture, specifications |
| Cursor Agent | Interactive coding, refactoring, debugging |
| Codex | Complex implementation, testing, independent review |
| Devin | Autonomous investigation and delegated engineering |
| v0 | Frontend UI generation and design iterations |
| Figma | Design systems, components, prototypes |
| GitHub | Canonical source control and review |
| Vercel | Frontend preview and deployment validation |

These responsibilities are defaults, not exclusive limitations.

An agent may perform additional work when explicitly authorized.

### 23.3 Task Ownership

Every engineering task should have one primary implementation owner.

The task specification should identify:

- Assigned agent.
- Approved repository.
- Approved branch.
- Allowed files.
- Required deliverables.
- Validation requirements.
- Review responsibility.
- Commit and deployment permissions.

Avoid assigning the same implementation task simultaneously to Cursor and Devin unless the purpose is an explicitly controlled comparison.

### 23.4 Independent Review

Significant implementation work should be reviewed independently.

Examples:

- Cursor implements; Codex reviews.
- Devin implements; Codex reviews.
- v0 generates UI; Cursor integrates and Codex reviews.
- Codex implements; Cursor or another authorized reviewer evaluates.

The implementation agent must not be treated as the sole authority on its own correctness.

### 23.5 Agent Execution Boundaries

Agents must not:

- Modify unrelated repositories.
- Access financial records without authorization.
- Change production configuration.
- Create or expose secrets.
- Disable security checks to achieve passing builds.
- Rewrite shared Git history.
- Merge into protected branches.
- Deploy production applications without approval.
- Claim tests passed without evidence.

### 23.6 Model Selection Strategy

**Status: PROPOSED**

Model selection should be based on:

- Task complexity.
- Coding capability.
- Reasoning requirements.
- Context size.
- Execution speed.
- Cost.
- Tool compatibility.
- Review independence.

Suggested approach:

| Task | Preferred execution |
|---|---|
| Small UI changes | Cursor Agent |
| Complex backend engineering | Codex or qualified Cursor model |
| Autonomous repository assessment | Devin |
| UI generation | v0 |
| Architecture review | High-reasoning agent |
| Security review | Independent reviewer |
| Database and migration work | Agent with appropriate database expertise |

Exact model versions should be selected from the models available in the connected platforms.

Do not assume that a model available in Devin is automatically available in Cursor.

### 23.7 Branch Isolation

**Status: CONFIRMED requirement**

Each independent implementation task should use an approved branch.

Examples:

```text
test/cursor-agent-validation
test/devin-agent-validation
v0/integration-dashboard
```

Do not allow independent agents to overwrite each other's work.

Shared changes should be integrated through reviewable Git operations.

### 23.8 Reporting Requirements

Every agent must provide:

1. Task objective.
2. Repository and branch.
3. Files inspected.
4. Files modified.
5. Implementation summary.
6. Validation commands.
7. Test results.
8. Security findings.
9. Outstanding issues.
10. Actions requiring human approval.

### 23.9 Completion Criteria

The multi-agent responsibility model is validated when:

- Cursor Agent completes a bounded implementation.
- Devin completes a separately scoped assignment.
- Codex performs independent review.
- v0-generated code is integrated through GitHub.
- Figma design handoff is exercised.
- GitHub and Vercel validation succeeds.
- Production remains protected.
- Engineering evidence is documented.

**Current disposition: PARTIALLY VALIDATED.**

---

## 24. Phase 1.2 — Cursor Agent Validation

**Status: APPROVED TASK; EXECUTION RESULT NOT YET VERIFIED**

### 24.1 Objective

Validate Cursor's native Agent as an independent implementation tool.

The test must demonstrate that Cursor Agent can:

- Read repository instructions.
- Understand a task specification.
- Inspect existing code.
- Implement a scoped change.
- Follow branch restrictions.
- Execute relevant tests.
- Report implementation evidence.

This task must use Cursor's native Agent, not the Codex extension.

### 24.2 Repository and Branch

Repository:

```text
/home/camerudeboy/projects/MTGCONSULTING/mtg-frontend-sandbox
```

Expected branch:

```text
test/cursor-agent-validation
```

The branch was created from:

```text
v0/integration-dashboard
```

The agent must verify the current branch and working tree before making changes.

### 24.3 Assigned Objective

Create a reusable `IntegrationStatusBadge` component for the existing integration dashboard.

The component should display historical and demonstration-only integration statuses.

### 24.4 Functional Requirements

- Reuse the existing typed integration dataset.
- Preserve all six integration cards.
- Preserve existing dashboard content.
- Support historical and demonstration statuses.
- Avoid duplicated status logic.
- Maintain the current visual design.
- Maintain responsive behavior.
- Preserve accessibility features.

### 24.5 Technical Requirements

- TypeScript.
- Existing Next.js App Router architecture.
- Existing Tailwind CSS configuration.
- No new dependencies.
- No external API calls.
- No authentication changes.
- No database changes.
- No secrets.
- No unrelated refactoring.

### 24.6 Scope

The implementation may modify the dashboard component structure and related typed data definitions where necessary.

Changes outside the approved component and its immediate integration points require explanation and authorization.

### 24.7 Out of Scope

- Production SuperApp development.
- MerryGO repository modifications.
- Shared identity implementation.
- Logistics APIs.
- Payment integrations.
- Production deployment.
- GitHub branch merges.
- Infrastructure changes.

### 24.8 Acceptance Criteria

| Requirement | Expected result |
|---|---|
| Reusable badge component | Implemented |
| Typed integration data | Reused |
| Duplicate status logic | Reduced |
| Original content | Preserved |
| Responsive layout | Preserved |
| Accessibility | Preserved |
| Next.js build | PASS |
| TypeScript | PASS |
| ESLint | PASS |
| Branch isolation | PASS |
| Unauthorized deployment | None |

### 24.9 Execution Permissions

Cursor Agent may:

- Read repository files.
- Modify approved application files.
- Run non-destructive development commands.
- Run build, lint, and TypeScript validation.
- Report implementation findings.

Cursor Agent must not:

- Commit.
- Push.
- Merge.
- Deploy.
- Modify production.
- Install new dependencies without approval.
- Modify unrelated repositories.

### 24.10 Required Completion Report

The agent must return:

```text
Task: Cursor Agent Validation
Repository: mtg-frontend-sandbox
Branch: test/cursor-agent-validation

Implementation:
- Files created:
- Files modified:
- Functional changes:

Validation:
- Build:
- Lint:
- TypeScript:
- Accessibility:
- Git status:

Security:
- New dependencies:
- New vulnerabilities:
- Secrets introduced:

Outstanding issues:
- ...

Commit/push/deployment:
- Not performed
```

### 24.11 Independent Review

After Cursor Agent completes implementation, Codex should review the changes.

The review must evaluate:

- Requirements compliance.
- TypeScript correctness.
- Component reusability.
- Code quality.
- Accessibility.
- Responsive behavior.
- Security.
- Dependency changes.
- Branch isolation.

Codex should not modify files during the initial review.

### 24.12 Completion Criteria

Phase 1.2 is complete when:

1. Cursor Agent successfully reads the applicable rules.
2. The component is implemented within scope.
3. Required automated checks pass.
4. Codex independently reviews the implementation.
5. Findings are resolved or explicitly accepted.
6. The repository remains on an approved branch.
7. No unauthorized commit, push, merge, or deployment occurs.
8. Validation evidence is recorded.

**Current disposition: PENDING CURSOR AGENT EXECUTION AND REVIEW.**

---

## Phase 1 Continuation

Following completion of Phase 1.2, proceed to Section 25 (Devin validation) and Section 26 (Codex independent-review workflow). Both workstreams must follow the shared engineering rules and remain isolated from production. Successful agent validation does not authorize production SuperApp implementation. Identity, API, logistics, financial, and domain-boundary decisions must be documented and approved before beginning the production MVP.

---

## 25. Phase 1.3 — Devin Validation

**Status: PLANNED — Connection established; independent engineering execution not yet validated**

### 25.1 Objective

Validate Devin as an autonomous engineering agent within the MTG CONSULTING development environment.

Devin must demonstrate the ability to inspect an existing repository, interpret project objectives, follow engineering rules, identify architectural gaps, execute bounded tasks, and produce reviewable deliverables.

This validation must establish whether Devin can reliably participate in the shared engineering workflow alongside Cursor, Codex, GitHub, v0, and Vercel.

**Important:** Devin's successful connection to Cursor or GitHub does not constitute successful engineering validation.

### 25.2 Existing Integration Context

**CONFIRMED from previous configuration and user reports:**

- Devin was configured as an MCP integration in the development environment.
- Cursor displayed Devin as a connected MCP server.
- The integration exposed 24 tools at the time of inspection.
- Devin has previously been used with objectives stored in reusable rules or instruction files.

**UNKNOWN:**

- Whether Devin currently has access to the intended MTG CONSULTING repository.
- Whether Devin can read the new Phase 1 engineering rules.
- Whether Devin has permission to create branches or pull requests.
- Whether Devin's GitHub permissions are appropriately restricted.
- Whether Devin can execute the complete proposed workflow without manual intervention.

These must be validated rather than assumed.

### 25.3 Proposed Initial Assignment

Devin should receive a bounded repository assessment task that does not conflict with Cursor's implementation.

**Task:** MTG CONSULTING Phase 1 Engineering Readiness Assessment

Repository:

```text
https://github.com/MTGConsulting/mtg-frontend-sandbox.git
```

Reference branch:

```text
test/cursor-agent-validation
```

Devin must inspect the reference branch without modifying it.

#### Required activities

1. Inspect repository structure and application architecture.
2. Read `AGENTS.md`, applicable engineering rules, and project context documents.
3. Review the Phase 0 baseline and validation evidence.
4. Examine the existing Next.js, TypeScript, and Tailwind configuration.
5. Identify missing engineering standards and architectural documentation.
6. Review existing test coverage and CI/CD readiness.
7. Assess API integration readiness without inventing backend services.
8. Identify security, dependency, and maintainability concerns.
9. Recommend improvements needed before developing production applications.
10. Produce a structured assessment distinguishing confirmed findings, recommendations, and unknowns.

The initial task must be read-only.

Devin must not modify application code, install dependencies, change configuration, or create deployments during this assessment.

### 25.4 Expected Assessment Deliverable

**Proposed document:**

```text
docs/reviews/phase1-devin-readiness-assessment.md
```

The assessment should contain:

- Executive summary.
- Repository and branch identification.
- Current architecture inventory.
- Existing engineering capabilities.
- Phase 0 evidence reviewed.
- Rules and documentation coverage.
- API and integration readiness.
- CI/CD and testing gaps.
- Security findings.
- Technical debt.
- Recommended remediation priorities.
- Risks and unresolved questions.
- Proposed next engineering tasks.

For the initial read-only task, Devin should return the report as task output rather than writing it to the repository.

The report may be saved to the proposed document path after review and authorization.

### 25.5 Acceptance Criteria

| Validation | Required result |
|---|---|
| Repository identification | Correct MTG CONSULTING repository |
| Branch identification | Correct reference branch |
| Instruction compliance | Follows available engineering rules |
| Architecture assessment | Accurately describes the existing implementation |
| Evidence quality | Distinguishes observed facts from assumptions |
| Security review | Identifies existing risks without exposing secrets |
| Integration assessment | Identifies actual and missing integrations |
| Documentation | Produces a structured engineering report |
| Branch protection | Does not modify `main` or the reference branch |
| Scope control | No unauthorized file modifications |
| Deployment safety | No unauthorized deployments |
| Review readiness | Results can be independently assessed by Codex or a human reviewer |

### 25.6 Second Validation — Autonomous Implementation

**Status: PROPOSED; requires approval after the initial assessment**

Once Devin successfully completes the read-only assessment, assign a small implementation task on a separate feature branch.

Suggested branch:

```text
test/devin-agent-validation
```

The implementation should be isolated from Cursor Agent's work.

Potential tasks include:

- Creating a reusable task specification template.
- Adding non-destructive CI validation.
- Improving engineering documentation.
- Implementing a small test utility.
- Adding approved automated checks.

Devin must:

1. Create or use an approved isolated branch.
2. Read applicable engineering rules.
3. Implement only the authorized scope.
4. Run required validation.
5. Report all changed files.
6. Explain implementation decisions.
7. Identify unresolved issues.
8. Avoid production deployments.
9. Request authorization before committing, pushing, or opening a pull request.

### 25.7 Independent Review

Codex should independently review Devin's implementation.

The review must evaluate:

- Requirement compliance.
- Code correctness.
- Maintainability.
- Security.
- Test coverage.
- Architectural consistency.
- Unnecessary dependencies.
- Unauthorized modifications.
- Git branch isolation.

Any findings must be documented before the work is considered accepted.

### 25.8 Multi-Agent Coordination Rules

Devin, Cursor, and Codex must not independently modify the same files at the same time without an explicit coordination plan.

Recommended responsibility boundaries:

| Agent | Responsibility |
|---|---|
| Devin | Autonomous investigation and bounded implementation |
| Cursor Agent | Interactive development and integration |
| Codex | Independent review, testing, complex engineering |
| Human project owner | Scope approval, architectural decisions, merge authorization |

For independent implementation tasks, each agent should use its own feature branch.

Shared documentation should be updated through reviewed changes rather than uncontrolled concurrent edits.

### 25.9 Required Validation Evidence

Before marking Devin integration as passed, record:

```text
Agent: Devin
Repository: MTGConsulting/mtg-frontend-sandbox
Reference branch: test/cursor-agent-validation
Task: Phase 1 Engineering Readiness Assessment
Execution status: PENDING
Instruction compliance: PENDING
Assessment delivered: PENDING
Independent review: PENDING
Unauthorized modifications: NOT YET CHECKED
```

The final validation record must include actual execution results, relevant task references, and reviewer findings.

### 25.10 Completion Criteria

**Phase 1.3 is complete only when:**

1. Devin successfully performs the repository assessment.
2. Devin demonstrates compliance with the shared engineering instructions.
3. A separately approved implementation task is completed on an isolated branch.
4. Automated validation passes or documented failures are accepted.
5. Codex or a human reviewer independently evaluates the implementation.
6. No unauthorized production changes occur.
7. Results are documented in the engineering handoff or validation records.

**Current disposition: PENDING VALIDATION.**

Devin connectivity has been observed, but autonomous engineering readiness has not yet been demonstrated in this Phase 1 workflow.

---

## 26. Phase 1.4 — Codex Integration

**Status: PARTIALLY VALIDATED IN PHASE 0**

Codex has already demonstrated repository inspection, Next.js implementation, build troubleshooting, TypeScript validation, and independent code review.

Phase 1 must establish Codex as a controlled participant in the shared rules-driven engineering workflow.

### Required objectives

- Read and follow repository-level `AGENTS.md` instructions.
- Respect approved branch and file boundaries.
- Review code implemented by Cursor Agent and Devin.
- Validate architecture and security requirements.
- Run applicable automated tests.
- Produce evidence-based review findings.
- Distinguish blocking defects from recommendations.
- Avoid modifying implementation files during read-only reviews.
- Request authorization before committing, pushing, merging, or deploying.

### Proposed review workflow

```text
Engineering objective
        |
Cursor Agent or Devin
        |
Implementation branch
        |
Build / Lint / TypeScript / Tests
        |
Independent Codex review
        |
Human approval
        |
GitHub Pull Request
        |
Vercel Preview validation
        |
Approved merge
```

### Completion criteria

Codex must successfully review at least one Phase 1 implementation produced by another agent, identify any material defects or confirm their absence within the review scope, and produce a documented assessment.

A successful review does not automatically authorize merging or deploying changes.

**Current disposition: Phase 0 capability validated; Phase 1 independent-review workflow pending.**
