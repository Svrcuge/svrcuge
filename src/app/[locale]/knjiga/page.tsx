import type { Metadata } from "next";
import Link from "next/link";
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
  const p = getDictionary(locale).guestbookPage;
  return { title: `${p.title} — Svrčuge` };
}

export default async function GuestbookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const p = dict.guestbookPage;

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        {/* Hero */}
        <div
          className="py-16 px-5 text-center"
          style={{ background: "#452D18", borderBottom: "3px double #C0A882" }}
        >
          <div className="eyebrow !text-amber mb-3">✦ {p.eyebrow}</div>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">{p.title}</h1>
          <p className="mt-4 max-w-xl mx-auto text-cream/75">{p.intro}</p>
        </div>

        {/* Forma + poruke */}
        <section className="py-14" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-xl">
            <GuestbookForm dict={dict} />
          </div>
        </section>

        <div className="container-content py-6 text-center">
          <Link href={`/${locale}`} className="text-sm font-bold text-amber-deep hover:underline">
            ← {p.back}
          </Link>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
