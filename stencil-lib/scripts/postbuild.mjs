// The package root declares "type": "module" so the ESM dist-custom-elements
// output (dist/components/*.js) resolves correctly for consumers. Stencil's
// `dist` output target also emits a CommonJS bundle under dist/cjs/, which
// needs to be locally re-marked as CommonJS to avoid a dual-package hazard.
import { writeFileSync } from 'node:fs';

writeFileSync(new URL('../dist/cjs/package.json', import.meta.url), JSON.stringify({ type: 'commonjs' }, null, 2) + '\n');
