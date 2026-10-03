import React, { useState } from "react";
import { Instagram, Facebook, Youtube, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { ASSETS, BRAND, NAV, COPY } from "@/config";
import { scrollToId } from "@/lib/scroll";

const SOCIAL_ICONS = { Instagram, Facebook, YouTube: Youtube };

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      toast(COPY.footer.subscribeSuccess, { description: COPY.footer.subscribeSuccessDetail });
      setEmail("");
    } catch {
      toast.error(COPY.footer.subscribeError);
    } finally {
      setSending(false);
    }
  };

  return (
    <footer data-testid="site-footer" className="border-t border-frost/10 bg-obsidian pb-28 pt-16 md:pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.3fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={ASSETS.logo}
                alt={`${BRAND.brandName} logo`}
                className="h-9 w-9 object-contain drop-shadow-[0_1px_2px_rgba(255,255,255,0.18)]"
              />
              <span className="text-sm font-bold tracking-[0.22em] text-frost">{BRAND.brandNameUpper}</span>
            </div>
            <p className="mt-6 font-display text-3xl font-medium italic text-frost/85">
              {BRAND.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {BRAND.socials.map((label) => {
                const Icon = SOCIAL_ICONS[label];
                return (
                  <a
                    key={label}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    data-testid={`social-${label.toLowerCase()}`}
                    aria-label={`${BRAND.brandName} on ${label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-frost/15 text-frost/60 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Shop">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-frost/40">{COPY.footer.exploreLabel}</p>
            <ul className="space-y-3">
              {NAV.map((link) => (
                <li key={link.id}>
                  <button
                    data-testid={`footer-${link.id}-link`}
                    onClick={() => scrollToId(link.id)}
                    className="text-sm text-frost/65 transition-colors hover:text-frost"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-frost/40">{COPY.footer.supportLabel}</p>
            <ul className="space-y-3">
              {COPY.footer.supportLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    data-testid={`footer-${label.toLowerCase()}-link`}
                    className="text-sm text-frost/65 transition-colors hover:text-frost"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-frost/40">
              {COPY.footer.newsletterTitle}
            </p>
            <p className="mb-5 text-sm leading-relaxed text-frost/55">
              {COPY.footer.newsletterDescription}
            </p>
            <form onSubmit={subscribe} className="flex gap-2" data-testid="newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="newsletter-email-input"
                placeholder={COPY.footer.emailPlaceholder}
                aria-label="Email address"
                className="w-full rounded-full border border-frost/15 bg-frost/5 px-5 py-3 text-sm text-frost placeholder:text-frost/30 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending}
                data-testid="newsletter-submit-button"
                aria-label="Subscribe"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-obsidian transition-all hover:shadow-[0_8px_24px_rgba(212,175,55,0.4)] disabled:opacity-50"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-frost/10 pt-8 sm:flex-row">
          <p className="text-[11px] uppercase tracking-[0.18em] text-frost/35">
            © {new Date().getFullYear()} {BRAND.brandName}. {BRAND.tagline}
          </p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-frost/35">
            {BRAND.supportingHeadline}
          </p>
        </div>
      </div>
    </footer>
  );
}
