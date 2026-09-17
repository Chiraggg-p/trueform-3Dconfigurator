# TrueForm SPA — Design & Build Spec (v3 — exact UI match to the Abhiwan reference)

Single-page product experience nested inside the existing Abhiwan Technologies website. Content and copy follow Master Plan v3's Website Plan faithfully. Visual treatment now matches the reference homepage exactly, component for component — this is a change from v2.

---

## 0. Decisions — locked (with one reversal)

| # | Decision |
|---|---|
| 1 | Brand: **Abhiwan Technologies** |
| 2 | Product name: **TrueForm** |
| 3 | **REVERSED from v2:** the reference homepage uses a violet gradient glow in its dark CTA bands. Master Plan's written rule #3 ("no gradient blobs, no glass-morphism") technically forbids this. You've now asked twice for exact fidelity to the reference — that live instruction overrides the written rule for this build. Gradient glow is restored, used exactly where the reference uses it. Flagging this clearly since it's a direct contradiction of a "locked" Master Plan rule, not a stylistic guess. |
| 4 | Commercial tab (Master Plan Section 5) stays fully internal — no onboarding fees, margins, or discount authority on the page |
| 5 | Admin Dashboard section is an illustrative preview, clearly badged, not a live product |

---

## 1. Navigation integration (unchanged)

"Products" — new top-nav item on abhiwan.com. Hover/tap opens a flyout with one tile: **TrueForm — 3D Configurator Platform**. Click opens a dedicated, indexable route (e.g. `/trueform-3d-configurator/`), not a modal. Reuse the site's existing dropdown component if one exists elsewhere in the nav.

---

## 2. Component library — reused directly from the reference homepage

This is the core of "exact same UI." Every TrueForm section below is built from a component that already exists on the reference page — nothing is invented from scratch except where TrueForm genuinely needs something the reference doesn't have (live configurator canvas, AR launch, pricing cards, dashboard preview).

| Reference component | Where it appears on the reference page | Reused for |
|---|---|---|
| Split hero — text 45% left, product photo 55% right, dark bg, small vertical corner tab | Hero | TrueForm Hero |
| Thin logo/credential strip band, evenly spaced items | "Brands that trust us" | Credential strip |
| Before/after reveal slider (drag to compare) | "One digital asset. Endless possibilities." | Configurator material-swap moments |
| Numbered step band — large violet numerals, dark bg, image below each | "From physical product to deployed asset, in six steps" | Product Roadmap (4 steps) |
| Dark moody photo grid, 2×3, edge-to-edge image with label overlay | "Built for the brands defining their categories" | Live Configurator Demo gallery grid |
| Light numbered capability cards, 2×3, hairline border | "A production system, not a service" | Subscription Plans feature comparison / Why TrueForm support |
| Two-column icon + text benefit list | "Key Benefits" | Why TrueForm (bonus reinforcement) |
| Dark CTA band, violet gradient glow top corner, single centered button | "End-to-End 3D Art Outsourcing..." | Contact CTA (closing band) |
| Large hero image + row of 3 smaller thumbnails | "A glimpse of what we've shipped" | Recent Work / case studies |
| Stat row + quote testimonial | "Real stories from brands we serve" | Recent Work stats (8+ years / 50+ specialists / 500+ projects) |
| Small tool-logo grid band | "Technologies We Use" | Optional "Built with" band (bonus, not in Master Plan's list — include only if you want full parity with the reference) |
| Split FAQ — heading left, accordion right | FAQ | FAQ |
| Wordmark + global office grid + link columns | Footer | Footer (unchanged) |

---

## 3. Visual tokens (gradient glow restored)

| Token | Spec |
|---|---|
| Dark background | `#0B0E14` |
| Light body background | Off-white / very light gray, matching the reference's light sections |
| Accent | Violet/indigo — pull exact hex from brand guidelines |
| Gradient glow | Soft radial violet-to-transparent glow, used in dark CTA band corners exactly as the reference does — **now approved**, see decision #3 |
| Numbered badges | Large violet numerals (01, 02...) on dark sections |
| Dark photo-grid cards | No border, image bleeds edge to edge, label overlay |
| Light-section cards | Thin hairline border, generous padding, faint shadow |
| Typography | Bold, large sans-serif headlines; restrained body copy; same proportions as the reference |

---

## 4. Section-by-section spec

### 1. Hero
**Copy:** H1 — *"Let your customers build the product before they buy it."* Sub — *"Real-time 3D configurator, AR preview, and the 3D catalog to run it — from one team. No transaction fees."* CTAs: [Try a live demo] [Book a 20-min walkthrough]. Trust line: Coca-Cola, ISKCON, DP World, Nilkamal, Abu Dhabi Police.

**Designer notes:** Reuse the reference's exact split-hero component — same 45/55 split, same dark `#0B0E14` background, same small vertical tab on the far right edge. Swap the static product photo for a live rotating 3D canvas. Caption beneath: *"Running live on this page. Drag to rotate."*

**Dev notes:** Live Three.js model, GLB Draco-compressed under 2MB, poster image first, lazy-load on viewport entry, mobile loads on tap, WebGL fallback to static render.

### 2. Credential strip
**Copy:** ISO/IEC 27001:2022 Certified · MSME Registered · Made in India · 8+ Years · 50+ Specialists · India, UAE, USA.

**Designer notes:** Reuse the exact "Brands that trust us" strip band — same thin height, same even spacing, same dark banding treatment. Swap logos for text items with small monochrome icons.

**Dev notes:** Static HTML, inline SVG icons, zero JS.

### 3. The problem
**Copy:** H2 — *"Shoppers cannot touch it, so they hesitate."* 1) They cannot picture it. 2) So they do not decide. 3) Building 3D is hard.

