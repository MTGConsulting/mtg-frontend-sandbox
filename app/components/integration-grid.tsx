import { formatCount, integrationCounts, integrations } from "../integrations";
import { IntegrationStatusBadge } from "./integration-status-badge";

export function IntegrationGrid() {
  return (
    <section aria-labelledby="integrations-heading" id="integrations">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h2 id="integrations-heading" className="text-xl font-semibold tracking-tight">Your integrations</h2>
            <span className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-xs text-muted">{formatCount(integrationCounts.total)}</span>
          </div>
          <p className="text-sm text-muted">One workspace. Every step of the development lifecycle.</p>
        </div>
        <span className="text-xs text-muted">Static sandbox status · Not live monitoring</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integration) => (
          <article key={integration.name} className="group flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/40">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
              <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-canvas font-mono text-sm font-semibold tracking-tight text-foreground">{integration.initials}</span>
              <IntegrationStatusBadge status={integration.status} />
            </div>
            <p className="mb-2 font-mono text-xs tracking-[0.14em] text-muted">{integration.category}</p>
            <h3 className="text-lg font-semibold tracking-tight">{integration.name}</h3>
            <p className="mb-6 mt-2 flex-1 text-sm leading-relaxed text-muted">{integration.description}</p>
            <div className="flex items-center gap-2 border-t border-line pt-4 text-xs text-muted"><span aria-hidden="true" className="text-accent">↳</span>{integration.detail}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
