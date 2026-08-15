import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLocale } from "@/lib/i18n";
import { supabase, type Donor } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DonorSearch, PendingDonorForm } from "@/components/DonorSearch";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: `${dict.donors.pageTitle} — Svrčuge`,
    description: dict.donors.pageSubtitle,
  };
}

export default async function DonoriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.donors;

  let list: Donor[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("donors")
      .select("id, name, country_code, anonymous, created_at")
      .order("name");
    list = data ?? [];
  }

  const countries = new Set(list.map((d) => d.country_code).filter(Boolean)).size;

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="section">
        <div className="container-content">

          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mb-4">✦ {t.eyebrow}</span>
            <h1 className="font-display text-3xl font-extrabold text-ink text-balance sm:text-4xl">
              {t.pageTitle}
            </h1>
            <p className="mx-auto mt-4 text-lg leading-relaxed text-muted">
              {t.pageSubtitle}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-6 rounded-3xl bg-gradient-to-br from-ink to-[#5A4327] p-8 text-center text-cream sm:grid-cols-3">
            <div>
              <div className="font-display text-3xl font-extrabold text-amber sm:text-4xl">200+</div>
              <div className="mt-1 text-xs font-semibold text-cream/80">{t.statDonors}</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-amber sm:text-4xl">
                {countries > 0 ? countries : "24"}
              </div>
              <div className="mt-1 text-xs font-semibold text-cream/80">{t.statCountries}</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-display text-3xl font-extrabold text-amber sm:text-4xl">4</div>
              <div className="mt-1 text-xs font-semibold text-cream/80">{t.statContinents}</div>
            </div>
          </div>

          {list.length > 0 ? (
            <DonorSearch donors={list} t={t} />
          ) : (
            <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-sand p-10 text-center">
              <p className="text-4xl">🌱</p>
              <p className="mt-4 font-display text-xl font-bold text-ink">
                {t.pageTitle}
              </p>
              <p className="mt-2 text-muted">{t.pageSubtitle}</p>
            </div>
          )}

          <div className="mx-auto mt-20 max-w-3xl border-t border-line" />

          <div className="mx-auto mt-16 max-w-2xl text-center">
            <span className="eyebrow mb-4">⚠ {t.notOnListEyebrow}</span>
            <h2 className="font-display text-2xl font-extrabold text-ink">{t.notOnList}</h2>
            <p className="mt-3 text-muted">{t.notOnListText}</p>
            <PendingDonorForm t={t} />
          </div>

          <div className="mt-16 text-center">
            <Link href={`/${locale}`} className="btn-secondary">
              ← {t.back}
            </Link>
          </div>

        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
