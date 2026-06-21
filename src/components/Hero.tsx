import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.hero;
  return (
    <section className="relative">
      {/* Full-width ilustracija sela, puna i svijetla */}
      <div className="relative w-full">
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/hero.webp"
            alt={h.mapCaption}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Blagi donji fade, samo da naslov "sjedne" */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />

          {/* Naslov u kompaktnom glass panelu, centriran po visini */}
          <div className="absolute inset-0 flex items-center">
            <div className="container-content">
              <div className="max-w-md animate-fade-up rounded-3xl bg-ink/40 p-5 backdrop-blur-md sm:p-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-ink">
                  ✦ {h.badge}
                </span>
                <h1 className="mt-3 font-display text-3xl font-extrabold leading-[1.05] text-cream text-balance drop-shadow-md sm:text-4xl lg:text-5xl">
                  {h.title}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-cream/90 drop-shadow">{h.subtitle}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={`/${locale}#prvi-krug`} className="btn-primary !px-5 !py-3 !text-sm sm:!text-base">
                    {h.ctaPrimary}
                  </Link>
                  <Link
                    href={`/${locale}#plan`}
                    className="btn !px-5 !py-3 !text-sm border-2 border-cream/40 text-cream hover:bg-cream/10 sm:!text-base"
                  >
                    {h.ctaSecondary}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
