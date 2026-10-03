import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Zap } from "lucide-react";
import { FLAVOURS, PRICE, BRAND, COPY, inr } from "@/config";
import { scrollToId } from "@/lib/scroll";

function FlavourPills({ value, onChange, testid }) {
  return (
    <div className="flex flex-wrap gap-2" data-testid={testid}>
      {FLAVOURS.map((f) => (
        <button
          key={f.id}
          data-testid={`${testid}-${f.id}`}
          onClick={() => onChange(f.id)}
          aria-pressed={value === f.id}
          className={`rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
            value === f.id
              ? "border-navy bg-navy text-frost"
              : "border-navy/15 bg-white text-navy/60 hover:border-navy/40"
          }`}
        >
          {f.name}
        </button>
      ))}
    </div>
  );
}

export default function Purchase({ flavour, onFlavourChange, onAddSingle, onAddDuo, onSelectOffer }) {
  const [duo, setDuo] = useState(["pineapple", "blueberry"]);
  const singleBox = FLAVOURS.find((f) => f.id === flavour);
  const duoBoxes = duo.map((d) => FLAVOURS.find((f) => f.id === d));

  return (
    <section id="shop" data-testid="purchase-section" className="bg-frost pt-16 lg:pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-goldmuted">
            {COPY.purchase.overline}
          </p>
          <h2 className="font-display text-5xl font-medium leading-[1.02] tracking-tight text-navy sm:text-6xl">
            {COPY.purchase.heading[0]}
            <br />
            <span className="italic text-goldmuted">{COPY.purchase.heading[1]}</span>
          </h2>
          <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.28em] text-navy/45">
            {COPY.purchase.subline}
          </p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/40">
            {COPY.purchase.valueLine}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            data-testid="purchase-single-card"
            className="rounded-[2rem] border border-navy/8 bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-9"
          >
            <div className="flex h-52 items-end justify-center sm:h-60" data-testid="purchase-single-visual">
              <AnimatePresence mode="wait">
                <motion.img
                  key={singleBox.id}
                  src={singleBox.boxImage}
                  alt={singleBox.boxAlt}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="blend-multiply h-full object-contain drop-shadow-[0_26px_32px_rgba(15,23,42,0.18)]"
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
            <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.24em] text-navy/45">
              {COPY.purchase.singleTitle}
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p data-testid="single-regular-price" className="text-sm text-navy/40 line-through">
                  {inr(PRICE.single.mrp)}
                </p>
                <p data-testid="single-launch-price" className="font-display text-5xl font-semibold leading-none text-navy">
                  {inr(PRICE.single.launch)}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy/40">
                  {COPY.purchase.launchPriceLabel}
                </p>
              </div>
              <span
                data-testid="single-save"
                className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-goldmuted"
              >
                Save {inr(PRICE.single.save)}
              </span>
            </div>
            <div className="mt-7">
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-navy/50">{COPY.purchase.flavourLabel}</p>
              <FlavourPills value={flavour} onChange={onFlavourChange} testid="purchase-flavour-single" />
            </div>
            <button
              data-testid="shop-single-box-button"
              onClick={() => onAddSingle(flavour)}
              className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-full border border-navy/20 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-navy hover:text-frost"
            >
              <ShoppingBag className="h-4 w-4" />
              {COPY.cta.shopSingleBox}
            </button>
            <button
              data-testid="add-single-to-bag-button"
              onClick={() => onAddSingle(flavour, false)}
              className="mt-3.5 w-full py-1 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-navy/45 transition-colors hover:text-navy"
            >
              {COPY.cta.addToBag}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            data-testid="purchase-duo-card"
            className="relative rounded-[2rem] border border-gold/50 bg-white p-7 shadow-[0_34px_80px_rgba(15,23,42,0.14)] sm:p-9 lg:-translate-y-3"
          >
            <span className="absolute -top-3 left-8 rounded-full bg-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-obsidian shadow-sm">
              {COPY.purchase.betterValueLabel}
            </span>
            <div className="flex h-52 items-end justify-center gap-5 overflow-hidden sm:h-60" data-testid="purchase-duo-visual">
              <AnimatePresence mode="wait">
                <motion.img
                  key={duoBoxes[0].id}
                  src={duoBoxes[0].boxImage}
                  alt={`SipWhey ${duoBoxes[0].name} box — Duo box 1`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="blend-multiply relative z-10 h-full w-auto max-w-[47%] -rotate-2 object-contain drop-shadow-[0_26px_30px_rgba(15,23,42,0.22)]"
                  loading="lazy"
                />
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.img
                  key={duoBoxes[1].id}
                  src={duoBoxes[1].boxImage}
                  alt={`SipWhey ${duoBoxes[1].name} box — Duo box 2`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="blend-multiply h-[92%] w-auto max-w-[47%] rotate-2 object-contain drop-shadow-[0_26px_30px_rgba(15,23,42,0.22)]"
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
            <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.24em] text-navy/45">
              {COPY.purchase.duoTitle}
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p data-testid="duo-regular-price" className="text-sm text-navy/40 line-through">
                  {inr(PRICE.duo.mrp)}
                </p>
                <p data-testid="duo-launch-price" className="font-display text-5xl font-semibold leading-none text-navy">
                  {inr(PRICE.duo.launch)}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy/40">
                  {COPY.purchase.launchPriceLabel}
                </p>
              </div>
              <span
                data-testid="duo-save"
                className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-goldmuted"
              >
                Save {inr(PRICE.duo.save)}
              </span>
            </div>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/45">
              {COPY.purchase.duoPitch}
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-navy/50">{COPY.purchase.boxLabels[0]}</p>
                <FlavourPills value={duo[0]} onChange={(f) => { const nd = [f, duo[1]]; setDuo(nd); onSelectOffer({ type: "duo", duo: nd }); }} testid="purchase-flavour-box1" />
              </div>
              <div>
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-navy/50">{COPY.purchase.boxLabels[1]}</p>
                <FlavourPills value={duo[1]} onChange={(f) => { const nd = [duo[0], f]; setDuo(nd); onSelectOffer({ type: "duo", duo: nd }); }} testid="purchase-flavour-box2" />
              </div>
            </div>
            <button
              data-testid="get-the-duo-button"
              onClick={() => onAddDuo(duo[0], duo[1])}
              className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-navy py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-frost transition-all duration-300 hover:bg-obsidian hover:shadow-[0_14px_36px_rgba(15,23,42,0.28)]"
            >
              <Zap className="h-4 w-4" />
              {COPY.cta.getTheDuo}
            </button>
            <button
              data-testid="add-duo-to-bag-button"
              onClick={() => onAddDuo(duo[0], duo[1], false)}
              className="mt-3.5 w-full py-1 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-navy/45 transition-colors hover:text-navy"
            >
              {COPY.cta.addToBag}
            </button>
          </motion.div>
        </div>
      </div>

      <div className="mt-20 bg-obsidian py-20 lg:mt-24 lg:py-28" data-testid="brand-close">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-frost sm:text-5xl">
              {COPY.brandClose.heading[0]}{" "}
              <span className="italic text-gold">{COPY.brandClose.heading[1]}</span>
            </h3>
            <p className="mx-auto mt-5 max-w-lg text-[12px] font-bold uppercase tracking-[0.2em] leading-relaxed text-frost/55">
              {COPY.brandClose.stats}
            </p>
            <button
              data-testid="brand-close-shop-button"
              onClick={() => scrollToId("shop")}
              className="mt-9 rounded-full bg-gold px-10 py-4 text-[13px] font-bold uppercase tracking-[0.2em] text-obsidian transition-all duration-300 hover:shadow-[0_16px_44px_rgba(212,175,55,0.35)]"
            >
              {COPY.cta.shopSipWhey}
            </button>
          </motion.div>

          <div aria-hidden className="mx-auto my-16 h-px w-28 bg-gold/30" />

          <motion.h4
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl font-medium leading-[1.0] tracking-tight text-frost sm:text-8xl"
          >
            {BRAND.taglineWords[0]}
            <br />
            <span className="italic text-gold">{BRAND.taglineWords[1]}</span> {BRAND.taglineWords[2]}
          </motion.h4>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mx-auto mt-7 max-w-md text-base leading-relaxed text-frost/60"
          >
            {BRAND.supportingHeadline}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
