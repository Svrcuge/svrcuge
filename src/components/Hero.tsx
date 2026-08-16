import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.hero;
  return (
    <section className="relative">
      <div className="relative w-full">
        {/* Slika sela */}
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/hero.webp"
            alt={h.mapCaption}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Narandžasti baner */}
        <div
          className="bg-amber-deep text-cream text-center py-4 px-5"
          style={{ borderTop: "2px solid #452D18", borderBottom: "2px solid #452D18" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/logo-white.png" alt="Svrčuge" className="mx-auto mb-1" style={{ height: "80px" }} />
          <div className="text-[11px] font-bold tracking-[0.28em] uppercase mb-1">SELO U ZALEĐU HERCEG NOVOG</div>
          <div
            className="leading-tight text-cream mb-1"
            style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "clamp(28px, 6vw, 44px)" }}
          >
            OD SVJETLA DO ŽIVOTA
          </div>
          <div className="text-[12px] tracking-[0.08em] text-cream/90">SELO KOJE SE BUDI IZ ZABORAVA</div>
        </div>
      </div>

      {/* Uvodni tekst */}
      <div className="container-content py-6">
        <p className="text-base leading-relaxed sm:text-lg max-w-2xl mx-auto text-center">{h.subtitle}</p>
      </div>

      {/* Statistički chipovi */}
      <div className="container-content pb-6">
        <div className="flex flex-wrap gap-3 justify-center">
          <div className="stat-chip" style={{ transform: "rotate(-2deg)" }}>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "17px" }}>14 km</div>
            <div className="text-[9.5px] font-bold tracking-[0.1em] uppercase">od Herceg Novog</div>
          </div>
          <div className="stat-chip" style={{ transform: "rotate(1.5deg)", background: "#F6EBD3" }}>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "17px" }}>5</div>
            <div className="text-[9.5px] font-bold tracking-[0.1em] uppercase">mještana</div>
          </div>
          <div
            className="stat-chip text-cream"
            style={{ transform: "rotate(-1deg)", background: "#55704F", borderColor: "#452D18" }}
          >
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "17px" }}>2026</div>
            <div className="text-[9.5px] font-bold tracking-[0.1em] uppercase">prvo svjetlo</div>
          </div>
        </div>
      </div>

      {/* Jovica kartica */}
      <div className="container-content pb-8">
        <div
          className="max-w-2xl mx-auto flex gap-4 items-start p-4 bg-sand"
          style={{ border: "2px solid #452D18", borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.35)" }}
        >
          <div
            className="flex-none overflow-hidden border-2 border-ink"
            style={{ width: "74px", height: "74px", borderRadius: "50%", flexShrink: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/putnici/01.webp" alt={h.jovicaName} className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-accent">{h.jovicaLabel}</div>
            <div
              className="mt-0.5 mb-1.5"
              style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "17px" }}
            >
              {h.jovicaName}
            </div>
            <p className="text-[13.5px] leading-snug text-ink/85">{h.jovicaText}</p>
            <Link href={`/${locale}/prica`} className="mt-2 inline-block text-sm font-semibold text-amber-deep hover:underline">
              {h.jovicaLink} →
            </Link>
          </div>
        </div>
      </div>

      {/* CTA dugmad */}
      <div className="container-content pb-12 flex flex-wrap gap-3 justify-center">
        <Link href={`/${locale}#prijava`} className="btn-primary">
          {h.ctaPrimary}
        </Link>
        <Link href={`/${locale}/prica`} className="btn-secondary">
          {h.ctaSecondary}
        </Link>
      </div>
    </section>
  );
}
