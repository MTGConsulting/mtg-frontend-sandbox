import { IntegrationGrid } from "./components/integration-grid";
import { formatCount, integrationCounts } from "./integrations";

const stats = [
  {
    value: integrationCounts.total,
    label: "Integrations in scope",
    note: "Included in this demonstration",
  },
  {
    value: integrationCounts.historical,
    label: "Historical records",
    note: "Referenced by the original sandbox text",
  },
  {
    value: integrationCounts.demonstration,
    label: "Demonstration entries",
    note: "No verification evidence recorded",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded focus:bg-accent focus:p-3 focus:text-canvas">Skip to content</a>
      <header className="border-b border-line bg-surface/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-10">
          <div className="flex items-center gap-3">
            <div aria-hidden="true" className="flex size-9 items-center justify-center rounded-lg bg-accent text-sm font-black tracking-tighter text-canvas">M.</div>
            <h1 className="text-sm font-bold tracking-[0.12em]">MTG CONSULTING</h1>
            <span aria-hidden="true" className="mx-2 hidden text-line sm:block">/</span>
            <span className="hidden text-sm text-muted sm:block">Developer workspace</span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-md border border-accent/20 bg-accent/5 px-2.5 py-1 font-mono text-xs tracking-widest text-accent"><span className="size-1.5 rounded-full bg-accent" />SANDBOX</span>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-7xl px-6 pb-12 pt-10 sm:px-10 sm:pt-14">
        <div className="mb-9 flex flex-wrap items-center gap-2 font-mono text-xs text-muted"><span>WORKSPACE</span><span aria-hidden="true" className="px-1">/</span><span className="text-foreground">INTEGRATION OVERVIEW</span></div>
        <section aria-labelledby="dashboard-heading" className="mb-9">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-accent"><span className="h-px w-6 bg-accent" /> BUILD. CONNECT. VERIFY.</div>
          <h2 id="dashboard-heading" className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">Frontend Integration Sandbox</h2>
          <p className="mt-4 text-sm text-muted sm:text-base">GitHub + Vercel + Cursor + v0</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">A demonstration of your development workflow with historical sandbox records. Statuses are static; no live monitoring or deployment checks are performed.</p>
        </section>
        <div className="mb-9 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-success/20 bg-success/5 px-5 py-4">
          <div className="flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-success/40 text-xs text-success">✓</span><div><p className="mb-1 text-xs font-medium text-success">Historical sandbox record</p><p className="text-sm text-foreground">Cursor + GitHub + Vercel integration verified — Test 2</p><p className="mt-1 text-xs text-muted">Original test text preserved · Current integration state has not been checked</p></div></div>
          <span className="font-mono text-xs tracking-widest text-success">HISTORICAL TEXT</span>
        </div>
        <div className="mb-10 grid grid-cols-1 divide-y divide-line rounded-xl border border-line bg-surface/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-5">
              <div className="mb-2 flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-3xl tracking-tight">
                  {formatCount(stat.value)}
                </span>
                <span className="text-xs text-foreground">{stat.label}</span>
              </div>
              <p className="text-xs text-muted">{stat.note}</p>
            </div>
          ))}
        </div>
        <IntegrationGrid />
        <section aria-labelledby="workflow-heading" className="mt-8 rounded-xl border border-line p-6">
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="workflow-heading" className="text-sm font-medium">Suggested review workflow</h2><span className="font-mono text-xs text-muted">DEMONSTRATION WORKFLOW</span></div>
          <ol className="mt-5 grid gap-4 text-sm text-muted sm:grid-cols-4">{["Generate with v0", "Sync to GitHub", "Review in Cursor / Codex", "Validate Vercel preview"].map((step, index) => <li key={step} className="flex items-start gap-2"><span className="font-mono text-xs text-accent">0{index + 1}</span><span>{step}</span></li>)}</ol>
        </section>
        <footer className="mt-8 flex flex-wrap justify-between gap-3 border-t border-line pt-5 text-xs text-muted"><p>MTG CONSULTING <span aria-hidden="true" className="px-2">/</span> Frontend integration demonstration.</p><p className="font-mono">BASE · test/v0-integration</p></footer>
      </main>
    </div>
  );
}
