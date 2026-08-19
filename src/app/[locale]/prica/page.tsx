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
  const dict = getDictionary(locale);
  return { title: `${dict.nav.story} — Svrčuge` };
}

const ROUTE = [
  { label: "Svrčuge", note: "start", color: "#55704F", size: "12px" },
  { label: "Banja Luka · Novo Mesto · Monfalcone", note: null, color: "#F6EBD3", size: "8px" },
  { label: "Parma · Menton · Marsej · Montlucon", note: null, color: "#F6EBD3", size: "8px" },
  { label: "PARIZ", note: null, color: "#D96C2C", size: "12px" },
  { label: "Strazbur · Salzburg · Novo Mesto · Banja Luka", note: null, color: "#F6EBD3", size: "8px" },
  { label: "HERCEG NOVI: cilj i doček, 200+ ljudi", note: null, color: "#E0A83A", size: "12px" },
];

export default async function PricaPage({
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
        {/* Hero card — forest green banner */}
        <div style={{ margin: "18px", border: "2px solid #452D18", borderRadius: "6px", padding: "6px", background: "#EFDFC0" }}>
          <div style={{ border: "1px dashed #452D18", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: "100%", height: "260px", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/illustrations/story.webp" alt="Svrčuge noću, prva svjetla" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ textAlign: "center", padding: "16px 14px", background: "#55704F", color: "#F6EBD3" }}>
              <div style={{ fontSize: "11px", letterSpacing: ".24em", fontWeight: 600 }}>PUTNI DNEVNIK SELA</div>
              <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "24px", lineHeight: 1.2, margin: "6px 0 4px" }}>
                OVO JE PRIČA O LJUDIMA KOJI NE ODUSTAJU OD SVOJIH KORIJENA
              </div>
              <div style={{ fontSize: "12.5px", letterSpacing: ".1em" }}>6 POGLAVLJA · 11 LJUDI · 5.137 KM</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "0 18px 10px" }}>
          <p style={{ fontSize: "15px", lineHeight: 1.65, margin: 0 }}>
            Ovo je zapis o tome kako se jedno selo od pet mještana odlučilo boriti za svoje ime, i kako je ta borba stigla do Pariza i nazad.
          </p>
        </div>

        {/* Poglavlje I */}
        <div style={{ padding: "14px 18px 6px" }}>
          <h2 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "20px", margin: "0 0 8px" }}>
            <span style={{ color: "#D96C2C" }}>I.</span> SELO KOJE ODBIJA DA NESTANE
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.65, margin: "0 0 10px" }}>
            Svrčuge su nekad bile pune djece, stoke i smijeha. Onda su se, kuća po kuća, gasila svjetla, dok ih nije ostalo samo petoro. Jovica Tušup, porijeklom iz Svrčuga, odlučio je da posljednje svjetlo ne smije da se ugasi.
          </p>
          <div style={{ width: "100%", height: "190px", border: "2px solid #452D18", borderRadius: "4px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/hero.webp" alt="Staro selo, kamene kuće" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* Poglavlje II */}
        <div style={{ padding: "18px 18px 6px" }}>
          <h2 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "20px", margin: "0 0 8px" }}>
            <span style={{ color: "#D96C2C" }}>II.</span> IDEJA: U PARIZ PO SVJETLOST
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.65, margin: "0 0 10px" }}>
            Kako da cijeli svijet čuje za selo od petoro ljudi? Tako što će jedanaest prijatelja sela sjesti u kolonu od pet automobila (među njima tri stara Reno 4) i odvesti priču o Svrčugama pravo u Pariz.
          </p>
          <div style={{ width: "100%", height: "190px", border: "2px solid #452D18", borderRadius: "4px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/reno-put.webp" alt="Priprema kolone Reno 4" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* Maršruta */}
        <div style={{ margin: "18px", border: "2px solid #452D18", borderRadius: "6px", padding: "18px", background: "#FBF3E0" }}>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "16px", textAlign: "center", margin: "0 0 14px" }}>MARŠRUTA EKSPEDICIJE</div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "9px", fontSize: "14px" }}>
            <span style={{ position: "absolute", left: "11px", top: "6px", bottom: "6px", width: 0, borderLeft: "2px dashed #A5551F" }} />
            {ROUTE.map((stop, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "center", color: stop.note === null && stop.color === "#F6EBD3" ? "#7a5b3d" : "#452D18" }}>
                <span style={{ flexShrink: 0, width: "24px", display: "flex", justifyContent: "center", position: "relative" }}>
                  <span style={{ width: stop.size, height: stop.size, borderRadius: "50%", background: stop.color, border: "2px solid #452D18", display: "block" }} />
                </span>
                <span>
                  {stop.color !== "#F6EBD3" ? <strong>{stop.label}</strong> : stop.label}
                  {stop.note && <span>, {stop.note}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Poglavlje III */}
        <div style={{ padding: "0 18px 6px" }}>
          <h2 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "20px", margin: "0 0 8px" }}>
            <span style={{ color: "#D96C2C" }}>III.</span> PARIZ I DIJASPORA
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.65, margin: "0 0 10px" }}>
            U Parizu je kolonu dočekala naša dijaspora. Te večeri je priča o selu od petoro mještana obišla pola svijeta: kampanja je imala <strong>10.250.000 pregleda</strong> na društvenim mrežama i više od <strong>190 objava</strong> u regionalnim medijima.
          </p>
          <div style={{ width: "100%", height: "190px", border: "2px solid #452D18", borderRadius: "4px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/reno-pariz.webp" alt="Pariz, kolona i dijaspora" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* Poglavlje IV */}
        <div style={{ padding: "18px 18px 6px" }}>
          <h2 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "20px", margin: "0 0 8px" }}>
            <span style={{ color: "#D96C2C" }}>IV.</span> DOČEK U HERCEG NOVOM
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.65, margin: "0 0 10px" }}>
            Na povratku, u Herceg Novom, kolonu je čekalo <strong>preko 200 ljudi</strong>. Aplauz, suze i pitanje koje se čulo sa svih strana: „Šta selo radi sljedeće?"
          </p>
          <div style={{ width: "100%", height: "190px", border: "2px solid #452D18", borderRadius: "4px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/docek.webp" alt="Doček u Herceg Novom" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* Poglavlja V–VI */}
        <div style={{ padding: "18px 18px 6px" }}>
          <h2 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "20px", margin: "0 0 8px" }}>
            <span style={{ color: "#D96C2C" }}>V.</span> ŠTA JE PUT DONIO SELU
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
            Zahvaljujući pažnji koju je put donio, prvi projekat (rasvjeta) je finansiran: stubovi su kupljeni i uskoro se pale prva svjetla poslije decenija mraka. Prijatelji sela sada dolaze iz 24 zemlje, sa 4 kontinenta.
          </p>
          <h2 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "20px", margin: "18px 0 8px" }}>
            <span style={{ color: "#D96C2C" }}>VI.</span> OD SVJETLA DO ŽIVOTA
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
            Svjetlo je tek početak. Slijede novi projekti koji vraćaju život: igralište za djecu, seoska pijaca, konoba, događaji. Korak po korak, dok se u Svrčuge ne vrati smijeh.
          </p>
        </div>

        {/* Posada — Jovica kapetan */}
        <div style={{ padding: "20px 18px 28px" }}>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "18px", textAlign: "center", margin: "0 0 14px" }}>KARTE POSADE</div>
          <div style={{ border: "2px solid #452D18", borderRadius: "6px", background: "#E0A83A", padding: "14px", display: "flex", gap: "14px", alignItems: "center", marginBottom: "12px", boxShadow: "3px 3px 0 #452D18" }}>
            <div style={{ width: "70px", height: "70px", flexShrink: 0, border: "2px solid #452D18", borderRadius: "50%", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/putnici/01.webp" alt="Jovica Tušup" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ fontSize: "10.5px", letterSpacing: ".16em", fontWeight: 600 }}>KAPETAN · No. 01</div>
              <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "18px" }}>JOVICA TUŠUP</div>
              <div style={{ fontSize: "12.5px" }}>Čovjek koji je upalio prvo svjetlo</div>
            </div>
          </div>

          {/* Email CTA */}
          <div style={{ margin: "12px 0 0", border: "2px dashed #A5551F", borderRadius: "6px", padding: "16px", background: "#FBF3E0", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "14px", color: "#A5551F", margin: "0 0 8px" }}>PRATI PRIČU</div>
            <Link
              href={`/${locale}#prijava`}
              style={{
                display: "inline-block",
                padding: "11px 20px",
                background: "#452D18",
                color: "#F6EBD3",
                borderRadius: "4px",
                fontFamily: "var(--font-alfa), Georgia, serif",
                fontSize: "13px",
                letterSpacing: ".06em",
                textDecoration: "none",
              }}
            >
              BUDI UZ SELO
            </Link>
          </div>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
