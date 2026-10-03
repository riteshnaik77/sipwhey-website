import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Citrus, Ban, Apple, Droplets, Dumbbell, Sparkles, Zap } from "lucide-react";
import { ASSETS, PRODUCT, COPY } from "@/config";

const STEP_ICONS = { citrus: Citrus, ban: Ban, apple: Apple };
const BENEFIT_ICONS = { droplets: Droplets, dumbbell: Dumbbell, sparkles: Sparkles, zap: Zap };

const STEPS = COPY.formula.steps;
const BENEFITS = COPY.formula.benefits;

function StepIcon({ icon, className, strokeWidth }) {
  const Icon = STEP_ICONS[icon];
  return <Icon className={className} strokeWidth={strokeWidth} />;
}

function BenefitIcon({ icon, className, strokeWidth }) {
  const Icon = BENEFIT_ICONS[icon];
  return <Icon className={className} strokeWidth={strokeWidth} />;
}

function Heading() {
  return (
    <div className="text-center">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-goldmuted">
        {COPY.formula.overline}
      </p>
      <h2 className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-navy sm:text-5xl">
        {COPY.formula.headingLead} <span className="italic text-goldmuted">{COPY.formula.headingEmphasis}</span>
      </h2>
    </div>
  );
}

function PinnedExperience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STEPS.length, Math.floor(v * (STEPS.length + 1) * 0.999));
    setActive((prev) => (prev === idx ? prev : idx));
  });
  const sachetScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.02, 0.99]);
  const isFinal = active >= STEPS.length;
  const current = isFinal ? null : STEPS[active];

  return (
    <div ref={ref} className="relative h-[260vh]" data-testid="formula-pinned">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-10 overflow-hidden px-5 sm:px-8">
        <Heading />
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-12">
          <div className="flex flex-col">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                data-testid={`formula-step-${s.n}`}
                className={`flex items-center gap-4 border-l-2 py-4 pl-5 transition-all duration-500 ${
                  i === active ? "translate-x-1.5 border-gold" : "border-navy/10 opacity-35"
                }`}
              >
                <span className="text-[10px] font-bold tracking-[0.2em] text-goldmuted">{s.n}</span>
                <div>
                  {s.stat && (
                    <p className="font-display text-2xl font-semibold leading-none text-navy">{s.stat}</p>
                  )}
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-navy/70">
                    {s.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative" data-testid="formula-sachet-spotlight">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.20), transparent)" }}
            />
            <motion.img
              src={ASSETS.pineappleSachetClear}
              alt={COPY.formula.sachetAlt}
              style={{ scale: sachetScale }}
              className="relative w-[270px] drop-shadow-[0_44px_60px_rgba(15,23,42,0.30)] xl:w-[310px]"
            />
          </div>

          <div className="min-h-[230px]">
            <AnimatePresence mode="wait">
              {isFinal ? (
                <motion.div
                  key="final"
                  data-testid="formula-detail-final"
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-display text-8xl font-semibold leading-none text-navy">
                    {PRODUCT.proteinPerServing}<span className="italic text-goldmuted">G</span>
                  </p>
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.26em] text-navy/70">
                    {COPY.formula.finalStatLabel}
                  </p>
                  <span className="mt-5 inline-block rounded-full border border-gold/50 bg-gold/10 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-goldmuted">
                    {PRODUCT.proteinFormulaLabel}
                  </span>
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3" data-testid="formula-benefits">
                    {BENEFITS.map((b) => (
                      <div key={b.label} className="flex items-center gap-2">
                        <BenefitIcon icon={b.icon} className="h-4 w-4 text-goldmuted" strokeWidth={1.6} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-navy/60">
                          {b.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={current.n}
                  data-testid={`formula-detail-${current.n}`}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {current.stat ? (
                    <p className="font-display text-8xl font-semibold leading-none text-navy">
                      {current.stat}
                    </p>
                  ) : (
                    <StepIcon icon={current.icon} className="h-12 w-12 text-goldmuted" strokeWidth={1.4} />
                  )}
                  <h3 className="mt-4 text-base font-bold uppercase tracking-[0.16em] text-navy">
                    {current.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-base leading-relaxed text-navy/60">{current.copy}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl items-center gap-5">
          <span data-testid="formula-progress" className="text-[11px] font-bold tracking-[0.24em] text-navy/50">
            {String(Math.min(active + 1, STEPS.length)).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 bg-navy/10">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full w-full origin-left bg-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedExperience() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <Heading />
      <div className="relative mx-auto mt-10 w-fit">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.20), transparent)" }}
        />
        <img
          src={ASSETS.pineappleSachetClear}
          alt={COPY.formula.sachetAlt}
          className="relative w-52 drop-shadow-[0_34px_44px_rgba(15,23,42,0.28)]"
          loading="lazy"
        />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            data-testid={`formula-callout-${s.n}`}
            className="rounded-2xl border border-navy/8 bg-white/70 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] font-bold tracking-[0.2em] text-goldmuted">{s.n}</span>
              {s.stat ? (
                <span className="font-display text-4xl font-semibold leading-none text-navy">{s.stat}</span>
              ) : (
                <StepIcon icon={s.icon} className="h-7 w-7 text-goldmuted" strokeWidth={1.6} />
              )}
            </div>
            <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-navy">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy/60">{s.copy}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-14 text-center" data-testid="formula-total-protein">
        <p className="font-display text-7xl font-semibold leading-none text-navy sm:text-8xl">
          {PRODUCT.proteinPerServing}<span className="italic text-goldmuted">G</span>
        </p>
        <p className="mt-3 text-sm font-bold uppercase tracking-[0.3em] text-navy/70">
          {COPY.formula.finalStatLabel}
        </p>
        <span className="mt-5 inline-block rounded-full border border-gold/50 bg-gold/10 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-goldmuted">
          {PRODUCT.proteinFormulaLabel}
        </span>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" data-testid="formula-benefits-mobile">
          {BENEFITS.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-navy/8 bg-white/70 px-3 py-4"
            >
              <BenefitIcon icon={b.icon} className="h-5 w-5 text-goldmuted" strokeWidth={1.6} />
              <span className="text-center text-[9px] font-bold uppercase tracking-[0.14em] text-navy/60">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Formula() {
  const reduce = useReducedMotion();

  return (
    <section id="formula" data-testid="formula-section" className="bg-ivory">
      {reduce ? (
        <StackedExperience />
      ) : (
        <>
          <div className="hidden lg:block">
            <PinnedExperience />
          </div>
          <div className="lg:hidden">
            <StackedExperience />
          </div>
        </>
      )}
    </section>
  );
}
