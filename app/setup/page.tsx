import type { Metadata } from 'next'
import { CodeBlock } from '@/components/code-block'
import { Callout, PageHeader, Section } from '@/components/page'
export const metadata:Metadata={title:'Setup'}
const config=`{
  "codeConnect": {
    "include": ["src/**/*.figma.ts"],
    "exclude": ["**/*.test.*", "**/node_modules/**"],
    "label": "React",
    "parser": "custom",
    "interactiveSetupFigmaFileUrl": "https://www.figma.com/design/FILE_KEY/Design-System"
  }
}`
const button=`import figma from '@figma/code-connect'

const label = figma.getString('Label')
const size = figma.getEnum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' })
const disabled = figma.getBoolean('Disabled')

export default figma.template({
  id: 'button',
  component: figma.selectedInstance,
  figma: 'https://www.figma.com/design/FILE_KEY/…?node-id=120-44',
  source: './Button.tsx',
  componentName: 'Button',
  imports: ["import { Button } from '@company/design-system'"],
  template: () => <Button size={size} disabled={disabled}>{label}</Button>,
})`
const ci=`name: Publish Code Connect
on:
  push:
    branches: [main]
    paths: ['src/**/*.figma.ts', 'figma.config.json']

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions: { contents: read }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npx figma connect parse --config figma.config.json
      - run: npx figma connect publish --config figma.config.json
        env:
          FIGMA_ACCESS_TOKEN: \${{ secrets.FIGMA_ACCESS_TOKEN }}`
export default function Setup(){return <div className="container docs-layout"><article><PageHeader eyebrow="Recommended setup" title="Start with template files." description="Keep each mapping beside its production component. Review it like code, preview the output, and publish only after the public snippet is intentional."/><Section id="install" eyebrow="01 · Install" title="Add the CLI to your design system"><CodeBlock filename="Terminal" language="Bash" code="npm install --save-dev @figma/code-connect"/><CodeBlock filename="Project structure" language="Text" code={`src/\n  components/\n    button/\n      Button.tsx\n      Button.figma.ts\n    avatar/\n      Avatar.tsx\n      Avatar.figma.ts\nfigma.config.json`}/></Section><Section id="config" eyebrow="02 · Configure" title="Define one explicit publishing scope"><p className="body-copy">Keep include/exclude patterns narrow. Use separate config files and labels when web, iOS, Android, or distinct packages share a Figma library.</p><CodeBlock filename="figma.config.json" language="JSON" code={config}/><Callout title="Confirm against your installed CLI">Config fields and command flags can change. Run <code>figma connect --help</code> and use the official documentation for your installed version before automating publishing.</Callout></Section><Section id="button" eyebrow="03 · Connect" title="Map a production Button"><p className="body-copy">The template identifies the Figma component, source file, public component, property translations, imports, and final snippet. It uses <code>figma.selectedInstance</code> rather than the legacy React parser.</p><CodeBlock filename="src/components/button/Button.figma.ts" code={button}/></Section><Section id="workflow" eyebrow="04 · CLI workflow" title="Create, inspect, then publish"><div className="command-list">{[['create','Scaffold or interactively create mappings.'],['preview','Open a local preview to inspect rendered examples.'],['parse','Parse templates without publishing—ideal for validation.'],['publish','Upload reviewed mappings to Figma.'],['unpublish','Remove published mappings from the selected scope.'],['migrate','Convert legacy parser mappings into current templates.']].map(([cmd,desc])=><div key={cmd}><code>npx figma connect {cmd}</code><p>{desc}</p></div>)}</div><p className="body-copy small">Use <code>--config</code> to select a config and the command’s documented directory/file selectors to narrow scope. Use dry-run, force, or overwrite options only where <code>--help</code> confirms support. Pass <code>FIGMA_ACCESS_TOKEN</code> through your secret manager—never a committed file.</p></Section><Section id="ci" eyebrow="05 · Automation" title="Parse on every change; publish from main"><CodeBlock filename=".github/workflows/code-connect.yml" language="YAML" code={ci}/><Callout title="Use least privilege">Store the token as an encrypted CI secret, limit who can modify the publishing workflow, and protect the environment that can publish mappings.</Callout></Section><Section id="migration" eyebrow="06 · Migration" title="Move legacy parsers deliberately"><p className="body-copy">React and Storybook framework parsers stopped active maintenance on August 17, 2026. Use <code>migrate</code> as a starting point, then review URLs, imports, translations, and composition before publishing the new <code>.figma.ts</code> output.</p></Section></article><aside className="toc"><strong>On this page</strong>{[['Install','install'],['Configure','config'],['Button template','button'],['CLI workflow','workflow'],['CI publishing','ci'],['Migration','migration']].map(x=><a key={x[1]} href={`#${x[1]}`}>{x[0]}</a>)}</aside></div>}
