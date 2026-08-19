import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProdavnicaClient from "./ProdavnicaClient";

export const metadata: Metadata = {
  title: "Prodavnica — Svrčuge",
  description:
    "Seoska prodavnica Svrčuga. Majice, cerge, šolje i suveniri koji podržavaju obnovu sela.",
};

export default async function ProdavnicaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <div className="site site-1060">
      <Header dict={dict} locale={locale as Locale} />
      <ProdavnicaClient locale={locale as Locale} />
      <Footer dict={dict} locale={locale as Locale} />
    </div>
  );
}
