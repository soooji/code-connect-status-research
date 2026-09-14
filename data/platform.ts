export type SurfaceState = 'ready' | 'warning' | 'beta' | 'deprecated' | 'unsupported'
export type Lifecycle = 'experimental' | 'beta' | 'stable' | 'deprecated'

export type PlatformProduct = {
  id: string
  name: string
  surface: 'desktop-portal' | 'touch-display'
  owner: string
  packageVersion: string
  deviations: number
}

export type PlatformComponent = {
  id: string
  name: string
  lifecycle: Lifecycle
  owner: string
  desktop: SurfaceState
  touch: SurfaceState
  callSites: number
  figmaFiles: number
  currentVersion: string
  codeConnect: 'current' | 'stale' | 'missing'
  storybook: 'passing' | 'attention' | 'missing'
  drift: string[]
  migration?: string
}

export type DriftSignal = {
  id: string
  componentId: string
  productId: string
  type: 'mapping' | 'inventory' | 'token' | 'release' | 'usage'
  severity: 'watch' | 'attention' | 'migration'
  title: string
  detail: string
  owner: string
}

export const products: PlatformProduct[] = [
  { id: 'golf-portal', name: 'Golf Portal', surface: 'desktop-portal', owner: 'Member Experience', packageVersion: '8.4.1', deviations: 2 },
  { id: 'on-course-touch', name: 'On-Course Touch', surface: 'touch-display', owner: 'Venue Ops', packageVersion: '8.3.0', deviations: 4 },
  { id: 'tournament-admin', name: 'Tournament Admin', surface: 'desktop-portal', owner: 'Competition Tools', packageVersion: '8.4.1', deviations: 1 },
  { id: 'broadcast-control', name: 'TV Broadcast Control', surface: 'desktop-portal', owner: 'Broadcast Systems', packageVersion: '7.9.2', deviations: 3 },
]

export const components: PlatformComponent[] = [
  {
    id: 'button',
    name: 'Button',
    lifecycle: 'stable',
    owner: 'Web Platform',
    desktop: 'ready',
    touch: 'ready',
    callSites: 318,
    figmaFiles: 42,
    currentVersion: '8.4.1',
    codeConnect: 'current',
    storybook: 'passing',
    drift: ['One product wraps analytics around primary actions.'],
  },
  {
    id: 'data-table',
    name: 'Data Table',
    lifecycle: 'stable',
    owner: 'Admin Systems',
    desktop: 'ready',
    touch: 'warning',
    callSites: 44,
    figmaFiles: 18,
    currentVersion: '8.2.0',
    codeConnect: 'current',
    storybook: 'attention',
    drift: ['Touch surface needs a list pattern rather than dense table composition.', 'Two products use private column resizing wrappers.'],
  },
  {
    id: 'date-picker',
    name: 'Date Picker',
    lifecycle: 'beta',
    owner: 'Scheduling',
    desktop: 'ready',
    touch: 'beta',
    callSites: 27,
    figmaFiles: 13,
    currentVersion: '8.4.1',
    codeConnect: 'stale',
    storybook: 'passing',
    drift: ['Figma added Range mode; Code Connect template still handles single date only.'],
  },
  {
    id: 'legacy-modal',
    name: 'Legacy Modal',
    lifecycle: 'deprecated',
    owner: 'Web Platform',
    desktop: 'deprecated',
    touch: 'deprecated',
    callSites: 19,
    figmaFiles: 7,
    currentVersion: '6.8.0',
    codeConnect: 'missing',
    storybook: 'attention',
    drift: ['Deprecated usage remains in Broadcast Control and On-Course Touch.'],
    migration: 'Replace with Dialog and run focus-restoration codemod where applicable.',
  },
  {
    id: 'filter-bar',
    name: 'Filter Bar',
    lifecycle: 'experimental',
    owner: 'Competition Tools',
    desktop: 'ready',
    touch: 'unsupported',
    callSites: 11,
    figmaFiles: 5,
    currentVersion: '0.7.0',
    codeConnect: 'missing',
    storybook: 'missing',
    drift: ['Local pattern is spreading across admin screens before a shared contract exists.'],
  },
]

