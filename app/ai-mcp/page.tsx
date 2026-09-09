import type { Metadata } from 'next'
import { CodeBlock } from '@/components/code-block'
import { Callout, PageHeader, Section } from '@/components/page'
export const metadata:Metadata={title:'AI + MCP'}
const guessed=`<button className="inline-flex h-12 items-center rounded-lg bg-black px-5 text-white">
  Continue
</button>`
const connected=`import { ArrowRightIcon, Button } from '@company/design-system'

<Button size="lg" icon={<ArrowRightIcon />}>
  Continue
</Button>`
export default function AiMcp(){return <div className="container"><PageHeader eyebrow="AI implementation context" title="Give MCP the component contract, not just pixels." description="Figma MCP can expose design context to an AI coding tool. Code Connect makes that context more useful by attaching the production import, API translations, examples, and composed children."/><Section eyebrow="The difference" title="From visual inference to system-aware context"><div className="mcp-compare"><article className="without"><span>Without Code Connect</span><div><strong>Figma visual</strong><i>↓</i><strong>AI guesses implementation</strong><i>↓</i><strong>Custom div / button / CSS</strong></div><p>The model sees appearance and structure, but may not know your component package or conventions.</p></article><article className="with"><span>With Code Connect</span><div><strong>Figma component</strong><i>↓</i><strong>Code Connect mapping</strong><i>↓</i><strong>Figma MCP</strong></div><ul><li>Package import</li><li>Real component</li><li>Prop mapping</li><li>Example composition</li><li>Connected children</li></ul></article></div></Section><Section eyebrow="Concrete example" title="The same Button, with a better prior"><div className="code-compare"><div><p className="mini-label bad">Visual guess</p><CodeBlock filename="GeneratedButton.tsx" language="TSX" code={guessed}/></div><div><p className="mini-label good">Connected context</p><CodeBlock filename="GeneratedButton.tsx" language="TSX" code={connected}/></div></div><div className="mcp-context"><span>Context supplied</span>{['@company/design-system','Button','size: Large → lg','Leading icon → ArrowRightIcon'].map(x=><code key={x}>{x}</code>)}</div></Section><Callout tone="red" title="Context is not correctness">Code Connect can make the intended component discoverable and show a strong usage example. It cannot verify data flow, state, business rules, accessibility behavior, visual fidelity, or runtime correctness. Keep TypeScript, tests, review, and product judgment in the loop.</Callout></div>}
