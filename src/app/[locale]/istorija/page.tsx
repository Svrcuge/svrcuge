import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const p = getDictionary(locale).historyPage;
  return { title: `${p.title} — Svrčuge` };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const p = dict.historyPage;

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        {/* Hero */}
        <div className="relative w-full">
          <div className="relative min-h-[320px] w-full overflow-hidden lg:min-h-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/illustrations/hero.webp"
              alt={p.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/50 to-ink/20" />
            <div className="absolute inset-0 flex items-end">
              <div className="container-content pb-10">
                <span className="eyebrow !text-amber mb-3 block">✦ {p.eyebrow}</span>
                <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">{p.title}</h1>
                <p className="mt-3 max-w-xl text-cream/80 leading-relaxed">{p.intro}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Poglavlja */}
        <article className="py-14" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-3xl">
            {/* Placeholder stare fotografije */}
            <div
              className="mb-10 border-2 border-line bg-paper-light p-6 text-center text-muted"
              style={{ borderRadius: "6px" }}
            >
              <p className="text-sm italic">Svrčuge nekad — pošalji mi stare fotografije i opise.</p>
            </div>

            <div className="space-y-10">
              {p.sections.map((sec, i) => (
                <div key={i}>
                  <h2 className="font-display text-2xl font-bold text-ink mb-3">{sec.heading}</h2>
                  <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{sec.text}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Porodični album */}
        <section
          className="py-12 text-center"
          style={{ background: "#452D18", borderTop: "3px double #C0A882" }}
        >
          <div className="container-content max-w-lg">
            <h2 className="font-display text-2xl font-bold text-cream mb-2">{p.albumTitle}</h2>
            <p className="text-cream/75 font-semibold mb-2">{p.albumCta}</p>
            <p className="text-cream/60 mb-5 text-sm">{p.albumText}</p>
            <a
              href="mailto:zdravo@svrcuge.me"
              className="btn"
              style={{ background: "#E0A83A", color: "#452D18", borderColor: "#452D18" }}
            >
              zdravo@svrcuge.me
            </a>
          </div>
        </section>

        <div className="container-content py-6 text-center">
          <Link href={`/${locale}`} className="text-sm font-bold text-amber-deep hover:underline">
            ← {p.back}
          </Link>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
