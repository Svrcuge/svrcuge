import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";
import { SOCIAL } from "@/lib/config";

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const f = dict.footer;
  const home = `/${locale}`;

  const siteLinks = [
    { href: `${home}/prica`, label: dict.nav.story },
    { href: `${home}#plan`, label: dict.nav.plan },
    { href: `${home}#prvi-krug`, label: dict.nav.firstCircle },
    { href: `${home}/mediji`, label: dict.media.navLabel },
    { href: `${home}#partneri`, label: dict.nav.partners },
    { href: `${home}/donatori`, label: dict.donorWall.navLabel },
    { href: `${home}/privatnost`, label: f.privacy },
    { href: `${home}/uslovi`, label: f.terms },
  ];

  return (
    <footer className="bg-paper-light" style={{ borderTop: "3px double #452D18" }}>
      <div className="container-content py-12">
        {/* Logo + tagline */}
        <div className="mb-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/logo-black.png"
            alt="Svrčuge"
            className="mx-auto mb-3"
            style={{ height: "80px" }}
          />
          <p className="text-sm text-muted">{f.tagline}</p>
        </div>

        {/* Linkovi */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm mb-6">
          {siteLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted transition hover:text-amber-deep">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Jezici */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {LOCALES.map((loc) => (
            <Link
              key={loc}
              href={`/${loc}`}
              className={`border px-3 py-0.5 text-xs font-bold transition ${
                loc === locale
                  ? "border-ink bg-ink text-cream"
                  : "border-ink text-ink hover:bg-ink hover:text-cream"
              }`}
              style={{ borderRadius: "999px" }}
            >
              {LOCALE_LABELS[loc]}
            </Link>
          ))}
        </div>

        {/* Social + kontakt */}
        <p className="text-center text-xs text-muted">
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-amber-deep">Instagram @svrcuge.me</a>
          {" · "}
          <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-amber-deep">TikTok</a>
          {" · "}
          <a href={`mailto:${SOCIAL.email}`} className="hover:text-amber-deep">{SOCIAL.email}</a>
          <br />
          Svrčuge · Crna Gora
        </p>

        <p className="mt-5 text-center text-xs text-muted/60">
          © {new Date().getFullYear()} Svrčuge. {f.rights}
        </p>
      </div>
    </footer>
  );
}
