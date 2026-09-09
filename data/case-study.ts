export const tree = ['NotificationCard','├─ Header','│  ├─ Avatar ↗ connected','│  ├─ Text','│  │  ├─ Title','│  │  └─ Description','│  └─ StatusBadge ↗ connected','├─ LeadingIcon ↗ connected','└─ Actions [slot]','   ├─ Button ↗ connected','   └─ IconButton ↗ connected']

export const childTemplates = [
 { name:'Avatar.figma.ts', code:`import figma from '@figma/code-connect'\n\nexport default figma.template({\n  id: 'avatar',\n  component: figma.selectedInstance,\n  metadata: { nestable: true, props: { role: 'avatar' } },\n  imports: ["import { Avatar } from '@company/design-system'"],\n  template: () => <Avatar size="md" fallback={figma.getString('Fallback')} />,\n})` },
 { name:'StatusBadge.figma.ts', code:`export default figma.template({\n  id: 'status-badge', component: figma.selectedInstance,\n  metadata: { nestable: true, props: { role: 'status' } },\n  imports: ["import { Badge } from '@company/design-system'"],\n  template: () => <Badge tone={figma.getEnum('Tone', { Success: 'success', Critical: 'danger' })}>{figma.getString('Label')}</Badge>,\n})` },
 { name:'Button.figma.ts', code:`export default figma.template({\n  id: 'button', component: figma.selectedInstance,\n  metadata: { nestable: true, props: { role: 'action' } },\n  imports: ["import { Button } from '@company/design-system'"],\n  template: () => <Button variant={figma.getEnum('Variant', { Secondary: 'secondary' })}>{figma.getString('Label')}</Button>,\n})` },
 { name:'IconButton.figma.ts', code:`export default figma.template({\n  id: 'icon-button', component: figma.selectedInstance,\n  metadata: { nestable: true, props: { role: 'action' } },\n  imports: ["import { IconButton } from '@company/design-system'"],\n  template: () => <IconButton icon={figma.getInstanceSwap('Icon')} aria-label={figma.getString('Accessible label')} />,\n})` },
]

export const parentTemplate = `import figma from '@figma/code-connect'
import { compactProps } from './figma-helpers'

const avatar = figma.findConnectedInstance('Avatar')
const badge = figma.findConnectedInstance('StatusBadge')
const actions = figma.getSlot('Actions')
const connectedActions = actions.connectedInstances // direct children only
const allButtons = figma.findConnectedInstances('Button')

export default figma.template({
  id: 'notification-card',
  component: figma.selectedInstance,
  imports: ["import { NotificationCard } from '@company/design-system'"],
  metadata: {
    nestable: true,
    props: { pattern: 'notification', children: connectedActions.length },
  },
  template: () => {
    const { renderProp } = figma.helpers.react
    const tone = figma.getEnum('Tone', {
      Info: 'info', Success: 'success', Warning: 'warning', Critical: 'danger',
    })
    const density = figma.getEnum('Density', {
      Comfortable: 'comfortable', Compact: 'compact',
    })

    return <NotificationCard
      {...renderProp('tone', tone)}
      {...renderProp('density', density)}
      {...compactProps({
        elevated: figma.getBoolean('Elevated'),
        dismissible: figma.getBoolean('Dismissible'),
        title: figma.getString('Title'),
        description: figma.getString('Description'),
      })}
      icon={figma.getInstanceSwap('Leading icon')}
      avatar={avatar.hasCodeConnect() ? avatar.executeTemplate() : undefined}
      badge={badge.codeConnectId() === 'status-badge' ? badge.executeTemplate() : undefined}
      data-action-count={allButtons.length}
    >
      {connectedActions.map(child => child.executeTemplate())}
    </NotificationCard>
  },
})`

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