**Designer notes:** No exact reference precedent for this one — use plain whitespace-separated columns (no cards, no boxes), matching the reference's typography and spacing scale.

**Dev notes:** Pure HTML/CSS grid, no JS, no scroll animation.

### 4. What you get
**Copy:** H2 — *"One platform. Three things you would otherwise buy separately."* 1) The Configurator. 2) AR in the customer's room. 3) Your 3D catalog, produced by us (visual emphasis — the differentiator).

**Designer notes:** Full-width alternating rows (image/video left–text right, then reversed), ~480px each, using the reference's real-footage-only rule. No direct reference precedent for this exact alternating layout — build it in the reference's color/type system.

**Dev notes:** MP4/WebM loops, muted, autoplay, playsinline, max 1.5MB each, load on viewport entry, poster frame on every video.

### 5. Product Roadmap
**Copy:** H2 — *"From your product photos to live on your site — in 3 to 6 weeks."* 1) Share. 2) We model. 3) We configure. 4) You go live. Published SLA strip beneath: scope lock 4 days · first model 7 days · go-live 3–6 weeks · new model turnaround 5 working days.

**Designer notes:** Reuse the reference's numbered step band exactly — same large violet numerals, same dark background, same image-below-each-step treatment from "From physical product to deployed asset, in six steps." Four steps instead of three/six.

**Dev notes:** Static. Optional connector line draws in on scroll, CSS only, respects `prefers-reduced-motion`.

### 6. Live Configurator Demo
**Copy:** H2 — *"Do not take our word for it. Try it yourself."* One embedded flagship demo (Modular Sofa Planner). Grid linking to seven more: Trolley Suitcase · Automotive Showroom · Sneaker · Watch · Eyewear Try-On · Kitchen Configurator · 360° Product Viewer. CTA: [Open the full demo gallery].

**Designer notes:** Reuse the reference's exact "Built for the brands defining their categories" dark photo-grid component — same 2×3 (extend to fit 7 items), same edge-to-edge moody imagery, same label-overlay treatment. Hover swaps to a 3-second silent loop per the Master Plan.

**Dev notes:** Flagship demo is a full Three.js instance with its own lazy-load/context-suspend behavior (see Section 6). Linked demos keep their own indexable `/demos/` URLs. Track `demo_open`, `demo_interact`, `time_on_canvas`.

### 7. AR Live Demo
**Copy:** *"See it in your own space."* True scale, no app download, iOS + Android. Flagship example: Eyewear Try-On.

