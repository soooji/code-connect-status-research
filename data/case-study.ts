export const tree = ['NotificationCard','├─ Header','│  ├─ Avatar ↗ connected','│  ├─ Text','│  │  ├─ Title','│  │  └─ Description','│  └─ StatusBadge ↗ connected','├─ LeadingIcon ↗ connected','└─ Actions [slot]','   ├─ Button ↗ connected','   └─ IconButton ↗ connected']

export const childTemplates = [
  { name: "Avatar.figma.ts", code: "// url=https://www.figma.com/design/FILE_KEY/Library?node-id=1-1\n// source=src/components/Avatar.tsx\n// component=Avatar\nimport figma from 'figma'\n\nconst instance = figma.selectedInstance\nconst fallback = instance.getString('Fallback')\n\nexport default {\n  example: figma.tsx`<Avatar size=\"md\" fallback=\"${fallback}\" />`,\n  imports: [\"import { Avatar } from '@company/design-system'\"],\n  id: 'design-system/avatar',\n  metadata: { nestable: true, props: { role: 'avatar' } },\n}" },
  { name: "StatusBadge.figma.ts", code: "// url=https://www.figma.com/design/FILE_KEY/Library?node-id=1-1\n// source=src/components/Badge.tsx\n// component=Badge\nimport figma from 'figma'\n\nconst instance = figma.selectedInstance\nconst tone = instance.getEnum('Tone', { Success: 'success', Critical: 'danger' })\nconst label = instance.getString('Label')\n\nexport default {\n  example: figma.tsx`<Badge tone=\"${tone}\">${label}</Badge>`,\n  imports: [\"import { Badge } from '@company/design-system'\"],\n  id: 'design-system/status-badge',\n  metadata: { nestable: true, props: { role: 'status' } },\n}" },
  { name: "Button.figma.ts", code: "// url=https://www.figma.com/design/FILE_KEY/Library?node-id=1-1\n// source=src/components/Button.tsx\n// component=Button\nimport figma from 'figma'\n\nconst instance = figma.selectedInstance\nconst variant = instance.getEnum('Variant', { Secondary: 'secondary' })\nconst label = instance.getString('Label')\n\nexport default {\n  example: figma.tsx`<Button variant=\"${variant}\">${label}</Button>`,\n  imports: [\"import { Button } from '@company/design-system'\"],\n  id: 'design-system/button',\n  metadata: { nestable: true, props: { role: 'action' } },\n}" },
  { name: "IconButton.figma.ts", code: "// url=https://www.figma.com/design/FILE_KEY/Library?node-id=1-1\n// source=src/components/IconButton.tsx\n// component=IconButton\nimport figma from 'figma'\n\nconst instance = figma.selectedInstance\nconst icon = instance.getInstanceSwap('Icon')?.executeTemplate().example\nconst label = instance.getString('Accessible label')\n\nexport default {\n  example: figma.tsx`<IconButton icon={${icon}} aria-label=\"${label}\" />`,\n  imports: [\"import { IconButton } from '@company/design-system'\"],\n  id: 'design-system/icon-button',\n  metadata: { nestable: true, props: { role: 'action' } },\n}" }
]

export const parentTemplate = `// url=https://www.figma.com/design/FILE_KEY/Library?node-id=900-12
// source=src/components/NotificationCard.tsx
// component=NotificationCard
import figma from 'figma'
import { toneMap } from './figma-helpers'

const card = figma.selectedInstance
const title = card.getString('Title')
const description = card.getString('Description')
const tone = card.getEnum('Tone', toneMap) // Critical → danger
const density = card.getEnum('Density', {
  Comfortable: 'comfortable', Compact: 'compact',
})
const elevated = card.getBoolean('Elevated')
const dismissible = card.getBoolean('Dismissible')
const avatar = card.findConnectedInstance('design-system/avatar')
const badge = card.findConnectedInstance('design-system/status-badge')
const leadingIcon = card.getInstanceSwap('Leading icon')
const actions = card.getSlot('Actions')
const directActions = actions?.connectedInstances ?? [] // shallow only
const allButtons = card.findConnectedInstances(
  child => child.codeConnectId() === 'design-system/button',
  { traverseInstances: true },
)
const avatarResult = avatar?.executeTemplate()
const badgeResult = badge?.executeTemplate()
const iconResult = leadingIcon?.executeTemplate()
const actionExamples = directActions.map(child => child.executeTemplate().example)
const childRole = badgeResult?.metadata?.props?.role
const { renderProp } = figma.helpers.react

export default {
  example: figma.tsx\`<NotificationCard
  \${renderProp('tone', tone)}
  \${renderProp('density', density)}
  \${renderProp('elevated', elevated)}
  \${renderProp('dismissible', dismissible)}
  title="\${title}"
  description="\${description}"
  avatar={\${avatarResult?.example}}
  badge={\${badgeResult?.example}}
  icon={\${iconResult?.example}}
>
  \${figma.helpers.react.renderChildren(actionExamples)}
</NotificationCard>\`,
  imports: ["import { NotificationCard } from '@company/design-system'"],
  id: 'design-system/notification-card',
  metadata: {
    nestable: true,
    props: { pattern: 'notification', childRole, buttonCount: allButtons.length },
  },
}`

export const resultCode = `import {
  Avatar, Badge, Button, CheckCircleIcon,
  IconButton, MoreIcon, NotificationCard,
} from '@company/design-system'

<NotificationCard
  tone="success"
  density="compact"
  elevated
  dismissible
  title="Recording uploaded"
  description="The full round is ready."
  avatar={<Avatar size="md" fallback="SB" />}
  badge={<Badge tone="success">Processed</Badge>}
  icon={<CheckCircleIcon />}
>
  <Button variant="secondary">View</Button>
  <IconButton icon={<MoreIcon />} aria-label="More" />
</NotificationCard>`

export const whatIf = [
 ['A child is not Code Connected','Guard with hasCodeConnect(), omit it, or show a deliberate generic fallback. Never imply it can become production code automatically.'],
 ['A Figma property is renamed','The named getter no longer resolves. Preview/parse in CI and update the mapping in the same design-system change.'],
 ['The React prop name differs','Translate at the boundary—getEnum() can map “Critical” to danger without forcing both systems to share labels.'],
 ['A child is nested too deeply in a slot','slot.connectedInstances will not see it because traversal is shallow. Flatten the slot or deliberately discover the descendant.'],
 ['A child template changes later','The next parent execution uses the new child output. Stable IDs, metadata contracts, and review protect composition.'],
 ['Several instances share a name','Use findConnectedInstances() and preserve intended order; do not assume the singular finder models a collection.'],
 ['A parent needs child metadata','Read the child’s published metadata only after checking its connection and stable codeConnectId().'],
] as const
