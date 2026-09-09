'use client'
import { useState } from 'react'
import { Icon } from './icons'
export function CodeBlock({code,filename='example.figma.ts',language='TypeScript'}:{code:string,filename?:string,language?:string}){
 const [copied,setCopied]=useState(false)
 async function copy(){await navigator.clipboard.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),1600)}
 return <figure className="code-block"><figcaption><span>{filename}</span><span className="code-language">{language}</span><button onClick={copy} aria-label={`Copy ${filename}`}><Icon name={copied?'check':'copy'}/>{copied?'Copied':'Copy'}</button></figcaption><pre><code>{code}</code></pre><span className="sr-only" aria-live="polite">{copied?`${filename} copied`:''}</span></figure>
}
