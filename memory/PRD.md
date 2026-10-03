# SipWhey — Premium D2C Landing Page

## Original Problem Statement
Full redesign of the official SipWhey website: a premium modern wellness D2C e-commerce landing page. Brand line "STRENGTH MEETS RADIANCE." Positioned as premium daily wellness + clear protein drink (NOT bodybuilding supplement). Strict rules: use only the 5 supplied official assets (logo, pineapple box/sachet, blueberry box/sachet), no AI-recreated packaging, no price in hero, no invented testimonials/reviews/claims, 7–8 sections max, color system frost white/pearl/ivory/obsidian/navy + restrained champagne gold, signature interaction = THE CLEAR POUR, editorial serif + modern grotesk typography, compact FAQ, premium purchase module (₹1,999 → ₹1,599 launch, Duo ₹2,999).

## Architecture
- Frontend: React 19 (CRA/craco), Tailwind, framer-motion 11, lenis smooth scroll, sonner toasts. Single-page landing at `/`.
- Sections (`/app/frontend/src/sections/`): Header (sticky, shrinks on scroll, mobile overlay menu + sticky mobile CTA), Hero (masked line-by-line serif reveal, parallax official boxes), Marquee (slow editorial), LifeInMotion (split editorial + vertical "film" container — ken-burns lifestyle slideshow placeholder with play/pause, swappable for real video), ClearPour (320vh scroll-driven signature: sachet tilt → gold pour stream → ice drop → crossfade to clear blueberry drink, HEAVY.THICK.MILKY → CLEAR.LIGHT.REFRESHING), Formula (central sachet spotlight card + 5 callouts + giant 24.5G), Ritual (TEAR/MIX/CHILL/SIP + At Work/On the Go/After Training), Flavours (interactive selector, accent aura crossfade, official sachet+box per flavour), SocialProof (horizontal UGC reel rail — clearly marked placeholders, no invented reviews), Purchase (pack/flavour/quantity selection, Duo per-box flavours, Shop/Buy CTAs, integrated obsidian brand close), Faq (10-item accordion), Footer (newsletter signup → API).
- Backend: FastAPI `/api/health`, `/api/subscribe` (MongoDB `subscribers` collection, dedupe by email).
- Assets: `/app/frontend/public/assets/` — official logo + boxes + sachets. Boxes (white bg) use `mix-blend-multiply` on light sections; sachets (dark bg) presented in deliberate rounded clipped frames on dark panels.
- SEO: `Seo.jsx` (canonical/og/twitter/jsonld from live origin), `/public/llms.txt`, single h1, alt text everywhere.
- Config: `/app/frontend/src/config.js` — `STORE_URL` placeholder ("#") for external store link; swap when store/Razorpay is ready.

## User Personas
Active urban professionals & wellness enthusiasts (gender-neutral), mobile-first D2C shoppers.

## Implemented (2026-09-17)
- All 8 sections + FAQ + footer per brief; visual rhythm light→ivory→obsidian→ivory→frost→flavour→navy→frost/obsidian
- THE CLEAR POUR signature scroll interaction; lenis momentum scroll; staggered reveals; reduced-motion fallbacks
- Newsletter signup fully working (MongoDB persistence, verified via curl)

## Refinement pass (2026-09-17)
- Sachets re-cut as transparent WebP (PIL floodfill: blueberry via dark-bg flood, pineapple via chroma+luminance candidate mask) — grey/checkerboard backgrounds gone; sachets now float with real alpha shadows in Clear Pour, Formula, Ritual, Flavours
- WHAT MAKES A SIPWHEY rebuilt as a true pinned sticky scroll (380vh): sachet anchored center, left step list 01–05 activates progressively, right detail panel crossfades, 0X/05 progress + gold progress line; final state = 24.5G dual-protein; mobile gets a stacked sachet→steps→24.5G layout
- Purchase rebuilt as two offer cards: Single (₹1,999 struck → ₹1,599, SAVE ₹400, "SHOP SINGLE BOX") and Duo — more prominent, "BETTER VALUE" label, TWO visually separate boxes that swap per Box 1/Box 2 flavour selection (₹3,998 struck → ₹2,999, SAVE ₹999, "GET THE DUO"); quantity stepper removed for clarity
- New compact "FOUND YOUR SIP?" conversion strip after Flavours; contextual CTAs everywhere (Try SipWhey in Clear Pour, Shop SipWhey in Ritual/UGC, Choose Your Flavour in Flavours)
- UGC rail upgraded: larger 9:16 cards with muted lifestyle photo backgrounds + honest "UGC dropping soon" chips + gold "YOUR SIP GOES HERE" CTA card
- Mobile QA: duo card width overflow fixed (max-w constraints), footer bottom padding for sticky CTA, no horizontal overflow

