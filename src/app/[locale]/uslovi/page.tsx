import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { SOCIAL } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.terms.metaTitle };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.terms;

  return (
    <div className="site site-840">
      <Header dict={dict} locale={locale} />
      <main className="section">
        <article className="container-content max-w-3xl">
          <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{t.title}</h1>
          <div className="mt-6 space-y-5 leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
            <p>{t.intro}</p>
            <p>{t.p1}</p>
            <h2>{t.h_status}</h2>
            <p>{t.p_status}</p>
            <h2>{t.h_donations}</h2>
            <p>{t.p_donations}</p>
            <h2>{t.h_contact}</h2>
            <p>
              {t.p_contact}{" "}
              <a href={`mailto:${SOCIAL.email}`} className="font-semibold text-amber-deep">
                {SOCIAL.email}
              </a>
              .
            </p>
          </div>
        </article>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
