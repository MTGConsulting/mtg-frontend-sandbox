const integrations = [
  { name: "GitHub", initials: "GH", category: "SOURCE CONTROL", description: "A shared source of truth for generated code, feature branches, and pull requests.", status: "Baseline verified", detail: "Repository synchronization", verified: true },
  { name: "Vercel", initials: "VE", category: "PREVIEW & DELIVERY", description: "Review changes in an isolated preview before promoting anything to production.", status: "Baseline verified", detail: "Preview deployment", verified: true },
  { name: "Cursor", initials: "CU", category: "AI CODE EDITOR", description: "Explore the codebase, refine generated components, and review changes in context.", status: "Baseline verified", detail: "Editor integration", verified: true },
  { name: "Codex", initials: "CX", category: "CODE REVIEW", description: "Validate generated code and review implementation details alongside your team.", status: "Awaiting review", detail: "Sandbox validation", verified: false },
  { name: "Devin", initials: "DV", category: "ENGINEERING AGENT", description: "Evaluate agent-assisted development within the sandbox review workflow.", status: "Not verified", detail: "Integration evaluation", verified: false },
  { name: "Figma", initials: "FI", category: "DESIGN HANDOFF", description: "Keep design intent and frontend implementation aligned through visual review.", status: "Not verified", detail: "Design-to-code workflow", verified: false },
];

export function IntegrationGrid() {
  return (
    <section aria-labelledby="integrations-heading" id="integrations">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h2 id="integrations-heading" className="text-xl font-semibold tracking-tight">Your integrations</h2>
            <span className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-xs text-muted">06</span>
          </div>
          <p className="text-sm text-muted">One workspace. Every step of the development lifecycle.</p>
        </div>
        <span className="text-xs text-muted">Static sandbox status · Not live monitoring</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integration) => (
          <article key={integration.name} className="group flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/40">
            <div className="mb-6 flex items-center justify-between gap-2">
              <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl border border-line bg-canvas font-mono text-sm font-semibold tracking-tight text-foreground">{integration.initials}</span>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${integration.verified ? "border-success/20 bg-success/5 text-success" : "border-line bg-canvas text-muted"}`}>
                <span className={`size-1.5 rounded-full ${integration.verified ? "bg-success" : "bg-muted"}`} />
                {integration.status}
              </span>
            </div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.14em] text-muted">{integration.category}</p>
            <h3 className="text-lg font-semibold tracking-tight">{integration.name}</h3>
            <p className="mb-6 mt-2 flex-1 text-sm leading-relaxed text-muted">{integration.description}</p>
            <div className="flex items-center gap-2 border-t border-line pt-4 text-xs text-muted"><span aria-hidden="true" className="text-accent">↳</span>{integration.detail}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
