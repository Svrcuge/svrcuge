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
  const p = getDictionary(locale).newsPage;
  return { title: `${p.title} — Svrčuge` };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const p = dict.newsPage;

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
          <p className="mt-4 max-w-xl mx-auto text-cream/75">{p.intro}</p>
        </div>

        {/* Sadržaj */}
        <section className="py-14" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-2xl">
            {/* Placeholder za novosti */}
            <div
              className="border-2 border-ink bg-sand p-8 text-center"
              style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.20)" }}
            >
              <div className="text-4xl mb-4">📰</div>
              <p className="font-semibold text-ink mb-2">{p.empty}</p>
            </div>

            {/* Primjer formata kad budu novosti */}
            <div className="mt-8 opacity-40 pointer-events-none">
              <p className="text-xs text-muted mb-4 uppercase tracking-widest text-center">Primjer formata</p>
              {[
                { date: "12. Maj 2026", title: "Stubovi za rasvjetu isporučeni", text: "Danas su stigli stubovi koji će osvijetliti seosku ulicu. Postavljanje počinje sljedeće sedmice." },
                { date: "3. April 2026", title: "Ekspedicija se vratila kući", text: "Nakon 14 dana i 5.137 km, karavana se vratila u Herceg Novi uz doček 200+ ljudi." },
              ].map((n, i) => (
                <div
                  key={i}
                  className="border-2 border-ink bg-sand p-5 mb-4"
                  style={{ borderRadius: "6px" }}
                >
                  <div className="text-xs font-bold uppercase tracking-widest text-muted mb-1">{n.date}</div>
                  <h2 className="font-display text-xl font-bold text-ink mb-2">{n.title}</h2>
                  <p className="text-ink/75 leading-relaxed">{n.text}</p>
                </div>
              ))}
            </div>
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
