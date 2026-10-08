import { integrationStatusLabels, type IntegrationStatus } from "../integrations";

interface IntegrationStatusBadgeProps {
  readonly status: IntegrationStatus;
}

const badgeStyles: Record<IntegrationStatus, { readonly badge: string; readonly dot: string }> = {
  historical: {
    badge: "border-success/20 bg-success/5 text-success",
    dot: "bg-success",
  },
  demonstration: {
    badge: "border-line bg-canvas text-muted",
    dot: "bg-muted",
  },
};

export function IntegrationStatusBadge({ status }: IntegrationStatusBadgeProps) {
  const styles = badgeStyles[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles.badge}`}>
      <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${styles.dot}`} />
      {integrationStatusLabels[status]}
    </span>
  );
}