**Designer notes:** No direct reference precedent — keep it calm, a phone mockup or QR card, using the reference's light/dark section rhythm around it.

**Dev notes:** WebXR for browser AR; USDZ for iOS Quick Look, GLB for Android Scene Viewer.

### 8. Subscription Plans
**Copy:** H2 — *"Plans that include the 3D work, not just the software."* Launch / Growth (Most chosen) / Scale. Rows: SKUs live, models/month, configurator+AR, embedding, support, **transaction fee = None**. Footer: *"Annual plans, 12-month minimum. Plans start from Rs 35,000 / $449 per month."* CTA: [Get a quote for your catalog].

**Designer notes:** Base the three cards on the reference's light numbered capability-card component from "A production system, not a service" (same hairline border, same light background, same padding) — middle card raised with an accent border and "Most chosen" tag. The **"None"** in the transaction-fee row is bold, in the accent color.

**Dev notes:** Static markup, no pricing API. Keep the "from" qualifier. Quote form: name, company, email, platform, approx. SKU count, category, timeline.

### 9. Why TrueForm
**Copy:** H2 — *"Three ways to get a configurator. Here is the honest comparison."* Build in-house | Global SaaS tools | TrueForm. Rows: 3D models, time to live, transaction fee, cost at scale, who fixes it, custom work.

**Designer notes:** Full-width table on a light background matching the reference's light-section treatment; optionally borrow the "Key Benefits" two-column icon layout as a supporting visual beside the table. TrueForm's column tinted with the accent wash and heavier weight.

**Dev notes:** Semantic `<table>` with `th scope`. Mobile: `position: sticky` on the first column.

### 10. Need only part of this?
**Copy:** H2 — *"Need only part of this?"* → 3D Product Modelling Services. → AR/VR App Development. → 3D Configurator Development. → Talk to us.

**Designer notes:** Light neutral band, 2×2 grid, minimal cards, no images or buttons — visually distinct from the sales sections above it, matching the reference's restrained light-section style.

**Dev notes:** Internal dofollow links, exact descriptive anchor text, one GA4 event per outbound route.

### 11. Admin Dashboard *(preview only)*
**Copy:** *"Manage your whole catalog from one place."* Upload a model, define options and rules, set pricing, see analytics.

**Designer notes:** Clearly badged **"Preview"** in the accent color. Mockup screens, styled consistently with the reference's card system but never presented as a live screenshot.

**Dev notes:** Static images only, no backend connection yet.

### 12. Recent Work *(interim placeholder)*
**Copy:** H2 — *"Built by a studio, not a startup."* Kitchen Configurator, SKYLRK 3D Shoe, Nilkamal Modular Sofa (pending permission — substitute Ace Micromatic). Stats: 8+ years | 50+ specialists | 500+ projects | India, UAE, USA.

**Designer notes:** Reuse the reference's exact two components back to back: the "A glimpse of what we've shipped" large-image + 3-thumbnail portfolio grid, followed by the "Real stories from brands we serve" stat-row treatment (repurposing its 98% / 4.8★ / 90% style layout for the 8+ years / 50+ specialists / 500+ projects stats).

**Dev notes:** Link to existing `/case-studies/` pages, don't duplicate content. Mark clearly as interim in code comments.

### 13. FAQ
**Copy:** 10 questions per Master Plan Section 3 (what a 3D configurator is, whether 3D models are needed first, cost, platform support, page speed, fees, model ownership, onboarding time, leaving the platform, large catalogs). Answers 40–60 words, first sentence directly answerable.

**Designer notes:** Reuse the reference's exact FAQ layout — heading left, accordion right, light background, max 800px accordion width, first item open by default.

**Dev notes:** Answers in the DOM on load, hidden via CSS not JS. FAQPage schema.

### 14. Contact CTA
**Copy:** H3 — *"See your own product in 3D before you commit."* Body — *"Send us one product. We will model it, configure it, and show you a working demo — no charge, no obligation."* CTA: [Request your free pilot model].

**Designer notes:** Reuse the reference's exact dark CTA band — same violet gradient glow in the top corner, same centered single-button layout, as used in "End-to-End 3D Art Outsourcing for Games & Interactive Products."

