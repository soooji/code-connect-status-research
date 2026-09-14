import type { Metadata } from 'next'
import { ActiveToc } from '@/components/active-toc'
import { DriftObservatory } from '@/components/platform-interactives'
import { Callout, PageHeader, Section } from '@/components/page'
import { PlatformNav } from '@/components/platform-nav'

export const metadata: Metadata = { title: 'Drift Observatory' }
const toc = [['Observatory', 'observatory'], ['Categories', 'categories'], ['Response', 'response']] as const

export default function DriftPage() {
  return <div className="container docs-layout"><article>
    <PageHeader eyebrow="Drift Observatory" title="Drift is a set of named signals." description="Useful observability separates mapping drift, inventory drift, token drift, release drift, and usage drift. The team can then warn, route, migrate, or explicitly allow an exception." />
    <PlatformNav />
    <Section id="observatory" eyebrow="01 · Observatory" title="Filter the current attention queue"><DriftObservatory /></Section>
    <Section id="categories" eyebrow="02 · Categories" title="Each drift type asks a different question"><div className="drift-taxonomy">{[
      ['Mapping', 'Did a Figma property, Code Connect template, or code prop change without its counterpart?'],
      ['Inventory', 'Does a shared semantic asset lack a linked design, implementation, story, owner, or lifecycle?'],
      ['Token', 'Do Figma variables, DTCG tokens, or code values disagree?'],
      ['Release', 'Did Figma, package, mapping, or documentation releases move out of sequence?'],
      ['Usage', 'Are deprecated APIs, old versions, wrappers, or local substitutes spreading?'],
    ].map(([h,p]) => <article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div></Section>
    <Section id="response" eyebrow="03 · Response" title="Visibility before prohibition"><p className="body-copy">The first response to drift should be a routed warning with owner, context, and impact. Blockers are useful only after the team has a fast compliant path, a tested migration, and an explicit exception mechanism.</p><Callout tone="red" title="Avoid policing metrics">Do not turn drift into an individual designer or engineer performance score. Use it to find friction in the system.</Callout></Section>
  </article><ActiveToc items={toc} /></div>
}
