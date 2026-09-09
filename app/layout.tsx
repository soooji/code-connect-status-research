import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { SiteHeader } from '@/components/site-header'
import './globals.css'
export const metadata:Metadata={title:{default:'Code Connect Field Guide',template:'%s · Code Connect'},description:'A practical field guide for design-system teams adopting Figma Code Connect.'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}><body><SiteHeader/><main>{children}</main><footer className="footer"><div><strong>Code Connect Field Guide</strong><span>Research snapshot · September 2026</span></div><nav aria-label="Footer"><a href="https://developers.figma.com/docs/code-connect/" target="_blank" rel="noreferrer">Figma docs</a><a href="https://github.com/figma/code-connect" target="_blank" rel="noreferrer">GitHub</a></nav></footer></body></html>}
