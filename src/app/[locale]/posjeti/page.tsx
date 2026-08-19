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
  const dict = getDictionary(locale);
  return { title: `${dict.visitPage.title} — Svrčuge` };
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
    <div className="site site-1060">
      <Header dict={dict} locale={locale} />
      <main>
        {/* Hero card — forest green banner */}
        <div style={{ margin: "18px", border: "2px solid #452D18", borderRadius: "6px", padding: "6px", background: "#EFDFC0" }}>
          <div style={{ border: "1px dashed #452D18", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: "100%", height: "240px", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/illustrations/story.webp" alt="Seoski put kroz zelenilo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ textAlign: "center", padding: "16px 14px", background: "#55704F", color: "#F6EBD3" }}>
              <div style={{ fontSize: "11px", letterSpacing: ".24em", fontWeight: 600 }}>DOBRODOŠLI</div>
              <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "26px", lineHeight: 1.15, margin: "6px 0 4px" }}>
                POSJETI SVRČUGE
              </div>
              <div style={{ fontSize: "12.5px", letterSpacing: ".08em" }}>14 KM OD HERCEG NOVOG · 29 KM OD TREBINJA</div>
            </div>
          </div>
        </div>

        {/* Intro text */}
        <div style={{ padding: "0 18px 8px" }}>
          <p style={{ fontSize: "15px", lineHeight: 1.65, margin: 0 }}>{p.intro}</p>
        </div>

        {/* Kako doći */}
        <div style={{ margin: "18px 18px 22px", border: "2px solid #452D18", borderRadius: "6px", padding: "16px", background: "#FBF3E0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 10px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D96C2C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 16v-3l2.2-4.2A1.5 1.5 0 0 1 6.5 8h7l4.5 4H20a1 1 0 0 1 1 1v3h-2.2" />
              <circle cx="7" cy="16.5" r="1.8" />
              <circle cx="16.5" cy="16.5" r="1.8" />
              <path d="M8.8 16.5h5.9M3 16h2.2" />
            </svg>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "16px" }}>KAKO DOĆI</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* Herceg Novi */}
            <div style={{ border: "2px solid #452D18", borderRadius: "4px", background: "#F6EBD3", padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "14px" }}>IZ HERCEG NOVOG</span>
                <span style={{ display: "flex", gap: "5px" }}>
                  <span style={{ background: "#E0A83A", border: "1.5px solid #452D18", borderRadius: "3px", padding: "2px 7px", fontSize: "10.5px", fontWeight: 600, letterSpacing: ".06em" }}>14 KM</span>
                  <span style={{ background: "#F6EBD3", border: "1.5px solid #452D18", borderRadius: "3px", padding: "2px 7px", fontSize: "10.5px", fontWeight: 600, letterSpacing: ".06em" }}>15 MIN</span>
                </span>
              </div>
              <div style={{ fontSize: "13px", lineHeight: 1.5 }}>Uz brdo iz grada, kratka i laka vožnja.</div>
            </div>
            {/* Trebinje */}
            <div style={{ border: "2px solid #452D18", borderRadius: "4px", background: "#F6EBD3", padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "14px" }}>IZ TREBINJA</span>
                <span style={{ display: "flex", gap: "5px" }}>
                  <span style={{ background: "#E0A83A", border: "1.5px solid #452D18", borderRadius: "3px", padding: "2px 7px", fontSize: "10.5px", fontWeight: 600, letterSpacing: ".06em" }}>29 KM</span>
                  <span style={{ background: "#F6EBD3", border: "1.5px solid #452D18", borderRadius: "3px", padding: "2px 7px", fontSize: "10.5px", fontWeight: 600, letterSpacing: ".06em" }}>40 MIN</span>
                </span>
              </div>
              <div style={{ fontSize: "13px", lineHeight: 1.5 }}>Preko granice, ugodna vožnja kroz Hercegovinu.</div>
            </div>
            {/* Pješke */}
            <div style={{ border: "2px solid #452D18", borderRadius: "4px", background: "#F6EBD3", padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "14px" }}>PJEŠKE</span>
                <span style={{ background: "#55704F", color: "#F6EBD3", border: "1.5px solid #452D18", borderRadius: "3px", padding: "2px 7px", fontSize: "10.5px", fontWeight: 600, letterSpacing: ".06em" }}>2 SATA</span>
              </div>
              <div style={{ fontSize: "13px", lineHeight: 1.5 }}>Hajking staza od centra Herceg Novog, za dobre patike.</div>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div style={{ margin: "0 18px 22px", border: "2px solid #452D18", borderRadius: "6px", overflow: "hidden", background: "#FBF3E0" }}>
          <div style={{ padding: "14px 16px 10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D96C2C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-6.5-5.6-6.5-10.3a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
                <circle cx="12" cy="10.5" r="2.3" />
              </svg>
              <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "16px" }}>GDJE SU SVRČUGE?</div>
            </div>
          </div>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=18.40%2C42.42%2C18.72%2C42.60&layer=mapnik&marker=42.51%2C18.56"
            style={{ width: "100%", height: "240px", border: "none", borderTop: "2px solid #452D18", display: "block" }}
            title="Mapa: Svrčuge"
            loading="lazy"
          />
        </div>

        {/* Šta te čeka */}
        <div style={{ margin: "0 18px 22px" }}>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "18px", textAlign: "center", margin: "0 0 12px" }}>ŠTA TE ČEKA</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { title: "Stare kamene kuće", text: "Arhitektura kakve više nema, svaka kuća ima priču." },
              { title: "Zelenilo i staze", text: "Rastinje je preuzelo selo, staze vode kroz pravu divljinu." },
              { title: "Mještani", text: "Petoro ljudi koji će te dočekati kao svog." },
              { title: "Selo koje se budi", text: "Vidi uživo kako se život vraća, projekat po projekat." },
            ].map((item, i) => (
              <div key={i} style={{ border: "2px solid #452D18", borderRadius: "6px", background: "#FBF3E0", padding: "12px", boxShadow: "3px 3px 0 rgba(69,45,24,.35)" }}>
                <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "14px", margin: "0 0 4px" }}>{item.title}</div>
                <div style={{ fontSize: "12.5px", lineHeight: 1.45 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Savjeti */}
        <div style={{ margin: "0 18px 22px", border: "2px dashed #A5551F", borderRadius: "6px", padding: "16px", background: "#FBF3E0" }}>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "14px", color: "#A5551F", margin: "0 0 8px" }}>DOBRO JE ZNATI</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px", fontSize: "13.5px", lineHeight: 1.5 }}>
            {[
              "Ponesi vodu i užinu, u selu još nema kafane ni prodavnice",
              "Dobre patike ili planinarske cipele",
              "Javi se prije dolaska da te neko od mještana dočeka",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "#55704F", fontWeight: 600 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Forma za dolazak */}
        <VisitForm locale={locale} />

        <div style={{ textAlign: "center", padding: "12px 18px 26px" }}>
          <Link href={`/${locale}`} style={{ fontSize: "13px", fontWeight: 600, color: "#A5551F" }}>
            ← Nazad na početnu
          </Link>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
