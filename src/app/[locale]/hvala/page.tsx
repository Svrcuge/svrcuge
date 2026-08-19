import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = { robots: { index: false } };

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.thankYou;
  const shareUrl = `${SITE_URL}/${locale}`;

  return (
    <div className="site site-840">
      <Header dict={dict} locale={locale} />
      <main className="section">
        <div className="container-content max-w-2xl text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-amber/15 text-5xl">
            ✦
          </span>
          <h1 className="mt-6 font-display text-3xl font-extrabold text-ink text-balance sm:text-4xl">{t.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t.text}</p>

          <div className="mt-10 rounded-3xl border border-line bg-white/80 p-7 shadow-card">
            <h2 className="font-display text-xl font-bold text-ink">{t.shareTitle}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">{t.shareMessage}</p>
            <div className="mt-6">
              <ShareButtons dict={dict} url={shareUrl} />
            </div>
          </div>

          <Link href={`/${locale}`} className="btn-secondary mt-8">
            {t.backHome}
          </Link>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