## Production polish pass (2026-09-17)
- Full e-commerce cart: CartDrawer (right-side premium drawer, full-screen on mobile) with line items, unit price × qty, live subtotals, −/+ steppers (floor at 1), Remove, cart total, Checkout CTA, empty state. Header cart icon opens drawer with live item-count badge
- Cart model: single boxes keyed per flavour (₹1,599 each), Duo bundles keyed per box1+box2 combo (₹2,999, never auto-merged with singles); multiple Duos/combos coexist, flavour selections shown per Duo ("Box 1: X · Box 2: Y")
- Purchase CTAs now add directly to cart and open the drawer: SHOP SINGLE BOX / GET THE DUO; brand close scrolls to shop
- Pinned formula scroll tightened 380vh → 300vh (no dead scroll space)
- Verified e2e: single ×2 = ₹3,198; pineapple + blueberry singles; Duo ×2 = ₹5,998; second Duo combo separate line; grand total ₹8,997; badge counts; remove; mobile cart add/qty/reopen
- Checkout currently toasts "store launching soon" until STORE_URL is set in /app/frontend/src/config.js

## Final polish pass 2 (2026-09-17)
- Hero restructured: floating 24.5g card REMOVED from over the packaging — now a static stat block (24.5G + Clear·Light·Refreshing + No added sugar chips) below the product composition on all viewports; mobile order = headline → subline → product → 24.5g block → SHOP SIPWHEY (primary) / Discover (secondary)
- Boxes/logo re-encoded as alpha-preserving WebP (box PNGs were palette+transparency — RGB conversion had filled them green; fixed via RGBA). All product renders verified clean
- Ritual steps now Tear → Water → Shake → Sip ("Just add water — shake, sip, go. Optional: serve chilled or over ice."); ice never required anywhere (Clear Pour copy updated to water+shake; FAQ prep answer updated)
- Formula final state + mobile stacked version gained benefit icon row: Light & Refreshing / Supports Lean Muscle / Skin, Hair & Joints / Daily Recovery
- FAQ rewritten to buyer questions (clear whey, combo, servings per box = 15, daily use, etc.)
- Brand close restructured: "READY TO MAKE YOUR DAILY PROTEIN BETTER?" + stats + Shop CTA first, then STRENGTH MEETS RADIANCE statement
- Cart: Continue shopping button; sticky mobile Shop CTA hides while cart drawer is open
- Responsive QA at 320/375/390/430/768/1024/1440: zero horizontal overflow; repeat add-to-cart merges quantities (verified qty 2 = ₹3,198)
- Razorpay: architecture ready (single STORE_URL switch), no credentials in frontend

