import type { Metadata } from 'next'
import { ActiveToc } from '@/components/active-toc'
import { ComponentPassportExplorer } from '@/components/platform-interactives'
import { Callout, PageHeader, Section } from '@/components/page'
import { PlatformNav } from '@/components/platform-nav'

export const metadata: Metadata = { title: 'Component Passport' }
const toc = [['Explorer', 'explorer'], ['Dimensions', 'dimensions'], ['Surface fit', 'surface-fit']] as const

export default function PassportPage() {
  return <div className="container docs-layout"><article>
    <PageHeader eyebrow="Component Passport" title="Make every shared UI asset inspectable." description="A passport is the readable slice of the registry: ownership, lifecycle, Figma and code links, Code Connect status, Storybook evidence, usage, drift, surface support, and migration guidance." />
    <PlatformNav />
    <Section id="explorer" eyebrow="01 · Explorer" title="Switch components to inspect signal vectors"><ComponentPassportExplorer /></Section>
    <Section id="dimensions" eyebrow="02 · Signal vector" title="Do not hide the system behind one number"><p className="body-copy">A passport can say “ready” or “attention” for quick scanning, but the useful part is the visible vector. Mapping, usage, lifecycle, quality, version, drift, surfaces, and migration status stay separate so the team can act on the specific problem.</p><div className="dimension-grid">{['Identity', 'Lifecycle', 'Design', 'Code', 'Mapping', 'Quality', 'Drift', 'Surface', 'Migration'].map(item => <span key={item}>{item}</span>)}</div></Section>
    <Section id="surface-fit" eyebrow="03 · Surfaces" title="Shared semantics do not require identical composition"><p className="body-copy">Button can be ready on desktop and touch. Data Table can be stable for desktop portals while warning on touch displays. The registry should represent that nuance instead of forcing one universal component shape across products with different input modes.</p><Callout title="The policy">Preserve shared foundations and semantic intent, then let surface profiles describe pointer, density, target size, keyboard, and hover constraints.</Callout></Section>
  </article><ActiveToc items={toc} /></div>
}
