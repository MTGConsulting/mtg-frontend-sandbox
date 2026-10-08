# Identity architecture constraints

Source: [handoff](../context/project-handoff.md), Sections 7 and 10, including the supplied financial-security continuation.

Shared identity is a business requirement, not an implemented service. DTAK Identity is a working name only. Provider selection and account-linking implementation remain unresolved.

Confirmed requirements include immutable user IDs, verified identifiers, explicit account linking, application-specific profiles and suspension, organization-scoped authorization, central session revocation, and consent-based cross-brand sharing. Never merge accounts solely because names, phone numbers, or devices match. Shared/reassigned phones and multiple roles must be supported without conflating people or permissions.

MerryGO retains separate financial records and financial-service-specific authorization. Stronger verification and step-up authentication may be required; shared identity does not authorize access to financial records. No legal/regulatory compliance assessment is asserted here.

Keycloak, Cognito, Auth0, and Zitadel are proposed evaluation candidates only. No provider, vendor contract, or custom authentication server is approved by this document. Record selection and security tradeoffs through [decision records](../decisions/README.md).

No authentication work is in scope for the dashboard validation. Do not access MerryGO repositories, accounts, or financial data without separate authorization.
