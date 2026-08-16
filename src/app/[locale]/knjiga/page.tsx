import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuestbookForm from "./GuestbookForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Knjiga gostiju — Svrčuge",
    description: "Ostavi poruku selu, mještani čitaju svaku.",
  };
}

export default async function GuestbookPage({
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
          <div style={{ fontSize: "11px", letterSpacing: ".28em", fontWeight: 600, color: "#A5551F" }}>PORUKE SELU</div>
          <h1 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "27px", lineHeight: 1.15, margin: "8px 0 10px" }}>
            KNJIGA GOSTIJU
          </h1>
          <p style={{ fontSize: "14.5px", lineHeight: 1.6, margin: "0 18px" }}>
            Ostavi poruku selu, mještani čitaju svaku. Ovo je moderna verzija sveske sa seoske slave.
          </p>
        </div>

        <GuestbookForm dict={dict} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
