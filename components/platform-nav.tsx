'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from './icons'

export const platformLinks = [
  ['Overview', '/platform'],
  ['Control Plane', '/platform/control-plane'],
  ['Passport', '/platform/passport'],
  ['Drift', '/platform/drift'],
  ['Change Protocol', '/platform/change-protocol'],
] as const

export function PlatformNav() {
  const path = usePathname()
  const isActive = (href: string) => href === '/platform' ? path === href : path === href || path.startsWith(`${href}/`)
  return <nav className="platform-nav" aria-label="UI Platform sections">{platformLinks.map(([label, href]) => <Link key={href} href={href} className={isActive(href) ? 'active' : undefined} aria-current={isActive(href) ? 'page' : undefined}>{label}<Icon name="chevron" /></Link>)}</nav>
}
