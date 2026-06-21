import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { PRESS } from "@/lib/press";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VIDEOS = [
  { ytId: "7c1XWS43zzs", label: "Put za svjetlost (2026)" },
  { ytId: "NpDLCWGwUzM", label: "Gostovanje na ATV jutro" },
  { ytId: "h2_Y9GQjpp8", label: "Gostovanje na Alternativnoj TV" },
  { ytId: "BRz8Rg1SuJM", label: "Gostovanje na K3 televiziju" },
  { ytId: "HcDTHzqYhVE", label: "Gostovanje na Mondo.ba" },
  { ytId: "9AfB1419eLo", label: "Gostovanje na TOK TV" },
  { ytId: "F43jo5dG5EM", label: "Gostovanje na RTRS televiziji" },
  { ytId: "7bsyZgDI9GI", label: "Gostovanje na Nova S" },
  { ytId: "Uz9jTXh0_kc", label: "Gostovanje na RTHN" },
  { ytId: "KF5unEqq1M4", label: "Gostovanje na Prva TV" },
  { ytId: "q9zrXDZVeIs", label: "Gostovanje na RTCG" },
  { ytId: "l5QTdy_hvvg", label: "Gostovanje na TV E" },
];

// Slike se rotiraju kroz kartice (nemamo sliku po članku).
const MEDIA_IMAGES = [
  "/illustrations/reno-pariz.webp",
  "/illustrations/reno-put.webp",
  "/illustrations/docek.webp",
  "/illustrations/hero.webp",
  "/illustrations/vision.webp",
  "/illustrations/community.webp",
  "/illustrations/story.webp",
  "/illustrations/rasvjeta.webp",
  "/illustrations/stubovi.webp",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getDictionary(locale).media;
  return { title: `${m.title} — Svrčuge`, description: m.intro };
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const m = dict.media;
  const r = dict.reach;

  // Tačno 6 članaka iz najpopularnijih medija ide sa slikom; svi ostali u tabeli.
  const FEATURED_URLS = new Set([
    "https://www.telegraf.rs/vesti/jugosfera/4278291-o-ovom-selu-prica-ceo-balkan-mestani-renoom-4-krecu-do-pariza-razlog-je-neverovatan",
    "https://www.blic.rs/slobodno-vreme/selo-bez-rasvete-krece-ka-parizu-u-renaultu-4-misija-iz-crne-gore-odusevila-region/tjj91z7",
    "https://www.politika.rs/sr/clanak/749857/renoom-4-u-pariz-po-rasvetu-i-buducnost-svrcuga-kod-herceg-novog",
    "https://nova.rs/magazin/prica-se/selo-u-komsiluku-sa-pet-stanovnika-je-jedino-na-svetu-koje-ima-sajt-i-drustvene-mreze-ali-nema-ulicnu-rasvetu/",
    "https://rtcg.me/vijesti/drustvo/810131/mjestani-hercegnovskog-sela-svrcuge-do-pariza-za-javnu-rasvjetu.html",
    "https://www.pobjeda.me/clanak/malim-divom-iz-svrcuge-do-pariza-za-ulicnu-rasvjetu",
  ]);
  const featured = PRESS.filter((p) => FEATURED_URLS.has(p.url));
  const rest = PRESS.filter((p) => !FEATURED_URLS.has(p.url));

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="section">
        <div className="container-content">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mb-4">✦ {m.eyebrow}</span>
            <h1 className="font-display text-3xl font-extrabold text-ink text-balance sm:text-4xl">{m.title}</h1>
            <p className="mx-auto mt-4 text-center text-lg leading-relaxed text-muted">{m.intro}</p>
          </div>

          {/* Brojke */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-6 rounded-3xl bg-gradient-to-br from-ink to-[#5A4327] p-8 text-center text-cream lg:grid-cols-4">
            {r.items.map((it, i) => (
              <div key={i}>
                <div className="font-display text-3xl font-extrabold text-amber sm:text-4xl">{it.value}</div>
                <div className="mt-1 text-xs font-semibold text-cream/80">{it.label}</div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[16/11] overflow-hidden rounded-3xl shadow-card transition hover:-translate-y-1 hover:shadow-soft"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MEDIA_IMAGES[i % MEDIA_IMAGES.length]}
                  alt={p.outlet}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                      {p.outlet}
                    </span>
                    {p.type === "video" && (
                      <span className="rounded-full bg-cream/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                        ▶ Video
                      </span>
                    )}
                    {p.type === "social" && (
                      <span className="rounded-full bg-cream/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                        Mreže
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 font-display text-lg font-bold leading-snug text-cream drop-shadow">{p.title}</h2>
                  <span className="mt-2 text-sm font-bold text-amber group-hover:underline">{m.visit} →</span>
                </div>
              </a>
            ))}
          </div>

          {/* Video sekcija */}
          <h2 className="mt-16 text-center font-display text-2xl font-bold text-ink">Video</h2>
          <p className="mt-2 text-center text-sm text-muted">
            <a href="https://www.youtube.com/@svrcuge" target="_blank" rel="noopener noreferrer" className="hover:text-amber-deep hover:underline">youtube.com/@svrcuge</a>
          </p>
          <div className="mx-auto mt-6 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((v) => (
              <a
                key={v.ytId}
                href={`https://www.youtube.com/watch?v=${v.ytId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-video overflow-hidden rounded-3xl shadow-card transition hover:-translate-y-1 hover:shadow-soft"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${v.ytId}/maxresdefault.jpg`}
                  alt={v.label}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-red-600 shadow-lg transition group-hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5 translate-x-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="inline-block rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                    ▶ YouTube
                  </span>
                  <p className="mt-2 font-display text-sm font-bold leading-snug text-cream drop-shadow">{v.label}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Ostali mediji, tabela sa klikabilnim naslovima */}
          <h2 className="mt-16 text-center font-display text-2xl font-bold text-ink">{m.more}</h2>
          <div className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-3xl border border-line bg-white/70">
            <table className="w-full border-collapse text-left">
              <tbody>
                {rest.map((p) => (
                  <tr key={p.url} className="border-b border-line last:border-0 transition hover:bg-amber/5">
                    <td className="w-px py-3 pl-5 pr-3 align-top">
                      <span className="inline-block whitespace-nowrap rounded-full bg-amber/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-amber-deep">
                        {p.outlet}
                      </span>
                    </td>
                    <td className="py-3 pr-5">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold leading-snug text-ink/80 hover:text-amber-deep hover:underline"
                      >
                        {p.title}
                        {p.type === "video" && <span className="ml-2 text-xs text-muted">▶ video</span>}
                        {p.type === "social" && <span className="ml-2 text-xs text-muted">mreže</span>}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-sand p-6 text-center">
            <p className="text-center leading-relaxed text-muted">{m.note}</p>
          </div>

          <div className="mt-10 text-center">
            <Link href={`/${locale}`} className="btn-secondary">
              {m.back}
            </Link>
          </div>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
