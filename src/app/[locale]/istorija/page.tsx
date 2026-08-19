import type { Metadata } from "next";
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
  const dict = getDictionary(locale);
  return { title: `${dict.historyPage.title} — Svrčuge` };
}

const TIMELINE = [
  { year: "Vijek. XVIII", text: "Svrčuge su uređeno selo s nekoliko porodica, kamenjem građenim kućama i terasastim vrtovima.", color: "#55704F" },
  { year: "XIX vijek", text: "Razvoj sela, porodice grade kuće, obrađuju maslinike i vinograde.", color: "#55704F" },
  { year: "XX vijek", text: "Ruralni egzodus – mladi odlaze u gradove, a potom i za more.", color: "#E0A83A" },
  { year: "2000-e", text: "Ostaje samo nekoliko starijih mještana, kuće propadaju.", color: "#D96C2C" },
  { year: "2026", text: "Svrčuge se bude: rasvjeta se vraća, novi projekti se planiraju.", color: "#D96C2C" },
];

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="site site-840">
      <Header dict={dict} locale={locale} />
      <main>
        {/* Hero text */}
        <div style={{ padding: "26px 18px 4px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", letterSpacing: ".28em", fontWeight: 600, color: "#A5551F" }}>KO SMO I ODAKLE</div>
          <h1 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "27px", lineHeight: 1.15, margin: "8px 0 10px" }}>
            ISTORIJA SVRČUGA
          </h1>
          <p style={{ fontSize: "14.5px", lineHeight: 1.6, margin: "0 18px" }}>
            Prije nego što je selo počelo da se gasi, ovdje se vjekovima živjelo. Ovo je mjesto gdje čuvamo tu priču.
          </p>
        </div>

        {/* Stara fotografija card */}
        <div style={{ margin: "20px 18px 22px", border: "2px solid #452D18", borderRadius: "6px", padding: "6px", background: "#EFDFC0" }}>
          <div style={{ border: "1px dashed #452D18", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: "100%", height: "260px", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/illustrations/vision.webp" alt="Svrčuge nekad" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ textAlign: "center", padding: "10px", fontSize: "12.5px", fontStyle: "italic", background: "#FBF3E0" }}>
              Svrčuge nekad — pošalji nam stare fotografije i opise.
            </div>
          </div>
        </div>

        {/* Poglavlja */}
        <div style={{ padding: "0 18px 8px" }}>
          <h2 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "20px", margin: "0 0 8px" }}>
            <span style={{ color: "#D96C2C" }}>I.</span> STARO SELO U BRDIMA IZNAD NOVOG
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.65, margin: "0 0 18px" }}>
            Svrčuge su malo istorijsko selo u brdima iznad Herceg Novog, na crnogorskoj obali Jadrana. Na samo nekoliko kilometara od mora i gradske gužve, a ipak dovoljno daleko da sačuvaju tišinu, mir i duh nekih prošlih vremena.
          </p>
          <h2 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "20px", margin: "0 0 8px" }}>
            <span style={{ color: "#D96C2C" }}>II.</span> SELO KOJE NIJE NASTALO JUČE
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.65, margin: "0 0 18px" }}>
            Svrčuge postoje više stotina godina. Kamene kuće, stari seoski putevi, suhozidi i maslinjaci svjedoče o generacijama ljudi koji su ovdje živjeli skromno, ali dostojanstveno: od zemlje, rada i međusobne pomoći.
          </p>
          <h2 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "20px", margin: "0 0 8px" }}>
            <span style={{ color: "#D96C2C" }}>III.</span> PORODICE I KUĆE
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.65, margin: "0 0 18px" }}>
            Koje su porodice živjele u selu, koje kuće i danas stoje. Ovo je i poziv dijaspori: javite nam svoje priče i fotografije predaka, ovdje im je mjesto.
          </p>
          <h2 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "20px", margin: "0 0 8px" }}>
            <span style={{ color: "#D96C2C" }}>IV.</span> KAKO SE SELO GASILO
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.65, margin: "0 0 18px" }}>
            Odlazak za poslom u grad i preko granice, kuća po kuća. Do danas, kada je ostalo petoro mještana i odluka da je to dno od kog se odbijamo. Uprkos svemu, selo je sačuvalo bogatu istoriju i mediteranski duh, i danas mu dolazi mnogo gostiju.
          </p>
        </div>

        {/* Vremenska linija */}
        <div style={{ margin: "0 18px 22px", border: "2px solid #452D18", borderRadius: "6px", padding: "18px", background: "#FBF3E0" }}>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "16px", textAlign: "center", margin: "0 0 14px" }}>KROZ VRIJEME</div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "12px", fontSize: "13.5px", lineHeight: 1.5 }}>
            <span style={{ position: "absolute", left: "11px", top: "8px", bottom: "8px", width: 0, borderLeft: "2px dashed #A5551F" }} />
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, width: "24px", display: "flex", justifyContent: "center", position: "relative", marginTop: "2px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: t.color, border: "2px solid #452D18", display: "block" }} />
                </span>
                <span><strong style={{ color: "#A5551F" }}>{t.year}</strong> — {t.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Porodični album */}
        <div style={{ margin: "0 18px 22px" }}>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "18px", textAlign: "center", margin: "0 0 12px" }}>PORODIČNI ALBUM SELA</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {["/illustrations/rasvjeta.webp", "/illustrations/stubovi.webp", "/illustrations/hero.webp", "/illustrations/reno-pariz.webp"].map((src, i) => (
              <div key={i} style={{ border: "2px solid #452D18", borderRadius: "6px", overflow: "hidden", aspectRatio: "3/4" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Stara fotografija ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ margin: "0 18px 26px", border: "2px dashed #A5551F", borderRadius: "6px", padding: "16px", background: "#FBF3E0", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "14px", color: "#A5551F", margin: "0 0 6px" }}>
            IMAŠ STARE FOTOGRAFIJE ILI PRIČE?
          </div>
          <p style={{ fontSize: "13.5px", lineHeight: 1.55, margin: "0 0 10px" }}>
            Ako su tvoji korijeni u Svrčugama, pomozi nam da sastavimo istoriju sela.
          </p>
          <a href="mailto:zdravo@svrcuge.me" style={{ fontSize: "14px", fontWeight: 600, color: "#452D18" }}>zdravo@svrcuge.me</a>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
