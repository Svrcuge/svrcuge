import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { rich } from "@/lib/rich";
import { GALLERY } from "@/lib/gallery";
import { Icon, IconCheck, IconCoffee } from "./Icons";
import EmailSignupForm from "./EmailSignupForm";
import { SOCIAL, SITE_URL } from "@/lib/config";

function Heading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <div className="eyebrow mb-3 block">{eyebrow}</div>}
      <h2 className="font-display text-3xl font-bold text-ink text-balance sm:text-4xl">{title}</h2>
    </div>
  );
}

/* ── Pariz je osvojen, šta dalje? (priča + crowdfunding) ──── */
export function CrowdfundingSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const c = dict.crowdfunding;
  return (
    <section id="crowdfunding" className="section">
      <div className="container-content">
        {/* Pariz */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">✦ {c.eyebrow}</span>
          <h2 className="font-display text-3xl font-extrabold text-ink text-balance sm:text-4xl">{c.title}</h2>
          <p className="mx-auto mt-5 text-justify text-lg leading-relaxed text-muted">{rich(c.paris[0])}</p>
        </div>

        {/* Brojke */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {c.stats.map((s, i) => (
            <div key={i} className="card text-center">
              <div className="font-display text-3xl font-extrabold text-amber-deep">{s.value}</div>
              <div className="mt-1 text-sm font-semibold text-muted">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link href={`/${locale}/prica`} className="btn-secondary !py-2.5 !text-sm">
            {c.readMore}
          </Link>
          <Link href={`/${locale}/mediji`} className="text-sm font-bold text-amber-deep hover:underline">
            {c.mediaLink} →
          </Link>
        </div>

        {/* Šta dalje */}
        <div className="mx-auto mt-14 max-w-2xl border-2 border-forest bg-forest/10 p-7 text-center" style={{borderRadius:"6px"}}>
          <h3 className="font-display text-2xl font-bold text-forest-deep">{c.nextTitle}</h3>
          <p className="mx-auto mt-3 text-justify text-lg leading-relaxed text-ink/80">{rich(c.nextText)}</p>
        </div>

        {/* Šta je crowdfunding */}
        <div className="mx-auto mt-14 max-w-2xl text-center">
          <h3 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">{c.whatTitle}</h3>
          <p className="mx-auto mt-3 text-justify text-lg leading-relaxed text-muted">{rich(c.intro)}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {c.steps.map((s, i) => (
            <div key={i} className="card relative pt-8">
              <span className="absolute -top-5 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-amber font-display text-xl font-extrabold text-ink shadow-glow">
                {s.num}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Poziv */}
        <div className="mx-auto mt-10 max-w-2xl border-2 border-ink bg-amber/10 p-6 text-center" style={{borderRadius:"6px"}}>
          <p className="text-justify text-lg leading-relaxed text-ink/80">{rich(c.note)}</p>
          <a href={`/${locale}#prvi-krug`} className="btn-primary mt-5">
            {c.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Status prve faze: Rasvjeta ──────────────────────────── */
export function StatusSection({ dict }: { dict: Dictionary }) {
  const s = dict.status;
  return (
    <section id="status" className="section bg-sand">
      <div className="container-content">
        <span className="eyebrow mb-4">✦ {dict.common.statusLabels["in-progress"]}</span>
        <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{s.title}</h2>
        <p className="mt-5 max-w-3xl text-justify text-lg leading-relaxed text-muted">{rich(s.text)}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/rasvjeta.webp"
            alt={s.title}
            loading="lazy"
            className="w-full border-2 border-ink shadow-card" style={{borderRadius:"6px"}}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {s.cards.map((c, i) => (
              <div key={i} className="card flex flex-col gap-1">
                <span className="text-sm font-semibold uppercase tracking-wide text-muted">{c.label}</span>
                <span className="font-display text-lg font-bold text-amber-deep">{c.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Galerija (zamijeni pravim fotkama, vidi src/lib/gallery.ts) */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {GALLERY.map((src, i) => (
            <div
              key={i}
              className={`aspect-[4/3] overflow-hidden border-2 border-ink shadow-card ${
                i === 2 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Kako je sve počelo (full-width slika + tekst preko) ──── */
export function StorySection({ dict }: { dict: Dictionary }) {
  const s = dict.story;
  return (
    <section id="prica" className="relative w-full">
      <div className="relative min-h-[640px] w-full sm:min-h-[560px] lg:aspect-[21/9] lg:min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/illustrations/story.webp" alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-content">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-extrabold text-cream drop-shadow sm:text-4xl">{s.title}</h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-cream/85">
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Šta gradimo dalje (kartice sa slikom) ───────────────── */
const BUILD_IMAGES = [
  "/illustrations/build-playground.webp",
  "/illustrations/build-market.webp",
  "/illustrations/build-konoba.webp",
  "/illustrations/build-events.webp",
];

export function BuildSection({ dict }: { dict: Dictionary }) {
  const b = dict.build;
  return (
    <section id="gradimo" className="section">
      <div className="container-content">
        <Heading title={b.title} />
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">{b.intro}</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {b.cards.map((c, i) => (
            <div
              key={i}
              className="group flex flex-col overflow-hidden border-2 border-ink bg-sand shadow-card transition hover:shadow-soft" style={{borderRadius:"6px"}}
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={BUILD_IMAGES[i % BUILD_IMAGES.length]}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-bold text-ink">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{rich(c.text)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Velika vizija (full-width slika + tekst preko) ───────── */
export function VisionSection({ dict }: { dict: Dictionary }) {
  const v = dict.vision;
  return (
    <section className="relative w-full">
      <div className="relative min-h-[560px] w-full lg:aspect-[16/7] lg:min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/illustrations/vision.webp" alt={v.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-content text-center">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-cream text-balance drop-shadow sm:text-4xl lg:text-5xl">
              {v.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-cream/90 drop-shadow">{rich(v.text, "font-extrabold text-cream")}</p>
            <p className="mx-auto mt-8 max-w-xl font-display text-xl font-bold text-amber drop-shadow sm:text-2xl">
              {v.highlight}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Brojke / domet kampanje ─────────────────────────────── */
export function ReachSection({ dict }: { dict: Dictionary }) {
  const r = dict.reach;
  return (
    <section className="relative w-full overflow-hidden py-16 text-cream sm:py-20" style={{background:"#452D18", borderTop:"3px double #C0A882", borderBottom:"3px double #C0A882"}}>
      <div className="pointer-events-none absolute -right-10 -top-10 text-[12rem] opacity-10">✦</div>
      <div className="container-content relative text-center">
        <span className="inline-block border-2 border-amber bg-amber/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber" style={{borderRadius:"3px"}}>
          ✦ {r.eyebrow}
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold text-cream text-balance sm:text-4xl">
          {r.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg leading-relaxed text-cream/80">{r.intro}</p>
        <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {r.items.map((it, i) => (
            <div key={i}>
              <div className="font-display text-4xl font-extrabold text-amber sm:text-5xl">{it.value}</div>
              <div className="mt-2 text-sm font-semibold text-cream/80">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Roadmap / plan razvoja ──────────────────────────────── */
const STATUS_STYLES: Record<string, string> = {
  done: "bg-forest text-cream",
  "in-progress": "bg-amber text-ink",
  soon: "bg-sand text-ink",
  next: "bg-amber-deep text-cream",
  planned: "bg-paper-light text-muted",
};

// Ikona po fazi: rasvjeta, kampanja, igralište, pijaca, konoba, događaji
const ROADMAP_ICONS = ["light", "coffee", "playground", "market", "cabin", "events"];

export function Roadmap({ dict }: { dict: Dictionary }) {
  const r = dict.roadmap;
  const labels = dict.common.statusLabels as Record<string, string>;
  return (
    <section id="plan" className="section bg-sand">
      <div className="container-content">
        <Heading title={r.title} />
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">{r.intro}</p>
        <ol className="relative mx-auto mt-12 max-w-3xl space-y-5 before:absolute before:left-[27px] before:top-3 before:h-[calc(100%-2rem)] before:w-0.5 before:bg-ink/30">
          {r.phases.map((p, i) => (
            <li key={i} className="relative flex gap-5">
              <span className={`z-10 grid h-14 w-14 shrink-0 place-items-center border-2 border-ink shadow-card ${STATUS_STYLES[p.status] ?? STATUS_STYLES.planned}`} style={{borderRadius:"50%"}}>
                <Icon name={ROADMAP_ICONS[i] ?? "light"} width={26} height={26} />
              </span>
              <div className="card flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
                  <span className={`border border-current px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[p.status] ?? STATUS_STYLES.planned}`} style={{borderRadius:"3px"}}>
                    {labels[p.status] ?? p.status}
                  </span>
                </div>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Prvi krug prijatelja ────────────────────────────────── */
export function FirstCircleSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const c = dict.firstCircle;
  return (
    <section id="prvi-krug" className="section">
      <div className="container-content grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div className="lg:sticky lg:top-28">
          <span className="eyebrow mb-4">✦ {dict.nav.firstCircle}</span>
          <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{c.title}</h2>
          <p className="mt-5 text-justify text-lg leading-relaxed text-muted">{rich(c.text)}</p>
          <p className="mt-4 border border-line bg-amber/10 p-4 text-justify text-lg leading-relaxed text-ink/80" style={{borderRadius:"6px"}}>{rich(c.subtext)}</p>
          {c.waitingCount && (
            <div className="mt-5 flex items-center gap-3 border-2 border-amber bg-amber/10 px-4 py-3" style={{borderRadius:"4px"}}>
              <span className="text-xl">⏳</span>
              <span className="font-semibold text-ink/80">{c.waitingCount}</span>
            </div>
          )}
        </div>
        <div className="card sm:p-7">
          <EmailSignupForm dict={dict} locale={locale} variant="first-circle" />
        </div>
      </div>
    </section>
  );
}

/* ── Kafa za Svrčuge ─────────────────────────────────────── */
export function CoffeeSection({ dict }: { dict: Dictionary }) {
  const c = dict.coffee;
  return (
    <section className="section bg-sand">
      <div className="container-content">
        <div className="grid items-center gap-10 border-2 border-ink bg-sand p-7 shadow-card sm:p-12 lg:grid-cols-[1fr_1.4fr]" style={{borderRadius:"6px"}}>
          <div className="flex flex-col items-center justify-center border-2 border-ink bg-amber/20 p-8 text-center" style={{borderRadius:"6px"}}>
            <IconCoffee width={72} height={72} className="text-amber-deep" />
            <div className="mt-4 font-display text-5xl font-extrabold text-amber-deep">{c.amount}</div>
            <div className="mt-1 text-sm font-semibold uppercase tracking-wide text-muted">{c.amountLabel}</div>
          </div>
          <div>
            <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{c.title}</h2>
            <p className="mt-4 text-justify text-lg leading-relaxed text-muted">{rich(c.text)}</p>
            <p className="mt-3 text-justify text-lg leading-relaxed text-muted">{rich(c.text2)}</p>
            <p className="mt-5 font-display text-xl font-bold text-forest-deep">{c.highlight}</p>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ── Transparentnost ─────────────────────────────────────── */
export function TransparencySection({ dict }: { dict: Dictionary }) {
  const t = dict.transparency;
  return (
    <section id="transparentnost" className="section bg-sand">
      <div className="container-content grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{t.title}</h2>
          <p className="mt-5 text-justify text-lg leading-relaxed text-muted">{rich(t.text)}</p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {t.items.map((it, i) => (
              <li key={i} className="flex items-center gap-2 text-ink/80">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest/15 text-forest-deep">
                  <IconCheck width={15} height={15} />
                </span>
                {it}
              </li>
            ))}
          </ul>
        </div>
        <div className="card flex items-center justify-center bg-amber/10 text-center">
          <p className="max-w-sm text-lg font-semibold leading-relaxed text-amber-deep">{t.placeholder}</p>
        </div>
      </div>
    </section>
  );
}

/* ── Zid prijatelja Svrčuga (full-width slika + tekst preko) ─ */
export function DonorWall({ dict, locale }: { dict: Dictionary; locale: string }) {
  const d = dict.donorWall;
  return (
    <section className="relative w-full">
      <div className="relative min-h-[600px] w-full lg:aspect-[16/7] lg:min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/illustrations/community.webp" alt={d.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-content text-center">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-cream text-balance drop-shadow sm:text-4xl">
              {d.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-cream/90 drop-shadow">{d.text}</p>
            <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-4">
              <div className="border border-cream/30 bg-cream/10 px-6 py-3 backdrop-blur-sm" style={{borderRadius:"6px"}}>
                <span className="font-display text-3xl font-extrabold text-amber">200+</span>
                <span className="ml-2 text-sm font-semibold text-cream/80">donatora iz 24 države</span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`/${locale}/donatori`} className="btn-primary">
                Pogledaj sve donatore
              </a>
              <a href="#prvi-krug" className="btn-secondary !border-cream/30 !text-cream hover:!bg-cream/10">
                {d.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ (čisti HTML accordion, bez JS-a) ────────────────── */
export function FAQ({ dict }: { dict: Dictionary }) {
  const f = dict.faq;
  return (
    <section id="faq" className="section bg-sand">
      <div className="container-content max-w-3xl">
        <Heading title={f.title} />
        <div className="mt-10 space-y-3">
          {f.items.map((item, i) => (
            <details key={i} className="group border-2 border-ink bg-sand px-5 py-4 [&_summary::-webkit-details-marker]:hidden" style={{borderRadius:"6px", boxShadow:"2px 2px 0 rgba(69,45,24,.20)"}}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg font-bold text-ink">
                {item.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center bg-amber/20 text-amber-deep transition group-open:rotate-45" style={{borderRadius:"50%"}}>
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Mapa lokacije ───────────────────────────────────────── */
export function MapSection({ dict }: { dict: Dictionary }) {
  const m = dict.mapSection;
  return (
    <section className="section bg-sand">
      <div className="container-content">
        <Heading eyebrow={`✦ ${m.eyebrow}`} title={m.title} />
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">{m.intro}</p>
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden border-2 border-ink" style={{borderRadius:"6px"}}>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=18.35%2C42.40%2C18.62%2C42.60&layer=mapnik&marker=42.5071%2C18.4783"
            className="h-[420px] w-full"
            title={m.title}
            loading="lazy"
          />
        </div>
        <p className="mt-3 text-center text-sm text-muted">
          <a
            href="https://www.openstreetmap.org/?mlat=42.5071&mlon=18.4783#map=13/42.5071/18.4783"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-deep hover:underline"
          >
            {m.caption} →
          </a>
        </p>
      </div>
    </section>
  );
}

/* ── Društvene mreže ────────────────────────────────────── */
export function SocialSection({ dict }: { dict: Dictionary }) {
  const s = dict.socialSection;
  return (
    <section className="section">
      <div className="container-content">
        <Heading eyebrow={`✦ ${s.eyebrow}`} title={s.title} />
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">{s.intro}</p>
        <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border-2 border-ink bg-sand p-6 shadow-card transition hover:shadow-soft" style={{borderRadius:"6px"}}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] text-2xl text-white">
              📷
            </div>
            <div>
              <div className="font-display text-lg font-bold text-ink">Instagram</div>
              <div className="text-sm text-muted">{s.igFollowers}</div>
              <div className="mt-1 text-sm font-semibold text-amber-deep group-hover:underline">{s.igCta} →</div>
            </div>
          </a>
          <a
            href={SOCIAL.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border-2 border-ink bg-sand p-6 shadow-card transition hover:shadow-soft" style={{borderRadius:"6px"}}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-2xl text-white">
              🎵
            </div>
            <div>
              <div className="font-display text-lg font-bold text-ink">TikTok</div>
              <div className="text-sm text-muted">{s.ttFollowers}</div>
              <div className="mt-1 text-sm font-semibold text-amber-deep group-hover:underline">{s.ttCta} →</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Podijeli priču ─────────────────────────────────────── */
export function ShareSection({ dict, locale }: { dict: Dictionary; locale: string }) {
  const s = dict.share;
  const url = `${SITE_URL}/${locale}`;
  const msg = dict.thankYou?.shareMessage ?? "Pogledaj priču o Svrčugama";
  const enc = encodeURIComponent;
  const links = [
    { label: s.facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, bg: "bg-[#1877F2] text-white" },
    { label: s.whatsapp, href: `https://wa.me/?text=${enc(`${msg} ${url}`)}`, bg: "bg-[#25D366] text-white" },
    { label: s.viber, href: `viber://forward?text=${enc(`${msg} ${url}`)}`, bg: "bg-[#7360F2] text-white" },
    { label: s.twitter, href: `https://twitter.com/intent/tweet?text=${enc(msg)}&url=${enc(url)}`, bg: "bg-ink text-white" },
  ];
  return (
    <section className="section bg-sand">
      <div className="container-content text-center">
        <Heading eyebrow="✦" title={s.title} />
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{s.intro}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`border-2 border-ink px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition hover:opacity-90 ${l.bg}`} style={{borderRadius:"4px", fontFamily:"var(--font-alfa), Georgia, serif"}}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
