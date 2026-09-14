import type { Metadata } from 'next'
import { ActiveToc } from '@/components/active-toc'
import { CodeBlock } from '@/components/code-block'
import { Callout, PageHeader, Section } from '@/components/page'
import { PlatformNav } from '@/components/platform-nav'

export const metadata: Metadata = { title: 'UI Control Plane' }
const toc = [['Architecture', 'architecture'], ['Registry', 'registry'], ['Collectors', 'collectors'], ['Surfaces', 'surfaces'], ['Build vs buy', 'build-vs-buy']] as const
const manifest = `apiVersion: ui.company/v1
kind: Component
metadata:
  id: data-table
  name: Data Table
  owner: admin-systems
  lifecycle: stable
spec:
  semantics:
    role: structured-data
  implementations:
    - platform: web
      package: "@company/ui"
      export: DataTable
  design:
    figma:
      componentKey: "figma-data-table"
  codeConnect:
    label: React
    source: src/data-table/DataTable.figma.ts
  surfaces:
    viewports: [desktop, touch-display]
    desktop: ready
    touch: warning`

export default function ControlPlanePage() {
  return <div className="container docs-layout"><article>
    <PageHeader eyebrow="Architecture" title="A registry and observability layer, not a replacement system." description="The UI Control Plane continuously joins source snapshots into normalized component relationships. The value is in stable identities, cross-system drift analysis, impact queries, and workflow surfaces." />
    <PlatformNav />
    <Section id="architecture" eyebrow="01 · Architecture" title="Collect raw events; normalize relationships"><div className="architecture-map">
      <div className="arch-column"><span>Sources</span>{['Figma', 'Code Connect parse', 'Shared UI repo', 'Storybooks', 'Product repos', 'Token source'].map(item => <strong key={item}>{item}</strong>)}</div>
      <i>→</i>
      <div className="arch-column"><span>Ingestion</span>{['Webhook receiver', 'CI snapshot API', 'Scheduled reconciler'].map(item => <strong key={item}>{item}</strong>)}</div>
      <i>→</i>
      <div className="arch-column core"><span>Core</span>{['Normalizer', 'Registry DB', 'Analysis jobs'].map(item => <strong key={item}>{item}</strong>)}</div>
      <i>→</i>
      <div className="arch-column"><span>Surfaces</span>{['Web UI', 'PR checks', 'Lint / codemods', 'Dev Mode inspector', 'Read API / MCP'].map(item => <strong key={item}>{item}</strong>)}</div>
    </div><Callout title="Architecture principle">Store raw snapshots for debugging and normalized entities for querying. Do not let collectors write directly into UI-specific tables.</Callout></Section>
    <Section id="registry" eyebrow="02 · Registry" title="The component record is the join key"><p className="body-copy">Human-owned fields should be stable intent: ID, owner, lifecycle, semantics, supported surfaces, and replacement direction. Generated fields should come from systems that already know them: usage counts, versions, Storybook state, Code Connect parse status, test results, Figma publishes, and drift events.</p><CodeBlock filename="ui/components/data-table.yaml" language="YAML" code={manifest} /></Section>
    <Section id="collectors" eyebrow="03 · Collectors" title="Reuse existing evidence"><div className="collector-grid">{[['Figma','Webhook publishes, Library Analytics when available, scoped REST reconciliation when needed.'],['Code Connect','Parse output, published mapping status, template IDs, imports, metadata, source files.'],['Storybook','Composed story availability, accessibility tests, visual tests, interaction states.'],['Product repos','Imports, JSX usage, versions, wrappers, local substitutes, deprecated APIs.'],['Tokens','DTCG-compatible source, Figma variables, generated platform token artifacts.'],['Quality','Build, accessibility, visual, interaction, and manual-review timestamps where useful.']].map(([h,p]) => <article key={h}><span>{h}</span><p>{p}</p></article>)}</div></Section>
    <Section id="surfaces" eyebrow="04 · Surfaces" title="Keep the interface close to the workflow"><div className="surface-grid">{[['Web research view','Explore portfolio, passports, drift, migrations, adoption, and source links.'],['PR feedback','Warn about deprecated APIs, stale package versions, or affected products before merge.'],['Dev Mode inspector','Resolve the selected Figma node to a compact passport in under a few seconds.'],['Read API / MCP','Give agents and tooling stable component context instead of visual guesses.']].map(([h,p]) => <article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div></Section>
    <Section id="build-vs-buy" eyebrow="05 · Build vs buy" title="Build only the connective tissue"><div className="table-wrap"><table><thead><tr><th>Need</th><th>Reuse</th><th>Bespoke value</th></tr></thead><tbody>{[
      ['Design-to-code snippets', 'Figma Code Connect', 'Join mappings to lifecycle, usage, quality, and ownership.'],
      ['Design events', 'Figma Webhooks and Library Analytics', 'Reconcile events against active products and migration queues.'],
      ['Quality evidence', 'Storybook tests and composition', 'Normalize pass/fail state into component passports.'],
      ['Token format', 'DTCG tokens and Figma Variables', 'Compare semantic token values across source, design, and code.'],
      ['Code usage', 'Sanity component-analytics or Omlet', 'Attach usage to products, owners, versions, and change lanes.'],
    ].map(row => <tr key={row[0]}>{row.map((cell, i) => <td key={cell} data-label={['Need', 'Reuse', 'Bespoke value'][i]}>{cell}</td>)}</tr>)}</tbody></table></div></Section>
  </article><ActiveToc items={toc} /></div>
}