**Dev notes:** Form: name, company, email, phone, category, file upload (max 25MB), timeline. CRM routing, 60-second auto-responder.

### 15. Footer
Reuse the existing Abhiwan Technologies footer exactly — wordmark, global office grid, link columns, floating chat widget, unchanged.

---

## 5. Global design rules (Master Plan rules, with rule 3 amended per decision #3 above)

1. Max 2 typefaces.
2. No stock photography anywhere.
3. ~~No gradient blobs, no glass-morphism~~ — **Amended:** gradient glow is used exactly where the reference uses it (dark CTA bands). This overrides the written Master Plan rule at explicit client direction.
4. Whitespace over dividers in sections without a direct reference precedent.
5. Sticky CTA bar appears after 60% scroll.
6. Subtle motion, `prefers-reduced-motion` respected.
7. Dark hero + dark closing, light body in between — matching the reference's exact section rhythm (dark hero → dark logo band → light-ish before/after section → dark step band → dark category grid → light capability cards → light benefits → dark CTA → light portfolio → light testimonial → dark tech band → light FAQ → dark footer).

---

## 6. Cross-cutting technical note (unchanged)

Stacking multiple live 3D canvases on one page (hero, flagship configurator demo, AR launch) risks the existing 2.5MB/LCP budget:
- Only one WebGL context active at a time — suspend/destroy off-screen canvases.
- Every canvas lazy-loads strictly on viewport entry.
- Mobile: every canvas loads on tap, never on scroll.
- Re-verify Core Web Vitals against this specific page before launch.

---

## 7. Build prompt — ready to hand to a designer or design tool

