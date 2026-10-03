import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS, COPY } from "@/config";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" data-testid="faq-section" className="bg-frost py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-goldmuted">{COPY.faq.overline}</p>
          <h2 className="font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
            {COPY.faq.heading[0]} <span className="italic text-goldmuted">{COPY.faq.heading[1]}</span>
          </h2>
        </motion.div>

        <div className="divide-y divide-navy/8 border-y border-navy/8" data-testid="faq-accordion">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} data-testid={`faq-accordion-item-${i + 1}`}>
                <button
                  data-testid={`faq-question-${i + 1}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className={`text-[15px] font-semibold transition-colors ${isOpen ? "text-navy" : "text-navy/75"}`}>
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-goldmuted"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p data-testid={`faq-answer-${i + 1}`} className="max-w-xl pb-6 text-sm leading-relaxed text-navy/60">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
