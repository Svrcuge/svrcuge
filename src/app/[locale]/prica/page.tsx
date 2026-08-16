import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CrewCards from "@/components/CrewCards";
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
                  <span className="eyebrow !text-amber">✦ {s.eyebrow}</span>
                  <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-cream text-balance drop-shadow sm:text-4xl lg:text-5xl">
                    {s.title}
                  </h1>
                  <p className="mt-4 text-justify text-lg leading-relaxed text-cream/90 drop-shadow">{rich(s.lead, "font-extrabold text-cream")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Poglavlja — editorijalni layout: slika uz tekst */}
        <article className="bg-paper py-14 sm:py-20">
          <div className="container-content max-w-4xl space-y-16 sm:space-y-20">
            {s.sections.map((sec, i) => {
              const imgRight = i % 2 === 0;
              return (
                <div
                  key={i}
                  className="grid items-center gap-8 sm:grid-cols-[1fr_1fr] lg:gap-14"
                >
                  {/* Slika */}
                  <div className={imgRight ? "sm:order-2" : "sm:order-1"}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={STORY_IMAGES[i % STORY_IMAGES.length]}
                      alt={sec.heading}
                      loading="lazy"
                      className="w-full rounded-2xl shadow-card"
                    />
                  </div>
                  {/* Tekst */}
                  <div className={imgRight ? "sm:order-1" : "sm:order-2"}>
                    <div className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-deep">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h2 className="font-display text-2xl font-bold leading-snug text-ink text-balance sm:text-3xl">
                      {sec.heading}
                    </h2>
                    <div className="mt-4 space-y-3 text-justify text-base leading-relaxed text-ink/80 sm:text-lg">
                      {sec.paragraphs.map((p, j) => (
                        <p key={j}>{rich(p, "font-extrabold text-ink")}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

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

        {/* Sports cards for the 11 Paris travellers */}
        <CrewCards dict={dict} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
