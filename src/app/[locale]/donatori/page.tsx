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
  return {
    title: "Prijatelji Svrčuga — Svrčuge",
    description: "Zahvaljujemo svim donatorima koji su pomogli inicijativi Svjetlo za Svrčuge.",
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

  let list: Donor[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("svrcuge_donors")
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

          {/* Naslov */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mb-4">✦ Zahvalnost</span>
            <h1 className="font-display text-3xl font-extrabold text-ink text-balance sm:text-4xl">
              Prijatelji Svrčuga
            </h1>
            <p className="mx-auto mt-4 text-lg leading-relaxed text-muted">
              Ovi ljudi su vjerovali u ideju i pomogli da postane stvarnost. Hvala svima iz srca.
            </p>
          </div>

          {/* Statistike */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-6 rounded-3xl bg-gradient-to-br from-ink to-[#5A4327] p-8 text-center text-cream sm:grid-cols-3">
            <div>
              <div className="font-display text-3xl font-extrabold text-amber sm:text-4xl">200+</div>
              <div className="mt-1 text-xs font-semibold text-cream/80">Donatora</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-amber sm:text-4xl">
                {countries > 0 ? countries : "24"}
              </div>
              <div className="mt-1 text-xs font-semibold text-cream/80">Država</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-display text-3xl font-extrabold text-amber sm:text-4xl">4</div>
              <div className="mt-1 text-xs font-semibold text-cream/80">Kontinenta</div>
            </div>
          </div>

          {/* Lista ili placeholder */}
          {list.length > 0 ? (
            <DonorSearch donors={list} />
          ) : (
            <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-sand p-10 text-center">
              <p className="text-4xl">🌱</p>
              <p className="mt-4 font-display text-xl font-bold text-ink">
                Spisak donatora uskoro
              </p>
              <p className="mt-2 text-muted">
                Popunjavamo ga. Ako si donirao/la i želiš biti na spisku, javi nam se ispod.
              </p>
            </div>
          )}

          {/* Separator */}
          <div className="mx-auto mt-20 max-w-3xl border-t border-line" />

          {/* Forma za prijavu */}
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <span className="eyebrow mb-4">⚠ Nijesu te pronašli?</span>
            <h2 className="font-display text-2xl font-extrabold text-ink">Nijesam na spisku</h2>
            <p className="mt-3 text-muted">
              Ponekad platforma za donacije ne proslijedi sve podatke. Javi nam se i provjerit ćemo na osnovu transakcija.
            </p>
            <PendingDonorForm />
          </div>

          <div className="mt-16 text-center">
            <Link href={`/${locale}`} className="btn-secondary">
              ← Nazad na naslovnu
            </Link>
          </div>

        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
