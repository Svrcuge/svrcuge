import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { SOCIAL } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Politika privatnosti, Svrčuge" };

// Napomena: pravni tekst je za v1 na crnogorskom (primarna publika).
// Lako se prevodi kasnije po istom obrascu kao homepage.
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main className="section">
        <article className="container-content max-w-3xl">
          <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">Politika privatnosti</h1>
          <div className="mt-6 space-y-5 leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
            <p>
              Ova politika objašnjava kako projekat „Svrčuge“ prikuplja i koristi lične podatke koje ostaviš
              putem formi na ovom sajtu.
            </p>
            <h2>Koje podatke prikupljamo</h2>
            <p>
              Kada se prijaviš na našu listu, prikupljamo: ime (opciono), e-mail adresu, grad i državu (opciono)
              i jezik. Kod forme za partnere prikupljamo i naziv organizacije, telefon i tvoju poruku.
            </p>
            <h2>Zašto prikupljamo podatke</h2>
            <p>
              E-mail adresu koristimo isključivo da te obavijestimo kada crowdfunding kampanja krene i da ti
              povremeno pošaljemo važne novosti o projektu. Ne prodajemo i ne dijelimo tvoje podatke trećim
              stranama u marketinške svrhe.
            </p>
            <h2>Saglasnost i odjava</h2>
            <p>
              Podatke čuvamo na osnovu tvoje saglasnosti, koju daješ označavanjem polja u formi. U svakom
              trenutku se možeš odjaviti putem linka u dnu svake e-mail poruke ili nam pisati na{" "}
              <a href={`mailto:${SOCIAL.email}`} className="font-semibold text-amber-deep">
                {SOCIAL.email}
              </a>
              .
            </p>
            <h2>Čuvanje podataka</h2>
            <p>
              Podatke čuvamo dok traje projekat ili dok ne zatražiš brisanje. Možeš zatražiti uvid, ispravku ili
              brisanje svojih podataka u skladu sa važećim propisima o zaštiti podataka.
            </p>
            <h2>Kontakt</h2>
            <p>
              Za sva pitanja o privatnosti piši nam na{" "}
              <a href={`mailto:${SOCIAL.email}`} className="font-semibold text-amber-deep">
                {SOCIAL.email}
              </a>
              .
            </p>
          </div>
        </article>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
