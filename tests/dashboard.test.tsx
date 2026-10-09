import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../app/page";
import { IntegrationStatusBadge } from "../app/components/integration-status-badge";
import {
  formatCount,
  integrationCounts,
  integrations,
  type IntegrationStatus,
} from "../app/integrations";

const originalNames = ["GitHub", "Vercel", "Cursor", "Codex", "Devin", "Figma"];

test("the six integration records retain their names and static statuses", () => {
  assert.equal(integrations.length, 6);
  assert.deepEqual(integrations.map(({ name }) => name), originalNames);
  assert.deepEqual(integrations.map(({ status }) => status), [
    "historical", "historical", "historical",
    "demonstration", "demonstration", "demonstration",
  ]);
});

test("counts derive from the records and format as 06 / 03 / 03", () => {
  assert.deepEqual(integrationCounts, {
    total: integrations.length,
    historical: integrations.filter(({ status }) => status === "historical").length,
    demonstration: integrations.filter(({ status }) => status === "demonstration").length,
  });
  assert.deepEqual(integrationCounts, { total: 6, historical: 3, demonstration: 3 });
  assert.deepEqual(Object.values(integrationCounts).map(formatCount), ["06", "03", "03"]);
});

const badgeCases: readonly [IntegrationStatus, string][] = [
  ["historical", "Historical record"],
  ["demonstration", "Demonstration only"],
];

for (const [status, label] of badgeCases) {
  test(`${status} badge renders its text label and an aria-hidden decorative dot`, () => {
    const markup = renderToStaticMarkup(<IntegrationStatusBadge status={status} />);
    const badge = markup.match(/^<span\b([^>]*)><span\b([^>]*)><\/span>([^<]+)<\/span>$/);
    assert.ok(badge, "badge contains one empty decorative span followed by text");
    assert.doesNotMatch(badge[1], /aria-hidden=/);
    assert.match(badge[2], /\baria-hidden="true"/);
    assert.equal(badge[3], label);
  });
}

test("the dashboard renders exactly six cards with the original names", () => {
  const markup = renderToStaticMarkup(<Home />);
  const cards = [...markup.matchAll(/<article\b[^>]*>(.*?)<\/article>/g)];
  assert.equal(cards.length, 6);
  assert.deepEqual(cards.map(([, card]) => {
    const headings = [...card.matchAll(/<h3\b[^>]*>([^<]+)<\/h3>/g)];
    assert.equal(headings.length, 1);
    return headings[0][1];
  }), originalNames);
});

test("the dashboard displays the derived summary counts with their labels", () => {
  const markup = renderToStaticMarkup(<Home />);
  const metrics = [...markup.matchAll(/<span\b[^>]*>(\d{2})<\/span>\s*<span\b[^>]*>([^<]+)<\/span>/g)];
  const summaryLabels = ["Integrations in scope", "Historical records", "Demonstration entries"];
  assert.deepEqual(metrics.filter(([, , label]) => summaryLabels.includes(label)).map(([, count, label]) => [count, label]), [
    ["06", "Integrations in scope"],
    ["03", "Historical records"],
    ["03", "Demonstration entries"],
  ]);
});

test("original visible text and the historical disclosure remain", () => {
  const markup = renderToStaticMarkup(<Home />);
  const paragraphs = [...markup.matchAll(/<p\b[^>]*>([^<]*)<\/p>/g)].map(([, text]) => text);
  for (const text of [
    "GitHub + Vercel + Cursor + v0",
    "Cursor + GitHub + Vercel integration verified — Test 2",
    "Historical sandbox record",
    "Original test text preserved · Current integration state has not been checked",
    "A demonstration of your development workflow with historical sandbox records. Statuses are static; no live monitoring or deployment checks are performed.",
  ]) {
    assert.ok(paragraphs.includes(text), `visible paragraph preserved: ${text}`);
  }
  assert.match(markup, /<span\b[^>]*>HISTORICAL TEXT<\/span>/);
  assert.match(markup, /<h1\b[^>]*>MTG CONSULTING<\/h1>/);
  assert.match(markup, /<h2\b[^>]*>Frontend Integration Sandbox<\/h2>/);
});

test("the skip link targets a programmatically focusable main landmark", () => {
  const markup = renderToStaticMarkup(<Home />);
  const skipLinks = [...markup.matchAll(/<a\b([^>]*)>Skip to content<\/a>/g)];
  assert.equal(skipLinks.length, 1);
  assert.match(skipLinks[0][1], /\bhref="#main"/);
  const mainTags = [...markup.matchAll(/<main\b([^>]*)>/g)];
  assert.equal(mainTags.length, 1);
  assert.match(mainTags[0][1], /\bid="main"/);
  assert.match(mainTags[0][1], /\btabindex="-1"/);
});
