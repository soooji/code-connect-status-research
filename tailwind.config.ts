import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: { extend: { colors: { ink:'#171717', muted:'#666666', blue:'#0a72ef', pink:'#de1d8d', red:'#ff5b4f' }, fontFamily: { sans:['var(--font-geist-sans)'], mono:['var(--font-geist-mono)'] } } },
  plugins: [],
} satisfies Config
