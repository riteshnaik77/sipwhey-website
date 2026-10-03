import React from "react";
import { MARQUEE_ITEMS } from "@/config";

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`whitespace-nowrap px-8 font-display text-2xl sm:text-3xl ${
              i % 2 === 0 ? "font-medium text-navy/85" : "font-medium italic text-goldmuted"
            }`}
          >
            {item}
          </span>
          <span aria-hidden className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/70" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      data-testid="editorial-marquee"
      aria-hidden
      className="overflow-hidden border-y border-navy/8 bg-frost py-6"
    >
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  );
}
