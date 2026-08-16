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
  return { title: `${dict.donors.pageTitle} — Svrčuge`, description: dict.donors.pageSubtitle };
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
    const { data } = await supabase.from("donors").select("id, name, country_code, anonymous, created_at").order("name");
    list = data ?? [];
  }

  const countries = new Set(list.map((d) => d.country_code).filter(Boolean)).size;

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        {/* Hero text */}
        <div style={{ padding: "26px 18px 4px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", letterSpacing: ".28em", fontWeight: 600, color: "#A5551F" }}>ZID ZAHVALNOSTI</div>
          <h1 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "27px", lineHeight: 1.15, margin: "8px 0 10px" }}>
            {t.pageTitle}
          </h1>
          <p style={{ fontSize: "14.5px", lineHeight: 1.6, margin: "0 18px" }}>{t.pageSubtitle}</p>
        </div>

        {/* Stat chips */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", margin: "18px 18px 20px" }}>
          <div style={{ border: "2px solid #452D18", borderRadius: "4px", padding: "9px 12px", background: "#E0A83A", transform: "rotate(-2deg)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "17px" }}>200+</div>
            <div style={{ fontSize: "9.5px", letterSpacing: ".1em", fontWeight: 600, textTransform: "uppercase" }}>prijatelja</div>
          </div>
          <div style={{ border: "2px solid #452D18", borderRadius: "4px", padding: "9px 12px", background: "#F6EBD3", transform: "rotate(1.5deg)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "17px" }}>{countries > 0 ? countries : "24"}</div>
            <div style={{ fontSize: "9.5px", letterSpacing: ".1em", fontWeight: 600, textTransform: "uppercase" }}>zemlje</div>
          </div>
          <div style={{ border: "2px solid #452D18", borderRadius: "4px", padding: "9px 12px", background: "#55704F", color: "#F6EBD3", transform: "rotate(-1deg)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "17px" }}>4</div>
            <div style={{ fontSize: "9.5px", letterSpacing: ".1em", fontWeight: 600, textTransform: "uppercase" }}>kontinenta</div>
          </div>
        </div>

        {/* Donor list */}
        <div style={{ margin: "0 18px 22px" }}>
          <DonorSearch donors={list} t={t} />
        </div>

        {/* CTA — dodaj ime */}
        <div style={{ margin: "0 18px 26px", border: "2px solid #452D18", borderRadius: "6px", padding: "16px", background: "#E0A83A" }}>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "15px" }}>DODAJ SVOJE IME NA ZID</div>
          <p style={{ fontSize: "13.5px", lineHeight: 1.55, margin: "6px 0 10px" }}>Časti selo kafom od €5 i tvoje ime staje uz ova iznad.</p>
          <Link
            href={`/${locale}/kafa`}
            style={{
              display: "block",
              textAlign: "center",
              boxSizing: "border-box",
              width: "100%",
              padding: "12px",
              background: "#D96C2C",
              color: "#F6EBD3",
              border: "2px solid #452D18",
              borderRadius: "4px",
              fontFamily: "var(--font-alfa), Georgia, serif",
              fontSize: "13px",
              letterSpacing: ".06em",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            ČASTIM KAFU (€5)
          </Link>
        </div>

        {/* Not on list form */}
        <div style={{ margin: "0 18px 26px" }}>
          <PendingDonorForm t={t} />
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