```
Design a single-page product application called "TrueForm," nested inside the existing Abhiwan Technologies website. Match the visual system of the reference homepage EXACTLY, component for component — this is not "inspired by," it is the same design system reused for new content.

VISUAL SYSTEM (match the reference exactly):
- Dark background #0B0E14 for hero, step bands, category grids, CTA bands, tech band, and footer. Light off-white background for problem/benefits/pricing/table/FAQ sections. Alternate dark-light-dark-light down the page, same rhythm as the reference.
- Accent: single violet/indigo color for CTAs, numerals, tags, and emphasis text.
- Gradient glow IS used: a soft radial violet-to-transparent glow in the top corner of dark CTA bands, exactly as the reference's "End-to-End 3D Art Outsourcing" band. Do not remove this — it is part of the approved system.
- Large violet numerals (01, 02, 03...) for any step or process content, on dark backgrounds, exactly like the reference's "six steps" section.
- Dark photo-grid cards: edge-to-edge real imagery, no border, label overlay text — exactly like the reference's "Built for the brands defining their categories" grid.
- Light-section cards: thin hairline border, generous padding, faint shadow — exactly like the reference's "A production system, not a service" cards.
- Typography: max 2 typefaces, bold large headlines (52-60px desktop / 32px mobile, max 2 lines), restrained body copy, matching the reference's exact proportions.
- Zero stock photography — every image or video is a real product render or screen capture.
- Sticky "Book a demo" bar appears after 60% scroll.

BUILD THESE 15 SECTIONS IN ORDER, each reusing a named reference component:

1. HERO — reuse the reference's split hero exactly (text 45% left / visual 55% right, dark bg, small vertical corner tab). Headline: "Let your customers build the product before they buy it." Sub: "Real-time 3D configurator, AR preview, and the 3D catalog to run it - from one team. No transaction fees." Buttons: "Try a live demo" (solid accent) / "Book a 20-min walkthrough" (ghost). Live rotating 3D product canvas on the right instead of a static photo. Caption: "Running live on this page. Drag to rotate." Trust line below in plain text, 40% opacity: "Coca-Cola, ISKCON, DP World, Nilkamal, Abu Dhabi Police."

2. CREDENTIAL STRIP — reuse the reference's "Brands that trust us" thin logo-strip band exactly, but with text items instead of logos: "ISO/IEC 27001:2022 Certified · MSME Registered · Made in India · 8+ Years · 50+ Specialists · India, UAE, USA," small monochrome icons, 2x3 on mobile.

3. THE PROBLEM — light background, centered headline "Shoppers cannot touch it, so they hesitate," three whitespace-separated columns, no cards: "They cannot picture it" / "So they do not decide" / "Building 3D is hard."

4. WHAT YOU GET — headline "One platform. Three things you would otherwise buy separately." Three full-width alternating video rows (~480px each): "The Configurator," "AR in the customer's room," "Your 3D catalog, produced by us" (largest, most visually emphasized row).

5. PRODUCT ROADMAP — reuse the reference's numbered step band exactly (large violet 01/02/03/04 numerals, dark background, image below each step): "Share" / "We model" / "We configure" / "You go live." Headline: "From your product photos to live on your site - in 3 to 6 weeks." Small SLA strip beneath: "Scope lock: 4 days · First model: 7 days · Go live: 3-6 weeks · New model turnaround: 5 working days."

6. LIVE CONFIGURATOR DEMO — reuse the reference's "Built for the brands defining their categories" dark photo-grid exactly (edge-to-edge imagery, label overlay). One large embedded live interactive 3D configurator (modular sofa) above the grid, then a grid of 7 more linked demos: Trolley Suitcase, Automotive Showroom, Sneaker, Watch, Eyewear Try-On, Kitchen Configurator, 360 Product Viewer. Hover swaps thumbnail to a 3-second loop. Button: "Open the full demo gallery."

7. AR LIVE DEMO — headline "See it in your own space." Calm layout, phone mockup or QR code, copy: "True scale, on your own phone, no app download - iOS and Android," using Eyewear Try-On as the example.

8. SUBSCRIPTION PLANS — reuse the reference's light numbered capability-card style from "A production system, not a service" as the base for three pricing cards: Launch / Growth (middle, raised, accent border, "Most chosen" tag) / Scale. Rows: SKUs live, models/month, configurator+AR, embedding, support, and a bold accent-colored "None" for transaction fee. Footer line: "Annual plans, 12-month minimum. Plans start from Rs 35,000 / $449 per month." Button: "Get a quote for your catalog."

9. WHY TRUEFORM — full-width 3-column comparison table (Build in-house | Global SaaS tools | TrueForm) on a light background, TrueForm's column tinted with the accent wash. Optionally pair with a "Key Benefits"-style two-column icon list reused from the reference.

10. NEED ONLY PART OF THIS — light neutral band, 2x2 grid of minimal signpost cards (bold heading, 2-3 lines, arrow link, no images or buttons): "3D Product Modelling Services," "AR/VR App Development," "3D Configurator Development," "Talk to us."

11. ADMIN DASHBOARD — badged "Preview" in the accent color. Mockup screens of an upload flow, options builder, and analytics view, styled with the reference's light-card system.

12. RECENT WORK — reuse the reference's "A glimpse of what we've shipped" portfolio layout (one large hero image + row of 3 thumbnails) for Kitchen Configurator, SKYLRK 3D Shoe, Nilkamal Modular Sofa. Immediately below, reuse the reference's "Real stories from brands we serve" stat-row layout, repurposed for: "8+ years | 50+ specialists | 500+ projects | India, UAE, USA."

13. FAQ — reuse the reference's exact split FAQ layout: heading left ("Frequently Asked Questions"), accordion right, light background, max 800px wide, first item open by default. 10 questions covering what a configurator is, 3D model requirements, cost, platform support, page speed, fees, model ownership, onboarding time, leaving the platform, large catalogs.

14. CONTACT CTA — reuse the reference's dark CTA band exactly, violet gradient glow in the top corner, single centered button. Headline: "See your own product in 3D before you commit." Body: "Send us one product. We will model it, configure it, and show you a working demo - no charge, no obligation." Button: "Request your free pilot model."

15. FOOTER — reuse the existing Abhiwan Technologies footer exactly, unchanged: wordmark, global office grid (India/US/UK/UAE/Canada), company/services link columns, socials, floating chat widget.

Respect prefers-reduced-motion throughout. Desktop width 1440px, fully responsive per the per-section mobile notes above (2x3 to 2-column to 1-column patterns as already used on the reference page).
```