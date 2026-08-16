import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisitForm from "./VisitForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const p = getDictionary(locale).visitPage;
  return { title: `${p.title} — Svrčuge` };
}

export default async function VisitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const p = dict.visitPage;

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        {/* Hero */}
        <div
          className="py-16 px-5 text-center"
          style={{ background: "#452D18", borderBottom: "3px double #C0A882" }}
        >
          <div className="eyebrow !text-amber mb-3">✦ {p.eyebrow}</div>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">{p.title}</h1>
          <p className="mt-3 text-sm font-bold tracking-widest text-cream/70 uppercase">{p.subtitle}</p>
          <p className="mt-4 max-w-xl mx-auto text-cream/75 leading-relaxed">{p.intro}</p>
        </div>

        {/* Kako doći */}
        <section className="py-14 border-t-2 border-line" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-2xl">
            <div className="grid gap-4 sm:grid-cols-3">
              {p.routes.map((r, i) => (
                <div
                  key={i}
                  className="border-2 border-ink bg-sand p-4 text-center"
                  style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.20)" }}
                >
                  <div className="text-[11px] font-bold uppercase tracking-widest text-muted mb-2">{r.from}</div>
                  <div className="font-display text-3xl font-bold text-amber-deep">{r.dist}</div>
                  {r.time && <div className="text-sm font-semibold text-ink">{r.time}</div>}
                  <p className="mt-2 text-xs leading-relaxed text-muted">{r.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mapa */}
        <section className="py-8 border-t-2 border-line bg-sand">
          <div className="container-content max-w-2xl">
            <h2 className="font-display text-xl font-bold text-ink mb-4 text-center">{p.mapTitle}</h2>
            <div
              className="w-full border-2 border-ink overflow-hidden"
              style={{ borderRadius: "6px", aspectRatio: "16/7", background: "#EFDFC0" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2872.0!2d18.5380!3d42.4420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134c72c4d0bbcb29%3A0x8a5b1e3c0b5c5a2!2sSvr%C4%8Duge!5e0!3m2!1sen!2sme!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Lokacija Svrčuga"
              />
            </div>
          </div>
        </section>

        {/* Šta te čeka */}
        <section className="py-14 border-t-2 border-line" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-ink mb-6">{p.whatTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {p.whatItems.map((item, i) => (
                <div key={i} className="border-2 border-ink bg-sand p-4" style={{ borderRadius: "6px" }}>
                  <h3 className="font-display text-lg font-bold text-ink mb-1">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Savjeti */}
        <section className="py-10 border-t-2 border-line bg-sand">
          <div className="container-content max-w-xl">
            <h2 className="font-display text-xl font-bold text-ink mb-4">{p.tipsTitle}</h2>
            <ul className="space-y-2">
              {p.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-ink/80">
                  <span className="text-forest font-bold flex-none">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Forma */}
        <section className="py-14 border-t-2 border-line" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-xl">
            <h2 className="font-display text-2xl font-bold text-ink mb-2">{p.formTitle}</h2>
            <p className="text-muted mb-6">{p.formText}</p>
            <VisitForm dict={dict} />
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
