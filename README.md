# PARALLEL — THE REALITY ENGINE

> **Reality is only a perspective.**

An interactive architectural experiment in which two parallel realities occupy the same space. Drag a luminous fracture to shift between **UTOPIA** and **COLLAPSE**, activate a cross-reality artifact, and **MERGE THE IMPOSSIBLE** to reveal a third world: **CONVERGENCE**.

Built for a creative-development / Contra portfolio with **React**, **TypeScript**, **SVG**, and **Framer**. No paid assets, APIs, or backend services.

## The experience

- **Enter the world:** editorial opening with a cinematic transition.
- **Fracture reality:** draggable, touch-enabled boundary with speed-reactive light, distortion, particles, and pointer parallax.
- **Cross the boundary:** click or tap a suspended crystal to transform it into fractured, energized fragments.
- **Merge the impossible:** a choreographed collapse and energy burst reveals a distinct hybrid world.
- **Final artifact:** restart the experience or attempt to export a high-resolution PNG still of Convergence.

Includes responsive layouts, keyboard interaction, reduced-motion support, and procedural architectural artwork.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

```bash
npm run typecheck
npm run build
npm run preview
```

## Use inside Framer

1. Open a Framer project and create a new **Code File**.
2. Paste the content of [`framer/ParallelReality.tsx`](framer/ParallelReality.tsx).
3. Add the `ParallelReality` code component to the page.
4. Set its width to **100%** and height to **100vh**; use a minimum height around **540px**.
5. Use the **Opening**, **Fracture**, **Artifact Charged**, and **Preview Hybrid** property controls to inspect the different states.

The actual Framer project is maintained separately in Framer. This repository contains the **complete interactive React code component** and a standalone demo, **not** a byte-for-byte export of Framer's proprietary canvas/site configuration.

## Repository structure

```text
framer/
  ParallelReality.tsx  # original Framer code component and property controls
src/
  ParallelReality.tsx  # same experience without Framer-specific imports
  main.tsx             # standalone React entry
  styles.css           # fullscreen page styles
index.html
package.json
tsconfig.json
vite.config.ts
```

## Design / implementation

The two worlds share procedural architecture and camera geometry, which makes the masked reality shift spatially consistent. The rendering uses layered SVG shapes, gradients, clipping paths, filters, and CSS animation, avoiding expensive realtime 3D requirements. The local demo and Framer version use the same scene logic.

**Note:** This is stylized procedural art, rather than a photorealistic WebGL scene. Browser features such as image download should be verified on the final hosting domain and across target browsers.

---

**PARALLEL** · The Reality Engine · Experimental interactive website
