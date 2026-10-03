import React from "react";
import { motion } from "framer-motion";
import { Scissors, Droplets, Blend, CupSoda } from "lucide-react";
import { ASSETS, COPY, MEDIA } from "@/config";
import { scrollToId } from "@/lib/scroll";

const STEP_ICONS = { scissors: Scissors, droplets: Droplets, blend: Blend, "cup-soda": CupSoda };

export default function Ritual() {
  return (
    <section id="ritual" data-testid="ritual-section" className="bg-frost py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-wrap items-end justify-between gap-8"
        >
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-goldmuted">
              {COPY.ritual.overline}
            </p>
            <h2 className="font-display text-5xl font-medium leading-[1.02] tracking-tight text-navy sm:text-6xl">
              {COPY.ritual.heading[0]}
              <br />
              {COPY.ritual.heading[1]} <span className="italic text-goldmuted">{COPY.ritual.heading[2]}</span>
            </h2>
          </div>
          <img
            src={ASSETS.pineappleSachetClear}
            alt={COPY.ritual.sachetAlt}
            className="hidden w-36 -rotate-6 drop-shadow-[0_26px_38px_rgba(15,23,42,0.25)] md:block lg:w-44"
            loading="lazy"
          />
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" data-testid="ritual-steps">
          {COPY.ritual.steps.map((step, i) => {
            const Icon = STEP_ICONS[step.icon];
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                data-testid={`ritual-step-${step.label.toLowerCase()}`}
                className="group rounded-2xl border border-navy/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,23,42,0.10)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-navy/35">{step.n}</span>
                  <Icon className="h-6 w-6 text-goldmuted transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <h3 className="mt-8 font-display text-3xl font-medium text-navy">{step.label}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy/55">{step.copy}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/45">
          {COPY.ritual.note}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6" data-testid="ritual-moments">
          {MEDIA.ritualMoments.map((m, i) => (
            <motion.figure
              key={m.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
              <figcaption className="absolute bottom-4 left-5 text-[12px] font-bold uppercase tracking-[0.2em] text-frost">
                {m.title}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-12 text-center text-[12px] font-bold uppercase tracking-[0.28em] text-navy/50"
        >
          {COPY.ritual.closing}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <button
            data-testid="ritual-shop-button"
            onClick={() => scrollToId("shop")}
            className="rounded-full bg-navy px-9 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-frost transition-all duration-300 hover:bg-obsidian hover:shadow-[0_14px_36px_rgba(15,23,42,0.28)]"
          >
            {COPY.cta.shopSipWhey}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
