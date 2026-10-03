import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { ASSETS, BRAND, NAV, COPY } from "@/config";
import { scrollToId } from "@/lib/scroll";

export default function Header({ cartCount, cartOpen, onCartClick, stickyLabel = COPY.sticky.default, onStickyAction }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        data-testid="site-header"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled ? "bg-frost/85 shadow-[0_1px_0_rgba(15,23,42,0.06)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <button
            data-testid="header-logo"
            onClick={() => go("hero")}
            className="flex items-center gap-2.5"
            aria-label="SipWhey home"
          >
            <img src={ASSETS.logo} alt={`${BRAND.brandName} logo`} className="blend-multiply h-9 w-9 object-contain" />
            <span className="text-sm font-bold tracking-[0.22em] text-navy">{BRAND.brandNameUpper}</span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <button
                key={item.id}
                data-testid={item.testid}
                onClick={() => go(item.id)}
                className="group relative text-[13px] font-semibold uppercase tracking-[0.14em] text-navy/70 transition-colors hover:text-navy"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-[width] duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              data-testid="nav-cart-button"
              onClick={onCartClick}
              className="relative rounded-full p-2.5 text-navy transition-colors hover:bg-navy/5"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    data-testid="cart-count-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-navy px-1 text-[10px] font-bold text-frost"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              data-testid="nav-shop-cta-button"
              onClick={() => go("shop")}
              className="hidden rounded-full bg-navy px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-frost transition-all duration-300 hover:bg-obsidian hover:shadow-[0_8px_24px_rgba(15,23,42,0.25)] sm:block"
            >
              {COPY.cta.shopSipWhey}
            </button>
            <button
              data-testid="mobile-menu-button"
              onClick={() => setOpen(true)}
              className="rounded-full p-2.5 text-navy lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-obsidian px-8 py-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={ASSETS.logo}
                  alt={`${BRAND.brandName} logo`}
                  className="h-8 w-8 object-contain drop-shadow-[0_1px_2px_rgba(255,255,255,0.18)]"
                />
                <span className="text-sm font-bold tracking-[0.22em] text-frost">{BRAND.brandNameUpper}</span>
              </div>
              <button
                data-testid="mobile-menu-close"
                onClick={() => setOpen(false)}
                className="rounded-full p-2.5 text-frost"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" strokeWidth={1.6} />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-2" aria-label="Mobile">
              {NAV.map((item, i) => (
                <motion.button
                  key={item.id}
                  data-testid={`mobile-${item.testid}`}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(item.id)}
                  className="border-b border-frost/10 py-5 text-left font-display text-4xl font-medium text-frost transition-colors hover:text-gold"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <motion.button
              data-testid="mobile-shop-cta-button"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              onClick={() => go("shop")}
              className="mt-auto rounded-full bg-gold py-4 text-sm font-bold uppercase tracking-[0.2em] text-obsidian"
            >
              {COPY.cta.shopSipWhey}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scrolled && !open && !cartOpen && (
          <motion.div
            data-testid="mobile-sticky-cta"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 z-40 md:hidden"
          >
            <button
              data-testid="mobile-sticky-shop-button"
              onClick={onStickyAction || (() => go("shop"))}
              className="w-full rounded-full bg-navy py-4 text-sm font-bold uppercase tracking-[0.2em] text-frost shadow-[0_12px_32px_rgba(15,23,42,0.35)]"
            >
              {stickyLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
