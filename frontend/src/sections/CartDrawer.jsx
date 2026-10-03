import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Lock } from "lucide-react";
import { toast } from "sonner";
import { STORE_URL, COPY, inr } from "@/config";
import { scrollToId } from "@/lib/scroll";

export default function CartDrawer({ open, onClose, items, total, onQty, onRemove }) {
  const checkout = () => {
    if (STORE_URL && STORE_URL !== "#") {
      window.open(STORE_URL, "_blank", "noopener");
    } else {
      toast(COPY.cart.checkoutToast, {
        description: COPY.cart.checkoutToastDetail,
      });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            data-testid="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-obsidian/50 backdrop-blur-sm"
          />
          <motion.aside
            data-testid="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed right-0 top-0 z-[90] flex h-full w-full flex-col bg-frost shadow-2xl sm:max-w-[440px]"
            role="dialog"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-navy/10 px-6 py-5">
              <div>
                <h2 className="font-display text-2xl font-semibold text-navy">{COPY.cart.title}</h2>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-navy/45">
                  {items.length === 0 ? COPY.cart.emptyNote : `${items.reduce((s, i) => s + i.qty, 0)} item${items.reduce((s, i) => s + i.qty, 0) > 1 ? "s" : ""} · ${COPY.cart.pricingNote}`}
                </p>
              </div>
              <button
                data-testid="cart-close-button"
                onClick={onClose}
                aria-label="Close cart"
                className="rounded-full p-2.5 text-navy transition-colors hover:bg-navy/5"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div data-testid="cart-empty" className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy/5 text-navy/40">
                    <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <p className="font-display text-2xl font-medium text-navy">{COPY.cart.emptyTitle}</p>
                  <p className="max-w-[240px] text-sm text-navy/55">
                    {COPY.cart.emptyCopy}
                  </p>
                  <button
                    data-testid="cart-empty-shop-button"
                    onClick={() => {
                      onClose();
                      scrollToId("shop");
                    }}
                    className="mt-2 rounded-full bg-navy px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-frost transition-colors hover:bg-obsidian"
                  >
                    {COPY.cta.shopSipWhey}
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-navy/8">
                  {items.map((item, idx) => (
                    <li key={item.key} data-testid={`cart-item-${idx}`} className="flex gap-4 py-5">
                      <div className="flex h-20 w-20 shrink-0 items-end justify-center overflow-hidden rounded-xl bg-white ring-1 ring-navy/8">
                        {item.type === "duo" ? (
                          <div className="flex items-end gap-1 pb-1">
                            <img src={item.imgs[0]} alt={item.title} className="blend-multiply h-14 w-auto -rotate-3" />
                            <img src={item.imgs[1]} alt="" className="blend-multiply h-12 w-auto rotate-3" />
                          </div>
                        ) : (
                          <img src={item.img} alt={item.title} className="blend-multiply h-16 w-auto pb-1" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-navy">{item.title}</p>
                        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy/50">
                          {item.detail}
                        </p>
                        <div className="mt-2.5 flex items-center gap-3">
                          <div className="flex items-center gap-3 rounded-full border border-navy/12 px-2.5 py-1.5">
                            <button
                              data-testid={`cart-qty-decrease-${idx}`}
                              onClick={() => onQty(item.key, -1)}
                              aria-label="Decrease quantity"
                              className="text-navy/60 transition-colors hover:text-navy"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span data-testid={`cart-qty-${idx}`} className="w-5 text-center text-[13px] font-bold text-navy">
                              {item.qty}
                            </span>
                            <button
                              data-testid={`cart-qty-increase-${idx}`}
                              onClick={() => onQty(item.key, 1)}
                              aria-label="Increase quantity"
                              className="text-navy/60 transition-colors hover:text-navy"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            data-testid={`cart-remove-${idx}`}
                            onClick={() => onRemove(item.key)}
                            className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy/40 underline-offset-2 transition-colors hover:text-navy hover:underline"
                          >
                            {COPY.cta.remove}
                          </button>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-[11px] text-navy/45">
                          {inr(item.unit)} × {item.qty}
                        </p>
                        <p data-testid={`cart-subtotal-${idx}`} className="mt-1 font-display text-xl font-semibold text-navy">
                          {inr(item.unit * item.qty)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-navy/10 bg-white px-6 py-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-navy/55">{COPY.cart.totalLabel}</span>
                  <span data-testid="cart-total" className="font-display text-4xl font-semibold text-navy">
                    {inr(total)}
                  </span>
                </div>
                <button
                  data-testid="cart-checkout-button"
                  onClick={checkout}
                  className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-navy py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-frost transition-all duration-300 hover:bg-obsidian hover:shadow-[0_14px_36px_rgba(15,23,42,0.28)]"
                >
                  <Lock className="h-4 w-4" strokeWidth={1.8} />
                  {COPY.cta.checkout}
                </button>
                <button
                  data-testid="cart-continue-shopping"
                  onClick={onClose}
                  className="mt-4 w-full py-1 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-navy/45 transition-colors hover:text-navy"
                >
                  {COPY.cta.continueShopping}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
