import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { PRESS } from "@/lib/press";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VIDEOS = [
  { ytId: "7c1XWS43zzs", outlet: "YouTube", label: "Put za svjetlost (2026)" },
  { ytId: "NpDLCWGwUzM", outlet: "ATV", label: "Gostovanje na ATV jutro" },
  { ytId: "h2_Y9GQjpp8", outlet: "Alternativna TV", label: "Gostovanje na Alternativnoj TV" },
  { ytId: "BRz8Rg1SuJM", outlet: "K3", label: "Gostovanje na K3 televiziji" },
  { ytId: "HcDTHzqYhVE", outlet: "Mondo.ba", label: "Gostovanje na Mondo.ba" },
  { ytId: "9AfB1419eLo", outlet: "TOK TV", label: "Gostovanje na TOK TV" },
  { ytId: "F43jo5dG5EM", outlet: "RTRS", label: "Gostovanje na RTRS televiziji" },
  { ytId: "7bsyZgDI9GI", outlet: "Nova S", label: "Gostovanje na Nova S" },
  { ytId: "Uz9jTXh0_kc", outlet: "RTHN", label: "Gostovanje na RTHN" },
  { ytId: "KF5unEqq1M4", outlet: "Prva TV", label: "Gostovanje na Prva TV" },
  { ytId: "q9zrXDZVeIs", outlet: "RTCG", label: "Gostovanje na RTCG" },
  { ytId: "l5QTdy_hvvg", outlet: "TV E", label: "Gostovanje na TV E" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Mediji — Svrčuge",
    description: "Video prilozi i tekstovi: 10.250.000 pregleda i 190+ objava o selu.",
  };
}

export default async function MediaPage({
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
      <main>
        {/* Hero text */}
        <div style={{ padding: "26px 18px 4px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", letterSpacing: ".28em", fontWeight: 600, color: "#A5551F" }}>PISALI SU O NAMA</div>
          <h1 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "27px", lineHeight: 1.15, margin: "8px 0 10px" }}>
            SVRČUGE U MEDIJIMA
          </h1>
          <p style={{ fontSize: "14.5px", lineHeight: 1.6, margin: "0 18px" }}>
            Kampanja je imala <strong>10.250.000 pregleda</strong> na društvenim mrežama i više od <strong>190 objava</strong> u regionalnim medijima. Ovdje skupljamo sve što je objavljeno.
          </p>
        </div>

        {/* Video sekcija */}
        <div style={{ margin: "20px 18px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D96C2C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2.5" y="5" width="19" height="14" rx="3" />
              <path d="M10 9.5v5l4.5-2.5z" fill="#D96C2C" />
            </svg>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "18px" }}>VIDEO PRILOZI</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {VIDEOS.map((v) => (
              <div key={v.ytId} style={{ border: "2px solid #452D18", borderRadius: "6px", overflow: "hidden", background: "#FBF3E0", boxShadow: "3px 3px 0 rgba(69,45,24,.35)" }}>
                <div style={{ width: "100%", aspectRatio: "16/9", background: "#452D18" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${v.ytId}`}
                    title={v.label}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    allowFullScreen
                  />
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ fontSize: "10.5px", letterSpacing: ".14em", fontWeight: 600, color: "#A5551F" }}>{v.outlet.toUpperCase()}</div>
                  <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "15px", lineHeight: 1.3, marginTop: "4px" }}>{v.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tekstovi */}
        <div style={{ margin: "0 18px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D96C2C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 4h11a2 2 0 0 1 2 2v13a1.5 1.5 0 0 0 1.5 1.5H6.5A2.5 2.5 0 0 1 4 18V5a1 1 0 0 1 1-1z" />
              <path d="M8 8.5h6M8 12h6M8 15.5h4" />
            </svg>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "18px" }}>TEKSTOVI</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {PRESS.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", gap: "12px", alignItems: "center",
                  border: "2px solid #452D18", borderRadius: "6px",
                  background: "#FBF3E0", padding: "12px 14px",
                  textDecoration: "none", color: "#452D18",
                  boxShadow: "3px 3px 0 rgba(69,45,24,.35)",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "10.5px", letterSpacing: ".14em", fontWeight: 600, color: "#A5551F" }}>
                    {p.outlet.toUpperCase()}{p.type === "video" ? " · VIDEO" : ""}
                  </div>
                  <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "15px", lineHeight: 1.3, marginTop: "4px" }}>{p.title}</div>
                </div>
                <span style={{ fontFamily: "var(--font-alfa), Georgia, serif", color: "#D96C2C", fontSize: "16px", flexShrink: 0 }}>→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Za novinare */}
        <div style={{ margin: "20px 18px 26px", border: "2px dashed #A5551F", borderRadius: "6px", padding: "16px", background: "#FBF3E0", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "14px", color: "#A5551F", marginBottom: "6px" }}>ZA NOVINARE</div>
          <p style={{ fontSize: "13.5px", lineHeight: 1.55, margin: "0 0 10px" }}>
            Radiš priču o Svrčugama? Javi se: fotografije, brojke i Jovica su na raspolaganju.
          </p>
          <a href="mailto:zdravo@svrcuge.me" style={{ fontSize: "14px", fontWeight: 600, color: "#A5551F" }}>zdravo@svrcuge.me</a>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
