/**
 * ============================================================================
 * SipWhey — CENTRALIZED SITE CONTENT (single source of truth)
 * ============================================================================
 * All editable brand, product, pricing, packaging, flavour, asset, FAQ and
 * page copy lives here. UI components in /sections consume this data and
 * contain no hard-coded product facts.
 *
 * CMS/WordPress-ready: this module can later be replaced by an API fetch
 * that returns the same shape — no component changes required.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// HELPERS (display formatting)
// ---------------------------------------------------------------------------
export const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

// ---------------------------------------------------------------------------
// STORE (external checkout destination — swap when store/Razorpay is live)
// ---------------------------------------------------------------------------
export const STORE_URL = "#";

// ---------------------------------------------------------------------------
// PRODUCT ASSETS (official SipWhey packaging — source of truth for imagery)
// ---------------------------------------------------------------------------
export const ASSETS = {
  logo: "/assets/logo-t.webp",
  pineappleBox: "/assets/box-pineapple.webp",
  pineappleSachet: "/assets/sachet-pineapple.png",
  blueberryBox: "/assets/box-blueberry.webp",
  blueberrySachet: "/assets/sachet-blueberry.png",
  // Transparent cutouts used on dark panels / floating compositions
  pineappleSachetClear: "/assets/sachet-pineapple-t.webp",
  blueberrySachetClear: "/assets/sachet-blueberry-t.webp",
  // Duo visual is composed live from the two selected flavour box images
  duoProductImage: null,
};

// ---------------------------------------------------------------------------
// BRAND
// ---------------------------------------------------------------------------
export const BRAND = {
  brandName: "SipWhey",
  brandNameUpper: "SIPWHEY",
  tagline: "Strength Meets Radiance.",
  taglineWords: ["STRENGTH", "MEETS", "RADIANCE."],
  supportingHeadline: "Protein for your active life. Wellness for everything else.",
  madeForLife: "Not just for the gym. Made for life.",
  socialHandle: "@sipwhey",
  socials: ["Instagram", "Facebook", "YouTube"],
};

// ---------------------------------------------------------------------------
// PRODUCT (nutrition facts — change a value here, it updates everywhere)
// ---------------------------------------------------------------------------
export const PRODUCT = {
  productName: "SipWhey",
  productDescription:
    "A premium clear protein drink — whey protein isolate + hydrolyzed marine collagen in a light, fruity, refreshing format.",
  proteinPerServing: 24.5, // grams — total dual protein per serving
  wheyProtein: 20, // grams — whey protein isolate
  marineCollagen: 5, // grams — hydrolyzed marine collagen
  vitaminC: "Vitamin C",
  addedSugar: "No added sugar",
  proteinFormulaLabel: "Dual-Protein Formula",
  drinkExperience: "Clear. Light. Fruity.",
  experienceLabel: "Clear · Light · Refreshing",
};

// ---------------------------------------------------------------------------
// PACKAGING
// ---------------------------------------------------------------------------
export const PACKAGING = {
  singleBoxCount: 1,
  singleSachetCount: 7,
  duoBoxCount: 2,
  duoSachetCount: 14,
};
PACKAGING.singleSub = `${PACKAGING.singleBoxCount} box · ${PACKAGING.singleSachetCount} sachets`;
PACKAGING.duoSub = `${PACKAGING.duoBoxCount} boxes · ${PACKAGING.duoSachetCount} sachets`;

// ---------------------------------------------------------------------------
// PRICING (savings derived from MRP − launch price)
// ---------------------------------------------------------------------------
const SINGLE_MRP = 1999;
const SINGLE_LAUNCH = 1599;
const DUO_MRP = 3998;
const DUO_LAUNCH = 2999;

export const PRICE = {
  single: {
    label: "Single Box",
    mrp: SINGLE_MRP,
    launch: SINGLE_LAUNCH,
    save: SINGLE_MRP - SINGLE_LAUNCH,
    sub: PACKAGING.singleSub,
  },
  duo: {
    label: "SipWhey Duo",
    mrp: DUO_MRP,
    launch: DUO_LAUNCH,
    save: DUO_MRP - DUO_LAUNCH,
    sub: PACKAGING.duoSub,
  },
};

// ---------------------------------------------------------------------------
// FLAVOURS
// ---------------------------------------------------------------------------
export const FLAVOURS = [
  {
    id: "pineapple",
    slug: "tropical-pineapple",
    name: "Tropical Pineapple",
    tone: "Sun-ripened & bright",
    description:
      "Crisp pineapple with a clean, lightly tart finish — like a tropical cooler poured over ice.",
    accent: "#EAB308",
    deep: "#A16207",
    aura: "rgba(234,179,8,0.20)",
    boxImage: ASSETS.pineappleBox,
    sachetImage: ASSETS.pineappleSachet,
    sachetClearImage: ASSETS.pineappleSachetClear,
    boxAlt: "SipWhey Tropical Pineapple box — premium clear protein",
    sachetAlt: "SipWhey Tropical Pineapple sachet with a clear iced drink",
    availability: "in_stock",
    cta: "Shop This Flavour",
  },
  {
    id: "blueberry",
    slug: "wild-blueberry",
    name: "Wild Blueberry",
    tone: "Dark orchard & cool",
    description:
      "Smooth wild blueberry with a refreshing, subtly sweet finish — calm, cool and clean.",
    accent: "#6366F1",
    deep: "#4F46E5",
    aura: "rgba(99,102,241,0.20)",
    boxImage: ASSETS.blueberryBox,
    sachetImage: ASSETS.blueberrySachet,
    sachetClearImage: ASSETS.blueberrySachetClear,
    boxAlt: "SipWhey Wild Blueberry box — premium clear protein",
    sachetAlt: "SipWhey Wild Blueberry sachet with a clear iced drink",
    availability: "in_stock",
    cta: "Shop This Flavour",
  },
];

// ---------------------------------------------------------------------------
// DERIVED PRODUCT COPY (auto-built from PRODUCT/PACKAGING/PRICE — do not
// edit these directly; change the source values above)
// ---------------------------------------------------------------------------
const WHEY = PRODUCT.wheyProtein;
const COLLAGEN = PRODUCT.marineCollagen;
const TOTAL = PRODUCT.proteinPerServing;

const NUTRITION = {
  formulaLine: `${WHEY}g Whey Protein Isolate + ${COLLAGEN}g Marine Collagen + ${PRODUCT.vitaminC}`,
  formulaParts: [
    `${WHEY}g Whey Protein Isolate`,
    `${COLLAGEN}g Marine Collagen`,
    PRODUCT.vitaminC,
  ],
  formulaShort: `${WHEY}g whey protein isolate + ${COLLAGEN}g hydrolyzed marine collagen`,
  formulaCompact: `${WHEY}g whey isolate + ${COLLAGEN}g marine collagen`,
  dualChip: `${WHEY}g + ${COLLAGEN}g dual-protein`,
  totalLabel: "Total protein per serving",
  totalLabelShort: "Total protein / serving",
};

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------
export const NAV = [
  { label: "Shop", id: "shop", testid: "nav-shop-link" },
  { label: "Why SipWhey", id: "why", testid: "nav-why-sipwhey-link" },
  { label: "Flavours", id: "flavours", testid: "nav-flavours-link" },
  { label: "Reviews", id: "reviews", testid: "nav-reviews-link" },
  { label: "FAQ", id: "faq", testid: "nav-faq-link" },
];

// ---------------------------------------------------------------------------
// ANNOUNCEMENT / MARQUEE
// ---------------------------------------------------------------------------
export const MARQUEE_ITEMS = [
  "Strength Meets Radiance",
  "Protein for your active life",
  "Wellness for everything else",
  "Not just for the gym — made for life",
  PRODUCT.experienceLabel,
];

// ---------------------------------------------------------------------------
// PLACEHOLDER MEDIA (lifestyle/UGC stand-ins until real assets ship)
// ---------------------------------------------------------------------------
export const MEDIA = {
  lifeFrames: [
    { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=70", label: "Morning", alt: "Woman stretching outdoors at sunrise" },
    { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=70", label: "At work", alt: "People working together at a desk" },
    { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=70", label: "On the move", alt: "Traveller walking through a station" },
    { src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=70", label: "Outdoors", alt: "Man running outdoors on a road" },
    { src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=70", label: "Training", alt: "Woman training on a running track" },
  ],
  ritualMoments: [
    { title: "At Work", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=70", alt: "Colleagues working at a desk with laptops" },
    { title: "On the Go", src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=70", alt: "Car on a road trip through the mountains" },
    { title: "After Training", src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=70", alt: "Woman resting after a workout session" },
  ],
  ugcReels: [
    { label: "First Sip", src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=65", alt: "Woman stretching outdoors at sunrise" },
    { label: "At Work", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=65", alt: "People working together at a desk" },
    { label: "Post Workout", src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=65", alt: "Woman training on a running track" },
    { label: "Travel", src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=65", alt: "Travel flat-lay with a map and camera" },
    { label: "Daily Routine", src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=65", alt: "Woman in a yoga pose at home" },
    { label: "Flavour Reaction", src: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=600&q=65", alt: "Fresh fruit arranged on a table" },
  ],
};

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const FAQS = [
  {
    q: "What is SipWhey?",
    a: `SipWhey is a premium clear protein drink — ${WHEY}g whey protein isolate plus ${COLLAGEN}g hydrolyzed marine collagen in a light, fruity, refreshing format. It pours clear, not milky.`,
  },
  {
    q: "What is clear whey protein?",
    a: "A finely filtered whey protein isolate that mixes with water into a transparent, juice-like drink instead of a thick, milky shake.",
  },
  {
    q: "How is SipWhey different from a traditional protein shake?",
    a: "Traditional shakes are heavy, thick and milky. SipWhey mixes with water into a clear, light, fruit-forward drink — no milky heaviness, no added sugar.",
  },
  {
    q: "How much protein is in one serving?",
    a: `Every single-serving sachet delivers ${TOTAL}g of total dual protein — ${WHEY}g whey protein isolate and ${COLLAGEN}g hydrolyzed marine collagen.`,
  },
  {
    q: "What is the whey + marine collagen combination?",
    a: `${WHEY}g whey protein isolate for your everyday active lifestyle, plus ${COLLAGEN}g hydrolyzed marine collagen for your daily wellness routine — a dual-protein formula with ${PRODUCT.vitaminC}.`,
  },
  {
    q: "How should I consume SipWhey?",
    a: "Just add water: tear one sachet, shake or stir, and sip. Optional: serve chilled or over ice for an extra-refreshing experience.",
  },
  {
    q: "Does SipWhey contain added sugar?",
    a: "No. SipWhey contains no added sugar, in any serving or flavour.",
  },
  {
    q: "What flavours are available?",
    a: `Two fruit-forward flavours: ${FLAVOURS.map((f) => f.name).join(" and ")}.`,
  },
  {
    q: "How many servings are in a box?",
    a: `Each box contains ${PACKAGING.singleSachetCount} single-serving sachets.`,
  },
  {
    q: "Is SipWhey suitable for daily use?",
    a: "Yes — SipWhey is made for your everyday routine, on training days and rest days alike. Not just for the gym, made for life.",
  },
];

// ---------------------------------------------------------------------------
// SEO (consumed by <Seo /> in App.js)
// ---------------------------------------------------------------------------
export const SEO = {
  title: `${BRAND.brandName} — Strength Meets Radiance | Premium Clear Protein`,
  siteName: BRAND.brandName,
  description: `${BRAND.brandName} is a premium clear protein drink — ${WHEY}g whey protein isolate + ${COLLAGEN}g hydrolyzed marine collagen, ${TOTAL}g total protein per serving, no added sugar. Clear. Light. Refreshing.`,
  image: ASSETS.pineappleBox,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.brandName,
    description: `Premium clear protein drink. ${WHEY}g whey protein isolate + ${COLLAGEN}g hydrolyzed marine collagen per serving. Strength Meets Radiance.`,
    slogan: BRAND.tagline,
  },
};

// ---------------------------------------------------------------------------
// PAGE COPY (per-section headings, descriptions, CTAs)
// ---------------------------------------------------------------------------
export const COPY = {
  cta: {
    shopSipWhey: "Shop SipWhey",
    shopFlavours: "Shop Flavours",
    discoverSipWhey: "Discover SipWhey",
    trySipWhey: "Try SipWhey",
    shopSingleBox: "Shop Single Box",
    getTheDuo: "Get the Duo",
    addToBag: "Add to bag · keep shopping",
    checkout: "Checkout",
    continueShopping: "Continue shopping",
    remove: "Remove",
  },
  sticky: {
    default: "SHOP SIPWHEY",
    single: `BUY SINGLE · ${inr(PRICE.single.launch)}`,
    duo: `GET DUO · ${inr(PRICE.duo.launch)}`,
  },
  hero: {
    overline: `Premium Clear Protein · ${PRODUCT.proteinFormulaLabel}`,
    subline: `${NUTRITION.formulaShort}.`,
    statLabel: NUTRITION.totalLabelShort,
  },
  lifeInMotion: {
    overline: "01 · Life in Motion",
    heading: ["PROTEIN FOR", "LIFE IN", "MOTION."],
    description:
      "From your desk to your workout, your travels and everything between — SipWhey fits into your everyday routine.",
    tags: ["Office", "Travel", "Gym", "Outdoors", "Home"],
    filmBadge: "The SipWhey Film",
    filmNote: "Full film dropping soon",
  },
  clearPour: {
    overline: "02 · The Clear Difference",
    headingLead: "Why does protein have to feel like a",
    headingEmphasis: "shake?",
    oldWords: "Heavy. Thick. Shake-style.",
    meetLine: "Meet SipWhey.",
    newHeadline: ["More than just", "a protein shake."],
    newHeadlineStatic: "More than just a protein shake.",
    formulaLine: NUTRITION.formulaLine,
    formulaParts: NUTRITION.formulaParts,
    finalStatLabel: NUTRITION.totalLabel,
    finalStatLabelStatic: `${NUTRITION.totalLabelShort} · Dual-protein formula`,
    caption: "The Clear Pour — keep scrolling",
    pineappleAlt: "SipWhey Tropical Pineapple sachet pouring into a clear golden drink with ice",
    blueberryAlt: "SipWhey Wild Blueberry sachet beside a clear iced blueberry drink",
    blueberryAltStatic: "SipWhey Wild Blueberry sachet beside a clear iced drink",
  },
  formula: {
    overline: "03 · Inside the Sachet",
    headingLead: "WHAT MAKES A",
    headingEmphasis: "SIPWHEY?",
    steps: [
      { n: "01", stat: `${WHEY}G`, icon: null, title: "Whey Protein Isolate", copy: "High-quality protein for your everyday active lifestyle." },
      { n: "02", stat: `${COLLAGEN}G`, icon: null, title: "Hydrolyzed Marine Collagen", copy: "A hydrolyzed collagen source for your daily wellness routine." },
      { n: "03", stat: null, icon: "citrus", title: "Vitamin C", copy: "Part of the formula." },
      { n: "04", stat: null, icon: "ban", title: "No Added Sugar", copy: "No added sugar — in any serving, in any flavour." },
      { n: "05", stat: null, icon: "apple", title: "Fruit-Forward Experience", copy: "Light, fruity and refreshing." },
    ],
    finalStatLabel: NUTRITION.totalLabel,
    benefits: [
      { icon: "droplets", label: "Light & Refreshing" },
      { icon: "dumbbell", label: "Supports Lean Muscle" },
      { icon: "sparkles", label: "Skin, Hair & Joints" },
      { icon: "zap", label: "Daily Recovery" },
    ],
    sachetAlt: "SipWhey single-serving sachet — Tropical Pineapple, 30g, one serving",
  },
  ritual: {
    overline: "04 · The Ritual",
    heading: ["YOUR NEW", "DAILY", "RITUAL."],
    steps: [
      { n: "01", icon: "scissors", label: "Tear", copy: "One sachet. One serving." },
      { n: "02", icon: "droplets", label: "Water", copy: "Just add water." },
      { n: "03", icon: "blend", label: "Shake", copy: "Shake or stir — it stays clear." },
      { n: "04", icon: "cup-soda", label: "Sip", copy: "Sip. Go. Enjoy." },
    ],
    note: "Just add water — shake, sip, go. Optional: serve chilled or over ice.",
    closing: "Your protein. Your routine. Your way.",
    sachetAlt: "SipWhey sachet with a clear glass of pineapple protein drink over ice",
  },
  flavours: {
    overline: "05 · The Flavours",
    heading: ["WHAT ARE YOU", "SIPPING TODAY?"],
    chips: [NUTRITION.dualChip, PRODUCT.addedSugar, `With ${PRODUCT.vitaminC}`],
  },
  foundYourSip: {
    heading: ["FOUND YOUR", "SIP?"],
    description: "Choose your flavour and make it part of your daily routine.",
  },
  socialProof: {
    overline: "06 · Real People",
    heading: ["REAL PEOPLE.", "REAL", "SIPWHEY."],
    description:
      "First sips, desk breaks, post-training chills — our community film roll is on its way. Reviews arrive with our first sippers.",
    ugcChip: "UGC dropping soon",
    ctaCardKicker: "Real sips coming soon",
    ctaCardHeading: ["YOUR SIP", "GOES HERE."],
  },
  purchase: {
    overline: "07 · Shop",
    heading: ["YOUR DAILY PROTEIN,", "REIMAGINED."],
    subline: "Clear. Light. Refreshing.",
    valueLine: `${NUTRITION.formulaCompact} · ${TOTAL}g total protein / serving · ${PRODUCT.addedSugar}`,
    launchPriceLabel: "Launch price",
    flavourLabel: "Flavour",
    betterValueLabel: "Better value",
    boxLabels: ["Box 1", "Box 2"],
    singleTitle: `${PRICE.single.label} · ${PACKAGING.singleSub}`,
    duoTitle: `${PRICE.duo.label} · ${PACKAGING.duoSub}`,
    duoPitch: `2 boxes. More to sip. Save ${inr(PRICE.duo.save)}.`,
  },
  brandClose: {
    heading: ["READY TO MAKE YOUR DAILY PROTEIN", "BETTER?"],
    stats: `${TOTAL}g total protein per serving · ${NUTRITION.formulaCompact}`,
  },
  faq: {
    overline: "FAQ",
    heading: ["Everything,", "clearly."],
  },
  footer: {
    exploreLabel: "Explore",
    supportLabel: "Support",
    supportLinks: ["Contact", "Shipping", "Returns", "Privacy", "Terms"],
    newsletterTitle: "Join the SipWhey Routine",
    newsletterDescription: "First access to the store, new flavours and the launch film.",
    emailPlaceholder: "your@email.com",
    subscribeSuccess: "You're on the list.",
    subscribeSuccessDetail: "Welcome to the SipWhey routine.",
    subscribeError: "Something went wrong. Please try again.",
  },
  cart: {
    title: "Your Bag",
    emptyNote: "Nothing here yet",
    pricingNote: "Launch pricing applied",
    emptyTitle: "Your bag is empty.",
    emptyCopy: "Pick a flavour — or two — and make it part of your daily routine.",
    totalLabel: "Cart total",
    addedToast: "Added to your bag.",
    checkoutToast: "Checkout opens with the SipWhey store.",
    checkoutToastDetail: "Launching soon — join the SipWhey routine for first access.",
  },
};
