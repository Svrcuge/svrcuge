import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { SOCIAL } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Uslovi i napomene, Svrčuge" };

export default async function TermsPage({
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
          <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">Uslovi i napomene</h1>
          <div className="mt-6 space-y-5 leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
            <p>
              Ovaj sajt je informativna i kampanjska platforma projekta razvoja sela Svrčuge. Trenutno služi
              za okupljanje zainteresovanih ljudi prije pokretanja crowdfunding kampanje.
            </p>
            <h2>Status projekta</h2>
            <p>
              Prva faza (rasvjeta) je finansirana i u realizaciji. Stubovi za rasvjetu su kupljeni, a postavljanje
              i spajanje planirano je najkasnije do oktobra. Naredne faze zavise od uspjeha buduće crowdfunding
              kampanje i mogućnosti organizatora.
            </p>
            <h2>Počasna lična karta Svrčuga</h2>
            <p>
              Počasna lična karta Svrčuga je simbolična digitalna zahvalnica i znak pripadnosti projektu. Ona
              nije zvanični, pravni, finansijski ili identifikacioni dokument. Vlasnici kartice mogu imati posebne
              pozive, pogodnosti i simbolične benefite kada projekat zaživi, u skladu sa mogućnostima organizatora.
              Ne obećavamo fiksne ni garantovane popuste.
            </p>
            <h2>Donacije</h2>
            <p>
              U trenutnoj fazi sajt ne prikuplja donacije. Kada crowdfunding kampanja krene, donacije će se
              odvijati preko zvanične platforme (npr. GoFundMe), pod uslovima te platforme.
            </p>
            <h2>Kontakt</h2>
            <p>
              Za sva pitanja piši nam na{" "}
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
