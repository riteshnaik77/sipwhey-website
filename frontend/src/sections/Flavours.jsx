import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FLAVOURS, COPY } from "@/config";
import { scrollToId } from "@/lib/scroll";

export default function Flavours({ flavour, onSelect }) {
  const active = FLAVOURS.find((f) => f.id === flavour);

  return (
    <section id="flavours" data-testid="flavours-section" className="bg-pearl py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-goldmuted">
            {COPY.flavours.overline}
          </p>
          <h2 className="font-display text-5xl font-medium leading-[1.02] tracking-tight text-navy sm:text-6xl">
            {COPY.flavours.heading[0]}
            <br />
            <span className="italic text-goldmuted">{COPY.flavours.heading[1]}</span>
          </h2>
        </motion.div>

        <div className="mb-10 flex justify-center" role="tablist" aria-label="Choose a flavour">
          <div className="flex rounded-full border border-navy/10 bg-white p-1.5 shadow-sm">
            {FLAVOURS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={flavour === f.id}
                data-testid={`flavour-toggle-${f.id}`}
                onClick={() => onSelect(f.id)}
                className={`relative rounded-full px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${
                  flavour === f.id ? "text-frost" : "text-navy/55 hover:text-navy"
                }`}
              >
                {flavour === f.id && (
                  <motion.span
                    layoutId="flavour-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: f.deep }}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{f.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-navy/8 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-aura"}
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(700px 420px at 28% 40%, ${active.aura}, transparent 65%)` }}
            />
          </AnimatePresence>

          <div className="relative grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:p-14">
            <div className="grid grid-cols-[1fr_0.85fr] items-center gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-sachet"}
                  initial={{ opacity: 0, x: -30, rotate: -3 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center overflow-hidden rounded-3xl bg-obsidian p-5 shadow-[0_24px_50px_rgba(15,23,42,0.30)]"
                >
                  <img
                    src={active.sachetClearImage}
                    alt={active.sachetAlt}
                    className="w-full drop-shadow-[0_26px_38px_rgba(0,0,0,0.5)]"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-box"}
                  initial={{ opacity: 0, x: 30, rotate: 3 }}
                  animate={{ opacity: 1, x: 0, rotate: 2 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl bg-ivory p-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)] ring-1 ring-navy/8"
                >
                  <img
                    src={active.boxImage}
                    alt={active.boxAlt}
                    className="blend-multiply w-full"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-copy"}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  data-testid="flavour-tone"
                  className="text-[11px] font-bold uppercase tracking-[0.28em]"
                  style={{ color: active.deep }}
                >
                  {active.tone}
                </p>
                <h3 data-testid="flavour-name" className="mt-3 font-display text-4xl font-medium text-navy sm:text-5xl">
                  {active.name}
                </h3>
                <p data-testid="flavour-notes" className="mt-4 max-w-sm text-base leading-relaxed text-navy/65">
                  {active.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {COPY.flavours.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-navy/10 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/60"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <button
                  data-testid="flavour-shop-button"
                  onClick={() => scrollToId("shop")}
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-frost transition-all duration-300 hover:bg-obsidian"
                >
                  {active.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
