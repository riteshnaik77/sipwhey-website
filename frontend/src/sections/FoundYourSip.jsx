import React from "react";
import { ArrowRight } from "lucide-react";
import { FLAVOURS, COPY } from "@/config";
import { scrollToId } from "@/lib/scroll";

export default function FoundYourSip({ flavour, onSelect }) {
  return (
    <section
      data-testid="found-your-sip-section"
      className="border-y border-navy/8 bg-white py-10 lg:py-14"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-7 px-5 sm:px-8 lg:flex-row lg:justify-between">
        <div className="text-center lg:text-left">
          <h3 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
            {COPY.foundYourSip.heading[0]} <span className="italic text-goldmuted">{COPY.foundYourSip.heading[1]}</span>
          </h3>
          <p className="mt-2 text-sm text-navy/55">
            {COPY.foundYourSip.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {FLAVOURS.map((f) => (
            <button
              key={f.id}
              data-testid={`found-sip-${f.id}`}
              onClick={() => {
                onSelect(f.id);
                scrollToId("shop");
              }}
              aria-pressed={flavour === f.id}
              className={`rounded-full border px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                flavour === f.id
                  ? "border-navy bg-navy text-frost"
                  : "border-navy/15 bg-white text-navy/60 hover:border-navy/40"
              }`}
            >
              {f.name}
            </button>
          ))}
          <button
            data-testid="found-sip-shop-button"
            onClick={() => scrollToId("shop")}
            className="group flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-obsidian transition-all duration-300 hover:shadow-[0_12px_32px_rgba(212,175,55,0.4)]"
          >
            {COPY.cta.shopSipWhey}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
