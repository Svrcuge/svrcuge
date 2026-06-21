import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LOCALES,
  LOCALE_HTML_LANG,
  getDictionary,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { SITE_URL } from "@/lib/config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const m = dict.meta;

  // hreflang alternate za svaki jezik
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) languages[LOCALE_HTML_LANG[loc]] = `${SITE_URL}/${loc}`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `${SITE_URL}/${locale}`,
      siteName: "Svrčuge",
      locale: LOCALE_HTML_LANG[locale].replace("-", "_"),
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: m.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.ogDescription,
      images: ["/opengraph-image"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const lang = LOCALE_HTML_LANG[locale as Locale];

  // <html> živi u root layoutu (bez params). Precizan jezik nosi ovaj wrapper
  // (semantički ispravno za sav vidljivi sadržaj), a jezičko ciljanje za
  // pretraživače ide kroz hreflang alternate u generateMetadata().
  return <div lang={lang}>{children}</div>;
}
