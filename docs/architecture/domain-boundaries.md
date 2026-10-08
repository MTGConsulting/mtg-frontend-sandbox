# Domain boundaries

Source: [handoff](../context/project-handoff.md), Sections 3–6, 9–10. The following captures intended ownership, not an inventory of deployed services.

| Domain | Owns | Boundary |
| --- | --- | --- |
| TikiGo | Routes, reservations, ticketing | Operator integration remains unresolved |
| SendAmGo | Shipments and delivery coordination | Does not own merchant orders or financial accounts |
| SellaGO | Merchant commerce and orders | Requests fulfillment through authorized contracts |
| GoHub | Hub inventory and custody handovers | Does not imply every shipment uses a hub |
| DameGo | Food ordering | Requests delivery through an approved dispatch workflow |
| MerryGO | Financial contributions and financial customer records | Separate financial authorization and verification |
| Shared identity (proposed capability) | Global identity and explicit account linking | Does not grant unrestricted cross-application access |

No direct cross-domain database writes. Require operation-specific authorization, auditable state transitions, and reconciliation for cross-domain transactions. Shipment custody records should identify actors, location, time, verification, and evidence.

These are platform design constraints. No corresponding data stores, API clients, or runtime services are authorized for this frontend validation phase. Shared dispatch ownership, data retention, and contract details require future decisions.
