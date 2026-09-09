'use client'

import { useEffect, useState } from 'react'

type TocItem = readonly [label: string, id: string]

export function ActiveToc({items}:{items:readonly TocItem[]}) {
  const [active,setActive]=useState(items[0]?.[1] ?? '')

  useEffect(()=>{
    const update=()=>{
      const marker=window.scrollY+150
      const current=[...items].reverse().find(([,id])=>{
        const element=document.getElementById(id)
        return element ? element.offsetTop<=marker : false
      })
      setActive(current?.[1] ?? items[0]?.[1] ?? '')
    }
    update()
    window.addEventListener('scroll',update,{passive:true})
    window.addEventListener('hashchange',update)
    return()=>{window.removeEventListener('scroll',update);window.removeEventListener('hashchange',update)}
  },[items])

  return <aside className="toc"><strong>On this page</strong>{items.map(([label,id])=><a key={id} href={`#${id}`} className={active===id?'active':undefined} aria-current={active===id?'location':undefined}>{label}</a>)}</aside>
}
