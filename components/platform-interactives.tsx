'use client'
import { useMemo, useState } from 'react'
import { components, driftSignals, products, type DriftSignal } from '@/data/platform'

const label = (value: string) => value.replace('-', ' ')

function StatusPill({ value }: { value: string }) {
  return <span className={`status-pill ${value}`}>{label(value)}</span>
}

function MiniMetric({ label, value }: { label: string; value: string | number }) {
  return <div className="mini-metric"><span>{label}</span><strong>{value}</strong></div>
}

export function ComponentPassportExplorer() {
  const [selectedId, setSelectedId] = useState(components[0].id)
  const selected = components.find(component => component.id === selectedId) ?? components[0]
  const relatedDrift = driftSignals.filter(signal => signal.componentId === selected.id)

  return <div className="passport-explorer">
    <div className="component-rail" role="list" aria-label="Components">{components.map(component => <button key={component.id} className={component.id === selected.id ? 'active' : undefined} onClick={() => setSelectedId(component.id)}>
      <span>{component.name}</span>
      <StatusPill value={component.lifecycle} />
    </button>)}</div>
    <article className="passport-panel">
      <div className="passport-head">
        <div><span className="mini-label">Component Passport</span><h2>{selected.name}</h2></div>
        <StatusPill value={selected.lifecycle} />
      </div>
      <div className="passport-metrics">
        <MiniMetric label="Code usage" value={selected.callSites} />
        <MiniMetric label="Figma files" value={selected.figmaFiles} />
        <MiniMetric label="Latest" value={selected.currentVersion} />
      </div>
      <div className="signal-vector" aria-label={`${selected.name} signals`}>
        <Signal label="Identity" value="linked + owned" state="ready" />
        <Signal label="Mapping" value={`Code Connect ${selected.codeConnect}`} state={selected.codeConnect === 'current' ? 'ready' : 'warning'} />
        <Signal label="Quality" value={`Storybook ${selected.storybook}`} state={selected.storybook === 'passing' ? 'ready' : 'warning'} />
        <Signal label="Desktop" value={selected.desktop} state={selected.desktop === 'ready' ? 'ready' : 'warning'} />
        <Signal label="Touch" value={selected.touch} state={selected.touch === 'ready' ? 'ready' : 'warning'} />
      </div>
      <div className="passport-detail-grid">
        <section><span className="mini-label">Owner</span><p>{selected.owner}</p></section>
        <section><span className="mini-label">Surface Contract</span><p>Desktop is {label(selected.desktop)}. Touch is {label(selected.touch)}. The registry keeps those decisions visible without forcing identical composition.</p></section>
        <section><span className="mini-label">Current Drift</span>{relatedDrift.length ? <ul>{relatedDrift.map(signal => <li key={signal.id}>{signal.title}</li>)}</ul> : <p>No active drift signal in this sample.</p>}</section>
        <section><span className="mini-label">Migration</span><p>{selected.migration ?? 'No active migration. Watch usage and quality signals before adding enforcement.'}</p></section>
      </div>
    </article>
  </div>
}

function Signal({ label, value, state }: { label: string; value: string; state: 'ready' | 'warning' }) {
  return <div><span>{label}</span><strong>{value}</strong><i className={state}>{state}</i></div>
}

export function DriftObservatory() {
  const [type, setType] = useState<DriftSignal['type'] | 'all'>('all')
  const filtered = useMemo(() => type === 'all' ? driftSignals : driftSignals.filter(signal => signal.type === type), [type])
  const types: Array<DriftSignal['type'] | 'all'> = ['all', 'mapping', 'inventory', 'token', 'release', 'usage']

  return <div className="drift-observatory">
    <div className="segmented" role="group" aria-label="Filter drift signals">{types.map(item => <button key={item} className={item === type ? 'active' : undefined} onClick={() => setType(item)}>{label(item)}</button>)}</div>
    <div className="drift-layout">
      <div className="drift-list">{filtered.map(signal => <DriftCard key={signal.id} signal={signal} />)}</div>
      <aside className="drift-principles">
        <span className="mini-label">Operating Stance</span>
        <h3>Warn before blocking.</h3>
        <p>Signals point to ownership, impact, and next action. They are not a universal health score and they are not a performance metric for individual contributors.</p>
        <div>{['Mapping', 'Usage', 'Lifecycle', 'Version', 'Quality', 'Surface'].map(item => <code key={item}>{item}</code>)}</div>
      </aside>
    </div>
  </div>
}

function DriftCard({ signal }: { signal: DriftSignal }) {
  const component = components.find(item => item.id === signal.componentId)
  const product = products.find(item => item.id === signal.productId)
  return <article className={`drift-card ${signal.severity}`}>
    <div><StatusPill value={signal.type} /><StatusPill value={signal.severity} /></div>
    <h3>{signal.title}</h3>
    <p>{signal.detail}</p>
    <footer><span>{component?.name}</span><span>{product?.name}</span><span>{signal.owner}</span></footer>
  </article>
}

export function ChangeProtocolSimulator() {
  const scenarios = [
    { id: 'copy', label: 'Button visual polish', lane: 'Fast Path', process: 'Normal owner review, visual and accessibility tests, release notes when visible behavior changes.', impact: 'No shared contract change. Keep the path short.' },
    { id: 'date', label: 'Date Picker range mode', lane: 'Shared Contract', process: 'Generate impacted consumers, consult design representative, update Figma property, template, Storybook states, and migration notes.', impact: 'Affects Tournament Admin and Golf Portal handoff snippets.' },
    { id: 'touch', label: 'Touch table alternative', lane: 'Product Experiment', process: 'Allow local list pattern with shared tokens, explicit owner, and review date. Promote only if reuse emerges.', impact: 'Preserves On-Course Touch speed without pretending dense tables work everywhere.' },
    { id: 'modal', label: 'Legacy Modal removal', lane: 'Migration', process: 'Mark deprecated, identify consumers, provide Dialog replacement, run codemod where safe, then remove after usage reaches zero.', impact: 'Broadcast Control has seven automatable call sites and three manual review points.' },
  ]
  const [selectedId, setSelectedId] = useState(scenarios[1].id)
  const selected = scenarios.find(scenario => scenario.id === selectedId) ?? scenarios[1]

  return <div className="protocol-simulator">
    <div className="scenario-list">{scenarios.map(scenario => <button key={scenario.id} className={selected.id === scenario.id ? 'active' : undefined} onClick={() => setSelectedId(scenario.id)}>
      <span>{scenario.label}</span><strong>{scenario.lane}</strong>
    </button>)}</div>
    <article className="protocol-result">
      <span className="mini-label">Selected Lane</span>
      <h2>{selected.lane}</h2>
      <p>{selected.process}</p>
      <div className="impact-line"><strong>Impact</strong><span>{selected.impact}</span></div>
      <ol>
        {['Observe', 'Identify Owner', 'Choose Lane', 'Automate What Is Deterministic', 'Review Exceptions'].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}
      </ol>
    </article>
  </div>
}
