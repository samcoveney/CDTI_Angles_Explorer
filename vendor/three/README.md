# three.js 0.160.0 (vendored)

Copied from https://cdn.jsdelivr.net/npm/three@0.160.0/ so the explorer works without a CDN:

- `three.module.min.js` - build/three.module.min.js
- `OrbitControls.js` - examples/jsm/controls/OrbitControls.js
- `CSS2DRenderer.js` - examples/jsm/renderers/CSS2DRenderer.js
- `LICENSE` - three.js MIT licence

One change from the originals: in the two add-ons, `from 'three'` is replaced by
`from './three.module.min.js'`, so they load without an import map.
