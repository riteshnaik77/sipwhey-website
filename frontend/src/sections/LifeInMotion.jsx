import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { BRAND, COPY, MEDIA } from "@/config";

export default function LifeInMotion() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % MEDIA.lifeFrames.length), 3600);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <section id="story" data-testid="life-in-motion-section" className="bg-ivory py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-goldmuted">
            {COPY.lifeInMotion.overline}
          </p>
          <h2 className="font-display text-5xl font-medium leading-[1.02] tracking-tight text-navy sm:text-6xl">
            {COPY.lifeInMotion.heading[0]}
            <br />
            {COPY.lifeInMotion.heading[1]}
            <br />
            <span className="italic text-goldmuted">{COPY.lifeInMotion.heading[2]}</span>
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-navy/70 sm:text-lg">
            {COPY.lifeInMotion.description}
          </p>
          <p className="mt-8 flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.22em] text-navy">
            <span aria-hidden className="h-px w-10 bg-gold" />
            {BRAND.madeForLife}
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {COPY.lifeInMotion.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-navy/12 bg-white/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/65"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[440px]"
          data-testid="life-in-motion-video"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-obsidian shadow-[0_40px_80px_rgba(15,23,42,0.25)] ring-1 ring-navy/10">
            <AnimatePresence mode="sync">
              <motion.img
                key={index}
                src={MEDIA.lifeFrames[index].src}
                alt={MEDIA.lifeFrames[index].alt}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </AnimatePresence>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-obsidian/20" />
            <div className="absolute left-5 top-5 rounded-full border border-frost/25 bg-obsidian/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-frost/90 backdrop-blur-md">
              {COPY.lifeInMotion.filmBadge}
            </div>
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
              <div>
                <p data-testid="film-frame-label" className="font-display text-3xl font-medium italic text-frost">
                  {MEDIA.lifeFrames[index].label}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-frost/60">
                  {COPY.lifeInMotion.filmNote}
                </p>
              </div>
              <button
                data-testid="film-play-pause-button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause film preview" : "Play film preview"}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-frost/30 bg-frost/15 text-frost backdrop-blur-md transition-colors hover:bg-frost/25"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="mt-5 flex justify-center gap-2">
            {MEDIA.lifeFrames.map((_, i) => (
              <button
                key={i}
                data-testid={`film-dot-${i}`}
                onClick={() => { setIndex(i); setPlaying(false); }}
                aria-label={`Show frame ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-400 ${
                  i === index ? "w-8 bg-navy" : "w-1.5 bg-navy/25 hover:bg-navy/45"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
