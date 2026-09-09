'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Icon } from './icons'
const routes=[['Overview','/'],['Features','/features'],['Setup','/setup'],['Alignment','/alignment'],['Case Study','/case-study'],['AI + MCP','/ai-mcp'],['Limitations','/limitations']]
export function SiteHeader(){
 const path=usePathname(),[open,setOpen]=useState(false),button=useRef<HTMLButtonElement>(null),drawer=useRef<HTMLDivElement>(null)
 const isActive=(url:string)=>url==='/'?path===url:path===url||path.startsWith(`${url}/`)
 useEffect(()=>{if(open)drawer.current?.querySelector<HTMLAnchorElement>('a')?.focus()},[open])
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape'&&open){setOpen(false);button.current?.focus()}};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[open])
 return <><header className="site-header"><div className="header-inner"><Link href="/" className="wordmark" translate="no"><span className="mark">⌁</span>Code Connect <span>Field Guide</span></Link><nav aria-label="Primary navigation">{routes.map(([label,url])=><Link key={url} href={url} className={isActive(url)?'active':undefined} aria-current={isActive(url)?'page':undefined}>{label}</Link>)}</nav><a className="github" href="https://github.com/figma/code-connect" target="_blank" rel="noreferrer"><Icon name="github"/>GitHub</a><button ref={button} className="nav-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}><Icon name={open?'close':'menu'}/></button></div></header>{open&&<div ref={drawer} className="mobile-nav" role="dialog" aria-label="Navigation"><nav>{routes.map(([label,url])=><Link key={url} href={url} onClick={()=>setOpen(false)} className={isActive(url)?'active':undefined} aria-current={isActive(url)?'page':undefined}>{label}<Icon name="chevron"/></Link>)}</nav></div>}</>
}
