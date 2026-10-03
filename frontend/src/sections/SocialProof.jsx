import React from "react";
import { motion } from "framer-motion";
import { Clapperboard, ArrowRight } from "lucide-react";
import { BRAND, COPY, MEDIA } from "@/config";
import { scrollToId } from "@/lib/scroll";

export default function SocialProof() {
  return (
    <section id="reviews" data-testid="social-proof-section" className="bg-navy py-20 lg:py-28">
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
              {COPY.socialProof.overline}
            </p>
            <h2 className="font-display text-5xl font-medium leading-[1.02] tracking-tight text-frost sm:text-6xl">
              {COPY.socialProof.heading[0]}
              <br />
              {COPY.socialProof.heading[1]} <span className="italic text-gold">{COPY.socialProof.heading[2]}</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-sm leading-relaxed text-frost/50">
              {COPY.socialProof.description}
            </p>
            <button
              data-testid="ugc-shop-button"
              onClick={() => scrollToId("shop")}
              className="mt-5 rounded-full border border-frost/25 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-frost transition-all duration-300 hover:border-gold hover:text-gold"
            >
              {COPY.cta.shopSipWhey}
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        data-testid="ugc-rail"
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-1440px)/2+2rem))]"
      >
        {MEDIA.ugcReels.map((reel, i) => (
          <div
            key={reel.label}
            data-testid={`ugc-card-${i}`}
            className="group relative aspect-[9/16] w-[240px] shrink-0 snap-start overflow-hidden rounded-3xl border border-frost/10 sm:w-[272px]"
          >
            <img
              src={reel.src}
              alt={reel.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-55 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-obsidian/40" />
            <div className="absolute left-4 top-4 rounded-full border border-frost/20 bg-obsidian/40 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-frost/90 backdrop-blur-sm">
              {reel.label}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-2 rounded-full border border-frost/20 bg-obsidian/45 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.22em] text-frost/75 backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                <Clapperboard className="h-3.5 w-3.5" strokeWidth={1.6} />
                {COPY.socialProof.ugcChip}
              </span>
            </div>
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-frost/50">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em]">{BRAND.socialHandle}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        ))}

        <button
          data-testid="ugc-cta-card"
          onClick={() => scrollToId("shop")}
          className="group relative flex aspect-[9/16] w-[240px] shrink-0 snap-start flex-col justify-between rounded-3xl bg-gold p-6 text-left transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(212,175,55,0.35)] sm:w-[272px]"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-obsidian/60">
            {COPY.socialProof.ctaCardKicker}
          </p>
          <div>
            <p className="font-display text-4xl font-medium leading-[1.05] text-obsidian">
              {COPY.socialProof.ctaCardHeading[0]}
              <br />
              <span className="italic">{COPY.socialProof.ctaCardHeading[1]}</span>
            </p>
            <span className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-obsidian px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-frost transition-transform duration-300 group-hover:scale-105">
              {COPY.cta.shopSipWhey}
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </button>
      </motion.div>
    </section>
  );
}
