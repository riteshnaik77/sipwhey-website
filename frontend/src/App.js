import React, { useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { Toaster, toast } from "sonner";
import Seo from "@/components/Seo";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Marquee from "@/sections/Marquee";
import LifeInMotion from "@/sections/LifeInMotion";
import ClearPour from "@/sections/ClearPour";
import Formula from "@/sections/Formula";
import Ritual from "@/sections/Ritual";
import Flavours from "@/sections/Flavours";
import FoundYourSip from "@/sections/FoundYourSip";
import SocialProof from "@/sections/SocialProof";
import Purchase from "@/sections/Purchase";
import Faq from "@/sections/Faq";
import Footer from "@/sections/Footer";
import CartDrawer from "@/sections/CartDrawer";
import { FLAVOURS, PRICE, PACKAGING, SEO, COPY, inr } from "@/config";
import { scrollToId } from "@/lib/scroll";

export default function App() {
  const [flavour, setFlavour] = useState("pineapple");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sticky, setSticky] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [reduceMotion]);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.qty * i.unit, 0), [cart]);

  const addItem = (item, open = true) => {
    setCart((prev) => {
      const found = prev.find((i) => i.key === item.key);
      if (found) return prev.map((i) => (i.key === item.key ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
    if (open) {
      setCartOpen(true);
    } else {
      toast(COPY.cart.addedToast, { description: `${item.title} · ${inr(item.unit)}` });
    }
  };

  const addSingle = (flavourId, open = true) => {
    const f = FLAVOURS.find((x) => x.id === flavourId);
    addItem(
      {
        key: `single-${flavourId}`,
        type: "single",
        title: f.name,
        detail: COPY.purchase.singleTitle,
        unit: PRICE.single.launch,
        img: f.boxImage,
      },
      open
    );
  };

  const addDuo = (b1, b2, open = true) => {
    const f1 = FLAVOURS.find((x) => x.id === b1);
    const f2 = FLAVOURS.find((x) => x.id === b2);
    addItem(
      {
        key: `duo-${b1}-${b2}`,
        type: "duo",
        title: PRICE.duo.label,
        detail: `${PACKAGING.duoSub} — ${COPY.purchase.boxLabels[0]}: ${f1.name} · ${COPY.purchase.boxLabels[1]}: ${f2.name}`,
        unit: PRICE.duo.launch,
        imgs: [f1.boxImage, f2.boxImage],
      },
      open
    );
  };

  const updateQty = (key, delta) =>
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));

  const removeItem = (key) => setCart((prev) => prev.filter((i) => i.key !== key));

  const stickyLabel =
    sticky?.type === "duo"
      ? COPY.sticky.duo
      : sticky?.type === "single"
        ? COPY.sticky.single
        : COPY.sticky.default;

  const onStickyAction = () => {
    if (sticky?.type === "duo") addDuo(sticky.duo[0], sticky.duo[1]);
    else if (sticky?.type === "single") addSingle(flavour);
    else scrollToId("shop");
  };

  return (
    <div className="min-h-screen bg-frost">
      <Seo
        title={SEO.title}
        siteName={SEO.siteName}
        description={SEO.description}
        image={SEO.image}
        jsonLd={SEO.jsonLd}
      />
      <div aria-hidden className="grain-overlay pointer-events-none fixed inset-0 z-[70] opacity-[0.05]" />
      <Header
        cartCount={cartCount}
        cartOpen={cartOpen}
        onCartClick={() => setCartOpen(true)}
        stickyLabel={stickyLabel}
        onStickyAction={onStickyAction}
      />
      <main>
        <Hero />
        <Marquee />
        <LifeInMotion />
        <ClearPour />
        <Formula />
        <Ritual />
        <Flavours flavour={flavour} onSelect={setFlavour} />
        <FoundYourSip flavour={flavour} onSelect={setFlavour} />
        <SocialProof />
        <Purchase
          flavour={flavour}
          onFlavourChange={(f) => {
            setFlavour(f);
            setSticky({ type: "single" });
          }}
          onAddSingle={addSingle}
          onAddDuo={addDuo}
          onSelectOffer={setSticky}
        />
        <Faq />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        total={cartTotal}
        onQty={updateQty}
        onRemove={removeItem}
      />
      <Toaster position="bottom-center" toastOptions={{ style: { background: "#0A0D12", color: "#F8FAFC", border: "1px solid rgba(248,250,252,0.12)" } }} />
    </div>
  );
}