export const driftSignals: DriftSignal[] = [
  {
    id: 'date-range-template',
    componentId: 'date-picker',
    productId: 'tournament-admin',
    type: 'mapping',
    severity: 'attention',
    title: 'New Figma Range mode is not translated',
    detail: 'The component set added Range, but the template still emits a single-date API.',
    owner: 'Scheduling',
  },
  {
    id: 'touch-table',
    componentId: 'data-table',
    productId: 'on-course-touch',
    type: 'usage',
    severity: 'watch',
    title: 'Dense table used on a coarse pointer surface',
    detail: 'The semantic need is shared, but the touch surface needs larger row actions and fewer hover assumptions.',
    owner: 'Venue Ops',
  },
  {
    id: 'modal-deprecated',
    componentId: 'legacy-modal',
    productId: 'broadcast-control',
    type: 'usage',
    severity: 'migration',
    title: 'Deprecated modal still blocks broadcast setup',
    detail: 'Nineteen call sites remain; seven are eligible for automated Dialog migration.',
    owner: 'Broadcast Systems',
  },
  {
    id: 'button-hardcode',
    componentId: 'button',
    productId: 'golf-portal',
    type: 'token',
    severity: 'watch',
    title: 'Primary action wrapper hard-codes focus color',
    detail: 'The wrapper uses the Button API but bypasses the semantic focus token.',
    owner: 'Member Experience',
  },
  {
    id: 'filter-promotion',
    componentId: 'filter-bar',
    productId: 'tournament-admin',
    type: 'inventory',
    severity: 'attention',
    title: 'Local Filter Bar crossed reuse threshold',
    detail: 'The pattern appears in five active admin files and should move to beta or stay explicitly local.',
    owner: 'Competition Tools',
  },
  {
    id: 'broadcast-version',
    componentId: 'data-table',
    productId: 'broadcast-control',
    type: 'release',
    severity: 'attention',
    title: 'Package version lags current table contract',
    detail: 'Broadcast Control remains on 7.9.2, before column action metadata shipped.',
    owner: 'Broadcast Systems',
  },
]

export const sourceLinks = [
  ['Figma Code Connect CLI', 'https://developers.figma.com/docs/code-connect/cli-reference/'],
  ['Figma Library Analytics', 'https://developers.figma.com/docs/rest-api/library-analytics-intro/'],
  ['Figma Webhooks', 'https://developers.figma.com/docs/rest-api/webhooks/'],
  ['Figma Webhook Events', 'https://developers.figma.com/docs/rest-api/webhooks-events/'],
  ['Figma Variables', 'https://developers.figma.com/docs/rest-api/variables/'],
  ['Figma Dev Mode Plugins', 'https://developers.figma.com/docs/plugins/working-in-dev-mode/'],
  ['Pinterest FigStats Case Study', 'https://www.figma.com/blog/how-pinterests-design-systems-team-measures-adoption/'],
  ['GitHub Primer Annotations', 'https://github.blog/engineering/user-experience/design-system-annotations-part-2-advanced-methods-of-annotating-components/'],
  ['Atlassian Contribution', 'https://atlassian.design/contribution'],
  ['Backstage Catalog Descriptor Model', 'https://backstage.io/docs/features/software-catalog/descriptor-format/'],
  ['Storybook Composition', 'https://storybook.js.org/docs/sharing/storybook-composition'],
  ['Storybook Accessibility Testing', 'https://storybook.js.org/docs/writing-tests/accessibility-testing'],
  ['Storybook Visual Testing', 'https://storybook.js.org/docs/writing-tests/visual-testing/'],
  ['DTCG Design Tokens Format', 'https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/'],
  ['Sanity Component Analytics', 'https://github.com/sanity-labs/component-analytics'],
  ['Omlet', 'https://github.com/zeplin/omlet'],
] as const
