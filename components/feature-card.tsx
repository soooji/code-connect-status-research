import Link from 'next/link'
import type { CodeConnectExample } from '@/data/features'
import { Icon } from './icons'
export function FeatureCard({example}:{example:CodeConnectExample}){return <Link href={`/features?example=${example.slug}`} scroll={false} className="feature-card"><span className="feature-category">{example.category}</span><code>{example.title}</code><p>{example.description}</p><span className="feature-open">Open example <Icon name="arrow"/></span></Link>}
