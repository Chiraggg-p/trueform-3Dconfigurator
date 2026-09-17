<div align="center">

# TrueForm 3D Configurator Studio

### Next-Generation Real-Time 3D Product Customization & AR E-Commerce Engine

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r185-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

<p align="center">
  A high-fidelity WebGL 3D configurator designed for modern e-commerce (Shopify, WooCommerce, and headless stacks). Delivers photorealistic PBR materials, image-based HDR lighting, live mobile AR previews, and an in-canvas drop-up product selector across multiple product categories.
</p>

</div>

---

## ✨ Features

### 🎮 Flagship Interactive 3D Studio
- **PBR Material Pipeline**: Real-time rendering of metallic reflection, micro-roughness, clear-coat transparency, and fabric textures using Three.js `MeshStandardMaterial`.
- **HDR Studio Lighting**: Image-Based Lighting (IBL) via Three.js `RoomEnvironment` and `PMREMGenerator`, plus 3 calibrated presets:
  - ☀️ **Studio Pro** — High-clarity commercial softbox lighting.
  - ⚡ **Cyber Neon** — High-contrast violet and cobalt ambient glow.
  - 🌙 **Moody Dark** — Dramatic low-key cinematic lighting.
- **In-Canvas Drop-Up Product Selector**:
  - Located in the canvas floating toolbar with upward-opening frosted popover.
  - 5 interactive product categories with active icons, AR tags, and chevron navigation:
    1. 🎧 **Headphones** (`Studio Pro Wireless`) — Custom segmented 4-part OBJ mesh with animated **Exploded View / Assembly Mode**, shell colorways, brushed chrome sliders, and perforated leather cushions.
    2. 👟 **Shoes** (`Urban Street Classic`) — Synchronized dual-foot colorways with preserved canvas weave, intact stitching, and vulcanized rubber sidewalls.
    3. 🧳 **Suitcase** (`Hardshell Travel Case`) — Polycarbonate shell finishes and anodized aluminum hardware.
    4. ⌚ **Watch** (`Chronos Elite`) — 316L surgical steel / rose gold finishes, sapphire crystal glass, and sunburst dial complication tones.
    5. 👓 **Eyeglasses** (`Frame Studio AR`) — Polished acetate frames with optical clear, smoke sun, and blue-light filter lenses.
- **Mobile Augmented Reality (AR)**:
  - Instant QR code modal with deep links for **Apple QuickLook** (`.usdz`) on iOS and **Google Scene Viewer** on Android.
  - Live face try-on capability for eyewear with zero app install required.
- **Studio Tooling**:
  - 📸 **4K Snapshot** with direct PNG export.
  - 🌐 **Wireframe / Solid Mesh** inspector toggle.
  - 🔄 **360° Auto-Rotate** and smooth OrbitControls damping.
  - ⚡ **60 FPS** performance monitor badge.
  - 🛡️ **Context-Loss Recovery**: Bulletproof WebGL error handling and React Error Boundary ensuring the app never crashes.

### 🌐 High-Converting Landing Experience
- **Interactive Hero Showcase**: 3D designer studio hero render with perspective tilt and dynamic ambient illumination.
- **Before / After Slider**: Real-time interactive split view comparing raw CAD wireframe with production PBR render.
- **Global Brand Trust & Workflow**: Step-by-step 3D pipeline walkthrough (Model → Configure → Live AR → Deploy).
- **Responsive Design**: Flawless layout across mobile, tablet, laptop, and ultra-wide displays.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Runtime & Framework** | React 19, TypeScript 5.7 |
| **3D & Graphics Engine** | Three.js (r185), OBJLoader, GLTFLoader, RoomEnvironment, PMREMGenerator |
| **Styling** | Tailwind CSS v4 (with `@tailwindcss/vite` plugin), Vanilla CSS |
| **Build & Tooling** | Vite 8, oxfmt, Node.js |
| **Icons & Media** | Lucide React, Canvas Confetti, QRCode |
| **Deployment** | Netlify (configured with `netlify.toml` redirects & automated build) |

---

## 📁 Project Structure

```
├── public/
│   ├── assets/              # High-resolution UI images, avatars, brand logos
│   ├── models/              # 3D assets (GLB, OBJ, MTL, USDZ)
│   │   ├── wireless-headphones-segmented.obj
│   │   ├── Shoes.glb
│   │   ├── Suitcase.glb
│   │   ├── Watch.glb
│   │   ├── Eyeglasses.glb
│   │   └── Eyeglasses.usdz
│   ├── favicon.png
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Configurator3D.tsx    # Flagship 3D Studio, Drop-Up Menu, PBR Pipeline & AR Modal
│   │   ├── ProductViewer.tsx     # Hero 3D showcase & designer preview
│   │   ├── Hero3DCanvas.tsx      # Interactive 3D tilt stage
│   │   └── BeforeAfterSlider.tsx # Interactive CAD vs PBR render comparison
│   ├── App.tsx                   # Full SPA page assembly & sections
│   ├── index.css                 # Tailwind CSS v4 entrypoint & typography
│   └── main.tsx                  # React 19 root mount
├── netlify.toml             # Netlify deployment configuration
├── package.json             # Dependencies and build scripts
├── tsconfig.json            # TypeScript compiler configuration
└── vite.config.ts           # Vite + React + Tailwind v4 config
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18.0 or higher
- **npm** or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Chiraggg-p/trueform-3Dconfigurator.git
   cd trueform-3Dconfigurator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:8443/](http://localhost:8443/) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled bundle will be generated in the `dist/` folder.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🚢 Deployment

### Netlify
This repository includes [`netlify.toml`](./netlify.toml) configured for continuous deployment:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA Redirect**: `/* -> /index.html 200`

Pushing to the `main` branch will automatically trigger a production deployment on Netlify.

Alternatively, you can deploy manually using the Netlify CLI:
```bash
npx netlify deploy --prod --dir=dist
```

---
