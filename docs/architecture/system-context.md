# System context

Source: [project handoff](../context/project-handoff.md), Sections 2–6 and 15. Business direction is user-confirmed; the platform diagram is conceptual. Unknowns and proposed decisions remain explicitly classified.

## Implemented sandbox

This repository implements a static Next.js integration dashboard only. Its typed records are historical or demonstration data. There are no implemented product backends, shared identity provider, payment services, logistics APIs, or live integration checks here. See the [repository architecture standard](../standards/architecture.md).

## Confirmed business direction

MTG CONSULTING governs TikiGo (bus ticketing), SendAmGo (shipping), SellaGO (commerce), GoHub (physical logistics), MerryGO (financial contributions), and DameGo (food ordering). Initial market focus is Cameroon. Nationwide next-day delivery is a strategic target, not an existing service guarantee.

Applications should retain domain ownership and communicate through authorized contracts. Shared capabilities may cover identity, notifications, payments, observability, and API governance. Logical domains do not require separate microservices.

## Proposed, not deployed

Shared platform capabilities connect independently governed product domains through APIs/events. Hosting, provider selection, deployment topology, and organization-wide standards distribution are unresolved. Do not select vendors or implement this conceptual architecture under the dashboard validation task.

Decisions require recorded approval in [decision records](../decisions/README.md). Do not inspect or change other repositories without authorization.
