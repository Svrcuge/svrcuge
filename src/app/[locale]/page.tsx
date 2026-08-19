import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
  ProjectsSection,
  EventsSection,
  ExpeditionSection,
  LocationSection,
  BlockquoteSection,
  EmailSignupSection,
  CoffeeSection,
  TransparencySection,
  ShareSection,
  PartnersSection,
  FaqSection,
} from "@/components/Sections";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="site">
      <Header dict={dict} locale={locale} />
      <main>
        <Hero dict={dict} locale={locale} />
        <ProjectsSection dict={dict} locale={locale} />

        {/* Photo break 1 */}
        <div className="dbreak" style={{ position: "relative", margin: "0 0 22px", height: "260px", overflow: "hidden", borderTop: "3px solid #452D18", borderBottom: "3px solid #452D18", background: "#EFDFC0" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/rasvjeta.webp" alt="Selo u suton" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(69,45,24,0) 35%,rgba(69,45,24,.78))", pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: "20px", right: "20px", bottom: "20px", color: "#F6EBD3", pointerEvents: "none" }}>
            <div style={{ fontSize: "10.5px", letterSpacing: ".24em", fontWeight: 600, color: "#E0A83A" }}>SELO SE BUDI</div>
            <div className="bt" style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "24px", lineHeight: 1.15, marginTop: "4px", textShadow: "0 2px 10px rgba(0,0,0,.35)" }}>
              SVJETLO SE VRAĆA U SVRČUGE
            </div>
          </div>
        </div>

        <EventsSection dict={dict} locale={locale} />

        {/* Ekspedicija + Mapa — side by side on desktop */}
        <div className="drow2" style={{ display: "contents" }}>
          <ExpeditionSection dict={dict} locale={locale} />
          <LocationSection dict={dict} />
        </div>

        <BlockquoteSection dict={dict} />

        {/* Email prijava + Kafa — side by side on desktop */}
        <div className="drow2" style={{ display: "contents" }}>
          <EmailSignupSection dict={dict} locale={locale} />
          <CoffeeSection dict={dict} locale={locale} />
        </div>

        {/* Photo break 2 */}
        <div className="dbreak" style={{ position: "relative", margin: "0 0 22px", height: "260px", overflow: "hidden", borderTop: "3px solid #452D18", borderBottom: "3px solid #452D18", background: "#EFDFC0" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/docek.webp" alt="Doček u Herceg Novom" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(69,45,24,0) 35%,rgba(69,45,24,.78))", pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: "20px", right: "20px", bottom: "20px", color: "#F6EBD3", pointerEvents: "none" }}>
            <div style={{ fontSize: "10.5px", letterSpacing: ".24em", fontWeight: 600, color: "#E0A83A" }}>DOČEK U HERCEG NOVOM</div>
            <div className="bt" style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "24px", lineHeight: 1.15, marginTop: "4px", textShadow: "0 2px 10px rgba(0,0,0,.35)" }}>
              200+ LJUDI ČEKALO JE KOLONU
            </div>
          </div>
        </div>

        {/* Transparentnost + Podijeli — side by side (top-aligned) on desktop */}
        <div className="drow2 drowS" style={{ display: "contents" }}>
          <TransparencySection dict={dict} />
          <ShareSection dict={dict} />
        </div>

        <PartnersSection dict={dict} />
        <FaqSection dict={dict} />
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
