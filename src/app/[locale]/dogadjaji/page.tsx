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
  return { title: `${dict.eventsPage.title} — Svrčuge` };
}

const EVENTS = [
  {
    id: "bioskop",
    day: "29.",
    month: "AVGUST",
    bg: "#E0A83A",
    fg: "#452D18",
    tilt: "-2deg",
    title: "DJEČIJI BIOSKOP POD ZVIJEZDAMA",
    sub: "KRAJ RASPUSTA",
    text: "Ispraćamo raspust filmom pod vedrim nebom. Ponesite ćebe, kokice su na selu!",
    img: "/illustrations/docek.webp",
  },
  {
    id: "zurka",
    day: "05.",
    month: "SEPTEMBAR",
    bg: "#D96C2C",
    fg: "#F6EBD3",
    tilt: "2deg",
    title: "KRAJ LJETA",
    sub: "ADIO MARE",
    text: "Ljeto ispraćamo tamo gdje je najljepše. Muzika, roštilj i selo puno ljudi, kao nekad.",
    img: "/illustrations/community.webp",
  },
];

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="site site-1060">
      <Header dict={dict} locale={locale} />
      <main>
        {/* Hero text */}
        <div style={{ padding: "26px 18px 4px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", letterSpacing: ".28em", fontWeight: 600, color: "#A5551F" }}>SELO ŽIVI</div>
          <h1 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "27px", lineHeight: 1.15, margin: "8px 0 10px" }}>
            DOGAĐAJI U SELU
          </h1>
          <p style={{ fontSize: "14.5px", lineHeight: 1.6, margin: "0 18px" }}>
            Svrčuge više nisu samo priča o prošlosti. Dođi, druži se i budi dio buđenja sela.
          </p>
        </div>

        {/* Event cards */}
        <div style={{ margin: "22px 18px 22px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {EVENTS.map((ev) => (
            <div key={ev.id} style={{ border: "2px solid #452D18", borderRadius: "6px", background: "#FBF3E0", overflow: "hidden", boxShadow: "3px 3px 0 rgba(69,45,24,.35)" }}>
              <div style={{ width: "100%", height: "180px", borderBottom: "2px solid #452D18", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ev.img} alt={ev.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "14px 16px 16px" }}>
                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, border: "2px solid #452D18", borderRadius: "4px", background: ev.bg, color: ev.fg, textAlign: "center", padding: "8px 12px", transform: `rotate(${ev.tilt})` }}>
                    <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "22px", lineHeight: 1 }}>{ev.day}</div>
                    <div style={{ fontSize: "10.5px", letterSpacing: ".1em", fontWeight: 600 }}>{ev.month}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "18px", lineHeight: 1.25 }}>{ev.title}</div>
                    <div style={{ fontSize: "12.5px", color: "#A5551F", fontWeight: 600, letterSpacing: ".06em", margin: "2px 0 6px" }}>{ev.sub}</div>
                    <p style={{ fontSize: "13.5px", lineHeight: 1.55, margin: 0 }}>{ev.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Email CTA */}
        <div style={{ margin: "0 18px 26px", border: "2px dashed #A5551F", borderRadius: "6px", padding: "16px", background: "#FBF3E0", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "14px", color: "#A5551F", margin: "0 0 6px" }}>
            NE PROPUSTI SLJEDEĆI DOGAĐAJ
          </div>
          <p style={{ fontSize: "13.5px", lineHeight: 1.55, margin: "0 0 12px" }}>
            Ostavi email na Početnoj i javljamo ti svaku najavu na vrijeme.
          </p>
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
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
