import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import './globals.css'
const geist=Geist({subsets:['latin'],variable:'--font-geist-sans',display:'swap'})
const mono=Geist_Mono({subsets:['latin'],variable:'--font-geist-mono',display:'swap'})
export const metadata:Metadata={title:{default:'Code Connect Field Guide',template:'%s · Code Connect'},description:'A practical field guide for design-system teams adopting Figma Code Connect.'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${geist.variable} ${mono.variable}`}><body><SiteHeader/><main>{children}</main><footer className="footer"><div><strong>Code Connect Field Guide</strong><span>Research snapshot · September 2026</span></div><nav aria-label="Footer"><a href="https://developers.figma.com/docs/code-connect/" target="_blank" rel="noreferrer">Figma docs</a><a href="https://github.com/figma/code-connect" target="_blank" rel="noreferrer">GitHub</a></nav></footer></body></html>}
