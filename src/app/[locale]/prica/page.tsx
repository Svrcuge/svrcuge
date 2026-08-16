import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CrewCards from "@/components/CrewCards";
import EmailSignupForm from "@/components/EmailSignupForm";

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
        {/* Hero */}
        <div className="relative w-full">
          <div className="relative min-h-[460px] w-full lg:aspect-[21/8] lg:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/illustrations/story.webp"
              alt={s.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/65 to-ink/40" />
            <div className="absolute inset-0 flex items-end">
              <div className="container-content pb-10">
                <span className="eyebrow !text-amber mb-3 block">✦ {s.eyebrow}</span>
                <h1
                  className="font-display text-3xl font-bold leading-tight text-cream text-balance sm:text-4xl lg:text-5xl"
                >
                  {s.title}
                </h1>
                <p className="mt-2 text-sm font-semibold tracking-widest text-cream/70 uppercase">{s.titleSub}</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85">{s.lead}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Poglavlja */}
        <article className="py-14 sm:py-20" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-3xl space-y-14">
            {s.sections.map((sec, i) => (
              <div key={i} className="border-l-4 border-amber-deep pl-6">
                <h2 className="font-display text-xl font-bold text-ink mb-3 sm:text-2xl">{sec.heading}</h2>
                <div className="space-y-3">
                  {sec.paragraphs.map((p, j) => (
                    <p key={j} className="text-base leading-relaxed text-ink/80 sm:text-lg">{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Maršruta */}
        <section className="py-12" style={{ background: "#EFDFC0", borderTop: "2px solid #C0A882" }}>
          <div className="container-content max-w-xl">
            <h2 className="font-display text-2xl font-bold text-ink mb-6 text-center">{s.routeTitle}</h2>
            <ol className="space-y-2">
              {s.route.map((stop, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-none mt-0.5 flex h-6 w-6 items-center justify-center text-xs font-black"
                    style={{
                      background: stop.highlight ? "#D96C2C" : "#C0A882",
                      color: stop.highlight ? "#F6EBD3" : "#452D18",
                      borderRadius: "50%",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <span
                      className={`font-semibold ${stop.highlight ? "text-amber-deep font-bold" : "text-ink/80"}`}
                    >
                      {stop.label}
                    </span>
                    {stop.sub && (
                      <span className="ml-2 text-xs text-muted font-normal">· {stop.sub}</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Ekipa */}
        <CrewCards dict={dict} />

        {/* Email CTA */}
        <section className="py-14 border-t-2 border-line" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-xl text-center">
            <h2 className="font-display text-2xl font-bold text-ink mb-2">{s.emailCta}</h2>
            <p className="text-muted mb-6">{s.emailText}</p>
            <div
              className="border-2 border-ink bg-sand p-6 text-left"
              style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.20)" }}
            >
              <EmailSignupForm dict={dict} locale={locale} />
            </div>
          </div>
        </section>

        <div className="container-content py-6 text-center">
          <Link href={`/${locale}`} className="text-sm font-bold text-amber-deep hover:underline">
            ← {s.back}
          </Link>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
