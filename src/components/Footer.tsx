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
    { href: `${home}#transparentnost`, label: dict.nav.transparency },
  ];

  return (
    <footer className="border-t border-line bg-ink text-cream/90">
      <div className="container-content grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 font-display text-xl font-extrabold text-cream">
            <span className="flex h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-amber p-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo/logo-black.png" alt="Svrčuge" className="h-full w-full object-contain" />
            </span>
            Svrčuge
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">{f.tagline}</p>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-amber">{f.linksTitle}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {siteLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream/75 transition hover:text-amber">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-amber">{f.legalTitle}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href={`${home}/privatnost`} className="text-cream/75 transition hover:text-amber">
                {f.privacy}
              </Link>
            </li>
            <li>
              <Link href={`${home}/uslovi`} className="text-cream/75 transition hover:text-amber">
                {f.terms}
              </Link>
            </li>
          </ul>
          <h4 className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-amber">{f.contactTitle}</h4>
          <a href={`mailto:${SOCIAL.email}`} className="mt-3 block text-sm text-cream/75 transition hover:text-amber">
            {SOCIAL.email}
          </a>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-amber">{f.languagesTitle}</h4>
          <ul className="mt-4 flex flex-wrap gap-2">
            {LOCALES.map((loc) => (
              <li key={loc}>
                <Link
                  href={`/${loc}`}
                  className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
                    loc === locale ? "border-amber bg-amber/15 text-amber" : "border-cream/20 text-cream/70 hover:border-amber hover:text-amber"
                  }`}
                >
                  {LOCALE_LABELS[loc]}
                </Link>
              </li>
            ))}
          </ul>
          <h4 className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-amber">{f.socialTitle}</h4>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="text-cream/75 hover:text-amber">
              Instagram
            </a>
            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="text-cream/75 hover:text-amber">
              Facebook
            </a>
            <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="text-cream/75 hover:text-amber">
              TikTok
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-content flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream/55 sm:flex-row">
          <span>© {new Date().getFullYear()} Svrčuge. {f.rights}</span>
          <span>{f.madeWith}</span>
        </div>
      </div>
    </footer>
  );
}
