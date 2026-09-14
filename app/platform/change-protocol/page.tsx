import type { Metadata } from 'next'
import { ActiveToc } from '@/components/active-toc'
import { CodeBlock } from '@/components/code-block'
import { ChangeProtocolSimulator } from '@/components/platform-interactives'
import { Callout, PageHeader, Section } from '@/components/page'
import { PlatformNav } from '@/components/platform-nav'

export const metadata: Metadata = { title: 'Change Protocol' }
const toc = [['Simulator', 'simulator'], ['Lanes', 'lanes'], ['Migration', 'migration'], ['Exception', 'exception']] as const
const deviation = `component: button
product: on-course-touch
type: local-wrapper
reason: "Needs long-press interaction on touch displays"
owner: venue-ops
reviewAfter: 2026-12-01`

export default function ChangeProtocolPage() {
  return <div className="container docs-layout"><article>
    <PageHeader eyebrow="Operate" title="Choose the smallest protocol that fits the change." description="The operating model should keep product teams moving. Fast changes stay fast, shared contracts get impact analysis, product experiments remain possible, and migrations become visible work rather than surprise cleanup." />
    <PlatformNav />
    <Section id="simulator" eyebrow="01 · Lane selector" title="Classify a change by impact"><ChangeProtocolSimulator /></Section>
    <Section id="lanes" eyebrow="02 · Change lanes" title="Governance without a central bottleneck"><div className="lane-grid">{[
      ['Fast Path', 'Docs, small visual bugs, accessibility fixes without contract change, additional Storybook state.', 'PR → owner review → tests → release'],
      ['Shared Contract', 'Prop semantics, variant removal, token meaning, interaction model, or multi-product impact.', 'Short proposal → impacted consumers → migration plan → staged release'],
      ['Product Experiment', 'Uncertain or product-specific pattern that should not wait on premature abstraction.', 'Local owner → shared foundations → discoverable deviation → review threshold'],
    ].map(([h,p,flow]) => <article key={h}><span>{h}</span><p>{p}</p><code>{flow}</code></article>)}</div></Section>
    <Section id="migration" eyebrow="03 · Migration" title="Make removal boring"><div className="migration-strip">{['Mark deprecated', 'Publish replacement', 'Identify consumers', 'Add warning', 'Codemod when feasible', 'Track to zero'].map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></div>)}</div><Callout title="Deterministic automation first">Use lint rules and codemods where the old and new APIs have a reliable mapping. Leave product-specific behavior to explicit manual review.</Callout></Section>
    <Section id="exception" eyebrow="04 · Exceptions" title="Exceptions are data, not failure"><p className="body-copy">A product-specific wrapper may be the right choice when surface constraints differ. The control plane should make the deviation visible with an owner and review date instead of pretending every divergence is non-compliance.</p><CodeBlock filename="deviations/on-course-touch-button.yaml" language="YAML" code={deviation} /></Section>
  </article><ActiveToc items={toc} /></div>
}
