import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { rich } from "@/lib/rich";

// Slika po poglavlju (Netflix stil): selo, put, Pariz, doček, zajednica, vizija
const STORY_IMAGES = [
  "/illustrations/hero.webp",
  "/illustrations/reno-put.webp",
  "/illustrations/reno-pariz.webp",
  "/illustrations/docek.webp",
  "/illustrations/community.webp",
  "/illustrations/vision.webp",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const s = getDictionary(locale).storyPage;
  return { title: `${s.title} — Svrčuge`, description: s.lead };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const s = dict.storyPage;

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        {/* Hero sa noćnom slikom */}
        <div className="relative w-full">
          <div className="relative min-h-[460px] w-full lg:aspect-[21/8] lg:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/illustrations/story.webp"
              alt={s.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/65 to-ink/40" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-content">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-ink">
                    ✦ {s.eyebrow}
                  </span>
                  <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-cream text-balance drop-shadow sm:text-4xl lg:text-5xl">
                    {s.title}
                  </h1>
                  <p className="mt-4 text-justify text-lg leading-relaxed text-cream/90 drop-shadow">{rich(s.lead, "font-extrabold text-cream")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Poglavlja, Netflix stil: slika + tekst preko */}
        <article className="bg-paper py-14 sm:py-20">
          <div className="container-content max-w-4xl space-y-6">
            {s.sections.map((sec, i) => (
              <div key={i} className="relative overflow-hidden rounded-[2rem] shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={STORY_IMAGES[i % STORY_IMAGES.length]}
                  alt={sec.heading}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/75 to-ink/30" />
                <div className="relative flex min-h-[420px] flex-col justify-end p-7 sm:p-10">
                  <h2 className="font-display text-2xl font-bold text-cream drop-shadow sm:text-3xl">{sec.heading}</h2>
                  <div className="mt-3 max-w-2xl space-y-3 text-justify text-lg leading-relaxed text-cream/90 drop-shadow">
                    {sec.paragraphs.map((p, j) => (
                      <p key={j}>{rich(p, "font-extrabold text-cream")}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-[2rem] bg-amber/10 p-8 text-center">
              <Link href={`/${locale}#prvi-krug`} className="btn-primary">
                {s.ctaText}
              </Link>
              <div className="mt-6">
                <Link href={`/${locale}`} className="text-sm font-bold text-amber-deep hover:underline">
                  ← {s.back}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
