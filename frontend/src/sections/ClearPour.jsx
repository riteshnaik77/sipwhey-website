import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ASSETS, PRODUCT, COPY } from "@/config";
import { scrollToId } from "@/lib/scroll";

function StaticVersion() {
  return (
    <section id="why" data-testid="clear-pour-section" className="bg-obsidian px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-goldmuted">
            {COPY.clearPour.overline}
          </p>
          <h2 className="font-display text-4xl font-medium leading-[1.05] text-frost sm:text-6xl">
            {COPY.clearPour.headingLead}{" "}
            <span className="italic text-frost/60">{COPY.clearPour.headingEmphasis}</span>
          </h2>
          <p className="mt-6 text-xl font-bold uppercase tracking-[0.2em] text-frost/30 line-through">
            {COPY.clearPour.oldWords}
          </p>
          <p className="mt-8 font-display text-4xl font-medium italic text-gold sm:text-5xl">
            {COPY.clearPour.newHeadlineStatic}
          </p>
          <p className="mt-5 max-w-md text-[13px] font-bold uppercase leading-loose tracking-[0.16em] text-frost/75">
            {COPY.clearPour.formulaLine}
          </p>
          <p className="mt-6 font-display text-5xl font-semibold text-frost">
            {PRODUCT.proteinPerServing}<span className="italic text-gold">G</span>{" "}
            <span className="ml-3 align-middle font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-frost/60">
              {COPY.clearPour.finalStatLabelStatic}
            </span>
          </p>
          <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-frost/50">
            {PRODUCT.drinkExperience}
          </p>
          <button
            data-testid="pour-try-cta-button"
            onClick={() => scrollToId("shop")}
            className="mt-10 rounded-full bg-gold px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-obsidian transition-shadow hover:shadow-[0_12px_36px_rgba(212,175,55,0.4)]"
          >
            {COPY.cta.trySipWhey}
          </button>
        </div>
        <img
          src={ASSETS.blueberrySachetClear}
          alt={COPY.clearPour.blueberryAltStatic}
          className="mx-auto w-full max-w-md drop-shadow-[0_50px_70px_rgba(0,0,0,0.6)]"
        />
      </div>
    </section>
  );
}

