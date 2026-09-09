'use client'
import { useSearchParams } from 'next/navigation'
import { FeatureCard } from './feature-card'
import { ExampleDrawer } from './example-drawer'
import { featureCategories,features } from '@/data/features'
export function FeaturesCatalog(){const example=useSearchParams().get('example');const selected=features.find(x=>x.slug===example);return <><nav className="filter-row" aria-label="Feature categories">{featureCategories.map((c,i)=><a className={i===0?'active':''} href={i===0?'#catalog':`#${c.toLowerCase()}`} key={c}>{c}</a>)}</nav><div id="catalog" className="catalog">{featureCategories.slice(1).map(category=><section id={category.toLowerCase()} key={category}><div className="catalog-title"><h2>{category}</h2><span>{features.filter(x=>x.category===category).length} examples</span></div><div className="feature-grid">{features.filter(x=>x.category===category).map(x=><FeatureCard key={x.slug} example={x}/>)}</div></section>)}</div><ExampleDrawer example={selected}/></>}
