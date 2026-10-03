import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ASSETS, BRAND, PRODUCT, COPY, FLAVOURS } from "@/config";
import { scrollToId } from "@/lib/scroll";

const EASE = [0.22, 1, 0.36, 1];

function MaskedLine({ children, delay = 0 }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBox1 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yBox2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const pineapple = FLAVOURS.find((f) => f.id === "pineapple");
  const blueberry = FLAVOURS.find((f) => f.id === "blueberry");

  return (
    <section
      id="hero"
      ref={ref}
      data-testid="hero-section"
      className="relative overflow-hidden bg-frost"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 78% 30%, rgba(212,175,55,0.10), transparent 60%), radial-gradient(700px 500px at 12% 85%, rgba(15,23,42,0.05), transparent 60%)",
        }}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 pt-28 sm:px-8 lg:min-h-[100svh] lg:grid-cols-2 lg:items-center lg:gap-6 lg:pb-20 lg:pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 lg:col-start-1 lg:row-start-1"
        >
          <motion.p
            data-testid="hero-overline"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="mb-6 text-[11px] font-bold uppercase tracking-[0.32em] text-goldmuted"
          >
            {COPY.hero.overline}
          </motion.p>
          <h1
            data-testid="hero-headline"
            className="font-display text-[16vw] font-semibold leading-[0.95] tracking-tight text-navy sm:text-7xl lg:text-[5.4rem]"
          >
            <MaskedLine delay={0.45}>{BRAND.taglineWords[0]}</MaskedLine>
            <MaskedLine delay={0.58}>
              <span className="italic text-goldmuted">{BRAND.taglineWords[1]}</span>
            </MaskedLine>
            <MaskedLine delay={0.71}>{BRAND.taglineWords[2]}</MaskedLine>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            className="mt-7 max-w-md"
          >
            <p data-testid="hero-subline" className="text-base leading-relaxed text-navy/70 sm:text-lg">
              {COPY.hero.subline}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-bold uppercase tracking-[0.18em] text-navy/60">
              {PRODUCT.experienceLabel}
              <span className="inline-block h-1 w-1 rotate-45 bg-gold" aria-hidden />
              {PRODUCT.addedSugar}
            </p>
          </motion.div>
        </motion.div>

        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
            className="relative mx-auto w-full max-w-[400px] sm:max-w-[460px] lg:max-w-[520px]"
            data-testid="hero-product-composition"
          >
            <motion.div style={{ y: yBox2 }} className="absolute bottom-10 right-0 z-0 w-[38%] rotate-[6deg]">
              <img
                src={ASSETS.blueberryBox}
                alt={blueberry.boxAlt}
                className="blend-multiply w-full drop-shadow-[0_30px_40px_rgba(15,23,42,0.18)]"
              />
            </motion.div>
            <motion.div style={{ y: yBox1 }} className="relative z-10 w-[72%]">
              <motion.img
                src={ASSETS.pineappleBox}
                alt={pineapple.boxAlt}
                className="blend-multiply w-full -rotate-2 drop-shadow-[0_40px_50px_rgba(15,23,42,0.20)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              />
            </motion.div>
            <div
              aria-hidden
              className="absolute -bottom-4 left-[6%] h-10 w-[70%] rounded-[50%] bg-navy/10 blur-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
            data-testid="hero-stat-block"
            className="mx-auto mt-8 flex max-w-[400px] flex-wrap items-center justify-center gap-3 sm:max-w-[460px] lg:max-w-[520px]"
          >
            <div className="rounded-2xl border border-navy/10 bg-white/80 px-6 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <p className="font-display text-4xl font-semibold leading-none text-navy">
                {PRODUCT.proteinPerServing}<span className="italic text-goldmuted">G</span>
              </p>
              <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-navy/55">
                {COPY.hero.statLabel}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="rounded-full border border-gold/45 bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-goldmuted">
                {PRODUCT.experienceLabel}
              </span>
              <span className="rounded-full border border-navy/12 bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-navy/60">
                {PRODUCT.addedSugar}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
          className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:col-start-1 lg:row-start-2 lg:self-start"
        >
          <button
            data-testid="hero-shop-flavours-button"
            onClick={() => scrollToId("flavours")}
            className="rounded-full bg-navy px-9 py-4 text-[13px] font-bold uppercase tracking-[0.18em] text-frost transition-all duration-300 hover:bg-obsidian hover:shadow-[0_14px_36px_rgba(15,23,42,0.28)]"
          >
            {COPY.cta.shopFlavours}
          </button>
          <button
            data-testid="hero-discover-button"
            onClick={() => scrollToId("why")}
            className="rounded-full border border-navy/20 px-9 py-4 text-[13px] font-bold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-frost"
          >
            {COPY.cta.discoverSipWhey}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