export default function ClearPour() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const sachetRotate = useTransform(scrollYProgress, [0, 0.38], [0, -14]);
  const sachetY = useTransform(scrollYProgress, [0, 0.38], [0, -36]);
  const pineappleOpacity = useTransform(scrollYProgress, [0.42, 0.58], [1, 0]);
  const blueberryOpacity = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);
  const streamHeight = useTransform(scrollYProgress, [0.16, 0.42], ["0%", "72%"]);
  const streamOpacity = useTransform(scrollYProgress, [0.14, 0.2, 0.44, 0.56], [0, 1, 1, 0]);
  const iceOpacity = useTransform(scrollYProgress, [0.34, 0.48], [0, 1]);
  const iceY = useTransform(scrollYProgress, [0.34, 0.5], [-44, 0]);
  const oldWords = useTransform(scrollYProgress, [0.02, 0.12, 0.26, 0.34], [0, 1, 1, 0]);
  const midWords = useTransform(scrollYProgress, [0.36, 0.48, 0.6, 0.68], [0, 1, 1, 0]);
  const midWordsY = useTransform(scrollYProgress, [0.36, 0.52], [36, 0]);
  const finalWords = useTransform(scrollYProgress, [0.72, 0.84], [0, 1]);
  const finalWordsY = useTransform(scrollYProgress, [0.72, 0.88], [36, 0]);
  const stageScale = useTransform(scrollYProgress, [0.6, 0.9], [0.92, 1]);

  if (reduce) return <StaticVersion />;

  return (
    <section id="why" ref={ref} data-testid="clear-pour-section" className="relative h-[320vh] bg-obsidian">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 500px at 70% 55%, rgba(99,102,241,0.10), transparent 60%), radial-gradient(600px 400px at 20% 20%, rgba(212,175,55,0.06), transparent 60%)",
          }}
        />
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative z-10 pt-16 lg:pt-0">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-goldmuted">
              {COPY.clearPour.overline}
            </p>
            <h2 className="max-w-xl font-display text-4xl font-medium leading-[1.06] text-frost sm:text-6xl">
              {COPY.clearPour.headingLead}{" "}
              <span className="italic text-frost/60">{COPY.clearPour.headingEmphasis}</span>
            </h2>
            <div className="relative mt-6 min-h-[200px] sm:min-h-[290px] lg:mt-8 lg:min-h-[330px]">
              <motion.p
                style={{ opacity: oldWords }}
                data-testid="pour-old-words"
                className="absolute text-lg font-bold uppercase tracking-[0.22em] text-frost/35 line-through decoration-frost/40 sm:text-2xl"
              >
                {COPY.clearPour.oldWords}
              </motion.p>
              <motion.div style={{ opacity: midWords, y: midWordsY }} data-testid="pour-new-words" className="absolute">
                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-gold">
                  {COPY.clearPour.meetLine}
                </p>
                <p className="mt-2 font-display text-3xl font-medium italic leading-[1.08] text-frost sm:text-5xl">
                  {COPY.clearPour.newHeadline[0]}
                  <br />
                  {COPY.clearPour.newHeadline[1]}
                </p>
                <p className="mt-4 max-w-sm text-[12px] font-bold uppercase leading-loose tracking-[0.16em] text-frost/75 sm:text-[13px]">
                  {COPY.clearPour.formulaParts[0]} <span className="text-gold">+</span> {COPY.clearPour.formulaParts[1]}{" "}
                  <span className="text-gold">+</span> {COPY.clearPour.formulaParts[2]}
                </p>
              </motion.div>
              <motion.div style={{ opacity: finalWords, y: finalWordsY }} data-testid="pour-final-words" className="absolute">
                <p className="font-display text-5xl font-semibold leading-none text-frost sm:text-7xl">
                  {PRODUCT.proteinPerServing}<span className="italic text-gold">G</span>
                </p>
                <p className="mt-2.5 text-[11px] font-bold uppercase tracking-[0.26em] text-frost/75">
                  {COPY.clearPour.finalStatLabel}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-goldmuted">
                  {PRODUCT.proteinFormulaLabel}
                </p>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-frost/50">
                  {PRODUCT.drinkExperience}
                </p>
                <button
                  data-testid="pour-try-cta-button"
                  onClick={() => scrollToId("shop")}
                  className="mt-6 rounded-full bg-gold px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-obsidian transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(212,175,55,0.45)] lg:mt-8"
                >
                  {COPY.cta.trySipWhey}
                </button>
              </motion.div>
            </div>
          </div>

          <motion.div style={{ scale: stageScale }} className="relative mx-auto w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[420px]" data-testid="clear-pour-stage">
            <div className="relative aspect-[4/5]">
              <motion.img
                src={ASSETS.pineappleSachetClear}
                alt={COPY.clearPour.pineappleAlt}
                style={{ rotate: sachetRotate, y: sachetY, opacity: pineappleOpacity }}
                className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_50px_70px_rgba(0,0,0,0.55)]"
                loading="lazy"
              />
              <motion.img
                src={ASSETS.blueberrySachetClear}
                alt={COPY.clearPour.blueberryAlt}
                style={{ opacity: blueberryOpacity }}
                className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_50px_70px_rgba(0,0,0,0.55)]"
                loading="lazy"
              />
              <motion.div
                aria-hidden
                style={{ height: streamHeight, opacity: streamOpacity }}
                className="absolute left-1/2 top-[26%] w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-gold via-gold/70 to-transparent"
              />
              <motion.div aria-hidden style={{ opacity: iceOpacity, y: iceY }} className="absolute bottom-[14%] left-[30%] flex gap-3">
                <span className="block h-6 w-6 rotate-12 rounded-md border border-frost/40 bg-frost/15 backdrop-blur-sm" />
                <span className="block h-5 w-5 -rotate-6 rounded-md border border-frost/30 bg-frost/10 backdrop-blur-sm" />
              </motion.div>
            </div>
            <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-frost/35">
              {COPY.clearPour.caption}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 h-px w-40 -translate-x-1/2 bg-frost/15">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-full w-full origin-left bg-gold" />
        </div>
      </div>
    </section>
  );
}
