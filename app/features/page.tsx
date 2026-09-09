import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/page'
import { FeaturesCatalog } from '@/components/features-catalog'
export const metadata:Metadata={title:'Feature catalog'}
export default function FeaturesPage(){return <div className="container"><PageHeader eyebrow="Interactive reference" title="Learn the Template API by example." description="Browse property getters, composition primitives, template controls, and CLI workflows. Every example is a direct link you can share with a teammate."/><Suspense fallback={<p className="catalog-loading">Loading examples…</p>}><FeaturesCatalog/></Suspense></div>}
