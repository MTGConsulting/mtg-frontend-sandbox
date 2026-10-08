# API standards and unresolved decisions

Source: [handoff](../context/project-handoff.md), Sections 5, 6, and 8.

API-first, domain-owned contracts are the confirmed direction. REST with OpenAPI is the proposed default, not a completed provider/framework decision. GraphQL is an option when justified. No API is implemented by this static dashboard.

Future approved API work must specify:

- Versioned contracts, ownership, authorization, request validation, and compatibility expectations.
- Idempotency for repeated transactional requests; bounded retries/timeouts and reconciliation behavior.
- Consistent errors, pagination, filtering, correlation IDs, audit logging, and rate limits.
- Webhook signatures, replay protection, and safe handling of duplicate/out-of-order events.
- Contract tests and failure-path evidence, including payment/delivery exceptions.

Immediate operations may use REST; state changes may use events; provider callbacks may use webhooks. Transport, broker, gateway, schema, and provider choices are unresolved. Avoid introducing infrastructure solely because a pattern is listed here.

Record approved choices in [decision records](../decisions/README.md). Do not add API routes, credentials, network calls, or payment integrations during the Cursor badge task.
