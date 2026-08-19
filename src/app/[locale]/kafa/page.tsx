import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KafaClient from "./KafaClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  getDictionary(locale);
  return {
    title: "Podrži selo — Svrčuge",
    description: "Časti selo kafom ili postani redovni prijatelj Svrčuga.",
  };
}

export default async function KafaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="site site-900">
      <Header dict={dict} locale={locale} />
      <main>
        <KafaClient locale={locale} />
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