## Final polish pass 3 (2026-09-17)
- Counts corrected everywhere: 1 BOX · 7 SACHETS / 2 BOXES · 14 SACHETS (cards, cart lines, FAQ, llms.txt)
- Hero CTAs per final brief: SHOP FLAVOURS (primary) + DISCOVER SIPWHEY (secondary)
- Why SipWhey repositioned: HEAVY. THICK. SHAKE-STYLE. → "MEET SIPWHEY. MORE THAN JUST A PROTEIN SHAKE." + 20g+5g+VitC formula line + Traditional vs SipWhey comparison rows; blueberry cutout inspected — clean, splash art is legitimate packaging artwork
- Fast buy vs add-to-bag: SHOP SINGLE BOX / GET THE DUO add + open cart drawer (drawer shows checkout); secondary "Add to bag · keep shopping" adds with toast, stays on page
- Dynamic sticky mobile CTA: SHOP SIPWHEY → BUY SINGLE · ₹1,599 after single flavour pick → GET DUO · ₹2,999 after duo pick; tapping fast-buys the exact selection; hidden while cart is open
- Value reminder under purchase heading (20g + 5g + 24.5g + no added sugar)
- Pinned formula scroll tightened to 260vh
- Verified: duo fast-buy (Box1+Box2 flavours in cart line), add-to-bag toast flow, sticky label transitions, 390px overflow clean

## Final polish pass 4 (2026-09-17)
- Logo: white background flood-cut to true transparency (logo-t.webp) — no white box in header, mobile menu, or footer (white chips removed); artwork/proportions untouched
- Blueberry sachet: removed 32 floating scanline/streak artifacts via erosion-based connected-component cleanup; packet seal texture and all legitimate artwork preserved; verified clean on white and obsidian
- Why SipWhey rebuilt to formula-first hierarchy inside the existing pinned pour: HEAVY.THICK.SHAKE-STYLE (struck) → "Meet SipWhey. More than just a protein shake." + 20G isolate + 5G collagen + Vit C → 24.5G TOTAL PROTEIN / dual-protein / CLEAR. LIGHT. FRUITY. + Try SipWhey; old Traditional-vs-SipWhey comparison block fully removed; StaticVersion (reduced-motion) updated to match
- Flavour CTA now "SHOP THIS FLAVOUR"; flavour → purchase preselection verified (blueberry picked in flavours arrives selected in purchase card)
- Global QA greps: no "15 sachets"/"30 sachets" anywhere; no ₹1,999-as-Duo occurrence
- Mobile verified: 390px Clear Pour fits viewport, no overflow, transparent logo in header

## Content centralization refactor (2026-09-17)
- `/app/frontend/src/config.js` expanded into the single source of truth: `BRAND` (brandName, tagline, taglineWords, supportingHeadline, madeForLife, socialHandle, socials), `PRODUCT` (proteinPerServing 24.5, wheyProtein 20, marineCollagen 5, vitaminC, addedSugar, proteinFormulaLabel, drinkExperience, experienceLabel), `PACKAGING` (1 box/7 sachets, 2 boxes/14 sachets + derived subs), `PRICE` (MRP/launch per offer, savings derived), `FLAVOURS` (id, slug, name, tone, description, accent/deep/aura, boxImage/sachetImage/sachetClearImage, alts, availability, cta), `ASSETS` (logo, boxes, sachets, clear cutouts), `NAV`, `MARQUEE_ITEMS`, `MEDIA` (placeholder lifestyle/UGC images), `FAQS`, `SEO`, `COPY` (all per-section headings, descriptions, CTA labels, cart/footer/sticky copy), `inr()` formatter
- All 14 sections + App.js rewritten to consume config — zero hard-coded product facts remain in JSX (grep-verified: no 24.5/20g/5g/₹/sachet-count literals outside config.js)
- Icon references stored as string keys in data, mapped to lucide components in UI (Formula, Ritual, Footer socials)
- Design/layout/animation/responsive behavior untouched; regression test passed 100% (cart math, duo lines, flavour persistence, FAQ, newsletter, mobile 390px)
- CMS-ready: config.js can be swapped for an API/WordPress fetch returning the same shape without component changes

## Credentials
No auth in app. Test subscriber emails in DB: test@sipwhey.com, fan@sipwhey.com (safe to delete).

## Backlog / Next
- P0: Real store URL or Razorpay integration (user asked about Razorpay — feasible later), real hero/film video asset swap-in
- P1: Real UGC content + reviews when available; Contact/Shipping/Returns/Privacy/Terms pages
- P2: WebP/AVIF conversion of product PNGs for performance; new flavours via config
