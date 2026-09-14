import type { Metadata } from 'next'
import Link from 'next/link'
import { Callout, PageHeader, Section } from '@/components/page'
import { PlatformNav } from '@/components/platform-nav'
import { Icon } from '@/components/icons'
import { components, products, sourceLinks } from '@/data/platform'

export const metadata: Metadata = { title: 'UI Platform' }

export default function PlatformOverview() {
  return <div className="container">
    <PageHeader eyebrow="UI Platform · Beyond Code Connect" title="Observe the shared UI system before you enforce it." description="Code Connect gives Dev Mode a production-aware bridge. A lightweight UI Control Plane keeps the surrounding graph visible: components, Figma assets, repositories, Storybook states, tokens, owners, lifecycle, drift, and migrations.">
      <div className="hero-actions"><Link className="button primary" href="/platform/control-plane">Explore the control plane <Icon name="arrow" /></Link><Link className="button" href="/platform/passport">Open a passport</Link></div>
    </PageHeader>
    <PlatformNav />
    <section className="platform-hero" aria-label="UI Platform system map">
      {['Figma', 'Code Connect', 'Shared UI Repo', 'Storybook', 'Product Repos', 'Tokens'].map(item => <div key={item}><span>Source</span><strong>{item}</strong></div>)}
      <b>Registry</b>
      {['Drift', 'Adoption', 'Lifecycle', 'Impact', 'Migrations'].map(item => <div key={item}><span>Signal</span><strong>{item}</strong></div>)}
    </section>
    <Section eyebrow="Research position" title="The bespoke value is the join layer"><p className="body-copy">The proposal does not replace Figma, Code Connect, Storybook, design tokens, tests, or code-analysis tools. It connects their output through stable component identities so teams can see where shared UI is healthy, where it is drifting, and which change lane fits the next decision.</p><div className="platform-principles">{['Connect systems; do not centralize every workflow.', 'Collect passive signals before adding blocking rules.', 'Show dimensions, not one opaque compliance score.', 'Allow surface-specific interaction patterns when semantics stay shared.'].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></article>)}</div></Section>
    <Section eyebrow="Portfolio snapshot" title="A coherent sample organization"><div className="portfolio-grid"><div><h3>Products</h3>{products.map(product => <article key={product.id}><strong>{product.name}</strong><span>{product.owner}</span><code>{product.surface}</code></article>)}</div><div><h3>Components</h3>{components.map(component => <article key={component.id}><strong>{component.name}</strong><span>{component.owner}</span><code>{component.callSites} call sites</code></article>)}</div></div><Callout title="No universal health score">The overview may summarize attention areas, but the page should keep individual signals visible: mapping, usage, lifecycle, version, quality, drift, surface support, and migration status.</Callout></Section>
    <Section eyebrow="Sources" title="Primary references stay close to the claims"><div className="source-list compact">{sourceLinks.slice(0, 8).map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer"><strong>{label}</strong><span>{href}</span></a>)}</div></Section>
  </div>
}
