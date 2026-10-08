export type IntegrationStatus = "historical" | "demonstration";

export interface Integration {
  readonly name: string;
  readonly initials: string;
  readonly category: string;
  readonly description: string;
  readonly status: IntegrationStatus;
  readonly detail: string;
}

export const integrationStatusLabels: Record<IntegrationStatus, string> = {
  historical: "Historical record",
  demonstration: "Demonstration only",
};

export const integrations: readonly Integration[] = [
  {
    name: "GitHub",
    initials: "GH",
    category: "SOURCE CONTROL",
    description: "A shared source of truth for generated code, feature branches, and pull requests.",
    status: "historical",
    detail: "Repository synchronization",
  },
  {
    name: "Vercel",
    initials: "VE",
    category: "PREVIEW & DELIVERY",
    description: "Review changes in an isolated preview before promoting anything to production.",
    status: "historical",
    detail: "Preview deployment",
  },
  {
    name: "Cursor",
    initials: "CU",
    category: "AI CODE EDITOR",
    description: "Explore the codebase, refine generated components, and review changes in context.",
    status: "historical",
    detail: "Editor integration",
  },
  {
    name: "Codex",
    initials: "CX",
    category: "CODE REVIEW",
    description: "Validate generated code and review implementation details alongside your team.",
    status: "demonstration",
    detail: "Sandbox validation",
  },
  {
    name: "Devin",
    initials: "DV",
    category: "ENGINEERING AGENT",
    description: "Evaluate agent-assisted development within the sandbox review workflow.",
    status: "demonstration",
    detail: "Integration evaluation",
  },
  {
    name: "Figma",
    initials: "FI",
    category: "DESIGN HANDOFF",
    description: "Keep design intent and frontend implementation aligned through visual review.",
    status: "demonstration",
    detail: "Design-to-code workflow",
  },
];

export const integrationCounts = {
  total: integrations.length,
  historical: integrations.filter(({ status }) => status === "historical").length,
  demonstration: integrations.filter(({ status }) => status === "demonstration").length,
};

export function formatCount(count: number): string {
  return String(count).padStart(2, "0");
}
